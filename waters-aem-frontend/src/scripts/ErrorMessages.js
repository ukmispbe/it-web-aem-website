let messageObj = {};

function ErrorMessages (errorObj) {
    const skuDetailsConfig = JSON.parse(
        document.getElementById('commerce-configs-json').innerHTML
    );

    switch (errorObj.status) {
        case 500: 
            messageObj = {
                serviceUnavailable:     skuDetailsConfig.errorInfo.serviceUnavailable,
                tryAgainLater:          skuDetailsConfig.errorInfo.tryAgainLater,
                img:                    "lowStockIcon",
                anErrorHasOccurred:     skuDetailsConfig.errorInfo.anErrorHasOccurred,
                wereSorry:              skuDetailsConfig.errorInfo.wereSorry,
                modalImage:             skuDetailsConfig.skuInfo.lowStockIcon
            }
            break;      
        default:  
            messageObj = {
                serviceUnavailable:     skuDetailsConfig.errorInfo.serviceUnavailable,
                tryAgainLater:          skuDetailsConfig.errorInfo.tryAgainLater,
                img:                    "lowStockItem",
                anErrorHasOccurred:     skuDetailsConfig.errorInfo.anErrorHasOccurred,
                wereSorry:              skuDetailsConfig.errorInfo.wereSorry,
                modalImage:             skuDetailsConfig.skuInfo.lowStockIcon
            }
            break;
    }
    return messageObj;
}

export default {
    ErrorMessages: ErrorMessages
}