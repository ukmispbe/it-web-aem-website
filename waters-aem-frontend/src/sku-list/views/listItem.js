import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import { getAvailability, getPricing, matchListItems } from '../../sku-details/services';
import AddToCart from '../../sku-details/views/addToCart';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import Modal, { Header, keys } from '../../utils/modal';
import Spinner from '../../utils/spinner';
import LoginStatus from '../../scripts/loginStatus';
import SkuMessage from '../../sku-message';
import CheckOutStatus from '../../scripts/checkOutStatus';
import Ecommerce from '../../scripts/ecommerce';
import SkuDetails from '../../scripts/sku-details';
import Sticky from '../../scripts/stickyService';
import Analytics, { analyticTypes, searchCartContext, relatedCartContext } from '../../analytics';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShown: false,
            modalConfig: {
                ...this.props.skuConfig.modalInfo,
                textHeading: this.props.relatedSku.code,
                text: this.props.relatedSku.title,
                partNumberLabel: this.props.skuConfig.skuInfo.partNumberLabel
            },
            errorConfig: {
                ...this.props.skuConfig.errorInfo,
                textHeading: this.props.relatedSku.code,
                text: this.props.relatedSku.title,
                partNumberLabel: this.props.skuConfig.skuInfo.partNumberLabel
            },
            listPrice: this.props.relatedSku.formattedPrice,
            custPrice: undefined,
            skuInfo: this.props.skuConfig.skuInfo,
            skuNumber: this.props.relatedSku.code,
            userInfo: this.props.userInfo,
            userCountry: this.props.skuConfig.countryCode,
            availabilityUrl: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            loading: true,
            skuAvailability: {},
            skuData: this.props.relatedSku,
            analyticsConfig: {
                context: SkuDetails.exists() ? relatedCartContext : searchCartContext,
                name: this.props.relatedSku.title,
                price: this.props.relatedSku.formattedPrice,
                custPrice: '',
                sku: this.props.relatedSku.code,
            },
            errorObjCart: {},
            errorObjAvailability: {},
            errorObjPrice: {}
        };
    }

    componentDidMount() {
        const { pricingUrl, skuNumber, userInfo } = this.state;
        if (LoginStatus.state()) {
            if (Object.keys(userInfo).length > 0 && userInfo.callCustApi){
                this.getCustPricing(pricingUrl, skuNumber, userInfo, this.props.relatedSku.formattedPrice);
            } else {
                this.setState({ loading: false });
            }
        } else {
            this.setState({ loading: false });
        }
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
                    loading: false
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

    componentWillReceiveProps(nextProps) {
        const differentDynamicSoldToId = this.props.userInfo.dynamicSoldTo !== nextProps.userInfo.dynamicSoldTo;
        const differentSalesOrg = this.props.userInfo.salesOrg !== nextProps.userInfo.salesOrg;
        return differentDynamicSoldToId || differentSalesOrg;
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

    renderBuyInfoPartial = () => {
        const {
            custPrice, listPrice, loading, skuInfo, skuAvailability, 
            errorConfig, modalConfig,
            errorObjCart, errorObjAvailability
        } = this.state;
        const { relatedSku, skuConfig } = this.props;
        const isErrorModal = (Object.keys(errorObjCart).length !== 0);
        return (
            <div className="cmp-sku-details__buyinfo">
                {LoginStatus.state() && typeof custPrice !== 'undefined'
                    && custPrice !== listPrice && (
                    <div className="cmp-sku-list__list-price" data-locator="list-price-label">
                        {`${skuInfo.listPriceLabel} ${listPrice}`}
                    </div>
                )}
                <div className="cmp-sku-list__priceinfo">
                    {loading ? ( <Spinner loading={loading} type='inline' /> ) : this.renderPricing()}
                </div>
                <div
                    className="cmp-sku-details__availability"
                    onClick={e =>
                        this.checkAvailability(relatedSku.code)
                    }
                >
                    {(skuAvailability.productStatus ||
                    (this.state && errorObjAvailability && errorObjAvailability.ok === false))
                    && (
                        <Stock
                            skuInfo={skuInfo}
                            skuNumber={relatedSku.code}
                            skuAvailability={skuAvailability}
                            skuType="details"
                            errorObj={errorObjAvailability}
                        />
                    )}
                    {(!skuAvailability.productStatus &&
                    !(this.state && errorObjAvailability && errorObjAvailability.ok === false))
                    && (
                        <span className="cmp-sku-list__checkavailability">
                            {
                                skuConfig.skuInfo
                                    .seeAvailabilityLabel
                            }
                            <ReactSVG
                                alt={
                                    skuConfig.skuInfo
                                        .seeAvailabilityLabel
                                }
                                src={
                                    skuConfig.skuInfo
                                        .refreshIcon
                                }
                                data-locator="check-availability"
                            />
                        </span>
                    )}
                </div>
                <div className="cmp-sku-list__buttons">   
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={relatedSku.code}
                        addToCartLabel={skuConfig.addToCartLabel}
                        addToCartQty={skuConfig.defaultSkuQty}
                        addToCartUrl={skuConfig.addToCartUrl}
                        isCommerceApiMigrated={skuConfig.isCommerceApiMigrated}
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
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
        const { relatedSku, skuConfig } = this.props;

        if (relatedSku.discontinued) {
            let discontinuedMessage = skuConfig.skuInfo.discontinuedWithReplacementWithCode;
            if(!relatedSku.replacementskucode || !relatedSku.replacementskuurl){
                discontinuedMessage = skuConfig.skuInfo.discontinuedNoReplacementCode
            }

            return (
                <SkuMessage
                    icon={skuConfig.skuInfo.lowStockIcon}
                    message={discontinuedMessage}
                    link={relatedSku.replacementskuurl}
                    linkMessage={relatedSku.replacementskucode}
                />
            );
        } else {
            return buyInfoCommerceView;
        }
    };

    renderBreadcrumb = () => {
        const { relatedSku, skuConfig } = this.props;
        if (skuConfig.showBreadcrumbs) {
            return (
                <div className="cmp-search__results-item-breadcrumb skuitem" data-locator="search-results-breadcrumb">
                    <div>{relatedSku.category_facet}</div>
                    <ReactSVG src={skuConfig.skuInfo.nextIcon} />
                    <div>{relatedSku.contenttype_facet}</div>
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
        const { relatedSku, skuConfig } = this.props;
        const buyInfo = this.renderBuyInfo();
        const breadcrumbs = this.renderBreadcrumb();
        const disabledClass = this.isDisabled() ? 'disabled' : '';
        if (!relatedSku.primaryImageThumbnail || relatedSku.primaryImageThumbnail === "") {
            relatedSku.primaryImageThumbnail = skuConfig.skuInfo.noThumbnailImage
        }
        const imageAltLabel = relatedSku.primaryImageAlt ? relatedSku.primaryImageAlt : relatedSku.title;
        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                <img
                        src={relatedSku.primaryImageThumbnail}
                        alt={relatedSku.title}
                        data-locator="product-image"
                    />
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code" data-locator="product-number">
                        {skuConfig.skuInfo.partNumberLabel + " " + relatedSku.code}
                    </div>
                    <a
                        onClick={this.handleItemClick}
                        href={
                            relatedSku.skuPageHref
                                ? relatedSku.skuPageHref
                                : null
                        }
                    >
                        <div className="cmp-sku-details__title" data-locator="product-title">
                            {relatedSku.title}
                        </div>
                    </a>

                    {buyInfo}
                    {breadcrumbs}
                </div>
            </div>
        );
    }
}


ListItem.propTypes = {
    key: PropTypes.string.isRequired,
    relatedSku: PropTypes.object.isRequired,
    skuConfig: PropTypes.object.isRequired,
    baseSignInUrl: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    isEProcurementUserRestricted: PropTypes.bool.isRequired
};

ListItem.defaultProps = {
    key: '',
    relatedSku: {},
    skuConfig: {},
    baseSignInUrl: '',
    onItemClick: () => {},
    userInfo: {},
    isEProcurementUserRestricted: false
};

export default ListItem;