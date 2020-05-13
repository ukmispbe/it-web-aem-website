import { fetch } from 'whatwg-fetch';

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

const buildSearchURL = (endpoint, lineItems, isocode) => {
    console.log("buildSearchURL endpoint", endpoint);
    let skus, rows, keywords, url;
    skus = lineItems.map(lineItem => lineItem.materialNumber);
    rows = skus.length;
    keywords = skus.join(' ');
    return url = `${endpoint}/category_facet$shop:Shop?keyword=${keywords}&rows=${rows}&isocode=${isocode}&multiselect=true&page=1&sort=most-relevant`;
}

export const getItemDetails = async (endpoint, lineItems, setError, isocode) => {
    console.log("getItemDetails endpoint", endpoint);
    const url = buildSearchURL(endpoint, lineItems, isocode);
    const response = await getData(url);
    const responseBody = await response.json();

    if(response.status === 200) {
        return responseBody;
    } else {
        setError({status: response.status, code: responseBody.code});
    }
}

//https://test-www.waters.com:8443/api/waters/search/category_facet$shop:Shop?isocode=en_US&keyword=176001375%20176001556%20176001557&multiselect=true&page=1&rows=100&sort=most-relevant

// get order details data
// get list of skus and count
// build search query
// execute search query
// merge api results with OD lineItems data
// push to shipment component
// push to sku component
// componentDidUpdate 


export const matchLineItems = (orderDetailsAPIResults, searchAPIResults) => {
    orderDetailsAPIResults.lineItems.forEach(soldItem => {
        for (let i = 0; i < searchAPIResults.length; i++) {
            if(soldItem.materialNumber === searchAPIResults[i].skucode) {
            console.log("MATCH", soldItem.materialNumber);
                soldItem.url = searchAPIResults[i].url;
                soldItem.title = searchAPIResults[i].title;
                soldItem.description = searchAPIResults[i].description;
                soldItem.thumbnail = searchAPIResults[i].thumbnail;
            } 
        }
    });
    
    return orderDetailsAPIResults;
}