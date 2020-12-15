import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from '../../common/delivery-status';
import { setClickAnalytics } from '../../analytics';
import { elementLocator } from '../../utils/eCommerceFunctions';
class QuoteListItem extends Component {
    constructor(props) {
        super(props);
    }

    renderQuoteAgainButton = () => {
        return (
            <a className="cmp-button" href="/#" >
                {this.props.quoteAgainTitle}
            </a>
        )
    }
    
    render() {
        const {data = {}, numberText, created, expires, shipment, icons, orderNumberText} = this.props;
        const {quoteId,orderNumber, quoteCreationDate, quoteExpirationDate, totalPriceFormatted, quoteStatus} = data;
        const showExpireDate = !!(quoteStatus === 'Pending' || quoteStatus === 'Quote Replaced' || quoteStatus === 'Rejected' || quoteStatus === 'Open');
        const showOrderNumber = !!(quoteStatus === 'Order Placed');
        const showQuoteAgainBtn = !!(quoteStatus === 'Expired');
        return (
            <div className='cmp-order-list__container'>
                <div className="cmp-order-list__left">
                    <div className="cmp-order-list__order-number">
                        <a
                            href={'#quotedetails?id=' + quoteId}
                            onClick={() => setClickAnalytics("Quote History", "Quote Details, " + quoteId, '#quotedetails?id=' + quoteId)}
                            data-locator={elementLocator(`${numberText} ${quoteId}`)}
                        >
                            {numberText + " " + quoteId}
                        </a>
                    </div>
                    <div className="cmp-quote-data-section">
                    {quoteCreationDate && (<div className="cmp-order-list__date" data-locator="order-list-created-date">
                        {`${created} ${quoteCreationDate}`}
                    </div>)}
                    {showExpireDate && quoteExpirationDate && (<div className="cmp-order-list__date" data-locator="order-list-expires-date">
                        {`${expires} ${quoteExpirationDate}`}
                    </div>)}
                    {showOrderNumber && orderNumber && (<div className="cmp-order-list__order-number-text" data-locator="quote-order-number">
                        {`${orderNumberText} ${orderNumber}`}
                    </div>)}
                    </div>
                    
                </div>
                <div className="cmp-order-list__right" data-locator="order-list-right">
                    <hr className="cmp-order-list_hr"/>
                    {quoteStatus && (<DeliveryStatus
                        status={quoteStatus}
                        labels={shipment}
                        icons={icons}
                    />)}            
                </div>
                {totalPriceFormatted && (<div className="cmp-order-list__total cmp-order-list__left" data-locator="order-list-total">
                    {totalPriceFormatted}
                </div>)}
                {showQuoteAgainBtn && (
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