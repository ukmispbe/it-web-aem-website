import React from 'react';

const Radio = ({
    radioGroup,
    name,
    label,
    register,
    disabled,
    description,
    options
}) => {

    const checkHandler = (event) => {
        if (!disabled) {
            event.currentTarget.previousElementSibling.click();
        }
    };

    const renderRadioButton = (radioGroup, name, label) => {
        return (
            <>
                <input
                    type="radio"
                    name={radioGroup}
                    id={name}
                    ref={register}
                    disabled={disabled}
                />
                <a
                    href="javascript:void(0)"
                    className={'radio ' + (disabled ? ' disabled' : '')}
                    onClick={checkHandler.bind(this)}
                >
                    <div className="selector"></div>
                </a>
                <label htmlFor={name} onClick={checkHandler.bind(this)}>{label}</label>
                {description && (
                    <span class="cmp-form_description">{description}</span>
                )}
            </>
        );
    };

    const renderGrouping = () => {
        if (!options) {
            return renderRadioButton(radioGroup, name, label);
        } else {
            return (
                <fieldset id={name} className="cmp-form-radio--grouping" disabled={disabled}>
                    {label && <legend>{label}</legend>}
                    {options.map((option, i) => {
                        return (
                            <div key={`radio-${name}-grouping-${i}`} >
                                {renderRadioButton(radioGroup, option.name, option.label)}
                            </div>
                        );
                    })}
                </fieldset>
            )
        }
    };

    return (
        <>
            {renderGrouping()}
        </>
    );
};

export default Radio;
