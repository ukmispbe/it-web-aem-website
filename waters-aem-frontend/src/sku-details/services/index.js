import 'whatwg-fetch';
import SessionStore from '../../stores/sessionStore';
import LocalStore from '../../stores/localStore';
import loginStatus from '../../scripts/loginStatus';
import DigitalData from '../../scripts/DigitalData';
import { fetchData } from '../../utils/ServiceFunctions';

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

const availabilityUrlRequest = (url, countryCode, partNo) => {
    url = url
            .replace('{partnumber}', partNo)
            .replace('{countryCode}', countryCode);

    return url;
}

const priceUrlRequest = (endpoint, sku) => {
    let url;
    return url = `${endpoint}?productNumber=${sku}&customerNumber=${getUserId()}`;
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

export async function addToCart(isCommerceApiMigrated, url, partNo, quantity) {
    if(isCommerceApiMigrated === 'true') {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products: [
                    {
                        code: partNo,
                        quantity: quantity,
                    }
                ]
            })
        }
        const localStore = new LocalStore();
        const cartId = loginStatus.state() ? localStore.getCartId() : localStore.getGUID();

        const urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
        const response = await fetchData(urlRequest, options);
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
                addToCart(isCommerceApiMigrated, url, partNo, quantity);
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
        const response = await fetchData(urlRequest, options);
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
    // Uncomment and remove tempJson when API is ready
    // const response = await fetchData(urlRequest, options);
    // const json = await response.json();
    // return json;

    //temp list for 186007878,6060920,176003110,176003111,176003112,176003109,176003135,176003136,176003137,176003134,176003083,176003084,176003068,176001375,176001398,186008068,186008066,186008065,176003688,176003689,176001235,176001519,176003090,186003836,186003820,186008304
    let tempJson = [{
    		productNumber: "186007878",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "428.00",
    			formattedValue: "$428.00",
    		},
    	},
    	{
    		productNumber: "6060920",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "890.00",
    			formattedValue: "$890.00",
    		},
    	},
    	{
    		productNumber: "176003110",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4704.00",
    			formattedValue: "$4,704.00",
    		},
    	},
    	{
    		productNumber: "176003111",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4994.00",
    			formattedValue: "$4,994.00",
    		},
    	},
    	{
    		productNumber: "176003112",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "5164.00",
    			formattedValue: "$5,164.00",
    		},
    	},
    	{
    		productNumber: "176003109",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4509.00",
    			formattedValue: "$4,509.00",
    		},
    	},
    	{
    		productNumber: "176003135",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4049.00",
    			formattedValue: "$4,049.00",
    		},
    	},
    	{
    		productNumber: "176003136",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4504.00",
    			formattedValue: "$4,504.00",
    		},
    	},
    	{
    		productNumber: "176003137",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "4489.00",
    			formattedValue: "$4,489.00",
    		},
    	},
    	{
    		productNumber: "176003134",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "3974.00",
    			formattedValue: "$3,974.00",
    		},
    	},
    	{
    		productNumber: "176003083",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "1076.94",
    			formattedValue: "$1,076.94",
    		},
    	},
    	{
    		productNumber: "176003084",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "1155.49",
    			formattedValue: "$1,155.49",
    		},
    	},
    	{
    		productNumber: "176003068",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "3357.12",
    			formattedValue: "$3,357.12",
    		},
    	},
    	{
    		productNumber: "176001375",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "2442.00",
    			formattedValue: "$2,442.00",
    		},
    	},
    	{
    		productNumber: "176001398",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "2442.00",
    			formattedValue: "$2,442.00",
    		},
    	},
    	{
    		productNumber: "186008068",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "322.00",
    			formattedValue: "$322.00",
    		},
    	},
    	{
    		productNumber: "186008066",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "366.00",
    			formattedValue: "$366.00",
    		},
    	},
    	{
    		productNumber: "186008065",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "339.00",
    			formattedValue: "$339.00",
    		},
    	},
    	{
    		productNumber: "176003688",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "684.00",
    			formattedValue: "$684.00",
    		},
    	},
    	{
    		productNumber: "176003689",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "631.00",
    			formattedValue: "$631.00",
    		},
    	},
    	{
    		productNumber: "176001235",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "3150.00",
    			formattedValue: "$3,150.00",
    		},
    	},
    	{
    		productNumber: "176001519",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "1005.00",
    			formattedValue: "$1,005.00",
    		},
    	},
    	{
    		productNumber: "176003090",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "1687.00",
    			formattedValue: "$1,687.00",
    		},
    	},
    	{
    		productNumber: "186003836",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "721.00",
    			formattedValue: "$721.00",
    		},
    	},
    	{
    		productNumber: "186003820",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "149.00",
    			formattedValue: "$149.00",
    		},
    	},
    	{
    		productNumber: "186008304",
    		customerNumber: "154488",
    		netPrice: {
    			currencyCode: "USD",
    			value: "350.00",
    			formattedValue: "$350.00",
    		},
    	},
    ];

    return tempJson;
}

export const matchListItems = (skuListData, pricesAPIResults) => {
    skuListData.forEach(skuListItem => {
        for (let i = 0; i < pricesAPIResults.length; i++) {
            if(skuListItem.code === pricesAPIResults[i].productNumber) {
                skuListItem.custPrice = pricesAPIResults[i].netPrice.formattedValue;
                skuListItem.unformattedPrice = pricesAPIResults[i].netPrice.value;
                skuListItem.currencyCode = pricesAPIResults[i].netPrice.currencyCode;
            } 
        }
    });

    return skuListData;
}