// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';
import Stock from './views/stock';
import Price from './views/price';
import SkuService from './services';
import AddToCart from './views/addToCart';
import FeedbackSurvey from '../scripts/feedbackSurvey';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: this.props.config.modalInfo,
            skuConfig: this.props.config.skuInfo,
            skuNumber: this.props.skuNumber,
            userCountry: this.props.config.countryCode,
            availabilityAPI: this.props.config.availabilityUrl,
            skuAvailability: {},
            addToCartQty: undefined,
            defaultPrice: this.props.price,
            locale: this.props.config.locale,
            modalInfo: {
                ...this.props.config.modalInfo,
                textHeading: this.props.skuNumber,
                text: this.props.titleText
            }
        };

        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.props.config.availabilityUrl,
                price: this.props.config.pricingUrl,
            },{
                addToCart: this.props.config.addToCartUrl,
                getCart: ''
            },
            err => console.log(err)
        );

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.request.getAvailability(this.state.skuNumber).then(response => {
            this.setState({
                skuAvailability: response,
                modalInfo: {
                    ...this.props.config.modalInfo,
                    textHeading: this.props.skuNumber,
                    text: this.props.titleText
                }
            });
        });
    }

    toggleModal = () => { 
        this.setState({ modalShown: !this.state.modalShown }, () => { 
            if (this.state.modalShown) {
                FeedbackSurvey.isDisplayed(false);
            } else { 
                FeedbackSurvey.isDisplayed(true);
            }
        })
    }

    render() {
        return (
            <>
                <div className="cmp-sku-details__buyinfo">
                    <div className="cmp-sku-details__priceinfo">
                        <Price
                            skuConfig={this.state.skuConfig}
                            price={this.state.defaultPrice}
                        />
                    </div>
                    <div className="cmp-sku-details__availability">
                        <Stock
                            skuConfig={this.state.skuConfig}
                            skuNumber={this.state.skuNumber}
                            skuAvailability={this.state.skuAvailability}
                            locale={this.state.locale}
                            skuType="details"
                        />
                    </div>
                    <div className="cmp-sku-details__buttons">
                        <AddToCart
                            toggleParentModal={this.toggleModal}
                            skuNumber={this.state.skuNumber}
                            addToCartLabel={this.props.config.addToCartLabel}
                            addToCartUrl={this.props.config.addToCartUrl}
                        ></AddToCart>
                    </div>
                    <Modal
                        toggleModal={this.toggleModal}
                        open={this.state.modalShown}
                        theme="callToAction"
                        config={this.state.modalInfo}
                    />
                </div>
                <a href="#" class="cmp-sku-details__quote">{this.props.config.skuInfo.requestQuote}</a>
            </>
        );
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
};

export default SkuDetails;
