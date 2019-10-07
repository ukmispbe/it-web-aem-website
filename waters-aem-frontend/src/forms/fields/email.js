import React from 'react';

const Email = ({ name, label, description, register }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input type="email" name={name} id={name} ref={register}></input>
            {description && (
                <span className="cmp-form_description">{description}</span>
            )}
        </>
    );
};

export default Email;
