import 'whatwg-fetch';

class SkuService {
    constructor(
        // defaults that we override when constructing new instances of skuservices in the react components
        isocode = 'us',
        sku = {
            availability:
                'https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{isocode}',
            price:
                'https://dev-www.waters.com:8443/api/waters/product/v1/customerprice',
        },
        cart = {
            addToCart: 'https://dev-www.waters.com:8443/api/waters/product/v1/addtocart/{partnumber}/{quantity}',
            getCart: ''
        },
        throwError
    ) {
        this.isocode = isocode;
        this.skuOptions = sku;
        this.addToCartPath = cart.addToCart;
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
            .replace('{countryCode}', this.isocode);

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

    createCartUrl(partNo, quantity) {
        const url = this.addToCartPath
            .replace('{partnumber}', partNo)
            .replace('{quantity}', quantity);

        return url;
    }

    addToCart(partNo, quantity) {
        return new Promise((resolve, reject) => {
            window
                .fetch(this.createCartUrl(partNo, quantity), {
                    method: 'post',
                    credentials: 'include',
                    body: JSON.stringify({
                        partNumbers: partNo,
                        quantity: quantity,
                    }),
                })
                .then(response => {
                    // Response does not return data we need to pass back. If response.ok === true or status === 200
                    if (response.ok) {
                        resolve(true);
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
