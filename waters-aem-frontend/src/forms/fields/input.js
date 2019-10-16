import React from "react";
import { functions } from "./patterns";

const Input = ({
    type,
    name,
    label,
    register,
    description,
    required,
    fieldErr,
    validation
}) => {
    const setValidation = () => {
        const obj = {};

        if (validation && validation.validateFnName) {
            obj.validate = functions[validation.validateFnName];
        }

        return obj;
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

    const displayMsg = () => {
        if (validation) {
            if (fieldErr) {
                console.log(fieldErr);
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
            }
        }
    };

    const getRegisterAttributes = () => {
        const reg = {
            required:
                validation && validation.required
                    ? validation.requiredMsg
                        ? validation.requiredMsg
                        : "Required"
                    : false,
            ...setValidation(),
            ...setMinMax()
        };

        return reg;
    };

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                ref={register(getRegisterAttributes())}
            ></input>

            {displayMsg()}

            {description && (
                <span className="cmp-form_description">{description}</span>
            )}
        </>
    );
};

export default Input;
