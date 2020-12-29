import { fetch } from 'whatwg-fetch';
import { getCategoryReferenceType } from '../utils/userFunctions';

const getData = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response;
}

export const getOrderDetails = async (endpoint, id, setError) => {
    const url = endpoint + "/" + id;

    const response = await getData(url);
    const responseBody = await response.json();

    if(response.status === 200) {
        return responseBody;
    } else {
        setError({status: response.status, code: responseBody.code});
    }
}

export const getQuoteDetails = async (endpoint, setError) => {
    const response = await getData(endpoint);
    const responseBody = await response.json();

    if(response.status === 200) {
        return responseBody;
    } else {
        setError({status: response.status, code: responseBody.code});
    }
}

const buildSearchURL = (endpoint, lineItems, isocode) => {
    let skus, rows, keywords, url;
    skus = lineItems.map(lineItem => lineItem.materialNumber);
    rows = skus.length;
    keywords = skus.join(' ');
    return url = `${endpoint}/category_facet$shop:Shop?keyword=${keywords}&rows=${rows}&isocode=${isocode}&multiselect=true&page=1&sort=most-relevant${getCategoryReferenceType()}`;
}

export const getItemDetails = async (endpoint, lineItems, setError, isocode) => {
    const url = buildSearchURL(endpoint, lineItems, isocode);
    const response = await getData(url);
    const responseBody = await response.json();

    if(response.status === 200) {
        return responseBody;
    } else {
        setError({status: response.status, code: responseBody.code});
    }
}

export const matchLineItems = (orderDetailsAPIResults, searchAPIResults) => {
    orderDetailsAPIResults.lineItems.forEach(soldItem => {
        for (let i = 0; i < searchAPIResults.length; i++) {
            if(soldItem.materialNumber === searchAPIResults[i].skucode) {
                soldItem.url = searchAPIResults[i].url;
                soldItem.title = searchAPIResults[i].title;
                soldItem.description = searchAPIResults[i].description;
                soldItem.thumbnail = searchAPIResults[i].thumbnail;
            } 
        }
    });
    
    return orderDetailsAPIResults;
}