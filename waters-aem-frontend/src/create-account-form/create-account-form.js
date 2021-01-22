import React, { Suspense, useState, useEffect } from "react";
const Form = React.lazy(() => import(/* webpackChunkName: "forms" */'../forms/form'));
import { checkEmailResetPasswordSubmit } from "../forms/services/submit";

const CreateAccountForm = ({
  registrationFormConfig,
  checkEmailFormConfig,
  isocode,
  isTwoStepRegistrationForm,
}) => {
  const [showRegistrationForm, setRegistrationFormVisibility] = useState(!isTwoStepRegistrationForm);
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
    <Suspense fallback={<div>Loading...</div>}>
      <Form {...registrationFormConfig} isocode={isocode} />
    </Suspense>
  ) : (
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          {...checkEmailFormConfig}
          submitFn={checkEmailSubmit}
          isocode={isocode}
        />
      </Suspense>
    );
};

export default CreateAccountForm;
