import React from 'react';

const Label = ({ addClass, label, name, htmlFor ="" }) => {
    return (
        <label className={addClass} htmlFor={htmlFor}>
            {label} 
        </label>   
    );
};

export default React.memo(Label);
