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
            if (userDetails.soldToAccounts && userDetails.soldToAccounts.length > 0) {
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

//Note: this method uses the USER Details API, not the SoldToDetailsAPI
export const getDummySoldToId = () => {
    let dummySoldto = "";
	if(loginStatus.state()) {
		const store = new SessionStore();
        const userDetails = store.getUserDetails();
        if (userDetails || userDetails.length > 0) {
            dummySoldto = userDetails.dummySoldto != undefined ? userDetails.dummySoldto : '';
        }
    }

    return dummySoldto;
}

export const getSoldToIdSource = (soldToId, dummySoldto) => {
    let soldTo = '';
    if (soldToId != '' && dummySoldto == '') {
        soldTo = soldToId;
    } else if (soldToId == '' && dummySoldto != '') {
        soldTo = dummySoldto;
    }

    return soldTo;
}

//Note: Returning all possible soldTo values for debugging and in case of future needs
export const setSKUUserInfo = () => {
	if(loginStatus.state()) {
        let salesOrg = getSalesOrg();
        let soldToId = getSoldToId();
        let dummySoldto = getDummySoldToId();
        let dynamicSoldTo = getSoldToIdSource(soldToId, dummySoldto);

        let userInfo = {
            salesOrg: salesOrg,
            soldToId: soldToId,
            dummySoldto: dummySoldto,
            dynamicSoldTo: dynamicSoldTo
        }

        return userInfo;
    } else {
        let userInfo = {
            soldToId: '',
            salesOrg: '',
            dummySoldto: '',
            dynamicSoldTo: ''
        }

        return userInfo;
    }
}

export const getFullCompanyAddress = (address, includeCountryName) => {
    if (
        !address ||
        (Object.entries(address).length === 0 && address.constructor === Object)
    )
        return '';

    let addressArray = [];
    const city = address.city ? capitalize(address.city).trim() + ', ' : '';
    const region = address.regio ? capitalize(address.regio).trim() + ' ' : '';
    const postalCd = address.postalCd ? capitalize(address.postalCd).trim() : '';
    if (address.partnerName) {
        address.partnerName ? addressArray.push(capitalize(address.partnerName).trim()) : null;
    }
    if (address.addr1) {
        address.addr1 ? addressArray.push(capitalize(address.addr1).trim()) : null;
    }
    address.addr2 ? addressArray.push(capitalize(address.addr2).trim()) : null;
    address.addr3 ? addressArray.push(capitalize(address.addr3).trim()) : null;
    address.addr4 ? addressArray.push(capitalize(address.addr4).trim()) : null;
    address.street ? addressArray.push(capitalize(address.street).trim()) : null;
    addressArray.push((city + region + postalCd).trim());
    if (includeCountryName) {
        address.countryName ? addressArray.push(capitalize(address.countryName).trim()) : address.country;
    }

    return addressArray;
};

export const capitalize = str => {
    if (!str || str.trim() === '') return '';

    return str
        .split(' ')
        .map(word => {
            return word[0].toUpperCase() + word.slice(1, word.length);
        })
        .join(' ');
};

export const getCountryName = (countryCode, config) => {
    if (!countryCode || countryCode.trim() === '') return '';
    const fields = config.form.fields;

    const countryField = fields.filter(field => {
        return field.name === 'country';
    });

    const countryName = countryField[0].options.filter(option => {
        return option.countryCode.toLowerCase() === countryCode.toLowerCase();
    });

    if (countryName.length > 0){
        return countryName[0].displayName;
    } else {
        return countryCode;
    }
};

export const getFullName = data => {
    const mailingAddress = data.userAddress.filter(address => address.addressType === 'mailingAddress');
    const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
    const firstName = data.firstName ? data.firstName.trim() : '';
    const lastName = data.lastName ? data.lastName.trim() : '';

    if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
        return (lastName + ' ' + firstName).trim();
    } else {
        return (firstName + ' ' + lastName).trim();
    }
};

export const getAddressesByType = (addresses, type) => {
    return addresses.length
        ? addresses.filter(address => address.addressType === type)
        : [];
};

export const getDefaultSoldTo = (soldToAccounts) => {
    if (soldToAccounts === null || soldToAccounts === undefined || !soldToAccounts.length) {
        return [];
    } else {
        let defaultSoldTo = soldToAccounts.filter(function(i) {
            return i.defaultFlag === 1;
        })[0];
    
        return defaultSoldTo;
    }
}

export const getDefaultSoldToAddresses = (soldToAccounts) => {
    if (Array.isArray(soldToAccounts) && !soldToAccounts.length){
        return [];  
    } else {
        let defaultSoldTo = getDefaultSoldTo(soldToAccounts);

        if (defaultSoldTo.addresses === null || defaultSoldTo.addresses === undefined || !defaultSoldTo.addresses.length) {
            return [];  
        } else {
            return defaultSoldTo.addresses;
        }
    }
}

// Save only the User Details allowed
export const filterUserDetails = (inputUser) => {
    let filteredUser = {};
    if (inputUser) {
        filteredUser.firstName = inputUser.firstName;
        filteredUser.lastName = inputUser.lastName;
        filteredUser.dummySoldto = inputUser.dummySoldto;
        filteredUser.localeCountry = inputUser.localeCountry;
        filteredUser.localeLanguage = inputUser.localeLanguage;
        filteredUser.sapWebUserId = inputUser.sapWebUserId;
        filteredUser.userId = inputUser.userId;
        filteredUser.salesOrg = inputUser.salesOrg;
        filteredUser.soldToAccounts = [];

        if (inputUser.soldToAccounts && inputUser.soldToAccounts.length !== 0) {
            filteredUser.soldToAccounts = inputUser.soldToAccounts;
        }

        if (!filteredUser.mailingAddressCountryCode){
            if (inputUser.userAddress && inputUser.userAddress.length !== 0) {
                const mailingAddress = inputUser.userAddress.filter(address => address.addressType === 'mailingAddress');
                const userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
                filteredUser.mailingAddressCountryCode = userCountry;
            }
        }
    }
    return filteredUser;
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
