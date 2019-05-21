import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';

const getOptions = text => {
    return [
        {
            value: 1,
            label: text.sortByBestMatch,
        },
        {
            value: 2,
            label: text.sortByMostRecent,
        },
    ];
};

const customStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#4f5b64',
        backgroundColor: state.isSelected ? '#f1f3f4' : '#fff',
        cursor: !state.isSelected ? 'pointer' : 'default',
        marginBottom: '0.15em',
        '&:hover': {
            color: !state.isSelected ? '#0077bb' : '#4f5b64',
            backgroundColor: '#f1f3f4',
        },
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
        <div className="cmp-search-sortby">
            <h3>{props.text.sortByHeading}</h3>
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
        </div>
    );
};

Dropdown.defaultProps = {
    isSearchable: false,
    placeholder: '',
};

export default Dropdown;
