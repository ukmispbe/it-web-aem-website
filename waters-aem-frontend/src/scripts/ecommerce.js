const partial = 'PARTIAL_ENABLED';
const full = 'FULL_ENABLED';
const disabled = 'DISABLED';
const commerceCheckoutDisabled = "COMMERCE_CHECKOUT_DISABLED";

const currentState = () => {
    const footer = document.querySelector('#footer');
    let currentState = '';
    if (footer) { 
        currentState = footer.dataset.ecommerceState;
    }
    return currentState;        
};

const isPartialState = () => {
    return currentState() == partial;
};

const isFullState = () => {
    return currentState() == full;
};

const isDisabledState = () => {
    return currentState() == disabled;
};

const isCommerceCheckoutDisabledState = () => {
    return currentState() == commerceCheckoutDisabled;
};
    
export default {currentState, partial, full, disabled, commerceCheckoutDisabled, isPartialState, isFullState, isDisabledState, isCommerceCheckoutDisabledState};