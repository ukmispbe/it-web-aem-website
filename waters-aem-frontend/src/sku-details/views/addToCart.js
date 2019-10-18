import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
import SkuService from '../services/index';
import SkuList from '../../scripts/skulist';
import Analytics, { analyticTypes } from '../../scripts/analytics';


class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skuNumber: this.props.skuNumber,
            addToCartLabel: this.props.addToCartLabel,
            addToCartQty: null,
            addToCartUrl: this.props.addToCartUrl,
            toggleErrorModal: this.props.toggleErrorModal,
            toggleParentModal: this.props.toggleParentModal,
            errorObj: this.props.errorObj
        };
        this.request = new SkuService(
            '',
            {},
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
            .addToCart(this.state.skuNumber, this.state.addToCartQty)
            .then(response => {
                this.state.toggleParentModal(true);
                this.addToCartAnalytics();
            })
            .catch(err => {
                this.setState({ errorObj: err });
                this.state.toggleErrorModal(err);
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

    addToCartAnalytics = () => { 

        const addToCartModel = {
            addContext: this.props.analyticsConfig.context,
            name: this.props.analyticsConfig.name,
            price: this.props.analyticsConfig.price,
            quantity: this.state.addToCartQty.toString(),
            sku: this.state.skuNumber
        };

        if (this.props.analyticsConfig.hasOwnProperty('availableDate')) {
            if (this.props.analyticsConfig.availableDate) {
                addToCartModel.stockDate = this.props.analyticsConfig.availableDate;
            }
        }   
        
        if (this.props.analyticsConfig.hasOwnProperty('availableQuantity')) {
            if (this.props.analyticsConfig.availableQuantity) {
                addToCartModel.stockQuantity = this.props.analyticsConfig.availableQuantity.toString();
            }
        }
        if (this.props.analyticsConfig.hasOwnProperty('productStatus')) {
            if (this.props.analyticsConfig.productStatus) {
                addToCartModel.stockMessage = this.props.analyticsConfig.productStatus;
            }
        }

        Analytics.setAnalytics(analyticTypes.cart.name, addToCartModel);
    }

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