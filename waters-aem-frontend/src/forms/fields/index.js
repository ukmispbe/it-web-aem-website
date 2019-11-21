import React, { useContext } from  'react';

import FieldValidationDisplay from "./components/field-validation-display";
import { useFieldApi, useFormApi } from '../form';

import Input from "./input";
import CheckboxOrRadio from "./checkboxOrRadio";
import Dropdown from "./dropdown";
import Hr from "./hr";
import Captcha from "./captcha";

const formType = {
    text: Input,
    number: Input,
    password: Input,
    email: Input,
    radio: CheckboxOrRadio,
    checkbox: CheckboxOrRadio,
    dropdown: Dropdown,
    select: Dropdown,
    break: Hr,
    captcha: Captcha
};

const Field = ({}) => {
    const { type, name, hasMatch, field } = useContext(useFieldApi);
    const { formState, errors } = useContext(useFormApi);

    const Component = formType[type];

    const getMatchName = () => name ? "confirm".concat(name.charAt(0).toUpperCase() + name.slice(1)) : "";

    const isDirty = (name) => formState.touched[0] && (typeof formState.touched[0] === "object" ? formState.touched[0].has(name) : formState.touched.indexOf(name) > -1);

    const isValid = (name) => !errors[name];

    return (Component && (<>
        <FieldValidationDisplay
            dirty={isDirty(name)}
            valid={isValid(name)}
            type={type}
            hasMatchValid={hasMatch ? isValid(getMatchName()) : true}
            dirtyMatch={isDirty(getMatchName())}
        >
            <Component {...field} />
        </FieldValidationDisplay>
    </>));
};

export default Field;