import * as userFunctions from '../userFunctions';
import defaultData from '../__mocks__/en_US/index';
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html';
import { soldToDetailsJSON } from '../../__mocks__/en_US/services/mock-services-json';

describe('Scenario getDefaultSoldTo Function', () => {
document.body.innerHTML = mockBodyHTML;

    describe('Scenario trimAndCapitalize Function', () => {
        describe('When Given a String', () => {
            const testStr = "this is a test string";
            const expectedStr = "This Is A Test String";

            it('Then it should return a string', () => {
                const newStr = userFunctions.trimAndCapitalize(testStr);
                expect(newStr).toMatch(expectedStr);
            });
        });

        describe('When Given a String with Leading, Middle and Trailing Spaces', () => {
            const testStr = "     this     is   a    test     string      ";
            const expectedStr = "This Is A Test String";

            it('Then it should return a string', () => {
                const newStr = userFunctions.trimAndCapitalize(testStr);
                expect(newStr).toMatch(expectedStr);
            });
        });

        describe('When Given a Blank String', () => {
            const testStr = " ";
            const expectedStr = "";

            it('Then it should return a string', () => {
                const newStr = userFunctions.trimAndCapitalize(testStr);
                expect(newStr).toMatch(expectedStr);
            });
        });
    });

    describe('Scenario getCountryName Function', () => {
        const config = document.getElementById('json-config--cmp-detail-tiles--personal')
            ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML
            ) : '';

        describe('When Provided With Country Code "IN"', () => {
            let countryCode = "In";
            let expectedCountry = "India";

            it('(Uppercase) Then it should return India', () => {
                const country = userFunctions.getCountryName(countryCode.toUpperCase(), config);
                expect(country).toMatch(expectedCountry);
            });

            it('(Lowercase) Then it should return India', () => {
                const country = userFunctions.getCountryName(countryCode.toLowerCase(), config);
                expect(country).toMatch(expectedCountry);
            });

            it('(Mixed) Then it should return India', () => {
                const country = userFunctions.getCountryName(countryCode, config);
                expect(country).toMatch(expectedCountry);
            });
        });

        describe('When Provided With Country Code "US"', () => {
            let countryCode = "Us";
            let expectedCountry = "United States";

            it('(Uppercase) Then it should return custom name "United States"', () => {
                const country = userFunctions.getCountryName(countryCode.toUpperCase(), config);
                expect(country).toMatch(expectedCountry);
            });

            it('(Lowercase) Then it should return custom name "United States"', () => {
                const country = userFunctions.getCountryName(countryCode.toLowerCase(), config);
                expect(country).toMatch(expectedCountry);
            });

            it('(Mixed) Then it should return custom name "United States"', () => {
                const country = userFunctions.getCountryName(countryCode, config);
                expect(country).toMatch(expectedCountry);
            });
        });

        describe('When Not Provided With Country Code', () => {
            let countryCode = " ";
            let expectedCountry = "";

            it('Then it should return empty string', () => {
                const country = userFunctions.getCountryName(countryCode, config);
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
                const fullName = userFunctions.getFullName(data);
                expect(fullName).toMatch(expectedName);
            });
        });

        describe('When Provided With First Name Only', () => {
            const data = {
                firstName: "John"
            };
            const expectedName = "John";

            it("Then it should return only first name as entered", () => {
                const fullName = userFunctions.getFullName(data);
                expect(fullName).toMatch(expectedName);
            });
        });

        describe('When Provided With Last Name Only', () => {
            const data = {
                lastName: "Doe"
            };
            const expectedName = "Doe";

            it("Then it should return only last name as entered", () => {
                const fullName = userFunctions.getFullName(data);
                expect(fullName).toMatch(expectedName);
            });
        });

        describe('When Provided With Neither', () => {
            const data = {};
            const expectedName = "";

            it("Then it should return an empty string", () => {
                const fullName = userFunctions.getFullName(data);
                expect(fullName).toMatch(expectedName);
            });
        });
    });

    describe('Scenario getFullCompanyAddress Function', () => {
        let address = {
            "partnerNumber": "aDVt-zwHgDPsb3a-3P6r4Q==",
            "isDefault": false,
            "name": "Astrazeneca",
            "address1": "Address Line 1",
            "address2": "Address Line 2",
            "address3": "Address Line 3",
            "street": "50 Otis St",
            "city": "Westborough",
            "state": "MA",
            "stateName": "Massachusetts",
            "postalCode": "01581-3323",
            "country": "US",
            "countryName": "USA"
        };


        describe('When Address is Complete', () => {
            const expectedAddress = [
                "Astrazeneca",
                "Address Line 1",
                "Address Line 2",
                "Address Line 3",
                "50 Otis St",
                "Westborough, MA 01581-3323"
            ];

            it('Then it should return the address properly formatted', () => {
                const newAddress = userFunctions.getFullCompanyAddress(address);
                expect(newAddress).toStrictEqual(expectedAddress);
            });
        });

        describe('When Address is Incomplete', () => {
            it('Then it should only return part of the address', () => {
                let tmpAddress, expectedAddress, newAddress;

                // No Address 1
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.address1;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 2",
                    "Address Line 3",
                    "50 Otis St",
                    "Westborough, MA 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No Address 2
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.address2;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 3",
                    "50 Otis St",
                    "Westborough, MA 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No Address 3
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.address3;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "50 Otis St",
                    "Westborough, MA 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No City
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.city;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "Address Line 3",
                    "50 Otis St",
                    "MA 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No State
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.state;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "Address Line 3",
                    "50 Otis St",
                    "Westborough, 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No Street
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.street;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "Address Line 3",
                    "Westborough, MA 01581-3323"
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No Zip
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.postalCode;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "Address Line 3",
                    "50 Otis St",
                    "Westborough, MA "
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);

                // No Zip & Street
                tmpAddress = {
                    ...address
                };
                delete tmpAddress.postalCode;
                delete tmpAddress.street;
                expectedAddress = [
                    "Astrazeneca",
                    "Address Line 1",
                    "Address Line 2",
                    "Address Line 3",
                    "Westborough, MA "
                ];
                newAddress = userFunctions.getFullCompanyAddress(tmpAddress);
                expect(newAddress).toStrictEqual(expectedAddress);
            });
        });

        describe("When Provided With No Address", () => {
            it('Then it should return an empty string', () => {
                const newAddress = userFunctions.getFullCompanyAddress({});
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
                const newAddresses = userFunctions.getAddressesByType(addresses, "shipping");

                expect(newAddresses).toHaveLength(3);

                newAddresses.forEach(address => {
                    expect(address.addressType).toMatch("shipping");
                });
            });
        });

        describe('When Given Type Billing', () => {
            it('Then it should only return addresses with type billing', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "billing");

                expect(newAddresses).toHaveLength(2);

                newAddresses.forEach(address => {
                    expect(address.addressType).toMatch("billing");
                });
            });
        });

        describe('When Given Invalid Type', () => {
            it('Then it should only return an empty array', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "invalidType");

                expect(newAddresses).toHaveLength(0);
            });
        });

        describe('When Given No Address', () => {
            let newAddresses;
            it('Then it should return an empty array', () => {
                newAddresses = userFunctions.getAddressesByType([], "billing");
                expect(newAddresses).toHaveLength(0);

                newAddresses = userFunctions.getAddressesByType([], "shipping");
                expect(newAddresses).toHaveLength(0);
            });
        });
    });

    describe('Scenario getDefaultSoldTo Function', () => {
        const soldToAccounts = soldToDetailsJSON.customers;

        describe('When Provided With Sold To Account Data', () => {
            it('Then it should return only the Default Sold To Data', () => {
                const defaultSoldTo = userFunctions.getDefaultSoldTo(soldToAccounts);

                expect(defaultSoldTo).toStrictEqual(soldToAccounts.customers[0]);
            });
        });

        describe("When Provided With No Sold To Account Data", () => {
            it('And soldToAccounts = null, Then it should return an empty array', () => {
                const defaultSoldTo = userFunctions.getDefaultSoldTo(null);
                expect(defaultSoldTo).toEqual([]);
            });
            it('And soldToAccounts = [], Then it should return an empty array', () => {
                const defaultSoldTo = userFunctions.getDefaultSoldTo([]);
                expect(defaultSoldTo).toEqual([]);
            });
        });
    });

    describe('Scenario getDefaultSoldToAddresses Function', () => {
        const soldToAccounts = soldToDetailsJSON.customers;

        describe('When Provided With Sold To Account Data', () => {
            it('Then it should return only the Default Sold To Addresses', () => {
                const getDefaultSoldToAddresses = userFunctions.getDefaultSoldToAddresses(soldToAccounts);
                console.log(getDefaultSoldToAddresses.debug());
                expect(getDefaultSoldToAddresses.addresses.billToInfo).toStrictEqual(soldToAccounts.billToInfo);
            });
        });

        describe("When Provided With No Sold To Account Data", () => {
            it('And defaultSoldTo = null, Then it should return an empty object', () => {
                const getDefaultSoldToAddresses = userFunctions.getDefaultSoldToAddresses(null);
                expect(getDefaultSoldToAddresses).toEqual({});
            });
            it('And defaultSoldTo = [], Then it should return an empty object', () => {
                const getDefaultSoldToAddresses = userFunctions.getDefaultSoldToAddresses([]);
                expect(getDefaultSoldToAddresses).toEqual({});
            });
        });
    });
});