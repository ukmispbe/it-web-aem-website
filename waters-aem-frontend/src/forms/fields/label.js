import React from 'react';

const Label = ({ addClass, label, name }) => {
    return (
        <span className={addClass}>
            {label} 
        </span>   
    );
};

export default React.memo(Label);
