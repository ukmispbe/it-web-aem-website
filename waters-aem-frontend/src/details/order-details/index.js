import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { getOrderDetails, getItemDetails, matchLineItems } from '../details.services';
import Shipment from '../components/shipment';
import DateFormatter from '../../utils/date-formatter';
import GetLocale from "../../utils/get-locale";
import GetIsocode from "../../utils/get-isocode";
import Spinner from "../../utils/spinner";
import GroupBy from '../../utils/group-by';
import ErrorBoundary from '../../search/ErrorBoundary';
import Modal, { Header, keys } from '../../utils/modal';
import AddToCartBody from '../../sku-details/views/addToCartModal';
import { addToCart } from '../../sku-details/services';
import Analytics, { analyticTypes } from '../../analytics';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import { getOrderDetailsAddress, getCountryName } from '../../utils/userFunctions';
import { buildViewCartURL } from '../../utils/eCommerceFunctions'

import '../../styles/order-details.scss';

class OrderDetails extends Component {
    constructor({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props}) {
        super({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props});
        this.state = {
            orderId: this.getUrlParameter("id"),
            userLocale: GetLocale.getLocale(),
            userIsocode: GetIsocode.getIsocode(),
            detailsUrl: props.config.fetchDetailsEndPoint,
            itemsUrl: props.config.fetchItemsEndPoint,
            reorderUrl: props.config.fetchReorderUrlEndPoint,
            orderDetails: {},
            reorderData: [],
            airbills: {},
            skusSoldCount: 0,
            errorServiceError: false,
            errorOrderNotFound: false,
            isLoading: true,
            modalShown: false,
            modalConfig: props.config.modalInfo,
            addToCartUrl: '',
            viewCartUrl: '',
            errorCartErrors: []
        }
    }
    rootStyle = "cmp-order-details";
    setAnalytics = (event, detail={}) => {
        const model = {
            detail,
            event
        };
        Analytics.setAnalytics(analyticTypes['orderDetails'].name, model);
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown });
    };

    getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    setError = (response) => {
        this.setAnalytics('error', {error: {...response}});
        if (response.status === 400 && response.code === 704) {
            this.setState({orderNotFoundError: true});
        } else {
            this.props.setErrorBoundaryToTrue({code: 400});
            this.setState({errorServiceError: true});
        }
    }

    getShipmentList = (airbills, orderDetails) => {
        let shipments = [];
        for (let i = 0; i < Object.keys(airbills).length; i++) {
            const values = Object.values(airbills)[i];
            shipments.push(
                <Shipment
                    data={values}
                    shipment={this.props.config.shipment}
                    icons={this.props.config.icons}
                    shipmentNumber={i+1}
                    totalShipments={Object.keys(airbills).length}
                    addToCartReorder= {this.addToCartReorder}
                    totalItemsOrdered={orderDetails.totalItemsOrdered}
                />
            )
        }
        return <>
            <hr className="order-shipment-list__hr"/>
            {Object.keys(airbills).length > 0 && shipments}
        </>;
    }

    addReorderAnalytics = (response) => {
        const localStore = new LocalStore();
        const cartId = loginStatus.state() ? localStore.getCartId() : localStore.getGUID();
        const cartModifications = response.cartModifications;
        let items = {};
        if (cartModifications) {
            items = cartModifications.map((item) => {
                return {
                    "sku": item.entry.product.code,
                    "qty": item.quantityAdded
                }
            })
        }
        let reOrderModel = {
            detail: {
                cartId,
                "addContext": analyticTypes["reOrder"].context,
                items
            }
        };
        Analytics.setAnalytics(analyticTypes["reOrder"].name, reOrderModel);     
    }

    addToCartReorder = (e) => {
        e.preventDefault();
        const { addToCartUrl, reorderData } = this.state;
        addToCart(addToCartUrl, reorderData, null, this.setError)     
        .then(response => {
            // Redirect if at least one item was successfully added to the cart
            if(response && response.cartModifications && response.cartModifications.length) {
                this.addReorderAnalytics(response);
                window.location.href = this.state.viewCartUrl;
            } else {
                this.toggleModal();
                response && response.errors && this.setState({ errorCartErrors: response.errors});
                this.setError(response);
                this.setState({ errorServiceError: false });
            }
            //this.addToCartAnalytics(response);
        })
        .catch(err => {
            this.toggleModal();
            this.setState({ errorServiceError: false });
        });
    }

    async componentDidMount() {
        const commerceConfig = JSON.parse(
            document.getElementById('commerce-configs-json').innerHTML
        );
        if(commerceConfig) {
            this.setState({
                addToCartUrl: commerceConfig.addToCartUrl,
                viewCartUrl: buildViewCartURL(commerceConfig.viewCartUrl)
            });

            // Update modal config button with a callback and new cart url
            const buttons = [...this.state.modalConfig.buttons];
            buttons[0] = {
                ...buttons[0],
                action: buildViewCartURL(commerceConfig.viewCartUrl),
                callback: this.addToCartReorder
            };
            const updatedModalConfig = {
                ...this.state.modalConfig,
                buttons: buttons
            };
            this.setState({
                modalConfig: updatedModalConfig
            });
        }

        const { detailsUrl, itemsUrl, orderId, userIsocode } = this.state;
        getOrderDetails(detailsUrl, orderId, this.setError)
            .then((data) => {
                if(data && data.account && data.account.length) {
                    // Add Country Names to data
                    data.account.map(account => {
                        const countryName = getCountryName(account.country, this.config);
                        account.countryName = countryName;
                        account.state = account.region;
                    });
                    this.setState({
                        isLoading: false,
                        orderDetails: data
                    });
                    const reorderData = data.lineItems.map(item => {
                        return {code: item.materialNumber, quantity: item.orderedQuantity};
                    });
                    this.setState({
                        reorderData: [...reorderData]
                    })
                    getItemDetails(itemsUrl, data.lineItems, this.setError, userIsocode)
                        .then((itemData) => {
                            if(itemData && itemData.documents && itemData.documents.length) {
                                let mergedAPIs = matchLineItems(data, itemData.documents);
                                this.setState({
                                    airbills: GroupBy.groupBy(mergedAPIs.lineItems, 'airbill')
                                });
                            } else {
                                this.setState({
                                    airbills: GroupBy.groupBy(data.lineItems, 'airbill')
                                });
                            }
                            this.setAnalytics('load');
                        })

                } else {
                    this.setState({
                        errorOrderNotFound: true,
                        isLoading: false
                    });
                }
            })
    }

    componentWillUnmount() {
        this.props.resetErrorBoundaryToFalse();
        this.props.removeNotifications();
    }

    config = document.getElementById('json-config--cmp-detail-tiles--personal')
        ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    renderAddress = (addressType) => {
        const {orderDetails} = this.state;
        if (orderDetails.account){
            const account = orderDetails.account.filter(item => item.partnerType === addressType )[0];
            if (account) {
                const includeCountryName = true;
                const addressArray = getOrderDetailsAddress(account, includeCountryName);
                return (
                    <>
                        {addressArray.map((addressLine) => <div className={`${this.rootStyle}-address1`} data-locator="order-details-address">{addressLine}</div>)}
                    </>
                );
            }
        }
        return null;
    }

    renderItemCount = () => {
        const { orderDetails } = this.state;
        const { config } = this.props;
        let label = "";
        if (orderDetails && orderDetails.totalItemsOrdered) {
            if (parseInt(orderDetails.totalItemsOrdered) > 1) {
                label = config.items;
            } else if (parseInt(orderDetails.totalItemsOrdered) === 1) {
                label = config.item;
            }

            let itemCountLabel =  " (" + orderDetails.totalItemsOrdered + " " + label + ")";
            return itemCountLabel;

        } else {
            return label;
        }
    }

    renderReorderButton = () => {
        return (
            <a className="cmp-button" onClick={() => this.toggleModal()}>
                {this.props.config.reorderTitle}
            </a>
        )
    }

    renderDetailsSection = () => {
        const { orderDetails, userLocale } = this.state;
        const { config } = this.props;
        const notZeroDiscountFlag = parseFloat(orderDetails.orderDiscountValue) !== 0 ? true : false;
        return (<>
            <div className={`${this.rootStyle}__container`}>
                <h2 className={`${this.rootStyle}__title`} data-locator="product-title">
                {config.orderDetails}
                </h2>
                <div className={`${this.rootStyle}__order-info`}>
                    <h3 className={`${this.rootStyle}__order-number`} data-locator="product-number">
                        {config.numberLabel + ": " + orderDetails.orderNumber}
                    </h3>
                    <div className={`${this.rootStyle}__order-date`} data-locator="order-date">
                        {DateFormatter.dateFormatter(orderDetails.date, userLocale)}
                    </div>
                    <div className={`${this.rootStyle}__address-container`}>
                        <div className={`${this.rootStyle}__ship-to`} data-locator="ship-to">
                            <h4>{config.shipTo}</h4>
                            {this.renderAddress("shipping")}
                        </div>
                        <div className={`${this.rootStyle}__bill-to`} data-locator="bill-to">
                            <h4>{config.billTo}</h4>
                            {this.renderAddress("billing")}
                        </div>
                    </div>
                    <div className={`${this.rootStyle}__payment-container`}>
                        <div className={`${this.rootStyle}__payment-method`} data-locator="payment-method">
                            <h4>{config.paymentMethod}</h4>
                            {orderDetails.ccNum && (
                                <>
                                <ReactSVG src={config.paymentType.creditCard.icon}/>
                                <div className="text">{config.paymentType.creditCard.label}</div>
                                </>
                            )}
                            {!orderDetails.ccNum && orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={config.paymentType.purchaseOrder.icon}/>
                                <div className="text">{config.paymentType.purchaseOrder.label}: {orderDetails.purchaseOrderNumber}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="cmp-order-details__order-summary" data-locator="order-summary">
                    <h4>{config.summaryTitle}</h4>
                    <div className="cmp-order-details__order-subtotal">
                        <div className="cmp-order-details__order-subtotal_left" data-locator="order-summary-label-sub-total">{config.subTotal} {this.renderItemCount()}</div>
                        <div className="cmp-order-details__order-subtotal_right" data-locator="order-summary-price-sub-total">{orderDetails.itemsSubTotal}</div>
                    </div>
                    {notZeroDiscountFlag && 
                        <div className="cmp-order-details__order-savings">
                            <div className="cmp-order-details__order-savings_left" data-locator="order-summary-label-total-discount">{config.savings}</div>
                            <div className="cmp-order-details__order-savings_right" data-locator="order-summary-price-total-discount">{this.props.config.minusSign}{orderDetails.orderDiscount}</div>
                        </div>
                    }
                    <div className="cmp-order-details__order-shipping">
                        <div className="cmp-order-details__order-shipping_left" data-locator="order-summary-label-total-shipping-handling">{config.shipping}</div>
                        <div className="cmp-order-details__order-shipping_right" data-locator="order-summary-price-total-shipping-handling">{orderDetails.shippingAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-tax">
                        <div className="cmp-order-details__order-tax_left" data-locator="order-summary-label-estimated-tax">{config.tax}</div>
                        <div className="cmp-order-details__order-tax_right" data-locator="order-summary-price-estimated-tax">{orderDetails.taxAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-total">
                        <div className="cmp-order-details__order-total_left" data-locator="order-summary-label-total-price">{config.totalLabel}</div>
                        <div className="cmp-order-details__order-total_right" data-locator="order-summary-price-total-price"><h1>{orderDetails.orderTotal}</h1></div>
                    </div>
                    <div className={`${this.rootStyle}__reorder`} data-locator="order-details-reorder">
                            {this.renderReorderButton()}
                    </div>
                </div>
            </div>
            </>
        )
    }

    renderNotFoundError = () => {
        return (
            <>
                <div className={`${this.rootStyle}__no-results`} data-locator="order-details-no-results">
                    <p>{this.props.config.resultNotFoundErrorTitle}</p>
                </div>
            </>
        );
    }

    renderOrderShipmentList = () => {
        const { airbills, orderDetails } = this.state;
        return (
            <>
                <div className={`${this.rootStyle}__order-shipment-list`} data-locator="order-shipment-list">
                    {Object.keys(airbills).length > 0 && this.getShipmentList(airbills, orderDetails)}
                </div>
                <div className="order-shipment__reorder" data-locator="order-shipment-reorder">
                        {this.renderReorderButton()}
                </div>
            </>
        )
    }

    render() {
        const { isLoading, errorOrderNotFound, errorServiceError } = this.state;
        return (
            <>
                {isLoading && (<Spinner loading={isLoading} />)}
                {!isLoading && errorOrderNotFound && this.renderNotFoundError()}
                {!errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection()}
                {!errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList()}
                <Modal isOpen={this.state.modalShown} onClose={this.toggleModal} className='cmp-add-to-cart-modal'>
                    <Header
                        title={this.state.modalConfig.title}
                        icon={this.state.modalConfig.icon}
                        className={keys.HeaderWithAddedMarginTop}
                    />
                    <AddToCartBody
                        config={this.state.modalConfig}
                        errorObjCart={this.state.errorObjCart}
                    />
                </Modal>
            </>
        )
    }
}

const ErrorBoundaryOrderDetails = props => (
    <ErrorBoundary>
        <OrderDetails {...props} />
    </ErrorBoundary>
)
export { OrderDetails };
export default ErrorBoundaryOrderDetails;