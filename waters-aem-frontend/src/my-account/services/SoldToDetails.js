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

const SoldToDetails = async (
    url = "https://test-www.waters.com:8443/api/waters/user/v1/retrievesoldto?email={email}",
    sessionStore = new SessionStore()
) => {
    const soldToData = sessionStore.getSoldToDetails();
    if (soldToData && Array.isArray(soldToData)) { 
        return soldToData;
    } 

    const data = sessionStore.getUserToken();
    if (data) {
        const replacedURL = replaceParameter(url, data);
        const response = await getData(replacedURL);
        const responseJSON = await response.json();

        if (response.status === 200) {
            if (!Array.isArray(responseJSON)) throw new Error('Response was not an array');
    
            const sortedResponse = sortPriority(responseJSON);
            sessionStore.setSoldToDetails(sortedResponse)
            return sortedResponse;
        }
    
        throw new Error(response.status);
    } 

    throw new Error('No User Token');
}

const sortPriority = (soldToAccountsArray) => {
    if (!soldToAccountsArray.length) return soldToAccountsArray;

    return [...soldToAccountsArray.sort((a, b) => {
        if(a.default_soldTo === b.default_soldTo) {
            return a.soldTo.localeCompare(b.soldTo);
        } else {
            return b.default_soldTo - a.default_soldTo;
        }   
    })]   
}


export default SoldToDetails;
export { getData, replaceParameter, sortPriority };