import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeliveryStatus from './delivery-status'
import OrderDetailsListItem from './order-details-list-item';
import DateFormatter from '../../utils/date-formatter'
import GetLocale from '../../utils/get-locale'

class Shipment extends Component {
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

        if(shippedDate !== ""){
            deliveryStatus = "Complete";
        } 
        
        return deliveryStatus;
    } 
    orderShipped = () => {
        const {shippedDate, carrierUrl, carrier} = this.props.data[0];
        if(shippedDate !== ""){
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

    configureContent = () => {

        this.setState({

        });
    }

    
    renderItemCount = (data, shipment) => {
        let label = "";
        if (data && data.length) {
            if (data.length > 1) {
                label = shipment.itemsText;
            } else if (data.length === 1) {
                label = shipment.itemText;
            } 

            let itemCountLabel = data.length + " " + label;
            return itemCountLabel;

        } else {
            return false
        }
    }

    componentDidMount() {
        this.configureContent();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data[0].airbill !== this.props.data[0].airbill) {
            this.configureContent();
        }
    }
    // {this.props.data.length > 0 && ( //only return template if data exists
    render() {
        const {shipmentNumber, totalShipments, shipment, icons, data } = this.props
        return (
            <div className='order-shipment'>
                <div className='order-shipment-header'>
                    <div className="order-shipment-header__left">
                        
                        {totalShipments > 1 && (
                            <div className="order-shipment-header__shipment-count">
                                {shipment.shipmentText + " " + shipmentNumber}
                            </div>
                        )}

                        <div className="order-shipment-header__item-count">
                            {this.renderItemCount(data, shipment)}
                        </div>
                    </div>
                    <div className="order-shipment-header__right">
                        <DeliveryStatus
                            status={this.ifShipped()}
                            labels={shipment}
                            icons={icons}
                            shipped={this.orderShipped()}
                        />            
                    </div>
                </div>
                <div className="">
                    {this.props.data.map((record, index) => (
                        <OrderDetailsListItem
                            key={index}
                            relatedSku={record}
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
    totalShipments: PropTypes.string
};

Shipment.defaultProps = {
    data: [],
    shipment: {},
    icons: {},
    shipmentNumber: 1,
    totalShipments: 1
};

export default Shipment;