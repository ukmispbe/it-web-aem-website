import React, { useState, useEffect } from 'react';
import ReactSVG from "react-svg";
import { functions } from "./patterns";

const Checkbox = ({
    name,
    label,
    options,
    disabled,
    register,
    icons,
    config,
    validation,
    setValue
}) => {
    const [state, setState] = useState(() => { 
        if (!options) {
            return {
                [name]: {
                    isChecked: false,
                    required: validation && validation.required ? true : false,
                    ...config
                }
            };
        } else {
            const defaultOptions = options.map((option, i) => {
                const thisOption = {
                    [option.name]: {
                        isChecked: false,
                        required: option.required ? true : false,
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
            setValue(thisName, !state[thisName].isChecked, state[thisName].required ? true : false);
            setState({
                ...state,
                [thisName]: {
                    ...state[thisName],
                    isChecked: !state[thisName].isChecked
                }
            });
        }
    };

    const getRegisterAttributes = (thisName) => {
        const ref = { name: thisName };
        const reg = {
            required: state[thisName].required ? true : false,
            ...setValidation(thisName)
        };

        return [ref, reg];
    };

    const setValidation = (thisName) => {
        const obj = {};
        if (validation && validation.validateFnName && state[thisName].required) {
            obj.validate = value => {
                return functions[validation.validateFnName](
                    value,
                    document.getElementById(thisName),
                    document.getElementById(thisName + '_link')
                );
            };
        }
            
        return obj;
    };

    const renderLabel = (thisName, label) => {
        const newLabel = <>
            {label + " "}
            {renderAddOnLink(thisName)}
            { !state[thisName].required ? <span className='optional'>(optional)</span> : ''}
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

    const renderCheckbox = (thisName, label) => {
        const thisState = state[thisName];
        return (
            <>
                <input
                    type="checkbox"
                    name={thisName}
                    id={thisName}
                    disabled={disabled}
                    checked={thisState.isChecked}
                    readOnly
                />
                <a
                    href="javascript:void(0)"
                    className={'checkbox ' + (disabled ? ' disabled' : '')}
                    onClick={(e) => { 
                        checkHandler(e, thisName);
                    }}
                    id={thisName + '_link'}
                    ref={register(...getRegisterAttributes(thisName))}
                >
                    <ReactSVG src={icons.checkmarkIcon} />
                </a>
                <label htmlFor={thisName} onClick={(e) => { 
                        checkHandler(e, thisName);
                    }}>{renderLabel(thisName,label)}</label>
            </>
        );
    };

    const renderGrouping = () => {
        if (!options) {
            return renderCheckbox(name, label);
        } else {
            return (
                <div id={name} className="cmp-form-checkbox--grouping">
                    {options.map((option, i) => {
                        return (
                            <div key={`checkbox-${name}-grouping-${i}`} >
                                {renderCheckbox(option.name, option.label)}
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

export default Checkbox;
