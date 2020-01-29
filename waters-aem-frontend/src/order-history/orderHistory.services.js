import 'whatwg-fetch';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderList: 'http://test-www.waters.com:8443/api/waters/user/v1/order/list?fromDate={fromDate}&toDate={toDate}&countryCode={countryCode}&email={email}',
        },
        throwError //callback 
    ) {
        this.isocode = isocode;
        this.orderHistoryOptions = orderHistory;
        this.throwError = throwError;
    }
    createOrderListRequest(fromDate, toDate, email) {
        const url = this.orderHistoryOptions.orderList
            .replace('{fromDate}', Date(fromDate))
            .replace('{toDate}', Date(toDate))
            .replace('{email}', email)
            .replace('{countryCode}', this.isocode);

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