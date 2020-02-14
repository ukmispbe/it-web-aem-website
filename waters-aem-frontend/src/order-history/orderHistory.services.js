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
                .fetch(url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(options)
                })
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

    // async postData(url, options) {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(options)
    //     });
    
    //     return await response;
    // };

    getOrderListPost(email, fromDate, toDate, poNumber) {
        // {
        //     "orderNumber": "",
        //     "purchaseOrderNumber": "TEST",
        //     "fromDate": "2018-03-29T13:34:00.000",
        //     "toDate": "2018-03-29T13:34:00.000",
        //     "maxRecs": ""
        // }
        let options = {};
        options.orderNumber = "";
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.toDate = toDate;
        options.maxRecs = "";

        console.log(options);

        return this.postData(this.orderHistoryOptions.orderListPost, options);
    }

    getOrderList(email, fromDate, toDate, poNumber) {
        return this.getData(this.createOrderListRequest(email, fromDate, toDate, poNumber));
    }
}

export default OrderHistoryService;