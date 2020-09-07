import React, { useRef, useState, useContext, useMemo } from 'react';
import { useFormApi, useFieldApi } from '../form';
import { useErrorsContext } from './utils/stateWatcher';
import DisplayMessage from './components/displaymessage';
import { getAttributes } from './utils/validations';
import { renderFormattedLabel } from '../../utils/labelFunctions';

const TextArea = ({
    name,
    label,
    resize,
    rows,
    description,
    validation,
    showTextInfo,
    hasMatch,
    matchRef
}) => {
    const reqRef = useRef(null);
    const inputRef = useRef(null);
    const [textInfo, setTextInfo] = useState({
        remainingChar: validation.maxLength ? validation.maxLength.value : 0,
        maxLength: validation.maxLength ? validation.maxLength.value : 0,
        text: showTextInfo && showTextInfo.remainingMoreTextMsg ? showTextInfo.remainingMoreTextMsg : '',
        isCharOver: false,
    });

    const { disabled, matchLabel, emailValidationEndpoint, optionalLabel } = useContext(useFieldApi);
    const { register, setError, setValue, clearError } = useContext(useFormApi);

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
        setValue(name, inputRef.current.value, true);
        reqRef.current
            ? reqRef.current.update(inputRef.current.value)
            : () => false;

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

    const onKeyUp = event => {
        if (showTextInfo) {
            const remainingChar = textInfo.maxLength - event.target.value.length;
            let text;
            let isCharOver = false;
            if (remainingChar >= 0) {
                text = remainingChar > 1 ? showTextInfo.remainingMoreTextMsg : showTextInfo.remainingOneTextMsg;
            } else {
                text = Math.abs(remainingChar) > 1 ? showTextInfo.overMoreTextMsg : showTextInfo.overOneTextMsg;
                isCharOver = true;
            }
            setTextInfo(prevState => ({
                ...prevState,
                remainingChar: Math.abs(remainingChar),
                text,
                isCharOver
            }));
        }
    };

    const renderTextArea = () => {
        return (
            <>
                <label
                    htmlFor={name}

                    className={
                        validation.validateFnName === 'matching'
                            ? 'cmp-form-field--label-matching'
                            : ''
                    }
                >
                    {renderFormattedLabel(label, validation.required, optionalLabel)}
                </label>

                {description && (
                    <div className="cmp-form_description">{description}</div>
                )}

                <div className="cmp-form-field--textarea">
                    <textarea
                        name={name}
                        id={name}
                        ref={ref => register(ref, getRegisterAttributes(ref))}
                        onBlur={toggleReq}
                        onFocus={toggleReq}
                        onChange={updateReq}
                        onKeyUp={onKeyUp}
                        placeholder=" "
                        disabled={disabled}
                        aria-labelledby={name}
                        aria-required={validation.required}
                        resize={resize}
                        rows={rows}
                        className={
                            !!errors[name]
                                ? `error ${resize ? '' : 'disable-resize'}`
                                : !!inputRef.current
                                    ? !!inputRef.current.value
                                        ? `valid ${resize ? '' : 'disable-resize'}`
                                        : `${resize ? '' : 'disable-resize'}`
                                    : `${resize ? '' : 'disable-resize'}`
                        }
                    ></textarea>
                </div>
                <div className="textarea-info">
                    <DisplayMessage name={name} validation={validation} />
                    {showTextInfo && <div className={`text-info ${textInfo.isCharOver ? 'errorText' : ''}`}>{`${textInfo.remainingChar} ${textInfo.text}`}</div>}
                </div>
            </>
        );
    };

    return (
        <>
            {renderTextArea()}

            {hasMatch &&
                useMemo(
                    () => (
                        <TextArea
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

export default React.memo(TextArea);
