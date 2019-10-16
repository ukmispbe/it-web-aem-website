import React from "react";
import useForm from "react-hook-form";
import Input from "./fields/input";
import Radio from "./fields/radio";
import Checkbox from "./fields/checkbox";
import Dropdown from "./fields/dropdown";
import Hr from "./fields/hr";

const formType = {
    text: Input,
    password: Input,
    email: Input,
    radio: Radio,
    checkbox: Checkbox,
    dropdown: Dropdown,
    select: Dropdown,
    break: Hr
};

const Form = ({ config, submitFn }) => {
    const { register, handleSubmit, errors, formState } = useForm({
        mode: "onBlur"
    });

    const checkIfDisabled = () => {
        return !formState.isValid;
    };

    const f = config.fields.map((field, i) => {
        const Component = formType[field.type];

        if (Component) {
            return (
                <Component
                    {...field}
                    fieldErr={errors[field.name]}
                    register={register}
                    key={`field-${i}`}
                />
            );
        }
    });

    return (
        <form
            className="cmp-form--registration"
            onSubmit={handleSubmit(submitFn)}
        >
            {f}
            <div className="cmp-form__disclaimer">
                {config.disclaimerText + " "}
                <a href={config.termsAndConditionsLink}>
                    {config.termsAndConditionsText}
                </a>
            </div>
            <button
                type="submit"
                className="cmp-button"
                disabled={checkIfDisabled()}
            >
                {config.buttonText}
            </button>
        </form>
    );
};

export default Form;
