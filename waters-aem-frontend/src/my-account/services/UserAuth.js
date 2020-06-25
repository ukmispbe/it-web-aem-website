const userAuth = (url, token) => new Promise(async resolve => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: { token }
    });
    return resolve({ response });
});

export default userAuth;