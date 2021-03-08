import React, { Suspense, useState, useEffect } from "react";
import { retrieveData } from '../forms/services/retrieve';
import SessionStore from '../stores/sessionStore';
import loginStatus from  '../scripts/loginStatus';
import { signInRedirect, getNamedHeaderLink } from '../utils/redirectFunctions';
import { renderDateToday } from '../utils/dateFunctions';

const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));

const CreateRequestForm = ({
    confirmationFormConfig,
    supportRequestFormConfig,
    checkSerialFormConfig,
    isocode,
}) => {
  const [ showForm, setShowForm ] = useState();
  const [ isInEditMode, setIsInEditMode ] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));
  const [ serialFormConfig, setCheckSerialFormConfig ] = useState(checkSerialFormConfig);
  const [ supportReqFormConfig, setSupportRequestFormConfig ] = useState(supportRequestFormConfig);
  const [ confFormConfig, SetConfFormConfig ] = useState(confirmationFormConfig);
  const [ initialIRequestFormValues, setInitialIRequestFormValues ] = useState({});
  const [ initialConfirmationFormValues, setInitialConfirmationFormValues ] = useState({});
  const [ serialFormData, setSerialFormData ] = useState();
  const [ userDetails, setUserDetails ] = useState();
  const constTechSupport = "TS";
  const constProductType = "productTypeLabel";
  const constConfirmationLabel = "confirmationLabel";

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
}, []);


  function checkSerialSubmit(data) {
    setSerialFormData(data);
    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      const serialNumberLabel = supportRequestFields.find(obj => {
        return obj.name === "serialNumberLabel"
      });
      if (serialNumberLabel) {
        serialNumberLabel.label = `${serialNumberLabel.label}   ${data.serialNumber}`;
      }

      const organizationLabel = supportRequestFields.find(obj => {
        return obj.name === "organizationLabel"
      });
      if (organizationLabel) {
        organizationLabel.label = `${organizationLabel.label}   ${data.organization}`;
      }
      
      const productOptions = callSerialAPI(data);
   
      const productDetailsDropDown = supportRequestFields.find(obj => {
        return obj.name === "productDetails"
      });
      if (productDetailsDropDown) {
        productDetailsDropDown.options = productOptions;
      }

      if (productOptions.length === 1) {
        // Display the Text Box, Hide the Drop Down and set the text and values
        setClearActiveLabel(supportRequestFields, "productDetailsText", true); 
        setClearActiveLabel(supportRequestFields, "productDetailsValue", true); 
        setClearActiveLabel(supportRequestFields, "productDetails", false);
      }
      else {
        // Display the drop down and hide the text boxes
        setClearActiveLabel(supportRequestFields, "productDetailsText", false);       
        setClearActiveLabel(supportRequestFields, "productDetails", true); 
      }
    }
    setSupportRequestFormConfig(supportReqFormConfig);
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
  
  function callSerialAPI(formData) {
    let options = [];

    // Truncate organization to 3 letters and add the wildcard (*)
    let organizationSearchString = "";
    if (formData.organization.length <= 3) {
      organizationSearchString = formData.organization + "*";
    }
    else {
      organizationSearchString = formData.organization.substr(0, 3) + "*";
    }
    console.log(`Serial API Parameters, Serial Number: ${formData.serialNumber}, Organization: ${organizationSearchString}`);

    // Temporary Code to be replaced by API Call
    if (formData.serialNumber === "1234") {
      // Populate & display drop down
      options.push({"value":"CO2_BULK","label": "CO2 Bulk Delivery 500G System"});
      options.push({"value":"TA_AD","label": "S/W Suite TA Advantage v5.0 Kit"});

    }
    else {
      // Populate single drop down option, select it and make drop down inactive
      // Populate label & display
      options.push({"value":"CO2_BULK","label": "CO2 Bulk Delivery 500G System"});
      initialIRequestFormValues.productDetailsValue = "CO2_BULK";
      initialIRequestFormValues.productDetailsText = "CO2 Bulk Delivery 500G System";
    }
    initialIRequestFormValues.contactMethod = "Email";
    // End of Temporary Code to be replaced by API Call
    
    if (userDetails) {
      initialIRequestFormValues.company = userDetails.userInfo.company;
      initialIRequestFormValues.email = userDetails.userInfo.email;
      initialIRequestFormValues.firstName = userDetails.userInfo.firstName;
      initialIRequestFormValues.lastName = userDetails.userInfo.lastName;
      initialIRequestFormValues.phone = userDetails.userInfo.phone;
    }
    setInitialIRequestFormValues (initialIRequestFormValues);

    return options;
  }

  function  checkIRequestSubmit(data) {

    // Need to create the Short Description  
    const ShortDescription = createShortDestription(data.supportType, data.productType); 
    // Add the "Support" from Config
    const recordType = { "recordType": supportReqFormConfig.config.recordType };

    processPreferredContactMethod(data);
    // Format the form data & call the API 
    const formData = {...serialFormData, ...recordType, ...ShortDescription,  ...data};

    // Output the processed data to the console until the API is ready
    console.log("Submit API Data: ",  formData);

    // Set up the default Values for the confirmation
    initialConfirmationFormValues.caseNumberLabel = "01234567890";
    initialConfirmationFormValues.dateSubmittedLabel = renderDateToday();
    initialConfirmationFormValues.serialNumberLabel = formData.serialNumber;
    initialConfirmationFormValues.organizationLabel = formData.organization;
    initialConfirmationFormValues.productDetailsLabel = formData.productDetailsText ? formData.productDetailsText : getDescriptionFromFields(formData.productDetails, "productDetails", supportReqFormConfig.config.fields);   
    initialConfirmationFormValues.typeOfSupportRequestLabel = getDescriptionFromFields(formData.supportType, "supportType", supportReqFormConfig.config.fields);

    if (formData.supportType === constTechSupport) {
      initialConfirmationFormValues.productTypeLabel = getDescriptionFromFields(formData.productType, "productType", supportReqFormConfig.config.fields);
    }
    else {
      // Hide the Product Type Label
      const productTypeObject = confFormConfig.config.fields.find(obj => {
        return obj.name === constProductType
      });
      if (productTypeObject) {
        productTypeObject.active = false;
      }
      SetConfFormConfig(confFormConfig);
    }  
    // Add the email address to the text-with-links config
    const confirmationLableObject = confFormConfig.config.fields.find(obj => {
      return obj.name === constConfirmationLabel
    });
    if (confirmationLableObject) {
      confirmationLableObject.config[1].label = formData.email;
    }   
    SetConfFormConfig(confFormConfig);

    initialConfirmationFormValues.requestSummary = formData.formDescription;
    initialConfirmationFormValues.requestSummaryEllipsis = formData.formDescription;
    initialConfirmationFormValues.fullNameLabel = `${formData.firstName} ${formData.lastName}`;
    initialConfirmationFormValues.emailLabel = formData.email;
    initialConfirmationFormValues.phoneNumberLabel = formData.phone;
    initialConfirmationFormValues.preferredMethodOfContactLabel = formData.preferredContactMethod;
    setInitialConfirmationFormValues(initialConfirmationFormValues);
    // Show Confirmation Form
    setShowForm(2);
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
    return option.label;
  }

  // Determine if Email or Phone & Delete "Email" & "Phone"
  function processPreferredContactMethod(requestFormData) {
    requestFormData.preferredContactMethod = "Email";
    if (requestFormData.Phone === "on") {
      requestFormData.preferredContactMethod = "Phone";
    }
    delete requestFormData.Email;
    delete requestFormData.Phone;
  }

  // Use the values to pull the desriptions back from the config
  function createShortDestription(supportType, productType) {
    
    if (supportReqFormConfig && supportReqFormConfig.config.fields) {
      const supportTypeDescription = getDescriptionFromFields(supportType, "supportType", supportReqFormConfig.config.fields);
      if (supportType === constTechSupport) {
        // Append SupportType & ProductType Descriptions 
        const productTypeDescription = getDescriptionFromFields(productType, "productType", supportReqFormConfig.config.fields);
        return { "shortDescription": `${supportTypeDescription} : ${productTypeDescription}` };
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
        <Form
          {...serialFormConfig}
          defaultValues={initialSerialFormValues}
          submitFn={checkSerialSubmit}
          isocode={isocode}
        />
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
      break;
  }
};

export default CreateRequestForm;