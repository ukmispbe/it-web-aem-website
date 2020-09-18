import React, { useRef, useContext, useMemo } from 'react';

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

    const { type, disabled, matchLabel, emailValidationEndpoint, optionalLabel } = useContext(useFieldApi);
    const { register, setError, setValue, clearError, formName } = useContext(useFormApi);

    const errors = useErrorsContext();

    const getRegisterAttributes = ref => {
        inputRef.current = ref;
        return getAttributes(
            ref,
            validation,
            matchRef,
            emailValidationEndpoint,
            setError,
            clearError
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
                console.log(validation.validateFnName, validator[validation.validateFnName](inputRef.current.value, inputRef.current, "Email Error", setError, clearError));
                if (validator[validation.validateFnName](inputRef.current.value, inputRef.current, "Email Error", setError, clearError) === false) {
                    // Hide the Tick Icon as not a valid email and don't validate using react-hook-form mechanism
                    console.log ("Invalid Email");
                    hideShowValidIcon(name, true);
                }
                else {
                    // Stop hiding the tick icon as email is now valid 
                    console.log ("Valid Email");
                    hideShowValidIcon(name, false);
                    setValue(name, inputRef.current.value, true);
                }
                break;
            }
            case "password": 
            case "confirmPassword": {
                // use react-hook-form validation
                setValue(name, inputRef.current.value, true);
                break;
            }
        }
        reqRef.current ? reqRef.current.update(inputRef.current.value) : () => false;
    }

    const hideShowValidIcon = (controlName, isHidden) => {
        const control = document.getElementById(controlName);       
        let styleString = "inline-block";
        if (isHidden === true) {
            styleString = "none";
        }
        if (control !== null) {
            const mainControlDiv = control.parentElement.parentElement;
            if (mainControlDiv !== null) {
                mainControlDiv.getElementsByClassName("valid-icon")[0].style.display = styleString;
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

                <DisplayMessage name={name} validation={validation} />

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
                useMemo(
                    () => (
                        <Input
                            name={getMatchName()}
                            label={matchLabel}
                            hasMatch={false}
                            description={
                                description ? 'Match for '.concat(name) : ''
                            }
                            validation={getMatchReq}
                            matchRef={inputRef}
                        />
                    ),
                    [matchLabel, description, inputRef]
                )}
        </>
    );
};

export default React.memo(Input);
