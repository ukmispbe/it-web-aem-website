import * as profileFormatter from '../profileFormatter';

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
            firstName: "john",
            lastName: "doe"
        };
        const expectedName = "John Doe";

        it("Then it should return both names capitalized", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });

    describe('When Provided With First Name Only', () => {
        const data = {
            firstName: "John"
        };
        const expectedName = "John";

        it("Then it should return only first name capitalized", () => {
            const fullName = profileFormatter.getFullName(data);
            expect(fullName).toMatch(expectedName);
        });
    });

    describe('When Provided With Last Name Only', () => {
        const data = {
            lastName: "Doe"
        };
        const expectedName = "Doe";

        it("Then it should return only last name capitalized", () => {
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

describe('Scenario getFullAddress Function', () => {
    let address = {
        street: "123 main st ",
        city: "cityville",
        stateRegion: " Region ",
        zip: "12345"
    };

    describe('When Address is Complete', () => {
        const expectedAddress = "123 Main St, Cityville, Region 12345";

        it('Then it should return the address properly formatted', () => {
            const newAddress = profileFormatter.getFullAddress(address);
            expect(newAddress).toMatch(expectedAddress);
        });
    });

    describe('When Address is Incomplete', () => {
        it('Then it should only return part of the address', () => {
            let tmpAddress, expectedAddress, newAddress;

            // No City
            tmpAddress = {...address};
            delete tmpAddress.city;
            expectedAddress = "123 Main St, Region 12345";
            newAddress = profileFormatter.getFullAddress(tmpAddress);
            expect(newAddress).toMatch(expectedAddress);

            // No State
            tmpAddress = {...address};
            delete tmpAddress.stateRegion;
            expectedAddress = "123 Main St, Cityville, 12345";
            newAddress = profileFormatter.getFullAddress(tmpAddress);
            expect(newAddress).toMatch(expectedAddress);

            // No Street
            tmpAddress = {...address};
            delete tmpAddress.street;
            expectedAddress = "Cityville, Region 12345";
            newAddress = profileFormatter.getFullAddress(tmpAddress);
            expect(newAddress).toMatch(expectedAddress);

            // No Zip
            tmpAddress = {...address};
            delete tmpAddress.zip;
            expectedAddress = "123 Main St, Cityville, Region";
            newAddress = profileFormatter.getFullAddress(tmpAddress);
            expect(newAddress).toMatch(expectedAddress);

            // No Zip & Street
            tmpAddress = {...address};
            delete tmpAddress.zip;
            delete tmpAddress.street;
            expectedAddress = "Cityville, Region";
            newAddress = profileFormatter.getFullAddress(tmpAddress);
            expect(newAddress).toMatch(expectedAddress);
        });
    });

    describe("When Provided With No Address", () => {
        it('Then it should return an empty string', () => {
            const newAddress = profileFormatter.getFullAddress({});
            expect(newAddress).toMatch("");
        });
    });
});

describe('Scenario getPhoneFormat Function', () => {
    describe('When Given Full Phone Number', () => {
        const phoneNumber = "1234567890";
        const expectedNumber = "123-456-7890";
        it('Then it should return a properly formatted number', () => {
            const newNumber = profileFormatter.getPhoneFormat(phoneNumber);
            expect(newNumber).toMatch(expectedNumber);
        });
    });

    describe('When Given a Partial Phone Number', () => {
        let phoneNumber, expectedNumber;
        it('Then it should return a properly formatted number with whats provided', () => {
            let newNumber;

            phoneNumber = "4567890";
            expectedNumber = "456-7890";
            newNumber = profileFormatter.getPhoneFormat(phoneNumber);
            expect(newNumber).toMatch(expectedNumber);

            phoneNumber = "911";
            expectedNumber = "911";
            newNumber = profileFormatter.getPhoneFormat(phoneNumber);
            expect(newNumber).toMatch(expectedNumber);
        });
    });

    describe('When Given No Phone Number', () => {
        it('Then it should return an empty string', () => {
            const newNumber = profileFormatter.getPhoneFormat(" ");
            expect(newNumber).toMatch("");
        });
    });
});

describe('Scenario getAddressesByType Function', () => {
    const addresses = [
        {
            id: 0,
            addressType: "shippingAddress"
        },
        {
            id: 1,
            addressType: "shippingAddress"
        },
        {
            id: 5,
            addressType: "billingAddress"
        },
        {
            id: 2,
            addressType: "shippingAddress"
        },
        {
            id: 3,
            addressType: "billingAddress"
        },
        {
            id: 4,
            addressType: "mailingAddress"
        },
    ];

    describe('When Given Type Shipping', () => {
        it('Then it should only return addresses with type shippingAddress', () => {
            const newAddresses = profileFormatter.getAddressesByType(addresses, "shipping");

            expect(newAddresses).toHaveLength(3);

            newAddresses.forEach(address => {
                expect(address.addressType).toMatch("shippingAddress");
            });
        });
    });

    describe('When Given Type Billing', () => {
        it('Then it should only return addresses with type billingAddress', () => {
            const newAddresses = profileFormatter.getAddressesByType(addresses, "billing");

            expect(newAddresses).toHaveLength(2);

            newAddresses.forEach(address => {
                expect(address.addressType).toMatch("billingAddress");
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