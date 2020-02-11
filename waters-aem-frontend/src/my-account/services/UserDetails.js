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

const UserDetails = async (
    url = "https://test-www.waters.com:8443/api/waters/user/v1/details"
) => {
    return getData(url).then(response => {
        return response.json();
    }).catch(error => {
        return {
            failed: true,
            error: error
        }
    });
}

export default UserDetails;