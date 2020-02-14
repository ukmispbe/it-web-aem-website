import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&ponumber={poNumber}',
            orderListPost: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com',
            orderDetails: ''
        },
        throwError //callback 
    ) {
        this.orderHistoryOptions = orderHistory;
        this.throwError = throwError;
    }
    
    createOrderListRequest(email, fromDate, toDate, poNumber) {
        let url = this.orderHistoryOptions.orderList
            .replace('{email}', email)
            .replace('{poNumber}', poNumber)

        return url;
    } 

    checkFetch(response) {
        if (!response.ok){
            throw response;
        }
        return response;
    }

    postData(url, options) {
        return fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
        .then(response => response.json())
        .catch(error => {
            this.throwError(error);
            reject(error);
        });
    };

    getOrderListPost(email, fromDate, toDate, poNumber) {
        let options = {};
        options.orderNumber = "";
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.toDate = toDate;
        options.maxRecs = "";

        console.log(options);

        return this.postData(this.orderHistoryOptions.orderListPost, options);
    }
}

export default OrderHistoryService;