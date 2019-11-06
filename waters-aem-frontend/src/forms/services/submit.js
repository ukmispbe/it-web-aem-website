const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
};

const submitStatus = {
    "804": res => {
        console.log("cannot complete registration", res);
    },
    "500": res => {
        console.log("server error", res);
    },
    "400": res => {
        console.log("bad request", res);
    }
};
export async function registrationSubmit(data) {
    delete data.confirmPassword;
    const result = await postData(this.url, data);

    if (result.status === 200) {
        console.log("registration complete -> redirect", result.json());
    } else {
        console.log("setting error", this.setError);
        this.setError(result);
    }
}
