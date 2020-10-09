const userDetailsJSON = {
    "firstName": "Wendy",
    "lastName": "Batista",
    "email": "wendy_batista@waters.com",
    "namePrefix": "Mrs.",
    "pronunciation": null,
    "phone": "911",
    "phoneExt": null,
    "localeCountry": "US",
    "localeLanguage": "eng",
    "soldToAccounts": [
      {
        "soldTo": "144936",
        "defaultFlag": 0
      },
      {
        "soldTo": "146929",
        "defaultFlag": 1
      },
      {
        "soldTo": "155555",
        "defaultFlag": 0
      },
      {
        "soldTo": "226719",
        "defaultFlag": 0
      },
      {
        "soldTo": "254134",
        "defaultFlag": 0
      }
    ],
    "userAddress": [
      {
        "id": 830510,
        "company": "Waters",
        "department": "IT",
        "street": "5 Tech Drive.",
        "building": "wendys dept",
        "city": "Milford",
        "stateRegion": "MA",
        "zip": "02545",
        "country": null,
        "countryCode": "US",
        "addressType": "mailingAddress"
      },
      {
        "id": 1334569,
        "company": "Another new company",
        "department": null,
        "street": "1 main st ",
        "building": null,
        "city": "Milford",
        "stateRegion": "MA",
        "zip": "02799",
        "country": null,
        "countryCode": "US",
        "addressType": "billingAddress"
      },
      {
        "id": 1333588,
        "company": "Another new company",
        "department": null,
        "street": "1 main st ",
        "building": null,
        "city": "Milford",
        "stateRegion": "ME",
        "zip": "09876",
        "country": null,
        "countryCode": "US",
        "addressType": "shippingAddress"
      }
    ],
    "credentialsUpdated": null
}
const soldToDetailsSortedJSON = [{
    "soldTo": "155555",
    "default_soldTo": 1,
    "company": "SAVANNAH FOOD INDUSTRIAL INC",
    "partnerAddress": [
      {
        "addr1": "SAVANNAH FOOD INDUSTRIAL INC",
        "addr2": "CMD Bill to Name 2",
        "addr3": "ACCOUNTS PAYABLE",
        "addr4": "",
        "street": "PO Box339",
        "city": "SAVANNAH",
        "regio": "GA",
        "postalCd": "31402-0339",
        "country": "US",
        "addressType": "billTo"
      },
      {
        "addr1": "SAVANNAH FOOD INDUSTRIAL INCORPORAT",
        "addr2": "WD1 13-Oct-2012 Line1",
        "addr3": "WD1 13-Oct-2012 Line2",
        "addr4": "",
        "street": "Street",
        "city": "PORT WENTWORTH",
        "regio": "GA",
        "postalCd": "31407",
        "country": "US",
        "addressType": "shipTo"
      }
    ]
  },
  {
    "soldTo": "144936",
    "default_soldTo": 0,
    "company": "ASTRAZENECA",
    "partnerAddress": [
      {
        "addr1": "ASTRAZENECA",
        "addr2": "",
        "addr3": "",
        "addr4": "",
        "street": "50 OTIS ST",
        "city": "WESTBOROUGH",
        "regio": "MA",
        "postalCd": "01581-3323",
        "country": "US",
        "addressType": "shipTo"
      },
      {
        "addr1": "ASTRAZENECA",
        "addr2": "",
        "addr3": "ACCOUNTS PAYABLE",
        "addr4": "",
        "street": "PO Box15250",
        "city": "WILMINGTON",
        "regio": "DE",
        "postalCd": "19850-5250",
        "country": "US",
        "addressType": "billTo"
      }
    ]
  },
  {
    "soldTo": "146929",
    "default_soldTo": 0,
    "company": "CLOROX COMPANY",
    "partnerAddress": [
      {
        "addr1": "CLOROX COMPANY",
        "addr2": "",
        "addr3": "",
        "addr4": "",
        "street": "7200 JOHNSON DR",
        "city": "PLEASANTON",
        "regio": "CA",
        "postalCd": "94588-8005",
        "country": "US",
        "addressType": "shipTo"
      },
      {
        "addr1": "CLOROX COMPANY",
        "addr2": "",
        "addr3": "ACCOUNTS PAYABLE",
        "addr4": "",
        "street": "PO Box493",
        "city": "PLEASANTON",
        "regio": "CA",
        "postalCd": "94566-0803",
        "country": "US",
        "addressType": "billTo"
      }
    ]
  },
  {
    "soldTo": "226719",
    "default_soldTo": 0,
    "company": "UNIV OF TEXAS",
    "partnerAddress": [
      {
        "addr1": "UNIV OF TEXAS",
        "addr2": "MD ANDERSON CANCER CTR",
        "addr3": "ACCOUNTS PAYABLE",
        "addr4": "",
        "street": "PO Box301401",
        "city": "HOUSTON",
        "regio": "TX",
        "postalCd": "77230-1401",
        "country": "US",
        "addressType": "billTo"
      },
      {
        "addr1": "UNIV OF TEXAS",
        "addr2": "MD ANDERSON CANCER CTR",
        "addr3": "",
        "addr4": "",
        "street": "7455 FANNIN BLVD",
        "city": "HOUSTON",
        "regio": "TX",
        "postalCd": "77054-1901",
        "country": "US",
        "addressType": "shipTo"
      }
    ]
  }
];
const soldToDetailsJSON = [
		{
			"customerNumber": "aDVt-zwHgDPsb3a-3P6r4Q==",
			"salesOrg": "US01",
			"name": "Astrazeneca",
			"partialDeliveryAllowed": false,
			"paymentTerm": "60ID",
			"paymentTermDescription": "NET 60 DAYS",
			"soldToInfo": [
				{
					"partnerNumber": "aDVt-zwHgDPsb3a-3P6r4Q==",
					"isDefault": false,
					"name": "Astrazeneca",
					"address1": "Address line 2",
					"address2": "Address line 3",
					"street": "50 Otis St",
					"city": "Westborough",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "01581-3323",
					"country": "US",
					"countryName": "USA"
				}
			],
			"billToInfo": [
				{
					"partnerNumber": "0-idzXZ2oE66WlpcDX1NEg==",
					"isDefault": true,
					"name": "AstraZeneca Pharmaceuticals LP",
					"address1": "Address line 2",
					"address2": "Accounts Payable",
					"address3": "Address line 4",
					"street": "PO Box 15250",
					"city": "Wilmington",
					"postBoxNumber": "15250",
					"state": "DE",
					"stateName": "Delaware",
					"postalCode": "19850-5250",
					"country": "US",
					"countryName": "USA"
				}
			],
			"shipToInfo": [
				{
					"partnerNumber": "aDVt-zwHgDPsb3a-3P6r4Q==",
					"isDefault": false,
					"name": "Astrazeneca",
					"address1": "Address line 2",
					"address2": "Address line 3",
					"street": "50 Otis St",
					"city": "Westborough",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "01581-3323",
					"country": "US",
					"countryName": "USA"
				}
			],
			"payerInfo": [
				{
					"partnerNumber": "0-idzXZ2oE66WlpcDX1NEg==",
					"isDefault": true,
					"name": "AstraZeneca Pharmaceuticals LP",
					"address1": "Address line 2",
					"address2": "Accounts Payable",
					"address3": "Address line 4",
					"street": "PO Box 15250",
					"city": "Wilmington",
					"postBoxNumber": "15250",
					"state": "DE",
					"stateName": "Delaware",
					"postalCode": "19850-5250",
					"country": "US",
					"countryName": "USA"
				}
			],
			"carrierInfo": [
				{
					"partnerNumber": "402775",
					"isDefault": true,
					"name": "Fed X Ground",
					"street": "210 Grove St",
					"city": "Franklin",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "02038-3119",
					"country": "US",
					"countryName": "USA"
				}
			]
		},
		{
			"customerNumber": "EADH9uSPFdioM110m-n8OQ==",
			"salesOrg": "US01",
			"name": "Mallinckrodt Inc",
			"partialDeliveryAllowed": false,
			"paymentTerm": "CRCD",
			"paymentTermDescription": "CREDIT CARD",
			"soldToInfo": [
				{
					"partnerNumber": "EADH9uSPFdioM110m-n8OQ==",
					"isDefault": false,
					"name": "Mallinckrodt Inc",
					"street": "2820 SW Sam Jackson Park Rd",
					"city": "Portland",
					"state": "OR",
					"stateName": "Oregon",
					"postalCode": "97201-3006",
					"country": "US",
					"countryName": "USA"
				}
			],
			"billToInfo": [
				{
					"partnerNumber": "EADH9uSPFdioM110m-n8OQ==",
					"isDefault": true,
					"name": "Mallinckrodt Inc",
					"street": "2820 SW Sam Jackson Park Rd",
					"city": "Portland",
					"state": "OR",
					"stateName": "Oregon",
					"postalCode": "97201-3006",
					"country": "US",
					"countryName": "USA"
				}
			],
			"shipToInfo": [
				{
					"partnerNumber": "EADH9uSPFdioM110m-n8OQ==",
					"isDefault": false,
					"name": "Mallinckrodt Inc",
					"street": "2820 SW Sam Jackson Park Rd",
					"city": "Portland",
					"state": "OR",
					"stateName": "Oregon",
					"postalCode": "97201-3006",
					"country": "US",
					"countryName": "USA"
				}
			],
			"payerInfo": [
				{
					"partnerNumber": "EADH9uSPFdioM110m-n8OQ==",
					"isDefault": true,
					"name": "Mallinckrodt Inc",
					"street": "2820 SW Sam Jackson Park Rd",
					"city": "Portland",
					"state": "OR",
					"stateName": "Oregon",
					"postalCode": "97201-3006",
					"country": "US",
					"countryName": "USA"
				}
			],
			"carrierInfo": [
				{
					"partnerNumber": "400005",
					"isDefault": true,
					"name": "Fed X 3 Day",
					"street": "210 Grove St",
					"city": "Franklin",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "02038-3119",
					"country": "US",
					"countryName": "USA"
				}
			]
		},
		{
			"customerNumber": "rRVirenhUzRLsW4pT5AJ3A==",
			"salesOrg": "US01",
			"name": "Northeast Treaters Inc",
			"partialDeliveryAllowed": false,
			"paymentTerm": "30ID",
			"paymentTermDescription": "NET 30 DAYS",
			"soldToInfo": [
				{
					"partnerNumber": "rRVirenhUzRLsW4pT5AJ3A==",
					"isDefault": false,
					"name": "Northeast Treaters Inc",
					"street": "201 Old Springfield Rd",
					"city": "Belchertown",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "01007-9693",
					"country": "US",
					"countryName": "USA"
				}
			],
			"billToInfo": [
				{
					"partnerNumber": "lHPBH7Up5oIAriyYmLlvyQ==",
					"isDefault": true,
					"name": "Arch Treatment Technologies Inc",
					"address2": "Accounts Payable",
					"street": "5660 New Northside Dr Ste 1100",
					"city": "Atlanta",
					"state": "GA",
					"stateName": "Georgia",
					"postalCode": "30328-5811",
					"country": "US",
					"countryName": "USA"
				}
			],
			"shipToInfo": [
				{
					"partnerNumber": "rRVirenhUzRLsW4pT5AJ3A==",
					"isDefault": false,
					"name": "Northeast Treaters Inc",
					"street": "201 Old Springfield Rd",
					"city": "Belchertown",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "01007-9693",
					"country": "US",
					"countryName": "USA"
				}
			],
			"payerInfo": [
				{
					"partnerNumber": "lHPBH7Up5oIAriyYmLlvyQ==",
					"isDefault": true,
					"name": "Arch Treatment Technologies Inc",
					"address2": "Accounts Payable",
					"street": "5660 New Northside Dr Ste 1100",
					"city": "Atlanta",
					"state": "GA",
					"stateName": "Georgia",
					"postalCode": "30328-5811",
					"country": "US",
					"countryName": "USA"
				}
			],
			"carrierInfo": [
				{
					"partnerNumber": "402775",
					"isDefault": true,
					"name": "Fed X Ground",
					"street": "210 Grove St",
					"city": "Franklin",
					"state": "MA",
					"stateName": "Massachusetts",
					"postalCode": "02038-3119",
					"country": "US",
					"countryName": "USA"
				}
			]
		}
	];
const soldToDetailsInvalidSoldToJSON = []

export { userDetailsJSON, soldToDetailsJSON, soldToDetailsSortedJSON, soldToDetailsInvalidSoldToJSON };