import React, {
    useState,
    useEffect,
    useMemo,
    createContext,
    useCallback
} from 'react';
import useForm from 'react-hook-form/dist/react-hook-form.ie11';

import { ErrorsProvider, FormStateProvider } from './fields/utils/stateWatcher';
import DigitalData from '../scripts/DigitalData';
import ErrorBoundary from '../search/ErrorBoundary';
import Field from './fields';

const FormApi = createContext(null);
FormApi.displayName = 'FormApi';
const FieldApi = createContext(null);
FieldApi.displayName = 'FieldApi';

const Form = ({
    config,
    submitFn,
    cancelFn,
    isocode,
    setErrorBoundaryToTrue,
    resetErrorBoundaryToFalse,
    removeNotifications,
    defaultValues,
    callback
}) => {
    const {
        register,
        handleSubmit,
        errors,
        formState,
        setValue,
        setError,
        clearError,
        triggerValidation,
        getValues
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            country: DigitalData.default,
            ...defaultValues,
            communications: defaultValues
              ? defaultValues.communications === 'true'
                  ? true
                  : false
              : false
          }
    });

    const checkIfDisabled = () => {
        return !formState.isValid;
    };

    const [errorUpdates, setUpdate] = useState({});
    const [failedAttempts, setFailedAttempts] = useState(1);
    const captchaField = config.fields.filter(field=>field.type==='captcha')[0];
    const captchaFailedAttempts = captchaField && captchaField.failedAttempts ? captchaField.failedAttempts : 0;

    const updateFailedAttempts = (formName) => {
        if(formName==='signin'){
            setFailedAttempts((failedAttempts) => failedAttempts + 1);
            if(captchaFailedAttempts && failedAttempts===captchaFailedAttempts) {
                activateField('captcha');
            }
        }
    }

    const activateField = (inputName) => {
        const fields = config.fields.map((field)=>{
            if(field.type===inputName) {
                field.active = true;
            }
            return field;
        });
        config.fields = [...fields];
    }

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

    const getValue = name => getValues()[name];

    const getApi = useMemo(
        () => ({
            setValue,
            setError: newError,
            clearError,
            register,
            triggerValidation,
            getValues,
            getValue
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
            [field, field.active]
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
                    redirect: config.redirectUrl,
                    callback: callback,
                    updateFailedAttempts: updateFailedAttempts
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
            {config.cancelText && !!cancelFn && (
                <a className="cmp-button cmp-button--cancel" onClick={cancelFn}>
                    {config.cancelText}
                </a>
            )}
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
