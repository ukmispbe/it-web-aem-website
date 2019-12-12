import { getCountry } from 'country-state-picker';

export const capitalize = (str) => (str.split(' ').map(word => {
    return word[0].toUpperCase() + word.slice(1, word.length);
})).join(' ');

export const getCountryName = (countryCode) => {
    if (!countryCode) return "";

    const country = getCountry(countryCode).name;

    switch (country) {
        case "United States of America":
            return "United States";
        default:
            return country;
    }
};

export const getFullName = (data) => {
    const firstName = data.firstName ? data.firstName.trim() : "";
    const lastName = data.lastName ? data.lastName.trim() : "";

    return capitalize((firstName + " " + lastName).trim());
};

export const getFullAddress = (address) => {
    if (!address) return "";

    const street = address.street ? address.street.trim() + ", " : "";
    const city = address.city ? address.city.trim() + ", " : "";
    const region = address.stateRegion ? address.stateRegion.trim() + " " : "";
    const zip = address.zip ? address.zip.trim() : "";

    return capitalize((street + city + region + zip).trim());
};

export const getPhoneFormat = (phone) => {
    if (!phone) return "";
    let tmpPhone = phone.slice(0, phone.length).trim();
    let formattedPhone = "";

    while(tmpPhone.length) {
        if (tmpPhone.length > 4) {
            formattedPhone += (tmpPhone.slice(0,3) + "-");
            tmpPhone = tmpPhone(3, tmpPhone.length);
        } else {
            formattedPhone += (tmpPhone.slice(0, tmpPhone.length));
            tmpPhone = "";
        }
    }

    return formattedPhone;
};

export const getAddressesByType = (addresses, type) => {
    let addressType = "TBD";

    if (type === "shipping") {
        addressType = "shippingAddress";
    } else if (type === "billing") {
        addressType = "billingAddress";
    }

    return addresses ? addresses.filter(address => address.addressType === addressType) : [];
};
