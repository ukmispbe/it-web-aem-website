import React, { useContext, useEffect, useState } from 'react';
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
        <label className={addClass} htmlFor={htmlFor}>
            {labelValue || label}
        </label>   
    );
};

export default React.memo(Label);
