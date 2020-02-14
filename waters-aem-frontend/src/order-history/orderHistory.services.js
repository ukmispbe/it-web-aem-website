import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&ponumber={poNumber}',
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

    getData(url){
        // Should be logic for all get requests we have to send
        return new Promise((resolve, reject) => {
            window
                .fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(this.checkFetch)
                .then(response => {
                    resolve(response.json());
                })
                .catch(err => {
                    this.throwError(err);
                    reject(err);
                });
        });
    }

    postData(url, options){
        return new Promise((resolve, reject) => {
            window
                .fetch(url, {...options})
                .then(this.checkFetch)
                .then(response => {
                    resolve(true);
                })
                .catch(err => {
                    this.throwError(err);
                    reject(err);
                });
        });
    }

    
    getOrderList(email, fromDate, toDate, poNumber) {
        return this.getData(this.createOrderListRequest(email, fromDate, toDate, poNumber));
    }
}

export default OrderHistoryService;