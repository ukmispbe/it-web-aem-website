import 'whatwg-fetch';

class SkuService {
    constructor(
        // defaults that we override when constructing new instances of skuservices in the react components
        isocode = 'us',
        sku = {
            availability:
                'https://dev-www.waters.com:8443/api/waters/product/v1/availability/{partnumber}/{isocode}',
            price:
                'https://dev-www.waters.com:8443/api/waters/product/v1/customerprice', //This is not hooked up yet and will have path parameters, too
        },
        cart = {
            addToCart: 'https://dev-www.waters.com:8443/api/waters/product/v1/addtocart/{partnumber}/{quantity}',
            getCart: ''
        },
        throwError //callback 
    ) {
        this.isocode = isocode;
        this.skuOptions = sku;
        this.cartOptions = cart;
        this.throwError = throwError;
    }



    createAvailabilityRequest(partNo) {
        const url = this.skuOptions.availability
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', this.isocode);

        return url;
    }
    
    createPriceRequest(partNo) {
        const url = this.skuOptions.price
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', this.isocode);

        return url;
    }

    createCartUrl(partNo, quantity) {
        const url = this.cartOptions.addToCart
            .replace('{partnumber}', partNo)
            .replace('{quantity}', quantity);

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
                .fetch(url, { method: 'GET' })
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


    // these functions are used by different views
    getAvailability(partNo) {
        return this.getData(this.createAvailabilityRequest(partNo));
    }

    getPrice(partNo) {
        return this.getData(this.createPriceRequest(partNo));
    }

    addToCart(partNo, quantity) {
        const options = {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({
                partNumbers: partNo,
                quantity: quantity,
            })
        }

        return this.postData(this.createCartUrl(partNo, quantity), options);
    }
}

export default SkuService;