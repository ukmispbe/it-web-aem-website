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

export const getOrderDetails = (endpoint, id) => {
    const url = endpoint+id;
    return getData(url)
        .then((res) => res.json())
}


export const getShipmentItems = (endpoint, id) => {
    const url = endpoint+id;
    return getData(url)
        .then((res) => res.json())
}