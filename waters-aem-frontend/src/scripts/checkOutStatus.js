import SessionStore from '../stores/sessionStore';
import cookieStore from '../stores/cookieStore';

const checkOutStatus = {
    state: function() {
        let cestatus = false;
        const soldToDetails = this.details;
        const soldToStatusCookie = cookieStore.getSoldToStatus();

        if (Array.isArray(soldToDetails)) { 
            cestatus = !soldToDetails.length ? false : true;
        }
//TODO Tobe deleted for the 6.2.0 release
        if(!cestatus && soldToStatusCookie) {
           cestatus = soldToStatusCookie.toUpperCase() == 'Y' ? true : false;
        }

        return cestatus;
    },
    get length() {
        const soldToDetails = this.details;

        if (!Array.isArray(soldToDetails)) { 
            return 0;
        }
        
        return soldToDetails.length;
    },
    get details() {
        const sessionStore = new SessionStore();
        const soldToDetails = sessionStore.getSoldToDetails();
        return soldToDetails;
    }
}

export default checkOutStatus;