import React, { useState, useEffect } from "react";
import Form from "../forms/form";
import { checkEmailResetPasswordSubmit } from "../forms/services/submit";

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  isocode,
}) => {
  const [showRegistrationForm, setRegistrationFormVisibility] = useState(false);
  const [isEProcUser, setEProcUser] = useState(null);

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
        : setRegistrationFormVisibility(true);
  }

  return showRegistrationForm ? (
    <Form {...registrationFormConfig} isocode={isocode} />
  ) : (
    <Form
      {...checkEmailFormConfig}
      submitFn={checkEmailSubmit}
      isocode={isocode}
    />
  );
};

export default CreateAccountForm;
