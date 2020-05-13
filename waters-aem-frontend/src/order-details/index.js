import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { getOrderDetails, getItemDetails, matchLineItems } from './orderDetails.services';
import Shipment from './components/shipment'
import DateFormatter from '../utils/date-formatter'
import GetLocale from "../utils/get-locale";
import GetIsocode from "../utils/get-isocode";
import Spinner from "../utils/spinner";
import GroupBy from '../utils/group-by'
import ErrorBoundary from '../search/ErrorBoundary';

class OrderDetails extends Component {
    constructor({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props}) {
        super({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props});

        this.state = {
            orderId: this.getUrlParameter("id"),
            userLocale: GetLocale.getLocale(),
            userIsocode: GetIsocode.getIsocode(),
            detailsUrl: props.config.fetchDetailsEndPoint,
            itemsUrl: props.config.fetchItemsEndPoint,
            orderDetails: {},
            airbills: {},
            skusSoldCount: 0,
            errorServiceError: false,
            errorOrderNotFound: false,
            isLoading: true
        }
    }

    getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    setError = (response) => {
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
                />
            )
        }
        return <>
        <hr className="order-shipment-list__hr"/>
            {(Object.keys(airbills).length > 1) && (
                <h2 className="cmp-order-details__shipment-title">
                    {orderDetails.lineItems && orderDetails.lineItems.length} {this.props.config.items}
                </h2>
            )}

            {shipments}
        </>;
    }

    async componentDidMount() {
        const { detailsUrl, itemsUrl, orderId, userIsocode } = this.state;
        getOrderDetails(detailsUrl, orderId, this.setError)
            .then((data) => {
                if(data && data.account.length) {
                    this.setState({
                        isLoading: false,
                        orderDetails: data
                    });

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

    renderAddress = (addressType) => {
        const {orderDetails} = this.state;
        if (orderDetails.account){
            let account = orderDetails.account.filter(item => item.partnerType === addressType )[0];
            return (
                        <>
                            <div className="cmp-order-details-address1">{account.partnerName}</div>
                            <div className="cmp-order-details-address2">{account.street}</div>
                            <div className="cmp-order-details-address3">{account.city + ", " + account.region} <span className="postalcode">{account.postalCd}</span></div>
                        </>
                    );
        }
        return null;
    }

    renderItemCount = () => {
        const { orderDetails } = this.state;
        let label = "";
        if (orderDetails.lineItems && orderDetails.lineItems.length) {
            if (orderDetails.lineItems.length > 1) {
                label = this.props.config.items;
            } else if (orderDetails.lineItems.length === 1) {
                label = this.props.config.item;
            } 

            let itemCountLabel =  " (" + orderDetails.lineItems.length + " " + label + ")";
            return itemCountLabel;

        } else {
            return false
        }
    }

    renderOrderDetails = () => {
        const { orderDetails, userLocale } = this.state;
        return (
            <div className="cmp-order-details__container">
                <h2 className="cmp-order-details__title">
                {this.props.config.orderDetails}
                </h2>
                <div className="cmp-order-details__order-info">
                    <h3 className="cmp-order-details__order-number">
                        {this.props.config.orderNumber + ": " + orderDetails.orderNumber}
                    </h3>
                    <div className="cmp-order-details__order-date">
                        {DateFormatter.dateFormatter(orderDetails.date, userLocale)}
                    </div>
                    <div className="cmp-order-details__address-container">
                        <div className="cmp-order-details__ship-to">
                            <h4>{this.props.config.shipTo}</h4>
                            {this.renderAddress("shipping")}
                        </div>
                        <div className="cmp-order-details__bill-to">
                            <h4>{this.props.config.billTo}</h4>
                            {this.renderAddress("billing")}
                        </div>
                    </div>
                    <div className="cmp-order-details__payment-container">
                        <div className="cmp-order-details__payment-method">
                            <h4>{this.props.config.paymentMethod}</h4>
                            {orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={this.props.config.paymentType.purchaseOrder.icon}/>
                                <div className="text">{this.props.config.paymentType.purchaseOrder.label}: {orderDetails.purchaseOrderNumber}</div>
                                </>
                            )}
                            {!orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={this.props.config.paymentType.creditCard.icon}/>
                                <div className="text">{this.props.config.paymentType.creditCard.label}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="cmp-order-details__order-summary">
                    <h4>{this.props.config.orderSummary}</h4>
                    <div className="cmp-order-details__order-subtotal">
                        <div className="cmp-order-details__order-subtotal_left">{this.props.config.subTotal} {this.renderItemCount()}</div>
                        <div className="cmp-order-details__order-subtotal_right">{orderDetails.itemsSubTotal}</div>
                    </div>
                    <div className="cmp-order-details__order-shipping">
                        <div className="cmp-order-details__order-shipping_left">{this.props.config.shipping}</div>
                        <div className="cmp-order-details__order-shipping_right">{orderDetails.shippingAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-tax">
                        <div className="cmp-order-details__order-tax_left">{this.props.config.tax}</div>
                        <div className="cmp-order-details__order-tax_right">{orderDetails.taxAmount}</div>
                    </div>
                    <div className="cmp-order-details__order-total">
                        <div className="cmp-order-details__order-total_left">{this.props.config.orderTotal}</div>
                        <div className="cmp-order-details__order-total_right"><h1>{orderDetails.orderTotal}</h1></div>
                    </div>
                </div>
            </div>
        )
    }

    renderOrderNotFoundError = () => {
        return (
            <>
                <div className="cmp-order-details__no-results">
                    <p>{this.props.config.orderNotFoundErrorTitle}</p>
                </div>
            </>
        );
    }

    renderOrderShipmentList = () => {
        const { airbills, orderDetails } = this.state;
        return (
            <>
                <div className="cmp-order-details__order-shipment-list">
                    {Object.keys(airbills).length > 0 && this.getShipmentList(airbills, orderDetails)}
                </div>
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