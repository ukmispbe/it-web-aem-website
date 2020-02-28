import React, { useState, useEffect } from 'react';
import { getOrderDetails } from './orderDetails.services';
import DateFormatter from '../utils/date-formatter'
import CurrencyFormatter from '../utils/currency-formatter'
import GetLocale from "../utils/get-locale";

const OrderDetails = ( props ) => {

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const id = getUrlParameter("id");
    const userLocale = GetLocale.getLocale();
    const url = props.config.fetchEndPoint;
    const [ orderDetails, setOrderDetails ] = useState({});
    const [ error, setError ] = useState({});

    useEffect(() => {
        getOrderDetails(url, id)
            .then((data) => {
                console.log(data);
                setOrderDetails(data);
            });
    }, []);

    const renderOrderDetails = () => {
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
                        Subtotal: {CurrencyFormatter.currencyFormatter(orderDetails.itemsSubTotal, userLocale, orderDetails.currencyCode)}
                    </div>
                    <div className="cmp-order-details__order-shipping">
                        Shipping: {CurrencyFormatter.currencyFormatter(orderDetails.shippingAmount, userLocale, orderDetails.currencyCode)}
                    </div>
                    <div className="cmp-order-details__order-tax">
                        Tax: {CurrencyFormatter.currencyFormatter(orderDetails.taxAmount, userLocale, orderDetails.currencyCode)}
                    </div>
                    <div className="cmp-order-details__order-total">
                        Order Total: {CurrencyFormatter.currencyFormatter(orderDetails.orderTotal, userLocale, orderDetails.currencyCode)}
                    </div>
                </div>

                <div className="cmp-order-details__order-list"></div>
            </div>
        )
    }

    return (
        <>
            {renderOrderDetails()}
        </>
    )
}

export default OrderDetails;