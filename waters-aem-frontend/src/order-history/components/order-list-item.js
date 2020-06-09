import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from '../../common/delivery-status'
import DateFormatter from '../../utils/date-formatter'
import GetLocale from '../../utils/get-locale'
import { setClickAnalytics } from '../../analytics';

class OrderListItem extends Component {
    constructor(props) {
        super(props);
        this.userLocale = GetLocale.getLocale()
    }
    render() {
        return (
            <div className='cmp-order-list__container'>
                <div className="cmp-order-list__left">
                    <div className="cmp-order-list__order-number">
                        <a
                            href={'#orderdetails?id=' + this.props.data.orderNumber}
                            onClick={() => setClickAnalytics("Order History", "Order Details, " + this.props.data.orderNumber, '#orderdetails?id=' + this.props.data.orderNumber)}
                        >
                            {this.props.orderText + " " + this.props.data.orderNumber}
                        </a>
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
                    {this.props.data.orderTotal}
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
