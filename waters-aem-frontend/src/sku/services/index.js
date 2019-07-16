import 'whatwg-fetch';

class SkuService {
    constructor(
        isocode,
        sku = {
            path: 'https://dev-www.waters.com:8443/api/waters/',
            endpoints: {
                availability: 'availability/',
                customerPrice: 'customerprice/',
            },
        },
        addToCart = {
            path:
                'https://www.waters.com/waters/ajax.htm?handler=shoppingHandler&action=processExternalCart',
        },
        throwError
    ) {
        this.isocode = isocode;
        this.skuOptions = sku;
        this.addToCartOptions = addToCart;
        this.throwError = throwError;
    }

    getAvailability(partNo) {
        return new Promise((resolve, reject) => {
            window
                .fetch(this.createAvailabilityRequest(partNo))
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        this.throwError(response);
                        reject(response);
                    }
                });
        });
    }

    createAvailabilityRequest(partNo) {
        const path = `${this.skuOptions.path}/product/v1/`;
        const endpoint = this.skuOptions.endpoints.availability;
        const request = `${path}${endpoint}/${partNo}/${this.isocode}`;

        return request;
    }

    getPrice(partNo) {
        return new Promise((resolve, reject) => {
            window.fetch(this.createPriceRequest(partNo)).then(response => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    this.throwError(response);
                    reject(response);
                }
            });
        });
    }

    createPriceRequest(partNo) {
        const path = `${this.skuOptions.path}/product/v1/`;
        const endpoint = this.skuOptions.endpoints.customerPrice;
        const request = `${path}${endpoint}/${partNo}/${this.isocode}`;

        return request;
    }

    addToCart(partNo, quantity) {
        const path = this.addToCartOptions.path;
        return new Promise((resolve, reject) => {
            window
                .fetch(path, {
                    method: 'post',
                    body: JSON.stringify({
                        partNumbers: partNo,
                        quantity: quantity,
                    }),
                })
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        this.throwError(response);
                        reject(response);
                    }
                });
        });
    }
}

export default SkuService;
