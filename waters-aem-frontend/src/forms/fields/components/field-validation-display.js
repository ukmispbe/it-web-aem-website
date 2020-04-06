import React, { useContext } from "react";
import { useFieldApi } from '../../form';
import { useErrorsContext, useFormStateContext } from '../utils/stateWatcher';

const FieldValidationDisplay = ({
    name,
    matchName,
    children
}) => {
    const formState = useFormStateContext();
    const errors = useErrorsContext();

    const { options, type } = useContext(useFieldApi);

    const isDirty = (name) => formState.touched[0] && (typeof formState.touched[0] === "object" ? formState.touched[0].has(name) : formState.touched.indexOf(name) > -1);
    const isDirtyMatch = (name) => matchName !== "" ? isDirty(name) : false;

    const isValid = (name) => !errors[name];
    const isValidMatch = (name) => matchName !== "" ? isValid(name) : true;

    const renderClean = () => (
        <div className={`cmp-form-field cmp-form-field-${type}`}>
            {children}
        </div>
    );

    const renderValid = () => (
        <div className={`cmp-form-field cmp-form-field-${type} cmp-form-field--valid`}>
            {children}
        </div>
    );

    const renderInvalid = () => (
        <div className={`cmp-form-field cmp-form-field-${type} cmp-form-field--invalid`}>
            {children}
        </div>
    );

    const renderDisplay = (name) => {
        if (type === "dropdown" && !isValid(name)) return "invalid";
        if (!isDirty(name) && !isDirtyMatch(matchName)) return "clean";
        if (isValid(name) && isValidMatch(matchName)) return "valid";
        if (!isValid(name) || !isValidMatch(matchName)) return "invalid";
        return "clean";
    };

    let displayType = renderDisplay(name);

    if ((type === "radio" || type === "checkbox") && !!options) {
        options.forEach(option => {
            if (renderDisplay(option.name) !== "clean") {
                displayType = renderDisplay(option.name);
            }
        });
    }

    switch (displayType) {
        case "valid":
            return renderValid();
        case "invalid":
            return renderInvalid();
        case "clean":
        default:
            return renderClean();
    }
};

export default React.memo(FieldValidationDisplay);
