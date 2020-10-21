const props = {
        "config": {
               "fetchDetailsEndPoint": "https://stgservices.waters.com/api/waters/order/v1/details/",
               "fetchItemsEndPoint": "https://stgservices.waters.com/api/waters/order/v1/details/",
               "orderHistory": "Quote History",
               "orderDetails": "Quote Details",
               "orderNotFoundErrorTitle": "Sorry, quote not found.",
               "serviceErrorNotificationTitle": "Sorry, something went wrong.",
               "serviceErrorNotificationText": "Please try again.",
               "serviceErrorNotificationIcon": "/content/dam/waters/en/brand-assets/icons/attention.svg",
               "orderNumber": "Quote Number",
               "shipTo": "Ship to",
               "billTo": "Bill to",
               "orderSummary": "Quote Summary",
               "paymentMethod": "Payment Method",
               "shipmentMethod": "Shipment Method",
               "subTotal": "Subtotal",
               "items": "items",
               "shipping": "Shipping",
               "tax": "Tax",
               "orderTotal": "Quote Total",
               "paymentType": {
                 "purchaseOrder": {
                   "label": "PO",
                   "icon": "/content/dam/waters/en/brand-assets/icons/document.svg"
                 },
                 "creditCard": {
                   "label": "Credit Card",
                   "icon": "/content/dam/waters/en/brand-assets/icons/creditcard.svg"
                 }
               }
        }
    }

export default props;