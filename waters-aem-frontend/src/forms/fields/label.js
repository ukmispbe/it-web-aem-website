import React from 'react';

const Label = ({ addClass, label, htmlFor ="" }) => {
    return (
        <label className={addClass} htmlFor={htmlFor}>
            {label} 
        </label>   
    );
};

export default React.memo(Label);