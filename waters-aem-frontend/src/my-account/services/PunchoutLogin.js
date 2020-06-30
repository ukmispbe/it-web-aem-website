const punchoutLogin = (url, body) => new Promise(async resolve => {
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