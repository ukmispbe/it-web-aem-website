import React, { Component } from 'react';
import DeliveryStatus from './delivery-status'
import DateFormatter from '../../utils/date-formatter'
import CurrencyFormatter from '../../utils/currency-formatter'
import GetLocale from '../../utils/get-locale'

class OrderListItem extends Component {
    constructor(props) {
        super(props);
        this.userLocale = GetLocale.getLocale()
    }
        // <div className="cmp-order-list__order-number">
        //     <a href={'#orderdetails?id=' + this.props.data.orderNumber}>{this.props.orderText + " " + this.props.data.orderNumber}</a>
        // </div>
    render() {
        return (
            <div className={'cmp-order-list__container'}>
                <div className="cmp-order-list__left">
                    <div className="cmp-order-list__order-number">
                        <a href={'#orderdetails?id=' + this.props.data.orderNumber}>{this.props.orderText + " " + this.props.data.orderNumber}</a>
                    </div>
                    <div className="cmp-order-list__date">
                        {DateFormatter.dateFormatter(this.props.data.date, this.userLocale)}
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
                    {CurrencyFormatter.currencyFormatter(this.props.data.orderTotal, this.userLocale, this.props.data.currencyCode)}
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
