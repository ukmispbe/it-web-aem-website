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

    const addr1 = address.addr1 ? address.addr1.trim() + ', ' : '';
    const addr2 = address.addr2 ? address.addr2.trim() + ', ' : '';
    const addr3 = address.addr3 ? address.addr3.trim() + ', ' : '';
    const addr4 = address.addr4 ? address.addr4.trim() : '';

    return capitalize((addr1 + addr2 + addr3 + addr4).trim());
};



export const getFullAddress = address => {
    if (
        !address ||
        (Object.entries(address).length === 0 && address.constructor === Object)
    )
        return '';

    const street = address.street ? address.street.trim() + ', ' : '';
    const city = address.city ? address.city.trim() + ', ' : '';
    const region = address.stateRegion ? address.stateRegion.trim() + ' ' : '';
    const zip = address.zip ? address.zip.trim() : '';

    return capitalize((street + city + region + zip).trim());
};

export const getAddressesByType = (addresses, type) => {
    // let addressType = 'TBD';

    // if (type === 'shipping') {
    //     addressType = 'shippingAddress';
    // } else if (type === 'billing') {
    //     addressType = 'billingAddress';
    // }

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
