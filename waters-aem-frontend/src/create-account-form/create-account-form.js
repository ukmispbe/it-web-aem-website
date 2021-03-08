import React, { Suspense, useState, useEffect } from "react";
const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));
import { checkEmailResetPasswordSubmit, registrationSubmit } from "../forms/services/submit";
import { getCountryName } from '../utils/userFunctions';

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  addressFormConfig,
  isocode,
  isTwoStepRegistrationForm,
}) => {
  const [showForm, setShowForm] = useState(isTwoStepRegistrationForm ? 0 : 1);
  const [isEProcUser, setEProcUser] = useState(null);

  const [ emailFormConfig, setEmailFormConfig] = useState(checkEmailFormConfig);
  const [ regFormConfig, setRegFormConfig] = useState(registrationFormConfig);
  const [ addFormConfig, setAddFormConfig] = useState(addressFormConfig);
  const [ registrationData, setRegistrationData] = useState({});

  window.addEventListener(
    "setEProcUser",
    function ({ detail: data }) {
      setEProcUser(data.isEProcUser);
    },
    false
  );

  function checkEmailSubmit(data) {
    if (isEProcUser !== null)
      isEProcUser
        ? checkEmailResetPasswordSubmit.call(this, data)
        : setShowForm(1);
  }

  function  checkRegistrationSubmit(data) {
    if (!data.addAddresses){
      data.userAddress = [];
      registrationSubmit.call(this, data);
      return;
    }

    registrationData.data = data;
    const countryName = getCountryName(registrationData.data.country, regFormConfig.config);
    registrationData.data.countryName = countryName;
    setRegistrationData(registrationData);
    // Set all Billing Fiields Hidden
    toggleAddresses(false);

    // Set Submit Button Text to "Create Account"
    const submitButton = document.getElementsByClassName("cmp-form--submit")[0];
    if(submitButton){
        submitButton.textContent = regFormConfig.config.buttonText;
    }
    setShowForm(2);
    // Hide all additional shippingOrganizationName & shippingStreetAddress
    hideAdditionalShippingFields();
  }

  const handleNavigateBackFn = ()=>  {
    // Clear Passwords
    registrationData.data.password = "";
    registrationData.data.confirmPassword = "";
    setRegistrationData(registrationData);
    hideDisplayRegistrationControls(true);
    setShowForm(1);

    if (addFormConfig.config.fields) {
      addFormConfig.config.fields.map(field => {
        // This prevents Caching of Surname
        if (field.name === "shippingOrganizationName1") {
          field.active = false;
        }
      });
    }
    setAddFormConfig(addFormConfig);
  }

  function  checkAddressSubmit(data) {
    const addressDetails = configureAddresses(data)
    registrationData.data.userAddress = addressDetails;
    registrationData.data.captcha  = data.shippingCaptcha;
    setRegistrationData(registrationData);
    registrationSubmit.call(this, registrationData.data);
    return;
  }

  const configureAddresses = (data) => {

    let shippingAddress = {};
    let billingAddress = {};
    shippingAddress.addressType = "shippingAddress";
    billingAddress.addressType = "billingAddress";

    shippingAddress.company = data.shippingOrganizationName1;
    shippingAddress.address1 = data.shippingOrganizationName2;
    shippingAddress.address2 = data.shippingOrganizationName3;
    shippingAddress.address3 = data.shippingOrganizationName4;
    shippingAddress.street = data.shippingStreetAddress1;
    shippingAddress.street2 = data.shippingStreetAddress2;
    shippingAddress.city = data.shippingCity;
    shippingAddress.stateRegion = data.shippingState;
    shippingAddress.zip = data.shippingZipPostalCode;
    shippingAddress.countryCode = data.country.toUpperCase();

    if (data.sameAddress) {
      // Copy Shipping Address to Billing Address
      billingAddress.company = shippingAddress.company;
      billingAddress.address1 = shippingAddress.address1;
      billingAddress.address2 = shippingAddress.address2;
      billingAddress.address3 = shippingAddress.address3;
      billingAddress.street = shippingAddress.street;
      billingAddress.street2 = shippingAddress.street2;
      billingAddress.city = shippingAddress.city;
      billingAddress.stateRegion = shippingAddress.stateRegion;
      billingAddress.zip = shippingAddress.zip;
      billingAddress.countryCode = shippingAddress.countryCode;
    }
    else {
      // Populate Billing Address
      billingAddress.company = data.billingOrganizationName1;
      billingAddress.address1 = data.billingOrganizationName2;
      billingAddress.address2 = data.billingOrganizationName3;
      billingAddress.address3 = data.billingOrganizationName4;
      billingAddress.street = data.billingStreetAddress1;
      billingAddress.street2 = data.billingStreetAddress2;
      billingAddress.city = data.billingCity;
      billingAddress.stateRegion = data.billingState;
      billingAddress.zip = data.billingZipPostalCode;
      billingAddress.countryCode = data.country.toUpperCase();
    }
    return [shippingAddress, billingAddress];
  }

  const hideAdditionalShippingFields = () => {
    if (addFormConfig.config.fields) {
      addFormConfig.config.fields.map(field => {
        if (field.name === "shippingOrganizationName2" || field.name === "shippingOrganizationName3" ||
            field.name === "shippingOrganizationName4" || field.name === "shippingStreetAddress2") {
          field.active = false;
        }
        // This prevents Caching of Surname
        if (field.name === "shippingOrganizationName1") {
          field.active = true;
        }
      });
    }
    setAddFormConfig(addFormConfig);
  }

  // Display the First inactive OrganizationName or StreetAddress control for billing or Shipping
  const  handleAddFieldFn = (btnName) => {
    const controlName = btnName.substr(0, btnName.lastIndexOf("_"));
    const beginIndex = 2;
    let endIndex = 3;
    if (controlName === "shippingOrganizationName" || controlName === "billingOrganizationName") {
      endIndex = 5;
    }
    let activatedControl = false;
    let activatedControlPosition = 0;
    for (var i = beginIndex; i < endIndex; i++) {
      if (addFormConfig.config.fields) {
        addFormConfig.config.fields.map(field => {
          if (field.name === controlName + i && field.active === false && activatedControl === false) {
            field.active = true;
            activatedControl = true;
            activatedControlPosition = i;
          }
        });
      }
      setAddFormConfig(addFormConfig);
    }
    // Hide Button if last control has been displayed
    if (activatedControlPosition + 1 === endIndex) {
      document.getElementById(controlName + "_Btn").style.display = "none";
    }
    else {
      // Add a class to the button container to adjust the top padding
      document.getElementById(controlName + "_Btn").parentNode.classList.add("noLabel");
    }
  }

  // Display or Hide all the billing controls except the second or subsequent billingOrganizationName or billingStreetAddress controls
  const handleToggleAddressFn = () => {
    if (document.getElementById("sameAddress")){
      const status = document.getElementById("sameAddress").checked;
      toggleAddresses(status);
    }
  }

  const toggleAddresses = (status) => {
    if (addFormConfig.config.fields) {
      if (status) {
        addFormConfig.config.fields.map(field => {
          if (field.name.startsWith("billing")
            && field.name !== "billingOrganizationName2"
            && field.name !== "billingOrganizationName3"
            && field.name !== "billingOrganizationName4"
            && field.name !== "billingStreetAddress2"
          ) {
            field.active = !(field.name === "billingState" && !field.options)   
          }
        });
      }
      else {
        addFormConfig.config.fields.map(field => {
          if (field.name.startsWith("billing")) {
            field.active = false;
          }
        });
      }
      setAddFormConfig(addFormConfig);
    }
  }

  const hideDisplayRegistrationControls = (isShown) => {
    // changes anyTimeLabel, captcha, privacy
    regFormConfig.config.fields.map(field => {
      if (field.name === "anyTimeLabel" || field.name === "captcha" || field.name === "privacy") {
        field.active = isShown;
      }
    });
    const submitButton = document.getElementsByClassName("cmp-form--submit")[0];
    if(submitButton){
      if (isShown) {
        submitButton.textContent = regFormConfig.config.buttonText;
      }
      else {
        submitButton.textContent = regFormConfig.config.altButtonText;
      }
    }
    setRegFormConfig(regFormConfig);
  }

  const handleAddAddressesFn = () => {
    if (document.getElementById("addAddresses")){
      const fieldStatus = document.getElementById("addAddresses").checked;
      hideDisplayRegistrationControls(fieldStatus);
    }
  }

  let formValues = {};
  switch (showForm) {
    case 0:
      return (
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          {...emailFormConfig}
          addAddressesFn={handleAddAddressesFn}
          submitFn={checkEmailSubmit}
          isocode={isocode}
        />
      </Suspense>) ;
    case 1:
      if (registrationData.data){
        formValues = {
          email: registrationData.data.email,
          firstName: registrationData.data.firstName,
          lastName: registrationData.data.lastName,
          company: registrationData.data.company,
          communications: registrationData.data.communications
        }
      }
      return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...regFormConfig}
              defaultValues={formValues}
              addAddressesFn={handleAddAddressesFn}
              submitFn={checkRegistrationSubmit}
              isocode={isocode}
            />
          </Suspense>);
      case 2:
        if (registrationData.data){
          formValues = {
            shippingOrganizationName1: "",
            shippingOrganizationName2: "",
            shippingOrganizationName3: "",
            shippingOrganizationName4: "",
            shippingStreetAddress1: "",
            shippingStreetAddress2: "",
            sameAddress: true,
            shippingCountry: registrationData.data.countryName,
            billingCountry: registrationData.data.countryName,
            country: registrationData.data.country
          }
        }

        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Form
              {...addFormConfig}
              submitFn={checkAddressSubmit}
              defaultValues={formValues}
              addFieldFn={handleAddFieldFn}
              toggleAddressFn={handleToggleAddressFn}
              navigateBackFn={handleNavigateBackFn}
              isocode={isocode}
            />
          </Suspense>);
    default:
      break;
  }
};

export default CreateAccountForm;