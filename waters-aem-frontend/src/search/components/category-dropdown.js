import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';
import customDropdownStyles from '../../utils/dropdown/custom-styles';

const getOptions = options => {
    let newList = options.filter(item => item.count !== 0).map((a, index) => { 
        let labelWithCount = a.hasOwnProperty('mobileTranslation') && a.mobileTranslation 
            ? a.mobileTranslation : a.translation;
        return {
            value: index,
            label: `${labelWithCount} (${a.count})`
        }
    })

    return newList;
};

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
    const options = getOptions(props.categoryOptions);

    const mobileView = () => { 
        return (
            <div className="cmp-search-category-dropdown">
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

    return (
        <>
            { ScreenSizes.isTabletAndUnder() ? mobileView() : null }
        </>
    );
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