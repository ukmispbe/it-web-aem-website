const userDetailsJSON = {
	userId: "9ETRLcbBXOBS9iLEefW-Vw==",
	firstName: "Mayank1",
	lastName: "Goswami",
	email: "testorders@waters.com",
	sapWebUserId: "2768004",
	namePrefix: "Company",
	pronunciation: null,
	phone: "8773334567",
	localeCountry: "US",
	localeLanguage: "en",
	migrated: "Y",
	company: "Waters",
	communications: false,
	password: null,
	country: null,
	currencyCode: null,
	soldTo: null,
	isoCode: "en_US",
	privacy: false,
	dummySoldto: null,
	approvalStatus: "A",
	consentChinaShopTerms: null,
	salesOrg: "US01",
	soldToAccounts: [{
		soldTo: "W8IfyyXIEaCpaXS9ZlRiwQ==",
		defaultFlag: 1,
	}, ],
	userSupport: [],
	productEntitlements: {},
	userRole: null,
	formCategoryType: null,
	formDescription: null,
	userAddress: [{
			id: 1345098,
			company: "Waters",
			department: null,
			street: null,
			building: null,
			city: null,
			stateRegion: null,
			zip: null,
			countryCode: "US",
			addressType: "mailingAddress",
		},
		{
			id: 111111246,
			company: "dsfadsfadf",
			department: null,
			street: "asdfasdfads fasdfdasfaasdfadsfasdfsdf",
			building: null,
			city: "sdfadsfadsf",
			stateRegion: "MA",
			zip: "10748",
			countryCode: "US",
			addressType: "shippingAddress",
		},
		{
			id: 1348575,
			company: "sdf adsadf",
			department: null,
			street: "dsfads fasdasdfadsf a ",
			building: null,
			city: "asdfasdfadsf",
			stateRegion: "MD",
			zip: "01748",
			countryCode: "US",
			addressType: "billingAddress",
		},
	],
};

const soldToDetailsJSON = {
	"namePrefix": "Company",
	"firstName": "Mayank1",
	"lastName": "Goswami",
	"email": "testorders@waters.com",
	"phone": "8773334567",
	"languageCode": "en",
	"employeeFlag": false,
	"customers": [{
		"soldToFlag": 1,
		"customerNumber": "W8IfyyXIEaCpaXS9ZlRiwQ==",
		"salesOrg": "US01",
		"name": "ASTRAZENECA PHARMACEUTICALS LP",
		"partialDeliveryAllowed": false,
		"paymentTerm": "30ID",
		"paymentTermDescription": "NET 30 DAYS",
		"soldToInfo": [{
			"partnerNumber": "W8IfyyXIEaCpaXS9ZlRiwQ==",
			"isDefault": false,
			"name": "ASTRAZENECA PHARMACEUTICALS LP",
			"street": "331 CLAY RD",
			"street2": "Robinson envlave",
			"city": "ROCHESTER",
			"district": "MONROE",
			"state": "NY",
			"stateName": "New York",
			"postalCode": "14623-3226",
			"country": "US",
			"countryName": "USA"
		}],
		"billToInfo": [{
			"partnerNumber": "enQcKCKHfIXyqLfdlWsnMA==",
			"isDefault": true,
			"name": "ASTRAZENECA",
			"address2": "ACCOUNTS PAYABLE",
			"street": "PO BOX 15250",
			"city": "WILMINGTON",
			"postBoxNumber": "15250",
			"district": "NEW CASTLE",
			"state": "DE",
			"stateName": "Delaware",
			"postalCode": "19850-5250",
			"country": "US",
			"countryName": "USA"
		}],
		"shipToInfo": [{
			"partnerNumber": "W8IfyyXIEaCpaXS9ZlRiwQ==",
			"isDefault": false,
			"name": "ASTRAZENECA PHARMACEUTICALS LP",
			"street": "331 CLAY RD",
			"street2": "Robinson envlave",
			"city": "ROCHESTER",
			"district": "MONROE",
			"state": "NY",
			"stateName": "New York",
			"postalCode": "14623-3226",
			"country": "US",
			"countryName": "USA"
		}],
		"payerInfo": [{
			"partnerNumber": "enQcKCKHfIXyqLfdlWsnMA==",
			"isDefault": true,
			"name": "ASTRAZENECA",
			"address2": "ACCOUNTS PAYABLE",
			"street": "PO BOX 15250",
			"city": "WILMINGTON",
			"postBoxNumber": "15250",
			"district": "NEW CASTLE",
			"state": "DE",
			"stateName": "Delaware",
			"postalCode": "19850-5250",
			"country": "US",
			"countryName": "USA"
		}],
		"carrierInfo": [{
			"partnerNumber": "400005",
			"isDefault": true,
			"name": "Fed X 3 Day",
			"street": "34 Maple St",
			"city": "Milford",
			"district": "WORCESTER",
			"state": "MA",
			"stateName": "Massachusetts",
			"postalCode": "01757-3696",
			"country": "US",
			"countryName": "USA"
		}]
	}]
};

export {
	userDetailsJSON,
	soldToDetailsJSON,
};