import React, { Component } from 'react';
import { getOrderDetails } from './orderDetails.services';
import DateFormatter from '../utils/date-formatter'
import CurrencyFormatter from '../utils/currency-formatter'
import GetLocale from "../utils/get-locale";
import Spinner from "../utils/spinner";
import ReactSVG from 'react-svg';
import ErrorBoundary from '../search/ErrorBoundary';

class OrderDetails extends Component {

    constructor({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props}) {
        super({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props});

        this.state = {
            orderId: this.getUrlParameter("id"),
            userLocale: GetLocale.getLocale(),
            detailsUrl: props.config.fetchDetailsEndPoint,
            orderDetails: {},
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

    async componentDidMount() {
        const { detailsUrl, orderId } = this.state;
        getOrderDetails(detailsUrl, orderId, this.setError)
            .then((data) => {
                if(data && data.account.length) {
                    this.setState({
                        isLoading: false,
                        orderDetails: data
                    });
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
                        <div className="cmp-order-details__order-subtotal_left">{this.props.config.subTotal} ({orderDetails.lineItems && orderDetails.lineItems.length} {this.props.config.items})</div>
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
        return (
            <>
                <div className="cmp-order-details__order-shipment-list">
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