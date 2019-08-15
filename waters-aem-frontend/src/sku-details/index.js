// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';
import Stock from './views/stock';
import Price from './views/price';
import SkuService from './services';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: this.props.config.modalInfo,
            skuConfig: this.props.config.skuInfo,
            skuNumber: this.props.config.modalInfo.textHeading,
            userCountry: this.props.config.countryCode,
            availabilityAPI: this.props.config.availabilityUrl,
            skuAvailability: {},
            addToCartQty: undefined,
            defaultPrice: this.props.price
        };

        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.props.config.availabilityUrl,
                price: this.props.config.pricingUrl,
            },
            this.props.config.addToCartUrl,
            err => console.log(err)
        );
    }

    componentDidMount() {
        this.request.getAvailability(this.state.skuNumber).then(response => {
            this.setState({ skuAvailability: response });
        });
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => {
            if (this.state.modalShown) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    };

    quantityInput = e => {
        let value = e.target.value;

        if (value > this.state.skuConfig.maxAmount) {
            value = this.state.skuConfig.maxAmount;
        }

        this.setState({
            addToCartQty: value,
        });
    };

    addToCart = () => {
        if (this.state.addToCartQty > 0) {
            this.request
                .addToCart(this.state.skuNumber, this.state.addToCartQty)
                .then(response => {
                    this.toggleModal();
                })
                .catch(err => {
                    console.log('SHOULD WE HAVE AN ERROR MODAL?');
                    this.toggleModal();
                });
        } else {
            this.setState(
                {
                    addToCartQty: 1,
                },
                () =>
                    this.request
                        .addToCart(
                            this.state.skuNumber,
                            this.state.addToCartQty
                        )
                        .then(response => {
                            this.toggleModal();
                        })
                        .catch(err => {
                            console.log('SHOULD WE HAVE AN ERROR MODAL?');
                            this.toggleModal();
                        })
            );
        }
    };

    render() {
        return (
            <div className="cmp-sku-details__buyinfo">
                <div className="cmp-sku-details__priceinfo">
                    <Price 
                        skuConfig={this.state.skuConfig}
                        price={this.state.defaultPrice}/>
                </div>
                <div className="cmp-sku-details__availability">
                    <Stock
                            skuConfig={this.state.skuConfig}
                            skuNumber={this.state.skuNumber}
                            skuAvailability={this.state.skuAvailability}
                        />
                </div>
                <div className="cmp-sku-details__buttons">
                    <form>
                        <input
                            className="cmp-sku-details__quantity"
                            type="number"
                            placeholder={this.props.config.qtyLabel}
                            max={this.state.skuConfig.maxAmount}
                            min="1"
                            value={this.state.addToCartQty}
                            onChange={this.quantityInput}
                        />
                    </form>
                    <a className="cmp-button" onClick={() => this.addToCart()}>
                        {this.props.config.addToCartLabel}
                    </a>
                </div>
                <Modal
                    toggleModal={this.toggleModal}
                    open={this.state.modalShown}
                    theme="callToAction"
                    config={this.state.modalConfig}
                />
            </div>
        );
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
};

export default SkuDetails;
