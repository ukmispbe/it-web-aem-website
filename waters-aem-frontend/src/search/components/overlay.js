import React from 'react';
import PropTypes from 'prop-types';

const OverLay = (props) => {
    const getContent = () => props.isOpen ? <div className="overlay-container"></div> : <></>;

    return (<>{getContent()}</>);
}

OverLay.propTypes = {
    isOpen: PropTypes.bool.isRequired
}

OverLay.defaultProps = {
    isOpen: false
}

export default OverLay;