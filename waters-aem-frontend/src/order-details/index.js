import React, { useState, useEffect } from 'react';
import { getOrderDetails } from './orderDetails.services';

const OrderDetails = ( props ) => {

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const id = getUrlParameter("id");
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
                <div className="cmp-order-details__title">
                    Order Details
                </div>
                <div className="cmp-order-details_body">
                    <div className="cmp-order-details__order-number">Order Number: {orderDetails.orderNumber}</div>
                    <div className="cmp-order-details__order-date">Order Date: {orderDetails.date}</div>
                    <div className="cmp-order-details--ship-to">Ship to: </div>
                    <div className="cmp-order-details--bill-to">Bill to: </div>
                    <div className="cmp-order-details__payment-method">Payment method: {orderDetails.purchaseOrderNumber}</div>
                    <div className="cmp-order-details__order-summary">
                        Order Summary
                        <div className="cmp-order-details__order-subtotal">Subtotal: {orderDetails.itemsSubTotal}</div>
                        <div className="cmp-order-details__order-shipping">Shipping: {orderDetails.shippingAmount}</div>
                        <div className="cmp-order-details__order-tax">Tax: {orderDetails.taxAmount}</div>
                        <div className="cmp-order-details__order-total">Order Total: {orderDetails.orderTotal}</div>
                    </div>
                </div>
                <div className="cmp-order-details--item-list"></div>
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