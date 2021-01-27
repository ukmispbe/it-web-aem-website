import React, { useRef, useContext, useMemo, useEffect } from 'react';

import { useFormApi, useFieldApi } from '../form';
import { useErrorsContext } from './utils/stateWatcher';
import Icons from './components/icons';
import DisplayMessage from './components/displaymessage';
import Requirements from './components/requirements';

import { getAttributes } from './utils/validations';
import { elementLocator } from '../../utils/eCommerceFunctions';
import { renderFormattedLabel } from '../../utils/labelFunctions';
import {functions as validator } from './patterns/index';
const Input = ({
    name,
    label,
    description,
    validation,
    hasMatch,
    matchRef
}) => {
    const reqRef = useRef(null);
    const inputRef = useRef(null);

    const { type, disabled, matchLabel, emailValidationEndpoint, optionalLabel, initialState  } = useContext(useFieldApi);
    const { register, setError, setValue, clearError, setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, isAlreadyRegistered } = useContext(useFormApi);

    const errors = useErrorsContext();

    useEffect(() => {
        if (initialState) {
            setValue(name, initialState, true);
        }
    }, [name]);

    useEffect(() => {
        // On Component UnMount
        return () => {
            register({ name }, { required: false });
        }
    }, []);

    const getRegisterAttributes = ref => {
        inputRef.current = ref;
        return getAttributes(
            ref,
            validation,
            matchRef,
            emailValidationEndpoint,
            setError,
            clearError,
            setErrorBoundaryToTrue, 
            resetErrorBoundaryToFalse, 
            removeNotifications,
            setValue,
            name
        );
    };

    const getMatchName = () =>
        'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1));

    const toggleReq = () =>
        reqRef.current ? reqRef.current.toggle() : () => false;

    const updateReq = () => {
        switch (type) {
            case "text": {
                // use react-hook-form validation
                setValue(name, inputRef.current.value, true);
                break;
            }
            case "email": {
                if (validator[validation.validateFnName](inputRef.current.value, inputRef.current, validation.requiredMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications, setValue, name) === false) {
                    // Hide the Tick Icon as not a valid email and don't validate using react-hook-form mechanism
                    hideShowValidIcon(name, true);
                    clearError(name);
                }
                else {
                    // Stop hiding the tick icon as email is now valid 
                    hideShowValidIcon(name, false);
                    setValue(name, inputRef.current.value, true);
                }
                break;
            }
            case "password": {
                if (inputRef.current.name === "currentPassword") {
                    // Not the standard password validation use text validation
                    setValue(name, inputRef.current.value, true);
                    break;                    
                }
                if (inputRef.current.name === "password" || inputRef.current.name === "newPassword") {

                    // password: (value, ref, setError, clearError, throwErrors=true)
                    if (validator[validation.validateFnName](inputRef.current.value, inputRef.current, setError, clearError) === false) {
                        // Hide the Tick Icon as not a valid password and don't validate using react-hook-form mechanism
                        hideShowValidIcon(name, true);
                        clearError(name);
                    }
                    else {
                        // Stop hiding the tick icon as password is now valid 
                        hideShowValidIcon(name, false);
                        setValue(name, inputRef.current.value, true);
                    }
                }
                if (inputRef.current.name === "confirmPassword" || inputRef.current.name === "confirmNewPassword") {
                    let passwordId = "password";
                    if (inputRef.current.name === "confirmNewPassword") {
                        passwordId = "newPassword";
                    }

                    const passwordControl = document.getElementById(passwordId); 
                    // matching: (value, matchRef, ref) 
                    if (validator[validation.validateFnName](inputRef.current.value, passwordControl, inputRef.current) === false) {
                        // Hide the Tick Icon as not a valid confirm password and don't validate using react-hook-form mechanism
                        hideShowValidIcon(name, true, 1);
                        clearError(name);
                    }
                    else {
                        // Stop hiding the tick icon as confirm password is now valid 
                        hideShowValidIcon(name, false, 1);
                        setValue(name, inputRef.current.value, true);
                    }
                }               
                break;
            }
            default: {
                break;
            }
        }
        reqRef.current ? reqRef.current.update(inputRef.current.value) : () => false;
    }

    const hideShowValidIcon = (controlName, isHidden, index=0) => {
        const control = document.getElementById(controlName);       
        let styleString = "inline-block";
        if (isHidden) {
            styleString = "none";
        }
        if (control) {
            const mainControlDiv = control.parentElement.parentElement;
            if (mainControlDiv) {
                mainControlDiv.getElementsByClassName("valid-icon")[index].style.display = styleString;
            }      
        }      
    }

    const getMatchReq = useMemo(
        () => ({
            required: validation['required'],
            requiredMsg: validation.requiredMatchMsg,
            validateFnName: 'matching',
            validationMsg: validation['nonMatchingMsg'],
            maxLength: validation.maxLength
        }),
        [name, validation]
    );

    const renderInput = () => {
        return (
            <>
                <label
                    htmlFor={name}

                    className={
                        validation.validateFnName === 'matching'
                            ? 'cmp-form-field--label-matching'
                            : ''
                    }
                    data-locator={elementLocator(label) || 'form-field--label'}
                >
                    {renderFormattedLabel(label, validation.required, optionalLabel)}
                </label>

                {description && (
                    <div className="cmp-form_description">{description}</div>
                )}

                <div className="cmp-form-field--input">
                    <input
                        type={type}
                        name={name}
                        id={name}
                        ref={ref => register(ref, getRegisterAttributes(ref))}
                        onBlur={toggleReq}
                        onFocus={toggleReq}
                        onChange={updateReq}
                        placeholder=" "
                        aria-label={name}
                        disabled={disabled}
                        autocomplete="off"
                        aria-labelledby={name}
                        aria-required={validation.required}
                        className={
                            !!errors[name]
                                ? 'error'
                                : !!inputRef.current
                                ? !!inputRef.current.value
                                    ? 'valid'
                                    : ''
                                : ''
                        }
                        data-locator={elementLocator(name) || 'form-field-input'}
                    ></input>
                    <Icons />
                </div>

                <DisplayMessage name={name} validation={validation} isAlreadyRegistered={isAlreadyRegistered} />

                {validation.validateFnName === 'password' &&
                    validation.requirements && (
                        <Requirements
                            header={validation.requirementsLabel}
                            requirements={validation.requirements}
                            ref={reqRef}
                        />
                    )}
            </>
        );
    };

    return (
        <>
            {renderInput()}

            {hasMatch &&
                <Input
                name={getMatchName()}
                label={matchLabel}
                hasMatch={false}
                description={
                    description ? 'Match for '.concat(name) : ''
                }
                validation={getMatchReq}
                matchRef={inputRef}
            />}
        </>
    );
};

export default React.memo(Input);
