import { getCountry } from 'country-state-picker';

export const getCountryName = (countryCode) => (countryCode ? getCountry(countryCode).name : "");

export const getFullName = (data) => (data.firstName + " " + data.lastName);

export const getFullAddress = (address) => address ? (address.street + ", " + address.city + ", " + address.stateRegion + " " + address.zip) : "";

export const getPhoneFormat = (phone) => {
    let tmpPhone = phone.slice(0, phone.length);
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