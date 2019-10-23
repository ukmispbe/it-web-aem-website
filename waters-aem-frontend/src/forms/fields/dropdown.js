import React, { useState } from "react";
import ReactSVG from "react-svg";
import Select, { components } from "react-select";
import variables from "../../../src/styles/variables.scss";

const customStyles = {
    indicatorSeparator: () => ({
        display: "none"
    }),
    option: (provided, state) => ({
        ...provided,
        color: variables.colorGray50,
        backgroundColor: state.isSelected
            ? variables.colorBackgroundLight
            : variables.colorWhite,
        cursor: !state.isSelected ? "pointer" : "default",
        "&:hover": {
            color: !state.isSelected
                ? variables.colorBlue50
                : variables.colorGray50,
            backgroundColor: !state.isSelected
                ? variables.colorWhite
                : variables.colorBackgroundLight
        },
        margin: 0
    }),
    control: (provided, state) => ({
        ...provided,
        "border-radius": "0",
        padding: "0.3em 0.5em",
        color: variables.colorGray50,
        "border-color": state.isFocused
            ? variables.colorBorderDark
            : variables.colorBorderDark,
        outline: "none",
        cursor: "pointer",
        "box-shadow": "none",
        "&:hover": {
            outline: "none",
            color: variables.colorBlue50,
            borderColor: variables.colorBorderDark
        }
    }),
    singleValue: (provided, state) => {
        return {};
    },
    menu: provided => ({
        ...provided,
        marginTop: 0,
        borderRadius: 0,
        width: "calc(100% - 2px)",
        marginLeft: "1px",
        marginBottom: 0,
        padding: 0
    }),
    menuList: provided => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0
    })
};

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

const Dropdown = ({
    label,
    options,
    name,
    register,
    dropdownIndicator,
    placeholder,
    setValue
}) => {
    const [selectValue, setSelect] = useState();

    const handleChange = opt => {
        setSelect(opt);
        setValue(name, opt.value);
    };

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
                ref={() =>
                    register(
                        { name },
                        {
                            validate: value => {
                                if (value) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        }
                    )
                }
            />
        </>
    );
};

export default Dropdown;
