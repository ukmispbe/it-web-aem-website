export default {
    title: "My Account",
    body: "Find all the resources and tools you need to manage your Waters account online. ",
    tiles: [{
            title: "Account Information",
            icon: "/content/dam/waters/en/brand-assets/icons/user.svg",
            requiresEcommerce: "false",
            isHiddenForEprocUser: "false",
            links: [{
                    text: "Profile",
                    url: "#profile",
                    linkName: "Profile",
                },
                {
                    text: "Password",
                    url: "#changepassword",
                    linkName: "Password",
                },
            ],
        },
        {
            title: "Orders",
            icon: "/content/dam/waters/en/brand-assets/icons/package.svg",
            requiresEcommerce: "true",
            isHiddenForEprocUser: "true",
            links: [{
                    text: "Order History",
                    url: "#orderhistory",
                    linkName: "Order History",
                },
                {
                    text: "Order History",
                    url: "#orderdetails",
                    isHidden: "true",
                },
            ],
        },
        {
            title: "Additional Links",
            icon: "/content/dam/waters/en/brand-assets/icons/link.svg",
            requiresEcommerce: "false",
            isHiddenForEprocUser: "false",
            links: [{
                    text: "My Implementations",
                    url: "https://www.waters.com/waters/nav.htm?cid=2243096",
                },
                {
                    text: "Support Plans",
                    url: "https://www.waters.com/waters/nav.htm?cid=2243124",
                },
                {
                    text: "Contact Waters",
                    url: "https://www.waters.com/waters/localeRedirect.htm?type=contact_us",
                },
            ],
        },
    ],
    breadcrumbs: {
        routes: {
            myAccount: {
                title: "My Account",
                backLinkTitle: "Back to My Account",
            },
            profile: {
                title: "Profile",
            },
            changePassword: {
                title: "Change Password",
            },
            orderHistory: {
                title: "Order History",
                backLinkTitle: "Back to Order History",
            },
        },
        backIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
    },
    myProfile: {
        userDetailsUrl: "https://devservices.waters.com:8443/api/waters/user/v1/details",
        soldToDetailsUrl: "https://api-sbox.waters.com/dev-waters-user-exp-api-v1/api/users",
        submitEndpoint: "https://devservices.waters.com:8443/api/waters/user/v1/update/profile",
        personalConfigId: "json-config--cmp-detail-tiles--personal",
        addressConfig: {
            abstractConfig: "json-config--cmp-detail-tiles--address",
            configs: [
                "json-config--cmp-detail-tiles--shipping",
                "json-config--cmp-detail-tiles--billing",
            ],
        },
    },
    changePassword: {
        config: "json-config--cmp-detail-tiles--changePassword",
    },
    orderHistory: {
        fetchEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/list",
        title: "Order History",
        resultsText: "Showing {startResults}-{endResults} of {count} Orders",
        noOrdersFoundTitle: "Sorry, no orders found.",
        noOrdersFoundText: "Check back after you shop on Waters.com for order information and shipment tracking.",
        shopAllTitle: "Shop All Products",
        shopAllHref: "/content/waters/us/en/shop/shop-all-products.html",
        orderText: "Order Number: ",
        itemsText: " Items",
        shipment: {
            shipmentText: "Shipment",
            trackShipmentText: "Track Shipment",
            openLabel: "In Progress",
            partialLabel: "Partially Shipped",
            completeLabel: "Shipped",
            completeShippedLabel: "Shipped on ",
        },
        icons: {
            openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
            partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
            completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
        },
        tabs: [{
            name: "All Orders"
        }, {
            name: "Open Orders"
        }],
        orderfilters: {
            allOrders: "All Orders",
            openOrders: "Open Orders",
            downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
        },
        timeperiod: {
            last30days: "Last 30 Days",
            last6months: "Last 6 Months",
            last12months: "Last 12 Months",
            showall: "Show All",
            downIcon: "/content/dam/waters/en/brand-assets/icons/down.svg",
        },
    },
    orderDetails: {
        fetchDetailsEndPoint: "https://devservices.waters.com:8443/api/waters/order/v1/details",
        fetchItemsEndPoint: "https://devservices.waters.com:8443/api/waters/search",
        orderHistory: "Order History",
        orderDetails: "Order Details",
        resultsText: "Showing {startResults}-{endResults} of {count} Shipments",
        orderNotFoundErrorTitle: "Sorry, order not found.",
        serviceErrorNotificationTitle: "Sorry, something went wrong.",
        serviceErrorNotificationText: "Please try again.",
        serviceErrorNotificationIcon: "/content/dam/waters/en/brand-assets/icons/attention.svg",
        orderNumber: "Order Number",
        shipTo: "Ship to",
        billTo: "Bill to",
        orderSummary: "Order Summary",
        paymentMethod: "Payment Method",
        shipmentMethod: "Shipment Method",
        subTotal: "Subtotal",
        items: "items",
        item: "item",
        shipping: "Shipping and Handling ",
        savings: "Savings",
        tax: "Tax",
        minusSign: "-",
        orderTotal: "Order Total",
        reorderTitle: "Reorder",
        paymentType: {
            purchaseOrder: {
                label: "PO",
                icon: "/content/dam/waters/en/brand-assets/icons/document.svg",
            },
            creditCard: {
                label: "Credit Card",
                icon: "/content/dam/waters/en/brand-assets/icons/creditcard.svg",
            },
        },
        shipment: {
            shipmentText: "Shipment",
            itemsText: "Items",
            itemText: "Item",
            trackShipmentText: "Track Shipment",
            openLabel: "In Progress",
            partialLabel: "Partially Shipped",
            completeLabel: "Shipped",
            completeShippedLabel: "Shipped on ",
        },
        icons: {
            openIcon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
            partialIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
            completeIcon: "/content/dam/waters/en/brand-assets/icons/success.svg",
        },
        modalInfo: {
            icon: "/content/dam/waters/en/brand-assets/icons/cart.svg",
            closeIcon: "/content/dam/waters/en/brand-assets/icons/close.svg",
            title: "Reorder all items?",
            isOrderDetails: true,
            buttons: [{
                    text: "Continue to Shopping Cart",
                    action: "https://wwwdt1.waters.com/waters/shoppingCart.htm",
                },
                {
                    text: "Cancel",
                    action: "close",
                },
            ],
            text: "This order will be added to your Shopping Cart",
        },
    },
};