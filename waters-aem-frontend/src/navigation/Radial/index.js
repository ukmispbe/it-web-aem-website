import React from "react";
import PropTypes from 'prop-types';

import { elementLocator } from "../../utils/eCommerceFunctions.js";

const Radial = ({items, activeIndex, onClick}) => {
    const radialRef = React.useRef();
    return (
        <div className="cmp-category-wrapper">
            <div><h3>Category</h3></div>
            <div ref={radialRef} className="cmp-category-items">
                {items.map((item, index) => <Radio key={`CategoryRadio-${index}`} name={item.name} count={item.count} index={index} isActive={index === activeIndex} onClick={onClick} />)}
            </div>
        </div>
    );
}

const Radio = ({index, name, count, isActive, onClick}) => 
    <div className={`cmp-category-item${isActive ? " active" : ""}`} onClick={() => onClick(index)}>
        <input type="radio" role="radio" 
        name={name} id={name} aria-labelledby={name} aria-disabled="false" 
        aria-checked={isActive} checked={isActive} aria-required="false" class="valid" readonly="" 
        data-locator={name} />
        <a class="radio  valid" id={name + '_link'} >
            <div class="selector"></div>
        </a>
        <span className="cmp-radio__radio-label" data-locator={elementLocator(name)}>{name} ({count})</span>
    </div>;

Radio.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

Radio.defaultProps = {
    name: "",
    index: -1,
    isActive: false,
    onClick: () => {}
}

Radial.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

Radial.defaultProps = {
    items: [],
    activeIndex: -1,
    onClick: () => {}
}
export default Radial;