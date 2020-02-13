import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeliveryStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryStatus: "",
            icon: "",
            showShipmentsLink: false
        }
    }

    
    //Complete = Shipped, Partial = Partially Shipped, and Open = In Progress 
    configureStatusContent = (status) => {
        let deliveryStatus = "";
        let icon = "";
        let showShipmentsLink = false;
        switch(status) {
            case "Open":
                deliveryStatus = this.props.labels.openLabel;
                //this.icon = 
            break;
            case "Partial":
                deliveryStatus = this.props.labels.partialLabel;
                showShipmentsLink = true;
            break;
            case "Complete":
                deliveryStatus = this.props.labels.completeLabel;
            break;
            default:
                deliveryStatus = this.props.labels.openLabel;
        }

        this.setState({ 
            deliveryStatus: deliveryStatus,
            icon: icon,
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
                    {this.state.deliveryStatus}
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
