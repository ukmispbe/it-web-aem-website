import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
const Stock = React.lazy(() => import(/* webpackChunkName: "skudetails" */'../../sku-details/views/stock'));
const Price = React.lazy(() => import(/* webpackChunkName: "skudetails" */'../../sku-details/views/price'));
const UnavailablePrice = React.lazy(() => import(/* webpackChunkName: "skudetails" */'../../sku-details/views/unavailablePrice'));
import { getAvailability, getPricing, matchListItems } from '../../sku-details/services';
const AddToCart = React.lazy(() => import(/* webpackChunkName: "skudetails" */'../../sku-details/views/addToCart'));
const AddToCartBody = React.lazy(() => import(/* webpackChunkName: "skudetails" */'../../sku-details/views/addToCartModal'));
import Modal, { Header, keys } from '../../utils/modal';
import Spinner from '../../utils/spinner';
import LoginStatus from '../../scripts/loginStatus';
import SkuMessage from '../../sku-message';
import CheckOutStatus from '../../scripts/checkOutStatus';
import Ecommerce from '../../scripts/ecommerce';
import SkuDetails from '../../scripts/sku-details';
import Sticky from '../../scripts/stickyService';
import Analytics, { analyticTypes, searchCartContext, relatedCartContext } from '../../analytics';
import { isEprocurementUser } from '../../utils/userFunctions';
import { getHttpStatusFromErrors } from '../../utils/eCommerceFunctions';
import {
    BAD_REQUEST_CODE,
    SERVER_ERROR_CODE,
    UNAVAILABLE_PRICE_WITH_ADD_TO_CART,
    NO_PRICE_NO_ADD_TO_CART,
} from '../../constants';

class SkuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: {
                ...this.props.config.modalInfo,
                textHeading: this.props.currentSku.code,
                text: this.props.currentSku.title,
                partNumberLabel: this.props.config.skuInfo.partNumberLabel
            },
            errorConfig: {
                ...this.props.config.errorInfo,
                textHeading: this.props.currentSku.code,
                text: this.props.currentSku.title,
                partNumberLabel: this.props.config.skuInfo.partNumberLabel
            },
            listPrice:undefined,
            custPrice: undefined,
            skuInfo: this.props.config.skuInfo,
            skuNumber: this.props.currentSku.code,
            userInfo: this.props.userInfo,
            userCountry: this.props.config.countryCode,
            availabilityUrl: this.props.config.availabilityUrl,
            pricingUrl: this.props.config.pricingUrl,
            addToCartUrl: this.props.config.addToCartUrl,
            loading: true,
            skuAvailability: {},
            skuData: this.props.currentSku,
            analyticsConfig: {
                context: (SkuDetails.exists() || SkuDetails.skuListExists()) ? relatedCartContext : searchCartContext,
                name: this.props.currentSku.title,
                price: this.props.currentSku.formattedPrice,
                custPrice: '',
                sku: this.props.currentSku.code,
            },
            errorObjCart: {},
            errorObjAvailability: {},
            errorPriceType: ''
        };
    }

    componentDidMount() {
        const { pricingUrl, skuNumber, userInfo } = this.state;

        if (Object.keys(userInfo).length > 0 && userInfo.callCustApi) {
            this.getCustPricing(pricingUrl, skuNumber, userInfo);
        } else {
            this.setState({loading: false});
        }
    }

    //Note: getCustPricing Method should be an exact match between SKU Details and SKU List
    getCustPricing = (pricingUrl, skuNumber, userInfo) => {
        getPricing(pricingUrl, skuNumber, userInfo, "DEFAULT")
            .then(response => {
                if (response.status && response.status === 200) {
                    let match = matchListItems(skuNumber, response);
                    this.setState({
                        skuData: match,
                        custPrice: match.custPrice,
                        listPrice: match.listPrice,
                        loading: false,
                        analyticsConfig: {
                            price: match.listPrice,
                            custPrice: match.custPrice,
                            ...this.state.analyticsConfig
                        },
                    }, () => {
                        //this.checkPricingAnalytics();
                    });
                } else {
                    // Add Error Object to State
                    this.setState({
                        errorPriceType: [BAD_REQUEST_CODE, SERVER_ERROR_CODE].includes(getHttpStatusFromErrors(response.errors, response.status)) ?
                            UNAVAILABLE_PRICE_WITH_ADD_TO_CART : NO_PRICE_NO_ADD_TO_CART,
                        loading: false
                    });
                }
            })
            .catch(err => {
                // Add Error Object to State
                this.setState({
                    errorPriceType: NO_PRICE_NO_ADD_TO_CART,
                    loading: false
                });
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        const differentUserInfo = this.props.userInfo !== nextProps.userInfo;
        const differentSalesOrg = this.props.userInfo.salesOrg !== nextProps.userInfo.salesOrg;
        return differentUserInfo || differentSalesOrg;
    }

    toggleErrorModal = (err) => {
        // Add Error Object to State
        this.setState({ errorObjCart: err });
        this.setState({ modalShown: !this.state.modalShown })
    };

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => {

            if (SkuDetails.exists()) {
                if (!this.state.modalShown) {
                    //Firefox bug -->
                    //if on a sku page and the modal was just open, make call to check whether to stick again
                    //this will unstick the current element if necessary
                    const SKUDetailsSticky = Sticky.findStickyEl(SkuDetails.element);
                    if (SKUDetailsSticky) {
                        Sticky.conditionsToStick(SKUDetailsSticky);
                    }
                }
            }
        });
    };

    checkAvailability = skuNumber => {
        getAvailability(this.state.availabilityUrl, this.state.userCountry, skuNumber)
            .then(response => {
                this.setState({
                    skuAvailability: response,
                    analyticsConfig: {
                        ...this.state.analyticsConfig,
                        ...response
                    }
                }, () => {
                    this.checkAvailabilityAnalytics();
                });
            })
            .catch(err => {
                // Add Error Object to State
                this.setState({ errorObjAvailability: err });
            });
    };

    checkAvailabilityAnalytics = () => {
        const availabilityModel = {
            name: this.state.analyticsConfig.name,
            price: this.state.analyticsConfig.price,
            sku: this.state.analyticsConfig.sku
        };

        if (this.state.analyticsConfig.hasOwnProperty('availableDate')) {
            availabilityModel.stockDate = this.state.analyticsConfig.availableDate;
        }

        if (this.state.analyticsConfig.hasOwnProperty('availableQuantity')) {
            availabilityModel.stockQuantity = this.state.analyticsConfig.availableQuantity.toString();
        }
        if (this.state.analyticsConfig.hasOwnProperty('productStatus')) {
            availabilityModel.stockMessage = this.state.analyticsConfig.productStatus;
        }

        Analytics.setAnalytics(analyticTypes.stock.name, availabilityModel);
    }

    handleItemClick = () => {
        if (this.props.onItemClick) {
            this.props.onItemClick();
        }
    };

    renderPricing = () => {
        const { custPrice, listPrice, skuInfo, errorPriceType } = this.state;
        let price = listPrice;
        let label = skuInfo.listPriceLabel;
        let isListPrice = false;

            if (LoginStatus.state()) {
                price = typeof custPrice !== 'undefined' ? custPrice : listPrice;
                label = skuInfo.custPriceLabel;
                isListPrice = true;
            } 

            if (errorPriceType !== '' || typeof price === 'undefined') {
                return (
                    <UnavailablePrice
                        label={label}
                        icon={skuInfo.lowStockIcon}
                        text={skuInfo.unavailablePriceLabel}
                    />);
            } else {
                return (
                    <Price
                        label={label}
                        price={price}
                        isListPrice={isListPrice}
                    />);
            }
    }

    renderBuyInfoPartial = () => {
        const {
            custPrice, listPrice, loading, skuInfo, skuAvailability,
            errorConfig, modalConfig,
            errorObjCart, errorObjAvailability
        } = this.state;
        const { currentSku, config } = this.props;
        const isErrorModal = (Object.keys(errorObjCart).length !== 0);
        return (
            <div className="cmp-sku-details__buyinfo">
                {LoginStatus.state() && typeof custPrice !== 'undefined'
                    && custPrice !== listPrice && (
                        <div className="cmp-sku-list__list-price" data-locator="list-price-label" aria-label={`${skuInfo.listPriceLabel} ${listPrice}`}>
                            {`${skuInfo.listPriceLabel} ${listPrice}`}
                        </div>
                    )}
                <div className="cmp-sku-list__priceinfo">
                    {loading ? (<Spinner loading={loading} type='inline' />) : this.renderPricing()}
                </div>
                <div
                    className="cmp-sku-details__availability"
                    onClick={e =>
                        this.checkAvailability(currentSku.code)
                    }
                >
                    {(skuAvailability.productStatus ||
                        (this.state && errorObjAvailability && errorObjAvailability.ok === false))
                        && (
                            <Stock
                                skuInfo={skuInfo}
                                skuNumber={currentSku.code}
                                skuAvailability={skuAvailability}
                                skuType="details"
                                errorObj={errorObjAvailability}
                            />
                        )}
                    {(!skuAvailability.productStatus &&
                        !(this.state && errorObjAvailability && errorObjAvailability.ok === false))
                        && (
                            <span className="cmp-sku-list__checkavailability">
                                {config.skuInfo.seeAvailabilityLabel}
                                <ReactSVG
                                    alt={config.skuInfo.seeAvailabilityLabel}
                                    src={config.skuInfo.refreshIcon}
                                    data-locator="check-availability"
                                />
                            </span>
                        )}
                </div>
                <div className="cmp-sku-list__buttons">
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={currentSku.code}
                        addToCartLabel={config.addToCartLabel}
                        addToCartQty={config.defaultSkuQty}
                        addToCartUrl={config.addToCartUrl}
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
                        qtyLabel={config.qtyAriaLabel}
                    />
                    <Modal isOpen={this.state.modalShown} onClose={this.toggleModal} className='cmp-add-to-cart-modal'>
                        {!isErrorModal && (
                            <Header
                                title={modalConfig.title}
                                icon={modalConfig.icon}
                                className={keys.HeaderWithAddedMarginTop}
                            />
                        )}

                        {isErrorModal && (
                            <Header
                                title={errorConfig.title}
                                icon={errorConfig.icon}
                                className={keys.HeaderWithAddedMarginTopError}
                            />
                        )}
                        <AddToCartBody
                            config={modalConfig}
                            errorObjCart={errorObjCart}
                        ></AddToCartBody>
                    </Modal>
                </div>
            </div>
        );
    }

    renderBuyInfoCommerceView = () => {
        if (Ecommerce.isDisabledState()) {
            return (null);
        } else {
            if ((Ecommerce.isPartialState() && LoginStatus.state()) && CheckOutStatus.state() ||
                (!Ecommerce.isPartialState() && !Ecommerce.isDisabledState())
            ) {
                return (
                    <>
                        {this.renderBuyInfoPartial()}
                    </>
                );
            } else {
                return (null);
            }
        }
    }

    renderBuyInfo = () => {
        if (this.props.isEProcurementUserRestricted) {
            return (null);
        }

        const buyInfoCommerceView = this.renderBuyInfoCommerceView();
        const { currentSku, config } = this.props;

        if (currentSku.discontinued) {
            let discontinuedMessage = config.skuInfo.discontinuedWithReplacementWithCode;
            if (!currentSku.replacementskucode || !currentSku.replacementskuurl) {
                discontinuedMessage = config.skuInfo.discontinuedNoReplacementCode
            }

            return (
                <SkuMessage
                    icon={config.skuInfo.lowStockIcon}
                    message={discontinuedMessage}
                    link={currentSku.replacementskuurl}
                    linkMessage={currentSku.replacementskucode}
                />
            );
        } else if (this.state.errorPriceType === NO_PRICE_NO_ADD_TO_CART) {
            return (
                <SkuMessage
                    icon={config.skuInfo.lowStockIcon}
                    message={config.skuInfo.skuErrorMessage}
                />
            );
        } else {
            return buyInfoCommerceView;
        }
    };

    renderBreadcrumb = () => {
        const { currentSku, config } = this.props;
        if (config.showBreadcrumbs) {
            return (
                <div className="cmp-search__results-item-breadcrumb skuitem" data-locator="search-results-breadcrumb">
                    <div aria-label={currentSku.category_facet}>{currentSku.category_facet}</div>
                    <ReactSVG src={config.skuInfo.nextIcon} aria-hidden="true" />
                    <div aria-label={currentSku.contenttype_facet}>{currentSku.contenttype_facet}</div>
                </div>
            );
        }

        return <></>;
    };

    isDisabled = () => {
        if (Ecommerce.isPartialState()) {
            let conditions = LoginStatus.state() && CheckOutStatus.state();
            return !conditions;
        } else {
            return Ecommerce.isDisabledState();
        }
    };

    render() {
        const { currentSku, config } = this.props;
        const buyInfo = this.renderBuyInfo();
        const breadcrumbs = this.renderBreadcrumb();
        const disabledClass = this.isDisabled() ? 'disabled' : '';
        if (!currentSku.primaryImageThumbnail || currentSku.primaryImageThumbnail === "") {
            currentSku.primaryImageThumbnail = config.skuInfo.noThumbnailImage
        }
        return (
            <li key={currentSku.code}>
                <div className={'cmp-sku-list__container ' + disabledClass}>
                    <div className="cmp-sku-list__right">
                        <img
                            src={currentSku.primaryImageThumbnail}
                            alt={currentSku.title}
                            data-locator="product-image"
                        />
                    </div>
                    <div className="cmp-sku-details__left">
                        <div className="cmp-sku-list__code" data-locator="product-number" aria-label={config.skuInfo.partNumberLabel + " " + currentSku.code}>
                            {config.skuInfo.partNumberLabel + " " + currentSku.code}
                        </div>
                        <a
                            onClick={this.handleItemClick}
                            href={
                                currentSku.skuPageHref
                                    ? currentSku.skuPageHref
                                    : null
                            }
                        >
                            <div className="cmp-sku-details__title" data-locator="product-title">
                                {currentSku.title}
                            </div>
                        </a>

                        {buyInfo}
                        {breadcrumbs}
                    </div>
                </div>
            </li>
        );
    }
}

SkuItem.propTypes = {
    currentSku: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    baseSignInUrl: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    isEProcurementUserRestricted: PropTypes.bool.isRequired
};

SkuItem.defaultProps = {
    currentSku: {},
    config: {},
    baseSignInUrl: '',
    onItemClick: () => { },
    userInfo: {},
    isEProcurementUserRestricted: false
};

export default SkuItem;