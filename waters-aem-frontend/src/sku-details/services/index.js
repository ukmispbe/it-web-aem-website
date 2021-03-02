import 'whatwg-fetch';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import { fetchData } from '../../utils/serviceFunctions';
import {
    getCountryCode,
    getLanguage,
    getUserId,
    isEprocurementUser,
    getEprocUserCountryCode,
    getEprocUserLanguage
} from '../../utils/userFunctions';

const availabilityUrlRequest = (url, countryCode, partNo) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{countryCode}', isEprocurementUser() ? getEprocUserCountryCode().toUpperCase() : countryCode);
    return url;
}

const priceUrlRequest = (endpoint, sku, soldToId, salesOrg) => {
    let url;
    return url = `${endpoint}?productNumber=${sku}&customerNumber=${soldToId}&salesOrg=${salesOrg}`;
}



export const getCustPricingUrl = (url, sku, userInfo, fields) => {
//https://api-sbox.waters.com/dev-waters-product-exp-api-v1/api/products/prices?productNumber=176001125&customerNumber=anonymous&fields=DEFAULT
//https://api-sbox.waters.com/dev-waters-product-exp-api-v1/api/products/prices?productNumber=176003102&customerNumber=UqgJ47QF9iB5GmN0Gprxxg==&salesOrg=US01
    let customerNumber = userInfo && userInfo.soldToId ? userInfo.soldToId : 'anonymous';
    let custUrl = `${url}?productNumber=${sku}&customerNumber=${customerNumber}`;

    if (userInfo && userInfo.salesOrg) { 
        let salesOrg = userInfo.salesOrg;
        return url = custUrl + `&salesOrg=${salesOrg}`;
    } else {
        fields = fields.toUpperCase();
        return url = custUrl + `&fields=${fields}`;
    }
}

const addToCartUrlRequest = (url, partNo, quantity, cartId) => {
    let userId = getUserId();
    userId = userId !== '' ? userId : 'anonymous';

    url = url
        .replace('{localeCountry}', isEprocurementUser() ? getEprocUserCountryCode().toLowerCase() : getCountryCode())
        .replace('{localeLanguage}', isEprocurementUser() ? getEprocUserLanguage().toLowerCase() : getLanguage())
        .replace('{userType}', userId)
        .replace('{guid}', cartId ? cartId : 'null')
        .concat('', '?successWithCart=true');
    url = cartId ? url : url.concat('', `&createCart=${!isEprocurementUser()}`);

    return url;
}

export async function addToCart(url, partNo, quantity, throwError) {
        // Check if partNo is a single product or an array of products
        let products = '';
        if (Array.isArray(partNo)) {
            products = {
                products: partNo,
            };
        } else {
            products = {
                products: [{
                    code: partNo,
                    quantity: quantity,
                }, ],
            };
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        }
        const localStore = new LocalStore();
        const cartId = loginStatus.state() ? localStore.getCartId() : localStore.getGUID();

        const urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
        const response = await fetchData(urlRequest, options, throwError);
        if (response.status === 200) {
            const json = await response.json();
            if (!cartId && json) {
                loginStatus.state() && json.cart.code && localStore.setCartId(json.cart.code);
                !loginStatus.state() && json.cart.guid && localStore.setGUID(json.cart.guid);
            }
            return json;

        } else if (response.status === 400) {
            const json = await response.json();
            // if cartId or guid is no longer valid
            if (json && json.errors && json.errors.length && json.errors[0].type === 'CartError') {
                loginStatus.state() && cartId && localStore.removeCartId();
                !loginStatus.state() && cartId && localStore.removeGUID();
                addToCart(url, partNo, quantity, throwError);
            } else {
                throwError({
                    status: 500,
                    ok: false
                });
                return response.status;
            }
        } else {
            throwError({
                status: 500,
                ok: false
            });
            return response.status;
        }
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

export async function getPricing(url, sku, userInfo, fields) {
    if (Array.isArray(sku)) {
        sku = sku.map(skuItem => skuItem.code).join(',');
    }
    const options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    }

    if (!userInfo) {
        options = {
            countryCode: getCountryCode(),
            language: getLanguage(),
            channel: 'ECOMM',
            ...options
        }
    }

    const urlRequest = getCustPricingUrl(url, sku, userInfo, fields);
    const response = await fetchData(urlRequest, options);
    const json = await response.json();

    if (response.status === 200) {
        json.status = 200;
    } else {
        json.status = response.status;
    }
    return json;
}


export const matchListItems = (skuListData, pricesAPIResults) => {
    let skuListItem = {
        code: skuListData
    }

    for (let i = 0; i < pricesAPIResults.length; i++) {
        if (skuListItem.code === pricesAPIResults[i].productNumber) {
            skuListItem.custPrice = pricesAPIResults[i].netPrice.formattedValue;
            skuListItem.custValue = pricesAPIResults[i].netPrice.value;
            skuListItem.listPrice = pricesAPIResults[i].basePrice.formattedValue;
            skuListItem.listValue = pricesAPIResults[i].basePrice.value;
            skuListItem.currencyCode = pricesAPIResults[i].netPrice.currencyCode;
        }
    }

    return skuListItem;
}