const commerceConfigs = {
    "locale": "en",
    "commerceConfig": {
        "disabledIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "disabledLabel": "Disabled",
        "disabledText": "Online ordering is not available for your region. Please ",
        "disabledLinkText": "contact your sales representative.",
        "disabledHref": "",
        "partialDisabledText": "Online ordering is not available. Please ",
        "partialDisabledLinkText": "contact your sales representative.",
        "partialDisabledHref": ""
    },
    "availabilityUrl": "https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{countryCode}",
    "pricingUrl": "https://dev-www.waters.com:8443/api/waters/product/v1/customerprice/{partnumber}/{countryCode}",
    "addToCartUrl": "https://dev-www.waters.com:8443/api/waters/product/v1/addtocart/{partnumber}/{quantity}",
    "countryCode": "US",
    "isoCode": "en",
    "addToCartLabel": "ADD TO CART",
    "qtyLabel": "Qty",
    "showBreadcrumbs": false,
    "skuInfo": {
        "listPriceLabel": "List Price",
        "inStockLabel": "In Stock",
        "outOfStockLabel": "Out of Stock",
        "orderNowLabel": "Order Now",
        "orderSoonLabel": "Order Soon",
        "seeAvailabilityLabel": "See Availability",
        "shipsByLabel": "Ships by {shipByDate}",
        "onlyXInStockLabel": "Only {quantity} in stock",
        "discontinuedLabel": "Discontinued",
        "discontinuedNoReplacementCode": "The part number you selected is no longer available.",
        "discontinuedWithReplacementWithCode": "The part number you selected is no longer available, but there is a replacement. The replacement part number is ",
        "partNumberLabel": "SKU:",
        "contactWatersLabel": "Contact Waters",
        "contactWatersInfoLabel": "For Availability",
        "inStockIcon": "/content/dam/waters/en/brand-assets/icons/success.svg",
        "lowStockIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "outOfStockIcon": "/content/dam/waters/en/brand-assets/icons/x.svg",
        "refreshIcon": "/content/dam/waters/en/brand-assets/icons/refresh.svg",
        "discontinuedIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "nextIcon": "/content/dam/waters/en/brand-assets/icons/right.svg",
        "maxAmount": 999           
    },
    "modalInfo": {
        "icon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
        "title": "Item Added to Cart",
        "buttons": [
            {
                "text": "View Cart",
                "action": "https://wwwdt1.waters.com/waters/shoppingCart.htm"
            },
            {
                "text": "Continue Shopping",
                "action": "close"
            }
        ]
    },
    "errorInfo": {
        "serviceUnavailable": "Service Unavailable",
        "tryAgainLater": "Try again later",
        "anErrorHasOccurred": "An error has occurred",
        "wereSorry": "We're sorry, but an error has occurred and your item was not added to the cart. Please try again."
    }
};

export default commerceConfigs;