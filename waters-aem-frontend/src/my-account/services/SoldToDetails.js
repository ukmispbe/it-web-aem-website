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

const SoldToDetails = async (url) => {
    try {
        const response = await getData(url);
        const json = await response.json();

        if (response.status === 200) {
            return (json && json.customers && Array.isArray(json.customers)) ? json.customers : [];
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
            error: error
        }
    }
}

export default SoldToDetails;