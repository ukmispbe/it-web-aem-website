import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';

const customStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#4f5b64',
        backgroundColor: state.isSelected ? '#f1f3f4' : '#fff',
        cursor: !state.isSelected ? 'pointer' : 'default',
        '&:hover': {
            color: !state.isSelected ? '#0077bb' : '#4f5b64',
            backgroundColor: !state.isSelected ? '#fff' : '#f1f3f4',
        },
        margin: 0,
    }),
    control: (provided, state) => ({
        ...provided,
        'border-radius': '0',
        padding: '0.5em',
        color: '#4f5b64',
        'border-color': state.isFocused ? '#9ca7b0' : '#9ca7b0',
        outline: 'none',
        cursor: 'pointer',
        'box-shadow': 'none',
        '&:hover': {
            outline: 'none',
            color: '#0077bb',
            borderColor: '#9ca7b0',
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
