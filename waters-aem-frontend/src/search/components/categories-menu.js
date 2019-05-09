import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

export const CategoriesMenu = (props) => {
    const hasChildren = (props.children) ? true: false;
    const items = props.items.filter(item => item.categoryFacetName !== 'library_facet');

    const getHeading = () => {
        return hasChildren 
            ? <h3 className="bread-crumb"><a href="javascript:void(0)" onClick={props.clear}>{props.text[props.categoryKey]}</a> <ReactSVG src={props.text.nextIcon} /> {props.selectedValue}</h3> 
            : <h3>{props.text[props.categoryKey]}</h3>
    }

    const getBody = () => {
        return hasChildren ? props.children : items.map((item, index) => {
            return <div key={item.categoryFacetName} className="categories-type-menu-container__item" onClick={e => props.click(item)}>
                    <div><a href="javascript:void(0)">{item.categoryFacetValue}</a></div>
                    <div>
                        <a href="javascript:void(0)">
                            <ReactSVG src={props.text.nextIcon} />
                        </a>
                    </div>
                </div>});
    }

    return (<>
        <div className="categories-type-menu-container">
            <div className="categories-type-menu-container__heading">
                {getHeading()}
            </div>
            <div className="categories-type-menu-container__body">
                {getBody()}
            </div>
        </div>
    </>);
}

CategoriesMenu.propTypes = {
    text: PropTypes.object,
    categoryKey: PropTypes.string,
    selectedValue: PropTypes.string,
    items: PropTypes.array,
    click: PropTypes.func,
    clear: PropTypes.func
}