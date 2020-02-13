import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
class DeliveryStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryStatus: "",
            icon: "",
            iconClassName: "",
            showShipmentsLink: false
        }
    }

    
    //Complete = Shipped, Partial = Partially Shipped, and Open = In Progress 
    configureStatusContent = (status) => {
        let deliveryStatus = "";
        let icon = "";
        let iconClassName = "cmp-order-list-delivery__icon";
        let showShipmentsLink = false;
        switch(status) {
            case "Open":
                deliveryStatus = this.props.labels.openLabel;
                icon = this.props.icons.openIcon;
            break;
            case "Partial":
                deliveryStatus = this.props.labels.partialLabel;
                //showShipmentsLink = true; PB Commented Out 
                icon = this.props.icons.partialIcon;
            break;
            case "Complete":
                deliveryStatus = this.props.labels.completeLabel;
                //showShipmentsLink = true;  PB Commented Out 
                icon = this.props.icons.completeIcon;
                iconClassName = "cmp-order-list-delivery__icon__complete";
            break;
            case "Cancel":
                deliveryStatus = this.props.labels.cancelLabel;
                icon = this.props.icons.cancelIcon;
            break;
            default:
                deliveryStatus = this.props.labels.openLabel;
        }

        this.setState({ 
            deliveryStatus: deliveryStatus,
            icon: icon,
            iconClassName: iconClassName,
            showShipmentsLink: showShipmentsLink
        }); 
    }
    componentDidMount() {
        this.configureStatusContent(this.props.status);
    }

    render() {
        return (
            <>
                <div className="cmp-order-list__del-status">          
                    <div className={this.state.iconClassName}>
                        <ReactSVG src={this.state.icon} />
                    </div>
                    <div className="cmp-order-list-delivery__text">
                        {this.state.deliveryStatus}
                    </div>
                </div>
                {this.state.showShipmentsLink && (
                    <div className="cmp-order-list__view-shipments">
                        <a href={this.props.labels.viewShipmentsURL}>{this.props.labels.viewShipmentsText}</a>
                    </div>
                )}
            </>
        );
    }
}


DeliveryStatus.propTypes = {
    status: PropTypes.string.isRequired,
    labels: PropTypes.object.isRequired,
    icons: PropTypes.object.isRequired
};

export default DeliveryStatus;
