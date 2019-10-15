import React from 'react';

const Input = ({ name, label, register, description }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} id={name} ref={register}></input>
            {description && (
                <span className="cmp-form_description">{description}</span>
            )}
        </>
    );
};

export default Input;
