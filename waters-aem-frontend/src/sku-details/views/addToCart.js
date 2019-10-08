import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
import SkuService from '../services/index';
import SkuList from '../../scripts/skulist';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skuNumber: this.props.skuNumber,
            addToCartLabel: this.props.addToCartLabel,
            addToCartQty: null,
            availabilityAPI: this.props.skuConfig.availabilityUrl,
            addToCartUrl: this.props.addToCartUrl
        };
        this.request = new SkuService(
            '',
            {
                availability: this.state.availabilityAPI,
                price: '',
            },
            {
                addToCart: this.state.addToCartUrl,
                getCart: ''
            },
            err => {
                console.log(err);
            });

        this.quantityInput = this.quantityInput.bind(this);
        this.skuRemoveNegative = this.skuRemoveNegative.bind(this);
        this.skuQuantityInput = this.skuQuantityInput.bind(this);
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
            .getAvailability(this.state.skuNumber)
            .then(response => {
                this.request
                    .addToCart(this.state.skuNumber, this.state.addToCartQty)
                    .then(response => {
                        this.props.toggleParentModal(true);
                    })
                    .catch(err => {
                        this.props.errorObj = err;
                        // TODO: Get info for error modal
                        this.props.toggleErrorModal(err);
                    });
            })
            .catch(err => {
                // Add Error Object to State
                this.props.errorObj = err;
                // TODO: Get info for error modal
                this.props.toggleErrorModal(err);
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

    skuRemoveNegative = e => {
        SkuList.SkuRemoveNegative(e);
    };

    skuQuantityInput = e => {
        SkuList.SkuQuantityInput(e);
        let value = e.target.value;
        this.setState({
            addToCartQty: value,
        });
    };

    render() {
        return (
            <>
                <form>
                    <input
                        className="cmp-sku-details__quantity"
                        placeholder="Qty"
                        value={this.state.addToCartQty}
                        onChange={this.skuQuantityInput}
                        onKeyPress={this.skuRemoveNegative}
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