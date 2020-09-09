// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from "react";
import PropTypes from "prop-types";
import Stock from "./views/stock";
import Price from "./views/price";
import AddToCart from "./views/addToCart";
import AddToCartBody from '../sku-details/views/addToCartModal';
import Modal, { Header, keys } from '../utils/modal';
import { callCustomerPriceApi, isEprocurementUser as isEprocurementApp, isEprocurementUserRole } from '../utils/userFunctions';
import Spinner from '../utils/spinner';
import LoginStatus from "../scripts/loginStatus";
import CheckOutStatus from "../scripts/checkOutStatus";
import SkuMessage from "../sku-message";
import Ecommerce from "../scripts/ecommerce";
import { mainCartContext } from "../analytics";
import { getAvailability, getPricing, matchListItems } from "./services/index";
import SignIn from '../scripts/signIn';
import { E_ERRORCODE } from '../constants';

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
            userInfo: {},
            userCountry: this.props.config.countryCode,
            userLocale: this.props.config.locale,
            availabilityUrl: this.props.config.availabilityUrl,
            pricingUrl: this.props.config.pricingUrl,
            addToCartUrl: this.props.config.addToCartUrl,
            loading: true,
            skuAvailability: {},
            addToCartQty: undefined,
            custPrice: undefined,
            custPriceApiDisabled: this.props.config.isCustomerPriceApiDisabled,
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
            errorInfo: this.props.config.errorInfo,
            isEProcurementUserRestricted: (!isEprocurementApp() && isEprocurementUserRole()),
            isSkuErrorCode: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        const { availabilityUrl, custPriceApiDisabled, pricingUrl, skuNumber, userCountry } = this.state;

        if (LoginStatus.state()) {
            let userInfo = callCustomerPriceApi(custPriceApiDisabled);
            if (Object.keys(userInfo).length > 0 && userInfo.callCustApi){
                this.setState({
                    userInfo: userInfo
                }, () => {
                    this.getCustPricing(pricingUrl, skuNumber, userInfo, this.props.price);
                });
            } else {
                this.setState({ loading: false });
            }
        } else {
            this.setState({ loading: false });
        }

        getAvailability(availabilityUrl, userCountry, skuNumber)
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

//Note: getCustPricing Method should be an exact match between SKU Details and SKU List
    getCustPricing = (pricingUrl, skuNumber, userInfo, propListPrice) => {
        getPricing(pricingUrl, skuNumber, userInfo.dynamicSoldTo, userInfo.salesOrg)
        .then(response => {
            if (response.status && response.status === 200) {
                let match = matchListItems(skuNumber, response);
                let listPriceValue = (match.listPrice !== '' && match.listPrice != undefined) ? match.listPrice : propListPrice;
                this.setState({
                    skuData: match,
                    custPrice: match.custPrice,
                    listPrice: listPriceValue,
                    loading: false
                }, () => {
                    //this.checkPricingAnalytics();
                });
            } else {
                // Add Error Object to State
                this.setState({
                    errorObjPrice: response.errors,
                    loading: false,
                    isSkuErrorCode: (Array.isArray(response.errors) && response.errors.length > 0 && response.errors[0].code === E_ERRORCODE)
                });
            }
        })
        .catch(err => {
            // Add Error Object to State
            this.setState({
                errorObjPrice: err,
                loading: false
            });
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
            let price = typeof custPrice !== 'undefined' ? custPrice : listPrice;
            return (
                <Price
                    label={skuInfo.custPriceLabel}
                    price={price}
                    isListPrice={false}
                />
            )
        } else {
            if (typeof listPrice !== 'undefined') {
                return (
                    <Price
                        label={skuInfo.listPriceLabel}
                        price={listPrice}
                        isListPrice={true}
                    />
                )
            }
        }
    }

    renderBuyInfo = () => {
        const { custPrice, listPrice, loading, skuInfo, skuNumber,
                errorObjAvailability, skuAvailability, errorObjCart } = this.state;
        const { config } = this.props;
        let isErrorModal = false;
        if (errorObjCart) {
            isErrorModal = (Object.keys(errorObjCart).length !== 0);
        }
        return (
            <div className="cmp-sku-details__buyinfo" data-locator="sku-details-buyinfo">
                {LoginStatus.state() && typeof custPrice !== 'undefined'
                    && custPrice !== listPrice && (
                        <div className="cmp-sku-details__list-price">
                            {`${skuInfo.listPriceLabel} ${listPrice}`}
                        </div>
                )}
                <div className="cmp-sku-details__priceinfo" data-locator="sku-details-priceinfo">
                    {loading ? ( <Spinner loading={loading} type='inline' /> ) : this.renderPricing()}
                </div>
                <div className="cmp-sku-details__availability" data-locator="sku-details-availability">
                    <Stock
                        skuInfo={skuInfo}
                        skuNumber={skuNumber}
                        skuAvailability={skuAvailability}
                        skuType="details"
                        errorObj={errorObjAvailability}
                    />
                </div>
                <div className="cmp-sku-details__buttons" data-locator="sku-details-add-to-cart-sec">
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={skuNumber}
                        addToCartLabel={config.addToCartLabel}
                        addToCartQty={config.defaultSkuQty}
                        addToCartUrl={config.addToCartUrl}
                        isCommerceApiMigrated={config.isCommerceApiMigrated}
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
                    ></AddToCart>
                </div>
                <Modal isOpen={this.state.modalShown} onClose={this.toggleModal} className='cmp-add-to-cart-modal'>
                    {!isErrorModal && (
                        <Header
                            title={this.state.modalConfig.title}
                            icon={this.state.modalConfig.icon}
                            className={keys.HeaderWithAddedMarginTop}
                            elementLocator="add-to-cart-modal-header"
                        />
                    )}
                    {isErrorModal && (
                        <Header
                            title={this.state.errorInfo.title}
                            icon={this.state.errorInfo.icon}
                            className={keys.HeaderWithAddedMarginTopError}
                            elementLocator="add-to-cart-modal-header"
                        />
                    )}
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
                            />)
                            || LoginStatus.state() && (<div className="cmp-sku-signin-wrapper-not-displayed"></div>)}
                        {this.renderBuyInfo()}
                    </>;
            } else {
                return this.renderEcommercePartialDisabled();
            }
        }
    };

    renderEProcurementUserRestricted = () => {
        return (
            <SkuMessage
                icon={this.props.config.commerceConfig.disabledIcon}
                message={this.props.config.commerceConfig.eProcurementRestrictedText}
            />
        )
    };

    renderSkuErrorMsg = () => (
        <SkuMessage
            icon={this.props.config.skuInfo.lowStockIcon}
            message={this.props.config.skuInfo.skuErrorMessage}
        />
    );

    render() {
        if (this.state.isEProcurementUserRestricted) {
            return this.renderEProcurementUserRestricted();
        } else if (!this.state.listPrice){
            return this.renderCountryRestricted();
        } else if (this.state.discontinued) {
            return this.renderDiscontinued();
        } else if(this.state.isSkuErrorCode) {
            return this.renderSkuErrorMsg();
        } else {
            return this.renderActiveSku();
        }
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired,
    countryRestricted: PropTypes.string,
    skuNumber: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    discontinued: PropTypes.bool,
    replacementSkuCode: PropTypes.string,
    replacementSkuHref: PropTypes.string
};

SkuDetails.defaultProps = {
    config: {},
    price: '',
    countryRestricted: '',
    skuNumber: '',
    titleText: '',
    discontinued: false,
    replacementSkuCode: '',
    replacementSkuHref: ''
}

export default SkuDetails;
