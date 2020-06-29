const punchoutLogin = body => new Promise(async resolve => {
    const url = 'https://test-order.waters.com:8443/api/waters/punchout/v1/login';
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return resolve({ response });
});

export default punchoutLogin;