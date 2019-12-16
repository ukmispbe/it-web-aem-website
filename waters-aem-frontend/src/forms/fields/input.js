import React, { useRef, useContext, useMemo } from "react";

import { useFormApi, useFieldApi } from '../form';
import { useErrorsContext } from './utils/stateWatcher';
import Icons from './components/icons';
import DisplayMessage from './components/displaymessage';
import Requirements from './components/requirements';

import { getAttributes } from './utils/validations';

const Input = ({
    name,
    label,
    description,
    validation,
    hasMatch,
    matchRef,
}) => {
    const reqRef = useRef(null);
    const inputRef = useRef(null);

    const { type, disabled, matchLabel, emailUrl } = useContext(useFieldApi);
    const { register, setError, clearError } = useContext(useFormApi);

    const errors = useErrorsContext();

    const getRegisterAttributes = (ref) => {
        inputRef.current = ref;
        return getAttributes(ref, validation, matchRef, emailUrl, setError, clearError);
    };

    const getMatchName = () => "confirm".concat(name.charAt(0).toUpperCase() + name.slice(1));

    const toggleReq = () => reqRef.current ? reqRef.current.toggle() : () => false;

    const updateReq = () => reqRef.current ? reqRef.current.update(inputRef.current.value) : () => false;

    const getMatchReq = useMemo(() => ({ required: validation["required"], requiredMsg: `Please confirm your ${name}.`, validateFnName: "matching", validationMsg: validation["nonMatchingMsg"] }), [name, validation]);

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
                        ref={ref => register(ref, getRegisterAttributes(ref))}
                        onBlur={toggleReq}
                        onFocus={toggleReq}
                        onChange={updateReq}
                        placeholder=" "
                        disabled={disabled}
                        className={!!errors[name] ? "error" : (!!inputRef.current ? (!!inputRef.current.value ? "valid" : "") : "")}
                    ></input>
                    <Icons />
                </div>

                <DisplayMessage
                    name={name}
                    validation={validation}
                />

                {validation.validateFnName === "password" && validation.requirements &&
                (<Requirements
                    header={validation.requirementsLabel}
                    requirements={validation.requirements}
                    ref={reqRef}
                />)}
            </>
        );
    };

    return (
        <>
            {renderInput()}

            {hasMatch &&
            (useMemo(() => (<Input
                name={getMatchName()}
                label={matchLabel}
                hasMatch={false}
                description={description ? "Match for ".concat(name) : ""}
                validation={getMatchReq}
                matchRef={inputRef}
            />), [matchLabel, description, inputRef]))}
        </>
    );
};

export default React.memo(Input);