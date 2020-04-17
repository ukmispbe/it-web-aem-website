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
    const url = endpoint+id;

    const response = await getData(url);
    const responseBody = await response.json();

    if(response.status === 200) {
        return responseBody;
    } else {
        setError({status: response.status, code: responseBody.code});
    }
}

export const getShipmentItems = (endpoint, id) => {
    const url = endpoint+id;
    return getData(url)
        .then((res) => res.json())
}