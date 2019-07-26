import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { Modal } from '../modal/index';

class SkuDetails extends React.Component {
    constructor(props) {
        super(props);

        const config = {
            "icon": 'path/to/icon.svg',
            "title": "Item Added to Cart",
            "textHeading": this.props.sku,
            "text": this.props.name,
            "buttons": [
                {
                    "text": "View Cart",
                    "action": "https://www.waters.com/waters/shoppingCart.htm"
                },
                {
                    "text": "Continue Shopping",
                    "action": "close"
                }
            ],
        };

        this.state = {
            modalShown: false,
            config: config,
            quantity: this.props.quantity
        };
    }

    toggleModal = () => this.setState({modalShown: !this.state.modalShown});
    
    render() {
        return (
            <>
            <div className="cmp-sku-details__availability" data-instock="instock" data-lowstock="lowstock" data-out-of-stock="out-of-stock">
                <span className="cmp-sku-details__stockdetails">In Stock</span>
                <ReactSVG src={""} />
                <div className="cmp-sku-details__order">Order now</div>
            </div>
            <div className="cmp-sku-details__buttons">
                <form>
                    <input className="cmp-sku-details__quantity" type="number" placeholder="Qty" max={this.state.quantity} min="1" />
                </form>
                <a className="cmp-button" onClick={this.toggleModal}>ADD TO CART</a>
            </div>
            <Modal
                toggleModal={this.toggleModal}
                open={this.state.modalShown}
                theme="callToAction"
                config={this.state.config}
            />
            </>
        );
    };
};

SkuDetails.PropTypes = {
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
};

export default SkuDetails;