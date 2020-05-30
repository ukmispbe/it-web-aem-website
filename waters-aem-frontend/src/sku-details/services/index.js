import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from "../../scripts/DigitalData";

const fetchData = async (url, options, throwError) => {
    return new Promise((resolve, reject) => {
            fetch(url, {...options})
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                throwError(err);
                reject(err);
            });
    });
};

const availabilityUrlRequest = (url, countryCode, partNo) => {
    url = url
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', countryCode);

    return url;
}

const priceUrlRequest = (url, countryCode, partNo) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{countryCode}', countryCode);

    return url;
}

const legacyAddToCartUrlRequest = (url, partNo, quantity) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{quantity}', quantity);

    return url;
}

const getCountryCode = () => {
    return DigitalData.country ? DigitalData.country.toLowerCase() : '';
}

const getLanguage = () => {
    return DigitalData.language;
}

const getUserId = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    const userId = loginStatus.state() && userDetails ? userDetails.userId : 'anonymous';
    return userId;
}

const addToCartUrlRequest = (url, partNo, quantity, cartId) => {
    url = url
        .replace('{localeCountry}', getCountryCode())
        .replace('{localeLanguage}', getLanguage())
        .replace('{userType}', getUserId())
        .replace('{guid}', cartId ? cartId : 'null')
        .concat('', '?successWithCart=true');
    url = cartId ? url : url.concat('', '&createCart=true');

    return url;
}

export async function getAvailability(url, countryCode, partNo) {
    const options = {
        method: 'GET',
        credentials: 'include'
    }
    const urlRequest = availabilityUrlRequest(url, countryCode, partNo);
    const response = await fetchData(urlRequest, options);
    const json = await response.json();
    return json;
}

export async function getPrice(url, countryCode, partNo) {
    const options = {
        method: 'GET',
        credentials: 'include'
    }
    const urlRequest = priceUrlRequest(url, countryCode, partNo);
    const response = await fetchData(urlRequest, options);
    const json = await response.json();
    return json;
}

export async function addToCart(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    if(isCommerceApiMigrated === 'true' || isCommerceApiMigrated === true) {
        // Check if partNo is a single product or an array
        let products = '';
        if(Array.isArray(partNo)) {
            products = JSON.stringify({
                                       products: partNo
                                   })
        } else {
            products = JSON.stringify({
                                       products: [
                                           {
                                               code: partNo,
                                               quantity: quantity,
                                           }
                                       ]
                                   })
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: products
        }
        const localStore = new LocalStore();
        const cartId = loginStatus.state() ? localStore.getCartId() : localStore.getGUID();

        const urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
        const response = await fetchData(urlRequest, options, throwError);
        if(response.status === 200) {
            const json = await response.json();
            if(!cartId && json) {
                loginStatus.state() && json.cart.code && localStore.setCartId(json.cart.code);
                !loginStatus.state() && json.cart.guid && localStore.setGUID(json.cart.guid);
            }
            return json;

        } else if(response.status === 400) {
            const json = await response.json();
            // if cartId or guid is no longer valid
            if(json && json.errors && json.errors.length && json.errors[0].type === 'CartError') {
                loginStatus.state() && cartId && localStore.removeCartId();
                !loginStatus.state() && cartId && localStore.removeGUID();
                addToCart(isCommerceApiMigrated, url, partNo, quantity, throwError);
            }
            else{
                throwError({status: 500, ok: false});
                return response.status;
            }
        } else {
            throwError({status: 500, ok: false});
            return response.status;
        }

    } else {

        const options = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                partNumbers: partNo,
                quantity: quantity,
            })
        }
        const urlRequest = legacyAddToCartUrlRequest(url, partNo, quantity);
        const response = await fetchData(urlRequest, options, throwError);
        const json = await response.json();
        return json;
    }
}