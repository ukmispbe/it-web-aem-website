import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import variables from '../../../src/styles/variables.scss';

const customStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        color: variables.colorGray50,
        padding: '0.75em 1em',
        backgroundColor: state.isSelected ? variables.colorBackgroundLight : variables.colorWhite,
        cursor: !state.isSelected ? 'pointer' : 'default',
        '&:hover': {
            color: !state.isSelected ? variables.colorBlue50 : variables.colorGray50,
            backgroundColor: !state.isSelected ? variables.colorWhite : variables.colorBackgroundLight,
        },
        margin: 0,
    }),
    control: (provided, state) => ({
        ...provided,
        'border-radius': variables.borderRadius,
        padding: '0.3em 0.5em',
        color: variables.colorGray50,
        'border-color': state.isFocused ? variables.colorBorderDark : variables.colorBorderDark,
        outline: 'none',
        cursor: 'pointer',
        'box-shadow': 'none',
        '&:hover': {
            outline: 'none',
            color: variables.colorBlue50,
            borderColor: variables.colorBlue50,
        },
    }),
    singleValue: (provided, state) => {
        return {};
    },
    menu: provided => ({
        ...provided,
        marginTop: 0,
        borderRadius: 0,
        width: 'calc(100% - 2px)',
        marginLeft: '1px',
        marginBottom: 0,
        padding: 0,
    }),
    menuList: provided => ({
        ...provided,
        paddingBottom: 0,
        paddingTop: 0,
    }),
};

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ReactSVG src={props.theme.dropdownIndicator} />
        </components.DropdownIndicator>
    );
};

const Dropdown = props => {
    return (
        <Select
            defaultValue={props.getOptions(props.text)[1]}
            options={props.getOptions(props.text)}
            value={
                props.sortValue && props.sortValue.value
                    ? props.sortValue.value
                    : props.getOptions(props.text)[props.sortValue - 1]
            }
            onChange={props.onChange}
            isSearchable={props.isSearchable}
            styles={customStyles}
            placeholder={props.placeholder}
            classNamePrefix={'cmp-custom-dropdown'}
            components={{ DropdownIndicator }}
            theme={{ dropdownIndicator: props.text.downIcon }}
        />
    );
};

Dropdown.defaultProps = {
    isSearchable: false,
    placeholder: '',
};

export default Dropdown;
