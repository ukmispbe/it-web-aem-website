import React from "react";
import { functions } from "./patterns";
import ReactSVG from "react-svg";

const Input = ({
    type,
    name,
    label,
    hasMatch,
    icons,
    register,
    description,
    required,
    fieldErr,
    errors,
    setError,
    clearError,
    validation,
    matchRef
}) => {
    const setValidation = () => {
        const obj = {};

        if (validation && validation.validateFnName) {
            if (validation.validateFnName === "matching") {
                obj.validate = value => {
                    return functions[validation.validateFnName](value, document.getElementById(matchRef));
                };
            } else if (validation.validateFnName === "password") {
                obj.validate = value => {
                    return functions[validation.validateFnName](value, document.getElementById(name), setError, clearError);
                };
            } else {
                obj.validate = functions[validation.validateFnName];
            }
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

    const displayMsg = (name) => {
        if (validation) {
            if (fieldErr) {
                fieldErr.ref.classList.add('error');
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

    const toggleEye = (e) => {
        const parent = e.currentTarget.parentNode;
        const onIcon = parent.querySelector('.showHide-icon');
        const offIcon = parent.querySelector('.showHideOff-icon');

        if (onIcon && offIcon) {
            onIcon.classList.toggle('toggled');
            offIcon.classList.toggle('toggled');

            type = (onIcon.classList.contains('toggled')) ? "text" : "password";
            parent.parentNode.querySelector('input').type = type;
        }
    };

    const renderMatch = () => {
        if (!hasMatch) {
            return (<></>);
        }

        const newName = name.charAt(0).toUpperCase() + name.slice(1);
        const confirmName = "confirm".concat(newName);
        const confirmLabel = "Confirm ".concat(newName);
        const newValidation = {
            'validateFnName': 'matching',
            "validationMsg": validation['nonMatchingMsg']
        };

        return (
            <>
                <Input
                    type={type}
                    name={confirmName}
                    label={confirmLabel}
                    hasMatch={false}
                    icons={icons}
                    register={register}
                    description={description ? "Match for ".concat(newName) : ""}
                    required={required}
                    fieldErr={errors[confirmName]}
                    errors={errors}
                    setError={setError}
                    validation={newValidation}
                    matchRef={name}
                />
            </>
        );
    }

    const renderIcons = () => {
        if (!icons) {
            return (<></>);
        }

        const eyeIcons = (
            type === "password" ? (
                <>
                <ReactSVG src={icons.eyeIcon} className="showHide-icon" onClick={toggleEye} />
                <ReactSVG src={icons.eyeOffIcon} className="showHideOff-icon toggled" onClick={toggleEye} />
                </>
            ) : (<></>)
        );

        return (<div className="cmp-form-field--icons">
            {eyeIcons}
            <ReactSVG src={icons.validIcon} className="valid-icon" />
            <ReactSVG src={icons.invalidIcon} className="invalid-icon" />
        </div>);
    };

    const renderInput = (name, label) => {
        return (
            <>
                <label htmlFor={name}>{label}</label>
                <div className="cmp-form-field--input">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        ref={register(getRegisterAttributes())}
                    ></input>
                    {renderIcons()}
                    {displayMsg(name)}
                </div>
            </>
        );
    };

    return (
        <>
            {renderInput(name, label)}

            {description && (
                <span className="cmp-form_description">{description}</span>
            )}

            {renderMatch()}
        </>
    );
};

export default Input;
