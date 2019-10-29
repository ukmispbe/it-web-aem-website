import React, { useState } from 'react';
import ReactSVG from "react-svg";

const Checkbox = ({
    name,
    label,
    options,
    disabled,
    register,
    icons
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const checkHandler = (event) => {
        if (!disabled) {
            setIsChecked(!isChecked);
        }
    };

    const renderCheckbox = (name, label) => {
        return (
            <>
                <input
                    type="checkbox"
                    name={name}
                    id={name}
                    ref={register}
                    disabled={disabled}
                    checked={isChecked}
                    readOnly
                />
                <a
                    href="javascript:void(0)"
                    className={'checkbox ' + (disabled ? ' disabled' : '')}
                    onClick={checkHandler}
                >
                    <ReactSVG src={icons.checkmarkIcon} />
                </a>
                <label htmlFor={name} onClick={checkHandler}>{label}</label>
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
