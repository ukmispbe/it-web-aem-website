import React, { Component } from 'react';
import PropTypes from "prop-types";
import OrderListItem from './components/OrderListItem';

class OrderHistory extends Component {
    constructor(props) {
        super(props);

        this.orderMock = [
            {
                invoiceStatus: "Open",
                orderNumber: "15739756",
                purchaseOrderNumber: "TEST",
                date: "2020-01-30",
                itemsSubTotal: null,
                taxAmount: null,
                shippingAmount: null,
                currencyCode: "USD",
                orderTotal: "$2443.91",
                delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739754",
            purchaseOrderNumber: "TEST",
            date: "2020-01-29",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$792.53",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739748",
            purchaseOrderNumber: "TEST",
            date: "2020-01-29",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$2443.91",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739728",
            purchaseOrderNumber: "TEST",
            date: "2020-01-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$286.22",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739719",
            purchaseOrderNumber: "TEST",
            date: "2020-01-24",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$865.25",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739617",
            purchaseOrderNumber: "TEST",
            date: "2020-01-09",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$17.00",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739520",
            purchaseOrderNumber: "TEST",
            date: "2019-12-11",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$16.89",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739506",
            purchaseOrderNumber: "TEST",
            date: "2019-12-09",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$805.16",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739390",
            purchaseOrderNumber: "TEST",
            date: "2019-11-18",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$116.89",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739367",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739366",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739364",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739363",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739362",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739129",
            purchaseOrderNumber: "TEST",
            date: "2019-10-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5349.08",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739128",
            purchaseOrderNumber: "TEST",
            date: "2019-10-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$24.49",
            delivaryStatus: "Open"
            }
            ];
    
    }

    render() {
        return (
            <>
                {this.orderMock.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.title && (
                            <div className="cmp-sku-list__title">
                                {this.props.title}
                            </div>
                        )}
                        {this.orderMock.map((item, index) => (
                            <OrderListItem
                                data={item}
                            />
                        ))}
                    </>
                )}
            </>
        );
    }
}

OrderHistory.propTypes = {
    title: PropTypes.string,
    noOrdersFoundTitle: PropTypes.string,
    noOrdersFoundText: PropTypes.string,
    shopAllTitle: PropTypes.string,
    shopAllHref: PropTypes.string
};

export default OrderHistory;