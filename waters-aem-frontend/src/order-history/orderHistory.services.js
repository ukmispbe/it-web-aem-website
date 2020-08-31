import 'whatwg-fetch';
import { signInRedirect } from '../utils/redirectFunctions';

class OrderHistoryService {
    constructor(
        url = "https://stgservices.waters.com/api/waters/order/v1/list"
    ) {
        this.url = url;
    }

    postData(url, options, setError) {
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
                setError(response.status);
                signInRedirect();
            }
        })
        .catch(error => {
            setError(error);
        });
    };

    getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
        let options = {};
        options.orderNumber = orderNumber;
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.maxRecs = "";

        return this.postData(url, options, setError);
    }
}

export default OrderHistoryService;