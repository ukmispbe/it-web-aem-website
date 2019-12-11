import { getAddressesByType, getFullAddress, getFullName, getPhoneFormat } from './profileFormatter';

const newColumn = (title, ...text) => ({
    "title": title,
    "text": text
});

const newNotification = (title, description, icon) => ({
    "title": title,
    "description": description,
    "icon": icon
});

export default (data, type) => {
    if(!data) return [];

    switch (type) {
        case "personal":
            return [{
                "name": "personalDetailsTile",
                "columns": [
                    newColumn(getFullName(data), "Waters Corporation"),
                    newColumn("", data.email, getPhoneFormat(data.phone), data.localeCountry)
                ],
                "defaultValues": {"firstName": data.firstName, "lastName": data.lastName}
            }];

        case "shipping":
        case "billing":
            return [
                ...getAddressesByType(data.userAddress, type).map(address => ({
                    "name": address.id,
                    "columns": [
                        newColumn("", address.company, getFullAddress(address), address.country)
                    ],
                    "defaultValues": address
                }))
            ];

        case "password":
            // Paul: EDIT HERE FOR CHANGE PASSWORD
            return [];

        default:
            return [];
    }
};