import cookieStore from '../stores/cookieStore';

const checkOutStatus = {
    state: () => {
        let cestatus = false;
        const cestatusCookie = cookieStore.getSoldToStatus();
        if (cestatusCookie) { 
            cestatus = cestatusCookie.toUpperCase() == 'Y' ? true : false;
        }
        return cestatus;
    }
}

export default checkOutStatus;