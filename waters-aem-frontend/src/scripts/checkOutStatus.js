import domElements from '../scripts/domElements';

const checkOutStatusCookie = 'CE_STATUS';
const checkOutStatus = {
    state: () => {
        let cestatus = false;
        const cestatusCookie = domElements.getCookie(checkOutStatusCookie)
        if (cestatusCookie) { 
            cestatus = cestatusCookie.toUpperCase() == 'Y' ? true : false;
        }
        return cestatus;
    }
}

export default checkOutStatus;