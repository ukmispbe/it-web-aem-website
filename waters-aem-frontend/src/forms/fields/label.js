import React from 'react';
import { elementLocator } from '../../utils/eCommerceFunctions';

const Label = ({ addClass, label, name, htmlFor ="" }) => {
    return (
        <label className={addClass} htmlFor={htmlFor} data-locator={elementLocator('test123456')}>
            {label} 
        </label>   
    );
};

export default React.memo(Label);
