import React, { useState, useContext, useCallback } from 'react';
import ReactSVG from 'react-svg';

import { useFormApi, useFieldApi } from '../form';
import { useErrorsContext } from './utils/stateWatcher';

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
        initialState
    } = useContext(useFieldApi);
    const { register, setValue } = useContext(useFormApi);
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
                        isChecked: false,
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

    const hasError = useCallback(name => !!errors[name], [errors]);

    const renderLabel = (thisName, label) => (
        <>
            {label + ' '}
            {renderAddOnLink(thisName)}
            {!state[thisName].required && (
                <span className="cmp-form-field--optional">(optional)</span>
            )}
        </>
    );

    const renderAddOnLink = thisName => {
        const thisState = state[thisName];
        return (
            thisState.text &&
            thisState.link &&
            thisState.blank && (
                <a
                    href={thisState.link}
                    target={thisState ? '_blank' : ''}
                    rel="noopener"
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
                    name={thisName}
                    id={thisName}
                    disabled={disabled}
                    checked={thisState.isChecked}
                    className={hasError(thisName) ? 'error' : 'valid'}
                    ref={register(thisState.required ? { required: true } : {})}
                    readOnly
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
                    className={
                        `cmp-form-field-${type}--wrapper` +
                        (disabled ? ' disabled' : '')
                    }
                >
                    <label
                        htmlFor={thisName}
                        onClick={e => checkHandler(e, thisName)}
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

    return !options ? (
        renderType(name, label)
    ) : (
        <div id={name} className={`cmp-form-field-${type}--grouping`}>
            {options.map((option, i) => {
                return (
                    <div
                        className={`cmp-form-field-${type}--grouping-item`}
                        key={`${type}-${name}-grouping-${i}`}
                    >
                        {renderType(option.name, option.label)}
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(CheckboxOrRadio);
