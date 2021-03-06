import React from 'react';
import { addToCart } from '../services/index';
import SkuList from '../../scripts/skulist';
import Analytics, { analyticTypes } from '../../analytics';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skuNumber: this.props.skuNumber,
            addToCartLabel: this.props.addToCartLabel,
            addToCartQty: this.props.addToCartQty,
            addToCartUrl: this.props.addToCartUrl,
            toggleErrorModal: this.props.toggleErrorModal,
            toggleParentModal: this.props.toggleParentModal,
            errorObj: this.props.errorObj,
            skuResponse: this.props.skuResponse
        };
    }

    componentDidMount() {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillUnmount() {
        if (this.props.onRef) {
            this.props.onRef(undefined);
        }
    }

    onChangeSku = skuNumber => {
        this.setState({ skuNumber });
    }

    quantityInput = e => {
        let cartValue = Number(e.target.value.replace(/[^\w\s]/gi, ''));
        // Cast the value as a number, and regex out anything but whole numbers
        // Doing it this way instead of setting the input as a number because even with input set to type="number" special characters can be input
        // also there were a problems with negatives/resetting to zero as number type
        if ((cartValue < 0) || (isNaN(cartValue))) {
            cartValue = 0;
        }

        this.setState({
            addToCartQty: cartValue,
        });
    };

    cartAPIRequest() {
        addToCart(this.props.addToCartUrl, this.state.skuNumber, this.state.addToCartQty, this.state.toggleErrorModal)
            .then(response => {

                // If any other type of error eg 400, 401, 404 return 
                if (Object.keys(response).length === 0) {
                    return;
                }

                // Check for an errors object in the response. If present display the error modal instead of the View Cart
                const cartAPIError = response.errors;
                if (!response.errors) {
                    this.state.skuResponse(response);
                    this.state.toggleParentModal(true);
                    this.addToCartAnalytics(response);
                }
                else {
                    let status = cartAPIError[0].code;
                    const errTemp = { "ok": false, "status": status };
                    this.setState({ errorObj: errTemp });
                    this.state.toggleErrorModal(errTemp);
                }
            })
            .catch(err => {
                this.setState({ errorObj: err });
                this.state.toggleErrorModal(err);
            });
    }
    addToCart = () => {
        if (this.state.skuNumber) {
            if (this.state.addToCartQty > 0) {
                this.cartAPIRequest();
            } else {
                // TODO: Make this also an error modal?
                this.setState(
                    { addToCartQty: 1 },
                    () => this.cartAPIRequest()
                );
            }
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

    addToCartAnalytics = (response) => {
        const localStore = new LocalStore();
        const cartId = loginStatus.state() ? localStore.getCartId() : localStore.getGUID();

        const addToCartModel = {
            addContext: this.props.analyticsConfig.context,
            name: this.props.analyticsConfig.name,
            price: this.props.analyticsConfig.price,
            quantity: this.state.addToCartQty.toString(),
            sku: this.state.skuNumber,
            cartId
        };

        if (typeof response == 'boolean' || response.statusCode === 'success') {
            addToCartModel.success = response.toString();
        }

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
        const { placeholder, quantityDatalocator, qtyLabel, addToCartBtnDatalocator, addToCartLabel } = this.props;
        return (
            <>
                <form>
                    <input
                        className="cmp-sku-details__quantity"
                        placeholder={placeholder}
                        value={this.state.addToCartQty}
                        onChange={this.skuQuantityInput}
                        onKeyPress={this.skuRemoveNegative}
                        data-locator={quantityDatalocator}
                        aria-label={qtyLabel}
                    />
                </form>
                <a className={`cmp-button ${!this.state.skuNumber.trim() && 'disabled'}`} onClick={() => this.addToCart()} data-locator={addToCartBtnDatalocator}>
                    {addToCartLabel}
                </a>
            </>
        )
    }

}

AddToCart.defaultProps = {
    addToCartQty: null,
    onRef: () => { },
    skuResponse: () => { },
    addToCartLabel: '',
    qtyLabel: '',
    placeholder: 'Qty',
    quantityDatalocator: 'input-sku-qty',
    addToCartBtnDatalocator: 'link-add-to-cart'
}

export default AddToCart;