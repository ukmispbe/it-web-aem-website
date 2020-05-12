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

export const getFullCompanyAddress = address => {
    if (
        !address ||
        (Object.entries(address).length === 0 && address.constructor === Object)
    )
        return '';

    let addressArray = []; 
    const city = address.city ? capitalize(address.city).trim() + ', ' : '';
    const region = address.regio ? capitalize(address.regio).trim() + ' ' : '';
    const postalCd = address.postalCd ? capitalize(address.postalCd).trim() : '';

    address.addr1 ? addressArray.push(capitalize(address.addr1).trim()) : null;
    address.addr2 ? addressArray.push(capitalize(address.addr2).trim()) : null;
    address.addr3 ? addressArray.push(capitalize(address.addr3).trim()) : null;
    address.addr4 ? addressArray.push(capitalize(address.addr4).trim()) : null;
    address.street ? addressArray.push(capitalize(address.street).trim()) : null;

    addressArray.push((city + region + postalCd).trim());

    return addressArray;
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
