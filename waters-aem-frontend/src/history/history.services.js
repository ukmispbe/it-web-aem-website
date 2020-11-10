import 'whatwg-fetch';
import { postDataRedirect } from '../utils/serviceFunctions';

class HistoryService {
    constructor(url) {
        this.url = url;
    }

    getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
        let options = {};
        options.orderNumber = orderNumber;
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.maxRecs = "";

        return postDataRedirect(url, options, setError);
    }

    
    getQuoteListPost(url, fromDate, poNumber, orderNumber, setError) {
        let options = {};
        options.orderNumber = orderNumber;
        options.purchaseOrderNumber = poNumber;
        options.fromDate = fromDate;
        options.maxRecs = "";

        return postDataRedirect(url, options, setError);
    }
}

export default HistoryService;