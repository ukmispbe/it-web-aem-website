import React, { Component } from 'react';
import OrderHistoryService from '../orderHistory.services';
import dateFormatter from '../../utils/date-formatter'

class OrderListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: "2019-12-20",
            toDate: "2020-1-30",
            email: 'wendy_batista@waters.com'

            //fromDate='1573689600000', toDate='1574035200000', email='wendy_batista@waters.com'
        };
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
//     invoiceStatus: "Open",
//     orderNumber: "15739728",
//     purchaseOrderNumber: "TEST",
//     date: "2020-01-27",
//     itemsSubTotal: null,
//     taxAmount: null,
//     shippingAmount: null,
//     currencyCode: "USD",
//     orderTotal: "$286.22",
//     delivaryStatus: "Open"
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
        const disabledClass = this.state.email ? 'disabled' : '';

        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                    {this.props.data.deliveryStatus}<br/>
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
                        {this.props.data.date}
                    </div>
                        <div className="cmp-sku-details__title">
                            {this.props.data.orderNumber}<br/>
                            {this.props.data.date}<br/>
                            {this.props.data.orderTotal}
                        </div>
                    {OrderItem}
                </div>
            </div>
        );
    }
}


OrderListItem.propTypes = {
    data: PropTypes.array.isRequired
};

export default OrderListItem;
