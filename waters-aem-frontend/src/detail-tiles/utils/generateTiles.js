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
    if(!data) return [];

    switch (type) {
        case "personal":
            data.country = data.localeCountry;

            return [{
                "name": "personalDetailsTile",
                "columns": [
                    newColumn(getFullName(data), data.company || "No Company Found"),
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
                            newColumn(address.preferred || true ? "Preferred Address" : "", address.company, getFullAddress(address), getCountryName(address.country))
                        ],
                        "defaultValues": address
                    };

                    if (address.pending || true) {
                        tile.notification = newNotification("Address Verification Pending", "Orders may be delayed", icon);
                    }

                    return tile;
                })
            ];

        case "password":
            // Paul: EDIT HERE FOR CHANGE PASSWORD
            return [];

        default:
            return [];
    }
};