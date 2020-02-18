import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
class DeliveryStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deliveryStatus: "",
            icon: "",
            iconClassName: ""
        }
    }

    
    //Complete = Shipped, Partial = Partially Shipped, and Open = In Progress 
    configureStatusContent = (status) => {
        let deliveryStatus = "";
        let icon = "";
        let iconClassName = "cmp-order-list-delivery__icon";
        switch(status) {
            case "Open":
                deliveryStatus = this.props.labels.openLabel;
                icon = this.props.icons.openIcon;
            break;
            case "Partial":
                deliveryStatus = this.props.labels.partialLabel;
                icon = this.props.icons.partialIcon;
            break;
            case "Complete":
                deliveryStatus = this.props.labels.completeLabel;
                icon = this.props.icons.completeIcon;
                iconClassName = "cmp-order-list-delivery__icon__complete";
            break;
            default:
                deliveryStatus = this.props.labels.openLabel;
        }

        this.setState({ 
            deliveryStatus: deliveryStatus,
            icon: icon,
            iconClassName: iconClassName
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
