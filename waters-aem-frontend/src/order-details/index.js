import React, { useState, useEffect } from 'react';
import { getOrderDetails } from './orderDetails.services';
import DateFormatter from '../utils/date-formatter'
import CurrencyFormatter from '../utils/currency-formatter'
import GetLocale from "../utils/get-locale";

const OrderDetails = (props) => {

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const id = getUrlParameter("id");
    const userLocale = GetLocale.getLocale();
    const url = props.config.fetchEndPoint;
    const [orderDetails, setOrderDetails] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getOrderDetails(url, id)
            .then((data) => {
                console.log(data);
                setOrderDetails(data);
            })
            .catch(error => {
                setError(true);
            });
    }, []);

    const renderOrderDetails = () => {
        console.log("orderDetails ", orderDetails);
        return (
            <div className="cmp-order-details__container">
                <h2 className="cmp-order-details__title">
                    Order Details
                </h2>
                <div className="cmp-order-details__order-info">

                    <h3 className="cmp-order-details__order-number">
                        Order Number: {orderDetails.orderNumber}
                    </h3>
                    <div className="cmp-order-details__order-date">
                        {DateFormatter.dateFormatter(orderDetails.date, userLocale)}
                    </div>
                    <div className="cmp-order-details__ship-to">
                        <h4>Ship to:</h4>
                        <div className="text"></div>
                    </div>
                    <div className="cmp-order-details__bill-to">
                        <h4>Bill to:</h4>
                        <div className="text"></div>
                    </div>
                    <div className="cmp-order-details__payment-method">
                        <h4>Payment method</h4>
                        <div className="text">{orderDetails.purchaseOrderNumber}</div>
                    </div>
                </div>
                <div className="cmp-order-details__order-summary">
                    <h4>Order Summary</h4>
                    <div className="cmp-order-details__order-subtotal">
                        <div className="cmp-order-details__order-subtotal_left">Subtotal:({orderDetails.lineItems && orderDetails.lineItems.length}) items</div>
                        <div className="cmp-order-details__order-subtotal_right">{CurrencyFormatter.currencyFormatter(orderDetails.itemsSubTotal, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-shipping">
                        <div className="cmp-order-details__order-shipping_left">Shipping:</div>
                        <div className="cmp-order-details__order-shipping_right">{CurrencyFormatter.currencyFormatter(orderDetails.shippingAmount, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-tax">
                        <div className="cmp-order-details__order-tax_left">Tax:</div>
                        <div className="cmp-order-details__order-tax_right">{CurrencyFormatter.currencyFormatter(orderDetails.taxAmount, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                    <div className="cmp-order-details__order-total">
                        <div className="cmp-order-details__order-total_left">Order Total:</div>
                        <div className="cmp-order-details__order-total_right">{CurrencyFormatter.currencyFormatter(orderDetails.orderTotal, userLocale, orderDetails.currencyCode)}</div>
                    </div>
                </div>

                {renderOrderShipmentList()}
            </div>
        )
    }

    const renderOrderShipmentList = () => {
        return (
            <>
                <div className="cmp-order-details__order-shipment-list">
                    -------------------
                    TO DO: Order Shipment List
                    -------------------
                </div>
            </>
        )
    }

    const renderErrorNotification = () => {
        return (
            <>
                "Error"
            </>
        )
    }

    return (
        <>
            {error && renderErrorNotification()}
            {!error && !loading && renderOrderDetails()}
        </>
    )
}

export default OrderDetails;