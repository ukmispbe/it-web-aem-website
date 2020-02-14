import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&ponumber={poNumber}',
            ordeListPost: 'https://test-www.waters.com:8443/api/waters/order/v1/list',
            // works orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&ponumber=TEST&fromDate=1573689600000&toDate=1574035200000',
            // works orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&country=US&ordernumber=15739756&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&country=US&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?country=US&fromDate=1573689600000&toDate=1574035200000',



            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&ponumber=TEST&fromDate=1573689600000&toDate=1574035200000',
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&fromDate={fromDate}&toDate={toDate}&country={countryCode}&ordernumber={orderNumber}',
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&fromdate={fromDate}&todate={toDate}&ponumber={ponumber}',
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&fromDate={fromDate}&toDate={toDate}&country={countryCode}',
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

        return this.postData(this.createOrderListRequest(url, options));
    }

    getOrderList(email, fromDate, toDate, poNumber) {
        return this.getData(this.createOrderListRequest(email, fromDate, toDate, poNumber));
    }
}

export default OrderHistoryService;