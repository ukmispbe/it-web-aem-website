import { functions } from "../patterns";

export const getAttributes = (ref, validation, matchRef, emailUrl, setError, clearError) => {
    const setValidation = () => {
        if (validation && validation.validateFnName) {
            switch (validation.validateFnName) {
                case "matching":
                    return { validate: value => (
                        functions[validation.validateFnName](
                            value,
                            matchRef.current,
                            ref
                        )
                    )};
                case "password":
                    return { validate: value => (
                        functions[validation.validateFnName](
                            value,
                            ref,
                            setError,
                            clearError
                        )
                    )};
                case "email":
                    return { validate: value => (
                        functions["email"](
                            value,
                            ref,
                            validation.validationMsg,
                            setError,
                            clearError
                        ) &&
                        functions["newEmail"](
                            value,
                            emailUrl,
                            ref,
                            validation.alreadyRegisteredMsg,
                            setError,
                            clearError
                        )
                    )};
                case "checkBoxOrRadio":
                    return { validate: value => (
                        functions[validation.validateFnName](
                            value,
                            ref,
                            matchRef
                        )
                    )};
                default:
                    return { validate: value => (
                        functions[validation.validateFnName](
                            value,
                            ref
                        )
                    )};
            }
        }

        return {};
    };

    const setMinMax = () => {
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

    return {
        required:
            validation && validation.required
                ? validation.requiredMsg
                    ? validation.requiredMsg
                    : "Required"
                : false,
        ...setValidation(),
        ...setMinMax()
    };
};