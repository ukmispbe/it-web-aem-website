import React, { useState, useEffect } from 'react';
import ReactSVG from 'react-svg';

import Tile from './views/tile';

const tmpData = {
    "firstName": "Susan",
    "lastName": "Corman",
    "email": "test@waters.com",
    "password": "cmQ0MTQzcGFzc3dv",
    "namePrefix": "Dr.",
    "pronunciation": null,
    "phone": "5084782000",
    "phoneExt": null,
    "localeCountry": "US",
    "localeLanguage": "eng",
    "credentialsUpdated": "N",
    "userAddress": [
        {
            "id": 1342814,
            "company": "Waters Corp",
            "department": null,
            "street": "34 maple ",
            "building": null,
            "city": "milford",
            "stateRegion": "ME",
            "zip": "01757",
            "country": null,
            "countryCode": "US",
            "addressType": "TBD"
        },
        {
            "id": 1342813,
            "company": "Waters Corp",
            "department": null,
            "street": "34 maple",
            "building": null,
            "city": "milford",
            "stateRegion": "ME",
            "zip": "01757",
            "country": null,
            "countryCode": "US",
            "addressType": "ShippingAddress"
        },
        {
            "id": 1342814,
            "company": "Waters Corporation",
            "department": null,
            "street": "34 Maple Street",
            "building": null,
            "city": "Milford",
            "stateRegion": "MA",
            "zip": "01757",
            "country": "United States",
            "countryCode": "US",
            "addressType": "ShippingAddress"
        },
        {
            "id": 1342809,
            "company": "waters corp. z",
            "department": null,
            "street": "1 Fenway Park dr east1",
            "building": null,
            "city": "Milford w",
            "stateRegion": "MA",
            "zip": "01757",
            "country": null,
            "countryCode": "US",
            "addressType": "MailingAddress"
        }
    ]
};

const DetailTiles = ({
    name,
    type,
    title,
    canCreate,
    addTitle,
    formMessage,
    form,
    icons
}) => {
    const [fetchData, setData] = useState(tmpData);
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        generateTiles();
    }, [fetchData]);

    const getFullName = () => (fetchData.firstName + " " + fetchData.lastName);
    const getFullAddress = (address) => (address.street + ", " + address.city + ", " + address.stateRegion + " " + address.zip);
    const getPhoneFormat = (phone) => (phone.slice(0,3) + "-" + phone.slice(3,6) + "-" + phone.slice(6,10));

    const getAddressesByType = (type) => {
        let addressType = "TBD";

        if (type === "shipping") {
            addressType = "ShippingAddress";
        } else if (type === "billing") {
            addressType = "MailingAddress";
        }

        return fetchData.userAddress.filter(address => address.addressType === addressType);
    };

    const newColumn = (title, ...text) => ({
        "title": title,
        "text": text
    });

    const newNotification = (title, description, icon) => ({
        "title": title,
        "description": description,
        "icon": icon
    });

    const generateTiles = () => {
        const defaultTile = { "form": form, "formMessage": formMessage, "icon": icons.edit, "defaultValues": fetchData };
        switch (type) {
            case "personal":
                setTiles([...tiles, {
                    ...defaultTile,
                    "name": "personalDetailsTile",
                    "columns": [
                        newColumn(getFullName(), "Waters Corporation"),
                        newColumn("", fetchData.email, getPhoneFormat(fetchData.phone), fetchData.localeCountry)
                    ]
                }]);
                break;
            case "shipping":
            case "billing":
                setTiles([...tiles,
                    ...getAddressesByType(type).map(address => ({
                        ...defaultTile,
                        "name": address.id,
                        "columns": [
                            newColumn("", address.company, getFullAddress(address), address.country)
                        ],
                        "defaultValues": address
                    }))
                ]);
                break
            case "password":
                setTiles([...tiles, {
                    ...defaultTile,
                    "name": "changePasswordTile",
                    "columns": [
                        newColumn("•••••••••••••••••••")
                    ]
                }]);
                break;
            default:
                setTiles([]);
                break;
        }
    };

    const renderTiles = () => tiles.map((tile, key) => (<Tile {...tile} key={key} />));

    return (
        <div className="cmp-detail-tiles" id={name}>
            <div className="cmp-detail-tiles--title">{title}</div>
            <div className="cmp-detail-tiles-list">
                {renderTiles()}
            </div>
            {canCreate &&
            <div className="cmp-detail-tiles--add"><ReactSVG src={icons.add} /> {addTitle}</div>}
        </div>
    );
};

export default DetailTiles;