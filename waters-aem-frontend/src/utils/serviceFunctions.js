import 'whatwg-fetch';
import { signInRedirect } from './redirectFunctions';

const throwError = (error) => {
    throw new Error(error);
}

export async function fetchData (url, options) {
    return new Promise((resolve, reject) => {
            fetch(url, {...options})
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                throwError(err);
                reject(err);
            });
    });
};

export async function getData (url) {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response;
}

export async function postData (url, options, setError) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    })
    .catch(error => {
        setError(error);
        throwError(error);
        reject(error);
    });
};

export async function postDataRedirect(url, options, setError) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401) {
            setError(response.status);
            signInRedirect();
        }
    })
    .catch(error => {
        setError(error);
        throwError(error);
        reject(error);
    });
};