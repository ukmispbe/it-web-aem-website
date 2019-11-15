import React, { useRef } from "react";
import ReactSVG from "react-svg";

import Requirements from './components/requirements';
import Icons from './components/icons';

import { getAttributes } from './utils/validations';

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
    const reqRef = useRef(null);
    const inputRef = useRef(null);

    const displayMsg = () => {
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
                if (inputRef.current) {
                    inputRef.current.classList.remove("error");
                    inputRef.current.classList.add("valid");
                }
            }
        }
    };

    const getRegisterAttributes = (ref) => {
        inputRef.current = ref;
        return getAttributes(ref, validation, errors, matchRef, emailUrl, setError, clearError);
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

    const getMatchName = () => "confirm".concat(name.charAt(0).toUpperCase() + name.slice(1));

    const renderMatch = () => {
        if (!hasMatch) {
            return <></>;
        }

        const confirmName = getMatchName();
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

    const toggleReq = () => reqRef.current ? reqRef.current.toggle() : () => false;

    const updateReq = () => reqRef.current ? reqRef.current.update(inputRef.current.value) : () => false;

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
                <div className="cmp-form-field--input">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        ref={(ref) => register(ref, getRegisterAttributes(ref))}
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
                icon={icons.checkmarkIcon}
                ref={reqRef}
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