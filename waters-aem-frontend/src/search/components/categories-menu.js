import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

export const CategoriesMenu = (props) => {
    const hasChildren = (props.children) ? true: false;
    const items = props.items.filter(item => item.categoryFacetName !== 'library_facet');

    const getHeading = () => {
        return (props.selectedValue) 
            ? <h3 className="bread-crumb"><a href="javascript:void(0)" onClick={props.clear}>{props.text[props.categoryKey]}</a> <ReactSVG src={props.text.nextIcon} /> {props.selectedValue}</h3> 
            : <h3>{props.text[props.categoryKey]}</h3>
    }

    const getBody = () => {
        if(props.showBothChildrenAndItems) {
            return getBothChildrenAndItems();
        } else {
            return getEitherChildrenOrItems();
        }
    }

    const getBothChildrenAndItems = () => {
        return <>
            {props.children}
            {getItems()}
        </>;
    }

    const getEitherChildrenOrItems = () => hasChildren ? props.children : getItems();

    const getItems = () => items.map((item, index) => {
        return <div key={item.categoryFacetName} className="categories-type-menu-container__item" onClick={e => props.click(item)}>
                <div><a href="javascript:void(0)">{item.categoryFacetValue}</a></div>
                <div>
                    <a href="javascript:void(0)">
                        <ReactSVG src={props.text.nextIcon} />
                    </a>
                </div>
            </div>});

    return (<>
        <div className="categories-type-menu-container">
            <div className="categories-type-menu-container__heading">
                {props.filterTags}
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
    clear: PropTypes.func,
    showBothChildrenAndItems: PropTypes.bool,
    filterTags: PropTypes.object
}

CategoriesMenu.defaultProps = {
    showBothChildrenAndItems: false
}