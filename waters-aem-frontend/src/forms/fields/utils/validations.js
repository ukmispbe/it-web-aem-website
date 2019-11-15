import { functions } from "../patterns";

const setValidation = (validation, ref, errors, matchRef, emailUrl, setError, clearError) => {
    const obj = {};

    if (validation && validation.validateFnName) {
        if (validation.validateFnName === "matching") {
            obj.validate = value => {
                return functions[validation.validateFnName](
                    value,
                    document.getElementById(matchRef),
                    ref
                );
            };
        } else if (validation.validateFnName === "password") {
            obj.validate = value => {
                return functions[validation.validateFnName](
                    value,
                    ref,
                    setError,
                    clearError,
                    errors
                );
            };
        } else if (validation.validateFnName === "email") {
            obj.validate = value => {
                return (
                    functions["email"](
                        value,
                        ref,
                        validation.validationMsg,
                        setError,
                        clearError,
                        errors
                    ) &&
                    functions["newEmail"](
                        value,
                        emailUrl,
                        ref,
                        validation.alreadyRegisteredMsg,
                        setError,
                        clearError,
                        errors
                    )
                );
            };
        } else {
            obj.validate = value => {
                return functions[validation.validateFnName](
                    value,
                    ref
                );
            };
        }
    }

    return obj;
};

const setMinMax = (validation) => {
    const obj = {};

    if (validation) {
        if (validation.min) {
            obj.min = {
                value: validation.min.value,
                message: validation.min.message
            };
        }

        if (validation.max) {
            obj.max = {
                value: validation.max.value,
                message: validation.max.message
            };
        }

        if (validation.minLength) {
            obj.minLength = {
                value: validation.minLength.value,
                message: validation.minLength.message
            };
        }

        if (validation.maxLength) {
            obj.maxLength = {
                value: validation.maxLength.value,
                message: validation.maxLength.message
            };
        }
    }

    return obj;
};

export const getAttributes = (ref, validation, errors, matchRef, emailUrl, setError, clearError) => {
    return {
        required:
            validation && validation.required
                ? validation.requiredMsg
                    ? validation.requiredMsg
                    : "Required"
                : false,
        ...setValidation(validation, ref, errors, matchRef, emailUrl, setError, clearError),
        ...setMinMax(validation)
    };
};