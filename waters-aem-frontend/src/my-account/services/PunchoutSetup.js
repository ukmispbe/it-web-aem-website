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

const punchoutSetup = async (url) => {
    try {
        const response = await getData(url);
        const data = await response.json();
        return {
          ...data,
          status: response.status
        }
    } catch {
        return {
            status: response.status
        }
    }
}

export default punchoutSetup;