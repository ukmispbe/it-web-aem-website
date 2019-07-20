import React from 'react';
import PropTypes from 'prop-types';

const OverLay = (props) => {
    const className = props.darkOverlay ?  'overlay-container' : 'overlay-container--light';
    const getContent = () => props.isOpen ? <div className={className}></div> : <></>;

    return (<>{getContent()}</>);
}

OverLay.propTypes = {
    isOpen: PropTypes.bool.isRequired
}

OverLay.defaultProps = {
    isOpen: false,
    darkOverlay: true
}

export default OverLay;