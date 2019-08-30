import React from 'react';
import ReactSVG from 'react-svg';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import ScreenSizes from '../../scripts/screenSizes';

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
        padding: '0.3em 0.5em',
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
            <ReactSVG
                src={props.theme.dropdownIndicator}
                className = "dropDownIcon"
            />
        </components.DropdownIndicator>
    );
};

// SORT/FILTER AND RECOMBINE OPTIONS for select
const getOptions = options => {
    // let sortedOptions = options.sort((a, b) => (a.count > b.count) ?
    //     -1 : (a.count === b.count) ? (a.name.localeCompare(b.name)) : 1);
    // sortedOptions = sortedOptions.filter(a => a['count'] != undefined && a['count'] > 0)
    let newList = options.map((a, index) => { 
        return {
            value: index,
            label: a.name + ' (' + a.count + ')'
        }
    })
    return newList;
};


 
const CategoryDropdown = props => {

    const mobileView = () => { 
        return (
            <div className="cmp-search-category-dropdown">
                <Select
                    defaultValue={getOptions(props.categoryOptions)[0]}
                    options={getOptions(props.categoryOptions)}
                    value={props.categoryValue}
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