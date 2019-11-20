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

    return await response.json();
};

export async function registrationSubmit(data) {
    delete data.confirmPassword;

    const isCaptcha = data.hasOwnProperty('captcha');
    if(isCaptcha) {
        this.url = `${this.url}?captcha=${data.captcha}`;
        delete data.captcha;
    }

    const result = await postData(this.url, data);

    if (result.status === 200) {
        console.log("registration complete -> redirect", result.json());
    } else {
        console.log(result.status);
        console.log(this.url);
        this.setError(result);
        scrollToY(0);
    }
}
