import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
// import PropTypes from 'prop-types';
// import { Modal } from '../modal/index';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cmp-sku-details__priceinfo">
                <span>{this.props.skuConfig.listPriceLabel}</span>
                <div className="cmp-sku-details__price">{this.props.skuConfig.formattedPrice}</div>
            </div>
        )
    }

}

export default Price;