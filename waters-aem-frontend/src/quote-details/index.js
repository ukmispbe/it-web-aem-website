import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { getOrderDetails, getItemDetails, matchLineItems } from './quoteDetails.services';
import Shipment from './components/shipment'
import DateFormatter from '../utils/date-formatter'
import GetLocale from "../utils/get-locale";
import GetIsocode from "../utils/get-isocode";
import Spinner from "../utils/spinner";
import GroupBy from '../utils/group-by'
import ErrorBoundary from '../search/ErrorBoundary';
import Modal, { Header, keys } from '../utils/modal';
import AddToCartBody from '../sku-details/views/addToCartModal';
import { addToCart } from '../sku-details/services';
import Analytics, { analyticTypes, setClickAnalytics, setSelectDropdownAnalytics } from '../analytics';
import LocalStore from '../stores/localStore';
import loginStatus from '../scripts/loginStatus';
import { getFullCompanyAddress, getCountryName } from '../utils/userFunctions'

class QuoteDetails extends Component {
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
            isCommerceApiMigrated: false,
            addToCartUrl: '',
            viewCartUrl: '',
            errorCartErrors: []
        }
    }

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
        const { isCommerceApiMigrated, addToCartUrl, reorderData } = this.state;
        addToCart(isCommerceApiMigrated, addToCartUrl, reorderData, null, this.setError)     
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
                isCommerceApiMigrated: JSON.parse(commerceConfig.isCommerceApiMigrated.toLowerCase()),
                addToCartUrl: commerceConfig.addToCartUrl,
                viewCartUrl: commerceConfig.viewCartUrl
            });
            if(commerceConfig.isCommerceApiMigrated.toLowerCase() === 'true') {
                // Update modal config button with a callback and new cart url
                const buttons = [...this.state.modalConfig.buttons];
                buttons[0] = {
                    ...buttons[0],
                    action: commerceConfig.viewCartUrl,
                    callback: this.addToCartReorder
                }
                const updatedModalConfig = {
                    ...this.state.modalConfig,
                    buttons: buttons
                }
                this.setState({
                    modalConfig: updatedModalConfig
                })
            }
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
                const addressArray = getFullCompanyAddress(account, includeCountryName);
                return (
                    <>
                        {addressArray.map((addressLine) => <div className="cmp-order-details-address1" data-locator="order-details-address">{addressLine}</div>)}
                    </>
                );
            }
        }
        return null;
    }

    renderItemCount = () => {
        const { orderDetails } = this.state;
        let label = "";
        if (orderDetails && orderDetails.totalItemsOrdered) {
            if (parseInt(orderDetails.totalItemsOrdered) > 1) {
                label = this.props.config.items;
            } else if (parseInt(orderDetails.totalItemsOrdered) === 1) {
                label = this.props.config.item;
            }

            let itemCountLabel =  " (" + orderDetails.totalItemsOrdered + " " + label + ")";
            return itemCountLabel;

        } else {
            return label;
        }
    }

    renderReorderButton = () => {
        return (
            <a className="cmp-button" href="/#" >
                {this.props.config.reorderTitle}
            </a>
        )
    }

    renderOrderDetails = () => {
        const { orderDetails, userLocale } = this.state;
        const notZeroDiscountFlag = parseFloat(orderDetails.orderDiscountValue) !== 0 ? true : false;
        return (
            <div className="cmp-order-details__container">
                <h2 className="cmp-order-details__title" data-locator="product-title">
                {this.props.config.orderDetails}
                </h2>
                <div className="cmp-order-details__order-info">
                    <h3 className="cmp-order-details__order-number" data-locator="product-number">
                        {this.props.config.orderNumber + ": " + orderDetails.orderNumber}
                    </h3>
                    <div className="cmp-order-details__order-date" data-locator="order-date">
                        {DateFormatter.dateFormatter(orderDetails.date, userLocale)}
                    </div>
                    <div className="cmp-order-details__address-container">
                        <div className="cmp-order-details__ship-to" data-locator="ship-to">
                            <h4>{this.props.config.shipTo}</h4>
                            {this.renderAddress("shipping")}
                        </div>
                        <div className="cmp-order-details__bill-to" data-locator="bill-to">
                            <h4>{this.props.config.billTo}</h4>
                            {this.renderAddress("billing")}
                        </div>
                    </div>
                    <div className="cmp-order-details__payment-container">
                        <div className="cmp-order-details__payment-method" data-locator="payment-method">
                            <h4>{this.props.config.paymentMethod}</h4>
                            {orderDetails.ccNum && (
                                <>
                                <ReactSVG src={this.props.config.paymentType.creditCard.icon}/>
                                <div className="text">{this.props.config.paymentType.creditCard.label}</div>
                                </>
                            )}
                            {!orderDetails.ccNum && orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={this.props.config.paymentType.purchaseOrder.icon}/>
                                <div className="text">{this.props.config.paymentType.purchaseOrder.label}: {orderDetails.purchaseOrderNumber}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="cmp-order-details__order-summary" data-locator="order-summary">
                    <h4>{this.props.config.orderSummary}</h4>
                    <div className="cmp-order-details__order-subtotal">
                        <div className="cmp-order-details__order-subtotal_left" data-locator="order-subtotal-left">{this.props.config.subTotal} {this.renderItemCount()}</div>
                        <div className="cmp-order-details__order-subtotal_right" data-locator="order-subtotal-right">{orderDetails.itemsSubTotal}</div>
                    </div>
                    {notZeroDiscountFlag && 
                        <div className="cmp-order-details__order-savings">
                            <div className="cmp-order-details__order-savings_left" data-locator="order-savings-left">{this.props.config.savings}</div>
                            <div className="cmp-order-details__order-savings_right" data-locator="order-savings-right">{this.props.config.minusSign}{orderDetails.orderDiscount}</div>
                        </div>
                    }
                    <div className="cmp-order-details__order-shipping">
                        <div className="cmp-order-details__order-shipping_left" data-locator="order-shipping-left">{this.props.config.shipping}</div>
                        <div className="cmp-order-details__order-shipping_right" data-locator="order-shipping-right">{orderDetails.shippingAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-tax">
                        <div className="cmp-order-details__order-tax_left" data-locator="order-tax-left">{this.props.config.tax}</div>
                        <div className="cmp-order-details__order-tax_right" data-locator="order-tax-right">{orderDetails.taxAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-total">
                        <div className="cmp-order-details__order-total_left" data-locator="order-total-left">{this.props.config.orderTotal}</div>
                        <div className="cmp-order-details__order-total_right" data-locator="order-total-right"><h1>{orderDetails.orderTotal}</h1></div>
                    </div>
                    {this.state.isCommerceApiMigrated && (
                        <div className="cmp-order-details__reorder" data-locator="order-details-reorder">
                            {this.renderReorderButton()}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    renderOrderNotFoundError = () => {
        return (
            <>
                <div className="cmp-order-details__no-results" data-locator="order-details-no-results">
                    <p>{this.props.config.orderNotFoundErrorTitle}</p>
                </div>
            </>
        );
    }

    renderOrderShipmentList = () => {
        const { airbills, orderDetails } = this.state;
        return (
            <>
                <div className="cmp-order-details__order-shipment-list" data-locator="order-shipment-list">
                    {Object.keys(airbills).length > 0 && this.getShipmentList(airbills, orderDetails)}
                </div>
                {this.state.isCommerceApiMigrated && (
                    <div className="order-shipment__reorder" data-locator="order-shipment-reorder">
                        {this.renderReorderButton()}
                    </div>
                )}
            </>
        )
    }

    render() {
        const { isLoading, errorOrderNotFound, errorServiceError } = this.state;
        return (
            <>
                {isLoading && (<Spinner loading={isLoading} />)}
                {!isLoading && errorOrderNotFound && this.renderOrderNotFoundError()}
                {!errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderDetails()}
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

const ErrorBoundaryQuoteDetails = props => (
    <ErrorBoundary>
        <QuoteDetails {...props} />
    </ErrorBoundary>
)
export { QuoteDetails };
export default ErrorBoundaryQuoteDetails;