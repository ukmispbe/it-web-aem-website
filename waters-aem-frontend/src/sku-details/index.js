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
            // userCountry: this.props.config.countryCode,
            userCountry: 'US',
            availabilityAPI: this.props.config.availabilityUrl,
            skuAvailability: {},
        };
    }

    componentDidMount() {
        // Get the availability data
        const url = this.state.availabilityAPI
            .replace('{partnumber}', this.state.skuNumber)
            .replace('{isocode}', this.state.userCountry);

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ skuAvailability: data }))
            .catch();
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown });
    };

    render() {
        return (
            <span>
                <Stock
                    skuConfig={this.state.skuConfig}
                    skuNumber={this.state.skuNumber}
                    skuAvailability={this.state.skuAvailability}
                />
                <div className="cmp-sku-details__buttons">
                    <form>
                        <input
                            className="cmp-sku-details__quantity"
                            type="number"
                            placeholder="Qty"
                            max={this.state.skuConfig.quantity}
                            min="1"
                        />
                    </form>
                    <a className="cmp-button" onClick={this.toggleModal}>
                        ADD TO CART
                    </a>
                </div>
                <Modal
                    toggleModal={this.toggleModal}
                    open={this.state.modalShown}
                    theme="callToAction"
                    config={this.state.modalConfig}
                />
            </span>
        );
    }
}

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired,
};

export default SkuDetails;
