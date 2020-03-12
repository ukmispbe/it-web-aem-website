import "whatwg-fetch";

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
    return getData(url).then(async (response) => {
        const json = await response.json();

        const returnArray = Array.isArray(json) ? json : [];

        return sortPriority(returnArray);
    }).catch(error => {
        return {
            failed: true,
            error: error
        }
    });
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


const getDefaultSoldTo = (soldToAccounts) => {
    if (!soldToAccounts.length) return soldToAccounts;
    
    for (let i = 0; i < soldToAccounts.length; i++) {
        if(soldToAccounts[i].default_soldTo === 1) {
            returnsoldToAccounts[i];
        } 
    }
}

export default SoldToDetails;