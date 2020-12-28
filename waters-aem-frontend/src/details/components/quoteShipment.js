import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountHeader from '../../common/count-header';
import DetailsListItem from './details-list-item';
import DateFormatter from '../../utils/date-formatter'
import GetLocale from '../../utils/get-locale'

class QuoteShipment extends Component {
    constructor(props) {
        super(props);
        this.userLocale = GetLocale.getLocale();
        this.skuConfig = JSON.parse(
            document.getElementById('commerce-configs-json').innerHTML
        );
    }

    ifShipped = () => {
        let deliveryStatus = "Open";
        const {shippedDate} = this.props.data[0];

        if(shippedDate !== "" && shippedDate !== "0000-00-00"){
            deliveryStatus = "Complete";
        } 
        
        return deliveryStatus;
    } 

    orderShipped = () => {
        const {shippedDate, carrierUrl, carrier} = this.props.data[0];
        if(shippedDate !== "" && shippedDate !== "0000-00-00"){
            let shipped, formattedShippedDate;
            formattedShippedDate = DateFormatter.monthDayFormatter(shippedDate, this.userLocale);
            
            return shipped = {
                shippedDate: formattedShippedDate,
                carrierUrl: carrierUrl,
                carrier: carrier
            };
        } else {
            return {}
        }
    } 
    
    renderItemCount = (totalItemsCount, shipment) => {
        let label = "";
        if (totalItemsCount) {
            if (parseInt(totalItemsCount) > 1) {
                label = shipment.itemsText;
            } else if (parseInt(totalItemsCount) === 1) {
                label = shipment.itemText;
            } 

            let itemCountLabel = totalItemsCount + " " + label;
            return itemCountLabel;

        } else {
            return label;
        }
    }

    render() {
        const {totalItemsCount, shipment, icons, data, totalItems, resultsText, noResultsFoundTitle } = this.props
        return (
            <div className='order-shipment'>
                <div className="showing-item-counter">
                    <CountHeader
                        rows={totalItems}
                        count={totalItems}
                        current={1}
                        resultsText={resultsText}
                        noResultsText={noResultsFoundTitle}
                    />
                    </div>
                <div className='order-shipment-header'>
                    <div className="order-shipment-header__left">
                        <div className="order-shipment-header__item-count">
                            {this.renderItemCount(totalItemsCount, shipment)}
                        </div>
                    </div>
                </div>
                <div className="">
                    {data.map((record, index) => {
                        const data = {
                            materialNumber: record.product.code,
                            title:record.product.name,
                            materialDecription:record.product.name,
                            url:record.product.sKUPageUrl,
                            thumbnail:record.product.imageUrl,
                            unitPrice:record.totalPrice.formattedValue,
                            orderedQuantity:record.quantity,
                        }
                       return (
                        <DetailsListItem
                            key={index}
                            relatedSku={data}
                            skuConfig={this.skuConfig}
                        />
                    )})}
                </div>
            </div>
        );
    }
}

QuoteShipment.propTypes = {
    data: PropTypes.array.isRequired,
    shipment: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
    shipmentNumber: PropTypes.string,
    totalItemsCount: PropTypes.string
};

QuoteShipment.defaultProps = {
    data: [],
    shipment: {},
    icons: {},
    shipmentNumber: 1,
    totalItemsCount: 0
};

export default QuoteShipment;