import "whatwg-fetch";
import loginStatus from "../../scripts/loginStatus";

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

const SoldToDetails = async (
    url = "https://test-www.waters.com:8443/api/waters/user/v1/retrievesoldto"
) => {
    const response = await getData(url);

    if (response.status === 200) {
        const json = await response.json();

        const returnArray = Array.isArray(json) ? json : [];

        return sortPriority(returnArray);
    }

    return {
        failed: true,
        httpStatusCode: response.status
    }
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