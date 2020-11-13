import React from 'react';
import DigitalData from '../scripts/DigitalData';

// Array to hold countries with the Required "*" Asterisk before the label
const countryArray = ["JP"];

const isPrefix = () => {
    return countryArray.indexOf((DigitalData.page.country).toUpperCase()) > -1;
}

export const renderFormattedLabel = (label, required, optionalLabel = '') => {
    
    if (required) {
        const isPrefixValue = isPrefix();
        return (
            <>
                {isPrefixValue && (
                    <span className="cmp-form-field--required">
                        {'*'}
                    </span>
                )} 
                {label}
                {!isPrefixValue && (
                    <span className="cmp-form-field--required">
                        {'*'}
                    </span>
                )} 
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
}

export const renderFormattedLabelText = (label, required, optionalLabel = '') => {
    if (required) {
        const isPrefixValue = isPrefix();
        if (isPrefixValue) {
            return '*' + label;
        }
    
        if (!isPrefixValue) {
            return label + '*';
        }
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