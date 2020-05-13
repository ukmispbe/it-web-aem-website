import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from "../../scripts/DigitalData";

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response;
};

const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response;
};

const legacyAvailabilityUrlRequest = (url, countryCode, partNo) => {
    url = url
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', countryCode);

    return url;
}

const legacyPriceUrlRequest = (url, countryCode, partNo) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{countryCode}', countryCode);

    return url;
}

const legacyCartUrlRequest = (url, partNo, quantity) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{quantity}', quantity);

    return url;
}

const getCartId = () => {
    const store = new LocalStore();
    const cartId = store.getCartId() ? store.getCartId() : null;
//    cartId = '58aa6c9f-536b-4b7a-9ddc-52327b9047e8'
    return cartId;
}

const setCartId = (value) => {
    // TODO: try/catch exception from storage
    const store = new LocalStore();
    const cartId = store.setCartId(value);
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
    console.log(url);
    console.log(country);

    url = url
        .replace('{localeCountry}', getCountryCode())
        .replace('{localeLanguage}', getLanguage())
        .replace('{userType}', getUserId())
        .replace('{guid}', cartId ? cartId : 'null');

    url = cartId ? url : url.concat('', '?createCart=true');

    return url;
}

export async function getAvailability(url, countryCode, partNo) {
    console.log('availability', url)
    const urlRequest = legacyAvailabilityUrlRequest(url, countryCode, partNo);
    const response = await getData(urlRequest);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function getPrice(url, countryCode, partNo) {
    const urlRequest = legacyPriceUrlRequest(url, countryCode, partNo);
    const response = await postData(url, data);
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

        const cartId = getCartIdFromLocalStorage();

        const urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
        const response = await postData(urlRequest, data);
        const json = await response.json();
        return json;

    } else {
        const data = {
            partNumbers: partNo,
            quantity: quantity,
        }
        const urlRequest = legacyCartUrlRequest(url, partNo, quantity, cartId);
        const response = await postData(urlRequest, data);
        const json = await response.json();
        return json;
    }
}