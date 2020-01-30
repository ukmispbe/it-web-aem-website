import React from 'react';
import ReactSVG from 'react-svg';
import OrderHistoryService from '../orderHistory.services';
import dateFormatter from '../../utils/date-formatter'
import LoginStatus from '../../scripts/loginStatus';

class OrderListItem extends React.Component {
    constructor(props) {
        super(props);
        this.request = new OrderHistoryService(
            this.state.orderHistory,
            {
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                email: this.state.email,
            },
            err => {
                // Add Error Object to State
                this.setState({
                    errorObj: err,
                });
            }
        );

        this.checkAvailability = this.checkAvailability.bind(this);
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
                this.props.invoiceStatus + "<br/>" +
                this.props.orderNumber + "<br/>" +
                this.props.purchaseOrderNumber + "<br/>" +
                this.props.date + "<br/>" +
                this.props.itemsSubTotal + "<br/>" +
                this.props.taxAmount + "<br/>" +
                this.props.shippingAmount + "<br/>" +
                this.props.currencyCode + "<br/>" +
                this.props.orderTotal + "<br/>" +
                this.props.deliveryStatus
            } </div>
        );
    };

    render() {
        const OrderItem = this.renderOrderItemPartial();
        const disabledClass = this.isDisabled() ? 'disabled' : '';

        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
                        {this.props.date}
                    </div>
                        <div className="cmp-sku-details__title">
                            {this.props.orderNumber}
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
