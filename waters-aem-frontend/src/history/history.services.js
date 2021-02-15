import 'whatwg-fetch';
import { postDataRedirect, fetchData } from '../utils/serviceFunctions';

class HistoryService {
    constructor(url) {
        this.url = url;
    }

    async getQuoteHistory(url) {
        const options = {
            method: 'GET',
            credentials: 'include',
            mode: 'cors'
        }
        const response = await fetchData(url,options);
        return await response.json();
    }

    getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
        let options = {};
        options.orderNumber = orderNumber;
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.maxRecs = "";

        return postDataRedirect(url, options, setError);
    }
}

export default HistoryService;