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
    return countryName[0].displayName;
};

export const getFullName = data => {
    const firstName = data.firstName ? data.firstName.trim() : '';
    const lastName = data.lastName ? data.lastName.trim() : '';

    return (firstName + ' ' + lastName).trim();
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
    if (!soldToAccounts.length) return soldToAccounts;

    let defaultSoldTo = soldToAccounts.filter(function(i) {
        return i.defaultFlag === 1;
    })[0];

    return [defaultSoldTo];
}
