import React from "react";
import { functions } from "./patterns";
import ReactSVG from "react-svg";

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
    let classNames = [];
    console.log(validation);
    const setValidation = () => {
        const obj = {};

        if (validation && validation.validateFnName) {
            if (validation.validateFnName === "matching") {
                obj.validate = value => {
                    return functions[validation.validateFnName](
                        value,
                        document.getElementById(matchRef),
                        document.getElementById(name)
                    );
                };
            } else if (validation.validateFnName === "password") {
                obj.validate = value => {
                    return functions[validation.validateFnName](
                        value,
                        document.getElementById(name),
                        setError,
                        clearError
                    );
                };
            } else if (validation.validateFnName === "email") {
                obj.validate = value => {
                    return (
                        functions["email"](
                            value,
                            document.getElementById(name),
                            validation.validationMsg,
                            setError,
                            clearError
                        ) &&
                        functions["newEmail"](
                            value,
                            emailUrl,
                            document.getElementById(name),
                            validation.alreadyRegisteredMsg,
                            setError,
                            clearError
                        )
                    );
                };
            } else {
                obj.validate = value => {
                    return functions[validation.validateFnName](
                        value,
                        document.getElementById(name)
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
                const ref = document.getElementById(name);
                if (ref) {
                    ref.classList.remove("error");
                    ref.classList.add("valid");
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

    const toggleEye = e => {
        const parent = e.currentTarget.parentNode;
        const onIcon = parent.querySelector(".showHide-icon");
        const offIcon = parent.querySelector(".showHideOff-icon");

        if (onIcon && offIcon) {
            onIcon.classList.toggle("toggled");
            offIcon.classList.toggle("toggled");

            type = onIcon.classList.contains("toggled") ? "text" : "password";
            parent.parentNode.querySelector("input").type = type;
        }
    };

    const toggleRequirements = e => {
        if (
            validation.validateFnName !== "password" ||
            !validation.requirements
        ) {
            return;
        }
        const requirementsDiv = e.currentTarget.parentNode.querySelector(
            ".cmp-form-field--input-requirements"
        );
        requirementsDiv.classList.toggle("toggled");
    };

    const updateRequirements = async e => {
        if (
            validation.validateFnName !== "password" ||
            !validation.requirements
        ) {
            return;
        }
        let validations = [{ name: name }];

        if (hasMatch) {
            const newName = name.charAt(0).toUpperCase() + name.slice(1);
            const confirmName = "confirm".concat(newName);
            validations.push({ name: confirmName });
        }

        resetRequirements();
        return await triggerValidation(validations);
    };

    const resetRequirements = () => {
        if (
            validation.validateFnName !== "password" ||
            !validation.requirements
        ) {
            return;
        }

        const input = document.getElementById(name);
        const parent = input.parentNode;
        const requirementsDiv = parent.querySelector(
            ".cmp-form-field--input-requirements"
        );
        let validElements = requirementsDiv.querySelectorAll(".valid");
        let validElArray = Array.apply(null, validElements);

        validElArray.forEach(elem => {
            if (input.value === "") {
                elem.classList.remove("valid");
            }
        });

        if (
            input.value !== "" &&
            requirementsDiv.querySelectorAll(".valid").length === 0
        ) {
            let requirementSVGs = requirementsDiv.querySelectorAll(
                ".requirements-info-svg"
            );
            let rrequirementSVGsArray = Array.apply(null, requirementSVGs);
            rrequirementSVGsArray.forEach(elem => {
                let nonError = true;
                if (errors[elem.id]) {
                    nonError = errors[elem.id].ref.name !== name;
                }

                if (nonError) {
                    elem.classList.add("valid");
                }
            });
        }
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

    const renderIcons = () => {
        if (!icons) {
            return <></>;
        }

        const eyeIcons =
            type === "password" ? (
                <>
                    <ReactSVG
                        src={icons.eyeIcon}
                        className="showHide-icon toggled"
                        onClick={toggleEye}
                    />
                    <ReactSVG
                        src={icons.eyeOffIcon}
                        className="showHideOff-icon"
                        onClick={toggleEye}
                    />
                </>
            ) : (
                <></>
            );

        return (
            <div className="cmp-form-field--icons">
                {eyeIcons}
                <ReactSVG src={icons.validIcon} className="valid-icon" />
                <ReactSVG src={icons.invalidIcon} className="invalid-icon" />
            </div>
        );
    };

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
                        className={classNames.toString().replace(",", " ")}
                        type={type}
                        name={name}
                        id={name}
                        ref={register(getRegisterAttributes())}
                        onFocus={toggleRequirements}
                        onBlur={toggleRequirements}
                        onChange={updateRequirements}
                        placeholder=" "
                        disabled={disabled}></input>
                    {renderIcons()}
                    {renderRequirements()}
                </div>
                <span className="cmp-form-field--errorText">
                    {displayMsg()}
                </span>
            </>
        );
    };

    const renderRequirementFields = requirements => {
        return requirements.map((requirement, i) => {
            const input = document.getElementById(name);
            let isValid = true;

            if (errors[requirement.name]) {
                isValid = errors[requirement.name].ref.name !== name;
            } else if (input) {
                isValid = input.value !== "";
            }

            return (
                <div key={`requirements-info-${i}`}>
                    <ReactSVG
                        id={requirement.name}
                        src={icons.validIcon}
                        className={
                            isValid
                                ? "valid requirements-info-svg"
                                : "requirements-info-svg"
                        }
                    />
                    <div className="requirements-info">{requirement.msg}</div>
                </div>
            );
        });
    };

    const renderRequirements = () => {
        if (
            validation.validateFnName !== "password" ||
            !validation.requirements
        ) {
            return <></>;
        }

        return (
            <div className="cmp-form-field--input-requirements">
                <div className="requirements-title">
                    {validation.requirementsLabel}
                </div>
                {renderRequirementFields(validation.requirements)}
            </div>
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
