import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

export const ContentTypeMenu = (props) => {
    const hasChildren = (props.children) ? true: false;
    const items = props.items.filter(item => item.categoryFacetName !== 'library_facet');

    const getHeading = () => {
        return hasChildren 
            ? <div className="bread-crumb"><a href="javascript:void(0)" onClick={props.clear}>Content Type</a> <ReactSVG src={props.text.nextIcon} /> {props.selectedValue}</div> 
            : <div>Content Type</div>
    }

    const getDisplay = () => {
        return hasChildren ? props.children : items.map((item, index) => {
            return <div key={item.categoryFacetName} className="content-type-menu-container__item" onClick={e => props.click(item)}>
                    <div>{item.categoryFacetValue}</div>
                    <ReactSVG src={props.text.nextIcon} />
                </div>});
    }

    return (<>
        <div className="content-type-menu-container">
            <div className="content-type-menu-container__heading">
                {getHeading()}
            </div>
            <div className="content-type-menu-container__body">
                {getDisplay()}
            </div>
        </div>
    </>);
}

ContentTypeMenu.propTypes = {
    text: PropTypes.object,
    selectedValue: PropTypes.string,
    items: PropTypes.array,
    click: PropTypes.func,
    clear: PropTypes.func
}