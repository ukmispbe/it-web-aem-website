import 'whatwg-fetch';
import SessionStore from '../stores/sessionStore';
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

//Note: this method uses the USER Details API, not the SoldToDetailsAPI
export const getSoldToId = () => {
    let soldToId = "";
	if(loginStatus.state()) {
		const store = new SessionStore();
        const userDetails = store.getUserDetails();
        if (userDetails || userDetails.length > 0) {
            if (userDetails.soldToAccounts || userDetails.soldToAccounts.length > 0) {
                let priorityAccount;

                userDetails.soldToAccounts.map((soldToAccount) => {
                    if(soldToAccount.defaultFlag === 1) {
                        priorityAccount = soldToAccount;
                    }
                });

                if (priorityAccount){
                    soldToId = priorityAccount.soldTo ? priorityAccount.soldTo : '';
                }
            }
        }
    }
    return soldToId;
}

export const getIsoCode = () => {
	const store = new SessionStore();
    const userDetails = store.getUserDetails();

    if (userDetails || userDetails.length > 0) {
        return userDetails.isoCode || '';
    } else {
        return ''
    }
}

export const getUsertype = () => {
    const sessionStore = new SessionStore();
    const userType = sessionStore.getUserType();

    if(userType !== null) {
        return userType;
    }
    const userConfig = document.getElementById('account-modal-configs-json')

    try {
        const siteConfig = userConfig ? JSON.parse(
            document.getElementById('account-modal-configs-json').innerHTML
        ).siteConfig : '';

        siteConfig && sessionStore.setUserType(siteConfig || '');

        return siteConfig;
    } catch (e) {
        return '';
    }
}

export const isEprocurementUser = () => (getUsertype() === 'eProcurement');