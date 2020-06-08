import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from '../../scripts/DigitalData';
import { fetchData } from '../../utils/serviceFunctions';

const getCountryCode = () => {
    return DigitalData.country ? DigitalData.country.toLowerCase() : '';
}

const getLanguage = () => {
    return DigitalData.language;
}

const getUserId = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    const userId = loginStatus.state() && userDetails ? userDetails.userId : '';
    return userId;
}


const getSoldToId = () => {
	if(loginStatus.state()) {
		const store = new SessionStore();
		const soldToDetails = store.getSoldToDetails();

		let priorityAccount;
		let accountNumber = "";

		soldToDetails.map((soldTo) => {
			if(soldTo.default_soldTo === 1) {
				priorityAccount = soldTo;
			}
		});

		if (priorityAccount){
			accountNumber = priorityAccount.soldTo ? priorityAccount.soldTo : '';
		}

		return accountNumber;
	}

	return '';
}

const availabilityUrlRequest = (url, countryCode, partNo) => {
    url = url
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', countryCode);

    return url;
}

const priceUrlRequest = (endpoint, sku) => {
    let url;
    return url = `${endpoint}?productNumber=${sku}&customerNumber=${getSoldToId()}`;
}

const legacyAddToCartUrlRequest = (url, partNo, quantity) => {
    url = url
        .replace('{partnumber}', partNo)
        .replace('{quantity}', quantity);

    return url;
}

const addToCartUrlRequest = (url, partNo, quantity, cartId) => {
    let userId = getUserId();
    userId = userId !== '' ? userId : 'anonymous';

    url = url
        .replace('{localeCountry}', getCountryCode())
        .replace('{localeLanguage}', getLanguage())
        .replace('{userType}', userId)
        .replace('{guid}', cartId ? cartId : 'null')
        .concat('', '?successWithCart=true');
    url = cartId ? url : url.concat('', '&createCart=true');

    return url;
}

export async function addToCart(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    if(isCommerceApiMigrated === 'true' || isCommerceApiMigrated === true) {
        // Check if partNo is a single product or an array of products
        let products = '';
        if (Array.isArray(partNo)) {
			products = {
				products: partNo,
			};
			} else {
			products = {
				products: [
				{
					code: partNo,
					quantity: quantity,
				},
				],
			};
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
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

export async function getPricing(url, sku) {
    if (Array.isArray(sku)) {
        sku = sku.map(skuItem => skuItem.code).join(',');
    }

    const options = {
        method: 'GET',
        credentials: 'include'
    }

    const urlRequest = priceUrlRequest(url, sku);
    const response = await fetchData(urlRequest, options);
	const json = await response.json();

	if(json && json.errors && json.errors.length) {
		if (json.errors.code = "WAT_VALIDATION_400") {
			json.status = 400;
		} else if (json.errors.code = "WAT_HTTP_500") {
			json.status = 500;
		}
	} else {	
		json.status = 200;
	}
	return json;
}

export const matchListItems = (skuListData, pricesAPIResults) => {
let skuListItem = {
	code: skuListData
}
	for (let i = 0; i < pricesAPIResults.length; i++) {
		if(skuListItem.code === pricesAPIResults[i].productNumber) {
			skuListItem.custPrice = pricesAPIResults[i].netPrice.formattedValue;
			skuListItem.custValue = pricesAPIResults[i].netPrice.value;
			skuListItem.listPrice = pricesAPIResults[i].basePrice.formattedValue;
			skuListItem.listValue = pricesAPIResults[i].basePrice.value;
			skuListItem.currencyCode = pricesAPIResults[i].netPrice.currencyCode;
		} 
	}


    return skuListItem;
}