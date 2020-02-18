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
import useFetch from './hooks/useFetch';

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
    console.log("FieldAPI", FieldApi)
    // async function fetchData() {
    //     const res = await fetch(config.optionsEndpoint);
    //     res
    //       .json()
    //       .then(res => setPlanets(res))
    //       .catch(err => setErrors(err));
    //   }
    
    //   useEffect(() => {
    //     fetchData();
    //   });

    // useEffect(() => {
    //     const res = useFetch(config.optionsEndpoint, config);
        
    //     console.log("initial res", res);
    //     if (!res.response) {
    //         console.log("!res.response");
    //     }
    //     else {
    //         console.log("YES res.response", res);
    //     }
    // }, []);

    // config.fields[1].options = [
    //     { "name": "144936", "label": "AstraZeneca Pharmaceuticals LP", "accountStreet": "50 Otis St", "accountCity": "Westborough", "accountZip": "01581-3323"},
    //     { "name": "146929", "label": "The Clorox Company", "accountStreet": "7200 Johnson Dr", "accountCity": "Pleasanton", "accountZip": "94588-8005"},
    //     { "name": "226719", "label": "The University of Texas", "accountStreet": "PO Box301401", "accountCity": "Houston", "accountZip": "77230-1401"},
    //     { "name": "254134", "label": "University at Buffalo", "accountStreet": "Hochstetter Hall", "accountCity": "Buffalo", "accountZip": "14260"}
    // ];

    // useEffect(() => {
    //     // if (config.getRadioOptions === true) {
    //     //     const responseData =  retrieveData(config.optionsEndpoint);
    //     //     if (responseData) {
    //     //         const newOptions = buildOptions(responseData);
    //     //         console.log(newOptions);
    //     //     }
    //     //  }

    //     const res = useFetch(config.optionsEndpoint, config);
        
    //     console.log("initial res", res);
    //     if (!res.response) {
    //         console.log("!res.response");
    //     }
    //     else {
    //         console.log("YES res.response", res);
    //     }
    //     console.log("here", res);
    // }, []);


 
    // async function buildOptions(responseData) {
    //     const optionData = await responseData;
    //     console.log('buildOptions', optionData);

    //     const tempArray = optionData.map((item) => {
    //         let tempOption = {};
    //         tempOption.name = item.soldTo;
    //         tempOption.label = item.company;
    //         tempOption.accountStreet = item.partnerAddress[0].street;
    //         tempOption.accountCity = item.partnerAddress[0].city;
    //         tempOption.accountZip = item.partnerAddress[0].postalCd;
    //         return tempOption;
    //     });
          
    //     const radioField = config.fields.filter(
    //         field => field.type === 'radio'
    //     )[0];
    //     radioField.options = tempArray;
    //     console.log("config", config);
    // }


    console.log("test", formState)

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

    const [newConfig, setNewConfig ] = useState();
    // const [flag, setFlag ] = useState(false);
    useEffect(() => {
        // console.log("useEffect Start");
        // console.log("useEffect config", config);

        // const getDetails = async () => {
        //     const resp =  await retrieveData(config.optionsEndpoint);
        //     //const json = await resp.json();
        //     console.log("resp", resp);
        //     const tempArray = resp.map((item) => {
        //         let tempOption = {};
        //         tempOption.name = item.soldTo;
        //         tempOption.label = item.company;
        //         tempOption.accountStreet = item.partnerAddress[0].street;
        //         tempOption.accountCity = item.partnerAddress[0].city;
        //         tempOption.accountZip = item.partnerAddress[0].postalCd;
        //         return tempOption;
        //     });

    
        //     config.options = tempArray;
        //     config.fields[1].options = tempArray;
        //     console.log("config", config);



        // }


        // getDetails();

        // const fetchData = async () => {
        //     try {
        //         const res = await fetch(config.optionsEndpoint, {
        //             method: 'GET',
        //             credentials: 'include',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //       const json = await res.json();
        //       console.log("json", json);
              
        //       const tempArray = json.map((item) => {
        //           let tempOption = {};
        //           tempOption.name = item.soldTo;
        //           tempOption.label = item.company;
        //           tempOption.accountStreet = item.partnerAddress[0].street;
        //           tempOption.accountCity = item.partnerAddress[0].city;
        //           tempOption.accountZip = item.partnerAddress[0].postalCd;
        //           return tempOption;
        //       });

    
        //       config.options = tempArray;
        //       config.fields[1].options = tempArray;
        //       console.log("config", config);
    
        //       //setResponse(json);
        //     } catch (error) {
        //       //setError(error);
        //     }
        //   };
        // fetchData();



        // let origConfig;
        // if (!flag) {
        //     origConfig = config;
        //     setFlag(true);
        // } else {
        //     config = origConfig;
        // }
        // if (config) {
            config.fields[1].options = [
                { "name": "144936", "label": "AstraZeneca Pharmaceuticals LP", "accountStreet": "50 Otis St", "accountCity": "Westborough", "accountZip": "01581-3323"},
                { "name": "146929", "label": "The Clorox Company", "accountStreet": "7200 Johnson Dr", "accountCity": "Pleasanton", "accountZip": "94588-8005"},
                { "name": "226719", "label": "The University of Texas", "accountStreet": "PO Box301401", "accountCity": "Houston", "accountZip": "77230-1401"},
                { "name": "254134", "label": "University at Buffalo", "accountStreet": "Hochstetter Hall", "accountCity": "Buffalo", "accountZip": "14260"}
            ];
        //     config.options = [
        //         { "name": "144936", "label": "AstraZeneca Pharmaceuticals LP", "accountStreet": "50 Otis St", "accountCity": "Westborough", "accountZip": "01581-3323"},
        //         { "name": "146929", "label": "The Clorox Company", "accountStreet": "7200 Johnson Dr", "accountCity": "Pleasanton", "accountZip": "94588-8005"},
        //         { "name": "226719", "label": "The University of Texas", "accountStreet": "PO Box301401", "accountCity": "Houston", "accountZip": "77230-1401"},
        //         { "name": "254134", "label": "University at Buffalo", "accountStreet": "Hochstetter Hall", "accountCity": "Buffalo", "accountZip": "14260"}
        //     ];
        //     setNewConfig(() => {return config;});
        // }

        
        //console.log("useEffect config2 ", config.fields[1].options.length);
        // const res = useFetch(config.optionsEndpoint, config);
        
        // console.log("initial res", res);
        // if (!res.response) {
        //     console.log("!res.response");
        // }
        // else {
        //     console.log("YES res.response", res);
        // }
        // console.log("End of useFetch", res);

        setNewConfig(() => {return config;});
        
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
        console.log("Here", field, config)
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
            [field, field.active, config]
        );
        console.log("getFieldApi", getFieldApi)
        if (config.options) {
            getFieldApi.options = config.options;
            console.log("Getting Options")
        }

        return (
            <FieldApi.Provider value={getFieldApi} key={`field-${i}`}>
                <Field />
            </FieldApi.Provider>
        );
    });
    console.log(fields)
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
