import { fetch } from 'whatwg-fetch';

class OrderDetailsService {
    constructor(
        orderDetails = {
            orderListPost: 'https://test-www.waters.com:8443/api/waters/order/v1/list',
            orderDetails: ''
        },
        throwError //callback 
    ) {
        this.orderDetailsOptions = orderDetails;
        this.throwError = throwError;
    }

    checkFetch(response) {
        if (!response.ok){
            throw response;
        }
        return response;
    }

    getData(url) {
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => {
            this.throwError(error);
            reject(error);
        });
    };

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

    getOrderDetails(endpoint, id, setError) {
        const url = endpoint+id;
    
        const response = getData(url);
        const responseBody = response.json();
    
        if(response.status === 200) {
            return responseBody;
        } else {
            setError({status: response.status, code: responseBody.code});
        }
    }

    getShipmentItems(endpoint, id) {
        const url = endpoint+id;
        return getData(url)
            .then((res) => res.json())
    }
}

export default OrderDetailsService;