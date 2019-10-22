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

const getOptions = opts => {
    return opts.map(val => {
        return {
            label: val.displayName,
            value: val.countryCode
        };
    });
};

const Dropdown = ({
    label,
    options,
    name,
    register,
    dropdownIndicator,
    placeholder
}) => {
    // return <>Dropdown</>;
    const { value, setValue } = useState();
    console.log(getOptions(options));
    return (
        <Select
            defaultValue={""}
            options={getOptions(options)}
            value={value}
            onChange={x => console.log(x)}
            isSearchable={true}
            styles={customStyles}
            placeholder={placeholder}
            classNamePrefix={"cmp-custom-dropdown"}
            components={{ DropdownIndicator }}
            theme={{ dropdownIndicator }}
            ref={() =>
                register({ name }, { validate: value => console.log(value) })
            }
        />
    );
};

export default Dropdown;
