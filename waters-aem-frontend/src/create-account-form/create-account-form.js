import React, { useState, useEffect } from "react";

import Form from "../forms/form";

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  isocode,
}) => {
  const [showRegistrationForm, setRegistrationFormVisibility] = useState(false);
  const [isEProcUser, setEProcUser] = useState(false);

  window.addEventListener("setEProcUser", function(event) {
    setEProcUser(true);
  });

  const checkEmailSubmit = (data) => {setRegistrationFormVisibility(true);};

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
