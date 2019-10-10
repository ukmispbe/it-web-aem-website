const skuDetails = {
    element: document.querySelector('.cmp-sku-details'),
    exists: function() {
        return this.element ? true : false;
    },
    discontinued: function() {
        const skuEcom = this.exists() ? this.element.querySelector('.cmp-sku-details__ecom') : null;
        return !skuEcom ? false : skuEcom.getAttribute('data-discontinued') === 'true' ? true : false;
    }
};

export default skuDetails;