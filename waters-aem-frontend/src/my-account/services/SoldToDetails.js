import "whatwg-fetch";

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

const SoldToDetails = async (
    url = "https://testservices.waters.com:8443/api/waters/user/v1/retrievesoldto"
) => {
    try {
        const response = await getData(url);
        const json = await response.json();

        if (response.status === 200) {
            const returnArray = Array.isArray(json) ? json : [];
            return sortPriority(returnArray);
        } else if (response.status === 401 && window.location.href.indexOf('my-account.html') !== -1) {
            signInRedirect();
        }
        return {
            failed: true,
            error: response.status
        }
    } catch (error) {
        return {
            failed: true,
            error: response.status
        }
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