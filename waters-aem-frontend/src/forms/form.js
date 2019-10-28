import React from "react";
import useForm from "react-hook-form/dist/react-hook-form.ie11";
import Input from "./fields/input";
import Radio from "./fields/radio";
import Checkbox from "./fields/checkbox";
import Dropdown from "./fields/dropdown";
import Hr from "./fields/hr";
import FieldValidationDisplay from "./components/field-validation-display";
import Captcha from "./fields/captcha";

const formType = {
    text: Input,
    number: Input,
    password: Input,
    email: Input,
    radio: Radio,
    checkbox: Checkbox,
    dropdown: Dropdown,
    select: Dropdown,
    break: Hr,
    captcha: Captcha
};

const Form = ({ config, submitFn, isocode }) => {
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
        mode: "onBlur"
    });

    const checkIfDisabled = () => {
        return !formState.isValid;
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
                        (formState.touched[0] && typeof(formState.touched[0]) === "object" ?
                            formState.touched[0].has(field.name) : formState.touched.indexOf(field.name) > -1)
                    }
                    valid={!errors[field.name]}
                    type={field.type}
                    hasMatchValid={field.hasMatch ? !errors[confirmName] : true}
                    dirtyMatch={
                        (formState.touched[0] && typeof(formState.touched[0]) === "object" ?
                            formState.touched[0].has(confirmName) : formState.touched.indexOf(confirmName) > -1)
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
            className="cmp-form cmp-form--registration"
            onSubmit={handleSubmit(
                submitFn.bind({ url: config.submitEndpoint })
            )}>
            {f}
            <button
                type="submit"
                className={
                    "cmp-button cmp-form--submit" +
                    (checkIfDisabled() ? " cmp-button--disabled" : "")
                }
                disabled={checkIfDisabled()}>
                {config.buttonText}
            </button>
            <div className="cmp-form__disclaimer">
                {config.disclaimerText + " "}
                <a href={config.termsAndConditionsLink}>
                    {config.termsAndConditionsText}
                </a>
            </div>
        </form>
    );
};

export default Form;
