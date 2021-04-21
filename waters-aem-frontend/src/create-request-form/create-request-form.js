import React, { Suspense, useState, useEffect } from "react";
import { retrieveData } from '../forms/services/retrieve';
import { serialNumberSubmit, iRequestSubmit } from '../forms/services/submit';
import SessionStore from '../stores/sessionStore';
import loginStatus from  '../scripts/loginStatus';
import { signInRedirect, getNamedHeaderLink } from '../utils/redirectFunctions';
import { CONTACT_METHOD, TECH_SUPPORT, PRODUCT_TYPE_LABEL, CONFIRMATION_LABEL } from '../constants/index';
import cookieStore from '../stores/cookieStore';

const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));

const CreateRequestForm = ({
    confirmationFormConfig,
    supportRequestFormConfig,
    checkSerialFormConfig,
    isocode,
}) => {
  const [ showForm, setShowForm ] = useState();
  const [ displayInitialForm, setDisplayInitialForm ] = useState(false);
  const [ isInEditMode, setIsInEditMode ] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));
  const [ serialFormConfig, setCheckSerialFormConfig ] = useState(checkSerialFormConfig);
  const [ supportReqFormConfig, setSupportRequestFormConfig ] = useState(supportRequestFormConfig);
  const [ confFormConfig, SetConfFormConfig ] = useState(confirmationFormConfig);
  const [ initialIRequestFormValues, setInitialIRequestFormValues ] = useState({});
  const [ initialConfirmationFormValues, setInitialConfirmationFormValues ] = useState({});
  const [ serialFormData, setSerialFormData ] = useState();
  const [ userDetails, setUserDetails ] = useState();

  // Check if countryCodesFromAEM contains any country codes. This is authored on XG Node.
  // If so only allow Israel through. Otherwise redirect to Contact Us Page
  useEffect(()=> {
    // Read the Comma Seperated List from AEM
    const countriesReadFromAEM = serialFormConfig.config.globalCountries;
    // Check if empty and return
    if (!countriesReadFromAEM || countriesReadFromAEM === "") {
      setDisplayInitialForm(true);
      return;
    }

    if (!isInEditMode) {
      // Create an array of countries from the Authored AEM Property
      const countryArray = createAEMCountryArray(countriesReadFromAEM);
      
      // Get the Current Local string from the cookie and redirect if not in the list
      const localeString = cookieStore.getLocale();      
      const userCountry = getCountryFromLocale(localeString)
      if (countryArray.includes(userCountry)) { 
        setDisplayInitialForm(true);  
        return;
      }
      const contactUsUrl = serialFormConfig.config.globalCountriesRedirectURL;
      if (contactUsUrl && contactUsUrl !== "") {
        window.location.replace(contactUsUrl);     
      }
    }
    return;
  }, []);

  // input formats can be de, en_US, ha_Latn_GH
  function getCountryFromLocale(localeString) {
    if (localeString.indexOf("_") !== -1) {
      const localeArray = localeString.split("_");
      return localeArray[localeArray.length - 1].toUpperCase();
    }
    else {
      return localeString.toUpperCase();
    }
  }

  function createAEMCountryArray(countryString) {
    let countryArray;
    if (countryString.indexOf(",") !== -1) {
      countryArray = countryString.split(",");
    }
    else {
      countryArray = [countryString];
    }
    return countryArray;
  }

  useEffect(() => {
    const needsToBeSignedIn = serialFormConfig.config.needsToBeSignedIn;
    if (!isInEditMode) {
      if (needsToBeSignedIn) {
        if (!loginStatus.state()) {
          const store = new SessionStore();
          store.setSignInRedirect(window.location.href);
          signInRedirect();
          return null;
        }
      }
    }

    if (!isInEditMode) {
      const url = getNamedHeaderLink("data-user-details-url");
      // Call API & Update User Details
      retrieveData(url)
        .then((results) => {
          if (results) {
            const userInfo = {
              "userInfo": {
                "company": results.company,
                "email": results.email,
                "firstName": results.firstName,
                "lastName": results.lastName,
                "phone": results.phone
              }
            }
            setUserDetails(userInfo);
            setShowForm(0);
          }
        });
    } else {
      setShowForm(0);
    }
  }, []);

  function checkSerialSubmit(data) {
    window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: true }}));
    setSerialFormData(data);
    if  (serialFormConfig) {
      serialNumberSubmit.call(this, serialFormConfig.config.equipmentEndpoint, data, processEquipmentData);
    }
  }

  // Handles the callback from the Equipment API- Generates Drop Down or Label dependent on the number of results 
  function processEquipmentData(equipmentResults, formData) {
    // Only process if no errors
    if (equipmentResults.errors) {
      return;
    }

    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      const serialNumberLabel = supportRequestFields.find(obj => {
        return obj.name === "serialNumberLabel"
      });
      if (serialNumberLabel) {
        serialNumberLabel.label = `${serialNumberLabel.label} ${formData.serialNumber}`;
      }

      const organizationLabel = supportRequestFields.find(obj => {
        return obj.name === "organizationLabel"
      });
      if (organizationLabel) {
        organizationLabel.label = `${organizationLabel.label} ${formData.organization}`;
      }

      if (equipmentResults && supportRequestFields) {
        if (equipmentResults.length === 1) {
          initialIRequestFormValues.productDetailsValue = equipmentResults[0].equipmentNumber;
          initialIRequestFormValues.productDetailsText = equipmentResults[0].productDescription;
          // Display the Text Box, Hide the Drop Down and set the text and values
          setClearActiveLabel(supportRequestFields, "productDetailsText", true);
          setClearActiveLabel(supportRequestFields, "productDetailsValue", true);
          setClearActiveLabel(supportRequestFields, "productDetails", false);
        }
        if (equipmentResults.length > 1) {
          // Populate & display the drop down and hide the text boxes
          let productOptions = [];
          equipmentResults.map(item => {
            const option = {
              "value": item.equipmentNumber,
              "label": item.productDescription
            }
            productOptions.push(option);
          })

          const productDetailsDropDown = supportRequestFields.find(obj => {
            return obj.name === "productDetails"
          });
          if (productDetailsDropDown) {
            productDetailsDropDown.options = productOptions;
          }
          setClearActiveLabel(supportRequestFields, "productDetailsText", false);
          setClearActiveLabel(supportRequestFields, "productDetails", true);
        }
      }
    }
    initialIRequestFormValues.contactMethod = CONTACT_METHOD.EMAIL;
    if (userDetails) {
      initialIRequestFormValues.company = userDetails.userInfo.company;
      initialIRequestFormValues.email = userDetails.userInfo.email;
      initialIRequestFormValues.firstName = userDetails.userInfo.firstName;
      initialIRequestFormValues.lastName = userDetails.userInfo.lastName;
      initialIRequestFormValues.phone = userDetails.userInfo.phone;
    }
    setInitialIRequestFormValues(initialIRequestFormValues);
    setSupportRequestFormConfig(supportReqFormConfig);
    window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
    setShowForm(1);
  }

  // Clear or set the active state of the control
  function setClearActiveLabel(array, name, state) {
    const control = array.find(obj => {
      return obj.name === name;
    });
    if (control) {
      control.active = state;
    } 
  }

  function  checkIRequestSubmit(data) {
    window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: true }}));
    // Need to create the Short Description  
    const ShortDescription = createShortDestription(data.supportType, data.productType);
    const supportTypeArray = data.supportType.split("|")
    const recordType = { "recordType": supportTypeArray[1] };

    processPreferredContactMethod(data);
    // Format the form data & call the API 
    const formData = {...serialFormData, ...recordType, ...ShortDescription,  ...data};   

    const iRequestData = {
      "recordType": formData.recordType,
      "type": supportTypeArray[0],
      "productType": formData.productType,
      "subject": formData.shortDescription,
      "serialNumber": formData.serialNumber,
      "description": formData.formDescription,
      "assetId": formData.productDetails ? formData.productDetails : formData.productDetailsValue,
      "contactInfo": {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "phone": formData.phone,
        "secondaryPhone": formData.secondaryPhone,
        "email": formData.email,
        "contactMethod": formData.preferredContactMethod
      }
    };
    
    iRequestSubmit.call(this, supportReqFormConfig.config.submitEndpoint, iRequestData, processIRequestData, formData);
  }

  function processIRequestData(iRequestResults, formData) {
    if (formData && iRequestResults.caseNumber) {
      const {serialNumber, organization, productDetailsText, productDetails, supportType, productType,
        formDescription, firstName, lastName, email, phone, preferredContactMethod} = formData;
      // Set up the default Values for the confirmation
      initialConfirmationFormValues.caseNumberLabel = iRequestResults.caseNumber;
      initialConfirmationFormValues.serialNumberLabel = serialNumber;
      initialConfirmationFormValues.organizationLabel = organization;
      initialConfirmationFormValues.productDetailsLabel = productDetailsText ? productDetailsText : getDescriptionFromFields(productDetails, "productDetails", supportReqFormConfig.config.fields);
      initialConfirmationFormValues.typeOfSupportRequestLabel = getDescriptionFromFields(supportType, "supportType", supportReqFormConfig.config.fields);
  
      if (formData.supportType === TECH_SUPPORT) {
        initialConfirmationFormValues.productTypeLabel = getDescriptionFromFields(productType, "productType", supportReqFormConfig.config.fields);
      }
      else {
        // Hide the Product Type Label
        const productTypeObject = confFormConfig.config.fields.find(obj => {
          return obj.name === PRODUCT_TYPE_LABEL
        });
        if (productTypeObject) {
          productTypeObject.active = false;
        }
        SetConfFormConfig(confFormConfig);
      }
      // Add the email address to the text-with-links config
      const confirmationLabelObject = confFormConfig.config.fields.find(obj => {
        return obj.name === CONFIRMATION_LABEL
      });
      if (confirmationLabelObject) {
        confirmationLabelObject.config[1].text = `${email}.`;
      }
      SetConfFormConfig(confFormConfig);
  
      initialConfirmationFormValues.requestSummary = formDescription;
      initialConfirmationFormValues.requestSummaryEllipsis = formDescription;
      initialConfirmationFormValues.fullNameLabel = `${firstName} ${lastName}`;
      initialConfirmationFormValues.emailLabel = email;
      initialConfirmationFormValues.phoneNumberLabel = phone;
      initialConfirmationFormValues.preferredMethodOfContactLabel = capitalizeFirstLetter(preferredContactMethod);
      setInitialConfirmationFormValues(initialConfirmationFormValues);
      // Show Confirmation Form
      window.dispatchEvent(new CustomEvent("showLoaderEproc", { detail: { showLoader: false }}));
      setShowForm(2);
    }
  }

  function capitalizeFirstLetter(string) {
    if (string && string.length > 1){
      return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }

  function getDescriptionFromFields(value, controlName, fields) {
    let option;
    const control = fields.find(obj => {
      return obj.name === controlName
    });
    if (control && control.options){
      option = control.options.find(obj => {
        return obj.value === value
      });
    }
    return option ? option.label : null;
  }

  // Determine if Email or Phone & Delete "Email" & "Phone"
  function processPreferredContactMethod(requestFormData) {
    requestFormData.preferredContactMethod = CONTACT_METHOD.EMAIL;
    if (requestFormData.PHONE === "on") {
      requestFormData.preferredContactMethod = CONTACT_METHOD.PHONE;
    }
    delete requestFormData.Email;
    delete requestFormData.Phone;
  }

  function createShortDestription(supportType, productType) {

    if (supportReqFormConfig && supportReqFormConfig.config.fields) {
      const supportTypeDescription = getDescriptionFromFields(supportType, "supportType", supportReqFormConfig.config.fields);
      if (supportType === TECH_SUPPORT) {
        // Append SupportType & ProductType Descriptions
        const productTypeDescription = getDescriptionFromFields(productType, "productType", supportReqFormConfig.config.fields);
         // Short Description is Limited to 40 Characters
         // Added Temporary Fix to prevent API Call Error. This will be resolved prior to Actual API integration
         const shortDescription = `${supportTypeDescription} : ${productTypeDescription}`;
        if (shortDescription.length > 40) {
          return { "shortDescription": shortDescription.substring(0,40) };
        }
        return { "shortDescription": shortDescription };
      }
      else {
        // Set SupportType Description
        return { "shortDescription": supportTypeDescription };
      }
    }
  }
   

  const handleNavigateBackFn = ()=>  {
    // Set the Serial Number and Oroganization Labels to their default values
    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      const serialNumberLabel = supportRequestFields.find(obj => {
        return obj.name === "serialNumberLabel"
      });
      if (serialNumberLabel) {
        serialNumberLabel.label =  serialNumberLabel.label.substr(0, serialNumberLabel.label.indexOf(":") + 1);
      }

      const organizationLabel = supportRequestFields.find(obj => {
        return obj.name === "organizationLabel"
      });
      if (organizationLabel) {
        organizationLabel.label = organizationLabel.label.substr(0, organizationLabel.label.indexOf(":") + 1);
      }
    }
    setSupportRequestFormConfig(supportReqFormConfig);
    setShowForm(0);
  }

  // Display or Hide the Product Options Drop Down
  const handleDisplayProductTypeDropDown = (displayDropDownFlag)=>  {
    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      setClearActiveLabel(supportRequestFields, "productType", displayDropDownFlag); 
      setSupportRequestFormConfig(supportReqFormConfig);  
    }
  }

  function  confirmationSubmit() {
    location.reload();
  }

  switch (showForm) {
    case 0:
      const initialSerialFormValues = {
        "organization": userDetails ? userDetails.userInfo.company : ""
      }
      return (
      <Suspense fallback={<div>Loading...</div>}>
        { displayInitialForm && (
              <Form
              {...serialFormConfig}
              defaultValues={initialSerialFormValues}
              submitFn={checkSerialSubmit}
              isocode={isocode}
            />
        )}
      </Suspense>) ;
    case 1:
      return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...supportReqFormConfig}
              defaultValues={initialIRequestFormValues}
              navigateBackFn={handleNavigateBackFn}
              displayProductTypeDropDown={handleDisplayProductTypeDropDown}
              submitFn={checkIRequestSubmit}
              isocode={isocode}
            />
          </Suspense>);
    case 2:
      return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...confFormConfig}
              defaultValues={initialConfirmationFormValues}
              submitFn={confirmationSubmit}
              isocode={isocode}
            />
          </Suspense>);
    default:
      return null;
  }
};

export default CreateRequestForm;