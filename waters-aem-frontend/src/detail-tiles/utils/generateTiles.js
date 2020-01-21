import {
    getAddressesByType,
    getFullAddress,
    getFullName,
    getPhoneFormat,
    getCountryName
} from './profileFormatter';

const newColumn = (title, ...text) => ({
    "title": title,
    "text": text
});

const newNotification = (title, description, icon) => ({
    "title": title,
    "description": description,
    "icon": icon
});

const config = document.getElementById('json-config--cmp-detail-tiles--personal') ? JSON.parse(
    document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML
) : "";

export default (data, type, icon) => {
    if (!data) return [];

    switch (type) {
        case "personal":
            let mailingAddress = data.userAddress.filter(function(i) {
                return i.addressType === "mailingAddress";
            })[0];

            data.country = mailingAddress ? mailingAddress.countryCode : "";
            return [{
                "name": "personalDetailsTile",
                "columns": [
                    newColumn(getFullName(data), data.company),
                    newColumn("", data.email, getPhoneFormat(data.phone), getCountryName(data.country, config))
                ],
                "defaultValues": data
            }];

        case "shipping":
        case "billing":
            return [
                ...getAddressesByType(data.userAddress, type).map(address => {
                    address.country = address.countryCode;
                    let tile = {
                        "name": address.id,
                        "columns": [
                            newColumn(address.preferred ? "Preferred Address" : "", address.company, getFullAddress(address), getCountryName(address.country, config))
                        ],
                        "defaultValues": address
                    };

                    if (address.pending) {
                        tile.notification = newNotification("Address Verification Pending", "Orders may be delayed", icon);
                    }

                    return tile;
                })
            ];

        case "password":
            return [{
                "name": "",
                "columns": [
                    newColumn("•••••••••••••••••••", "")
                    ],
                "defaultValues": {}
            }];

        default:
            return [];
    }
};