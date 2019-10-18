import React from 'react';

const Checkbox = ({ name, label, register }) => {
    return (
        <>
            <input type="checkbox" name={name} id={name} ref={register} />
            <label htmlFor={name}>{label}</label>
        </>
    );
};

export default Checkbox;
