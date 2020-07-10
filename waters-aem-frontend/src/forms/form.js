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
import Analytics, { analyticTypes } from "../analytics";
import SessionStore from '../stores/sessionStore';
import loginStatus from '../scripts/loginStatus';
import { notLoggedInRedirect, homePageRedirect } from '../utils/redirectFunctions';
import Spinner from "../utils/spinner";

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
        const requiredFields = config.fields
            .filter(field => ('validation' in field && field.validation.required === true && ('active' in field ? field.active === true : true)));
        const values = getValues();
        const emptyRequiredFields = requiredFields
            .filter(field => {
                return values[field.name] === "" || values[field.name] === false || values[field.name] === null || values[field.name] === undefined
            });
        const isConfirmPasswordFieldEmpty = 'confirmPassword' in values ? values['confirmPassword'] === "" : false;
        return (emptyRequiredFields.length !== 0 || isConfirmPasswordFieldEmpty || Object.keys(errors).length > 0);
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
    const [countrySaved, setCountrySaved] = useState();
    const regionalConfig = config.regionalConfig;
    const [displayForm, setDisplayForm] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));
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
            if (field.type === inputName || field.name === inputName) {
                field.active = true;
            }
            return field;
        });
        config.fields = [...fields];
    };

    const deactivateField = inputName => {
        const fields = config.fields.map(field => {
            if (field.name === inputName) {
                field.active = false;
            }
            return field;
        });
        config.fields = [...fields];
    };

    // Hook to check the users's Authentication Status and redirect if needed
    useEffect(() => {
        if (!isInEditMode) {
            const needsToBeSignedIn = config.needsToBeSignedIn;
            if (needsToBeSignedIn) {
                if (!loginStatus.state()) {
                    notLoggedInRedirect();
                    return null;
                }
            }
            const needsToBeSignedOut = config.needsToBeSignedOut;
            if (needsToBeSignedOut) {
                if (loginStatus.state()) {
                    homePageRedirect();
                    return null;
                }
            }
            setDisplayForm(true);
        }
    }, []);

    useEffect(() => {
        setFormAnalytics('load');
    }, []);

    useEffect(() => {
        // Configure Registration Form on "Loading"
        if (config.formName === "registration") {
            const countryRegion = digitalData.page.country.toLowerCase();
            // Get Regional config 
            const countryOptionsConfig = regionalConfig;
            // Hide all country configurable fields
            const allCountryOptions = countryOptionsConfig.filter(p => p.country === "all")
            if (allCountryOptions.length === 1) {
                allCountryOptions[0].fields.map(fieldName => deactivateField(fieldName));
            }
            // Display Specific fields for the current country
            const selectedCountryOptions = countryOptionsConfig.filter(p => p.country === countryRegion)
            if (selectedCountryOptions.length === 1) {
                selectedCountryOptions[0].fields.map(fieldName => activateField(fieldName));
            }
        }
    }, []);

    const [newConfig, setNewConfig] = useState();

    useEffect(() => {
        if (!config.getRadioOptions) {
            return;
        }

        retrieveData(config.optionsEndpoint).then(resp => {

            // Only put this logic in for formName ==="chooseAccount"
            if (config.formName === "chooseAccount") {
                const store = new SessionStore();
                store.setSoldToDetails(resp);
            }

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
            setDisplayForm(true);
            // PB Setting newConfig to triiger a reload
            setNewConfig(config);
        });
    }, []);

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

    const setFormAnalytics = (event, detail = {}) => {
        if (config.formName) {
            const model = {
                detail,
                formName: config.formName,
                formType: config.formType ? config.formType : undefined,
                event
            };
            Analytics.setAnalytics(analyticTypes['form'].name, model);
        }
    }

    const getValue = name => getValues()[name];

    const getApi = useMemo(
        () => ({
            setValue,
            setError: newError,
            clearError,
            register,
            triggerValidation,
            getValues,
            getValue,
            activateField,
            deactivateField,
            setCountrySaved,
            regionalConfig
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

    const renderForm = () => {
            return (<form
                className="cmp-form cmp-form--registration"
                onSubmit={handleSubmit(
                    submitFn.bind({
                        url: config.submitEndpoint,
                        setError: submitErrorHandler,
                        redirect: config.redirectUrl,
                        passwordUpdateUrl: config.passwordUpdateUrl,
                        callback: callback,
                        updateFailedAttempts: updateFailedAttempts,
                        setProfileData: setProfileData,
                        setFormAnalytics: setFormAnalytics,
                        urlChooseAccount: config.chooseAccountEndPoint
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
            </form>);
    }

    if ((isInEditMode) || (config.getRadioOptions && config.options) || (displayForm && !config.getRadioOptions)) {
        return (
            <>
                {renderForm()}
            </>
        );
    }
    else {
        return (
            <>
                <Spinner loading={!displayForm} />
                {renderForm()}
            </>
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