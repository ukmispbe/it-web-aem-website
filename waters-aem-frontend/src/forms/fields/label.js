import React, { useContext, useEffect, useState } from 'react';
import { elementLocator } from '../../utils/eCommerceFunctions';
import { useFieldApi } from '../form';

const Label = ({ name, addClass, label, htmlFor ="" }) => {
    const { initialState  } = useContext(useFieldApi);
    const [ labelValue, setLabelValue ] = useState();

    useEffect(() => {
        if (initialState) {
            setLabelValue(initialState);
        }
    }, [name]);

    return (
        <label className={addClass} htmlFor={htmlFor} data-locator={elementLocator(name)}>
            {labelValue || label}
        </label>   
    );
};

export default React.memo(Label);
