import scrollToY from "./../../scripts/scrollTo";

const postData = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response;
};

export async function registrationSubmit(data) {
    delete data.confirmPassword;

    const isCaptcha = data.hasOwnProperty('captcha');
    if(isCaptcha) {
        this.url = `${this.url}?captcha=${data.captcha}`;
        delete data.captcha;
    }

    const response = await postData(this.url, data);

    if (response.status === 200) {
        console.log("registration complete -> redirect", response.json());
    } else {
        this.setError(response);
        scrollToY(0);
    }
}
