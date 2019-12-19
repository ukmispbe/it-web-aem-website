import generateTiles from '../generateTiles';
import defaultData from '../__mocks__/en_US/index';

const mockDefaultData = (data, type) => {
    if (type === "personal") {
        data.country = data.localeCountry;
        return data;
    }

    let addresses = [];
    data.userAddress.forEach(address => {
        switch (type) {
            case "billing":
                if (address.addressType === "billingAddress") {
                    address.country = address.countryCode;
                    addresses.push(address);
                } else {
                    addresses.push(address);
                }
                break;
            case "shipping":
                if (address.addressType === "shippingAddress") {
                    address.country = address.countryCode;
                    addresses.push(address);
                } else {
                    addresses.push(address);
                }
                break;
        }
    });

    data.userAddress = addresses;
    return data;
};

describe('Scenario Generating Tile With Proper Information', () => {

    // Personal Tile
    describe('When Type is Personal', () => {
        let expectedTiles = [
            {
                "name": "personalDetailsTile",
                "columns": [
                    {
                        "title": "John Doe",
                        "text": ["Waters Corporation"]
                    },
                    {
                        "title": "",
                        "text": ["john_doe@example.com", "123-456-7890", "United States"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "personal")
            }
        ];

        it('Then is should return one tile of user\'s details', () => {
            const tiles = generateTiles(defaultData, "personal", defaultData.icon);

            expect(tiles).toHaveLength(expectedTiles.length);
            expect(tiles[0].columns).toHaveLength(expectedTiles[0].columns.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Shipping Tile
    describe('When Type is Shipping', () => {
        const expectedTiles = [
            {
                "name": 0,
                "columns": [
                    {
                        "title": "Preferred Address",
                        "text": ["Waters Corp", "123 Main Street, Cityville, Stateton 12345", "United States"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "shipping").userAddress[0]
            },
            {
                "name": 1,
                "columns": [
                    {
                        "title": "",
                        "text": ["Waters Corpss", "456 Main Street, Cityville, Stateton 67890", "United States"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "shipping").userAddress[1],
                "notification": {
                    "title": "Address Verification Pending",
                    "description": "Orders may be delayed",
                    "icon": defaultData.icon
                }
            },
            {
                "name": 2,
                "columns": [
                    {
                        "title": "",
                        "text": ["Waters Corps", "789 Main Street, Cityville, Statetone 12345", "United States"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "shipping").userAddress[2]
            }
        ];

        it('Then is should return multiple tiles of shipping address details', () => {
            const tiles = generateTiles(defaultData, "shipping", defaultData.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Billing Tile
    describe('When Type is Billing', () => {
        const expectedTiles = [
            {
                "name": 4,
                "columns": [
                    {
                        "title": "Preferred Address",
                        "text": ["Waters Corp.", "112 Main Street, Cityville, Stateton 10111", "India"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "shipping").userAddress[4],
                "notification": {
                    "title": "Address Verification Pending",
                    "description": "Orders may be delayed",
                    "icon": defaultData.icon
                }
            },
            {
                "name": 5,
                "columns": [
                    {
                        "title": "",
                        "text": ["Waters Corp", "131 Main Street, Cityville, Stateton 21314", "United States"]
                    }
                ],
                "defaultValues": mockDefaultData(defaultData, "shipping").userAddress[5],
                "notification": {
                    "title": "Address Verification Pending",
                    "description": "Orders may be delayed",
                    "icon": defaultData.icon
                }
            }
        ];

        it('Then is should return multiple tiles of billing address details', () => {
            const tiles = generateTiles(defaultData, "billing", defaultData.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

    // Password Tile
    describe('When Type is Password', () => {
        const expectedTiles = [{
            "name": "",
            "columns": [
                {
                    "title": "•••••••••••••••••••",
                    "text": [""]
                }
            ],
            "defaultValues": ""
        }];

        it('Then is should return change password tile', () => {
            const tiles = generateTiles(defaultData, "password", defaultData.icon);

            expect(tiles).toHaveLength(expectedTiles.length);

            tiles.forEach((tile, idx) => {
                expect(tile).toMatchObject(expectedTiles[idx]);
            });
        });
    });

});

// Invalid Tile
describe('Scenario Generating Tile With Improper Information', () => {
    describe('When Type is Invalid', () => {
        it('Then is should return an empty array', () => {
            const tiles = generateTiles(defaultData, "invalid", defaultData.icon);

            expect(tiles).toHaveLength(0);
        });
    });

    describe('When Data is null', () => {
        it('Then is should return an empty array', () => {
            const tiles = generateTiles(null, "invalid", defaultData.icon);

            expect(tiles).toHaveLength(0);
        });
    });
});