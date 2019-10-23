import React from "react";

const FieldValidationDisplay = ({
    dirty,
    valid,
    type,
    hasMatchValid,
    dirtyMatch,
    children
}) => {
    if (!dirty && !dirtyMatch) {
        return (
            <div className={`cmp-form-field cmp-form-field-${type}`}>
                {children}
            </div>
        );
    }
    if (valid && hasMatchValid) {
        return (
            <div
                className={`cmp-form-field cmp-form-field-${type} cmp-form-field--valid`}>
                {children}
            </div>
        );
    } else if (!valid || !hasMatchValid) {
        return (
            <div
                className={`cmp-form-field cmp-form-field-${type} cmp-form-field--invalid`}>
                {children}
            </div>
        );
    }
};

export default FieldValidationDisplay;
