// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from "react";
import PropTypes from "prop-types";
import Stock from "./views/stock";
import Price from "./views/price";
import AddToCart from "./views/addToCart";
import AddToCartBody from '../sku-details/views/addToCartModal';
import Modal, { Header, keys } from '../utils/modal';
import LoginStatus from "../scripts/loginStatus";
import CheckOutStatus from "../scripts/checkOutStatus";
import SkuMessage from "../sku-message";
import Ecommerce from "../scripts/ecommerce";
import { mainCartContext } from "../analytics";
import { getAvailability, getPricing, matchListItems } from "./services/index";
import SignIn from '../scripts/signIn';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: {
                ...this.props.config.modalInfo,
                textHeading: this.props.skuNumber,
                text: this.props.titleText,
                partNumberLabel: this.props.config.skuInfo.partNumberLabel
            },
            code: this.props.skuNumber,
            skuInfo: this.props.config.skuInfo,
            skuNumber: this.props.skuNumber,
            userCountry: this.props.config.countryCode,
            userLocale: this.props.config.locale,
            availabilityUrl: this.props.config.availabilityUrl,
            pricingUrl: this.props.config.pricingUrl,
            addToCartUrl: this.props.config.addToCartUrl,
            skuAvailability: {},
            addToCartQty: undefined,
            listPrice: this.props.price,
            analyticsConfig: {
                context: mainCartContext,
                name: this.props.titleText,
                price: this.props.price,
                sku: this.props.skuNumber,
            },
            errorObjCart: {},
            errorObjAvailability: {},
            errorObjPrice: {},
            discontinued: this.props.discontinued == "true",
            signInUrl: this.props.baseSignInUrl,
            skuData: [{
                code: this.props.skuNumber
            }]
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        if (LoginStatus.state()) {
            getPricing(this.state.pricingUrl, this.state.skuData)
            .then(response => {
                let match = matchListItems(this.state.skuData, response);
                this.setState({
                    skuData: match,
                    custPrice: match[0].custPrice
                }, () => {
                    //this.checkAvailabilityAnalytics();
                });
            })
            .catch(err => {
                // Add Error Object to State
                this.setState({ errorObjPrice: err });
            });
        } else {
            this.setState({
                skuData: [{
                    code: this.props.skuNumber,
                    custPrice: undefined
                }]
            })
        }

        getAvailability(this.state.availabilityUrl, this.state.userCountry, this.state.skuNumber)
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
            this.setState({ errorObjAvailability: err });
        });
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown });
    };

    toggleErrorModal = err => {
        // Add Error Object to State
        this.setState({ errorObjCart: err });
        this.setState({ modalShown: !this.state.modalShown })
    };

    // If product is not sold in that country
    renderCountryRestricted = () => {
        return (
            <SkuMessage
                icon={this.state.skuInfo.lowStockIcon}
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
            />
        );
    }

    renderPricing = () => {
        const { custPrice, listPrice, skuInfo } = this.state;

        if (LoginStatus.state()){
            if (typeof custPrice !== 'undefined') {
                return (
                    <div className="cmp-sku-details__priceinfo">
                        <Price
                            label={skuInfo.custPriceLabel}
                            price={custPrice}
                        />
                    </div>
                )
            } else if (typeof custPrice === 'undefined') {
                return (
                    <div className="cmp-sku-details__priceinfo">
                        <Price
                            label={skuInfo.listPriceLabel}
                            price={listPrice}
                        />
                    </div>
                )
            }
        } else {
            if (typeof listPrice !== 'undefined') {
                return (
                    <div className="cmp-sku-details__priceinfo">
                        <Price
                            label={skuInfo.listPriceLabel}
                            price={listPrice}
                        />
                    </div>
                )
            }
        }
    }

    renderBuyInfo = () => {
        const { custPrice, listPrice, skuInfo, skuNumber, errorObjAvailability, skuAvailability } = this.state;
        const { config } = this.props;

        return (
            <div className="cmp-sku-details__buyinfo">
                {LoginStatus.state() && typeof custPrice !== 'undefined'
                    && custPrice !== listPrice && (
                        <div className="cmp-sku-details__list-price">
                            {`${skuInfo.listPriceLabel} ${listPrice}`}
                        </div>
                )}
                {this.renderPricing()}

                <div className="cmp-sku-details__availability">
                    <Stock
                        skuInfo={skuInfo}
                        skuNumber={skuNumber}
                        skuAvailability={skuAvailability}
                        skuType="details"
                        errorObj={errorObjAvailability}
                    />
                </div>
                <div className="cmp-sku-details__buttons">
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={skuNumber}
                        addToCartLabel={config.addToCartLabel}
                        addToCartUrl={config.addToCartUrl}
                        isCommerceApiMigrated={config.isCommerceApiMigrated}
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
                    ></AddToCart>
                </div>
                <Modal isOpen={this.state.modalShown} onClose={this.toggleModal} className='cmp-add-to-cart-modal'>
                        <Header
                            title={this.state.modalConfig.title}
                            icon={this.state.modalConfig.icon}
                            className={keys.HeaderWithAddedMarginTop}
                        />
                        <AddToCartBody
                            config={this.state.modalConfig}
                            errorObjCart={this.state.errorObjCart}
                        ></AddToCartBody>
                </Modal>
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
                return <>
                        {!LoginStatus.state() && (<SignIn
                                signInUrl={this.props.config.baseSignInUrl}
                                signInIcon={this.state.skuInfo.signinIcon}
                                signInText1={this.state.skuInfo.signInText1}
                                signInText2={this.state.skuInfo.signInText2}
                                signInText3={this.state.skuInfo.signInText3}
                            />)}
                        {this.renderBuyInfo()}
                    </>;
            } else {
                return this.renderEcommercePartialDisabled();
            }
        }
    };

    render() {
        if(!this.state.listPrice){
            return this.renderCountryRestricted();
        } else if (this.state.discontinued) {
            return this.renderDiscontinued();
        } else {
            return this.renderActiveSku();
        }
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
    countryRestricted: PropTypes.bool,
    skuNumber: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    discontinued: PropTypes.bool,
    replacementSkuCode: PropTypes.string,
    replacementSkuHref: PropTypes.string
};

SkuDetails.defaultProps = {
    config: {},
    price: '',
    countryRestricted: false,
    skuNumber: '',
    titleText: '',
    discontinued: false,
    replacementSkuCode: '',
    replacementSkuHref: ''
}

export default SkuDetails;
