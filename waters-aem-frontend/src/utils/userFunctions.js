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
    const userId = loginStatus.state() && userDetails && userDetails.userId != undefined ? userDetails.userId : '';
    return userId;
}

export const getSalesOrg = () => {
    let salesOrg = '';
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    if (userDetails || userDetails.length > 0) {
        salesOrg = loginStatus.state() && userDetails.salesOrg != undefined ? userDetails.salesOrg : '';
    }

    return salesOrg;
}

//Note: this method uses the USER Details API, not the SoldToDetailsAPI
export const getSoldToId = () => {
    let soldToId = '';
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
    let dummySoldto = '';
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    if (userDetails || userDetails.length > 0) {
        dummySoldto = userDetails.dummySoldto != undefined ? userDetails.dummySoldto : '';
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

export const getApprovalStatus = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    const approvalStatus = userDetails && userDetails.approvalStatus || '';
    return approvalStatus;
}

//Note: Returning all possible soldTo values for debugging and in case of future needs
export const callCustomerPriceApi = (custPriceApiDisabled) => {
    let salesOrg = getSalesOrg();
    let soldToId = getSoldToId();
    let dummySoldto = getDummySoldToId();
    let dynamicSoldTo = getSoldToIdSource(soldToId, dummySoldto);
    let callCustApi = false;

    if (dynamicSoldTo !== '' && salesOrg !== '' && custPriceApiDisabled !== true 
        && custPriceApiDisabled !== "true"){
            callCustApi = true;
        }

    let userInfo = {
        salesOrg: salesOrg,
        soldToId: soldToId,
        dummySoldto: dummySoldto,
        dynamicSoldTo: dynamicSoldTo,
        callCustApi: callCustApi
    }

    return userInfo;
}

const capitalize = str => {
    if (!str || str.trim() === '') return '';

    return str
        .split(' ')
        .map(word => {
            return word[0].toUpperCase() + word.slice(1, word.length);
        })
        .join(' ');
};

export const trimAndCapitalize = (item) => {
    if (item && typeof item === "string") {
        item = item.replace(/\s\s+/g, ' ');
        item = item.trim();
        item = capitalize(item);
    }
    return item;
}
//Springboot APIs
export const getOrderDetailsAddress = (address, includeCountryName) => {
    if (
        !address ||
        (Object.entries(address).length === 0 && address.constructor === Object)
    )
        return '';

    let addressArray = [];
    const city = address.city ? trimAndCapitalize(address.city) + ', ' : '';
    const region = address.region ? trimAndCapitalize(address.region) + ' ' : '';
    const postalCd = address.postalCd ? trimAndCapitalize(address.postalCd) : '';

    address.partnerName ? addressArray.push(trimAndCapitalize(address.partnerName)) : null;
    address.addr1 ? addressArray.push(trimAndCapitalize(address.addr1)) : null;
    address.addr2 ? addressArray.push(trimAndCapitalize(address.addr2)) : null;
    address.addr3 ? addressArray.push(trimAndCapitalize(address.addr3)) : null;
    address.addr4 ? addressArray.push(trimAndCapitalize(address.addr4)) : null;
    address.street ? addressArray.push(trimAndCapitalize(address.street)) : null;
    address.street2 ? addressArray.push(trimAndCapitalize(address.street2)) : null;
    addressArray.push((city + region + postalCd));

    if (includeCountryName) {
        address.countryName ? addressArray.push(trimAndCapitalize(address.countryName)) : address.country;
    }

    return addressArray;
};

//Mule User API
export const getFullCompanyAddress = (address, includeCountryName) => {
    if (
        !address ||
        (Object.entries(address).length === 0 && address.constructor === Object)
    )
        return '';

    let addressArray = [];
    const city = address.city ? trimAndCapitalize(address.city) + ', ' : '';
    const state = address.state ? trimAndCapitalize(address.state) + ' ' : '';
    const postalCode = address.postalCode ? trimAndCapitalize(address.postalCode) : '';

    address.name ? addressArray.push(trimAndCapitalize(address.name)) : null;
    address.address1 ? addressArray.push(trimAndCapitalize(address.address1)) : null;
    address.address2 ? addressArray.push(trimAndCapitalize(address.address2)) : null;
    address.address3 ? addressArray.push(trimAndCapitalize(address.address3)) : null;
    address.street ? addressArray.push(trimAndCapitalize(address.street)) : null;
    address.street2 ? addressArray.push(trimAndCapitalize(address.street2)) : null;
    addressArray.push((city + state + postalCode));

    if (includeCountryName) {
        address.countryName ? addressArray.push(trimAndCapitalize(address.countryName)) : address.country;
    }

    return addressArray;
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

//soldToInfo billToInfo shipToInfo payerInfo carrierInfo
export const getAddressesByType = (addresses, type) => {
    let addressTypeData = [];
    for (let key of Object.keys(addresses)) {
        if (key === type) {
            addressTypeData = addresses[key];
        }
    }

    return addressTypeData;
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
        return {};
    } else {
        let defaultSoldTo = getDefaultSoldTo(soldToAccounts);

        if (defaultSoldTo.addresses === null || defaultSoldTo.addresses === undefined) {
            return {};
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
        filteredUser.company = inputUser.company || '';
        filteredUser.dummySoldto = inputUser.dummySoldto;
        filteredUser.localeCountry = inputUser.localeCountry;
        filteredUser.localeLanguage = inputUser.localeLanguage;
        filteredUser.sapWebUserId = inputUser.sapWebUserId;
        filteredUser.userId = inputUser.userId;
        filteredUser.salesOrg = inputUser.salesOrg;
        filteredUser.soldToAccounts = [];
        filteredUser.approvalStatus = inputUser.approvalStatus;
        filteredUser.userRole = inputUser.userRole;
        filteredUser.isoCode = inputUser.isoCode;

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

// Save only the Sold To Details allowed
export const filterSoldToDetails = (soldToInfo) => {
    let filteredSoldTo = [];
    if (soldToInfo) {
        soldToInfo.forEach(soldTo => {
            let eachSoldTo = {};
            if (soldTo.soldToFlag == 1) {
                eachSoldTo.customerNumber = soldTo.customerNumber;
                eachSoldTo.name = soldTo.name;
                eachSoldTo.soldToFlag = soldTo.soldToFlag;
                eachSoldTo.salesOrg = soldTo.salesOrg;
            }

            if (soldTo.soldToFlag == 0) {
                eachSoldTo.customerNumber = soldTo.customerNumber;
                eachSoldTo.soldToFlag = soldTo.soldToFlag;
            }

            filteredSoldTo.push(eachSoldTo);
        });
    }
    return filteredSoldTo;
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

export const getUserRole = () => {
	const store = new SessionStore();
    const userDetails = store.getUserDetails();
    if (userDetails || userDetails.length > 0) {
        return (userDetails.userRole && userDetails.userRole.role) || '';
    } else {
        return ''
    }
}

export const isEprocurementUserRole = () => (getUserRole() === 'EPROC');

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

export const getEprocUserCountryCode = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    return userDetails.mailingAddressCountryCode || '';
}

export const getEprocUserLanguage = () => {
    const store = new SessionStore();
    const userDetails = store.getUserDetails();
    return userDetails.localeLanguage || '';
}

//soldToInfo billToInfo shipToInfo payerInfo carrierInfo
export const matchAddresses = (userDetailsAPIDetails, soldToAPIDetails) => {
    userDetailsAPIDetails.soldToAccounts.forEach(account => {
        for (let i = 0; i < soldToAPIDetails.length; i++) {
            if(account.soldTo === soldToAPIDetails[i].customerNumber) {
                account.company = soldToAPIDetails[i].name;
                account.addresses = {
                    'soldToInfo': soldToAPIDetails[i].soldToInfo || [],
                    'billToInfo': soldToAPIDetails[i].billToInfo || [],
                    'shipToInfo': soldToAPIDetails[i].shipToInfo || [],
                    'payerInfo': soldToAPIDetails[i].payerInfo || []
                };
            } 
        }
    });

    return userDetailsAPIDetails;
}

export const getCategoryReferenceType = () => {
    return isEprocurementUser() ? `&reference=sku` : '';
}

export const getCartCheckoutUrl = (initial, page) => {
    const countryCode = getCountryCode();
    const language = getLanguage();
    return `${window.location.origin}/${initial}/${countryCode}/${language}/${page}`;
}

export const getUrlPath = (url, id) => {
    const  userId = getUserId();
    const soldToId = getSoldToId() || getDummySoldToId();
    const countryCode = getCountryCode();
    const language = getLanguage();
    return `${url}/${id}?soldToId=${soldToId}&userId=${userId}&countryCode=${countryCode}&language=${language}&fields=FULL`;
}

export const getUrlParameter = (name = '') => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.hash);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const convertToBoolean = (value = '') => {
    let status = false;
    if(typeof value === "string"){
        if(value.toLowerCase() === 'true'){
            status = true;
        }
    }
    return status
}