import React from 'react';

const Radio = ({ radioGroup, name, label, register, description }) => {
    return (
        <>
            <input
                type="radio"
                name={radioGroup}
                id={name}
                ref={register}
            ></input>
            <label htmlFor={name}>{label}</label>
            {description && (
                <span class="cmp-form_description">{description}</span>
            )}
        </>
    );
};

export default Radio;
