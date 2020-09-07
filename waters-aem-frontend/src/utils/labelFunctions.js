import React from 'react';
import DigitalData from '../scripts/DigitalData';

export const renderFormattedLabel = (label, required, optionalLabel = '') => {

    if (required && (DigitalData.page.country.toUpperCase() === "US")) {
        return (
            <>
                <span className="cmp-form-field--required">
                    {'*'}
                </span>
                {label}
            </>
        )
    }

    if (!required) {
        return (
            <>
                {label}
                <span className="cmp-form-field--optional">
                    {' ' + optionalLabel}
                </span>
            </>
        )
    }

    if (required && (DigitalData.page.country.toUpperCase() !== "US")) {
        return (
            <>
                {label}
                <span className="cmp-form-field--required">
                    {'*'}
                </span>
            </>
        )
    }
}

export const renderFormattedLabelText = (label, required, optionalLabel = '') => {

    if (required && (DigitalData.page.country.toUpperCase() === "US")) {
        return '*' + label;
    }

    if (required && (DigitalData.page.country.toUpperCase() !== "US")) {
        return label + '*';
    }

    if (!required) {
        return (
            <>
                {label}
                <span className="cmp-form-field--optional">
                    {' ' + optionalLabel}
                </span>
            </>
        )
    }
}