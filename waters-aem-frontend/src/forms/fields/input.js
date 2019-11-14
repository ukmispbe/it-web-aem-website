import React, { useRef, useState, useEffect } from "react";
import { functions } from "./patterns";


import Requirements from './components/requirements';
import Icons from './components/icons';

const Input = ({
    type,
    name,
    label,
    disabled,
    hasMatch,
    matchLabel,
    icons,
    register,
    description,
    required,
    fieldErr,
    errors,
    setError,
    clearError,
    validation,
    triggerValidation,
    matchRef,
    emailUrl
}) => {
    const ref = useRef(null);
    const [inputNode, setInputNode] = useState(document.getElementById(name));
    const [reqShown, setReqShown] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        setInputNode(ref.current.querySelector(`#${name}`));
    });

    const setValidation = () => {
        const obj = {};

        if (validation && validation.validateFnName) {
            if (validation.validateFnName === "matching") {
                obj.validate = value => {
                    return functions[validation.validateFnName](
                        value,
                        document.getElementById(matchRef),
                        inputNode
                    );
                };
            } else if (validation.validateFnName === "password") {
                obj.validate = value => {
                    return functions[validation.validateFnName](
                        value,
                        inputNode,
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
                            inputNode,
                            validation.validationMsg,
                            setError,
                            clearError,
                            errors
                        ) &&
                        functions["newEmail"](
                            value,
                            emailUrl,
                            inputNode,
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
                        inputNode
                    );
                };
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

    const displayMsg = () => {
        if (validation) {
            if (fieldErr) {
                fieldErr.ref.classList.remove("valid");
                fieldErr.ref.classList.add("error");
                fieldErr.ref.parentNode.parentNode.classList.add("cmp-form-field--invalid");
                if (
                    validation.validateFnName === "email" &&
                    fieldErr.type === "validate"
                ) {
                    if (errors.invalidEmail) {
                        return errors.invalidEmail.message;
                    }
                    if (errors.alreadyRegistered) {
                        return displaySignInSpan();
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
                if (inputNode) {
                    inputNode.classList.remove("error");
                    inputNode.classList.add("valid");
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

    const displaySignInSpan = () => {
        if (validation.signInMsg && validation.alreadyRegisteredMsg) {
            return (
                <>
                    {validation.alreadyRegisteredMsg}
                    <a href={validation.signInURL}>
                        <ReactSVG
                            src={icons.signInIcon}
                            className="email-signin"
                        />
                        {validation.signInMsg}
                    </a>
                </>
            );
        }
    };

    const renderMatch = () => {
        if (!hasMatch) {
            return <></>;
        }

        const newName = name.charAt(0).toUpperCase() + name.slice(1);
        const confirmName = "confirm".concat(newName);
        const confirmLabel = matchLabel;
        const newValidation = {
            required: validation["required"],
            requiredMsg: `Please confirm ${name}`,
            validateFnName: "matching",
            validationMsg: validation["nonMatchingMsg"]
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
                    description={
                        description ? "Match for ".concat(newName) : ""
                    }
                    required={required}
                    fieldErr={errors[confirmName]}
                    errors={errors}
                    setError={setError}
                    validation={newValidation}
                    triggerValidation={triggerValidation}
                    matchRef={name}
                />
            </>
        );
    };

    const isPasswordRequirements = () => {
        return validation.validateFnName === "password" && validation.requirements;
    }

    const toggleReq = () => {
        setReqShown(!reqShown);
    }

    const updateReq = async e => {
        let validations = [{ name: name }];

        if (hasMatch) {
            const newName = name.charAt(0).toUpperCase() + name.slice(1);
            const confirmName = "confirm".concat(newName);
            validations.push({ name: confirmName });
        }

        setInput(e.currentTarget.value);
        return await triggerValidation(validations);
    }

    const renderInput = (name, label) => {
        return (
            <>
                <label
                    htmlFor={name}
                    className={
                        validation.validateFnName === "matching"
                            ? "cmp-form-field--label-matching"
                            : ""
                    }>
                    {label}
                    {validation.required ? (
                        <></>
                    ) : (
                        <span className="cmp-form-field--optional">
                            {" "}
                            (optional)
                        </span>
                    )}
                </label>
                {description && (
                    <div className="cmp-form_description">{description}</div>
                )}
                <div className="cmp-form-field--input" ref={ref}>
                    <input
                        type={type}
                        name={name}
                        id={name}
                        ref={register(getRegisterAttributes())}
                        onBlur={toggleReq}
                        onFocus={toggleReq}
                        onChange={updateReq}
                        placeholder=" "
                        disabled={disabled}></input>
                    <Icons icons={icons} type={type} />
                </div>
                <span className="cmp-form-field--errorText">
                    {displayMsg()}
                </span>
                {renderRequirements()}
            </>
        );
    };

    const renderRequirements = () => {
        if (!isPasswordRequirements()) return <></>;

        return (
            <Requirements
                header={validation.requirementsLabel}
                requirements={validation.requirements}
                toggled={reqShown}
                input={input}
                errors={errors}
                icon={icons.checkmarkIcon}
            />
        );
    };

    return (
        <>
            {renderInput(name, label)}

            {renderMatch()}
        </>
    );
};

export default Input;