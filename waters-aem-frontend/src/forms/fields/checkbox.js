import React from 'react';
import ReactSVG from "react-svg";

const Checkbox = ({
    name,
    label,
    options,
    disabled,
    register,
    icons
}) => {
    const checkHandler = (event) => {
        if (!disabled) {
            event.currentTarget.nextElementSibling.click();
        }
    };

    const checkHandlerLabel = (event) => {
        if (!disabled) {
            event.currentTarget.previousElementSibling.click();
        }
    };

    const renderCheckbox = (name, label) => {
        let checked = false;

        const checkboxElem = document.getElementById(name);
        if (checkboxElem) {
            checked = checkboxElem.checked;
        }

        return (
            <>
                <a
                    href="javascript:void(0)"
                    className={'checkbox ' + (checked ? 'checked' : '') + (disabled ? ' disabled' : '')}
                    onClick={checkHandler.bind(this)}
                >
                    <ReactSVG src={icons.checkmarkIcon} />
                </a>
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    ref={register}
                    checked={checked}
                    disabled={disabled}
                    readOnly
                />
                <label htmlFor={name} onClick={checkHandlerLabel.bind(this)}>{label}</label>
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
