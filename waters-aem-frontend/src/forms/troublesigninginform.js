import React from "react";
import useForm from "react-hook-form/dist/react-hook-form.ie11";
import Input from "./fields/input";
import FieldValidationDisplay from "./components/field-validation-display";
import Captcha from "./fields/captcha";
import ErrorBoundary from "../search/ErrorBoundary";

const formType = {
    email: Input,
    captcha: Captcha
};

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
        getValues,
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

    const submitErrorHandler = res => {
        if (res) {
            setErrorBoundaryToTrue(res);
        } else {
            resetErrorBoundaryToFalse();
            removeNotifications();
        }
    };

    const f = config.fields.map((field, i) => {
        const Component = formType[field.type];

        if (Component) {
            let newName = "";
            let confirmName = "";
            if (field.name) {
                newName =
                    field.name.charAt(0).toUpperCase() + field.name.slice(1);
                confirmName = "confirm".concat(newName);
            }

            return (
                <FieldValidationDisplay
                    dirty={
                        formState.touched[0] &&
                        typeof formState.touched[0] === "object"
                            ? formState.touched[0].has(field.name)
                            : formState.touched.indexOf(field.name) > -1
                    }
                    valid={!errors[field.name]}
                    type={field.type}
                    hasMatchValid={field.hasMatch ? !errors[confirmName] : true}
                    dirtyMatch={
                        formState.touched[0] &&
                        typeof formState.touched[0] === "object"
                            ? formState.touched[0].has(confirmName)
                            : formState.touched.indexOf(confirmName) > -1
                    }
                    key={`field-${i}`}>
                    <Component
                        {...field}
                        fieldErr={errors[field.name]}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        icons={config.icons}
                        setError={setError}
                        clearError={clearError}
                        triggerValidation={triggerValidation}
                        emailUrl={config.existingEmailUrl}
                        isocode={isocode}
                    />
                </FieldValidationDisplay>
            );
        }
    });

    return (
        <form
            className="cmp-form cmp-form--trouble-signing-in"
            onSubmit={handleSubmit(
                submitFn.bind({
                    url: config.submitEndpoint,
                    setError: submitErrorHandler
                })
            )}>
            {f}
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
