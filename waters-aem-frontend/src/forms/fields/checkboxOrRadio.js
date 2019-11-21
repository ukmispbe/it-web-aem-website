import React, { useState, useContext, useRef } from 'react';
import ReactSVG from "react-svg";

import { useFormApi, useFieldApi } from '../form';
import { getAttributes } from './utils/validations';

const CheckboxOrRadio = ({}) => {
    const { name, label, options, disabled, icons, config, validation, type, description } = useContext(useFieldApi);
    const { register, setValue, fieldError } = useContext(useFormApi);
    const inputRef = useRef(null);

    const [state, setState] = useState(() => {
        if (!options) {
            return {
                [name]: {
                    isChecked: false,
                    required: validation && validation.required ? true : false,
                    description: description ? description : '',
                    ...config
                }
            };
        } else {
            const defaultOptions = options.map((option, i) => {
                const thisOption = {
                    [option.name]: {
                        isChecked: false,
                        required: validation && validation.validateFnName && option.required ? true : false,
                        description: option.description ? option.description : '',
                        ...option.config
                    }
                };
                return thisOption;
            })
            return Object.assign({}, ...defaultOptions);
        }
    });

    const checkHandler = (event, thisName) => {
        if (!disabled) {
            const thisState = state[thisName];
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

    const renderLabel = (thisName, label) => {
        const newLabel = <>
            {label + " "}
            {renderAddOnLink(thisName)}
            { !state[thisName].required && (
                <span className='cmp-form-field--optional'>(optional)</span>
            )}
        </>

        return newLabel;
    }

    const renderAddOnLink = (thisName) => {
        const thisState = state[thisName];
        if (thisState.text && thisState.link && thisState.blank) {
            return <a
                href={thisState.link}
                target={thisState ? "_blank" : ""}
                rel="noopener">
                {thisState.text}
            </a >
        }
        return '';
    }

    const renderType = (thisName, label) => {
        const thisState = state[thisName];

        return (
            <>
                <input
                    type={type}
                    name={thisName}
                    id={thisName}
                    disabled={disabled}
                    checked={thisState.isChecked}
                    ref={inputRef}
                    className={fieldError(thisName) ? "error" : "valid"}
                    readOnly
                />
                <a
                    href="javascript:void(0)"
                    className={`${type} ` + (disabled ? ' disabled' : '') + (fieldError(thisName) ? " error" : " valid")}
                    onClick={(e) => {
                        checkHandler(e, thisName);
                    }}
                    id={thisName + '_link'}
                    ref={ref => register({ name: thisName }, getAttributes(inputRef.current, validation, ref))}
                >
                    {
                        type == 'checkbox' ? (<ReactSVG src={icons.checkmarkIcon} />) : (<div className="selector"></div>)
                    }
                </a>
                <div className={`cmp-form-field-${type}--wrapper` + (disabled ? ' disabled' : '')}>
                    <label htmlFor={thisName} onClick={(e) => {
                            checkHandler(e, thisName);
                    }}>{renderLabel(thisName, label)}</label>
                    {thisState.description && (
                        <span class="cmp-form_description">{thisState.description}</span>
                    )}
                </div>
            </>
        );
    };

    const renderGrouping = () => {
        if (!options) {
            return renderType(name, label);
        } else {
            return (
                <div id={name} className={`cmp-form-field-${type}--grouping`}>
                    {options.map((option, i) => {
                        return (
                            <div className={`cmp-form-field-${type}--grouping-item`} key={`${type}-${name}-grouping-${i}`} >
                                {renderType(option.name, option.label)}
                            </div>
                        );
                    })}
                </div>
            )
        }
    };

    return (
        <>
            {renderGrouping()}
        </>
    );
};

export default CheckboxOrRadio;
