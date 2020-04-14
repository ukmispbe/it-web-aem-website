import React, { useState, useEffect } from 'react';
import { getOrderDetails } from './orderDetails.services';
import DateFormatter from '../utils/date-formatter'
import CurrencyFormatter from '../utils/currency-formatter'
import GetLocale from "../utils/get-locale";
import Spinner from "../utils/spinner";
import ReactSVG from 'react-svg';
import ErrorBoundary from '../search/ErrorBoundary';

const OrderDetails = ({setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, ...props}) => {

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const orderId = getUrlParameter("id");
    const userLocale = GetLocale.getLocale();
    const detailsUrl = props.config.fetchDetailsEndPoint;
    const [orderDetails, setOrderDetails] = useState({});
    const [errorServiceError, setServiceError] = useState(false);
    const [errorOrderNotFound, setOrderNotFoundError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getOrderDetails(detailsUrl, orderId, setError)
            .then((data) => {
                if(data.account.length) {
                    setOrderNotFoundError(false);
                    setServiceError(false);
                    setIsLoading(false);
                    setOrderDetails(data);
                } else {
                    setIsLoading(false);
                    setOrderNotFoundError(true);
                }
            })
        return () => {
            resetErrorBoundaryToFalse();
            removeNotifications();
        }
    }, []);

    const setError = (statusCode) => {
        (statusCode === 703 || statusCode === 400 || statusCode === 500) && setErrorBoundaryToTrue({code: statusCode});
        (statusCode === 704) && setOrderNotFoundError(true);
    }

    const renderAddress = (addressType) => {
        if (orderDetails.account){
            let account = orderDetails.account.filter(item => item.partnerType === addressType )[0];
            return (
                        <>
                            <div className="cmp-order-details-address1">{account.partnerName}</div>
                            <div className="cmp-order-details-address2">{account.street}</div>
                            <div className="cmp-order-details-address3">{account.city + ", " + account.postalCd}</div> 
                        </>
                    );
        }
        return null;
    }

    const renderOrderDetails = () => {
        return (
            <div className="cmp-order-details__container">
                <h2 className="cmp-order-details__title">
                {props.config.orderDetails}
                </h2>
                <div className="cmp-order-details__order-info">
                    <h3 className="cmp-order-details__order-number">
                        {props.config.orderNumber + ": " + orderDetails.orderNumber}
                    </h3>
                    <div className="cmp-order-details__order-date">
                        {DateFormatter.dateFormatter(orderDetails.date, userLocale)}
                    </div>
                    <div className="cmp-order-details__address-container">
                        <div className="cmp-order-details__ship-to">
                            <h4>{props.config.shipTo}</h4>
                            {renderAddress("shipping")}
                        </div>
                        <div className="cmp-order-details__bill-to">
                            <h4>{props.config.billTo}</h4>
                            {renderAddress("billing")}
                        </div>
                    </div>
                    <div className="cmp-order-details__payment-container">
                        <div className="cmp-order-details__payment-method">
                            <h4>{props.config.paymentMethod}</h4>
                            {orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={props.config.paymentType.purchaseOrder.icon}/>
                                <div className="text">PO: {orderDetails.purchaseOrderNumber}</div>
                                </>
                            )}
                            {!orderDetails.purchaseOrderNumber && (
                                <>
                                <ReactSVG src={props.config.paymentType.creditCard.icon}/>
                                <div className="text">Credit Card</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="cmp-order-details__order-summary">
                    <h4>{props.config.orderSummary}</h4>
                    <div className="cmp-order-details__order-subtotal">
                        <div className="cmp-order-details__order-subtotal_left">{props.config.subTotal} ({orderDetails.lineItems && orderDetails.lineItems.length} {props.config.items})</div>
                        <div className="cmp-order-details__order-subtotal_right">{CurrencyFormatter.currencyFormatter(orderDetails.itemsSubTotal, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-shipping">
                        <div className="cmp-order-details__order-shipping_left">{props.config.shipping}</div>
                        <div className="cmp-order-details__order-shipping_right">{CurrencyFormatter.currencyFormatter(orderDetails.shippingAmount, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-tax">
                        <div className="cmp-order-details__order-tax_left">{props.config.tax}</div>
                        <div className="cmp-order-details__order-tax_right">{CurrencyFormatter.currencyFormatter(orderDetails.taxAmount, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-total">
                        <div className="cmp-order-details__order-total_left">{props.config.orderTotal}</div>
                        <div className="cmp-order-details__order-total_right"><h1>{CurrencyFormatter.currencyFormatter(orderDetails.orderTotal, userLocale, orderDetails.currencyCode)}</h1></div>
                    </div>
                </div>
            </div>
        )
    }

    const renderOrderShipmentList = () => {
        return (
            <>
                <div className="cmp-order-details__order-shipment-list">
                </div>
            </>
        )
    }

    const renderServiceErrorNotification = () => {
        return (
            <ErrorNotification
                type="service"
                title={props.config.serviceErrorNotificationTitle}
                text={props.config.serviceErrorNotificationText}
                icon={props.config.serviceErrorNotificationIcon}
            />
        )
    }

    const renderOrderNotFoundError = () => {
        return (
            <>
                <div className="cmp-order-details__no-results">
                    <p>{props.config.orderNotFoundErrorTitle}</p>
                </div>
            </>
        );
    }

    return (
        <>
            {isLoading && (<Spinner loading={isLoading} />)}
            {!isLoading && errorServiceError && renderServiceErrorNotification()}
            {!isLoading && errorOrderNotFound && renderOrderNotFoundError()}
            {!errorOrderNotFound && !errorServiceError && !isLoading && renderOrderDetails()}
            {!errorOrderNotFound && !errorServiceError && !isLoading && renderOrderShipmentList()}
        </>
    )
}

const ErrorBoundaryOrderDetails = props => (
    <ErrorBoundary>
        <OrderDetails {...props} />
    </ErrorBoundary>
)

export default ErrorBoundaryOrderDetails;