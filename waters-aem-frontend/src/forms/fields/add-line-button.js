import React, { useContext } from 'react';
import { useFormApi } from '../form';
import ReactSVG from 'react-svg';

const AddLineButton = ({ addClass, value, name, iconSrc, type="button" }) => {
    const { addFieldFn, triggerValidation } = useContext(useFormApi);

    function handleClick(e) {
        e.preventDefault();
        addFieldFn(name);
        triggerValidation(["sameAddress"]);
    }
    return (
        <a className={addClass} 
            id={name}
            type={ type} 
            value={value} 
            rel="noopener noreferrer"
            onClick={handleClick}>
                <ReactSVG wrapper="span" src={iconSrc} />
               {value}
        </a>   
    );
};

export default AddLineButton;