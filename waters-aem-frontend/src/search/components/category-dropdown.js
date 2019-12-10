import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';
import variables from '../../../src/styles/variables.scss';

const customStyles = {
    indicatorSeparator: () => ({
        display: 'none',
    }),
    option: (provided, state) => ({
        ...provided,
        color: variables.colorGray50,
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
        'border-radius': variables.colorBlue50,
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
            <ReactSVG
                src={props.theme.dropdownIndicator}
                className = "dropDownIcon"
            />
        </components.DropdownIndicator>
    );
};


const getOptions = options => {
    let newList = options.map((a, index) => { 
        return {
            value: index,
            label: a.name
        }
    })
    
    return newList;
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
                    styles={customStyles}
                    placeholder={props.categoryPlaceholder}
                    classNamePrefix={'cmp-custom-dropdown'}
                    components={{ DropdownIndicator }}
                    theme={{ dropdownIndicator: props.categoryDownIcon }}
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

CategoryDropdown.defaultProps = {
    categoryIsSearchable: false,
    categoryPlaceholder: '',
};

CategoryDropdown.propTypes = {
    categoryOptions: PropTypes.array.isRequired,
    categoryOnChange: PropTypes.func.isRequired,
    categoryIsSearchable: PropTypes.bool,
    categoryPlaceholder: PropTypes.string,
    categoryDownIcon: PropTypes.string.isRequired,
    categoryValue: PropTypes.number
}


export default CategoryDropdown;