import 'whatwg-fetch';
import { signInRedirect } from '../utils/redirectFunctions';

class OrderHistoryService {
    constructor(
        orderHistory = {
            orderListPost: 'https://test-www.waters.com:8443/api/waters/order/v1/list'
        },
        throwError //callback 
    ) {
        this.orderHistoryOptions = orderHistory;
        this.throwError = throwError;
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
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401) {
                signInRedirect();
            }  else {
                return [];
            }
        })
        .catch(error => {
            this.throwError(error);
            reject(error);
        });
    };

    getOrderListPost(fromDate, toDate, poNumber, orderNumber) {
        let options = {};
        options.orderNumber = orderNumber;
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.toDate = toDate;
        options.maxRecs = "";

        return this.postData(this.orderHistoryOptions.orderListPost, options);
    }
}

export default OrderHistoryService;