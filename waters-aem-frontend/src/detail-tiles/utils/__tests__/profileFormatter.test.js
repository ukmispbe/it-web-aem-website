import * as profileFormatter from '../profileFormatter';
import defaultData from '../__mocks__/en_US/index';

describe('Scenario Capitalize Function', () => {
    describe('When Given a String', () => {
        const testStr = "this is a test string";
        const expectedStr = "This Is A Test String";

        it('Then it should return a string', () => {
            const newStr = profileFormatter.capitalize(testStr);
            expect(newStr).toMatch(expectedStr);
        });
    });

    describe('When Given a Blank String', () => {
        const testStr = " ";
        const expectedStr = "";

        it('Then it should return a string', () => {
            const newStr = profileFormatter.capitalize(testStr);
            expect(newStr).toMatch(expectedStr);
        });
    });
});

describe('Scenario getCountryName Function', () => {
    describe('When Provided With Country Code "IN"', () => {
        let countryCode = "In";
        let expectedCountry = "India";

        it('(Uppercase) Then it should return India', () => {
            const country = profileFormatter.getCountryName(countryCode.toUpperCase());
            expect(country).toMatch(expectedCountry);
        });

        it('(Lowercase) Then it should return India', () => {
            const country = profileFormatter.getCountryName(countryCode.toLowerCase());
            expect(country).toMatch(expectedCountry);
        });

        it('(Mixed) Then it should return India', () => {
            const country = profileFormatter.getCountryName(countryCode);
            expect(country).toMatch(expectedCountry);
        });
    });

    describe('When Provided With Country Code "US"', () => {
        let countryCode = "Us";
        let expectedCountry = "United States";

        it('(Uppercase) Then it should return custom name "United States"', () => {
            const country = profileFormatter.getCountryName(countryCode.toUpperCase());
            expect(country).toMatch(expectedCountry);
        });

        it('(Lowercase) Then it should return custom name "United States"', () => {
            const country = profileFormatter.getCountryName(countryCode.toLowerCase());
            expect(country).toMatch(expectedCountry);
        });

        it('(Mixed) Then it should return custom name "United States"', () => {
            const country = profileFormatter.getCountryName(countryCode);
            expect(country).toMatch(expectedCountry);
        });
    });

    describe('When Not Provided With Country Code', () => {
        let countryCode = " ";
        let expectedCountry = "";

        it('Then it should return empty string', () => {
            const country = profileFormatter.getCountryName(countryCode);
            expect(country).toMatch(expectedCountry);
        });
    });
});

describe('Scenario getFullName Function', () => {
    describe('When Provided With First and Last Name', () => {
        const data = {
            firstName: "John",
            lastName: "Doe"
        };
        const expectedName = "John Doe";

        it("Then it should return both names as entered", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });

    describe('When Provided With First Name Only', () => {
        const data = {
            firstName: "John"
        };
        const expectedName = "John";

        it("Then it should return only first name as entered", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });

    describe('When Provided With Last Name Only', () => {
        const data = {
            lastName: "Doe"
        };
        const expectedName = "Doe";

        it("Then it should return only last name as entered", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });

    describe('When Provided With Neither', () => {
        const data = {};
        const expectedName = "";

        it("Then it should return an empty string", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });
});

describe('Scenario getFullCompanyAddress Function', () => {
    let address = {
        "addr1": "Neta Scientific Inc",
        "addr2": "Hainesport Industrial Park",
        "addr3": "Accounts Payable",
        "addr4": "",
        "street": "4206 Sylon Blvd",
        "city": "Hainesport",
        "regio": "NJ",
        "postalCd": "08036-3736",
        "country": "US",
        "addressType": "billing",
        "communications": false
    };


    describe('When Address is Complete', () => {
        const expectedAddress = [
            "Neta Scientific Inc",
            "Hainesport Industrial Park",
            "Accounts Payable",
            "4206 Sylon Blvd",
            "Hainesport, NJ 08036-3736"
        ];

        it('Then it should return the address properly formatted', () => {
            const newAddress = profileFormatter.getFullCompanyAddress(address);
            expect(newAddress).toStrictEqual(expectedAddress);
        });
    });

    describe('When Address is Incomplete', () => {
        it('Then it should only return part of the address', () => {
            let tmpAddress, expectedAddress, newAddress;

            // No City
            tmpAddress = {
                ...address
            };
            delete tmpAddress.city;
            expectedAddress = [
                "Neta Scientific Inc",
                "Hainesport Industrial Park",
                "Accounts Payable",
                "4206 Sylon Blvd",
                "NJ 08036-3736"
            ];
            newAddress = profileFormatter.getFullCompanyAddress(tmpAddress);
            expect(newAddress).toStrictEqual(expectedAddress);

            // No State
            tmpAddress = {
                ...address
            };
            delete tmpAddress.regio;
            expectedAddress = [
                "Neta Scientific Inc",
                "Hainesport Industrial Park",
                "Accounts Payable",
                "4206 Sylon Blvd",
                "Hainesport, 08036-3736"
            ];
            newAddress = profileFormatter.getFullCompanyAddress(tmpAddress);
            expect(newAddress).toStrictEqual(expectedAddress);

            // No Street
            tmpAddress = {
                ...address
            };
            delete tmpAddress.street;
            expectedAddress = [
                "Neta Scientific Inc",
                "Hainesport Industrial Park",
                "Accounts Payable",
                "Hainesport, NJ 08036-3736"
            ];
            newAddress = profileFormatter.getFullCompanyAddress(tmpAddress);
            expect(newAddress).toStrictEqual(expectedAddress);

            // No Zip
            tmpAddress = {
                ...address
            };
            delete tmpAddress.postalCd;
            expectedAddress = [
                "Neta Scientific Inc",
                "Hainesport Industrial Park",
                "Accounts Payable",
                "4206 Sylon Blvd",
                "Hainesport, NJ"
            ];
            newAddress = profileFormatter.getFullCompanyAddress(tmpAddress);
            expect(newAddress).toStrictEqual(expectedAddress);

            // No Zip & Street
            tmpAddress = {
                ...address
            };
            delete tmpAddress.postalCd;
            delete tmpAddress.street;
            expectedAddress = [
                "Neta Scientific Inc",
                "Hainesport Industrial Park",
                "Accounts Payable",
                "Hainesport, NJ"
            ];
            newAddress = profileFormatter.getFullCompanyAddress(tmpAddress);
            expect(newAddress).toStrictEqual(expectedAddress);
        });
    });

    describe("When Provided With No Address", () => {
        it('Then it should return an empty string', () => {
            const newAddress = profileFormatter.getFullCompanyAddress({});
            expect(newAddress).toMatch("");
        });
    });
});

describe('Scenario getAddressesByType Function', () => {
    const addresses = [{
            id: 0,
            addressType: "shipping"
        },
        {
            id: 1,
            addressType: "shipping"
        },
        {
            id: 5,
            addressType: "billing"
        },
        {
            id: 2,
            addressType: "shipping"
        },
        {
            id: 3,
            addressType: "billing"
        },
        {
            id: 4,
            addressType: "mailing"
        },
    ];

    describe('When Given Type Shipping', () => {
        it('Then it should only return addresses with type shipping', () => {
            const newAddresses = profileFormatter.getAddressesByType(addresses, "shipping");

            expect(newAddresses).toHaveLength(3);

            newAddresses.forEach(address => {
                expect(address.addressType).toMatch("shipping");
            });
        });
    });

    describe('When Given Type Billing', () => {
        it('Then it should only return addresses with type billing', () => {
            const newAddresses = profileFormatter.getAddressesByType(addresses, "billing");

            expect(newAddresses).toHaveLength(2);

            newAddresses.forEach(address => {
                expect(address.addressType).toMatch("billing");
            });
        });
    });

    describe('When Given Invalid Type', () => {
        it('Then it should only return an empty array', () => {
            const newAddresses = profileFormatter.getAddressesByType(addresses, "invalidType");

            expect(newAddresses).toHaveLength(0);
        });
    });

    describe('When Given No Address', () => {
        let newAddresses;
        it('Then it should return an empty array', () => {
            newAddresses = profileFormatter.getAddressesByType([], "billing");
            expect(newAddresses).toHaveLength(0);

            newAddresses = profileFormatter.getAddressesByType([], "shipping");
            expect(newAddresses).toHaveLength(0);
        });
    });
});

describe('Scenario getDefaultSoldTo Function', () => {
    const soldToAccounts = [{
        "soldTo": "144936",
        "defaultFlag": 0,
        "company": "AstraZeneca Pharmaceuticals LP",
        "addresses": [{
                "addr1": "AstraZeneca Pharmaceuticals LP",
                "addr2": "",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "PO Box15250",
                "city": "Wilmington",
                "regio": "DE",
                "postalCd": "19850-5250",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Astrazeneca",
                "addr2": "",
                "addr3": "",
                "addr4": "",
                "street": "50 Otis St",
                "city": "Westborough",
                "regio": "MA",
                "postalCd": "01581-3323",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "145177",
        "defaultFlag": 0,
        "company": "Battelle Memorial Institute",
        "addresses": [{
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "c/o Battelle Memorial Institute",
                "addr4": "Accounts Payable",
                "street": "902 Battelle Blvd",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1793",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "c/o Battelle Memorial Institute",
                "addr4": "Accounts Payable",
                "street": "PO Box999",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99352-0999",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Battelle Memorial Institute",
                "addr2": "US Dept of Energy",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "790 6th St",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1873",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "",
                "addr4": "",
                "street": "790 6th St",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1873",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "146929",
        "defaultFlag": 0,
        "company": "The Clorox Company",
        "addresses": [{
                "addr1": "The Clorox Company",
                "addr2": "",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "PO Box5807",
                "city": "Troy",
                "regio": "MI",
                "postalCd": "48007-5800",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "The Clorox Company",
                "addr2": "",
                "addr3": "",
                "addr4": "",
                "street": "7200 Johnson Dr",
                "city": "Pleasanton",
                "regio": "CA",
                "postalCd": "94588-8005",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "798343",
        "defaultFlag": 1,
        "company": "Neta Scientific Inc",
        "addresses": [{
                "addr1": "Neta Scientific Inc",
                "addr2": "Hainesport Industrial Park",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "4206 Sylon Blvd",
                "city": "Hainesport",
                "regio": "NJ",
                "postalCd": "08036-3736",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Neta Scientific Inc",
                "addr2": "",
                "addr3": "",
                "addr4": "Hainesport Industrial Park",
                "street": "4206 Sylon Blvd",
                "city": "Hainesport",
                "regio": "NJ",
                "postalCd": "08036-3736",
                "country": "US",
                "addressType": "shipping",
                "communications": false
            }
        ]
    }];

    describe('When Provided With Sold To Account Data', () => {
        it('Then it should return only the Default Sold To Data', () => {
            const defaultSoldTo = profileFormatter.getDefaultSoldTo(defaultData.soldToAccounts);

            expect(defaultSoldTo).toStrictEqual(defaultData.soldToAccounts[3]);
        });
    });

    describe("When Provided With No Sold To Account Data", () => {
        it('And soldToAccounts = null, Then it should return an empty array', () => {
            const defaultSoldTo = profileFormatter.getDefaultSoldTo(null);
            expect(defaultSoldTo).toEqual([]);
        });
        it('And soldToAccounts = [], Then it should return an empty array', () => {
            const defaultSoldTo = profileFormatter.getDefaultSoldTo([]);
            expect(defaultSoldTo).toEqual([]);
        });
    });
});


describe('Scenario getDefaultSoldToAddresses Function', () => {
    const soldToAccounts = [{
        "soldTo": "144936",
        "defaultFlag": 0,
        "company": "AstraZeneca Pharmaceuticals LP",
        "addresses": [{
                "addr1": "AstraZeneca Pharmaceuticals LP",
                "addr2": "",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "PO Box15250",
                "city": "Wilmington",
                "regio": "DE",
                "postalCd": "19850-5250",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Astrazeneca",
                "addr2": "",
                "addr3": "",
                "addr4": "",
                "street": "50 Otis St",
                "city": "Westborough",
                "regio": "MA",
                "postalCd": "01581-3323",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "145177",
        "defaultFlag": 0,
        "company": "Battelle Memorial Institute",
        "addresses": [{
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "c/o Battelle Memorial Institute",
                "addr4": "Accounts Payable",
                "street": "902 Battelle Blvd",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1793",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "c/o Battelle Memorial Institute",
                "addr4": "Accounts Payable",
                "street": "PO Box999",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99352-0999",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Battelle Memorial Institute",
                "addr2": "US Dept of Energy",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "790 6th St",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1873",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Pacific Northwest National",
                "addr2": "Laboratory",
                "addr3": "",
                "addr4": "",
                "street": "790 6th St",
                "city": "Richland",
                "regio": "WA",
                "postalCd": "99354-1873",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "146929",
        "defaultFlag": 0,
        "company": "The Clorox Company",
        "addresses": [{
                "addr1": "The Clorox Company",
                "addr2": "",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "PO Box5807",
                "city": "Troy",
                "regio": "MI",
                "postalCd": "48007-5800",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "The Clorox Company",
                "addr2": "",
                "addr3": "",
                "addr4": "",
                "street": "7200 Johnson Dr",
                "city": "Pleasanton",
                "regio": "CA",
                "postalCd": "94588-8005",
                "country": "US",
                "addressType": "shipping"
            }
        ]
    }, {
        "soldTo": "798343",
        "defaultFlag": 1,
        "company": "Neta Scientific Inc",
        "addresses": [{
                "addr1": "Neta Scientific Inc",
                "addr2": "Hainesport Industrial Park",
                "addr3": "Accounts Payable",
                "addr4": "",
                "street": "4206 Sylon Blvd",
                "city": "Hainesport",
                "regio": "NJ",
                "postalCd": "08036-3736",
                "country": "US",
                "addressType": "billing"
            },
            {
                "addr1": "Neta Scientific Inc",
                "addr2": "",
                "addr3": "",
                "addr4": "Hainesport Industrial Park",
                "street": "4206 Sylon Blvd",
                "city": "Hainesport",
                "regio": "NJ",
                "postalCd": "08036-3736",
                "country": "US",
                "addressType": "shipping",
                "communications": false
            }
        ]
    }];

    describe('When Provided With Sold To Account Data', () => {
        it('Then it should return only the Default Sold To Addresses', () => {
            const getDefaultSoldToAddresses = profileFormatter.getDefaultSoldToAddresses(defaultData.soldToAccounts);
            expect(getDefaultSoldToAddresses).toStrictEqual(defaultData.soldToAccounts[3].addresses);
        });
    });

    describe("When Provided With No Sold To Account Data", () => {
        it('And defaultSoldTo = null, Then it should return an empty array', () => {
            const getDefaultSoldToAddresses = profileFormatter.getDefaultSoldToAddresses(null);
            expect(getDefaultSoldToAddresses).toEqual([]);
        });
        it('And defaultSoldTo = [], Then it should return an empty array', () => {
            const getDefaultSoldToAddresses = profileFormatter.getDefaultSoldToAddresses([]);
            expect(getDefaultSoldToAddresses).toEqual([]);
        });
    });
});