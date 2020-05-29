import React from 'react';
import ReactSVG from 'react-svg';
import Stock from '../../sku-details/views/stock';
import Price from '../../sku-details/views/price';
import { getAvailability, getPricing } from '../../sku-details/services';
import AddToCart from '../../sku-details/views/addToCart';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import Modal, { Header, keys } from '../../utils/modal';
import GetIsocode from "../../utils/get-isocode";
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
            listPrice: this.props.relatedSku.formattedPrice,
            custPrice: '',
            skuInfo: this.props.skuConfig.skuInfo,
            customerNumber: '154488',
            userCountry: this.props.skuConfig.countryCode,
            userLocale: this.props.skuConfig.locale,
            userIsocode: GetIsocode.getIsocode(),
            availabilityUrl: this.props.skuConfig.availabilityUrl,
            pricingUrl: this.props.skuConfig.pricingUrl,
            addToCartUrl: this.props.skuConfig.addToCartUrl,
            skuAvailability: {},
            analyticsConfig: {
                context: SkuDetails.exists() ? relatedCartContext : searchCartContext,
                name: this.props.relatedSku.title,
                price: this.props.relatedSku.formattedPrice,
                custPrice: '',
                sku: this.props.relatedSku.code,
            },
            errorObjCart: {},
            errorObjAvailability: {},
            errorObjPrice: {},
        };
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

    checkPricing = skuNumber => {
        getPricing(this.state.pricingUrl, skuNumber, this.state.customerNumber, this.state.userIsocode)
        .then(response => {
            
        console.log("custPrice response", response);
        console.log("custPrice response.netPrice", response.netPrice);
            this.setState({
                custPrice: response.netPrice,
                analyticsConfig: {
                    ...this.state.analyticsConfig,
                    custPrice: response.netPrice
                }
            }, () => {
                    //this.checkAvailabilityAnalytics();
            });
        })
        .catch(err => {
            // Add Error Object to State
            this.setState({ errorObjPrice: err });
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

    renderListPrice = (custPrice) => {

    }

    renderBuyInfoPartial = () => {
        const { custPrice, listPrice, skuInfo, errorObjAvailability, skuAvailability } = this.state;
        const { relatedSku, skuConfig } = this.props;
        console.log("passed listPrice", listPrice);
        console.log("custPrice", custPrice);
        return (
            <div className="cmp-sku-details__buyinfo">
                {typeof listPrice !== 'undefined' && listPrice !== custPrice && (
                    <div className="cmp-sku-list__list-price">
                        {`${skuInfo.listPriceLabel} ${listPrice}`}
                    </div>
                )}
                <div className="cmp-sku-list__priceinfo">
                    <Price
                        skuInfo={skuInfo}
                        price={custPrice}
                    />
                </div>
                <div
                    className="cmp-sku-details__availability"
                    onClick={e =>
                        this.checkAvailability(
                            relatedSku.code
                        )
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
                            />
                        </span>
                    )}
                </div>
                <div className="cmp-sku-list__buttons">   
                    <AddToCart
                        toggleParentModal={this.toggleModal}
                        skuNumber={relatedSku.code}
                        addToCartLabel={skuConfig.addToCartLabel}
                        addToCartUrl={skuConfig.addToCartUrl}
                        isCommerceApiMigrated={skuConfig.isCommerceApiMigrated}
                        toggleErrorModal={this.toggleErrorModal}
                        analyticsConfig={this.state.analyticsConfig}
                    />
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
                <div className="cmp-search__results-item-breadcrumb skuitem">
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

    componentDidMount() {
        this.checkPricing(this.props.relatedSku.code);
    }

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
                    />
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
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
                        <div className="cmp-sku-details__title">
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
export default ListItem;
