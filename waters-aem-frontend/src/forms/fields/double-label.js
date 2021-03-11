import React, { useContext, useEffect, useState } from 'react';
import { useFieldApi } from '../form';
const CLASS_LENGTH = 2;

const DoubleLabel = ({ name, addClass, label}) => {
    const { initialState  } = useContext(useFieldApi);
    const [ labelValue, setLabelValue ] = useState();

    useEffect(() => {
        if (initialState) {
            setLabelValue(initialState);
        }
    }, [name]);

    let classLeft;
    let classRight;
    if (addClass) {
        if (addClass.length === CLASS_LENGTH) {
            classLeft = addClass[0];
            classRight = addClass[1];
        }
    }
    return (
    <>
        <label className={classLeft}>
            {label} 
        </label>   
        <label className={classRight}>
            {labelValue} 
        </label>   
    </>
    );
};

export default React.memo(DoubleLabel);
