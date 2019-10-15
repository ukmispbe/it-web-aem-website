import React from 'react';

const Password = ({ name, label, register, description }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type="password" name={name} id={name} ref={register}></input>
            {description && (
                <span className="cmp-form_description">{description}</span>
            )}
        </>
    );
};

export default Password;
