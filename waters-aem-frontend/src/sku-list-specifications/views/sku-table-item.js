import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import {
    getAvailability,
    getPricing,
    matchListItems,
} from '../../sku-details/services';
const AddToCart = React.lazy(() =>
    import(
        /* webpackChunkName: "skudetails" */ '../../sku-details/views/addToCart'
    )
);
const AddToCartBody = React.lazy(() =>
    import(
        /* webpackChunkName: "skudetails" */ '../../sku-details/views/addToCartModal'
    )
);
const Stock = React.lazy(() =>
    import(/* webpackChunkName: "skudetails" */ '../../sku-details/views/stock')
);
import Modal, { Header, keys } from '../../utils/modal';
import SkuDetails from '../../scripts/sku-details';
import { searchCartContext, relatedCartContext } from '../../analytics';
import LoginStatus from '../../scripts/loginStatus';
import { getHttpStatusFromErrors } from '../../utils/eCommerceFunctions';
import Spinner from '../../utils/spinner';
import SkuMessage from '../../sku-message';
import { elementLocator } from '../../utils/eCommerceFunctions';
import {
    BAD_REQUEST_CODE,
    SERVER_ERROR_CODE,
    UNAVAILABLE_PRICE_WITH_ADD_TO_CART,
    NO_PRICE_NO_ADD_TO_CART,
} from '../../constants';

class SkuTableItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listPrice: undefined,
            custPrice: undefined,
            skuInfo: this.props.config.skuInfo,
            skuNumber: this.props.skuData.skucode,
            userInfo: this.props.userInfo,
            userCountry: this.props.config.countryCode,
            availabilityUrl: this.props.config.availabilityUrl,
            pricingUrl: this.props.config.pricingUrl,
            addToCartUrl: this.props.config.addToCartUrl,
            errorPriceType: '',
            skuPriceData: this.props.skuData,
            priceLoading: true,
            skuAvailability: {},
            modalShown: false,
            modalConfig: {
                ...this.props.config.modalInfo,
                textHeading: this.props.skuData.skucode,
                text: this.props.skuData.title,
                partNumberLabel: this.props.config.skuInfo.partNumberLabel,
            },
            errorConfig: {
                ...this.props.config.errorInfo,
                textHeading: this.props.skuData.skucode,
                text: this.props.skuData.title,
                partNumberLabel: this.props.config.skuInfo.partNumberLabel,
            },
            analyticsConfig: {
                context:
                    SkuDetails.exists() || SkuDetails.skuListExists()
                        ? relatedCartContext
                        : searchCartContext,
                name: this.props.skuData.title,
                price: this.props.skuData.formattedPrice,
                custPrice: '',
                sku: this.props.skuData.skucode,
            },
            errorObjCart: {},
        };
    }

    componentDidMount() {
        const { pricingUrl, skuNumber, userInfo } = this.state;
        const { checkEcommCondition } = this.props;

        if (
            Object.keys(userInfo).length > 0 &&
            userInfo.callCustApi &&
            checkEcommCondition()
        ) {
            this.getCustPricing(pricingUrl, skuNumber, userInfo);
        } else {
            this.setState({ priceLoading: false });
        }
    }

    /* check availability API request and state update */
    checkAvailability = (skuNumber) => {
        getAvailability(
            this.state.availabilityUrl,
            this.state.userCountry,
            skuNumber
        )
            .then((response) => {
                this.setState({
                    skuAvailability: response,
                });
            })
            .catch((err) => {
                // Add Error Object to State
                this.setState({ errorObjAvailability: err });
            });
    };

    //Note: getCustPricing Method should be an exact match between SKU Details and SKU List
    getCustPricing = (pricingUrl, skuNumber, userInfo) => {
        getPricing(pricingUrl, skuNumber, userInfo, 'DEFAULT')
            .then((response) => {
                if (response.status && response.status === 200) {
                    let match = matchListItems(skuNumber, response);
                    this.setState(
                        {
                            skuPriceData: match,
                            custPrice: match.custPrice,
                            listPrice: match.listPrice,
                            priceLoading: false,
                        },
                        () => {
                            //this.checkPricingAnalytics();
                        }
                    );
                } else {
                    // Add Error Object to State
                    this.setState({
                        errorPriceType: [
                            BAD_REQUEST_CODE,
                            SERVER_ERROR_CODE,
                        ].includes(
                            getHttpStatusFromErrors(
                                response.errors,
                                response.status
                            )
                        )
                            ? UNAVAILABLE_PRICE_WITH_ADD_TO_CART
                            : NO_PRICE_NO_ADD_TO_CART,
                        priceLoading: false,
                    });
                }
            })
            .catch((err) => {
                // Add Error Object to State
                this.setState({
                    errorPriceType: NO_PRICE_NO_ADD_TO_CART,
                    priceLoading: false,
                });
            });
    };

    toggleErrorModal = (err) => {
        // Add Error Object to State
        this.setState({ errorObjCart: err });
        this.setState({ modalShown: !this.state.modalShown });
    };

    toggleModal = (e) => {
        e.preventDefault();
        this.setState({ modalShown: !this.state.modalShown }, () => {
            if (SkuDetails.exists()) {
                if (!this.state.modalShown) {
                    const SKUDetailsSticky = Sticky.findStickyEl(
                        SkuDetails.element
                    );
                    if (SKUDetailsSticky) {
                        Sticky.conditionsToStick(SKUDetailsSticky);
                    }
                }
            }
        });
    };

    addToCartBody = () => {
        const { skuData, config } = this.props;
        const { analyticsConfig } = this.state;
        return (
            <AddToCart
                toggleParentModal={this.toggleModal}
                skuNumber={skuData.skucode}
                addToCartLabel={config.addToCartLabel}
                addToCartQty={config.defaultSkuQty}
                addToCartUrl={config.addToCartUrl}
                toggleErrorModal={this.toggleErrorModal}
                analyticsConfig={analyticsConfig}
                qtyLabel={config.qtyAriaLabel}
            />
        );
    };

    addToCartModal = () => {
        const { modalConfig, errorConfig, errorObjCart } = this.state;
        const isErrorModal = Object.keys(errorObjCart).length !== 0;

        return (
            <Modal
                isOpen={this.state.modalShown}
                onClose={this.toggleModal}
                className="cmp-add-to-cart-modal"
            >
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
        );
    };

    renderBuyInfoPartial = () => {
        const { custPrice, listPrice } = this.state;
        return (
            <>
                {this.renderSkuAvailability()}
                {this.renderPricing()}
                {/* Placeholder for add to cart */}
                <span className="item col-lg col-lg-2">
                    <div className="cmp-sku-add-to-cart">
                        {this.addToCartBody()}
                        {this.addToCartModal()}
                    </div>
                </span>
            </>
        );
    };

    renderPricing = () => {
        const {
            custPrice,
            listPrice,
            skuInfo,
            errorPriceType,
            priceLoading,
        } = this.state;

        const price = custPrice || listPrice;

        if (errorPriceType !== '' || (!price && !priceLoading)) {
            return (
                <>
                    {/* Price Unavailable */}
                    <span className="item col-lg col-lg-2 cmp-sku-list-specs-item__unavailable">
                        <ReactSVG
                            aria-hidden="true"
                            src={skuInfo.lowStockIcon}
                            data-locator={elementLocator(
                                `icon ${skuInfo.unavailablePriceLabel}`
                            )}
                        />
                        <span
                            aria-label={skuInfo.unavailablePriceLabel}
                            data-locator={elementLocator(
                                skuInfo.unavailablePriceLabel
                            )}
                        >
                            {skuInfo.unavailablePriceLabel}
                        </span>
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <span
                        className={`item col-lg col-lg-1 small cmp-sku-list-specs-item__list-price ${
                            LoginStatus.state() &&
                            custPrice &&
                            custPrice !== listPrice
                                ? 'strike'
                                : ''
                        }`}
                    >
                        {priceLoading ? (
                            <Spinner
                                loading={priceLoading}
                                type="custom-inline"
                                size="22"
                            />
                        ) : (
                            listPrice
                        )}
                    </span>
                    {/* SKU Customer Price */}
                    {LoginStatus.state() && (
                        <span className="item col-lg col-lg-1 cmp-sku-list-specs-item__customer-price">
                            {priceLoading ? (
                                <Spinner
                                    loading={priceLoading}
                                    type="custom-inline"
                                    size="22"
                                />
                            ) : (
                                price
                            )}
                        </span>
                    )}
                </>
            );
        }
    };

    /* sku availability section where In stock or availability with icon will appear */
    renderSkuAvailability = () => {
        const { skuData, config } = this.props;
        const { skuInfo, skuAvailability, errorObjAvailability } = this.state;
        return (
            <>
                <div className="item col-lg col-lg-2 cmp-sku-list-specs-item__availability"
                    onClick={(e) => this.checkAvailability(skuData.skucode)}
                >
                    {(skuAvailability.productStatus ||
                    (errorObjAvailability && errorObjAvailability.ok === false)) && (
                        <Stock
                            skuInfo={skuInfo}
                            skuNumber={skuData.skucode}
                            skuAvailability={skuAvailability}
                            skuType="details"
                            errorObj={errorObjAvailability}
                        />
                    )}
                    {!skuAvailability.productStatus &&
                        !(
                        errorObjAvailability &&
                        errorObjAvailability.ok === false &&
                        config &&
                        config.skuInfo
                        ) && (
                        <span className="cmp-sku-list__checkavailability">
                            {config.skuInfo.seeAvailabilityLabel}
                            <ReactSVG
                            alt={config.skuInfo.seeAvailabilityLabel}
                            src={config.skuInfo.refreshIcon}
                            data-locator="check-availability"
                            />
                        </span>
                        )
                    }
                    {/*See Availability*/}
                </div>
            </>
        )
    };

    renderBuyInfo = () => {
        const { skuData, config, checkEcommCondition } = this.props;

        if (
            skuData.discontinued ||
            this.state.errorPriceType === NO_PRICE_NO_ADD_TO_CART
        ) {
            return (
                <>
                    {this.renderSkuAvailability()}
                    <SkuMessage
                        className={`cmp-sku-list-specs-item__message item ${
                            LoginStatus.state() ? 'col-lg-4' : 'col-lg-3'
                        }`}
                        icon={config.skuInfo.lowStockIcon}
                        message={config.skuInfo.skuSpecsErrorMessage}
                    />
                </>
            );
        } else if (checkEcommCondition()) {
            return <>{this.renderBuyInfoPartial()}</>;
        } else {
            <span className="item col-lg col-lg-6"></span>;
        }
    };

    render() {
        const { skuData, config } = this.props;
        return (
            /* Following are the placeholder values for the line item */
            <li class="sku-table-item row" key={skuData.skucode}>
                {/* SKU Code */}
                <span
                    className="item col-lg col-lg-1 cmp-sku-list-specs-item__code"
                    data-locator="product-number"
                    aria-label={`${config.skuInfo.partNumberLabel} ${skuData.skucode}`}
                >
                    {skuData.skucode}
                </span>
                {/* SKU Title */}
                <span className="item col-lg">
                    <a href={skuData.url ? skuData.url : null}>
                        <span
                            className="cmp-sku-list-specs-item__title"
                            data-locator="product-title"
                        >
                            {skuData.title}
                        </span>
                    </a>
                </span>
                {this.renderBuyInfo()}
            </li>
        );
    }
}

SkuTableItem.propTypes = {
    config: PropTypes.object.isRequired,
    skuData: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    checkEcommCondition: PropTypes.func,
};

SkuTableItem.defaultProps = {
    config: {},
    skuData: {},
    userInfo: {},
    checkEcommCondition: () => true,
};

export default SkuTableItem;
