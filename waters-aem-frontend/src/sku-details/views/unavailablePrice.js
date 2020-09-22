import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import { elementLocator } from '../../utils/eCommerceFunctions';

function UnavailablePrice(props) {
    const { label, icon, text } = props;
    return (
        <>
            <div className="cmp-sku-list__cust-price-label" data-locator="sku-price-label" aria-label={label}>{label}</div>
            <div className="cmp-sku-list__unavialable">
                <ReactSVG aria-hidden="true" src={icon} data-locator={elementLocator(`icon ${text}`)} />
                <div aria-label={text} data-locator={elementLocator(text)}>{text}</div>
            </div>
        </>
    )
}

UnavailablePrice.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default UnavailablePrice;