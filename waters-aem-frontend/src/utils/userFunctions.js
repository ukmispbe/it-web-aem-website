import 'whatwg-fetch';
import SessionStore from '../stores/sessionStore';
import LocalStore from '../stores/localStore';
import loginStatus from '../scripts/loginStatus';
import DigitalData from '../scripts/DigitalData';

export const getCountryCode = () => {
    return DigitalData.country ? DigitalData.country.toLowerCase() : '';
}

export const getLanguage = () => {
    return DigitalData.language;
}

export const getUserId = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    const userId = loginStatus.state() && userDetails ? userDetails.userId : '';
    return userId;
}

export const getSalesOrg = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();

    if (userDetails || userDetails.length > 0) {
        const salesOrg = loginStatus.state() && userDetails ? userDetails.salesOrg : '';
        return salesOrg;
    } else {
        return ''
    }
}

export const getSoldToId = () => {
	if(loginStatus.state()) {
		const store = new SessionStore();
        const soldToDetails = store.getSoldToDetails();
        if (!soldToDetails || soldToDetails.length === 0) {
            return ''
        } else {
            let priorityAccount;
            let accountNumber = "";

            soldToDetails.map((soldTo) => {
                if(soldTo.default_soldTo === 1) {
                    priorityAccount = soldTo;
                }
            });

            if (priorityAccount){
                accountNumber = priorityAccount.soldTo ? priorityAccount.soldTo : '';
            }

            return accountNumber;
        }
	}

	return '';
}