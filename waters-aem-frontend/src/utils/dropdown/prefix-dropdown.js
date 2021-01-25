import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import customDropdownStyles from './custom-styles';

const dropdownComponents = prefix => {
    let prefixLabel = prefix !='' ? prefix + ' ': '';

    return {
        SingleValue: ({ children, ...props }) => {
            return (
                <components.SingleValue {...props}>
                    {prefixLabel + children}
                </components.SingleValue>
            );
        },
        DropdownIndicator: ({ children, ...props }) => {
            return (
                <components.DropdownIndicator {...props}>
                    <ReactSVG
                        src={props.theme.dropdownIndicator}
                        className = "dropDownIcon"
                    />
                </components.DropdownIndicator>
            );
        }
    };
};

const PrefixDropdown = props => {
    return (
        
        <div aria-describedby="cmp-custom-dropdown__single-value" tabindex="0">
            <Select
                defaultValue={props.getOptions(props.text)[props.defaultValue - 1]}
                options={props.getOptions(props.text)}
                value={
                    props.dropdownValue && props.dropdownValue.value
                        ? props.dropdownValue.value
                        : props.getOptions(props.text)[props.dropdownValue - 1]
                }
                onChange={props.onChange}
                isSearchable={props.isSearchable}
                styles={customDropdownStyles}
                placeholder={props.placeholder}
                classNamePrefix={'cmp-custom-dropdown'}
                components={dropdownComponents(props.prefix)}
                theme={{dropdownIndicator: props.downIcon}}
                data-locator="cmp-custom-dropdown"
                tabIndex="-1"
            />
        </div>
    );
};

PrefixDropdown.propTypes = {
    getOptions: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
    dropdownValue: PropTypes.number,
    prefix: PropTypes.string,
    isSearchable: PropTypes.bool,
    placeholder: PropTypes.string,
    downIcon: PropTypes.string
}

PrefixDropdown.defaultProps = {
    getOptions: () => {}, 
    onChange: () => {},
    text: {},
    prefix: '',
    isSearchable: false,
    placeholder: '',
    downIcon: '/content/dam/waters/en/brand-assets/icons/down.svg',
    dropdownValue: 0
};

export default PrefixDropdown;