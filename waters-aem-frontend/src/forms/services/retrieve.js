import { signInRedirect } from '../../utils/redirectFunctions';

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

export async function retrieveData(url) {

    const response = await getData(url);
    const responseBody = await response.json();

    if (response.status === 200) {
        return responseBody;
    } else if (response.status === 401) {
        signInRedirect();
    }  else {
        return null;
    }
}