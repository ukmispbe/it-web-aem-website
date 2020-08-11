import "whatwg-fetch";
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

const UserDetails = async (
    url = "https://stgservices.waters.com/api/waters/user/v1/details"
) => {
    try {
        const response = await getData(url);

        if (response.status === 200) {
            return response.json();
        } else if (response.status === 401 && window.location.href.indexOf('my-account.html') !== -1) {
            signInRedirect();
        }
        return {
            failed: true,
            error: response.status
        }
    } catch {
        return {
            failed: true,
            error: response.status
        }
    }
}

export default UserDetails;