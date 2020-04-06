import screenSizes from './screenSizes';
import Ecommerce from './ecommerce';
import LoginStatus from './loginStatus';
import CheckOutStatus from './checkOutStatus';

const skuDetails = {
    element: function() {
        return document.querySelector('.cmp-sku-details');
    },
    exists: function() {
        return this.element() ? true : false;
    },
    discontinued: function() {
        const skuEcom = this.exists() ? this.element().querySelector('.cmp-sku-details__ecom') : null;
        return !skuEcom ? false : skuEcom.getAttribute('data-discontinued') === 'true' ? true : false;
    },
    okToConfigureSticky: function() {
        return this.exists() && Ecommerce.currentState() != Ecommerce.disabled;
    },
    preventSticky: function() {
        return screenSizes.isMobile() && this.discontinued();
    },
    allowSticky: function() {
        return !Ecommerce.isPartialState() ? true : LoginStatus.state() && CheckOutStatus.state();
    },
    stickyExists: function() {
        return this.exists() && !this.preventSticky() && this.allowSticky();
    }
};

export default skuDetails;