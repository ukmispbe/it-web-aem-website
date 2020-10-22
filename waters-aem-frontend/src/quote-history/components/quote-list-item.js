import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from '../../common/delivery-status'
import DateFormatter from '../../utils/date-formatter'
import GetLocale from '../../utils/get-locale'
import { setClickAnalytics } from '../../analytics';
import { elementLocator } from '../../utils/eCommerceFunctions';

class QuoteListItem extends Component {
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
                            href={'#quotedetails?id=' + this.props.data.orderNumber}
                            onClick={() => setClickAnalytics("Quote History", "Quote Details, " + this.props.data.orderNumber, '#quotedetails?id=' + this.props.data.orderNumber)}
                            data-locator={elementLocator(`${this.props.orderText} ${this.props.data.orderNumber}`)}
                        >
                            {this.props.orderText + " " + this.props.data.orderNumber}
                        </a>
                    </div>
                    <div className="cmp-order-list__date" data-locator="order-list-date">
                        {DateFormatter.dateFormatter(this.props.data.date, this.userLocale)}
                    </div>
                </div>
                <div className="cmp-order-list__right" data-locator="order-list-right">
                    <hr className="cmp-order-list_hr"/>
                    <DeliveryStatus
                        status={this.props.data.deliveryStatus}
                        labels={this.props.shipment}
                        icons={this.props.icons}
                    />            
                </div>
                <div className="cmp-order-list__total" data-locator="order-list-total">
                    {this.props.data.orderTotal}
                </div>
            </div>
        );
    }
}

QuoteListItem.propTypes = {
    data: PropTypes.array.isRequired,
    orderText: PropTypes.string.isRequired,
    shipment: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired
};

export default QuoteListItem;
