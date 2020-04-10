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

export const getOrderDetails = (endpoint, id, setError) => {
    const url = endpoint+id;
    return getData(url)
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                setError(response.status);
            }
        })
}

export const getShipmentItems = (endpoint, id) => {
    const url = endpoint+id;
    return getData(url)
        .then((res) => res.json())
}