import 'whatwg-fetch';

class SkuService {
    constructor(
        isocode = 'us',
        sku = {
            availability:
                'https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{isocode}',
            price:
                'https://dev-www.waters.com:8443/api/waters/product/v1/customerprice',
        },
        addToCart = 'https://www.waters.com/waters/ajax.htm?handler=shoppingHandler&action=processExternalCart',
        throwError
    ) {
        this.isocode = isocode;
        this.skuOptions = sku;
        this.addToCartPath = addToCart;
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
                })
                .catch(err => {
                    this.throwError(err);
                    reject(err);
                });
        });
    }

    createAvailabilityRequest(partNo) {
        const url = this.skuOptions.availability
            .replace('{partnumber}', partNo)
            .replace('{isocode}', this.isocode);

        return url;
    }

    getPrice(partNo) {
        return new Promise((resolve, reject) => {
            window
                .fetch(this.createPriceRequest(partNo))
                .then(response => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        this.throwError(response);
                        reject(response);
                    }
                })
                .catch(err => {
                    this.throwError(err);
                    reject(err);
                });
        });
    }

    createPriceRequest(partNo) {
        const url = this.skuOptions.price
            .replace('{partnumber}', partNo)
            .replace('{countrycode}', this.isocode);

        return url;
    }

    addToCart(partNo, quantity) {
        const path = this.addToCartPath;
        return new Promise((resolve, reject) => {
            window
                .fetch(path, {
                    method: 'post',
                    credentials: 'include',
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
                })
                .catch(err => {
                    this.throwError(err);
                    reject(err);
                });
        });
    }
}

export default SkuService;
