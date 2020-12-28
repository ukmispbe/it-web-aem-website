//for Order History and Order Details Shipments
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { setClickAnalytics } from '../../analytics';
import { QUOTE_STATUS } from '../../constants';
import { elementLocator } from '../../utils/eCommerceFunctions';

class DeliveryStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryStatus: "",
            icon: "",
            iconClassName: "",
            deliveryStatusClass: ""
        }
    }

    renderTrackingLink = () => {
        const {shipped, labels} = this.props;
        if (Object.keys(shipped).length && shipped.carrierUrl !== ""){
            return (
                <div>
                    <a className="tracking-link"
                        href={shipped.carrierUrl} target="_blank" title={labels.trackShipmentText}
                        onClick={() => setClickAnalytics("Order Details", "Track Shipment", shipped.carrierUrl)}
                        data-locator={elementLocator(labels.trackShipmentText)}
                    >
                        {labels.trackShipmentText}
                        <ReactSVG 
                            src="/content/dam/waters/en/brand-assets/icons/externallink.svg"
                            className="tracking-link__icon"
                            data-locator="tracking-link-icon"
                        />
                    </a>
                </div>
            );
        }
        return null;
    }
    
    //Complete = Shipped, Partial = Partially Shipped, and Open = In Progress 
    configureStatusContent = (status) => {
        const {labels, icons, shipped} = this.props;
        let deliveryStatus = "";
        let icon = "";
        let iconClassName = "delivery-icon";
        let deliveryStatusClass = '';

        switch(status) {
            case QUOTE_STATUS.PENDING:
                deliveryStatus = labels.pendingLabel;
                icon = icons.pendingIcon;
            break;
            case QUOTE_STATUS.QUOTE_REPLACED:
                deliveryStatus = labels.quoteReplacedLabel;
                icon = icons.replacedIcon;
            break;
            case QUOTE_STATUS.REJECTED:
                deliveryStatus = labels.rejectedLabel;
                icon = icons.rejectedIcon;
                iconClassName= "rejected-icon";
            break;
            case QUOTE_STATUS.EXPIRED:
                deliveryStatus = labels.expiredLabel;
                icon = icons.expiredIcon;
                iconClassName= "delivery-icon-disabled";
                deliveryStatusClass = "disabled";
            break;
            case QUOTE_STATUS.ORDER_PLACED:
                deliveryStatus = labels.orderPlacedLabel;
                icon = icons.orderPlacedIcon;
                iconClassName = "delivery-icon-complete";
            break; 
            case QUOTE_STATUS.OPEN:
                deliveryStatus = labels.openLabel;
                icon = icons.openIcon;
            break;
            case QUOTE_STATUS.PARTIAL:
                deliveryStatus = labels.partialLabel;
                icon = icons.partialIcon;
            break;
            case QUOTE_STATUS.COMPLETE:
                if(shipped.shippedDate && shipped.shippedDate !== ""){    
                    deliveryStatus = labels.completeShippedLabel + " " + shipped.shippedDate;
                } else {  
                    deliveryStatus = labels.completeLabel;  
                }
                icon = icons.completeIcon;
                iconClassName = "delivery-icon-complete";
            break;     
            default:
                deliveryStatus = labels.openLabel;
        }
        this.setState({
            deliveryStatus: deliveryStatus,
            icon: icon,
            iconClassName: iconClassName,
            deliveryStatusClass,
        });
    }
    componentDidMount() {
        this.configureStatusContent(this.props.status);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.configureStatusContent(this.props.status);
        }
    }

    render() {
        return (
            <>
                <div className={`delivery-status ${this.state.deliveryStatusClass}`} data-locator="delivery-status">          
                    <div className={this.state.iconClassName}>
                        <ReactSVG src={this.state.icon} />
                    </div>
                    <div className="delivery-text" data-locator="delivery-text">
                        {this.state.deliveryStatus}
                    </div>
                    {this.renderTrackingLink()}
                </div>
            </>
        );
    }
}

DeliveryStatus.propTypes = {
    status: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired,
    shipped: PropTypes.object
};


DeliveryStatus.defaultProps = {
    status: '',
    labels: {},
    icons: {},
    shipped: {}
};

export default DeliveryStatus;