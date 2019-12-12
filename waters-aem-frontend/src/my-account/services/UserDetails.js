import "whatwg-fetch";
import SessionStore from "../../stores/sessionStore";

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
    url = "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}"
) => {
    const sessionStore = new SessionStore();
    const userData = sessionStore.getUserDetails();

    if (Object.entries(userData).length !== 0 && userData.constructor === Object) {  
        return userData;
    }

    const data = sessionStore.getUserToken();
    if (data) {
        const replacedURL = url.replace("{email}", encodeURI(data).replace(/#/g, '%23'));
        const response = await getData(replacedURL);

        if (response.status === 200) {
            const responseJSON = await response.json();
            sessionStore.setUserDetails(responseJSON)
            return responseJSON;
        }

        throw new Error(response.status);
    } 

    throw new Error('No User Token');
}

export default UserDetails;