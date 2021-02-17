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
import Analytics, { analyticTypes } from "../analytics";
import SessionStore from '../stores/sessionStore';
import loginStatus from '../scripts/loginStatus';
import { homePageRedirect } from '../utils/redirectFunctions';
import Spinner from "../utils/spinner";
import { elementLocator } from '../utils/eCommerceFunctions';
import { getAddressesByType, getFullCompanyAddress } from '../utils/userFunctions';
import SoldToDetailsLazy from '../my-account/services/SoldToDetailsLazy';
import countryList from './services/country-list';
import { retrieveData } from './services/retrieve';

import '../../src/styles/forms.scss';

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
    setProfileData,
    addFieldFn,
    toggleAddressFn,
    navigateBackFn,
    addAddressesFn,
    displayProductTypeDropDown,
    changeProductType
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
        reValidateMode: 'onSubmit',
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
    const [_, reloadCountryList] = useState();
    const [isInEditMode, setIsInEditMode] = useState(document.getElementById("header").hasAttribute("data-is-edit-mode"));
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

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

    // Scroll to Top of form when a Form with a different name loads
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [config.formName])

    useEffect(() => {
        if (config.formName === "registrationAddress") {
            // Call API & Update Config
            retrieveData(config.statesUrl.replace("{country}", defaultValues.country))
            .then((results) => {
                if (results[0]) {
                    const showStates = results[0].showStates;
                    if (showStates) {
                        // Enable shippingState & billingState and create options
                        let options = [];
                        const countryStates = results[0].states;

                        countryStates.map((state) => {
                            const option = { "stateCode": state.code, "displayName": state.name };
                            options.push(option)
                        });
                        config.fields.map(field => {
                            if (field.name === "shippingState" || field.name === "billingState") {
                                field.options = options;
                                if (field.name === "shippingState") {
                                    field.active = true;
                                }
                            }
                        });
                    }
                    else {
                        // Disable shippingState & billingState fields
                        config.fields.map(field => {
                            if (field.name === "shippingState" || field.name === "billingState") {
                                field.active = false;
                            }
                        });
                    }
                }
                triggerValidation(["sameAddress"]);
            });
        }

    }, [config]);

    // Hook to check the user's Authentication Status and redirect if needed
    useEffect(() => {
        if (!isInEditMode) {
            
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

    // Hook to add error styles if there are errors on Submitting
    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            for (var name in errors) {
                if (errors.hasOwnProperty(name)) {
                    if (name !== "captcha") {
                        if (name === "alreadyRegistered") {
                            setIsAlreadyRegistered(true);
                        }
                        // If alreadyRegistered error is already set no need to change
                        if (name !== "email" || !isAlreadyRegistered) {
                            const control = document.getElementById(name);
                            if (control) {
                                const mainControlDiv = control.parentElement.parentElement;
                                if (mainControlDiv) {
                                    mainControlDiv.classList.add("cmp-form-field--invalid");
                                }
                            }
                        }
                    }
                    else {
                        const captchaControl = document.getElementsByClassName("cmp-form-field-captcha")[0];
                        if (captchaControl) {
                            captchaControl.classList.add("cmp-form-field--invalid");
                        }
                    }
                }
            }
        }
    });

    useEffect(() => {
        setFormAnalytics('load');
    }, []);

    useEffect(() => {
        // Configure Registration Form on "Loading"
        if (config.formName === "registration" ) {
            countryList(config.countryListUrl).then(({ response }) => {
                const countryRegion = DigitalData.page.country.toLowerCase();
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
                const countryIdx = config.fields.findIndex(x => x.name.toLowerCase() === 'country');
                if (countryIdx !== -1) {
                    config.fields[countryIdx].options = response;
                    reloadCountryList(config);
                }
            });
        }
    }, [config.formName]);

    const [newConfig, setNewConfig] = useState();

    useEffect(() => {
        if (!config.getRadioOptions) {
            return;
        }

        // Only put this logic in for formName ==="chooseAccount"
        if (config.formName === "chooseAccount") {
            const store = new SessionStore();
            const userDetails = store.getUserDetails();

            SoldToDetailsLazy(config.optionsEndpoint, userDetails.userId, userDetails.salesOrg).then((resp) => {
                const store = new SessionStore();
                store.setSoldToDetails(resp);

                const tempArray = resp.map((item) => {
                    let tempOption = {};
                    let tempAddress;
                    tempOption.name = item.customerNumber;
                    tempOption.label = item.name;
                    tempAddress = getAddressesByType(item, "soldToInfo")[0];
                    delete tempAddress.name;
                    tempOption.address = getFullCompanyAddress(tempAddress, false);
                    return tempOption;
                });

                config.options = tempArray;
                config.fields[1].options = tempArray;
                setDisplayForm(true);
                // Setting newConfig to trigger a reload
                setNewConfig(config);
            });
        }
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
            regionalConfig,
            addFieldFn,
            toggleAddressFn,
            navigateBackFn,
            addAddressesFn,
            displayProductTypeDropDown,
            changeProductType,
            setErrorBoundaryToTrue,
            resetErrorBoundaryToFalse,
            removeNotifications,
            isAlreadyRegistered
        }),
        [register, isAlreadyRegistered]
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
        const getFieldApi = {
            ...config,
            config,
            ...field,
            field,
            isocode,
            initialState: defaultValues
                ? defaultValues[field.name]
                : undefined
        }

        return (
            <FieldApi.Provider value={getFieldApi} key={`field-${i}`}>
                <Field />
            </FieldApi.Provider>
        );
    });

    const renderForm = () => {
            return (<form autocomplete="off"
                className={`cmp-form cmp-form--registration ${config.customFormClass || ''}`}
                data-locator={`${config.elementLocator || 'form-component'}`}
                onSubmit={handleSubmit(
                    submitFn.bind({
                        url: config.submitEndpoint,
                        setError: submitErrorHandler,
                        redirect: config.redirectUrl,
                        passwordUpdateUrl: config.passwordUpdateUrl,
                        soldToDetailsUrl: config.soldToDetailsUrl,
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
                    className={"cmp-button cmp-button--no-border cmp-form--submit"}
                    data-locator={elementLocator(config.buttonLocator || 'form-submit')}
                >
                    {config.buttonText}
                </button>
                {config.cancelText && !!cancelHandler && (
                    <a
                        className="cmp-button cmp-button--cancel"
                        onClick={cancelHandler}
                        data-locator={elementLocator(config.cancelText || 'form-cancel')}
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
