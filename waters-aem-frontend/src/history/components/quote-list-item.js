import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from '../../common/delivery-status'
import DateFormatter from '../../utils/date-formatter'
import GetLocale from '../../utils/get-locale'
import { setClickAnalytics } from '../../analytics';
import { elementLocator } from '../../utils/eCommerceFunctions';

const getShipmentStatus = (data, index) => {
    let status = data;
    if(index == 1){
     status = "Expired";
    }
    if(index == 2){
        status = "Order Placed";
       }
    return status;
}

class QuoteListItem extends Component {
    constructor(props) {
        super(props);
        this.userLocale = GetLocale.getLocale()
    }

    renderQuoteAgainButton = () => {
        return (
            <a className="cmp-button" href="/#" >
                {this.props.quoteAgainTitle}
            </a>
        )
    }
    
    render() {
        const deliveryStatus = getShipmentStatus(this.props.data.deliveryStatus, this.props.index);
        return (
            <div className='cmp-order-list__container'>
                <div className="cmp-order-list__left">
                    <div className="cmp-order-list__order-number">
                        <a
                            href={'#quotedetails?id=' + this.props.data.orderNumber}
                            onClick={() => setClickAnalytics("Quote History", "Quote Details, " + this.props.data.orderNumber, '#quotedetails?id=' + this.props.data.orderNumber)}
                            data-locator={elementLocator(`${this.props.numberText} ${this.props.data.orderNumber}`)}
                        >
                            {this.props.numberText + " " + this.props.data.orderNumber}
                        </a>
                    </div>
                    <div className="cmp-order-list__date" data-locator="order-list-date">
                        {DateFormatter.dateFormatter(this.props.data.date, this.userLocale)}
                    </div>
                </div>
                <div className="cmp-order-list__right" data-locator="order-list-right">
                    <hr className="cmp-order-list_hr"/>
                    <DeliveryStatus
                        status={deliveryStatus}
                        labels={this.props.shipment}
                        icons={this.props.icons}
                    />            
                </div>
                <div className="cmp-order-list__total cmp-order-list__left" data-locator="order-list-total">
                    {this.props.data.orderTotal}
                </div>
                {this.props.index == 1 && (
                    <div className="cmp-order-list__right quote-again-section" data-locator="quote-history-quote-again">
                        {this.renderQuoteAgainButton()}
                    </div>
                )}

            </div>
        );
    }
}

QuoteListItem.propTypes = {
    data: PropTypes.array.isRequired,
    numberText: PropTypes.string.isRequired,
    shipment: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired
};

export default QuoteListItem;
