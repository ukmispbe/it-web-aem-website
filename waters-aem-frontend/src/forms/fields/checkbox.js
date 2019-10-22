import React from 'react';
import ReactSVG from "react-svg";

const Checkbox = ({
    name,
    label,
    disabled,
    register,
    icons
}) => {
    const checkHandler = (event) => {
        if (!disabled) {
            event.currentTarget.nextElementSibling.click();
        }
    };

    const renderCheckbox = () => {
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
                <input type="checkbox" name={name} id={name} ref={register} checked={checked} disabled={disabled}/>
                <label htmlFor={name}>{label}</label>
            </>
        );
    };

    return (
        <>
            {renderCheckbox()}
        </>
    );
};

export default Checkbox;
