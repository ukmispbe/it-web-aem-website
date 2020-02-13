import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DeliveryStatus extends Component {
    constructor(props) {
        super(props);
        this.showShipmentsLink = false;
    }

    configureStatusLabel = (status) => {
        switch(status) {
            case "Open":
                this.deliveryStatus = this.props.labels.openLabel;
            break;
            case "Partial":
                this.deliveryStatus = this.props.labels.partialLabel;
                this.showShipmentsLink = true;
            break;
            case "Complete":
                this.deliveryStatus = this.props.labels.completeLabel;
            break;
            default:
              // code block
        }
    }
    componentDidMount() {
        this.configureStatusLabel(this.props.status);
        console.log("this.deliveryStatus", this.deliveryStatus);
    }

    render() {
        return (
            <>
                <div className="cmp-order-list__del-status">
                    {this.deliveryStatus}
                </div>
                {this.showShipmentsLink && (
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
    labels: PropTypes.array.isRequired
};

export default DeliveryStatus;
