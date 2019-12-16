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

    return response;
};

const replaceParameter = (url, data, string = "{email}") => url.replace(string, encodeURI(data).replace(/#/g, '%23'));

const UserDetails = async (
    url = "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}",
    sessionStore = new SessionStore()
) => {
    const userData = sessionStore.getUserDetails();
    if (userData && Object.entries(userData).length !== 0 && userData.constructor === Object) {  
        return userData;
    } 

    const data = sessionStore.getUserToken();
    if (data) {
        const replacedURL = replaceParameter(url, data);
        const response = await getData(replacedURL);
        const responseJSON = await response.json();

        if (response.status === 200) {
            sessionStore.setUserDetails(responseJSON)
            return responseJSON;
        }
    
        throw new Error(response.status);
    } 

    throw new Error('No User Token');
}

export default UserDetails;
export { getData, replaceParameter };