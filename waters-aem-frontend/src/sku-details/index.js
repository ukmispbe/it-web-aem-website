// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';
import Stock from './views/stock';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);
        // sku = props.modalInfo.textHeading
        this.state = {
            modalShown: false,
            modalConfig: this.props.config.modalInfo,
            skuConfig: this.props.config.skuInfo,
            skuNumber: this.props.config.modalInfo.textHeading,
            userCountry: 'US', //TODO: We will want to get this from AEM
            availabilityAPI: 'https://dev-www.waters.com:8443/api/waters/product/v1/availability/', //TODO: we will want to get this from AEM
            skuAvailability: {}
        };
    }

    componentDidMount(){
        // Get the availability data
        fetch(`${this.state.availabilityAPI}${this.state.skuNumber}/${this.state.userCountry}`)
            .then(response => response.json())
            .then(data => this.setState({skuAvailability: data}))
            .catch()
    }

    toggleModal = () => this.setState({modalShown: !this.state.modalShown});


    render() {
        return (
            <span>
                <Stock skuConfig={this.state.skuConfig} skuNumber={this.state.skuNumber} skuAvailability={this.state.skuAvailability}></Stock>
                <div className="cmp-sku-details__buttons">
                    <form>
                        <input className="cmp-sku-details__quantity" type="number" placeholder="Qty" max={this.state.skuConfig.quantity} min="1" />
                    </form>
                    <a className="cmp-button" onClick={this.toggleModal}>ADD TO CART</a>
                </div>
                <Modal
                    toggleModal={this.toggleModal}
                    open={this.state.modalShown}
                    theme="callToAction"
                    config={this.state.modalConfig}
                />
            </span>
        );
    };
};

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired
};

export default SkuDetails;