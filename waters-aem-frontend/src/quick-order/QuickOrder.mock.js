const props = {
    buttonLabel: 'ADD TO CART',
    addToCartPlaceHolder: 'SKU Number',
    addToCartUrl: 'https://internal-api-dev.waters.com/dev-waters-cart-proxy-api-v1/{localeCountry}/{localeLanguage}/users/{userType}/carts/{guid}/entries',
    multipleItemsLabel: 'Add Multiple Items',
    multipleItemsLink: 'https://dev-ordercart.waters.com/store/us/en/quick-order',
    addItemsIcon: '/content/dam/waters/en/brand-assets/icons/add.svg',
    multipleItemsIcon: '/content/dam/waters/en/brand-assets/icons/multiple.svg',
    showLabel: false,
    titleText: '',
    price: '',
    skuConfig: {
        modalInfo: {},
        skuInfo: { partNumberLabel: 'SKU' }
    },
    isInHeader: false,
    errorMsg:'',
    qtyPlaceholder:'',
    skuDatalocator: 'input-quick-order-sku',
    quantityDatalocator:'input-sku-qty',
    addToCartBtnDatalocator: 'link-add-to-cart',
    addMultipleItemsDatalocator:'link-quick-order-add-multiple-item'
}

export default props;