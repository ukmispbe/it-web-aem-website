import React from "react";
import useForm from "react-hook-form";
import Text from "./fields/text";
import Password from "./fields/password";
import Email from "./fields/email";
import Radio from "./fields/radio";
import Checkbox from "./fields/checkbox";
import Dropdown from "./fields/dropdown";
import Hr from "./fields/hr";

const formType = {
    text: Text,
    password: Password,
    email: Email,
    radio: Radio,
    checkbox: Checkbox,
    dropdown: Dropdown,
    select: Dropdown,
    break: Hr
};

const Form = ({ config, submitFn }) => {
    const { register, handleSubmit, errors } = useForm();
    const f = config.fields.map((field, i) => {
        const Component = formType[field.type];

        if (Component) {
            return (
                <Component {...field} register={register} key={`field-${i}`} />
            );
        }
    });

    const createMarkupForDisclaimer = () => {
        return { __html: config.disclaimer };
    };

    return (
        <form
            className="cmp-form--registration"
            onSubmit={handleSubmit(submitFn)}
        >
            {f}
            <div
                className="cmp-form__disclaimer"
                dangerouslySetInnerHTML={createMarkupForDisclaimer()}
            ></div>
            <button type="submit" className="cmp-button">
                {config.buttonText}
            </button>
        </form>
    );
};

export default Form;
