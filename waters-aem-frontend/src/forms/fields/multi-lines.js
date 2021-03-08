import React, { useContext, useEffect, useState } from 'react';
import { useFieldApi } from '../form';
import LinesEllipsis from 'react-lines-ellipsis';

const MultiLines = ({ name, maxLine }) => {
    const { initialState  } = useContext(useFieldApi);
    const [ controlValue, setControlValue ] = useState();

    useEffect(() => {
        if (initialState) {
            setControlValue(initialState);
        }
    }, [name]);

    return (
        <LinesEllipsis
        text={controlValue}
        maxLine={maxLine}
        ellipsis="…"
        trimRight
        basedOn="words"
        clamped="false"
    />
    );
};

export default React.memo(MultiLines);
