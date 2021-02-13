import React, { Suspense, useState } from "react";
const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));

const CreateIRequestForm = ({
    supportRequestFormConfig,
    checkSerialFormConfig,
    isocode,
}) => {
  const [showForm, setShowForm] = useState(0);

  const [ serialFormConfig, setCheckSerialFormConfig ] = useState(checkSerialFormConfig);
  const [ supportReqFormConfig, setSupportRequestFormConfig ] = useState(supportRequestFormConfig);


  function checkSerialSubmit(data) {
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
        setClearActiveLabel(supportRequestFields, "productRequiringSupportLabel", true);
        setClearActiveLabel(supportRequestFields, "productDetailsLabel", true);
        // set the drop down value 
        productDetailsDropDown.addClass = "hidden-dropdown";
      }
      else {
        setClearActiveLabel(supportRequestFields, "productRequiringSupportLabel", false);
        setClearActiveLabel(supportRequestFields, "productDetailsLabel", false);       
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
    }
    else {
      // Populate single drop down option, select it and make drop down inactive
      // Populate label & display
      options.push({"value":"CO2_BULK","label": "CO2 Bulk Delivery 500G System"});
    }
    // End of Temporary Code to be replaced by API Call
    return options;
  }

  function  checkIRequestSubmit(data) {
    setShowForm(2);
  }

  const handleNavigateBackFn = ()=>  {
    setShowForm(0);
  }

  const handleDisplayProductType = ()=>  {
    //setShowForm(0);
  }

  const handleDisplaySubProductType = ()=>  {
    //setShowForm(0);
  }

  switch (showForm) {
    case 0:
      return (
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          {...serialFormConfig}
          submitFn={checkSerialSubmit}
          isocode={isocode}
        />
      </Suspense>) ;
    case 1:
      const formValues = {
        "productDetails": "CO2_BULK"
      };
      return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...supportReqFormConfig}
              defaultValues={formValues}
              navigateBackFn={handleNavigateBackFn}
              displayProductType={handleDisplayProductType}
              displaySubProductType={handleDisplaySubProductType}
              submitFn={checkIRequestSubmit}
              isocode={isocode}
            />
          </Suspense>);
    default:
      break;
  }
};

export default CreateIRequestForm;