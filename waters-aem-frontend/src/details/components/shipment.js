import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from '../../common/delivery-status'
import DetailsListItem from './details-list-item';
import DateFormatter from '../../utils/date-formatter';
import GetLocale from '../../utils/get-locale';
import CountHeader from '../../common/count-header';
import { DELIVERY_STATUS } from '../../constants';

class Shipment extends Component {
    constructor(props) {
        super(props);
        this.userLocale = GetLocale.getLocale();
        this.skuConfig = JSON.parse(
            document.getElementById('commerce-configs-json').innerHTML
        );
    }

    ifShipped = () => {
        let deliveryStatus = DELIVERY_STATUS.OPEN;
        const {shippedDate} = this.props.data[0];

        if(shippedDate !== "" && shippedDate !== "0000-00-00"){
            deliveryStatus = DELIVERY_STATUS.COMPLETE;
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
    
    renderItemCount = (totalItemsOrdered, shipment) => {
        let label = "";
        if (totalItemsOrdered) {
            if (parseInt(totalItemsOrdered) > 1) {
                label = shipment.itemsText;
            } else if (parseInt(totalItemsOrdered) === 1) {
                label = shipment.itemText;
            } 

            let itemCountLabel = totalItemsOrdered + " " + label;
            return itemCountLabel;

        } else {
            return label;
        }
    }

    addToCartReorder = () => {
        this.props.addToCartReorder();
        return false;
    }

    getDetailsItemData = (data = {}) => {
        const {isQuoteDetails = false} = this.props;
        let item = data;
        if(isQuoteDetails && data){
            const {product = {},basePrice = {},quantity} = data;
            const {code,name,sKUPageUrl,imageUrl} = product;
            const {formattedValue} = basePrice;
            item = {
                materialNumber: code,
                title: name,
                materialDecription: name,
                url: sKUPageUrl,
                thumbnail: imageUrl,
                unitPrice: formattedValue,
                orderedQuantity: quantity,
            }
        }
        return item;
    }

    render() {
        const {shipmentNumber, totalShipments, shipment, icons, totalItems, totalItemsOrdered, resultsText, noResultsFoundTitle, isQuoteDetails=false } = this.props
        return (
            <div className='order-shipment'>
                {isQuoteDetails && (<div className="showing-item-counter" data-locator="quote-showing-item-count-header">
                    <CountHeader
                        rows={totalItems}
                        count={totalItems}
                        current={1}
                        resultsText={resultsText}
                        noResultsText={noResultsFoundTitle}
                    />
                </div>)}
                <div className='order-shipment-header'>
                    <div className="order-shipment-header__left">
                        
                        {totalShipments > 1 && !isQuoteDetails && (
                            <div className="order-shipment-header__shipment-count">
                                {shipment.shipmentText + " " + shipmentNumber}
                            </div>
                        )}

                        <div className="order-shipment-header__item-count">
                            {this.renderItemCount(totalItemsOrdered, shipment)}
                        </div>
                    </div>
                    {!isQuoteDetails && (<div className="order-shipment-header__right">
                        <DeliveryStatus
                            status={this.ifShipped()}
                            labels={shipment}
                            icons={icons}
                            shipped={this.orderShipped()}
                        />            
                    </div>)}
                </div>
                <div className="details-item-tiles-section" data-locator="details-item-section">
                    {this.props.data.map((record, index) => (
                        <DetailsListItem
                            key={index}
                            relatedSku={this.getDetailsItemData(record)}
                            skuConfig={this.skuConfig}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

Shipment.propTypes = {
    data: PropTypes.array.isRequired,
    shipment: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
    shipmentNumber: PropTypes.string,
    totalShipments: PropTypes.string,
    isQuoteDetails: PropTypes.bool
};

Shipment.defaultProps = {
    data: [],
    shipment: {},
    icons: {},
    shipmentNumber: 1,
    totalShipments: 1,
    isQuoteDetails: false
};

export default Shipment;