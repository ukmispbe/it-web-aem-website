import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            // works orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&ponumber=TEST&fromDate=1573689600000&toDate=1574035200000',
            // works orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&country=US&ordernumber=15739756&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&country=US&fromDate=1573689600000&toDate=1574035200000',
            // doesn't work orderList: orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?country=US&fromDate=1573689600000&toDate=1574035200000',
            

            
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email=wendy_batista@waters.com&ponumber=TEST&fromDate=1573689600000&toDate=1574035200000',
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&fromDate={fromDate}&toDate={toDate}&country={countryCode}&ordernumber={orderNumber}',
            orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&{fromdate}&{todate}',
            //orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&fromDate={fromDate}&toDate={toDate}&country={countryCode}',
            orderDetails: ''
        },
        throwError //callback 
    ) {
        this.orderHistoryOptions = orderHistory;
        this.throwError = throwError;
    }
    
    createOrderListRequest(email, fromDate, toDate, countryCode, ponumber) {
        let url = this.orderHistoryOptions.orderList
            .replace('{email}', email)
            .replace('{fromdate}', jQuery.param({"fromdate":"20190212"}))
            .replace('{todate}', jQuery.param({"todate":"20200212"}))
            //.replace('{ponumber}', ponumber)
            //.replace('{orderNumber}', orderNumber)
            // .concat('&ordernumber=', orderNumber)

             // orderNumber !==undefined ? url.concat('&ordernumber=', orderNumber) : ''

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

    
    getOrderList(email, fromDate, toDate, countryCode, poNumber) {
        return this.getData(this.createOrderListRequest(email, fromDate, toDate, countryCode, poNumber));
    }
}

export default OrderHistoryService;