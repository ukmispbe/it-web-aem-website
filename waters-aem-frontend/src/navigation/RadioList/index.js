import React from "react";
import PropTypes from 'prop-types';

import { elementLocator } from "../../utils/eCommerceFunctions.js";

const RadioList = ({items, activeIndex, onClick}) => {
    const radialRef = React.useRef();
    return (
        <div className="cmp-category-wrapper">
            <div><h3>Category</h3></div>
            <div role="radiogroup" ref={radialRef} className="cmp-category-items">
                {items.map((item, index) => <Radio key={`CategoryRadio-${index}`} name={item.name} count={item.count} index={index} isActive={index === activeIndex} onClick={onClick} />)}
            </div>
        </div>
    );
}

const checkIfZero = (onClick, index, count)  => {
    if (count !== 0) {
        onClick(index);
    }
}

const Radio = ({index, name, count, isActive, onClick}) => {
    return (
        <div className={`cmp-category-item${isActive ? " active" : ""}`}  onClick={() => checkIfZero(onClick, index, count)}>
            <input type="radio" role="radio" 
            name={name} id={name} aria-labelledby={name} aria-disabled="false" 
            aria-checked={isActive} checked={isActive} aria-required="false" class={`${count === 0 ? "inactive" : ""}`} readonly="" 
            data-locator={name} />
            <a class={`radio ${count === 0 ? "inactive" : "valid"}`} id={name + '_link'} >
                <div class={`selector ${count === 0 ? "inactive" : ""}`}></div>
            </a>
            <span className={`cmp-radio__radio-label ${count === 0 ? " inactive" : ""}`} data-locator={elementLocator(name)}>{name} ({count})</span>
        </div>
    );
}


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

RadioList.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

RadioList.defaultProps = {
    items: [],
    activeIndex: -1,
    onClick: () => {}
}
export default RadioList;