import React from 'react';
import ReactSVG from "react-svg";

const displaySignInSpan = (validation, signInIcon) => {
    if (validation.signInMsg && validation.alreadyRegisteredMsg) {
        return (
            <>
                {validation.alreadyRegisteredMsg}
                <a href={validation.signInURL}>
                    <ReactSVG
                        src={signInIcon}
                        className="email-signin"
                    />
                    {validation.signInMsg}
                </a>
            </>
        );
    }
};

export const getDisplayMsg = (inputRef, validation, fieldErr, errors, signInIcon) => {
    if (validation) {
        if (fieldErr) {
            fieldErr.ref.classList.remove("valid");
            fieldErr.ref.classList.add("error");
            if (
                validation.validateFnName === "email" &&
                fieldErr.type === "validate"
            ) {
                if (errors.invalidEmail) {
                    return errors.invalidEmail.message;
                }
                if (errors.alreadyRegistered) {
                    return displaySignInSpan(validation, signInIcon);
                }
                return null;
            }
            if (fieldErr.type === "required") {
                return fieldErr.message || validation.requiredMsg;
            } else if (
                fieldErr.type === "validate" ||
                fieldErr.type === "pattern"
            ) {
                return fieldErr.message || validation.validationMsg;
            } else {
                return fieldErr.message || null;
            }
        } else if (
            validation.validateFnName === "noValidation" &&
            validation.required
        ) {
            if (inputRef.current) {
                inputRef.current.classList.remove("error");
                inputRef.current.classList.add("valid");
            }
        }
    }
};
