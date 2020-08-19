import React, { useState, useEffect } from "react";

import Form from "../forms/form";

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  isocode,
}) => {
  const [showRegistrationForm, setRegistrationFormVisibility] = useState(false);

  const checkEmailSubmit = (data) => {setRegistrationFormVisibility(true);console.log("Data", data)};
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
