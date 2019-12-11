import React, {
    useState,
    useEffect,
    useMemo,
    createContext,
    useCallback
} from 'react';
import useForm from 'react-hook-form/dist/react-hook-form.ie11';

import { ErrorsProvider, FormStateProvider } from './fields/utils/stateWatcher';
import ErrorBoundary from '../search/ErrorBoundary';
import Field from './fields';

const FormApi = createContext(null);
FormApi.displayName = 'FormApi';
const FieldApi = createContext(null);
FieldApi.displayName = 'FieldApi';

const Form = ({
    config,
    submitFn,
    isocode,
    setErrorBoundaryToTrue,
    resetErrorBoundaryToFalse,
    removeNotifications
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
        mode: 'onBlur',
        reValidateMode: 'onBlur'
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

    const newError = useCallback(
        (name, type, msg, ref) => {
            setError(name, type, msg);
            setUpdate({ ...errorUpdates, [name]: ref });
        },
        [errors]
    );

    const getApi = useMemo(
        () => ({
            setValue,
            setError: newError,
            clearError,
            register,
            triggerValidation
        }),
        [register]
    );

    const submitErrorHandler = res => {
        if (res) {
            setErrorBoundaryToTrue(res);
        } else {
            resetErrorBoundaryToFalse();
            removeNotifications();
        }
    };

    const fields = config.fields.map((field, i) => {
        const getFieldApi = useMemo(
            () => ({
                ...config,
                config,
                ...field,
                field,
                isocode
            }),
            [field]
        );

        return (
            <FieldApi.Provider value={getFieldApi} key={`field-${i}`}>
                <Field />
            </FieldApi.Provider>
        );
    });

    return (
        <form
            className="cmp-form cmp-form--registration"
            onSubmit={handleSubmit(
                submitFn.bind({
                    url: config.submitEndpoint,
                    setError: submitErrorHandler,
                    redirect: config.redirectUrl
                })
            )}
        >
            <FormApi.Provider value={getApi}>
                <FormStateProvider watch={formState}>
                    <ErrorsProvider watch={errors}>{fields}</ErrorsProvider>
                </FormStateProvider>
            </FormApi.Provider>
            <button
                type="submit"
                className={
                    'cmp-button cmp-button--no-border cmp-form--submit' +
                    (checkIfDisabled() ? ' cmp-button--disabled' : '')
                }
                disabled={checkIfDisabled()}
            >
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
