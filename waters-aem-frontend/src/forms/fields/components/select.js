import React, { useState, useContext } from 'react';
import ReactSelect, { components, createFilter } from "react-select";
import ReactSVG from "react-svg";

import { useFieldApi, useFormApi } from '../../form';
import customStyles from "../styles/dropdown.scss";

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ReactSVG src={props.theme.dropdownIndicator} />
        </components.DropdownIndicator>
    );
};

const Select = (props) => {
    const { name, options, dropdownIndicator, placeholder, disabled } = useContext(useFieldApi);
    const { triggerValidation, setValue, getValue, activateField, deactivateField, setCountrySaved, regionalConfig } = useContext(useFormApi);
    const [selectedValue, setSelectedValue] = useState(getValue(name) ? getValue(name).toLowerCase() : "");

    const setupOptions = (label, value) => ({ label: label, value: value });

    const getOptions = () => {
        switch (name) {
            case "country":
                return options.map(val => setupOptions(val.displayName, val.countryCode));
            case "state":
                return options.map(val => setupOptions(val.displayName, val.stateCode));
            case "salutation":
                return options.map(val => setupOptions(val.displayName, val.salutationCode));           
            default:
                return options.map(val => setupOptions(val.label, val.value));
        }
    };

    const handleChange = option => {
        setSelectedValue(option.value);
        setValue(name, option.value, true);
        if (name === "country") {
            // Check if any Form Elements need hiding or displaying
            // Get Regional config 
            const countryOptionsConfig = regionalConfig;          
            // Hide all country configurable fields
            const allCountryOptions = countryOptionsConfig.filter(p => p.country === "all")
            if (allCountryOptions.length === 1){
                allCountryOptions[0].fields.map(fieldName => deactivateField(fieldName));
            }        
            // Display Specific fields for the selected country
            const selectedCountryOptions = countryOptionsConfig.filter(p => p.country === option.value)
            if (selectedCountryOptions.length === 1){
                selectedCountryOptions[0].fields.map(fieldName => activateField(fieldName));
            }
            // Update Country Code in State
            setCountrySaved(option.value);
        }
    };

    return (
        <ReactSelect
            {...props}
            options={getOptions()}
            isDisabled={disabled}
            isSearchable={true}
            styles={customStyles}
            placeholder={placeholder}
            classNamePrefix={"cmp-custom-dropdown"}
            components={{ DropdownIndicator }}
            theme={{ dropdownIndicator }}
            filterOption={createFilter({ ignoreCase: true, trim: true, matchFrom: "start"})}
            onBlur={() => triggerValidation({ name: name })}
            onChange={handleChange}
            value={getOptions().filter(o => o.value === selectedValue)}
        />
    );
};

export default React.memo(Select);