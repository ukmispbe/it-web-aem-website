import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import { elementLocator } from '../../utils/eCommerceFunctions';

function UnavailablePrice(props) {
    const { label, icon, text } = props;
    return (
        <>
            <label className="cmp-sku-list__cust-price-label" data-locator="sku-price-label" aria-label={label}>{label}</label>
            <div className="cmp-sku-list__unavailable">
                <ReactSVG aria-hidden="true" src={icon} data-locator={elementLocator(`icon ${text}`)} />
                <span aria-label={text} data-locator={elementLocator(text)}>{text}</span>
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