import React, { Component } from 'react';
import dateFormatter from '../../utils/date-formatter'

class OrderListItem extends Component {
    constructor(props) {
        super(props);
    }

    handleItemClick = () => {
        if (this.props.onItemClick) {
            this.props.onItemClick();
        }
    };

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

    formatDate = (inputString) => {
        const newDate = new Date(inputString);
        // Need to consider Translation
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];               
        var monthIndex = newDate.getMonth();
        return monthNames[monthIndex] + ' ' + newDate.getDate()  + ', ' + newDate.getFullYear();
    }   
        
    render() {

        const OrderItem = this.renderOrderItemPartial();
        const disabledClass = this.props.data.email ? 'disabled' : '';

        return (
            <div className={'cmp-order-list__container ' + disabledClass}>
                <div className="cmp-order-list__right">
                    <div className="cmp-order-list__del-status">
                        {this.props.data.deliveryStatus}
                    </div>
                    <div className="cmp-order-list__view-shipments">
                        <a href={this.props.viewShipmentsURL}>{this.props.viewShipmentsText}</a>
                    </div>               
                </div>
                <div className="cmp-order-details__left">
                    <div className="cmp-order-list__code">
                        {this.props.orderText + " " + this.props.data.orderNumber}
                    </div>
                        <div className="cmp-order-list__date">
                            {this.formatDate(this.props.data.date)}
                        </div>
                        <div className="cmp-order-list__total">
                            {this.props.data.orderTotal}
                        </div>
                </div>
            </div>
        );
    }
}


OrderListItem.propTypes = {
    data: PropTypes.array.isRequired
    // config: PropTypes.object.isRequired
};

export default OrderListItem;
