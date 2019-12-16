const userDetailsURL = "https://test-www.waters.com:8443/api/waters/user/v1/details?email={email}"
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
  
export { userTokenStr, userDetailsJSON, userDetailsURL};