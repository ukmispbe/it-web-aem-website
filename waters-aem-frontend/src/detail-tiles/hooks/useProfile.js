import React, { useEffect, useState } from 'react';
import generateTiles from '../utils/generateTiles';

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
    "country": "US",
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
            "state": "",
            "zip": "01757",
            "countryCode": null,
            "country": "US",
            "addressType": "TBD"
        },
        {
            "id": 1342813,
            "company": "Waters Corp",
            "department": null,
            "street": "34 maple",
            "building": null,
            "city": "milford",
            "state": "",
            "zip": "01757",
            "countryCode": null,
            "country": "US",
            "addressType": "ShippingAddress"
        },
        {
            "id": 1342814,
            "company": "Waters Corporation",
            "department": null,
            "street": "34 Maple Street",
            "building": null,
            "city": "Milford",
            "state": "MA",
            "zip": "01757",
            "countryCode": "United States",
            "country": "US",
            "addressType": "ShippingAddress"
        },
        {
            "id": 1342809,
            "company": "waters corp. z",
            "department": null,
            "street": "1 Fenway Park dr east1",
            "building": null,
            "city": "Milford w",
            "state": "MA",
            "zip": "01757",
            "countryCode": null,
            "country": "US",
            "addressType": "ShippingAddress"
        }
    ]
};

export default (fetchEndPoint, type) => {
    const [data, setData] = useState();
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        const unsubscribe = () => {
            const fetchData = async () => {
                setData(tmpData);
            };

            fetchData();
        };

        return unsubscribe();
    }, []);

    useEffect(() => {
        setTiles(
            generateTiles(data, type)
        );
    }, [data]);

    return { data, tiles };
};