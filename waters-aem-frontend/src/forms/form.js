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
import { retrieveData } from '../forms/services/retrieve';

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
    callback,
    setProfileData
}) => {
    if (defaultValues) {
        defaultValues.communications =
            defaultValues.communications === 'true' ||
                defaultValues.communications === true
                ? true
                : false;
    }

    const {
        register,
        handleSubmit,
        errors,
        formState,
        setValue,
        setError,
        clearError,
        triggerValidation,
        getValues,
        reset
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            country: DigitalData.default,
            ...defaultValues
        }
    });

    const checkIfDisabled = () => {
        return !formState.isValid;
    };

    const cancelHandler = clear => {
        if (defaultValues) {
            reset({
                country: DigitalData.default,
                ...defaultValues
            });
        } else {
            reset({});
        }

        cancelFn();
    };

    const [errorUpdates, setUpdate] = useState({});
    const [failedAttempts, setFailedAttempts] = useState(1);
    const captchaField = config.fields.filter(
        field => field.type === 'captcha'
    )[0];
    const captchaFailedAttempts =
        captchaField && captchaField.failedAttempts
            ? captchaField.failedAttempts
            : 0;

    const updateFailedAttempts = formName => {
        if (formName === 'signin') {
            setFailedAttempts(failedAttempts => failedAttempts + 1);
            if (
                captchaFailedAttempts &&
                failedAttempts === captchaFailedAttempts
            ) {
                activateField('captcha');
            }
        }
    };

    const activateField = inputName => {
        const fields = config.fields.map(field => {
            if (field.type === inputName) {
                field.active = true;
            }
            return field;
        });
        config.fields = [...fields];
    };

    const [newConfig, setNewConfig] = useState();
    // const [flag, setFlag ] = useState(false);
    useEffect(() => {

        const getDynamicRadioOptions = async () => {
            const resp = await retrieveData(config.optionsEndpoint);

            const tempArray = resp.map((item) => {
                let tempOption = {};
                tempOption.name = item.soldTo;
                tempOption.label = item.company;
                tempOption.accountStreet = item.partnerAddress[0].street;
                tempOption.accountCity = item.partnerAddress[0].city;
                tempOption.accountZip = item.partnerAddress[0].postalCd;
                return tempOption;
            });

            config.options = tempArray;
            config.fields[1].options = tempArray;
            // PB Setting newConfig to triiger a reload
            setNewConfig(config);

        }

        if (config.getRadioOptions) {
            getDynamicRadioOptions();
        }


        for (let name in errorUpdates) {
            if (errors[name]) {
                errors[name].ref = errorUpdates[name];
            }

            delete errorUpdates[name];
        }
    }, [errorUpdates, errors, config]);

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
        let getFieldApi = useMemo(
            () => ({
                ...config,
                config,
                ...field,
                field,
                isocode,
                initialState: defaultValues
                    ? defaultValues[field.name]
                    : undefined
            }),
            [field, field.active, newConfig]
        );

        return (
            <FieldApi.Provider value={getFieldApi} key={`field-${i}`}>
                <Field />
            </FieldApi.Provider>
        );
    });

    if (config.getRadioOptions && !config.options) {
        return null;
    }
    else {
        return (
            <form
                className="cmp-form cmp-form--registration"
                onSubmit={handleSubmit(
                    submitFn.bind({
                        url: config.submitEndpoint,
                        setError: submitErrorHandler,
                        redirect: config.redirectUrl,
                        passwordUpdateUrl: config.passwordUpdateUrl,
                        callback: callback,
                        updateFailedAttempts: updateFailedAttempts,
                        setProfileData: setProfileData
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
                {config.cancelText && !!cancelHandler && (
                    <a
                        className="cmp-button cmp-button--cancel"
                        onClick={cancelHandler}
                    >
                        {config.cancelText}
                    </a>
                )}
            </form>
        );
    }

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
