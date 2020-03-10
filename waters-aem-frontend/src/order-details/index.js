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

    const renderAddress = (addressType) => {

        if (orderDetails.account){

            let account = orderDetails.account.filter(item => item.partnerType === addressType )[0];
            console.log("account ", account);
            console.log("orderDetails ", orderDetails);
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
                            <div className="text">{orderDetails.purchaseOrderNumber}</div>
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