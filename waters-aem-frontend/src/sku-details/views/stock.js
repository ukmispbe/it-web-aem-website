import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';

class Stock extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.skuAvailability.availableQuantity > 10) {
            return (
                <span>
                    <span className="cmp-sku-details__stockdetails">
                        {this.props.skuConfig.inStockLabel}
                        <ReactSVG
                            src={this.props.skuConfig.inStockIcon}
                            className="cmp-sku-details__stockdetails--instock"
                        />
                    </span>
                    <div className="cmp-sku-details__order">
                        {this.props.skuConfig.orderNowLabel}
                    </div>
                </span>
            );
        } else if (this.props.skuAvailability.availableQuantity > 0) {
            return (
                <span>
                    <span className="cmp-sku-details__stockdetails">
                        {this.props.skuConfig.onlyXInStockLabel.replace(
                            '{quantity}',
                            this.props.skuAvailability.availableQuantity
                        )}
                        <ReactSVG
                            src={this.props.skuConfig.lowStockIcon}
                            className="cmp-sku-details__stockdetails--outofstock"
                        />
                    </span>
                    <div className="cmp-sku-details__order">
                        {this.props.skuConfig.orderSoonLabel}
                    </div>
                </span>
            );
        } else {
            return (
                <span>
                    <span className="cmp-sku-details__stockdetails">
                        {this.props.skuConfig.outOfStockLabel}
                        <ReactSVG
                            src={this.props.skuConfig.outOfStockIcon}
                            className="cmp-sku-details__stockdetails--outofstock"
                        />
                    </span>
                    {this.props.skuAvailability.availableDate && (
                        <div className="cmp-sku-details__order">
                            {this.props.skuConfig.shipsByLabel.replace(
                                '{shipByDate}',
                                Utilities.dateFormatter(
                                    this.props.skuAvailability.availableDate,
                                    this.props.locale
                                )
                            )}
                        </div>
                    )}
                </span>
            );
        }
    }
}

export default Stock;
