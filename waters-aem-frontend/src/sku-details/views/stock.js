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
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`} data-locator={`sku-${this.props.skuType}-stockdetails`}>
                    {
                        ErrorMessages.ErrorMessages(this.props.errorObj)
                            .serviceUnavailable
                    }
                    <ReactSVG
                        src={this.props.skuInfo.lowStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--outofstock`}
                        data-locator={`sku-${this.props.skuType}-stockdetails-outofstock`}
                    />
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`} data-locator={`sku-${this.props.skuType}-order`}>
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
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`} data-locator={`sku-${this.props.skuType}-stockdetails`}>
                    {this.props.skuInfo.inStockLabel}
                    <ReactSVG
                        src={this.props.skuInfo.inStockIcon}
                        className={`cmp-sku-${this.props.skuType}__stockdetails--instock`}
                        data-locator={`sku-${this.props.skuType}-stockdetails-instock`}
                    />
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`} data-locator={`sku-${this.props.skuType}-order`}>
                    {this.props.skuInfo.orderNowLabel}
                </div>
            </span>
        );
    }

    renderContactWaters() {
        return (
            <span>
                <span className={`cmp-sku-${this.props.skuType}__stockdetails`} data-locator={`sku-${this.props.skuType}-stockdetails`}>
                    {this.props.skuInfo.contactWatersLabel}
                </span>
                <div className={`cmp-sku-${this.props.skuType}__order`} data-locator={`sku-${this.props.skuType}-order`}>
                    {this.props.skuInfo.contactWatersInfoLabel}
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
            if (this.props.errorObj.status === 500) {
                return this.renderContactWaters();
            }
            else {
                return this.renderStockError();
            }          
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
