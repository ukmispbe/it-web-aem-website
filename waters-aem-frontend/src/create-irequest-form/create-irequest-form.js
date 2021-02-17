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
        setClearActiveLabel(supportRequestFields, "productDetailsText", true); 
        setClearActiveLabel(supportRequestFields, "productDetailsValue", true); 
        setClearActiveLabel(supportRequestFields, "productDetails", false);
        // set the Text value 

      }
      else {
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

  // Display or Hide the Product Options Drop Down
  const handleDisplayProductTypeDropDown = (displayDropDownFlag)=>  {
    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      setClearActiveLabel(supportRequestFields, "productType", displayDropDownFlag); 
      setSupportRequestFormConfig(supportReqFormConfig);  
    }
  }

  // If the Product Selected has sub Options Populate and display, otherwise clear options and hide
  const handleChangeProductType = (productOption) => {
    if (supportReqFormConfig) {
      const supportRequestFields = supportReqFormConfig.config.fields;
      const allSubProductOptions = supportReqFormConfig.config.subOptions;
      let subProductOptions;
      if (allSubProductOptions) {
        subProductOptions = allSubProductOptions.find(obj => {
          return obj.optionValue === productOption.value;
        });
      }

      const subProductDropDown = supportRequestFields.find(obj => {
        return obj.name === "subProductType"
      });
      if (subProductDropDown) {
        if (subProductOptions) {
          subProductDropDown.options = subProductOptions.options;
          setClearActiveLabel(supportRequestFields, "subProductType", true);
        } else {
          subProductDropDown.options = [];
          setClearActiveLabel(supportRequestFields, "subProductType", false);
        }
      }
    }
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
      // Temp Values to mimic setting API Response 
      const formValues = {
        "productDetailsValue": "CO2_BULK",
        "productDetailsText": "CO2 Bulk Delivery 500G System"
      };
      // End of Temp Values to mimic setting API Response 
      return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...supportReqFormConfig}
              defaultValues={formValues}
              navigateBackFn={handleNavigateBackFn}
              displayProductTypeDropDown={handleDisplayProductTypeDropDown}
              changeProductType={handleChangeProductType}
              submitFn={checkIRequestSubmit}
              isocode={isocode}
            />
          </Suspense>);
    default:
      break;
  }
};

export default CreateIRequestForm;