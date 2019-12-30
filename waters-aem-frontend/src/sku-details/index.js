// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import { Modal } from "../modal/index";
import Stock from "./views/stock";
import Price from "./views/price";
import SkuService from "./services";
import AddToCart from "./views/addToCart";
import FeedbackSurvey from "../scripts/feedbackSurvey";
import LoginStatus from "../scripts/loginStatus";
import CheckOutStatus from "../scripts/checkOutStatus";
import SkuMessage from "../sku-message";
import Ecommerce from "../scripts/ecommerce";
import { mainCartContext } from "../scripts/analytics";

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
            },
            analyticsConfig: {
                context: mainCartContext,
                name: this.props.titleText,
                price: this.props.price,
                sku: this.props.skuNumber,
            },
            errorObj: {},
            discontinued: this.props.discontinued == "true"
        };

        this.request = new SkuService(
            this.state.userCountry,
            {
                availability: this.props.config.availabilityUrl,
                price: this.props.config.pricingUrl
            },
            {
                addToCart: this.props.config.addToCartUrl,
                getCart: ""
            },
            err => {
                // Add Error Object to State
                this.setState({ errorObj: err });
            }
        );

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        this.request
            .getAvailability(this.state.skuNumber)
            .then(response => {
                this.setState({
                    skuAvailability: response,
                    modalInfo: {
                        ...this.props.config.modalInfo,
                        textHeading: this.props.skuNumber,
                        text: this.props.titleText
                    },
                    analyticsConfig: {
                        ...this.state.analyticsConfig,
                        ...response
                    }
                });
            })
            .catch(err => {
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
        });
    };

    toggleErrorModal = err => {
        // Add Error Object to State
        this.setState({ errorObj: err });
        this.setState({ modalShown: !this.state.modalShown });
    };

    // If product is not sold in that country
    renderCountryRestricted = () => {
        return (
            <SkuMessage
                icon={this.state.skuConfig.lowStockIcon}
                message={this.props.countryRestricted}
            />
        )
    }

    renderDiscontinued = () => {
        let discontinuedMessage = this.props.config.skuInfo
            .discontinuedWithReplacementWithCode;
        if (
            !this.props.replacementSkuCode ||
            !this.props.replacementSkuHref
        ) {
            discontinuedMessage = this.props.config.skuInfo
                .discontinuedNoReplacementCode;
        }
        return (
            <SkuMessage
                icon={this.props.config.skuInfo.lowStockIcon}
                message={discontinuedMessage}
                link={this.props.replacementSkuHref}
                linkMessage={this.props.replacementSkuCode}
            />
        );
    }

    renderEcommerceDisabled = () => {
        return (
            <SkuMessage
                icon={this.props.config.commerceConfig.disabledIcon}
                message={this.props.config.commerceConfig.disabledText}
                link={this.props.config.commerceConfig.disabledHref}
                linkMessage={
                    this.props.config.commerceConfig.disabledLinkText
                }
            />
        );
    }

    renderEcommercePartialDisabled = () => {
        return (
            <SkuMessage
                icon={this.props.config.commerceConfig.disabledIcon}
                message={
                    this.props.config.commerceConfig.partialDisabledText
                }
                link={
                    this.props.config.commerceConfig.partialDisabledHref
                }
                linkMessage={
                    this.props.config.commerceConfig
                        .partialDisabledLinkText
                }
                distMessage={this.state.skuConfig.distributorMessage}
            />
        );
    }

    renderBuyInfo = () => {
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
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
                    ></AddToCart>
                </div>
                <Modal
                    toggleModal={this.toggleModal}
                    open={this.state.modalShown}
                    theme="callToAction"
                    config={this.state.modalInfo}
                    errorObj={this.state.errorObj}
                    partNumberLabel={this.state.skuConfig.partNumberLabel}
                />
            </div>
        );
    };

    renderActiveSku = () => {
        if (Ecommerce.isDisabledState()) {
            return this.renderEcommerceDisabled();
        } else {
            if (
                (Ecommerce.isPartialState() &&
                    LoginStatus.state() &&
                    CheckOutStatus.state()) ||
                (!Ecommerce.isPartialState() && !Ecommerce.isDisabledState())
            ) {
                return <>{this.renderBuyInfo()}</>;
            } else {
                return this.renderEcommercePartialDisabled();
            }
        }
    };

    render() {
        if(!this.state.defaultPrice){
            return this.renderCountryRestricted();
        } else if (this.state.discontinued) {
            return this.renderDiscontinued();
        } else {
            return this.renderActiveSku();
        }
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired
};

export default SkuDetails;
