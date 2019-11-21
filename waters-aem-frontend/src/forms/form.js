import React, { useState, useEffect, useMemo, createContext, useCallback } from "react";
import useForm from "react-hook-form/dist/react-hook-form.ie11";

import ErrorBoundary from "../search/ErrorBoundary";
import Field from './fields';

const FormApi = createContext(null);
FormApi.displayName = "FormApi";
const FieldApi = createContext(null);
FieldApi.displayName = "FieldApi";

const Form = ({
    config,
    submitFn,
    isocode,
    setErrorBoundaryToTrue,
    resetErrorBoundaryToFalse,
    removeNotification
}) => {
    const {
        register,
        handleSubmit,
        errors,
        formState,
        setValue,
        setError,
        clearError,
        triggerValidation
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const checkIfDisabled = () => {
        return !formState.isValid;
    };

    const [errorUpdates, setUpdate] = useState({});

    useEffect(() => {
        for (let name in errorUpdates) {
            if (errors[name]) {
                errors[name].ref = errorUpdates[name];
            }

            delete errorUpdates[name];
        }
    }, [errorUpdates, errors]);

    const fieldError = useCallback((name) => errors[name], [errors]);
    const newError = useCallback((name, type, msg, ref) => {
        setError(name, type, msg);
        setUpdate({...errorUpdates, [name]: ref});
    }, [errors]);

    const getApi = useMemo(() => ({
        errors,
        fieldError,
        setValue,
        setError: newError,
        clearError,
        register,
        formState,
        triggerValidation
    }), [errors]);

    const submitErrorHandler = res => {
        if (res) {
            setErrorBoundaryToTrue(res);
        } else {
            resetErrorBoundaryToFalse();
            removeNotification();
        }
    };

    const fields = config.fields.map((field, i) => (
        <FieldApi.Provider value={{ ...config, config: config, ...field, field: field, isocode }} key={`field-${i}`}>
            <Field />
        </FieldApi.Provider>
    ));

    return (
        <form
            className="cmp-form cmp-form--registration"
            onSubmit={handleSubmit(
                submitFn.bind({
                    url: config.submitEndpoint,
                    setError: submitErrorHandler
                })
            )}>
            <FormApi.Provider value={getApi}>
                {fields}
            </FormApi.Provider>
            <button
                type="submit"
                className={
                    "cmp-button cmp-button--no-border cmp-form--submit" +
                    (checkIfDisabled() ? " cmp-button--disabled" : "")
                }
                disabled={checkIfDisabled()}>
                {config.buttonText}
            </button>
        </form>
    );
};

const ErrorBoundaryForm = props => (
    <ErrorBoundary>
        <Form {...props} />
    </ErrorBoundary>
);

export default ErrorBoundaryForm;
// Context Variables
export const useFormApi = FormApi;
export const useFieldApi = FieldApi;
