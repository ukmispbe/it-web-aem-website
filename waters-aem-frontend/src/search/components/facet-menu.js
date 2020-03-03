import React from 'react';
import ReactSVG from "react-svg";
import PropTypes from 'prop-types';

const FacetMenu = props => {
    return (
        <div className="facet-menu-container">
            <div className="facet-menu-container__heading">
                {props.filterTags}
                <div className="heading--with-selected-value">
                    <div className="back-btn">
                        <a href="javascript:void(0)" onClick={props.onClear}>
                            <ReactSVG src={props.previousIcon} />{" "}
                            {props.heading}
                        </a>
                    </div>
                    <h3>{props.selectedValue}</h3>
                </div>
            </div>
            <div className="facet-menu-container__body">
                {props.children}
            </div>
        </div>
    ); 
}

FacetMenu.propTypes = {
    heading: PropTypes.string.isRequired,
    selectedValue: PropTypes.string.isRequired,
    previousIcon: PropTypes.string.isRequired,
    filterTags: PropTypes.object.isRequired,
    onClear: PropTypes.func.isRequired
};

FacetMenu.defaultProps = {
    heading: '',
    selectedValue: '',
    previousIcon: '',
    filterTags: <></>,
    onClear: () => {}
};

export default FacetMenu;