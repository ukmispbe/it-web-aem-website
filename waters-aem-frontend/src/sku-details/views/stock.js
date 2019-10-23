import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
import ErrorMessages from '../../scripts/ErrorMessages';

class Stock extends React.Component {
    constructor(props) {
        super(props);
    }

    renderStockError() {
        return (
            <span>
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`}>
                    {
                        ErrorMessages.ErrorMessages(this.props.errorObj)
                            .serviceUnavailable
                    }
                    <ReactSVG
                        src={this.props.skuConfig.lowStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--outofstock`}
                    />
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`}>
                    {
                        ErrorMessages.ErrorMessages(this.props.errorObj)
                            .tryAgainLater
                    }
                </div>
            </span>
        );
    }

    renderInStock() {
        return (
            <span>
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`}>
                    {this.props.skuConfig.inStockLabel}
                    <ReactSVG
                        src={this.props.skuConfig.inStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--instock`}
                    />
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`}>
                    {this.props.skuConfig.orderNowLabel}
                </div>
            </span>
        );
    }

    renderLimitedStock() {
        return (
            <span>
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`}>
                    {this.props.skuConfig.onlyXInStockLabel.replace(
                        '{quantity}',
                        this.props.skuAvailability.availableQuantity
                    )}
                    <ReactSVG
                        src={this.props.skuConfig.lowStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--outofstock`}
                    />
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`}>
                    {this.props.skuConfig.orderSoonLabel}
                </div>
            </span>
        );
    }

    renderOutOfStock() {
        return (
            <span>
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`}>
                    {this.props.skuConfig.outOfStockLabel}
                    <ReactSVG
                        src={this.props.skuConfig.outOfStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--outofstock`}
                    />
                </span>
                {this.props.skuAvailability.availableDate && (
                    <div className={`cmp-sku-${this.props.skuType}__order`}>
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

    renderContactWaters() {
        return (
            <span>
              <span className={`cmp-sku-${this.props.skuType}__stockdetails`}>
                 {this.props.skuConfig.contactWatersLabel}
              </span>
              <div className={`cmp-sku-${this.props.skuType}__order`}>
                {this.props.skuConfig.contactWatersInfoLabel}
              </div>
           </span>
        );
    }


    render() {
        if (
            this.props &&
            this.props.errorObj &&
            this.props.errorObj.ok === false
        ) {
            return this.renderStockError();
        } else {
            if (this.props.skuAvailability.availableQuantity > 10) {
                return this.renderInStock();
            } else if (this.props.skuAvailability.availableQuantity > 0) {
                return this.renderLimitedStock();
            } else if (this.props.skuAvailability.availableQuantity === 0 && !this.props.skuAvailability.availableDate) {
                return this.renderContactWaters();
            } else if (Object.entries(this.props.skuAvailability).length === 0 && this.props.skuAvailability.constructor === Object && this.props.errorObj) {
                return this.renderStockError();
            } else {
                return this.renderOutOfStock();
            }
        }
    }
}

export default Stock;
