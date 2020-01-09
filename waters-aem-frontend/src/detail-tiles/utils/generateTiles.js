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

export default (data, type, icon) => {
    if (!data) return [];

    switch (type) {
        case "personal":
            // PB Temporary Change Use the first userAddress to determine country code
            // data.country = data.localeCountry;
            data.country = data.userAddress[0].countryCode;

            return [{
                "name": "personalDetailsTile",
                "columns": [
                    newColumn(getFullName(data), data.company),
                    newColumn("", data.email, getPhoneFormat(data.phone), getCountryName(data.country))
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
                            newColumn(address.preferred ? "Preferred Address" : "", address.company, getFullAddress(address), getCountryName(address.country))
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