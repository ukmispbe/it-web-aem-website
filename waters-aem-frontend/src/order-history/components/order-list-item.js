import React, { Component } from 'react';
import DeliveryStatus from './delivery-status'
import DateFormatter from '../../utils/date-formatter'
import CurrencyFormatter from '../../utils/currency-formatter'

class OrderListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'cmp-order-list__container'}>
                <div className="cmp-order-list__left">
                    <div className="cmp-order-list__code">
                        {this.props.orderText + " " + this.props.data.orderNumber}
                    </div>
                    <div className="cmp-order-list__date">
                        {DateFormatter.dateFormatter(this.props.data.date)}
                    </div>
                </div>
                <div className="cmp-order-list__right">
                    <hr className="cmp-order-list_hr"/>
                    <DeliveryStatus
                        status={this.props.data.deliveryStatus}
                        labels={this.props.shipment}
                        icons={this.props.icons}
                    />            
                </div>
                <div className="cmp-order-list__total">
                    {CurrencyFormatter.currencyFormatter(this.props.data.orderTotal, this.props.data.currencyCode)}
                </div>
            </div>
        );
    }
}


OrderListItem.propTypes = {
    data: PropTypes.array.isRequired,
    orderText: PropTypes.string.isRequired,
    shipment: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired
};

export default OrderListItem;
