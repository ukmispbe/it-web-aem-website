export const getFullName = (data) => (data.firstName + " " + data.lastName);

export const getFullAddress = (address) => address ? (address.street + ", " + address.city + ", " + address.stateRegion + " " + address.zip) : "";

export const getPhoneFormat = (phone) => phone ? (phone.slice(0,3) + "-" + phone.slice(3,6) + "-" + phone.slice(6,10)) : "";

export const getAddressesByType = (addresses, type) => {
    let addressType = "TBD";

    if (type === "shipping") {
        addressType = "ShippingAddress";
    } else if (type === "billing") {
        addressType = "MailingAddress";
    }

    return addresses ? addresses.filter(address => address.addressType === addressType) : [];
};