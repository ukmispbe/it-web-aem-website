import React, { useState, useEffect, useContext, useMemo, createContext } from 'react';

import { deepErrorsCompare, deepFormStateCompare } from './deepCompare';

const createProvider = (Context, watch, compare, children) => {
    const [state, setState] = useState({...watch});

    useEffect(() => {
        if (!compare(watch, state)) setState({...watch});
    });

    const getApi = useMemo(() => ({
        ...state
    }), [state]);

    return (
        <Context.Provider value={getApi}>
            {children}
        </Context.Provider>
    );
};

export const ErrorsContext = createContext();
export const FormStateContext = createContext();
export const ErrorsProvider = ({watch, children}) => createProvider(ErrorsContext, watch, deepErrorsCompare, children);
export const FormStateProvider = ({watch, children}) => createProvider(FormStateContext, watch, deepFormStateCompare, children);
export const useErrorsContext = () => useContext(ErrorsContext);
export const useFormStateContext = () => useContext(FormStateContext);
