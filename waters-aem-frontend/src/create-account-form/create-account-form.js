import React, { useState, useEffect } from "react";
import Form from '../forms/form';
import { checkEmailResetPasswordSubmit } from '../forms/services/submit';

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  isocode,
}) => {
  const [showRegistrationForm, setRegistrationFormVisibility] = useState(false);
  const [isEProcUser, setEProcUser] = useState(false);

  window.addEventListener("setEProcUser", function (event) {
    setEProcUser(true);
  });

  function checkEmailSubmit(data) {
    isEProcUser
      ? checkEmailResetPasswordSubmit.call(this, data)
      : setRegistrationFormVisibility(true);
  };

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
