import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';

import customDropdownStyles from './custom-styles';

const dropdownComponents = label => {
    let prefix = label !='' ? label + ' ': '';

    return {
        SingleValue: ({ children, ...props }) => {
            return (
                <components.SingleValue {...props}>
                    {prefix + children}
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

const CategoryDropdown = props => {
    const options = props.categoryOptions;

    const renderDropdownView = () => { 
        return (
            <div className="cmp-search-category-header-dropdown">
                <Select
                    options={options}
                    value={options[props.categoryValue]}
                    onChange={props.categoryOnChange}
                    isSearchable={props.categoryIsSearchable}
                    styles={customDropdownStyles}
                    placeholder={props.categoryPlaceholder}
                    classNamePrefix={'cmp-custom-dropdown'}
                    components={dropdownComponents(props.categoryLabelPrefix)}
                    theme={{dropdownIndicator: props.categoryDownIcon}}
                />
            </div>
        );
    }

    return renderDropdownView()
};

CategoryDropdown.propTypes = {
    categoryOptions: PropTypes.array.isRequired,
    categoryOnChange: PropTypes.func.isRequired,
    categoryLabelPrefix: PropTypes.string,
    categoryIsSearchable: PropTypes.bool,
    categoryPlaceholder: PropTypes.string,
    categoryDownIcon: PropTypes.string.isRequired,
    categoryValue: PropTypes.number
}

CategoryDropdown.defaultProps = {
    categoryOptions: [],
    categoryOnChange: () => {},
    categoryLabelPrefix: '',
    categoryIsSearchable: false,
    categoryPlaceholder: '',
    categoryDownIcon: '',
    categoryValue: 0
};

export default CategoryDropdown;