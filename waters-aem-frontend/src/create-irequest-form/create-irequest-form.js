import React, { Suspense, useState, useEffect } from "react";
import { retrieveData } from '../forms/services/retrieve';
import SessionStore from '../stores/sessionStore';
import loginStatus from  '../scripts/loginStatus';
import { signInRedirect } from '../utils/redirectFunctions';

const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));






const CreateIRequestForm = ({
    supportRequestFormConfig,
    checkSerialFormConfig,
    isocode,
}) => {
  const [showForm, setShowForm] = useState();

  const [ serialFormConfig, setCheckSerialFormConfig ] = useState(checkSerialFormConfig);
  const [ supportReqFormConfig, setSupportRequestFormConfig ] = useState(supportRequestFormConfig);
  const [initialIRequestFormValues, setInitialIRequestFormValues] = useState({});
  const [serialFormData, setSerialFormData ] = useState();
  const [ userDetails, setUserDetails ] = useState();

  useEffect(() => {
    const needsToBeSignedIn = serialFormConfig.config.needsToBeSignedIn;
    if (needsToBeSignedIn) {
        if (!loginStatus.state()) {
            const store = new SessionStore();
            store.setSignInRedirect(window.location.href);
            signInRedirect();
            return null;
        }
    }

    const url = "https://dev1-services.waters.com/api/waters/user/v1/details"
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

    // Temporary Code to be replaced by API Call
    if (formData.serialNumber === "1234") {
      // Populate & display drop down
      options.push({"value":"CO2_BULK","label": "CO2 Bulk Delivery 500G System"});
      options.push({"value":"TA_AD","label": "S/W Suite TA Advantage v5.0 Kit"});
      initialIRequestFormValues.contactMethod = "E";
    }
    else {
      // Populate single drop down option, select it and make drop down inactive
      // Populate label & display
      options.push({"value":"CO2_BULK","label": "CO2 Bulk Delivery 500G System"});
      initialIRequestFormValues.contactMethod = "E";
      initialIRequestFormValues.productDetailsValue = "CO2_BULK";
      initialIRequestFormValues.productDetailsText = "CO2 Bulk Delivery 500G System";
    }
    if (userDetails) {
      initialIRequestFormValues.company = userDetails.userInfo.company;
      initialIRequestFormValues.email = userDetails.userInfo.email;
      initialIRequestFormValues.firstName = userDetails.userInfo.firstName;
      initialIRequestFormValues.lastName = userDetails.userInfo.lastName;
      initialIRequestFormValues.phone = userDetails.userInfo.phone;
    }
    setInitialIRequestFormValues (initialIRequestFormValues);
    // End of Temporary Code to be replaced by API Call
    return options;
  }

  function  checkIRequestSubmit(data) {
    const form1Data = serialFormData;
    setShowForm(2);
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
    default:
      return null;
      break;
  }
};

export default CreateIRequestForm;