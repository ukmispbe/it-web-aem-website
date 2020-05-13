import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from "../../scripts/DigitalData";

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

    createLegacyCartUrl(partNo, quantity) {
        const url = this.cartOptions.addToCart
            .replace('{partnumber}', partNo)
            .replace('{quantity}', quantity);

        return url;
    }

    createCartUrl(partNo, quantity) {
        console.log(this.cartOptions.addToCart);
        // Get locale
        const country = DigitalData.country ? DigitalData.country.toLowerCase() : '';
        const language = DigitalData.language;
        // Get user id
        const store = new SessionStore();
        const userDetails = store.getUserDetails();
        const userId = loginStatus.state() && userDetails ? userDetails.userId : 'anonymous';

        console.log(country);

        const url = this.cartOptions.addToCart
            .replace('{localeCountry}', country)
            .replace('{localeLanguage}', language)
            .replace('{userType}', userId)
            .replace('{guid}', 'null')
            .concat('', '?createCart=true')

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
                    const json = response.json();
                    console.log(json);
                    resolve(json);
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

    addToCart(isCommerceApiMigrated, partNo, quantity) {
        if(isCommerceApiMigrated) {
            const options = {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify({
                    products: [
                        {
                            code: partNo,
                            quantity: quantity,
                        }
                    ]
                })
            }

            // Get cart id
            // TODO: get cartId from localStorage
            const cartId = '58aa6c9f-536b-4b7a-9ddc-52327b9047e8';


            return this.getData(this.createCartUrl(partNo, quantity));
        } else {
            const options = {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify({
                    partNumbers: partNo,
                    quantity: quantity,
                })
            }
            return this.postData(this.createLegacyCartUrl(partNo, quantity), options);
        }
    }
}

export default SkuService;