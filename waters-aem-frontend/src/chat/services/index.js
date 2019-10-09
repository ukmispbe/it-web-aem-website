import 'whatwg-fetch';

class ChatService {
    constructor(
        countryCode = 'US',
        chatStatusApi = 'https://test-www.waters.com:8443/api/waters/v1/chat/enabled/{countryCode}'
    ) {
        this.countryCode = countryCode;
        this.chatStatusApi = chatStatusApi;
    }

    checkFetch(response) {
        if (!response.ok){
            throw response;
        }
        return response;
    }

    getChatStatus() {
        const url = this.chatStatusApi.replace('{countryCode}', this.countryCode);
        return this.getData(url);
    }

    getData(url){
        return new Promise((resolve, reject) => {
            window
                .fetch(url)
                .then(this.checkFetch)
                .then(response => {
                    resolve(response.json())
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default ChatService;