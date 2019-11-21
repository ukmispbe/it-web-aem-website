import React, { useState, useEffect, useContext } from "react";
import Select, { components, createFilter } from "react-select";
import ReactSVG from "react-svg";

import DigitalData from "../../scripts/DigitalData";
import customStyles from "./styles/dropdown.scss";

import { useFormApi, useFieldApi } from '../form';

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ReactSVG src={props.theme.dropdownIndicator} />
        </components.DropdownIndicator>
    );
};

const getOptions = (opts, name) => {
    let opt;
    switch (name) {
        case "country":
            opt = opts.map(val => {
                return {
                    label: val.displayName,
                    value: val.countryCode
                };
            });
            break;
    }

    return opt;
};

const getDefault = (options, name) => {
    let defaultValue;
    const allOptions = getOptions(options, name);

    switch (true) {
        case DigitalData.country != DigitalData.globalExperience && name == "country":
            const activeOption = allOptions.find(function (option) {
                return option.value.toLowerCase() == DigitalData.country.toLowerCase();
            });
            defaultValue = activeOption ? activeOption : '';
            break;
        default:
            defaultValue = '';
    }

    return defaultValue;
}

const Dropdown = ({}) => {
    const { name, label, options, dropdownIndicator, placeholder } = useContext(useFieldApi);
    const { register, setValue } = useContext(useFormApi);
    const [selectValue, setSelect] = useState();

    const handleChange = opt => {
        setSelect(opt);
        setValue(name, opt.value, true);
    };
    const filterConfig = {
        ignoreCase: true,
        trim: true,
        matchFrom: "start"
    };

    useEffect(() => {
        if (typeof selectValue == 'undefined') {
            handleChange(getDefault(options,name))
        }
    }, [])

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Select
                id={name}
                name={name}
                defaultValue={""}
                options={getOptions(options, name)}
                value={selectValue}
                onChange={handleChange}
                isSearchable={true}
                styles={customStyles}
                placeholder={placeholder}
                classNamePrefix={"cmp-custom-dropdown"}
                components={{ DropdownIndicator }}
                theme={{ dropdownIndicator }}
                filterOption={createFilter(filterConfig)}
                ref={() =>
                    register(
                        { name },
                        {
                            validate: value => !!value
                        }
                    )
                }
            />
        </>
    );
};

export default Dropdown;
