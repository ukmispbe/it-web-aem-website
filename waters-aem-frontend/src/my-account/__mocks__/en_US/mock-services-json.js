const userDetailsURL = "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}"
const soldToDetailsURL = "https://test-www.waters.com:8443/api/waters/user/v1/retrievesoldto?email={email}"
const userTokenStr = 'wendy_batista@waters.com';
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

  
export { userTokenStr, userDetailsJSON, userDetailsURL, soldToDetailsURL, soldToDetailsJSON, soldToDetailsSortedJSON};