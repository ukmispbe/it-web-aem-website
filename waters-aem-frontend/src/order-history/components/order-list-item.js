import React, { Component } from 'react';
import DeliveryStatus from './delivery-status'
import DateFormatter from '../../utils/date-formatter'
import CurrencyFormatter from '../../utils/currency-formatter'

class OrderListItem extends Component {
    constructor(props) {
        super(props);
    }

// Order Number: 48863058261
// December 8, 2019
// $3,514.87

// View Shipments
// Partially Shipped

// {
//     "invoiceStatus": "Open",
//     "orderNumber": "15739617",
//     "purchaseOrderNumber": "TEST",
//     "date": "2020-01-09",
//     "itemsSubTotal": null,
//     "taxAmount": null,
//     "shippingAmount": null,
//     "currencyCode": "USD",
//     "orderTotal": "$17.00",
//     "deliveryStatus": "Open"

// this.props.data.invoiceStatus + "\n" +
// this.props.data.orderNumber + "\n" +
// this.props.data.purchaseOrderNumber + "\n" +
// this.props.data.date + "\n" +
// this.props.data.itemsSubTotal + "\n" +
// this.props.data.taxAmount + "\n" +
// this.props.data.shippingAmount + "\n" +
// this.props.data.currencyCode + "\n" +
// this.props.data.orderTotal + "\n" +
// this.props.data.deliveryStatus
// }
        
    render() {
        return (
            <div className={'cmp-order-list__container'}>
                <div className="cmp-order-list__right">

                    <DeliveryStatus
                        status={this.props.data.deliveryStatus}
                        labels={this.props.shipment}
                    />            
                </div>
                <div className="cmp-order-details__left">
                    <div className="cmp-order-list__code">
                        {this.props.orderText + " " + this.props.data.orderNumber}
                    </div>
                    <div className="cmp-order-list__date">
                        {DateFormatter.dateFormatter(this.props.data.date)}
                    </div>
                    <div className="cmp-order-list__total">
                        {CurrencyFormatter.currencyFormatter(this.props.data.orderTotal, this.props.data.currencyCode)}
                    </div>
                </div>
            </div>
        );
    }
}


OrderListItem.propTypes = {
    data: PropTypes.array.isRequired,
    orderText: PropTypes.string.isRequired,
    shipment: PropTypes.array.isRequired
};

export default OrderListItem;
