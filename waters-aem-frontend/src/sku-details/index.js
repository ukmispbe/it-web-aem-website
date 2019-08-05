import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShown: false,
            modalConfig: this.props.config.modalInfo,
            skuConfig: this.props.config.skuInfo
        };
    }

    toggleModal = () => this.setState({modalShown: !this.state.modalShown});

    renderStock = () => {
        if (this.state.skuConfig.quantity > 10) {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            In stock
                            <ReactSVG src={this.state.skuConfig.inStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Order now</div>
                </div>
            );
        } else if (this.state.skuConfig.quantity > 0) {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            Only {this.state.skuConfig.quantity} in stock
                            <ReactSVG src={this.state.skuConfig.lowStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Order soon</div>
                </div>
            );
        } else {
            return (
                <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                    <div className="cmp-sku-details__stockdetails-container">
                        <span className="cmp-sku-details__stockdetails">
                            Out of stock
                            <ReactSVG src={this.state.skuConfig.outOfStockIcon} />
                        </span>
                    </div>
                    <div className="cmp-sku-details__order">Ships by {this.state.skuConfig.shipByDate}</div>
                </div>
            );
        }
    };

    render() {
        return (
            <>
            {this.renderStock()}
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
            </>
        );
    };
};

SkuDetails.propTypes = {
    config: PropTypes.object.isRequired
};

export default SkuDetails;