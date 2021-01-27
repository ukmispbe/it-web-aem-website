const commerceConfigs = {
    "locale": "en",
    "commerceConfig": {
        "disabledIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "disabledLabel": "Disabled",
        "disabledText": "Online ordering is not available in your country.",
        "partialDisabledText": "Online ordering is limited to specific Distributors. Please sign in or ",
        "partialDisabledLinkText": "contact your sales representative.",
        "partialDisabledHref": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
        "eProcurementRestrictedText": "Online ordering is not available for your account. Please order through your procurement system.",
        "contactSupportLinkLabel": "Contact Waters",
        "contactSupportHref": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us"
    },
    "availabilityUrl": "https://prodservices.waters.com/api/waters/product/v1/availability/{partnumber}/{countryCode}",
    "pricingUrl": "https://api.waters.com/waters-product-exp-api-v1/api/products/prices",
    "addToCartUrl": "https://api.waters.com/waters-cart-proxy-api-v1/{localeCountry}/{localeLanguage}/users/{userType}/carts/{guid}/entries",
    "viewCartUrl": "https://www.waters.com/store/us/en/cart",
    "isCommerceApiMigrated": "true",
    "isCustomerPriceApiDisabled": "false",
    "isCheckoutDisabled": "false",
    "isQuoteDisabled": "false",
    "countryCode": "US",
    "isoCode": "en",
    "addToCartLabel": "Add to Cart",
    "qtyLabel": "Qty",
    "qtyAriaLabel": "Quantity",
    "defaultSkuQty": 1,
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
        "signinIcon": "/content/dam/waters/en/brand-assets/icons/user.svg",
        "unavailablePriceLabel": "Unavailable",
        "skuErrorMessage": [{
                "type": "text",
                "text": "This item is not available for sale.",
                "rightSpace": "true"
            },
            {
                "type": "link",
                "label": "Contact Waters",
                "title": "Contact Waters",
                "url": "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
                "blank": true,
                "rightSpace": "true"
            },
            {
                "type": "text",
                "text": "for more information.",
                "rightSpace": "false"
            }
        ]
    },
    "modalInfo": {
        "icon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
        "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
        "title": "Item Added to Shopping Cart",
        "buttons": [{
                "text": "View Shopping Cart",
                "action": "https://www.waters.com/store/us/en/cart"
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
    "setupFailure": {
        "icon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
        "requestFailureTitle": "Sorry, something went wrong.",
        "requestFailureMessage": "Please return to your procurement system and try again.",
        "sessionTimeoutTitle": "Your session has expired.",
        "sessionTimeoutMessage": "Please return to your procurement system and start a new session.",
        "buttons": [{
            "text": "Return to procurement system",
            "action": ""
        }]
    }
};

export default commerceConfigs;