(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isCartHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isSignInHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elementLocator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getHttpStatusFromErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return htmlParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCompanyLogo; });
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(90);
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_html_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);


 // This function determines the eCommerce Status of the User / Country combination
// The eCommerce status is determined from the "data-ecommerce-state" which is returned in the header Navigation

var isCartHidden = function isCartHidden() {
  var eCommStatus;
  var headerNavigation_cartLI = document.querySelector('.top-bar__nav__cart');

  if (headerNavigation_cartLI) {
    eCommStatus = headerNavigation_cartLI.attributes["data-ecommerce-state"].value.toUpperCase();
  }

  if (eCommStatus === "DISABLED") {
    return true;
  }

  if (eCommStatus === "FULL_ENABLED") {
    return false;
  }

  if (eCommStatus === "PARTIAL_ENABLED") {
    if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state()) {
      var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
      var soldToDetails = store.getSoldToDetails();

      if (!soldToDetails || soldToDetails.length === 0) {
        return true;
      }
    } else {
      return true;
    }
  }

  return false;
}; // Hide Sign In Component if If Partial or Disabled

var isSignInHidden = function isSignInHidden() {
  var eCommStatus;
  var headerNavigation_cartLI = document.querySelector('.top-bar__nav__cart');

  if (headerNavigation_cartLI) {
    eCommStatus = headerNavigation_cartLI.attributes["data-ecommerce-state"].value.toUpperCase();
  }

  if (eCommStatus === "DISABLED" || eCommStatus === "PARTIAL_ENABLED") {
    return true;
  }

  if (eCommStatus === "FULL_ENABLED") {
    return false;
  }

  return false;
};
var elementLocator = function elementLocator(str) {
  try {
    return str ? str.trim().replace(/ /g, '-').toLowerCase() : '';
  } catch (e) {
    return str;
  }
};
var getHttpStatusFromErrors = function getHttpStatusFromErrors(arrErrors, defaultCode) {
  try {
    return Array.isArray(arrErrors) ? arrErrors.reduce(function (acc, item) {
      if (item.hasOwnProperty('code')) {
        acc = parseInt(item.code.substring(item.code.lastIndexOf('_') + 1), 10);
      }

      return acc;
    }, defaultCode) : defaultCode;
  } catch (e) {
    return defaultCode;
  }
};
var htmlParser = function htmlParser() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  try {
    return react_html_parser__WEBPACK_IMPORTED_MODULE_0___default()(text.trim()).toString();
  } catch (err) {
    return text;
  }
};
var getCompanyLogo = function getCompanyLogo(dir, company) {
  var logoDir = dir.replace(/\/$/, '');
  var logo = company.replace(/[\|#%{}?&-]/g, '').replace(/\s+/g, "-").toLowerCase();
  return "".concat(logoDir, "/").concat(logo, ".png");
};

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return replaceTextWith; });
/**
 * Function is used to replace the placeholder text within the element using the transformationObject
 * @param {domElement} el DOM element
 * @param {object} transformationObject Object of key value pairs, key would maps placeholder and value would maps to text to be updated
 */
var replaceTextWith = function replaceTextWith(el, transformationObject) {
  var matches = el.innerHTML.match(/{{(.*?)}}/gi);
  Array.from(matches).forEach(function (match) {
    var key = match.replace('{{', '').replace('}}', '');
    el.innerHTML = el.innerHTML.replace(match, transformationObject[key]);
  });
};

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);


function getIsocode() {
  var isoCode;
  var footerIsocode = JSON.parse(document.getElementById('commerce-configs-json').innerHTML).isocode;

  if (!footerIsocode) {
    var localeLanguage = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].language;
    var localeCountry = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country;

    if (!localeLanguage && !localeCountry || _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country === _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].globalExperience) {
      localeLanguage = 'en';
      localeCountry = 'US';
    }

    isoCode = localeLanguage + "_" + localeCountry.toUpperCase();
  } else {
    isoCode = footerIsocode;
  }

  return isoCode;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getIsocode: getIsocode
});

/***/ }),

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return getUserId; });
/* unused harmony export getSalesOrg */
/* unused harmony export getSoldToId */
/* unused harmony export getDummySoldToId */
/* unused harmony export getSoldToIdSource */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return callCustomerPriceApi; });
/* unused harmony export trimAndCapitalize */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return getOrderDetailsAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getFullCompanyAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getCountryName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getAddressesByType; });
/* unused harmony export getDefaultSoldTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getDefaultSoldToAddresses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterUserDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return filterSoldToDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getIsoCode; });
/* unused harmony export getUserRole */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return isEprocurementUserRole; });
/* unused harmony export getUsertype */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return isEprocurementUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getEprocUserCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getEprocUserLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return matchAddresses; });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);




var getCountryCode = function getCountryCode() {
  return _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].country ? _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].country.toLowerCase() : '';
};
var getLanguage = function getLanguage() {
  return _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].language;
};
var getUserId = function getUserId() {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();
  var userId = _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state() && userDetails && userDetails.userId != undefined ? userDetails.userId : '';
  return userId;
};
var getSalesOrg = function getSalesOrg() {
  var salesOrg = '';
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();

  if (userDetails || userDetails.length > 0) {
    salesOrg = _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state() && userDetails.salesOrg != undefined ? userDetails.salesOrg : '';
  }

  return salesOrg;
}; //Note: this method uses the USER Details API, not the SoldToDetailsAPI

var getSoldToId = function getSoldToId() {
  var soldToId = '';

  if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state()) {
    var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
    var userDetails = store.getUserDetails();

    if (userDetails || userDetails.length > 0) {
      if (userDetails.soldToAccounts && userDetails.soldToAccounts.length > 0) {
        var priorityAccount;
        userDetails.soldToAccounts.map(function (soldToAccount) {
          if (soldToAccount.defaultFlag === 1) {
            priorityAccount = soldToAccount;
          }
        });

        if (priorityAccount) {
          soldToId = priorityAccount.soldTo ? priorityAccount.soldTo : '';
        }
      }
    }
  }

  return soldToId;
}; //Note: this method uses the USER Details API, not the SoldToDetailsAPI

var getDummySoldToId = function getDummySoldToId() {
  var dummySoldto = '';
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();

  if (userDetails || userDetails.length > 0) {
    dummySoldto = userDetails.dummySoldto != undefined ? userDetails.dummySoldto : '';
  }

  return dummySoldto;
};
var getSoldToIdSource = function getSoldToIdSource(soldToId, dummySoldto) {
  var soldTo = '';

  if (soldToId != '' && dummySoldto == '') {
    soldTo = soldToId;
  } else if (soldToId == '' && dummySoldto != '') {
    soldTo = dummySoldto;
  }

  return soldTo;
}; //Note: Returning all possible soldTo values for debugging and in case of future needs

var callCustomerPriceApi = function callCustomerPriceApi(custPriceApiDisabled) {
  var salesOrg = getSalesOrg();
  var soldToId = getSoldToId();
  var dummySoldto = getDummySoldToId();
  var dynamicSoldTo = getSoldToIdSource(soldToId, dummySoldto);
  var callCustApi = false;

  if (dynamicSoldTo !== '' && salesOrg !== '' && custPriceApiDisabled !== true && custPriceApiDisabled !== "true") {
    callCustApi = true;
  }

  var userInfo = {
    salesOrg: salesOrg,
    soldToId: soldToId,
    dummySoldto: dummySoldto,
    dynamicSoldTo: dynamicSoldTo,
    callCustApi: callCustApi
  };
  return userInfo;
};

var capitalize = function capitalize(str) {
  if (!str || str.trim() === '') return '';
  return str.split(' ').map(function (word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }).join(' ');
};

var trimAndCapitalize = function trimAndCapitalize(item) {
  if (item && typeof item === "string") {
    item = item.replace(/\s\s+/g, ' ');
    item = item.trim();
    item = capitalize(item);
  }

  return item;
}; //Springboot APIs

var getOrderDetailsAddress = function getOrderDetailsAddress(address, includeCountryName) {
  if (!address || Object.entries(address).length === 0 && address.constructor === Object) return '';
  var addressArray = [];
  var city = address.city ? trimAndCapitalize(address.city) + ', ' : '';
  var region = address.region ? trimAndCapitalize(address.region) + ' ' : '';
  var postalCd = address.postalCd ? trimAndCapitalize(address.postalCd) : '';

  if (address.partnerName) {
    address.partnerName ? addressArray.push(trimAndCapitalize(address.partnerName)) : null;
  }

  if (address.addr1) {
    address.addr1 ? addressArray.push(trimAndCapitalize(address.addr1)) : null;
  }

  address.addr2 ? addressArray.push(trimAndCapitalize(address.addr2)) : null;
  address.addr3 ? addressArray.push(trimAndCapitalize(address.addr3)) : null;
  address.addr4 ? addressArray.push(trimAndCapitalize(address.addr4)) : null;
  address.street ? addressArray.push(trimAndCapitalize(address.street)) : null;
  address.street2 ? addressArray.push(trimAndCapitalize(address.street2)) : null;
  addressArray.push(city + region + postalCd);

  if (includeCountryName) {
    address.countryName ? addressArray.push(trimAndCapitalize(address.countryName)) : address.country;
  }

  return addressArray;
}; //Mule User API

var getFullCompanyAddress = function getFullCompanyAddress(address, includeCountryName) {
  if (!address || Object.entries(address).length === 0 && address.constructor === Object) return '';
  var addressArray = [];
  var city = address.city ? trimAndCapitalize(address.city) + ', ' : '';
  var state = address.state ? trimAndCapitalize(address.state) + ' ' : '';
  var postalCode = address.postalCode ? trimAndCapitalize(address.postalCode) : '';
  address.name ? addressArray.push(trimAndCapitalize(address.name)) : null;
  address.address1 ? addressArray.push(trimAndCapitalize(address.address1)) : null;
  address.address2 ? addressArray.push(trimAndCapitalize(address.address2)) : null;
  address.address3 ? addressArray.push(trimAndCapitalize(address.address3)) : null;
  address.street ? addressArray.push(trimAndCapitalize(address.street)) : null;
  address.street2 ? addressArray.push(trimAndCapitalize(address.street2)) : null;
  addressArray.push(city + state + postalCode);

  if (includeCountryName) {
    address.countryName ? addressArray.push(trimAndCapitalize(address.countryName)) : address.country;
  }

  return addressArray;
};
var getCountryName = function getCountryName(countryCode, config) {
  if (!countryCode || countryCode.trim() === '') return '';
  var fields = config.form.fields;
  var countryField = fields.filter(function (field) {
    return field.name === 'country';
  });
  var countryName = countryField[0].options.filter(function (option) {
    return option.countryCode.toLowerCase() === countryCode.toLowerCase();
  });

  if (countryName.length > 0) {
    return countryName[0].displayName;
  } else {
    return countryCode;
  }
};
var getFullName = function getFullName(data) {
  var mailingAddress = data.userAddress.filter(function (address) {
    return address.addressType === 'mailingAddress';
  });
  var userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
  var firstName = data.firstName ? data.firstName.trim() : '';
  var lastName = data.lastName ? data.lastName.trim() : '';

  if (userCountry === 'jp' || userCountry === 'cn' || userCountry === 'kr' || userCountry === 'tw') {
    return (lastName + ' ' + firstName).trim();
  } else {
    return (firstName + ' ' + lastName).trim();
  }
}; //soldToInfo billToInfo shipToInfo payerInfo carrierInfo

var getAddressesByType = function getAddressesByType(addresses, type) {
  var addressTypeData = [];

  for (var _i = 0, _Object$keys = Object.keys(addresses); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];

    if (key === type) {
      addressTypeData = addresses[key];
    }
  }

  return addressTypeData;
};
var getDefaultSoldTo = function getDefaultSoldTo(soldToAccounts) {
  if (soldToAccounts === null || soldToAccounts === undefined || !soldToAccounts.length) {
    return [];
  } else {
    var defaultSoldTo = soldToAccounts.filter(function (i) {
      return i.defaultFlag === 1;
    })[0];
    return defaultSoldTo;
  }
};
var getDefaultSoldToAddresses = function getDefaultSoldToAddresses(soldToAccounts) {
  if (Array.isArray(soldToAccounts) && !soldToAccounts.length) {
    return {};
  } else {
    var defaultSoldTo = getDefaultSoldTo(soldToAccounts);

    if (defaultSoldTo.addresses === null || defaultSoldTo.addresses === undefined) {
      return {};
    } else {
      return defaultSoldTo.addresses;
    }
  }
}; // Save only the User Details allowed

var filterUserDetails = function filterUserDetails(inputUser) {
  var filteredUser = {};

  if (inputUser) {
    filteredUser.firstName = inputUser.firstName;
    filteredUser.lastName = inputUser.lastName;
    filteredUser.company = inputUser.company || '';
    filteredUser.dummySoldto = inputUser.dummySoldto;
    filteredUser.localeCountry = inputUser.localeCountry;
    filteredUser.localeLanguage = inputUser.localeLanguage;
    filteredUser.sapWebUserId = inputUser.sapWebUserId;
    filteredUser.userId = inputUser.userId;
    filteredUser.salesOrg = inputUser.salesOrg;
    filteredUser.soldToAccounts = [];
    filteredUser.approvalStatus = inputUser.approvalStatus;
    filteredUser.userRole = inputUser.userRole;
    filteredUser.isoCode = inputUser.isoCode;

    if (inputUser.soldToAccounts && inputUser.soldToAccounts.length !== 0) {
      filteredUser.soldToAccounts = inputUser.soldToAccounts;
    }

    if (!filteredUser.mailingAddressCountryCode) {
      if (inputUser.userAddress && inputUser.userAddress.length !== 0) {
        var mailingAddress = inputUser.userAddress.filter(function (address) {
          return address.addressType === 'mailingAddress';
        });
        var userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';
        filteredUser.mailingAddressCountryCode = userCountry;
      }
    }
  }

  return filteredUser;
}; // Save only the Sold To Details allowed

var filterSoldToDetails = function filterSoldToDetails(soldToInfo) {
  var filteredSoldTo = [];

  if (soldToInfo) {
    soldToInfo.forEach(function (soldTo) {
      var eachSoldTo = {};
      eachSoldTo.customerNumber = soldTo.customerNumber;
      eachSoldTo.name = soldTo.name;
      eachSoldTo.soldToFlag = soldTo.soldToFlag;
      eachSoldTo.salesOrg = soldTo.salesOrg;
      eachSoldTo.soldToInfo = soldTo.soldToInfo || [], eachSoldTo.billToInfo = soldTo.billToInfo || [], eachSoldTo.shipToInfo = soldTo.shipToInfo || [], eachSoldTo.payerInfo = soldTo.payerInfo || []; //START Patches for EComm

      eachSoldTo.soldTo = soldTo.customerNumber;
      eachSoldTo.company = soldTo.name;
      eachSoldTo.default_soldTo = soldTo.soldToFlag;
      eachSoldTo.partnerAddress = [];

      if (soldTo.billToInfo) {
        eachSoldTo.partnerAddress.push(createPartnerAddress(soldTo.billToInfo[0], "billing"));
      }

      if (soldTo.shipToInfo) {
        eachSoldTo.partnerAddress.push(createPartnerAddress(soldTo.shipToInfo[0], "shipping"));
      } //END Patches for EComm


      filteredSoldTo.push(eachSoldTo);
    });
  }

  return filteredSoldTo;
}; //START Patches for EComm

var createPartnerAddress = function createPartnerAddress(soldToInfo, addressType) {
  var partnerAddress = {
    addr1: soldToInfo.name || "",
    addr2: soldToInfo.address1 || "",
    addr3: soldToInfo.address2 || "",
    addr4: soldToInfo.address3 || "",
    street: soldToInfo.street || "",
    street2: soldToInfo.street2 || "",
    city: soldToInfo.city || "",
    regio: soldToInfo.state || "",
    postalCd: soldToInfo.postalCode || "",
    country: soldToInfo.country || "",
    addressType: addressType
  };
  return partnerAddress;
}; //END Patches for EComm


var getIsoCode = function getIsoCode() {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();

  if (userDetails || userDetails.length > 0) {
    return userDetails.isoCode || '';
  } else {
    return '';
  }
};
var getUserRole = function getUserRole() {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();

  if (userDetails || userDetails.length > 0) {
    return userDetails.userRole && userDetails.userRole.role || '';
  } else {
    return '';
  }
};
var isEprocurementUserRole = function isEprocurementUserRole() {
  return getUserRole() === 'EPROC';
};
var getUsertype = function getUsertype() {
  var sessionStore = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userType = sessionStore.getUserType();

  if (userType !== null) {
    return userType;
  }

  var userConfig = document.getElementById('account-modal-configs-json');

  try {
    var siteConfig = userConfig ? JSON.parse(document.getElementById('account-modal-configs-json').innerHTML).siteConfig : '';
    siteConfig && sessionStore.setUserType(siteConfig || '');
    return siteConfig;
  } catch (e) {
    return '';
  }
};
var isEprocurementUser = function isEprocurementUser() {
  return getUsertype() === 'eProcurement';
};
var getEprocUserCountryCode = function getEprocUserCountryCode() {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();
  return userDetails.mailingAddressCountryCode || '';
};
var getEprocUserLanguage = function getEprocUserLanguage() {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]();
  var userDetails = store.getUserDetails();
  return userDetails.localeLanguage || '';
}; //soldToInfo billToInfo shipToInfo payerInfo carrierInfo

var matchAddresses = function matchAddresses(userDetailsAPIDetails, soldToAPIDetails) {
  userDetailsAPIDetails.soldToAccounts.forEach(function (account) {
    for (var i = 0; i < soldToAPIDetails.length; i++) {
      if (account.soldTo === soldToAPIDetails[i].customerNumber) {
        account.company = soldToAPIDetails[i].name;
        account.addresses = {
          'soldToInfo': soldToAPIDetails[i].soldToInfo || [],
          'billToInfo': soldToAPIDetails[i].billToInfo || [],
          'shipToInfo': soldToAPIDetails[i].shipToInfo || [],
          'payerInfo': soldToAPIDetails[i].payerInfo || []
        };
      }
    }
  });
  return userDetailsAPIDetails;
};

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var removeUrlPathVariable = function removeUrlPathVariable(url, parameter) {
  var urlParts = url.split('?');

  if (urlParts[1]) {
    var prefix = "".concat(encodeURIComponent(parameter), "=");
    var pars = urlParts[1].split(/[&;]/g);
    var filteredVariables = pars.filter(function (value) {
      return value.lastIndexOf(prefix) === -1;
    });
    var pathVars = filteredVariables.length ? "?".concat(filteredVariables.join('&')) : '';
    return "".concat(urlParts[0]).concat(pathVars);
  }

  return url;
};

var removeQueryString = function removeQueryString(url, parameter) {
  var replaceHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  try {
    var query = (window && window.location && window.location.search ? window.location.search : '').substring(1);

    if (query.length && window.history !== undefined && window.history.pushState !== undefined && window.history.replaceState !== undefined) {
      var filteredUrl = parameter ? removeUrlPathVariable(url, parameter) : window.location.pathname;

      if (replaceHistory) {
        window.history.replaceState({}, document && document.title ? document.title : '', filteredUrl);
      } else {
        window.history.pushState({}, document && document.title ? document.title : '', filteredUrl);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (removeQueryString);

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ modal_Header; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ keys; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ ModalApi; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(24);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// CONCATENATED MODULE: ./src/utils/modal/modal-portal.js




var modal_portal_ModalPortal = function ModalPortal(props) {
  var modalElement = document.getElementById("modal-root");
  var el = Object(react["useRef"])(document.createElement('div'));

  var _useState = Object(react["useState"])(!el.current.parentElement),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 1),
      dynamic = _useState2[0];

  react_default.a.useEffect(function () {
    if (dynamic) {
      modalElement.appendChild(el.current);
    }

    return function () {
      if (dynamic && el.current.parentElement) {
        modalElement.removeChild(el.current);
      }
    };
  }, []);
  return react_dom_default.a.createPortal(props.children, el.current);
};

/* harmony default export */ var modal_portal = (react_default.a.memo(modal_portal_ModalPortal));
// EXTERNAL MODULE: ./src/scripts/feedbackSurvey.js
var feedbackSurvey = __webpack_require__(53);

// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(11);

// CONCATENATED MODULE: ./src/utils/modal/index.js







var keys = {
  ModalWithSiteNavOnMobile: 'cmp-modal-box__site-nav-on-mobile',
  HeaderTitleCentered: 'header-with-title-centered',
  HeaderWithTitle: 'header-with-title',
  HeaderWithAddedMarginTop: 'header-with-added-margin-top',
  HeaderWithAddedMarginTopError: 'header-with-added-margin-top__error'
};
var ModalApi = Object(react["createContext"])();
ModalApi.displayName = 'ModalApi';

var modal_Modal = function Modal(props) {
  var mainRef = Object(react["useRef"])();

  var _useState = Object(react["useState"])(''),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      firstFocusableElement = _useState2[0],
      setFirstFocusableElement = _useState2[1];

  var _useState3 = Object(react["useState"])(''),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      lastFocusableElement = _useState4[0],
      setLastFocusableElement = _useState4[1];

  var getApi = Object(react["useMemo"])(function () {
    return {
      onClose: props.onClose,
      closeIcon: props.showCloseIcon && (props.closeIcon || "/content/dam/waters/en/brand-assets/icons/close.svg")
    };
  }, []); // Assigns modal elements in state

  Object(react["useEffect"])(function () {
    try {
      if (props.isOpen) {
        // Select the modal by it's class
        var modalInnerContainer = document.querySelector('.cmp-modal-box');

        if (modalInnerContainer) {
          // Get first element to be focused inside modal
          setFirstFocusableElement(modalInnerContainer.querySelectorAll(props.focusableElements)[0]);
          var focusableContent = modalInnerContainer.querySelectorAll(props.focusableElements); // Get last element to be focused inside modal

          setLastFocusableElement(focusableContent[focusableContent.length - 1]); // Focus on first element in modal

          modalInnerContainer.querySelectorAll(props.focusableElements)[0].focus();
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [props.isOpen]); // Focuses on element inside Modal

  var accessibilityWithinModal = function accessibilityWithinModal(event) {
    // if shift key pressed for shift + tab combination
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        // add focus for the last focusable element
        lastFocusableElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element

      event.preventDefault();
    }
  };

  var handleModalKeyDown = function handleModalKeyDown(event) {
    var keyCode = event.keyCode || event.which || event.key;
    var escapeEntered = keyCode === 27;
    var isModalOpen = document.querySelector(".cmp-modal-box");

    if (isModalOpen && escapeEntered && mainRef.current) {
      mainRef.current.click();
    }

    if (isModalOpen && (event.key === 'Tab' || event.keyCode === 9)) {
      accessibilityWithinModal(event);
    }
  };

  var overlayClickToClose = function overlayClickToClose(e) {
    e.stopPropagation();

    if (e.target.classList.contains('cmp-modal-box')) {
      return props.onClose();
    }
  };

  var onClose = function onClose() {
    feedbackSurvey["a" /* default */].isDisplayed(true);
    domElements["a" /* default */].noScroll(false);
  };

  var onOpen = function onOpen() {
    // binding the event when the modal is open will prevent
    // other closed modals on the page (if any happen to exist)
    // from binding the same event, which will make them refire the event
    document.addEventListener("keydown", handleModalKeyDown);
    feedbackSurvey["a" /* default */].isDisplayed(false);
    domElements["a" /* default */].noScroll(true);
  };

  if (!props.isOpen) {
    onClose();
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  }

  onOpen();
  return /*#__PURE__*/react_default.a.createElement(modal_portal, null, /*#__PURE__*/react_default.a.createElement(ModalApi.Provider, {
    value: getApi
  }, /*#__PURE__*/react_default.a.createElement("div", {
    ref: mainRef,
    className: "cmp-modal-box ".concat(props.className ? props.className : ""),
    onClick: overlayClickToClose
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-modal"
  }, props.children))));
};

modal_Modal.defaultProps = {
  onClose: function onClose() {},
  showCloseIcon: true,
  focusableElements: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
};

var modal_Header = function Header(props) {
  var _useContext = Object(react["useContext"])(ModalApi),
      onClose = _useContext.onClose,
      closeIcon = _useContext.closeIcon;

  var Icon = function Icon() {
    if (!props.icon) return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-modal__title-icon",
      "data-locator": "header-icon"
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: props.icon
    }));
  };

  var Title = function Title() {
    if (!props.title) return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-modal__title"
    }, /*#__PURE__*/react_default.a.createElement(Icon, null), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-modal__title-text",
      role: "heading",
      "aria-label": props.title,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(props.title)
    }, props.title));
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-modal__header ".concat(props.title ? keys.HeaderWithTitle : '', " ").concat(props.className ? props.className : ''),
    "data-locator": props.elementLocator || Object(eCommerceFunctions["a" /* elementLocator */])(props.title || props.className)
  }, /*#__PURE__*/react_default.a.createElement(Title, null), /*#__PURE__*/react_default.a.createElement("button", {
    onClick: onClose,
    className: "cmp-modal__close-icon"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: closeIcon,
    "aria-hidden": "true"
  })));
};

modal_Header.defaultProps = {
  icon: '',
  title: '',
  className: '',
  elementLocator: ''
};
/* harmony default export */ var modal = __webpack_exports__["b"] = (modal_Modal);


/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeoutsShape =  false ? undefined : null;
exports.timeoutsShape = timeoutsShape;
var classNamesShape =  false ? undefined : null;
exports.classNamesShape = classNamesShape;

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);



var setUrlPathVariables = function setUrlPathVariables() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var pathVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var urlPath = url;

  if (!!urlPath) {
    for (var _i = 0, _Object$entries = Object.entries(pathVars); _i < _Object$entries.length; _i++) {
      var _ref3 = _Object$entries[_i];

      var _ref2 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref3, 2);

      var key = _ref2[0];
      var value = _ref2[1];
      urlPath = urlPath.replace("{".concat(key, "}"), encodeURIComponent(value));
    }
  }

  return urlPath;
};

var createUrlSearchParams = function createUrlSearchParams() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var queryParams = [];

  for (var _i2 = 0, _Object$entries2 = Object.entries(query); _i2 < _Object$entries2.length; _i2++) {
    var _ref6 = _Object$entries2[_i2];

    var _ref5 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref6, 2);

    var key = _ref5[0];
    var value = _ref5[1];
    queryParams.push("".concat(key, "=").concat(value));
  }

  return queryParams.join("&");
};

var buildUrl = function buildUrl(options) {
  if (Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(options) === "object") {
    var pathname = options.pathname,
        query = options.query,
        pathVars = options.pathVars;
    var url = pathname;

    if (Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(pathVars) === "object" && !!Object.keys(pathVars).length) {
      url = setUrlPathVariables(url, pathVars);
    }

    if (Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(query) === "object" && !!Object.keys(query).length) {
      url += "?".concat(createUrlSearchParams(query));
    }

    return url;
  }

  return options;
};

/* harmony default export */ __webpack_exports__["a"] = (buildUrl);

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return signInRedirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNamedHeaderLink; });
/* unused harmony export checkIfSameOrigin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return notLoggedInRedirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return homePageRedirect; });
var signInRedirect = function signInRedirect() {
  // Only redirect to sign in page if url contains "nextgen"
  var headerDiv = document.getElementById("header");
  var signInUrl = headerDiv.getAttribute("data-signin-url"); // Only redirect to sign in page if url contains "nextgen"

  if (signInUrl.indexOf("nextgen") !== -1) {
    window.location.replace(signInUrl);
  }
};
var getNamedHeaderLink = function getNamedHeaderLink(dataId) {
  var headerDiv = document.getElementById("header");
  var headerLink = headerDiv.getAttribute(dataId);
  return headerLink;
};
var checkIfSameOrigin = function checkIfSameOrigin(urlToCheck) {
  var host = window.location.host;
  var sameOrigin = urlToCheck.indexOf(host);

  if (sameOrigin >= 0) {
    return true;
  }

  return false;
};
var notLoggedInRedirect = function notLoggedInRedirect() {
  var headerDiv = document.getElementById("header");
  var signInUrl = headerDiv.getAttribute("data-signin-url");
  window.location.replace(signInUrl);
};
var homePageRedirect = function homePageRedirect() {
  var headerDiv = document.getElementById("header");
  var homePageUrl = headerDiv.getAttribute("data-homepage-url");
  window.location.replace(homePageUrl);
};

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(91);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_6__);








var LoadingSpinner = /*#__PURE__*/function (_Component) {
  Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(LoadingSpinner, _Component);

  function LoadingSpinner() {
    Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, LoadingSpinner);

    return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(LoadingSpinner).call(this));
  }

  Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(LoadingSpinner, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.type === '' || this.props.type === 'overlay') {
        window.scrollTo(0, 0);
        window.document.documentElement.classList.add('showing-spinner');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.type === '' || this.props.type === 'overlay') {
        window.document.documentElement.classList.remove('showing-spinner');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          loading = _this$props.loading,
          type = _this$props.type,
          size = _this$props.size;
      var sType, sSize, sColor;
      sType = type;

      if (type === 'overlay') {
        sSize = 64;
        sColor = color;
      } else if (type === 'inline') {
        sSize = 22;
        sColor = '#ffffff';
      } else {
        sSize = parseInt(size);
        sColor = color;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: 'cmp-search-' + sType
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_6__["ClipLoader"], {
        sizeUnit: 'px',
        size: sSize,
        color: sColor,
        loading: loading
      }));
    }
  }]);

  return LoadingSpinner;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

LoadingSpinner.defaultProps = {
  loading: true,
  type: 'overlay',
  size: 64,
  color: '#9CA7B0'
};
/* harmony default export */ __webpack_exports__["a"] = (LoadingSpinner);

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ stateWatcher_ErrorsProvider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ stateWatcher_FormStateProvider; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ stateWatcher_useErrorsContext; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ stateWatcher_useFormStateContext; });

// UNUSED EXPORTS: ErrorsContext, FormStateContext

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(37);

// CONCATENATED MODULE: ./src/forms/fields/utils/deepCompare.js

var deepCompare_deepErrorsCompare = function deepErrorsCompare(obj, otherObj) {
  if (Object(esm_typeof["a" /* default */])(obj) !== "object" || Object(esm_typeof["a" /* default */])(otherObj) !== "object") return false;
  if (obj.constructor !== Object || otherObj.constructor !== Object) return false;
  if (Object.keys(obj).length !== Object.keys(otherObj).length) return false;

  for (var key in obj) {
    if (!otherObj.hasOwnProperty(key)) return false;

    for (var deepKey in obj[key]) {
      if (obj[key][deepKey] !== otherObj[key][deepKey]) return false;
    }
  }

  return true;
};
var deepCompare_deepFormStateCompare = function deepFormStateCompare(obj, otherObj) {
  if (Object(esm_typeof["a" /* default */])(obj) !== "object" || Object(esm_typeof["a" /* default */])(otherObj) !== "object") return false;
  if (Object.keys(obj).length !== Object.keys(otherObj).length) return false;

  var _loop = function _loop(key) {
    if (!otherObj.hasOwnProperty(key)) return {
      v: false
    };

    if (Object(esm_typeof["a" /* default */])(obj[key]) === "object") {
      if (obj[key].length !== otherObj[key].length || !obj[key].every(function (item) {
        return otherObj[key].includes(item);
      })) return {
        v: false
      };
    }
  };

  for (var key in obj) {
    var _ret = _loop(key);

    if (Object(esm_typeof["a" /* default */])(_ret) === "object") return _ret.v;
  }

  return true;
};
// CONCATENATED MODULE: ./src/forms/fields/utils/stateWatcher.js





var stateWatcher_createProvider = function createProvider(Context, watch, compare, children) {
  var _useState = Object(react["useState"])(Object(objectSpread["a" /* default */])({}, watch)),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  Object(react["useEffect"])(function () {
    if (!compare(watch, state)) setState(Object(objectSpread["a" /* default */])({}, watch));
  });
  var getApi = Object(react["useMemo"])(function () {
    return Object(objectSpread["a" /* default */])({}, state);
  }, [state]);
  return /*#__PURE__*/react_default.a.createElement(Context.Provider, {
    value: getApi
  }, children);
};

var ErrorsContext = Object(react["createContext"])();
var FormStateContext = Object(react["createContext"])();
var stateWatcher_ErrorsProvider = function ErrorsProvider(_ref) {
  var watch = _ref.watch,
      children = _ref.children;
  return stateWatcher_createProvider(ErrorsContext, watch, deepCompare_deepErrorsCompare, children);
};
var stateWatcher_FormStateProvider = function FormStateProvider(_ref2) {
  var watch = _ref2.watch,
      children = _ref2.children;
  return stateWatcher_createProvider(FormStateContext, watch, deepCompare_deepFormStateCompare, children);
};
var stateWatcher_useErrorsContext = function useErrorsContext() {
  return Object(react["useContext"])(ErrorsContext);
};
var stateWatcher_useFormStateContext = function useFormStateContext() {
  return Object(react["useContext"])(FormStateContext);
};

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;
exports.getInitialChildMapping = getInitialChildMapping;
exports.getNextChildMapping = getNextChildMapping;

var _react = __webpack_require__(0);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children, mapFn) {
  var mapper = function mapper(child) {
    return mapFn && (0, _react.isValidElement)(child) ? mapFn(child) : child;
  };

  var result = Object.create(null);
  if (children) _react.Children.map(children, function (c) {
    return c;
  }).forEach(function (child) {
    // run the map function here instead so that the key is the computed one
    result[child.key] = mapper(child);
  });
  return result;
}
/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */


function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  } // For each key of `next`, the list of keys to insert before that key in
  // the combined list


  var nextKeysPending = Object.create(null);
  var pendingKeys = [];

  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i;
  var childMapping = {};

  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }

    childMapping[nextKey] = getValueForKey(nextKey);
  } // Finally, add the keys which didn't appear before any key in `next`


  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}

function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function (child) {
    return (0, _react.cloneElement)(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, 'appear', props),
      enter: getProp(child, 'enter', props),
      exit: getProp(child, 'exit', props)
    });
  });
}

function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function (key) {
    var child = children[key];
    if (!(0, _react.isValidElement)(child)) return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = (0, _react.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

    if (hasNext && (!hasPrev || isLeaving)) {
      // console.log('entering', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      // item is old (exiting)
      // console.log('leaving', key)
      children[key] = (0, _react.cloneElement)(child, {
        in: false
      });
    } else if (hasNext && hasPrev && (0, _react.isValidElement)(prevChild)) {
      // item hasn't changed transition states
      // copy over the last transition props;
      // console.log('unchanged', key)
      children[key] = (0, _react.cloneElement)(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, 'exit', nextProps),
        enter: getProp(child, 'enter', nextProps)
      });
    }
  });
  return children;
}

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderFormattedLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderFormattedLabelText; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);

 // Array to hold countries with the Required "*" Asterisk before the label

var countryArray = ["JP"];

var isPrefix = function isPrefix() {
  return countryArray.indexOf(_scripts_DigitalData__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].page.country.toUpperCase()) > -1;
};

var renderFormattedLabel = function renderFormattedLabel(label, required) {
  var optionalLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (required) {
    var isPrefixValue = isPrefix();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, isPrefixValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--required"
    }, '*'), label, !isPrefixValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--required"
    }, '*'));
  }

  if (!required) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--optional"
    }, ' ' + optionalLabel));
  }
};
var renderFormattedLabelText = function renderFormattedLabelText(label, required) {
  var optionalLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (required) {
    var isPrefixValue = isPrefix();

    if (isPrefixValue) {
      return '*' + label;
    }

    if (!isPrefixValue) {
      return label + '*';
    }
  }

  if (!required) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--optional"
    }, ' ' + optionalLabel));
  }
};

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function dateFormatter(inputdate) {
  var userLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

  if (inputdate && inputdate !== "0000-00-00") {
    var splitDate = inputdate.split('-');
    var constructedDate = new Date(Date.UTC(splitDate[0], parseInt(splitDate[1], 10) - 1, splitDate[2], 12));
    return constructedDate.toLocaleDateString(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } else {
    return '-';
  }
}

function monthDayFormatter(inputdate) {
  var userLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';

  if (inputdate && inputdate !== "0000-00-00") {
    var splitDate = inputdate.split('-');
    var constructedDate = new Date(Date.UTC(splitDate[0], parseInt(splitDate[1], 10) - 1, splitDate[2], 12));
    return constructedDate.toLocaleDateString(userLocale, {
      month: 'long',
      day: 'numeric'
    });
  } else {
    return '-';
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  dateFormatter: dateFormatter,
  monthDayFormatter: monthDayFormatter
});

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);


function getLocale() {
  var locale = "";
  var localeLanguage = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].language;
  var localeCountry = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country;

  if (!localeLanguage && !localeCountry || _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country === _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].globalExperience) {
    localeLanguage = 'en';
    localeCountry = 'US';
  }

  locale = localeLanguage + "-" + localeCountry.toUpperCase();
  return locale;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getLocale: getLocale
});

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchData; });
/* unused harmony export getData */
/* unused harmony export postData */
/* unused harmony export postDataRedirect */
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(36);
/* harmony import */ var _redirectFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);




var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;




var throwError = function throwError(error) {
  throw new Error(error);
};

function fetchData(_x, _x2) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url, options) {
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _Promise(function (resolve, reject) {
              fetch(url, Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, options)).then(function (response) {
                resolve(response);
              })["catch"](function (err) {
                throwError(err);
                reject(err);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchData.apply(this, arguments);
}

;
function getData(_x3) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url) {
    var response;
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response;

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getData.apply(this, arguments);
}

function postData(_x4, _x5, _x6) {
  return _postData.apply(this, arguments);
}

function _postData() {
  _postData = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, options, setError) {
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(options)
            })["catch"](function (error) {
              setError(error);
              throwError(error);
              reject(error);
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _postData.apply(this, arguments);
}

;
function postDataRedirect(_x7, _x8, _x9) {
  return _postDataRedirect.apply(this, arguments);
}

function _postDataRedirect() {
  _postDataRedirect = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(url, options, setError) {
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", fetch(url, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(options)
            }).then(function (response) {
              if (response.status === 200) {
                return response.json();
              } else if (response.status === 401) {
                setError(response.status);
                Object(_redirectFunctions__WEBPACK_IMPORTED_MODULE_4__[/* signInRedirect */ "d"])();
              }
            })["catch"](function (error) {
              setError(error);
              throwError(error);
              reject(error);
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _postDataRedirect.apply(this, arguments);
}

;

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAttributes; });
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _patterns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(44);


var getAttributes = function getAttributes(ref, validation, matchRef, emailValidationEndpoint, setError, clearError) {
  var setValidation = function setValidation() {
    if (validation && validation.validateFnName) {
      switch (validation.validateFnName) {
        case "matching":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, matchRef.current, ref);
            }
          };

        case "password":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, ref, setError, clearError);
            }
          };

        case "email":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"]["email"](value, ref, validation.validationMsg, setError, clearError) && _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"]["newEmail"](value, emailValidationEndpoint, ref, validation.alreadyRegisteredMsg, setError, clearError);
            }
          };

        case "checkBoxOrRadio":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, ref, matchRef);
            }
          };

        default:
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, ref);
            }
          };
      }
    }

    return {};
  };

  var setMinMax = function setMinMax() {
    var obj = {};

    if (validation) {
      if (validation.min) {
        obj.min = {
          value: validation.min.value,
          message: validation.min.message
        };
      }

      if (validation.max) {
        obj.max = {
          value: validation.max.value,
          message: validation.max.message
        };
      }

      if (validation.minLength) {
        obj.minLength = {
          value: validation.minLength.value,
          message: validation.minLength.message
        };
      }

      if (validation.maxLength) {
        obj.maxLength = {
          value: validation.maxLength.value,
          message: validation.maxLength.message
        };
      }
    }

    return obj;
  };

  return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    required: validation && validation.required ? validation.requiredMsg ? validation.requiredMsg : "Required" : false
  }, setValidation(), setMinMax());
};

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);




var newNotification = function newNotification(title, description, icon) {
  return {
    title: title,
    description: description,
    icon: icon
  };
};

var buildAddress = function buildAddress(address) {
  var includeCountryName = false;
  var addressArray = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getFullCompanyAddress */ "j"])(address, includeCountryName);
  return addressArray.map(function (x, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      key: i + 1
    }, x);
  });
};

var config = document.getElementById('json-config--cmp-detail-tiles--personal') ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : ''; //soldToInfo billToInfo shipToInfo payerInfo carrierInfo

/* harmony default export */ __webpack_exports__["a"] = (function (data, type, icon) {
  if (!data) return [];

  switch (type) {
    case 'personal':
      var mailingAddress = data.userAddress.filter(function (i) {
        return i.addressType === 'mailingAddress';
      })[0];
      var communicationsString = data.communications ? config.tileMessages.yesCommunication : config.tileMessages.noCommunication;
      data.country = mailingAddress ? mailingAddress.countryCode : '';
      return [{
        name: 'personalDetailsTile',
        columns: [{
          title: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getFullName */ "k"])(data),
          rows: [{
            text: data.company,
            "class": 'company'
          }]
        }, {
          title: undefined,
          rows: [{
            text: data.email,
            "class": 'email'
          }, {
            text: data.phone,
            "class": 'phone'
          }, {
            text: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getCountryName */ "f"])(data.country, config),
            "class": 'country'
          }, {
            text: communicationsString,
            "class": 'communications',
            state: {
              communications: data.communications
            }
          }]
        }],
        defaultValues: data
      }];

    case 'shipToInfo':
    case 'billToInfo':
      var defaultSoldToAddresses = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getDefaultSoldToAddresses */ "g"])(data.soldToAccounts);
      return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getAddressesByType */ "d"])(defaultSoldToAddresses, type).map(function (address) {
        var tile = {
          name: type,
          columns: [{
            title: address.preferred ? 'Preferred Address' : '',
            rows: [{
              text: buildAddress(address),
              "class": 'address'
            }, {
              text: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getCountryName */ "f"])(address.country, config),
              "class": 'country'
            }]
          }],
          defaultValues: address
        };

        if (address.pending) {
          tile.notification = newNotification('Address Verification Pending', 'Orders may be delayed', icon);
        }

        return tile;
      }));

    case 'password':
      return [{
        name: '',
        columns: [{
          title: '•••••••••••••••••••',
          rows: [{
            text: '',
            "class": 'blank'
          }]
        }],
        defaultValues: {}
      }];

    default:
      return [];
  }
});

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_4__);





var customStyles = {
  indicatorSeparator: function indicatorSeparator() {
    return {
      display: 'none'
    };
  },
  option: function option(provided, state) {
    return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorGray50,
      padding: "".concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.spaceXS, " ").concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.spaceS),
      backgroundColor: state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBackgroundLight : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorWhite,
      cursor: !state.isSelected ? 'pointer' : 'default',
      '&:hover': {
        color: !state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBlue50 : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorGray50,
        backgroundColor: !state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorWhite : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBackgroundLight
      },
      margin: 0
    });
  },
  control: function control(provided, state) {
    return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      'border-radius': _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.borderRadius,
      padding: ".3em ".concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.spaceXXS),
      color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorGray50,
      'border-color': state.isFocused ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBorderDark : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBorderDark,
      outline: 'none',
      cursor: 'pointer',
      'box-shadow': 'none',
      '&:hover': {
        outline: 'none',
        color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBlue50,
        borderColor: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_4___default.a.colorBlue50
      }
    });
  },
  singleValue: function singleValue(provided, state) {
    return {};
  },
  menu: function menu(provided) {
    return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      marginTop: 0,
      borderRadius: 0,
      width: 'calc(100% - 2px)',
      marginLeft: '1px',
      marginBottom: 0,
      padding: 0
    });
  },
  menuList: function menuList(provided) {
    return Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      paddingBottom: 0,
      paddingTop: 0
    });
  }
};

var DropdownIndicator = function DropdownIndicator(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__[/* components */ "a"].DropdownIndicator, props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    src: props.theme.dropdownIndicator
  }));
};

var Dropdown = function Dropdown(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_3__[/* default */ "c"], {
    defaultValue: props.getOptions(props.text)[props.defaultValue - 1],
    options: props.getOptions(props.text),
    value: props.sortValue && props.sortValue.value ? props.sortValue.value : props.getOptions(props.text)[props.sortValue - 1],
    onChange: props.onChange,
    isSearchable: props.isSearchable,
    styles: customStyles,
    placeholder: props.placeholder,
    classNamePrefix: 'cmp-custom-dropdown',
    components: {
      DropdownIndicator: DropdownIndicator
    },
    theme: {
      dropdownIndicator: props.text.downIcon
    },
    "data-locator": "cmp-custom-dropdown",
    tabIndex: "-1"
  }));
};

Dropdown.defaultProps = {
  isSearchable: false,
  placeholder: ''
};
/* harmony default export */ __webpack_exports__["a"] = (Dropdown);

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




function parseQueryParams(pathname) {
  var search = pathname && pathname.split('?')[1] || undefined;

  if (search) {
    var queryList = search.split('&');
    return queryList.reduce(function (accu, curr) {
      var _curr$split = curr.split('='),
          _curr$split2 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_curr$split, 2),
          _curr$split2$ = _curr$split2[0],
          key = _curr$split2$ === void 0 ? '' : _curr$split2$,
          _curr$split2$2 = _curr$split2[1],
          value = _curr$split2$2 === void 0 ? '' : _curr$split2$2;

      return key ? Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, accu, Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, key, value && value.split('#')[0] || '')) : Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, accu);
    }, {});
  }

  return {};
}

/* harmony default export */ __webpack_exports__["a"] = (parseQueryParams);

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function groupBy(array, key) {
  // Return the end result
  return array.reduce(function (result, currentValue) {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue); // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate

    return result;
  }, {}); // empty object is the initial value for result object
}

;
/* harmony default export */ __webpack_exports__["a"] = ({
  groupBy: groupBy
});

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRegisteredStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return insertStyles; });
var isBrowser = "object" !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      current = current.next;
    } while (current !== undefined);
  }
};




/***/ })

}]);