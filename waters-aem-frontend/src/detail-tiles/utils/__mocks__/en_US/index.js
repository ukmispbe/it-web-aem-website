const defaultData = {
    firstName: "John",
    lastName: "Doe",
    localeCountry: "us",
    company: "Waters Corporation",
    phone: "1234567890",
    email: "john_doe@example.com",
    icon: "/content/dam/waters/en/brand-assets/icons/refresh.svg",
    userAddress: [
        {
            id: 0,
            preferred: true,
            company: "Waters Corp",
            street: "123 Main Street",
            city: "Cityville",
            stateRegion: "Stateton",
            zip: "12345",
            country: "United States",
            countryCode: "us",
            pending: false,
            addressType: "shippingAddress"
        },
        {
            id: 1,
            preferred: false,
            company: "Waters Corpss",
            street: "456 Main Street",
            city: "Cityville",
            stateRegion: "Stateton",
            zip: "67890",
            country: "United States",
            countryCode: "us",
            pending: true,
            addressType: "shippingAddress"
        },
        {
            id: 2,
            preferred: false,
            company: "Waters Corps",
            street: "789 Main Street",
            city: "Cityville",
            stateRegion: "Statetone",
            zip: "12345",
            country: "United States",
            countryCode: "us",
            pending: false,
            addressType: "shippingAddress"
        },
        {
            id: 3,
            preferred: false,
            company: "Waters Corps",
            street: "101 Main Street",
            city: "Cityville",
            stateRegion: "Stateton",
            zip: "12345",
            country: "United States",
            countryCode: "us",
            pending: false,
            addressType: "mailingAddress"
        },
        {
            id: 4,
            preferred: true,
            company: "Waters Corp.",
            street: "112 Main Street",
            city: "Cityville",
            stateRegion: "Stateton",
            zip: "10111",
            country: null,
            countryCode: "in",
            pending: true,
            addressType: "billingAddress"
        },
        {
            id: 5,
            preferred: false,
            company: "Waters Corp",
            street: "131 Main Street",
            city: "Cityville",
            stateRegion: "Stateton",
            zip: "21314",
            country: "United States",
            countryCode: "us",
            pending: true,
            addressType: "billingAddress"
        },
    ]
};

export default defaultData;