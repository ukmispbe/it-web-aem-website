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
// }

    renderOrderItemPartial = () => {
        return (
            <div className="cmp-sku-details__buyinfo"> {
                this.props.data.invoiceStatus + "\n" +
                this.props.data.orderNumber + "\n" +
                this.props.data.purchaseOrderNumber + "\n" +
                this.props.data.date + "\n" +
                this.props.data.itemsSubTotal + "\n" +
                this.props.data.taxAmount + "\n" +
                this.props.data.shippingAmount + "\n" +
                this.props.data.currencyCode + "\n" +
                this.props.data.orderTotal + "\n" +
                this.props.data.deliveryStatus
            } </div>
        );
    };

    render() {
        const OrderItem = this.renderOrderItemPartial();
        const disabledClass = this.props.data.email ? 'disabled' : '';

        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                    {this.props.data.deliveryStatus}<br/>
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
                        {this.props.data.orderNumber}
                    </div>
                        <div className="cmp-sku-details__title">
                            {this.props.data.date}<br/>
                            {this.props.data.orderTotal}
                        </div>
                    {/* {OrderItem} */}
                </div>
            </div>
        );
    }
}


OrderListItem.propTypes = {
    data: PropTypes.array.isRequired
};

export default OrderListItem;
