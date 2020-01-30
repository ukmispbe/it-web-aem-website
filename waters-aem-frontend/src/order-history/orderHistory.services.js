import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderList: 'https://test-www.waters.com:8443/api/waters/order/v1/list?email={email}&ponumber=TEST&fromDate={fromDate}&toDate={toDate}'
        },
        throwError //callback 
    ) {
        this.orderHistoryOptions = orderHistory;
        this.throwError = throwError;
    }
    createOrderListRequest(fromDate='1573689600000', toDate='1574035200000', email='wendy_batista@waters.com') {
        const url = this.orderHistoryOptions.orderList
            .replace('{fromDate}', Date(fromDate))
            .replace('{toDate}', Date(toDate))
            .replace('{email}', email)

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
                .fetch(url)
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
}

export default OrderHistoryService;