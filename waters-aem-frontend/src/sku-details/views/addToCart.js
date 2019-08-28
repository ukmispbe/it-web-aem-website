import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
import SkuService from '../services/index';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skuNumber: this.props.skuNumber,
            addToCartLabel: this.props.addToCartLabel,
            addToCartQty: null,
            addToCartUrl: this.props.addToCartUrl
        };
        this.request = new SkuService(
            '',
            {},
            {
                addToCart: this.state.addToCartUrl,
                getCart: ''
            },
            err => console.log(err));

        this.quantityInput = this.quantityInput.bind(this);
    }

    quantityInput = e => {
        let cartValue = Number(e.target.value.replace(/[^\w\s]/gi, ''));
        // Cast the value as a number, and regex out anything but whole numbers
        // Doing it this way instead of setting the input as a number because even with input set to type="number" special characters can be input
        // also there were a problems with negatives/resetting to zero as number type
        if((cartValue < 0) || (isNaN(cartValue))){
            cartValue = 0;
        }

        this.setState({
            addToCartQty: cartValue,
        });
    };

    cartAPIRequest() {
        this.request
        .addToCart(this.state.skuNumber, this.state.addToCartQty)
        .then(response => {
            this.props.toggleParentModal(true);
        })
        .catch(err => {
            // TODO: Get info for error modal
            this.props.toggleParentModal(true);
        });
    }
    addToCart = () => {
        if (this.state.addToCartQty > 0) {
            this.cartAPIRequest();
        } else {
            // TODO: Make this also an error modal?
            this.setState(
                { addToCartQty: 1 },
                () => this.cartAPIRequest()
            );
        }
    };

    render() {
        return (
            <>
                <form>
                    <input
                        className="cmp-sku-details__quantity"
                        placeholder="Qty"
                        value={this.state.addToCartQty}
                        onChange={this.quantityInput}
                    />
                </form>
                <a className="cmp-button" onClick={() => this.addToCart()}>
                    {this.props.addToCartLabel}
                </a>
            </>
        )
    }

}

export default AddToCart;