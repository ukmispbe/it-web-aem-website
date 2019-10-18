import React from "react";

const FieldValidationDisplay = ({ dirty, valid, type, children }) => {
    if (!dirty) {
        return (
            <div className={`cmp-form-field cmp-form-field-${type}`}>
                {children}
            </div>
        );
    }
    if (valid) {
        return (
            <div
                className={`cmp-form-field cmp-form-field-${type} cmp-form-field--valid`}
            >
                {children}
            </div>
        );
    } else if (!valid) {
        return (
            <div
                className={`cmp-form-field cmp-form-field-${type} cmp-form-field--invalid`}
            >
                {children}
            </div>
        );
    }
};

export default FieldValidationDisplay;
