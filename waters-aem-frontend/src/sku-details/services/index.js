import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from "../../scripts/DigitalData";

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
};

const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
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

const getCartId = () => {
    const store = new LocalStore();
    const cartId = store.getCartId() ? store.getCartId() : null;
    return cartId;
}

const setCartId = (value) => {
    // TODO: try/catch exception from storage
    const store = new LocalStore();
    const cartId = store.setCartId(value);
    return true;
}

const getGUID = () => {
    const store = new LocalStore();
    const cartId = store.getGUID() ? store.getGUID() : null;
    return cartId;
}

const setGUID = (value) => {
    // TODO: try/catch exception from storage
    const store = new LocalStore();
    const cartId = store.setGUID(value);
    return true;
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
    console.log(url, countryCode, partNo);
    const urlRequest = availabilityUrlRequest(url, countryCode, partNo);
    const response = await getData(urlRequest);
    const json = await response.json();
    return json;
}

export async function getPrice(url, countryCode, partNo) {
    const urlRequest = priceUrlRequest(url, countryCode, partNo);
    const response = await getData(urlRequest);
    const json = await response.json();
    return json;
}

export async function addToCart(isCommerceApiMigrated, url, partNo, quantity) {
    if(isCommerceApiMigrated) {
        const data = {
            products: [
                {
                    code: partNo,
                    quantity: quantity,
                }
            ]
        }

        const cartId = loginStatus.state() ? getCartId() : getGUID();
        const urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
        console.log(urlRequest);
        const response = await postData(urlRequest, data);
        const json = await response.json();
        if(!cartId && json) {
            loginStatus.state() && json.cart.code && setCartId(json.cart.code);
            !loginStatus.state() && json.cart.guid && setCartId(json.cart.guid);
        }
        console.log(json);
        return json;

    } else {
        const data = {
            partNumbers: partNo,
            quantity: quantity,
        }
        const urlRequest = legacyAddToCartUrlRequest(url, partNo, quantity);
        const response = await postData(urlRequest, data);
        const json = await response.json();
        return json;
    }
}