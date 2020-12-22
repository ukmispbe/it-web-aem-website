import React from "react";
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { elementLocator } from "../../utils/eCommerceFunctions.js";

const CategoryList = ({items, activeIndex, onClick}) => {
    const categoryRef = React.useRef();
    return (
        <div className="cmp-category-wrapper">
            <div><h3>Category</h3></div>
            <div ref={categoryRef} className="cmp-category-items">
                {items.map((item, index) => 
                {
                    let backImage;
                    if (index === 0) {
                        backImage =  <ReactSVG className="cmp-categories-back" src="/content/dam/waters/en/brand-assets/icons/multiple.svg" />;
                    }
                    const isHidden = determineIfHidden(items, index, activeIndex);

                    return <Category key={`Category-${index}`} name={item.translation} count={item.count} index={index} isActive={index === activeIndex} onClick={onClick}  backImage={backImage} isHidden={isHidden} />
                }
                )}
            </div>
            {activeIndex !== 0 && <hr className="cmp-category-separator h-large" />}
        </div>
    );
}

const determineIfHidden = (items, index, activeIndex) => {
    if (activeIndex === 0) {
        if (index === 0) {
            return true;
        }
        return false;
    } 
    else {
        if (activeIndex === index || index === 0) {
            return false;
        }
        return true;
    }
}

const Category = ({index, name, count, isActive, onClick, backImage, isHidden}) => 
    <div className={`cmp-category-item${isActive ? " active" : ""} ${isHidden ? " hidden" : ""}`} onClick={() => onClick(index)}>
        {backImage}
        <span className="cmp-category-label" data-locator={elementLocator(name)}>{name}</span>
        <span className="cmp-category-count" data-locator={elementLocator(count)}> ({count})</span>
    </div>;


Category.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired
};

Category.defaultProps = {
    name: "",
    index: -1,
    isActive: false,
    onClick: () => {},
    isHidden: false
}

CategoryList.propTypes = {
    items: PropTypes.array.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

CategoryList.defaultProps = {
    items: [],
    activeIndex: -1,
    onClick: () => {}
}
export default CategoryList;