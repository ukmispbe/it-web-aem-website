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
    const { name, options, dropdownIndicator, placeholder } = useContext(useFieldApi);
    const { triggerValidation, setValue, getValue } = useContext(useFormApi);
    const [selectedValue, setSelectedValue] = useState(getValue(name).toLowerCase());

    const setupOptions = (label, value) => ({ label: label, value: value });

    const getOptions = () => {
        switch (name) {
            case "country":
                return options.map(val => setupOptions(val.displayName, val.countryCode));
            case "state":
                return options.map(val => setupOptions(val.displayName, val.stateCode));
            default:
                return options.map(val => setupOptions(val.label, val.value));
        }
    };

    const handleChange = option => {
        setSelectedValue(option.value);
        setValue(name, option.value, true);
    };

    return (
        <ReactSelect
            {...props}
            options={getOptions()}
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