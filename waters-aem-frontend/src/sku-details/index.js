// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';
import Stock from './views/stock';
import Price from './views/price';
import SkuService from './services';
import AddToCart from './views/addToCart';
import FeedbackSurvey from '../scripts/feedbackSurvey';
import LoginStatus from '../scripts/loginStatus';

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
            commerce: this.props.config.commerceConfig.currentState,
            locale: this.props.config.locale,
            modalInfo: {
                ...this.props.config.modalInfo,
                textHeading: this.props.skuNumber,
                text: this.props.titleText
            },
            errorObj: {}
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
            err => {
                // Add Error Object to State
                this.setState({ errorObj: err });
            }

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
        }).catch(err => {
            // Add Error Object to State
            this.setState({ errorObj: err });
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

    commerceView = (view) => { 
        if (view == 'DISABLED') {
            return (
                    <div className="cmp-sku-details__buyinfodisabled">
                        <ReactSVG
                            alt={this.props.config.commerceConfig.disabledLabel}
                            src={this.props.config.commerceConfig.disabledIcon}
                        />
                        <span className="cmp-sku-details__disabledmessage">
                            <span className="cmp-sku-details__disabledtitle">{this.props.config.commerceConfig.disabledText}</span>
                            <a href={this.props.config.commerceConfig.disabledHref}>{this.props.config.commerceConfig.disabledLinkText}</a>
                        </span>
                    </div>
            );
        } else { 
            return (
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
                                errorObj={this.state.errorObj}
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
            );
        }
     }

    render() {
        return (
            <>
                {this.commerceView(this.state.commerce)}
            </>
        );
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
};

export default SkuDetails;
