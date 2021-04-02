import React, { useContext, useEffect, useState } from 'react';
import { elementLocator, htmlParser } from '../../utils/eCommerceFunctions';
import { useFieldApi } from '../form';

const Label = ({ name, addClass, label, htmlFor ="" }) => {
    const { initialState  } = useContext(useFieldApi);
    const [ labelValue, setLabelValue ] = useState();

    useEffect(() => {
        if (initialState) {
            setLabelValue(initialState);
        }
    }, [name]);
    let labelSource = labelValue || label;

    return (
        <label className={addClass} htmlFor={htmlFor} data-locator={elementLocator(name)}>
            {htmlParser(labelSource)}
        </label>
    );
};

export default React.memo(Label);
