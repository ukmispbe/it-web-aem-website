const commerceConfigs = {
    "locale": "en",
    "commerceConfig": {
        "disabledIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "disabledLabel": "Disabled",
        "disabledText": "Online ordering is not available for your region. Please ",
        "disabledLinkText": "contact your sales representative.",
        "disabledHref": "/content/waters/us/en/about-waters/contact-waters.html",
        "partialDisabledText": "Online ordering is not available. Please ",
        "partialDisabledLinkText": "contact your sales representative.",
        "partialDisabledHref": "/content/waters/us/en/about-waters/contact-waters.html"
    },
    "availabilityUrl": "https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{countryCode}",
    "pricingUrl": "https://api-sbox.waters.com/dev-waters-product-exp-api-v1/api/products/prices",
    "addToCartUrl": "https://api-sbox.waters.com/dev-waters-cart-proxy-api-v1/{localeCountry}/{localeLanguage}/users/{userType}/carts/{guid}/entries",
    "viewCartUrl": "https://www.waters.com/store/{localeCountry}/{localeLanguage}/cart",
    "isCommerceApiMigrated": "true",
    "countryCode": "US",
    "isoCode": "en",
    "addToCartLabel": "Add to Cart",
    "qtyLabel": "Qty",
    "showBreadcrumbs": false,
    "skuInfo": {
        "listPriceLabel": "List Price",
        "custPriceLabel": "Your Price",
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
        "noThumbnailImage": "/content/dam/waters/en/brand-assets/thumbnails/product-thumbnail.png",
        "maxAmount": 999,
        "signInText1": "Sign in",
        "signInText2": "to view ",
        "signInText3": "Your Price",
        "signinIcon": "/content/dam/waters/en/brand-assets/icons/user.svg"
    },
    "modalInfo": {
        "icon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
        "title": "Item Added to Cart",
        "buttons": [
            {
                "text": "View Cart",
                "action": "https://dev-cart.waters.com/store/us/en/cart"
            },
            {
                "text": "Continue Shopping",
                "action": "close"
            }
        ]
    },
    "errorInfo": {
        "icon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
        "title": "Sorry, something went wrong.",
        "serviceUnavailable": "Service Unavailable",
        "tryAgainLater": "Try again later",
        "anErrorHasOccurred": "An error has occurred",
        "wereSorry": "An error has occurred and your item was not added to the Shopping Cart. Please try again."
    },
    "setupFailure":{
        "icon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "requestFailureTitle": "Sorry, something went wrong.",
        "requestFailureMessage": "Please return to your procurement system and try again.",
        "sessionTimeoutTitle": "Your session has expired.",
        "sessionTimeoutMessage": "Please return to your procurement system and start a new session.",
        "buttons": [
            {
                "text": "RETURN TO PROCUREMENT SYSTEM",
                "action": ""
            }
        ]
    }
};

export default commerceConfigs;