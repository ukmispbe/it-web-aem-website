import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import customDropdownStyles from './custom-styles';

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <ReactSVG src={props.theme.dropdownIndicator} />
        </components.DropdownIndicator>
    );
};

const Dropdown = props => {
    return (
        <div aria-describedby="cmp-custom-dropdown__single-value" tabindex="0">
            <Select
                defaultValue={props.getOptions(props.text)[props.defaultValue - 1]}
                options={props.getOptions(props.text)}
                value={
                    props.sortValue && props.sortValue.value
                        ? props.sortValue.value
                        : props.getOptions(props.text)[props.sortValue - 1]
                }
                onChange={props.onChange}
                isSearchable={props.isSearchable}
                styles={customDropdownStyles}
                placeholder={props.placeholder}
                classNamePrefix={'cmp-custom-dropdown'}
                components={{ DropdownIndicator }}
                theme={{ dropdownIndicator: props.text.downIcon }}
                data-locator="cmp-custom-dropdown"
                tabIndex="-1"
            />
        </div>
    );
};

Dropdown.defaultProps = {
    isSearchable: false,
    placeholder: '',
};

export default Dropdown;
