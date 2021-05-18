import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import {
    getAvailability,
    getPricing,
    matchListItems,
} from '../../sku-details/services';
import LoginStatus from '../../scripts/loginStatus';
import { getHttpStatusFromErrors } from '../../utils/eCommerceFunctions';
import Spinner from '../../utils/spinner';
import SkuMessage from '../../sku-message';
import CheckOutStatus from '../../scripts/checkOutStatus';
import Ecommerce from '../../scripts/ecommerce';
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
            regionRestricted: false,
        };
    }

    componentDidMount() {
        const { pricingUrl, skuNumber, userInfo } = this.state;

        if (Object.keys(userInfo).length > 0 && userInfo.callCustApi) {
            this.getCustPricing(pricingUrl, skuNumber, userInfo);
        } else {
            this.setState({ loading: false });
        }
    }

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
                            loading: false,
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
                        loading: false,
                    });
                }
            })
            .catch((err) => {
                // Add Error Object to State
                this.setState({
                    errorPriceType: NO_PRICE_NO_ADD_TO_CART,
                    loading: false,
                });
            });
    };

    renderBuyInfoPartial = () => {
        const { custPrice, listPrice } = this.state;
        return (
            <>
                {this.renderSkuAvailability()}
                {this.renderPricing()}
                {/* Placeholder for add to cart */}
                <span className="item col-lg col-lg-2"></span>
            </>
        );
    };

    renderPricing = () => {
        const { custPrice, listPrice, skuInfo, errorPriceType } = this.state;
        let price = listPrice;
        let label = skuInfo.listPriceLabel;

        if (errorPriceType !== '') {
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
                            LoginStatus.state() ? 'strike' : ''
                        }`}
                    >
                        {listPrice}
                    </span>
                    {/* SKU Customer Price */}
                    {LoginStatus.state() && (
                        <span className="item col-lg col-lg-1 cmp-sku-list-specs-item__customer-price">
                            {custPrice}
                        </span>
                    )}
                </>
            );
        }
    };;;

    renderBuyInfoCommerceView = () => {
        if (Ecommerce.isDisabledState()) {
            return null;
        } else {
            if (
                (Ecommerce.isPartialState() &&
                    LoginStatus.state() &&
                    CheckOutStatus.state()) ||
                (!Ecommerce.isPartialState() && !Ecommerce.isDisabledState())
            ) {
                return <>{this.renderBuyInfoPartial()}</>;
            } else {
                return null;
            }
        }
    };

    renderSkuAvailability = () => (
        <>
            {/* SKU Availability */}
            <span className="item col-lg col-lg-2 cmp-sku-list-specs-item__availability">
                See Availability
            </span>
        </>
    );

    renderBuyInfo = () => {
        const buyInfoCommerceView = this.renderBuyInfoCommerceView();
        const { skuData, config } = this.props;

        if (
            skuData.discontinued ||
            this.state.errorPriceType === NO_PRICE_NO_ADD_TO_CART
        ) {
            return (
                <>
                    {this.renderSkuAvailability()}
                    <SkuMessage
                        className="sku-list-specs-item__message item col-lg-4"
                        icon={config.skuInfo.lowStockIcon}
                        message={config.skuInfo.skuSpecsErrorMessage}
                    />
                </>
            );
        } else {
            return buyInfoCommerceView;
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
                    aria-label={
                        `${config.skuInfo.partNumberLabel} ${skuData.skucode}`
                    }
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
};

SkuTableItem.defaultProps = {
    config: {},
    skuData: {},
    userInfo: {},
};

export default SkuTableItem;
