import * as userFunctions from '../userFunctions';
import defaultData from '../__mocks__/en_US/index';
import mockBodyHTML from '../../__mocks__/en_US/html/mock-body-html';
import { soldToDetailsJSON } from '../../__mocks__/en_US/services/mock-services-json';

describe('Scenario userFunctions Methods', () => {
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
        // if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
        describe('When User is from US', () => {  
            let tmpNameData, expectedName;
            let data = {
                userAddress: {
                    countryCode: "US",
                    addressType: "mailingAddress"
                },
                firstName: "John",
                lastName: "Doe"
            };  
            describe('When Provided With First and Last Name', () => {
                tmpNameData = {
                    ...data
                };
                expectedName = "John Doe";

                it("Then it should return both names as entered", () => {
                    const fullName = userFunctions.getFullName(tmpNameData);
                    expect(fullName).toMatch(expectedName);
                });
            });

            describe('When Provided With First Name Only', () => {
                tmpNameData = {
                    ...data
                };
                delete tmpNameData.lastName;
                expectedName = "John";

                it("Then it should return only first name as entered", () => {
                    const fullName = userFunctions.getFullName(tmpNameData);
                    expect(fullName).toMatch(expectedName);
                });
            });

            describe('When Provided With Last Name Only', () => {
                tmpNameData = {
                    ...data
                };
                delete tmpNameData.firstName;
                expectedName = "Doe";

                it("Then it should return only last name as entered", () => {
                    const fullName = userFunctions.getFullName(tmpNameData);
                    expect(fullName).toMatch(expectedName);
                });
            });

            describe('When Provided With Neither', () => {
                tmpNameData = {};
                expectedName = "";

                it("Then it should return an empty string", () => {
                    const fullName = userFunctions.getFullName(tmpNameData);
                    expect(fullName).toMatch(expectedName);
                });
            });
        });
        describe('When User is from Japan (JP)', () => {  
            let tmpNameData, expectedName;
            let data = {
                userAddress: [{
                    countryCode: "JP",
                    addressType: "mailingAddress"
                }],
                firstName: "John",
                lastName: "Doe"
            };  
            describe('When Provided With First and Last Name', () => {
                tmpNameData = {
                    ...data
                };
                expectedName = "Doe John";

                it("Then it should return last name then first name", () => {
                    const fullName = userFunctions.getFullName(tmpNameData);
                    expect(fullName).toMatch(expectedName);
                });
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
        const addresses = {
            "soldToInfo": [{
                "name": "Address1"
            }],
            "billToInfo": [{
                "name": "Address2"
            }, {
                "name": "Address3"
            }],
            "shipToInfo": [{
                "name": "Address4"
            }, {
                "name": "Address5"
            }, {
                "name": "Address6"
            }],
            "payerInfo": [{
                "name": "Address7"
            }]
        };

        // let addresses = {
        //     "soldToInfo": [
        //       {
        //         "partnerNumber": "W8IfyyXIEaCpaXS9ZlRiwQ==",
        //         "isDefault": false,
        //         "name": "ASTRAZENECA PHARMACEUTICALS LP",
        //         "address1": "Master Name 2",
        //         "address2": "Master Name 3",
        //         "address3": "Master Name 5",
        //         "street": "Master - Street 1 331 CLAY RD",
        //         "street2": "Master - Street 4 Robinson envlave",
        //         "city": "ROCHESTER",
        //         "postBoxNumber": "989",
        //         "district": "MONROE",
        //         "state": "NY",
        //         "stateName": "New York",
        //         "postalCode": "14623-3226",
        //         "country": "US",
        //         "countryName": "USA"
        //       }
        //     ],
        //     "billToInfo": [
        //       {
        //         "partnerNumber": "enQcKCKHfIXyqLfdlWsnMA==",
        //         "isDefault": true,
        //         "name": "ASTRAZENECA",
        //         "address2": "ACCOUNTS PAYABLE",
        //         "street": "PO BOX 15250",
        //         "city": "WILMINGTON",
        //         "postBoxNumber": "15250",
        //         "district": "NEW CASTLE",
        //         "state": "DE",
        //         "stateName": "Delaware",
        //         "postalCode": "19850-5250",
        //         "country": "US",
        //         "countryName": "USA"
        //       }
        //     ],
        //     "shipToInfo": [
        //       {
        //         "partnerNumber": "W8IfyyXIEaCpaXS9ZlRiwQ==",
        //         "isDefault": true,
        //         "name": "ASTRAZENECA PHARMACEUTICALS LP",
        //         "address1": "Master Name 2",
        //         "address2": "Master Name 3",
        //         "address3": "Master Name 5",
        //         "street": "Master - Street 1 331 CLAY RD",
        //         "street2": "Master - Street 4 Robinson envlave",
        //         "city": "ROCHESTER",
        //         "postBoxNumber": "989",
        //         "district": "MONROE",
        //         "state": "NY",
        //         "stateName": "New York",
        //         "postalCode": "14623-3226",
        //         "country": "US",
        //         "countryName": "USA"
        //       }
        //     ],
        //     "payerInfo": [
        //       {
        //         "partnerNumber": "enQcKCKHfIXyqLfdlWsnMA==",
        //         "isDefault": true,
        //         "name": "ASTRAZENECA",
        //         "address2": "ACCOUNTS PAYABLE",
        //         "street": "PO BOX 15250",
        //         "city": "WILMINGTON",
        //         "postBoxNumber": "15250",
        //         "district": "NEW CASTLE",
        //         "state": "DE",
        //         "stateName": "Delaware",
        //         "postalCode": "19850-5250",
        //         "country": "US",
        //         "countryName": "USA"
        //       }
        //     ]
        //   };

        describe('When Given Type shipToInfo', () => {
            it('Then it should only return addresses with type shipToInfo', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "shipToInfo");
                expect(newAddresses).toHaveLength(3);
            });
        });

        describe('When Given Type billToInfo', () => {
            it('Then it should only return addresses with type billToInfo', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "billToInfo");
                expect(newAddresses).toHaveLength(2);
            });
        });

        describe('When Given Type soldToInfo', () => {
            it('Then it should only return addresses with type soldToInfo', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "soldToInfo");
                expect(newAddresses).toHaveLength(1);
            });
        });
        

        describe('When Given Type payerInfo', () => {
            it('Then it should only return addresses with type payerInfo', () => {
                const newAddresses = userFunctions.getAddressesByType(addresses, "payerInfo");
                expect(newAddresses).toHaveLength(1);
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
                newAddresses = userFunctions.getAddressesByType([], "billToInfo");
                expect(newAddresses).toHaveLength(0);

                newAddresses = userFunctions.getAddressesByType([], "shipToInfo");
                expect(newAddresses).toHaveLength(0);
            });
        });
    });

    describe('Scenario getDefaultSoldTo Function', () => {
        const soldToAccounts = defaultData.soldToAccounts;

        describe('When Provided With Sold To Account Data', () => {
            it('Then it should return only the Default Sold To Data', () => {
                const defaultSoldTo = userFunctions.getDefaultSoldTo(soldToAccounts);

                expect(defaultSoldTo).toStrictEqual(soldToAccounts[0]);
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