import React from 'react';
import ReactSVG from 'react-svg';
// import PropTypes from 'prop-types';
// import { Modal } from '../modal/index';

class Stock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.skuAvailability.availableQuantity > 10) {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            In stock
                            <ReactSVG src={this.props.skuConfig.inStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Order now</div>
                </div>
            );
        } else if (this.props.skuAvailability.availableQuantity > 0) {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            Only {this.props.skuAvailability.availableQuantity} in stock
                            <ReactSVG src={this.props.skuConfig.lowStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Order soon</div>
                </div>
            );
        } else {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            Out of stock
                            <ReactSVG src={this.props.skuConfig.outOfStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Ships by {this.props.skuAvailability.availableDate}</div>
                </div>
            );
        }
    }

}

export default Stock;