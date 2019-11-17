import React, { useRef } from "react";

import Icons from './components/icons';
import DisplayMessage from './components/displaymessage';
import Requirements from './components/requirements';

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

    const getRegisterAttributes = (ref) => {
        inputRef.current = ref;
        return getAttributes(ref, validation, errors, matchRef, emailUrl, setError, clearError);
    };

    const getMatchName = () => "confirm".concat(name.charAt(0).toUpperCase() + name.slice(1));

    const toggleReq = () => reqRef.current ? reqRef.current.toggle() : () => false;

    const updateReq = () => reqRef.current ? reqRef.current.update(inputRef.current.value) : () => false;

    const renderInput = () => {
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
                    {!validation.required &&
                    (<span className="cmp-form-field--optional">
                        {" "}
                        (optional)
                    </span>)}
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
                        disabled={disabled}
                        className={fieldErr ? "error" : "valid"}
                    ></input>
                    <Icons icons={icons} type={type} />
                </div>

                <DisplayMessage
                    validation={validation}
                    errors={errors}
                    fieldErr={fieldErr}
                    icon={icons.signInIcon}
                />

                {validation.validateFnName === "password" && validation.requirements &&
                (<Requirements
                    header={validation.requirementsLabel}
                    requirements={validation.requirements}
                    icon={icons.checkmarkIcon}
                    ref={reqRef}
                />)}
            </>
        );
    };

    return (
        <>
            {renderInput()}

            {hasMatch &&
            (<Input
                type={type}
                name={getMatchName()}
                label={matchLabel}
                hasMatch={false}
                icons={icons}
                register={register}
                description={ description ? "Match for ".concat(name) : "" }
                required={required}
                fieldErr={errors[getMatchName()]}
                errors={errors}
                setError={setError}
                validation={{
                    required: validation["required"],
                    requiredMsg: `Please confirm ${name}`,
                    validateFnName: "matching",
                    validationMsg: validation["nonMatchingMsg"]
                }}
                triggerValidation={triggerValidation}
                matchRef={inputRef}
            />)}
        </>
    );
};

export default Input;