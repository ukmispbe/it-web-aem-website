import React from 'react';
import PropTypes from 'prop-types';
import screenSizes from "../scripts/screenSizes";

import './custom-styles.scss';
const PADDING = 68;
const CHARACTER_PIXEL = 8;

const SelectDropdown = props => {
    const { options, className, value, onChange } = props;
    const Items = () => options.map(option => <option key={option.value} value={option.value} >{option.label}</option>);
    const renderDropdownView = () => { 
        return (
            <div className={className}>
                 <select className="select-dropdown" style={{width: screenSizes.isMobile() ? '100%' : `${PADDING + value.length*CHARACTER_PIXEL}px` }} value={value} onChange={onChange}>
                    <Items />
                </select>
            </div>
        );
    }

    return renderDropdownView()
};

SelectDropdown.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    labelPrefix: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string
}

SelectDropdown.defaultProps = {
    className: '',
    options: [],
    onChange: () => {},
    labelPrefix: '',
    placeholder: '',
    value: ''
};

export default SelectDropdown;