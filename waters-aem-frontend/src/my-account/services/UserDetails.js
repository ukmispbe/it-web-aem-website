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
    const response = await getData(url);

    if (response.status === 200) {
        return await response.json();
    }

    return {
        failed: true,
        httpStatusCode: response.status
    }
}

export default UserDetails;