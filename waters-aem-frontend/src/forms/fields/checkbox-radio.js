import React, { useState, useContext, useCallback } from 'react';
import ReactSVG from 'react-svg';

import { useFormApi, useFieldApi } from '../form';
import { useErrorsContext } from './utils/stateWatcher';
import { elementLocator } from '../../utils/eCommerceFunctions';
import { renderFormattedLabelText } from '../../utils/labelFunctions';

const CheckboxOrRadio = ({}) => {
    const {
        name,
        label,
        options,
        disabled,
        icons,
        config,
        validation,
        type,
        description,
        initialState,
        optionalLabel
    } = useContext(useFieldApi);

    const { register, setValue, toggleAddressFn, addAddressesFn, triggerValidation } = useContext(useFormApi);

    const errors = useErrorsContext();

    const [state, setState] = useState(() => {
        if (!options) {
            return {
                [name]: {
                    isChecked: initialState,
                    required: validation && validation.required ? true : false,
                    description: description ? description : '',
                    ...config
                }
            };
        } else {
            const defaultOptions = options.map((option, i) => {
                const thisOption = {
                    [option.name]: {
                        isChecked: option.name === initialState,
                        required:
                            validation &&
                            validation.validateFnName &&
                            option.required
                                ? true
                                : false,
                        description: option.description
                            ? option.description
                            : '',
                        ...option.config
                    }
                };
                return thisOption;
            });
            return Object.assign({}, ...defaultOptions);
        }
    });

    const checkHandler = (event, thisName) => {
        if (!disabled) {
             // Check if Same Address
            if (thisName === "sameAddress") {
                toggleAddressFn();
                triggerValidation(["sameAddress"]);
            }
            // Check if Add Addresses
            if (thisName === "addAddresses") {
                addAddressesFn();
                triggerValidation(["addAddresses"]);
            }

            const thisState = state[thisName];

            if (options) {
                for (let key of Object.keys(state)) {
                    if (key === thisName) {
                        state[key].isChecked = true;
                    }
                    else {
                        state[key].isChecked = false;
                    }
                    setValue(key, state[key].isChecked, state[key].required);
                }
                setState({ ...state });
                // Non Mobile has Link Wrapper
                const submitControlArrayLength = document.getElementsByClassName("cmp-button").length;
                if(submitControlArrayLength > 0) {
                    document.getElementsByClassName("cmp-button")[submitControlArrayLength - 1].classList.remove("cmp-button--disabled");
                    document.getElementsByClassName("cmp-button")[submitControlArrayLength - 1].disabled = false;
                }
                return;
            }

            setValue(thisName, !thisState.isChecked, thisState.required);
            setState({
                ...state,
                [thisName]: {
                    ...thisState,
                    isChecked: !thisState.isChecked
                }
            });
        }
    };

    const hasError = useCallback(name => !!errors[name], [errors]);

    const renderLabel = (thisName, lbl) => {
        let formattedLabel = lbl;
        // If a check Box and required add required indicator to label
        if (state[thisName] && state[thisName].required && type !== 'radio') {
            formattedLabel = renderFormattedLabelText(label, true)
        }
        return (
            <>
                {formattedLabel + ' '}
                {state[thisName] && renderAddOnLink(thisName)}
                {state[thisName] && !state[thisName].required && type !== 'radio' && optionalLabel && (
                    <span className="cmp-form-field--optional">{optionalLabel}</span>
                )}
            </>
        )
    }

    const renderAddOnLink = thisName => {
        const thisState = state[thisName];
        return (
            thisState.text &&
            thisState.link &&
            thisState.blank && (
                <a
                    href={thisState.link}
                    target={thisState ? '_blank' : ''}
                    rel="noopener noreferrer"
                    data-locator={elementLocator(thisState.text || 'add-on-link')}
                >
                    {thisState.text}
                </a>
            )
        );
    };

    const renderType = (thisName, label) => {
        const thisState = state[thisName];

        return (
            <>
                <input
                    type={type}
                    role={type}
                    name={thisName}
                    id={thisName}
                    aria-labelledby={thisName}
                    disabled={disabled}
                    aria-disabled={disabled ? true : false}
                    checked={thisState.isChecked}
                    aria-checked={thisState.isChecked}
                    aria-required={thisState.required}
                    className={hasError(thisName) ? 'error' : 'valid'}
                    ref={register(thisState.required ? { required: true } : {})}
                    readOnly
                    data-locator={elementLocator(thisName || 'input-type')}
                />
                <a
                    className={
                        `${type} ` +
                        (disabled ? ' disabled' : '') +
                        (hasError(thisName) ? ' error' : ' valid')
                    }
                    onClick={e => checkHandler(e, thisName)}
                    id={thisName + '_link'}
                >
                    {type == 'checkbox' ? (
                        <ReactSVG src={icons.checkmarkIcon} />
                    ) : (
                        <div className="selector"></div>
                    )}
                </a>
                <div
                    data-locator={elementLocator(`${thisName}-${type}-wrapper`)}
                    className={
                        `cmp-form-field-${type}--wrapper` +
                        (disabled ? ' disabled' : '')
                    }
                >
                    <label
                        htmlFor={thisName}
                        onClick={e => checkHandler(e, thisName)}
                        data-locator={elementLocator(`${thisName}-${type}-label`)}
                    >
                        {renderLabel(thisName, label)}
                    </label>
                    {thisState.description && (
                        <span class="cmp-form_description">
                            {thisState.description}
                        </span>
                    )}
                </div>
            </>
        );
    };
    try {
        return !options ? (
            renderType(name, label)
        ) : (
                <div id={name} className={`cmp-form-field-${type}--grouping`}>
                    {label && (<label
                        htmlFor={name}
                        onClick={e => checkHandler(e, name)}
                        data-locator={elementLocator(`${name}-${type}-label`)}
                    >
                        {renderLabel(name, label)}
                    </label>)}
                    {options.map((option, i) => {
                        let address;
                        if (option.address) {
                            address=[];
                            option.address.map((addressPiece) => {
                                address.push(<div className={`cmp-form-field-${type}--address1`}>{addressPiece}</div>)
                            })
                        }
                        return (
                            <>
                                <div style={{ paddingTop: "10px" }}
                                    className={`cmp-form-field-${type}--grouping-item`}
                                    key={`${type}-${name}-grouping-${i}`}
                                >
                                    {renderType(option.name, option.label)}
                                </div>
                                {address}
                            </>
                        );
                    })}
                </div>
            );
    } catch (error) {
        console.log("error ", error);
    }

};

export default React.memo(CheckboxOrRadio);