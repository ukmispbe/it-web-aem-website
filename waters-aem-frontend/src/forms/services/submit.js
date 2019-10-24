const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.text();
};

export async function registrationSubmit(data) {
    delete data.confirmPassword;
    const result = await postData(this.url, data);

    console.log(result);
}
