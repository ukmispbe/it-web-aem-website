import React from 'react';
import ReactSVG from 'react-svg';
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
            if (this.props.skuAvailability.availableQuantity > 0) {
                return this.renderInStock();
            } else {
                return this.renderContactWaters();
            }
        }
    }
}

export default Stock;
