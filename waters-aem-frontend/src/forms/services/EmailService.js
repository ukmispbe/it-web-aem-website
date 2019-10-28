import "whatwg-fetch";

class EmailService {
    constructor(
        url = "https://test-www.waters.com:8443/api/waters/user/v1/validate/{email}"
    ) {
        this.url = url;
    }

    checkEmail(email) {
        return this.getData(this.createEmailRequest(email));
    }

    createEmailRequest(email) {
        const url = this.url.replace("{email}", encodeURI(email).replace(/#/g, '%23'));
        return url;
    }

    checkFetch(response) {
        if (!response.ok) {
            throw response;
        }
        return response;
    }

    getData(url) {
        // Should be logic for all get requests we have to send
        return new Promise((resolve, reject) => {
            window
                .fetch(url)
                .then(this.checkFetch)
                .then(response => {
                    resolve(response.json());
                })
                .catch(err => {
                    console.log("err - ", err);

                    reject(err);
                });
        });
    }
}
export default EmailService;
