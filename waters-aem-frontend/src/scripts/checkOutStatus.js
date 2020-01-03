import SessionStore from '../stores/sessionStore';

const checkOutStatus = {
    state: () => {
        let cestatus = false;
        const soldToDetails = this.details;

        if (Array.isArray(soldToDetails)) { 
            cestatus = !soldToDetails.length ? false : true;
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