(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return getLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return getUserId; });
/* unused harmony export getSalesOrg */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return getSoldToId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getDummySoldToId; });
/* unused harmony export getSoldToIdSource */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return callCustomerPriceApi; });
/* unused harmony export trimAndCapitalize */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return getOrderDetailsAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getFullCompanyAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getCountryName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getAddressesByType; });
/* unused harmony export getDefaultSoldTo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getDefaultSoldToAddresses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterUserDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return filterSoldToDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return getIsoCode; });
/* unused harmony export getUserRole */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return isEprocurementUserRole; });
/* unused harmony export getUsertype */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return isEprocurementUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getEprocUserCountryCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getEprocUserLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return matchAddresses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getCategoryReferenceType; });
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);




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
  address.partnerName ? addressArray.push(trimAndCapitalize(address.partnerName)) : null;
  address.addr1 ? addressArray.push(trimAndCapitalize(address.addr1)) : null;
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

      if (soldTo.soldToFlag == 1) {
        eachSoldTo.customerNumber = soldTo.customerNumber;
        eachSoldTo.name = soldTo.name;
        eachSoldTo.soldToFlag = soldTo.soldToFlag;
        eachSoldTo.salesOrg = soldTo.salesOrg;
      }

      if (soldTo.soldToFlag == 0) {
        eachSoldTo.customerNumber = soldTo.customerNumber;
        eachSoldTo.soldToFlag = soldTo.soldToFlag;
      }

      filteredSoldTo.push(eachSoldTo);
    });
  }

  return filteredSoldTo;
};
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
var getCategoryReferenceType = function getCategoryReferenceType() {
  return isEprocurementUser() ? "&reference=sku" : '';
};

/***/ }),

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var FeedbackSurvey = {
  isDisplayed: function isDisplayed(state) {
    var surveyBtn = document.getElementById('surveyContent');
    var surveyContent = document.querySelector('.mopinion-survey-content');
    var surveyMask = document.getElementById('surveyMask');

    if (state) {
      var blockDisplay = "block";

      if (surveyBtn) {
        surveyBtn.style.display = blockDisplay;
      }

      if (surveyContent) {
        surveyContent.style.display = blockDisplay;
      }

      if (surveyMask) {
        surveyMask.style.display = blockDisplay;
      }
    } else {
      var noneDisplay = "none";

      if (surveyBtn) {
        surveyBtn.style.display = noneDisplay;
      }

      if (surveyContent) {
        surveyContent.style.display = noneDisplay;
      }

      if (surveyMask) {
        surveyMask.style.display = noneDisplay;
      }
    }
  }
};
/* harmony default export */ __webpack_exports__["a"] = (FeedbackSurvey);

/***/ }),

/***/ 102:
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




/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isCartHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return isSignInHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elementLocator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getHttpStatusFromErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return htmlParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCompanyLogo; });
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_html_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
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

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




function parseQueryParams(pathname) {
  var search = pathname && pathname.split('?')[1] || undefined;

  if (search) {
    var queryList = search.split('&');
    return queryList.reduce(function (accu, curr) {
      var _curr$split = curr.split('='),
          _curr$split2 = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_curr$split, 2),
          _curr$split2$ = _curr$split2[0],
          key = _curr$split2$ === void 0 ? '' : _curr$split2$,
          _curr$split2$2 = _curr$split2[1],
          value = _curr$split2$2 === void 0 ? '' : _curr$split2$2;

      return key ? Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, accu, Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, key, value && value.split('#')[0] || '')) : Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, accu);
    }, {});
  }

  return {};
}

/* harmony default export */ __webpack_exports__["a"] = (parseQueryParams);

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _scripts_navigation_level2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160);
/* harmony import */ var _feedbackSurvey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(100);
/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);





var MobileNav = function MobileNav() {
  var header = document.querySelector('header.cmp-header');
  var headerTB = document.querySelector('header.cmp-header .cmp-header__top-bar');
  var headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
  var headerNavigation = document.querySelector('.cmp-header__navigation');
  var headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation');

  var showMobileNav = function showMobileNav() {
    headerTB_mobile_btn.classList.add('is-active');
    headerNavigation.classList.add('is-active');
    header.classList.add('is-fixed');
    _domElements__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].noScroll(true);
    _feedbackSurvey__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isDisplayed(false);
  };

  var hideMobileNav = function hideMobileNav() {
    headerTB_mobile_btn.classList.remove('is-active');
    headerNavigation.classList.remove('is-active');
    header.classList.remove('is-fixed');
    _domElements__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].noScroll(false);
    _feedbackSurvey__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isDisplayed(true);
    var navMenuFunc = Object(_scripts_navigation_level2__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])();

    if (navMenuFunc) {
      navMenuFunc();
    }
  };

  var resizeMobileNav = function resizeMobileNav() {
    if (!_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && headerTB_mobile_btn.classList.contains('is-active') || !_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && headerNavigation.classList.contains('is-active') || !_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && header.classList.contains('is-fixed') || !_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && document.documentElement.classList.contains('no-scroll')) {
      hideMobileNav();
    }

    if (headerNavigation_mainUL) {
      if (headerNavigation_mainUL.childNodes.length > 0) {
        if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
          headerNavigation_mainUL.children[0].style.height = window.innerHeight - headerTB.offsetHeight + 'px';
        } else {
          headerNavigation_mainUL.children[0].style.height = 'auto';
        }
      }
    }
  };

  var toggleMobileNav = function toggleMobileNav() {
    if (headerTB_mobile_btn.classList.contains('is-active')) {
      hideMobileNav();
    } else {
      showMobileNav();
    }
  };

  return {
    show: function show() {
      return showMobileNav();
    },
    hide: function hide() {
      return hideMobileNav();
    },
    resize: function resize() {
      return resizeMobileNav();
    },
    toggle: function toggle() {
      return toggleMobileNav();
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (MobileNav);

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return keys; });
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

var keys = {
  previousPagePosition: 'waters.previousPagePosition',
  previousPagePositionEnabled: 'waters.previousPagePositionEnabled',
  fromSearchURL: 'waters.fromSearchURL',
  searchTabHistory: 'waters.searchTabHistory',
  previousPaginationClick: 'waters.previousPaginationClick',
  dismissSystemWideNotification: 'waters.dismissSystemWideNotification',
  userDetails: 'waters.userDetails',
  soldToDetails: 'waters.soldToDetails',
  "continue": 'waters.continue',
  personalDetailsUpdated: 'waters.personalDetailsUpdated',
  legacyToken: 'waters.legacyToken',
  signInRedirect: 'waters.signInRedirect',
  punchoutSetupDetails: 'waters.punchoutSetupDetails',
  userType: 'waters.userType'
};

var getJSONObject = function getJSONObject(key) {
  var value = window.sessionStorage.getItem(key);
  return value ? JSON.parse(value) : {};
};

var getJSONArray = function getJSONArray(key) {
  var value = window.sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

var SessionStore = function SessionStore() {
  this.setSoldToDetails = function (value) {
    return window.sessionStorage.setItem(keys.soldToDetails, JSON.stringify(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_0__[/* filterSoldToDetails */ "b"])(value)));
  };

  this.getSoldToDetails = function () {
    return getJSONArray(keys.soldToDetails);
  };

  this.removeSoldToDetails = function () {
    return window.sessionStorage.removeItem(keys.soldToDetails);
  };

  this.setUserDetails = function (value) {
    return window.sessionStorage.setItem(keys.userDetails, JSON.stringify(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_0__[/* filterUserDetails */ "c"])(value)));
  };

  this.getUserDetails = function () {
    return getJSONObject(keys.userDetails);
  };

  this.removeUserDetails = function () {
    return window.sessionStorage.removeItem(keys.userDetails);
  };

  this.setPreviousPagePosition = function (value) {
    return window.sessionStorage.setItem(keys.previousPagePosition, value);
  };

  this.getPreviousPagePosition = function () {
    return window.sessionStorage.getItem(keys.previousPagePosition);
  };

  this.removePreviousPagePosition = function () {
    return window.sessionStorage.removeItem(keys.previousPagePosition);
  };

  this.setPreviousPagePositionEnabled = function () {
    return window.sessionStorage.setItem(keys.previousPagePositionEnabled, 'Y');
  };

  this.getPreviousPagePositionEnabled = function () {
    return window.sessionStorage.getItem(keys.previousPagePositionEnabled);
  };

  this.removePreviousPagePositionEnabled = function () {
    return window.sessionStorage.removeItem(keys.previousPagePositionEnabled);
  };

  this.setFromSearchURL = function (value) {
    return window.sessionStorage.setItem(keys.fromSearchURL, JSON.stringify(value));
  };

  this.getFromSearchURL = function () {
    return getJSONObject(keys.fromSearchURL);
  };

  this.removeFromSearchURL = function () {
    return window.sessionStorage.removeItem(keys.fromSearchURL);
  };

  this.setSearchTabHistory = function (value) {
    return window.sessionStorage.setItem(keys.searchTabHistory, JSON.stringify(value));
  };

  this.getSearchTabHistory = function () {
    return getJSONObject(keys.searchTabHistory);
  };

  this.removeSearchTabHistory = function () {
    return window.sessionStorage.removeItem(keys.searchTabHistory);
  };

  this.setPreviousPaginationClick = function (value) {
    return window.sessionStorage.setItem(keys.previousPaginationClick, value);
  };

  this.getPreviousPaginationClick = function () {
    return window.sessionStorage.getItem(keys.previousPaginationClick);
  };

  this.removePreviousPaginationClick = function () {
    return window.sessionStorage.removeItem(keys.previousPaginationClick);
  };

  this.setDismissSystemWideNotification = function () {
    return window.sessionStorage.setItem(keys.dismissSystemWideNotification, "Y");
  };

  this.getDismissSystemWideNotificatiopn = function () {
    return window.sessionStorage.getItem(keys.dismissSystemWideNotification);
  };

  this.setContinueLink = function (value) {
    return window.sessionStorage.setItem(keys["continue"], value);
  };

  this.getContinueLink = function () {
    return window.sessionStorage.getItem(keys["continue"]);
  };

  this.removeContinueLink = function () {
    return window.sessionStorage.removeItem(keys["continue"]);
  };

  this.setPersonalDetailsUpdated = function () {
    return window.sessionStorage.setItem(keys.personalDetailsUpdated, 'Y');
  };

  this.getPersonalDetailsUpdated = function () {
    return window.sessionStorage.getItem(keys.personalDetailsUpdated);
  };

  this.removePersonalDetailsUpdated = function () {
    return window.sessionStorage.removeItem(keys.personalDetailsUpdated);
  };

  this.setLegacyToken = function (value) {
    return window.sessionStorage.setItem(keys.legacyToken, value);
  };

  this.getLegacyToken = function () {
    return window.sessionStorage.getItem(keys.legacyToken);
  };

  this.removeLegacyToken = function () {
    return window.sessionStorage.removeItem(keys.legacyToken);
  };

  this.setSignInRedirect = function (value) {
    return window.sessionStorage.setItem(keys.signInRedirect, value);
  };

  this.getSignInRedirect = function () {
    return window.sessionStorage.getItem(keys.signInRedirect);
  };

  this.removeSignInRedirect = function () {
    return window.sessionStorage.removeItem(keys.signInRedirect);
  };

  this.setPunchoutSetupDetails = function (value) {
    return window.sessionStorage.setItem(keys.punchoutSetupDetails, JSON.stringify(value));
  };

  this.getPunchoutSetupDetails = function () {
    return getJSONObject(keys.punchoutSetupDetails);
  };

  this.removePunchoutSetupDetails = function () {
    return window.sessionStorage.removeItem(keys.punchoutSetupDetails);
  };

  this.setUserType = function (value) {
    return window.sessionStorage.setItem(keys.userType, value);
  };

  this.getUserType = function () {
    return window.sessionStorage.getItem(keys.userType);
  };

  this.removeUserType = function () {
    return window.sessionStorage.removeItem(keys.userType);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (SessionStore);


/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_cookieStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52);

var loginStatus = {
  state: function state() {
    return _stores_cookieStore__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getLoggedInStatus() ? true : false;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (loginStatus);

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


var navigationLevel2 = function navigationLevel2() {
  var maxColumnCount = 3;
  var linksPerColumn = 8;
  var headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
  var level0Groups = document.querySelectorAll('.cmp-navigation > .cmp-navigation__group > .cmp-navigation__item');
  var expanded = 'is-expanded';
  var active = 'is-active';
  Array.from(level0Groups).forEach(function (group) {
    var level1Group = group.querySelector('.cmp-navigation__group');

    if (level1Group) {
      var numberOfLinks = level1Group.children.length;

      if (level1Group.classList.contains("cmp-navigation__group-all-mobile") && _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
        level1Group.classList.remove("cmp-navigation__group-all-mobile");
        numberOfLinks--;
      }

      var columnCount = numberOfLinks === 0 ? 1 : Math.ceil(numberOfLinks / linksPerColumn);
      var className = "cmp-navigation__group--col-".concat(columnCount > maxColumnCount ? maxColumnCount : columnCount);
      level1Group.classList.add(className);
    }

    var container = group.querySelector('.cmp-navigation__container');
    container.addEventListener('click', function (event) {
      if (level1Group && level1Group.children.length !== 0) {
        if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
          event.preventDefault();
          var mainULNav = event.currentTarget.parentElement.parentElement;
          var level0Item = event.currentTarget.parentElement;

          if (level0Item.classList.contains(active)) {
            level0Item.classList.remove(active);
            mainULNav.classList.remove(expanded);
          } else {
            level0Item.classList.add(active);
            mainULNav.classList.add(expanded);
          }
        }
      } else {
        var linkURL = event.currentTarget.getElementsByTagName("a")[0].href;

        if (linkURL) {
          window.open(linkURL, '_self', false);
        }
      }
    });
  });

  if (headerNavigation_comp) {
    window.addEventListener('resize', function () {
      if (!_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
        Reset();
      }
    });
  }
};

window.addEventListener('load', navigationLevel2);

var Reset = function Reset() {
  return function () {
    var expanded = 'is-expanded';
    var active = 'is-active';
    var level0Items = document.querySelectorAll('.cmp-navigation > .cmp-navigation__group > .cmp-navigation__item');
    var level0Group = document.querySelector('.cmp-navigation > .cmp-navigation__group');

    if (level0Items) {
      Array.from(level0Items).forEach(function (level0Item) {
        if (level0Item.classList.contains(active)) {
          level0Item.classList.remove(active);
        }
      });
    }

    if (level0Group) {
      if (level0Group.classList.contains(expanded)) {
        level0Group.classList.remove(expanded);
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Reset);

/***/ }),

/***/ 161:
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

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var screenSizes = {
  isMobile: function isMobile() {
    return window.matchMedia('(max-width: 650px)').matches;
  },
  isTabletAndUnder: function isTabletAndUnder() {
    return window.matchMedia('(max-width: 1200px)').matches;
  },
  isTabletAndOver: function isTabletAndOver() {
    return window.matchMedia('(min-width: 651px)').matches;
  },
  isTablet: function isTablet() {
    return window.matchMedia('(min-width: 651px) and (max-width: 1200px)').matches;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (screenSizes);

/***/ }),

/***/ 175:
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

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ modal_Header; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ keys; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ ModalApi; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(23);
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
var feedbackSurvey = __webpack_require__(100);

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
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  onOpen();
  return react_default.a.createElement(modal_portal, null, react_default.a.createElement(ModalApi.Provider, {
    value: getApi
  }, react_default.a.createElement("div", {
    ref: mainRef,
    className: "cmp-modal-box ".concat(props.className ? props.className : ""),
    onClick: overlayClickToClose
  }, react_default.a.createElement("div", {
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
    if (!props.icon) return react_default.a.createElement(react_default.a.Fragment, null);
    return react_default.a.createElement("div", {
      className: "cmp-modal__title-icon",
      "data-locator": "header-icon"
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: props.icon
    }));
  };

  var Title = function Title() {
    if (!props.title) return react_default.a.createElement(react_default.a.Fragment, null);
    return react_default.a.createElement("div", {
      className: "cmp-modal__title"
    }, react_default.a.createElement(Icon, null), react_default.a.createElement("div", {
      className: "cmp-modal__title-text",
      role: "heading",
      "aria-label": props.title,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(props.title)
    }, props.title));
  };

  return react_default.a.createElement("div", {
    className: "cmp-modal__header ".concat(props.title ? keys.HeaderWithTitle : '', " ").concat(props.className ? props.className : ''),
    "data-locator": props.elementLocator || Object(eCommerceFunctions["a" /* elementLocator */])(props.title || props.className)
  }, react_default.a.createElement(Title, null), react_default.a.createElement("button", {
    onClick: onClose,
    className: "cmp-modal__close-icon"
  }, react_default.a.createElement(react_svg["a" /* default */], {
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

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var DigitalData = {
  get globalExperience() {
    return 'XG';
  },

  get language() {
    if (!window.digitalData) return '';
    return window.digitalData.page && window.digitalData.page.language ? window.digitalData.page.language : "en";
  },

  get country() {
    if (!window.digitalData) return '';
    return window.digitalData.page && window.digitalData.page.country ? window.digitalData.page.country : this.globalExperience;
  },

  get page() {
    if (!window.digitalData) return '';
    return window.digitalData.page;
  },

  get default() {
    return this.country !== this.globalExperience ? this.country.toLowerCase() : "";
  }

};
/* harmony default export */ __webpack_exports__["a"] = (DigitalData);

/***/ }),

/***/ 234:
/***/ (function(module, exports) {

function scrollToElement(scrollTargetElementID, speed, easing) {
  var ignorePadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var additionalOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  if (!scrollTargetElementID) {
    return;
  }

  speed = speed || 2000;
  easing = easing || 'easeOutSine';
  var scrollY = window.scrollY || document.documentElement.scrollTop;
  var scrollTargetElement = document.getElementById(scrollTargetElementID);
  var bodyRect = document.body.getBoundingClientRect();

  if (!scrollTargetElement) {
    return;
  }

  var targetRect = scrollTargetElement.getBoundingClientRect();
  var currentTime = 0,
      currentOffset = getOffset();
  var time = Math.max(0.1, Math.min(Math.abs(scrollY - currentOffset) / speed, 0.8));
  var easingEquations = {
    easeOutSine: function easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function easeInOutSine(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },
    easeInOutQuint: function easeInOutQuint(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }

      return 0.5 * (Math.pow(pos - 2, 5) + 2);
    }
  };

  function getPadding() {
    if (!ignorePadding) {
      return 0;
    }

    var padding = window.getComputedStyle(scrollTargetElement, null).getPropertyValue('padding-top');

    if (padding.indexOf('em') !== -1) {
      padding = padding.replace('em', '');
      padding *= 16;
    } else {
      padding = padding.replace('px', '');
      padding *= 1;
    }

    return padding;
  }

  function getOffset() {
    targetRect = scrollTargetElement.getBoundingClientRect();
    bodyRect = document.body.getBoundingClientRect();
    var tmpOffset = targetRect.top - bodyRect.top;
    tmpOffset += getPadding();
    tmpOffset -= additionalOffset;
    return tmpOffset;
  }

  function tick() {
    currentOffset = getOffset();
    currentTime += 1 / 60;
    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);
      window.scrollTo(0, scrollY + (currentOffset - scrollY) * t);
    } else {
      window.scrollTo(0, currentOffset);
    }
  }

  tick();
}

module.exports = scrollToElement;

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var invalidDateValue = 'Invalid Date';

var DateRange = function DateRange(startValue, endValue) {
  var startDate = startValue ? new Date(startValue) : null;
  var endDate = endValue ? new Date(endValue) : null;
  validateParameters(startDate, endDate);

  this.isValid = function (date) {
    var comparisonDate = date ? date : Date.now();

    if (!startValue && !endValue || startValue && !endValue && comparisonDate >= startValue || !startValue && endValue && comparisonDate <= endValue || startValue && endValue && comparisonDate >= startValue && comparisonDate <= endValue) {
      return true;
    }

    return false;
  };

  function validateParameters(startUtc, endUtc) {
    if (startUtc && startUtc == invalidDateValue) {
      throw new TypeError("Start date/time is invalid");
    }

    if (endUtc && endUtc == invalidDateValue) {
      throw new TypeError("End date/time is invalid");
    }

    if (startUtc && endUtc && startUtc > endUtc) {
      throw new RangeError('Start date/time cannot come after the end date/time');
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (DateRange);

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



var setUrlPathVariables = function setUrlPathVariables() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var pathVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var urlPath = url;

  if (!!urlPath) {
    for (var _i = 0, _Object$entries = Object.entries(pathVars); _i < _Object$entries.length; _i++) {
      var _ref3 = _Object$entries[_i];

      var _ref2 = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref3, 2);

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

    var _ref5 = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref6, 2);

    var key = _ref5[0];
    var value = _ref5[1];
    queryParams.push("".concat(key, "=").concat(value));
  }

  return queryParams.join("&");
};

var buildUrl = function buildUrl(options) {
  if (Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(options) === "object") {
    var pathname = options.pathname,
        query = options.query,
        pathVars = options.pathVars;
    var url = pathname;

    if (Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(pathVars) === "object" && !!Object.keys(pathVars).length) {
      url = setUrlPathVariables(url, pathVars);
    }

    if (Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(query) === "object" && !!Object.keys(query).length) {
      url += "?".concat(createUrlSearchParams(query));
    }

    return url;
  }

  return options;
};

/* harmony default export */ __webpack_exports__["a"] = (buildUrl);

/***/ }),

/***/ 24:
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

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var domElements = {
  getHeader: function getHeader() {
    return document.querySelector('.cmp-header');
  },
  getSortFilterhModal: function getSortFilterhModal() {
    return document.querySelector('.cmp-search__sort-filter');
  },
  hasClass: function hasClass(el, className) {
    if (!el) {
      return false;
    }

    var classListSupport = hasClassListSupport();

    if (classListSupport) {
      return el.classList.contains(className);
    }

    return new RegExp('\\b' + className + '\\b').test(el.className);
  },
  addClass: function addClass(el, className) {
    if (!el) {
      return;
    }

    if (hasClassListSupport()) {
      el.classList.add(className);
      return;
    } // fallback for non-classlist supported browsers


    if (!exports.hasClass(el, className)) {
      el.className += ' ' + className;
    }
  },
  removeClass: function removeClass(el, className) {
    if (!el) {
      return;
    }

    if (hasClassListSupport()) {
      el.classList.remove(className);
      return;
    } // fallback for non-classlist supported browsers


    el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
  },
  noScroll: function noScroll(state) {
    if (state) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  }
};

function hasClassListSupport() {
  return 'classList' in document.documentElement;
}

/* harmony default export */ __webpack_exports__["a"] = (domElements);

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(227);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_6__);








var LoadingSpinner = /*#__PURE__*/function (_Component) {
  Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(LoadingSpinner, _Component);

  function LoadingSpinner() {
    Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, LoadingSpinner);

    return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(LoadingSpinner).call(this));
  }

  Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(LoadingSpinner, [{
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

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: 'cmp-search-' + sType
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_6__["ClipLoader"], {
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

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var partial = 'PARTIAL_ENABLED';
var full = 'FULL_ENABLED';
var disabled = 'DISABLED';

var currentState = function currentState() {
  var footer = document.querySelector('#footer');
  var currentState = '';

  if (footer) {
    currentState = footer.dataset.ecommerceState;
  }

  return currentState;
};

var isPartialState = function isPartialState() {
  return currentState() == partial;
};

var isFullState = function isFullState() {
  return currentState() == full;
};

var isDisabledState = function isDisabledState() {
  return currentState() == disabled;
};

/* harmony default export */ __webpack_exports__["a"] = ({
  currentState: currentState,
  partial: partial,
  full: full,
  disabled: disabled,
  isPartialState: isPartialState,
  isFullState: isFullState,
  isDisabledState: isDisabledState
});

/***/ }),

/***/ 345:
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

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ stateWatcher_ErrorsProvider; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ stateWatcher_FormStateProvider; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ stateWatcher_useErrorsContext; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ stateWatcher_useFormStateContext; });

// UNUSED EXPORTS: ErrorsContext, FormStateContext

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(36);

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
  return react_default.a.createElement(Context.Provider, {
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

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scrollTo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _scrollTo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scrollTo__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stickyService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);



var isInViewport = function isInViewport(elem) {
  var distance = elem.getBoundingClientRect();
  return distance.top <= window.innerHeight;
};

var goTopBtnFixed = document.querySelector('.cmp-back-to-top');
var goTopBtnRelative = document.querySelector('.cmp-back-to-top--relative');

function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = window.innerHeight;
  var footer = document.querySelector('.cmp-footer');
  var footerInViewport = isInViewport(footer);
  var showToGoTopBtn = scrolled > coords * 2; // the following conditions toggle the visibility of a fixed and relative "back-to-top" buttons
  // and the conditions will prevent the footer from flickering while the user is scrolling

  if (!footerInViewport && showToGoTopBtn && !goTopBtnFixed.classList.contains('cmp-back-to-top-show')) {
    // user has scrolled down enough to show the button
    // adding the style will transition the visibility of the button to show
    goTopBtnFixed.classList.add('cmp-back-to-top-show');
  } else if (!footerInViewport && !showToGoTopBtn) {
    // user has scrolled up enough to hide the button
    // removing the style will transition the visibility of the button to hide
    goTopBtnFixed.classList.remove('cmp-back-to-top-show');
  } else if (footerInViewport && goTopBtnFixed.style.display === "") {
    // user has scrolled down enough that the footer is visible
    // show the relative button and this will prevent the footer from flickering
    // set the display of the fixed button to "none" to immediately hide the button and avoid the CSS transition
    goTopBtnRelative.classList.add('cmp-back-to-top-show');
    goTopBtnFixed.style.display = "none";
  } else if (!footerInViewport && goTopBtnFixed.style.display === "none") {
    // user has scrolled up enough that the footer is no longer visible
    // set the display of the fixed button to "" to immediately show the button and avoid the CSS transition
    // hide the relative button and this will prevent the footer from flickering
    goTopBtnFixed.style.display = "";
    goTopBtnRelative.classList.remove('cmp-back-to-top-show');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Object(_stickyService__WEBPACK_IMPORTED_MODULE_1__[/* scrollListener */ "b"])(trackScroll);
});
goTopBtnFixed.addEventListener('click', function (e) {
  e.preventDefault();
  _scrollTo__WEBPACK_IMPORTED_MODULE_0___default()(0, 1500, 'easeOutSine');
});
goTopBtnRelative.addEventListener('click', function (e) {
  e.preventDefault();
  _scrollTo__WEBPACK_IMPORTED_MODULE_0___default()(0, 1500, 'easeOutSine');
});

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scrollToElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(234);
/* harmony import */ var _scrollToElement__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scrollToElement__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _screenSizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _fade_x__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(74);
/* harmony import */ var _stickyService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50);
/* harmony import */ var _sku_details__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56);





var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');
var ancFader = null; // Setup click handler for Anchor Links to scroll in view

var anchorLinks = document.querySelectorAll('.cmp-anchor__link') ? Array.from(document.querySelectorAll('.cmp-anchor__link')) : [];

var bindClickEvents = function bindClickEvents() {
  var anchorStickyHeaderOffset = 53;
  var skuDetailsStickyHeaderOffset = 145;
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var href = e.target.getAttribute('href').replace(/#/gi, '');
      var additionalScrollOffset = _sku_details__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].stickyExists() ? skuDetailsStickyHeaderOffset : anchorStickyHeaderOffset;
      _scrollToElement__WEBPACK_IMPORTED_MODULE_0___default()(href, 1000, 'easeOutSine', true, additionalScrollOffset);
      anchorLinks.forEach(function (anchor) {
        return anchor.classList.remove('active');
      });
      anchor.classList.add('active');

      if (_screenSizes__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isMobile()) {
        toggleMobileNav(true);
      }
    });
  });
};

window.addEventListener('load', bindClickEvents);
var anchorDestinations = [];

var setAnchorDestinations = function setAnchorDestinations() {
  for (var i = 0; i <= anchorLinks.length; i++) {
    var anchor = anchorLinks[i];

    if (anchor) {
      anchor.classList.remove('active');
      anchorDestinations.push({
        id: anchor.getAttribute('href'),
        anchor: anchor
      });
    }
  }
};

var activeClassName = "active";

var setAnchorState = function setAnchorState(index, isActive) {
  if (isActive) {
    anchorDestinations.forEach(function (item) {
      return item.anchor.classList.remove(activeClassName);
    });
    anchorDestinations[index].anchor.classList.add(activeClassName);
  } else {
    anchorDestinations[index].anchor.classList.remove(activeClassName);
  }
};

var atBottomOfPage = function atBottomOfPage() {
  return window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
};

var anchorScrollSpy = function anchorScrollSpy() {
  if (!anchorElement || !anchorDestinations) {
    return;
  }

  var anchorElementBottom = anchorElement.getBoundingClientRect().bottom;
  var docHeight = document.documentElement.clientHeight;
  anchorDestinations.forEach(function (item, index) {
    var id = item.id.replace(/#/gi, '');
    var elementBoundaries = document.getElementById(id).getBoundingClientRect();
    var elementTop = elementBoundaries.top;
    var elementBottom = elementBoundaries.bottom;
    var isBottomAboveContainer = elementBottom < anchorElementBottom;

    if (index === 0) {
      var thresholdMarker = docHeight / 1.4;
      var isAboveThresholdMarker = elementTop <= thresholdMarker;
      var isBetweenContainerAndThresholdMarker = !isBottomAboveContainer && isAboveThresholdMarker;
      setAnchorState(index, isBetweenContainerAndThresholdMarker);
    } else if (index === anchorDestinations.length - 1) {
      var _thresholdMarker = docHeight * .34;

      var _isAboveThresholdMarker = elementTop <= _thresholdMarker;

      var _isBetweenContainerAndThresholdMarker = !isBottomAboveContainer && _isAboveThresholdMarker;

      if (atBottomOfPage() && _isBetweenContainerAndThresholdMarker) {
        setAnchorState(index, true);
      } else {
        var isActive = !isBottomAboveContainer && elementTop <= anchorElementBottom;
        setAnchorState(index, isActive);
      }
    } else {
      var _isActive = !isBottomAboveContainer && elementTop <= anchorElementBottom;

      setAnchorState(index, _isActive);
    }
  });
};

function anchorHide() {
  if (document.getElementsByClassName('cmp-section-container--collapse').length > 0) {
    document.getElementsByClassName('anchor')[0].style.display = 'none';
  } else {
    document.getElementsByClassName('anchor')[0].style.display = 'block';
  }
}

function toggleMobileNav(forceClose) {
  var heading = document.querySelector('.cmp-anchor--sticky');

  if (!forceClose && heading && heading.classList.contains('closed')) {
    heading.classList.remove('closed');
    heading.classList.add('open');
  } else if (heading) {
    heading.classList.add('closed');
    heading.classList.remove('open');
  }
}

function showScrollBars(el) {
  el.classList.add('show-scroll-bar');
}

function hideScrollBars(el) {
  el.classList.remove('show-scroll-bar');
}

function anchorChange(el) {
  if (ancFader === null) {
    ancFader = Object(_fade_x__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])('cmp-anchor__list', 0, 75, false, true);
    var anchorElementId = document.getElementById('cmp-anchor');

    if (ancFader) {
      anchorElementId.addEventListener('scroll', ancFader);
    }
  }
}

function clearGradients() {
  var lhsGradient = document.querySelector('.cmp-anchor__list .fader-container--left');
  var rhsGradient = document.querySelector('.cmp-anchor__list .fader-container--right');

  if (lhsGradient !== null && rhsGradient !== null) {
    lhsGradient.style.display = 'none';
    rhsGradient.style.display = 'none';
  }
}

function applyGradients() {
  var lhsGradient = document.querySelector('.cmp-anchor__list .fader-container--left');
  var rhsGradient = document.querySelector('.cmp-anchor__list .fader-container--right');

  if (lhsGradient !== null && rhsGradient !== null) {
    lhsGradient.style.display = 'block';
    rhsGradient.style.display = 'block';
  }
}

function clearOpenContainers() {
  // This closes any open containers as the user transitions to/from mobile/desktop views instead of just leaving them open
  if (document.getElementsByClassName('cmp-section-container__title open')) {
    var listOfOpenTitleContainers = document.querySelectorAll('.cmp-section-container__title.open');
    var listOfOpenBodyContainers = document.querySelectorAll('.cmp-section-container__body.open');
    listOfOpenTitleContainers.forEach(function (record) {
      record.classList.remove('open');
    });
    listOfOpenBodyContainers.forEach(function (record) {
      record.classList.remove('open');
    });
  }
}

function resizeWindow(el) {
  var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;

  if (!hasHorizontalScrollbar) {
    clearGradients();
  } else {
    applyGradients();
  }
}

function scrollWindow(el) {
  var hasHorizontalScrollbar = el.scrollWidth > el.clientWidth;

  if (!hasHorizontalScrollbar) {
    clearGradients();
  }
}

var anchorList = document.querySelector('.cmp-anchor__list');

if (anchorList) {
  var anchorChangeToMobile = function anchorChangeToMobile(e) {
    if (e.matches) {
      anchorHide();
      clearGradients();
    } else {
      clearOpenContainers();
      document.getElementsByClassName('anchor')[0].style.display = "block";
    }
  };

  if (_screenSizes__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isMobile()) {
    anchorHide();
  }

  if (anchorElement) {
    setAnchorDestinations();
    Object(_stickyService__WEBPACK_IMPORTED_MODULE_3__[/* scrollListener */ "b"])(anchorScrollSpy);
    _stickyService__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].add({
      element: anchorElement,
      priority: 2,
      modifier: 'cmp-anchor--sticky',
      offset: {
        position: 'top',
        amount: 13
      },
      fillHeight: 52,
      stickyHeight: 53,
      stickyWith: document.querySelector('.cmp-sku-details') ? 'cmp-sku-details--sticky' : ''
    });
  }

  if (anchorMenu) {
    anchorMenu.addEventListener('click', function () {
      return toggleMobileNav();
    });
  }

  anchorList.addEventListener('mouseover', function () {
    return showScrollBars(anchorList);
  });
  anchorList.addEventListener('mouseout', function () {
    return hideScrollBars(anchorList);
  });
  anchorChange(anchorList);
  window.addEventListener('scroll', function () {
    return scrollWindow(anchorList);
  });
  window.addEventListener('load', function () {
    return resizeWindow(anchorList);
  });
  window.addEventListener('resize', function () {
    return resizeWindow(anchorList);
  });
  var mediaQueryListener = window.matchMedia('(max-width: 650px)');
  mediaQueryListener.addListener(anchorChangeToMobile);
}

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _stickyService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50);



var SortFilterSticky = function SortFilterSticky() {
  if (_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
    _stickyService__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].add({
      element: document.querySelector('.btn-show-sort-filter'),
      priority: 1,
      modifier: 'btn-show-sort-filter--sticky',
      offset: {
        position: 'top',
        amount: 0
      },
      fillHeight: 17.6,
      stickyHeight: 54
    });
  }
};

document.addEventListener('DOMContentLoaded', SortFilterSticky);

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stickyService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _sku_details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);



var SkuDetailsSticky = function SkuDetailsSticky() {
  if (_sku_details__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].okToConfigureSticky()) {
    _stickyService__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].add({
      element: _sku_details__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].element(),
      priority: 1,
      modifier: 'cmp-sku-details--sticky',
      offset: {
        position: 'bottom',
        amount: 60
      },
      conditions: function conditions(element) {
        if (_sku_details__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].preventSticky()) {
          // do not show sticky on mobile for discontinued items
          // because the sticky will show a blank space since users
          // will not see the quantity and add to cart button
          return false;
        }

        return _sku_details__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].allowSticky();
      },
      fillHeight: 50,
      stickyHeight: 92 // setting to 92px to remove gap between anchor and sku-details sticky

    });
  }
};

document.addEventListener('DOMContentLoaded', SkuDetailsSticky);
/* unused harmony default export */ var _unused_webpack_default_export = (SkuDetailsSticky);

/***/ }),

/***/ 409:
/***/ (function(module, exports) {

var anchorSkuScroll = function anchorSkuScroll() {
  var handler = function handler(event) {
    if (document.getElementsByClassName('cmp-sku-details__wrapper').length) {
      if (document.getElementsByClassName('cmp-anchor--sticky').length && document.getElementsByClassName('cmp-sku-details--sticky').length) {
        document.getElementsByClassName('cmp-sku-details__wrapper')[0].classList.add('cmp-sku-details__wrapper-noBorder');
      } else {
        document.getElementsByClassName('cmp-sku-details__wrapper')[0].classList.remove('cmp-sku-details__wrapper-noBorder');
      }
    } else {
      window.removeEventListener('scroll', handler);
    }
  };

  return handler;
};

window.addEventListener('scroll', anchorSkuScroll());

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

function scrollToY(scrollTargetY, speed, easing) {
  var scrollY = window.scrollY || document.documentElement.scrollTop,
      scrollTargetY = scrollTargetY || 0,
      speed = speed || 2000,
      easing = easing || 'easeOutSine',
      currentTime = 0;
  var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));
  var easingEquations = {
    easeOutSine: function easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function easeInOutSine(pos) {
      return -0.5 * (Math.cos(Math.PI * pos) - 1);
    },
    easeInOutQuint: function easeInOutQuint(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }

      return 0.5 * (Math.pow(pos - 2, 5) + 2);
    }
  };

  function tick() {
    currentTime += 1 / 60;
    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);
      window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  tick();
}

module.exports = scrollToY;

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


var androidSuggestionFix = function androidSuggestionFix() {
  var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  var isSearchPage = document.getElementsByClassName('cmp-search__sort-filter__container').length;

  if (!isAndroid && isSearchPage) {
    document.getElementsByClassName('cmp-search__sort-filter__container')[0].classList.add('no-fix');
  }

  if (_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && isAndroid && isSearchPage) {
    var windowHeight = document.documentElement.clientHeight;
    window.addEventListener('resize', function () {
      var newHeight = document.documentElement.clientHeight;
      var sortContainer = document.getElementsByClassName('cmp-search__sort-filter__container')[0];

      if (sortContainer) {
        var openedFacet = sortContainer.getElementsByClassName('cmp-search-filters__filter expanded')[0];

        if (openedFacet) {
          var searchField = openedFacet.getElementsByClassName('cmp-search-filters__filter__search')[0];

          if (windowHeight > newHeight) {
            if (searchField && document.activeElement === searchField) {
              sortContainer.scrollTo(0, sortContainer.scrollTop + (searchField.getBoundingClientRect().top - sortContainer.getBoundingClientRect().top));
            }
          } else if (newHeight > windowHeight) {
            windowHeight = newHeight;
          }
        }
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', androidSuggestionFix);

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);

var elem = document.querySelector('.cmp-navigation');

if (elem) {
  var overlay = document.createElement('div');
  overlay.classList.add('cmp-navigation-overlay__container');
  overlay.classList.add('overlay-container');
  elem.parentElement.after(overlay);

  var closeOverlay = function closeOverlay() {
    if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isTabletAndOver()) {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      overlay.style.transitionDelay = "0s, 0s";
      elem.classList.remove('cmp-navigation--shadow');
    }
  };

  var openOverlay = function openOverlay() {
    if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isTabletAndOver()) {
      overlay.style.opacity = "0.5";
      overlay.style.visibility = "visible";
      overlay.style.transitionDelay = "0s, 0s";
      elem.classList.add('cmp-navigation--shadow');
    }
  };

  var handleClickAway = function handleClickAway(event) {
    if (!(event && event.target && event.target.classList)) {
      return;
    }

    var level1ClickableClassNames = ['cmp-navigation__container', 'cmp-navigation__item-link', 'left', 'inline-svg', 'st0'];
    var matches = level1ClickableClassNames.filter(function (className) {
      return event.target.classList.contains(className);
    });

    if (matches.length === 0) {
      closeOverlay();
    }
  }; // Contains links only displayed on Mobile


  var mobileOnlyLinks = document.getElementById("cmp-navigation-mobileList");
  var mobileOnlyLinksJson = "";

  if (mobileOnlyLinks) {
    mobileOnlyLinksJson = JSON.parse(mobileOnlyLinks.innerHTML);
  }

  Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function (e) {
    var level2Links = e.querySelector('.cmp-navigation__group');
    var level2LinksCount = level2Links ? level2Links.children.length : 0;

    if (level2Links && mobileOnlyLinksJson.mobileList) {
      if (mobileOnlyLinksJson.mobileList !== "[]") {
        // All Products, All Applications etc
        var allArrayLevel2Links = Array.from(level2Links.children);
        allArrayLevel2Links.map(function (li) {
          var anchor = li.querySelector('.cmp-navigation__container > a'); //const anchorBasePathName = anchor.pathname.substr(0, anchor.pathname.length - 5);

          if (mobileOnlyLinksJson.mobileList.includes(anchor.pathname)) {
            li.classList.add("cmp-navigation__group-all-mobile");
          }
        });
      }
    }

    if (level2LinksCount !== 0) {
      e.addEventListener('mouseover', openOverlay);
      e.addEventListener('mouseleave', closeOverlay);
    }

    var level1Link = e.querySelector('.cmp-navigation__container .cmp-navigation__item-link');

    if (level1Link) {
      if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile()) {
        level1Link.addEventListener('click', function (event) {
          return event.preventDefault();
        });
      }
    }
  });
  document.body.addEventListener('click', handleClickAway);
  var header = document.querySelector('.cmp-header');

  if (header) {
    header.addEventListener('click', handleClickAway);
  }
}

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _fade_x__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74);


var FadeNav = function FadeNav() {
  var navFader = Object(_fade_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('cmp-navigation__group', 0, 100);
  var nav = document.querySelector('.cmp-navigation__group');

  if (navFader && nav) {
    nav.addEventListener('scroll', navFader);
  }
};

document.addEventListener('DOMContentLoaded', FadeNav);

/***/ }),

/***/ 413:
/***/ (function(module, exports) {

var pdfPluginVerification = function pdfPluginVerification() {
  var iframes = document.querySelectorAll('.cmp-iframe iframe');
  var noPDFPluginContainers = document.querySelectorAll('.no-pdf-plugin-container-ie');
  var browserName = getBrowserName();
  var pdfPlugin = getPDFPlugin();

  for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    var fileExtension = getFileExtension(iframe.src);
    if (fileExtension.toLowerCase() !== 'pdf' || browserName !== 'ie') continue;
    if (pdfPlugin) return;
    var noPDFPluginContainer = noPDFPluginContainers[i];
    iframe.classList.add('hide');
    noPDFPluginContainer.classList.remove('hide');
  }

  function getFileExtension(fileName) {
    return fileName.split('.').pop();
  }

  function getUserAgent() {
    return navigator ? navigator.userAgent.toLowerCase() : "other";
  }

  function getBrowserName() {
    var userAgent = getUserAgent();

    if (userAgent.indexOf("chrome") > -1) {
      return "chrome";
    } else if (userAgent.indexOf("safari") > -1) {
      return "safari";
    } else if (userAgent.indexOf("msie") > -1 || navigator.appVersion.indexOf('Trident/') > 0) {
      return "ie";
    } else if (userAgent.indexOf("firefox") > -1) {
      return "firefox";
    } else {
      return userAgent;
    }
  }

  ;

  function getActiveXObject(name) {
    try {
      return new ActiveXObject(name);
    } catch (e) {
      return null;
    }

    ;
  }

  ;

  function getPDFPlugin() {
    var names = ['AcroPDF.PDF', 'PDF.PdfCtrl'];

    for (var _i = 0; _i < names.length; _i++) {
      var activeXObject = getActiveXObject(names[_i]);
      if (activeXObject) return activeXObject;
    }

    return null;
  }

  ;
};

window.addEventListener('load', pdfPluginVerification);

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);

var sessionStore = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]();

function removeFromSession() {
  sessionStore.removeFromSearchURL();
}

function checkForSessionLink() {
  var getURL = sessionStore.getFromSearchURL();

  if (!getURL || getURL.constructor === Object && Object.entries(getURL).length === 0) {
    return false;
  }

  window.onbeforeunload = function (e) {
    return removeFromSession();
  };

  return getURL;
}

function hideBreadcrumbShowBackToSearch(link) {
  var searchButton = document.querySelectorAll('.cmp-breadcrumb-search');

  for (var n = 0; n < searchButton.length; n++) {
    var button = searchButton[n];
    var action = button.querySelector('.cmp-breadcrumb-search__link');
    button.classList.remove('cmp-breadcrumb-search--disable');
    action.href = link;
    action.addEventListener('click', function (e) {
      removeFromSession();
      sessionStore.setPreviousPagePositionEnabled();
    });
  }
}

var mediaQueryListener = window.matchMedia('(max-width: 650px)');

function changeBreadcrumb(source) {
  var scrollOffset = 40;

  if (source === 'FromScroll') {
    scrollOffset = 10;
  }
}

var breadcrumbDiv = document.querySelector('.breadcrumb');

if (breadcrumbDiv) {
  mediaQueryListener.addListener(changeBreadcrumb);
  breadcrumbDiv.addEventListener('scroll', function () {
    return changeBreadcrumb('FromScroll');
  });
  window.addEventListener('load', function () {
    return changeBreadcrumb('FromScroll');
  });
  window.addEventListener('resize', function () {
    return changeBreadcrumb('FromScroll');
  });
}

var link = checkForSessionLink();

if (link) {
  hideBreadcrumbShowBackToSearch(link);
}

/***/ }),

/***/ 415:
/***/ (function(module, exports) {

var bannerReplacement = function bannerReplacement() {
  if (!objectFitIsSupported()) {
    var bannerImages = Array.from(document.querySelectorAll('.cmp-banner .cmp-image'));
    bannerImages.forEach(function (imageContainer) {
      return replaceBannerImage(imageContainer);
    });
  }

  function replaceBannerImage(imageContainer) {
    imageContainer.classList.add('cmp-banner__backgroundImage');
    var imageElement = imageContainer.querySelector('.cmp-image__image');

    if (imageElement) {
      imageContainer.style.backgroundImage = "url('".concat(imageElement.src, "')");
    }
  }

  function objectFitIsSupported() {
    return Modernizr.objectfit ? true : false;
  }
};

window.addEventListener('load', bannerReplacement);

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _fade_x__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74);


var FadeBreadcrumb = function FadeBreadcrumb() {
  var bcFader = Object(_fade_x__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('cmp-breadcrumb__list', 0, 100, true);
  var bc = document.querySelector('.cmp-breadcrumb__list');

  if (bcFader && bc) {
    bc.addEventListener('scroll', bcFader);
  }
};

document.addEventListener('DOMContentLoaded', FadeBreadcrumb);

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _scripts_mobileNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(133);
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(17);
/* harmony import */ var _element_creators_services_servletService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(235);
/* harmony import */ var _element_creators_systemWideNotification__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(241);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var _scripts_inlineSVG__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(58);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(11);











var sessionStore = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"]();
var headerTB, headerTB_user, headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation_mainUL, headerNavigation_cartLI;

var headerInit = function headerInit() {
  domReferences();
  addEventListeners();
  render();
  renderSystemWideNotification();
};

function domReferences() {
  headerTB = document.querySelector('header.cmp-header .cmp-header__top-bar');
  headerTB_user = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
  headerTB_mobile = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile');
  headerTB_mobile_btn = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__mobile button');
  headerNavigation_comp = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
  headerNavigation_mainUL = document.querySelector('.cmp-header__navigation nav.cmp-navigation');
  headerNavigation_cartLI = document.querySelector('.top-bar__nav__cart');
}

function addEventListeners() {
  if (headerNavigation_comp) {
    var mobileNav = Object(_scripts_mobileNav__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])();

    if (mobileNav) {
      headerTB_mobile_btn.addEventListener('click', mobileNav.toggle);
      window.addEventListener('resize', mobileNav.resize);
    }
  }
}

function render() {
  // Show or Hide Cart Icon dependent upon eCommerce Status
  var hideCartClass = "top-bar__nav__cart--hide";

  if (Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_10__[/* isCartHidden */ "e"])()) {
    _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].addClass(headerNavigation_cartLI, hideCartClass);
  } else {
    _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].removeClass(headerNavigation_cartLI, hideCartClass);
  }

  var loggedInClass = 'loggedIn';

  if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].state()) {
    _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].addClass(headerTB_user, loggedInClass);
  } else {
    _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].removeClass(headerTB_user, loggedInClass);
  }

  var isUsed = 'is-used';

  if (headerNavigation_comp) {
    _scripts_domElements__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].addClass(headerTB_mobile, isUsed);
  }

  if (headerNavigation_mainUL) {
    if (headerNavigation_mainUL.childNodes.length > 0) {
      if (_scripts_screenSizes__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].isMobile()) {
        headerNavigation_mainUL.children[0].style.height = window.innerHeight - headerTB.offsetHeight + 'px';
      }
    }
  }
}

var handleSystemWideNotificationDismiss = function handleSystemWideNotificationDismiss() {
  var parent = document.querySelector('.cmp-header');
  var notification = parent.querySelector('.container-sitewide-notification');

  if (parent && notification) {
    parent.removeChild(notification);
    sessionStore.setDismissSystemWideNotification();
  }
};

var renderSystemWideNotification = /*#__PURE__*/function () {
  var _ref = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var component, result, parent;
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(sessionStore.getDismissSystemWideNotificatiopn() === 'Y')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            component = new _element_creators_systemWideNotification__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"](_element_creators_services_servletService__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], handleSystemWideNotificationDismiss);
            _context.next = 5;
            return component.create(Date.now());

          case 5:
            result = _context.sent;

            if (result.visible) {
              parent = document.querySelector('.cmp-header');
              parent.appendChild(result.element);
              _scripts_inlineSVG__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"].init('img.inline-svg', 'svg-inlined');
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderSystemWideNotification() {
    return _ref.apply(this, arguments);
  };
}();

window.addEventListener('load', headerInit);

/***/ }),

/***/ 418:
/***/ (function(module, exports) {

var sectionContainers = document.querySelectorAll('.cmp-section-container--collapse');

var toggleBody = function toggleBody(el) {
  var body = el.querySelector('.cmp-section-container__body');
  var title = el.querySelector('.cmp-section-container__title');
  var isOpen = body.classList.contains('open');

  if (window.matchMedia('(max-width: 650px)').matches) {
    // We only need to open and close items if they are in mobile view. If the user is in desktop view we have no reason to append or remove classes
    if (isOpen) {
      title.classList.remove('open');
      body.classList.remove('open');
    } else {
      title.classList.add('open');
      body.classList.add('open');
    }
  }
};

if (sectionContainers.length > 0) {
  var _loop = function _loop(i) {
    var el = sectionContainers[i];
    var title = el.querySelector('.cmp-section-container__title');
    title.addEventListener('click', function (e) {
      return toggleBody(el);
    });
  };

  for (var i = 0; i < sectionContainers.length; i++) {
    _loop(i);
  }
}

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);

var session = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]();
var continueBtns = document.querySelectorAll('.cmp-button-continue');
var continuePage = session.getContinueLink();

if (continueBtns.length && continuePage) {
  Array.from(continueBtns).forEach(function (btn) {
    btn.href = continuePage;
  });
  session.removeContinueLink();
}

(function getAllSignInLinks() {
  var header = document.getElementById('header');
  var signin = header.dataset.signinUrl;
  var register = header.dataset.registerUrl;
  var allLinks = document.getElementsByTagName('a');
  Array.from(allLinks).forEach(function (link) {
    if (link.href === signin || link.href === register) {
      link.addEventListener('click', function (e) {
        session.setContinueLink(window.location.href);
      });
    }
  });
})();

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _my_account_services_UserDetailsLazy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(70);




var session = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]();


function textModifier() {
  return _textModifier.apply(this, arguments);
}

function _textModifier() {
  _textModifier = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var detailsUrl, checkSessionStore, userDetails, objMapping, textReplaceElements, replaceObj;
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            detailsUrl = document.getElementById('header').dataset.userDetailsUrl;
            checkSessionStore = true;

            if (Array.from(document.querySelectorAll('.text-replace')).length !== 0) {
              checkSessionStore = false;
            }

            _context.next = 5;
            return Object(_my_account_services_UserDetailsLazy__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(detailsUrl, checkSessionStore, session);

          case 5:
            userDetails = _context.sent;
            objMapping = {
              user: _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__[/* keys */ "b"].userDetails,
              userDetails: _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__[/* keys */ "b"].userDetails
            };

            if (userDetails) {
              textReplaceElements = document.querySelectorAll('.text-replace');
              replaceObj = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__[/* keys */ "b"].userDetails, userDetails);
              Array.from(textReplaceElements).forEach(function (el) {
                var matches = el.innerHTML.match(/{{(.*?)}}/gi);
                Array.from(matches).forEach(function (match) {
                  var splitMatch = match.split('.');
                  var key = splitMatch[0].replace('{{', '');
                  var field = splitMatch[1].replace('}}', '');
                  var replacement = replaceObj[objMapping[key]][field];
                  el.innerHTML = el.innerHTML.replace(match, replacement);
                });
              });
            }

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _textModifier.apply(this, arguments);
}

textModifier();

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderFormattedLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderFormattedLabelText; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);

 // Array to hold countries with the Required "*" Asterisk before the label

var countryArray = ["JP"];

var isPrefix = function isPrefix() {
  return countryArray.indexOf(_scripts_DigitalData__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].page.country.toUpperCase()) > -1;
};

var renderFormattedLabel = function renderFormattedLabel(label, required) {
  var optionalLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  if (required) {
    var isPrefixValue = isPrefix();
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, isPrefixValue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--required"
    }, '*'), label, !isPrefixValue && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--required"
    }, '*'));
  }

  if (!required) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, label, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
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
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, label, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cmp-form-field--optional"
    }, ' ' + optionalLabel));
  }
};

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export keys */
var keys = {
  guid: 'waters.cartGuid',
  cartId: 'waters.cartId'
};

var LocalStore = function LocalStore() {
  this.setGUID = function (value) {
    return window.localStorage.setItem(keys.guid, value.toString());
  };

  this.getGUID = function () {
    return window.localStorage.getItem(keys.guid);
  };

  this.removeGUID = function () {
    return window.localStorage.removeItem(keys.guid);
  };

  this.setCartId = function (value) {
    return window.localStorage.setItem(keys.cartId, value.toString());
  };

  this.getCartId = function () {
    return window.localStorage.getItem(keys.cartId);
  };

  this.removeCartId = function () {
    return window.localStorage.removeItem(keys.cartId);
  };
};

/* harmony default export */ __webpack_exports__["a"] = (LocalStore);


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _stores_cookieStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52);


var checkOutStatus = {
  state: function state() {
    var cestatus = false;
    var soldToDetails = this.details;
    var soldToStatusCookie = _stores_cookieStore__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].getSoldToStatus();

    if (Array.isArray(soldToDetails)) {
      cestatus = !soldToDetails.length ? false : true;
    } //TODO Tobe deleted for the 6.2.0 release


    if (!cestatus && soldToStatusCookie) {
      cestatus = soldToStatusCookie.toUpperCase() == 'Y' ? true : false;
    }

    return cestatus;
  },

  get length() {
    var soldToDetails = this.details;

    if (!Array.isArray(soldToDetails)) {
      return 0;
    }

    return soldToDetails.length;
  },

  get details() {
    var sessionStore = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]();
    var soldToDetails = sessionStore.getSoldToDetails();
    return soldToDetails;
  }

};
/* harmony default export */ __webpack_exports__["a"] = (checkOutStatus);

/***/ }),

/***/ 48:
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

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);


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

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return scrollListener; });
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var last_known_scroll_position = 0;
var ticking = false;

var Sticky = /*#__PURE__*/function () {
  function Sticky() {
    Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Sticky);

    this.sumHeight = 0;
    this.currentStickyClasses = [];
    this.queue = [];
    this.attachedFunctions = [];
    this.current = [];
  }

  Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Sticky, [{
    key: "init",
    value: function init() {
      window.addEventListener('scroll', this.watch.bind(this));
    }
  }, {
    key: "throttle",
    value: function throttle(cb) {
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimFrame(function () {
          cb();
          ticking = false;
        });
        ticking = true;
      }
    }
  }, {
    key: "decideToStick",
    value: function decideToStick(offset, position, height, parent) {
      var attach = false;

      switch (offset.position) {
        case 'bottom':
          if (position.top - offset.amount + height <= 0) {
            attach = true;
          }

          break;

        case 'top':
          if (parent.getBoundingClientRect().top + offset.amount <= 0) {
            attach = true;
          } else if (position.x <= 0 && parent.getBoundingClientRect().y <= 0) {
            attach = true;
          }

          break;

        default:
          attach = false;
      }

      return attach;
    }
  }, {
    key: "watch",
    value: function watch(e) {
      var _this = this;

      this.throttle(function () {
        if (_this.queue && _this.queue.length) {
          _this.queue.forEach(function (q) {
            _this.conditionsToStick(q);
          });
        }

        if (_this.attachedFunctions && _this.attachedFunctions.length) {
          _this.attachedFunctions.forEach(function (fn) {
            fn(e);
          });
        }
      });
    }
  }, {
    key: "conditionsToStick",
    value: function conditionsToStick(q) {
      var position = q.element.getBoundingClientRect();

      if (this.decideToStick(q.offset, position, q.boundingClient.height, q.element.parentNode)) {
        var conditionalCheck = q.conditions;

        if (typeof conditionalCheck === 'function') {
          if (conditionalCheck(q.element)) {
            this.stick(q);
          } else {
            this.unstick(q);
          }
        } else {
          this.stick(q);
        }
      } else {
        this.unstick(q);
      }
    }
  }, {
    key: "stick",
    value: function stick(el) {
      var _this2 = this;

      if (!el.sticky) {
        el.sticky = true;
        var currentSticky = [];
        var hasStickyWith = [];
        this.queue.forEach(function (q) {
          if (q.sticky) {
            currentSticky.push(q);

            _this2.currentStickyClasses.push(q.modifier);

            q.element.classList.remove(q.modifier);
            q.element.classList.remove(q.modifier + '--shadow');
          } else if (q.stickyWith) {
            hasStickyWith.push(q);
          }
        });

        if (hasStickyWith) {
          hasStickyWith.forEach(function (hs) {
            if (_this2.currentStickyClasses.includes(hs.stickyWith)) {
              hs.sticky = true;
              currentSticky.push(hs);
            }
          });
        }

        this.sumHeight = 0;
        currentSticky.sort(function (a, b) {
          if (a.priority < b.priority) {
            return -1;
          } else if (b.priority < a.priority) {
            return 1;
          }

          return 0;
        });
        currentSticky.forEach(function (q, index) {
          var boundingClient = q.element.getBoundingClientRect();
          var rect = Object.assign({}, {
            height: boundingClient.height
          }); // set height on parent to avoid page jump

          q.element.parentNode.style.height = rect.height + q.fillHeight + 'px';
          q.element.parentNode.classList.add("current-sticky-".concat(q.modifier));
          q.element.classList.add(q.modifier);

          if (index === 0) {
            _this2.addTopPositioning(q, '0px');

            if (currentSticky.length === 1) {
              q.element.classList.add(q.modifier + '--shadow');
            }
          } else if (index === currentSticky.length - 1) {
            _this2.addTopPositioning(q, "".concat(_this2.sumHeight, "px"));

            q.element.classList.add(q.modifier + '--shadow');
          } else {
            _this2.addTopPositioning(q, "".concat(_this2.sumHeight, "px"));
          }

          _this2.sumHeight += q.stickyHeight;
        });
      }
    }
  }, {
    key: "unstick",
    value: function unstick(el) {
      var _this3 = this;

      if (el.sticky && !el.stickyWith || el.sticky && el.stickyWith && this.currentStickyClasses.indexOf(el.stickyWith) === -1) {
        el.element.style.opacity = 0;
        el.element.style.top = '';
        el.element.parentNode.style.height = '';
        el.element.parentNode.classList.remove("current-sticky-".concat(el.modifier));

        if (this.currentStickyClasses.length > 1) {
          this.addBottomShadow();
        }

        el.element.classList.remove(el.modifier + '--shadow');
        el.element.classList.remove(el.modifier);
        this.currentStickyClasses.splice(this.currentStickyClasses.indexOf(el.modifier), 1);
        setTimeout(function () {
          el.element.style.opacity = 1;
        }, 100);
        el.sticky = false;

        var _loop = function _loop(i) {
          var pastEl = _this3.queue[i];

          if (pastEl && pastEl.sticky && pastEl.stickyWith === el.modifier && _this3.currentStickyClasses.indexOf(pastEl.modifier) == -1) {
            pastEl.element.style.opacity = 0;
            pastEl.element.style.top = '';
            pastEl.element.parentNode.style.height = '';
            pastEl.element.parentNode.classList.remove("current-sticky-".concat(pastEl.modifier));

            if (_this3.currentStickyClasses.length > 1) {
              _this3.addBottomShadow();
            }

            pastEl.element.classList.remove(pastEl.modifier + '--shadow');
            pastEl.element.classList.remove(pastEl.modifier);
            setTimeout(function () {
              pastEl.element.style.opacity = 1;
            }, 100);
            pastEl.sticky = false;
          }
        };

        for (var i = 0; i < this.queue.indexOf(el); i++) {
          _loop(i);
        }
      } else {
        if (!el.element.classList.contains(el.modifier)) {
          el.element.classList.remove(el.modifier + '--shadow');
        }
      }
    }
  }, {
    key: "addTopPositioning",
    value: function addTopPositioning(el, position) {
      if (el.element.classList.contains('cmp-sku-details')) {
        el.element.children[0].style.top = position;
      } else {
        el.element.style.top = position;
      }
    }
  }, {
    key: "addBottomShadow",
    value: function addBottomShadow() {
      var bottomElement = {};
      this.queue.forEach(function (q) {
        if (!bottomElement.priority & q.sticky) {
          bottomElement = q;
        } else if (bottomElement.priority && bottomElement.priority >= q.priority) {
          bottomElement = q;
        }
      });

      if (bottomElement.element) {
        bottomElement.element.classList.add(bottomElement.modifier + '--shadow');
      }
    }
  }, {
    key: "add",
    value: function add(el) {
      if (!this) {
        return wait(sticky.add(el));
      }

      if (!el.element) {
        return;
      }

      var rect = el.element.getBoundingClientRect();
      el.boundingClient = Object.assign({}, {
        bottom: rect.bottom,
        height: rect.height,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        width: rect.width,
        x: rect.x,
        y: rect.y
      });
      this.queue.push(el);
    }
  }, {
    key: "attachToScrollListener",
    value: function attachToScrollListener(fn) {
      if (!this || !this.attachedFunctions) {
        return wait(sticky.attachToScrollListener(fn));
      }

      try {
        this.attachedFunctions.push(fn);
      } catch (e) {
        wait(sticky.attachToScrollListener(fn));
      }
    }
  }, {
    key: "findStickyEl",
    value: function findStickyEl(element) {
      var stickyService = null;

      if (this.queue && this.queue.length) {
        for (var q = 0; q < this.queue.length; q++) {
          if (this.queue[q].element == element) {
            stickyService = this.queue[q];
            break;
          }
        }
      }

      return stickyService;
    }
  }]);

  return Sticky;
}();

var sticky = new Sticky();
document.addEventListener('DOMContentLoaded', function () {
  sticky.init();
});

function wait(fn) {
  setTimeout(fn, 50);
}

/* harmony default export */ __webpack_exports__["a"] = (sticky);
var scrollListener = sticky.attachToScrollListener;

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// CONCATENATED MODULE: ./src/utils/textTransform.js
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
// EXTERNAL MODULE: ./src/utils/parse-query-params/index.js
var parse_query_params = __webpack_require__(113);

// CONCATENATED MODULE: ./src/scripts/footer.js



var scriptElement = document.getElementById('country-list-json');
var countries = scriptElement && scriptElement.innerHTML.trim() ? JSON.parse(scriptElement.innerHTML) : [];

if (Array.isArray(countries) && countries.length === 0) {
  var regionSelector = document.querySelector('.cmp-footer__selector__region');

  if (regionSelector) {
    regionSelector.classList.add('one-country');
  }
}

var languageSelector = document.querySelector('.cmp-footer__selector__language');
var languageSelectorOptions = document.querySelector('.cmp-footer__selector__language--options');

if (languageSelector) {
  var children = languageSelectorOptions && Array.prototype.slice.call(languageSelectorOptions.childNodes);
  var displayText = languageSelector.firstElementChild.innerText;
  var longestAnchor = displayText.length;

  if (children) {
    children.forEach(function (e) {
      if (e && e.tagName && e.tagName === 'A') {
        if (e.innerText && e.innerText.length > longestAnchor) {
          longestAnchor = e.innerText.length;
        }
      }
    });

    if (longestAnchor > displayText.length) {
      var diff = longestAnchor - displayText.length;
      var spacer = " ";
      languageSelector.firstElementChild.innerText = displayText + spacer.repeat(diff * 5);
    }
  }

  if (!languageSelector.classList.contains('one-link')) {
    languageSelector.addEventListener('click', function () {
      if (languageSelector.classList.contains('active')) {
        languageSelector.classList.remove('active');
      } else {
        languageSelector.classList.add('active');
      }
    });
    document.addEventListener("click", function (evt) {
      var targetElement = evt.target; // clicked element

      do {
        if (targetElement == languageSelector) {
          return;
        }

        targetElement = targetElement.parentNode;
      } while (targetElement);

      languageSelector.classList.remove('active');
    });
  }
}

document.addEventListener('mopinion_will_show', function (e) {
  domElements["a" /* default */].noScroll(true);
});
document.addEventListener('mopinion_will_hide', function (e) {
  domElements["a" /* default */].noScroll(false);
});
/**
 * Function is used to replace the text on check-your-email confirmation page for eproc users
 */

var footer_replaceTextOnEmailConfirmation = function replaceTextOnEmailConfirmation() {
  var element = document.getElementById('check-your-email-confirmation-text');

  if (element) {
    var userEmail = Object(parse_query_params["a" /* default */])(window.location.search)['email'] || '';
    replaceTextWith(element, {
      email: userEmail
    });
  }
};

footer_replaceTextOnEmailConfirmation();

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

var keys = {
  loggedInStatus: 'WatersGreetingCookie',
  soldToStatus: 'ST_STATUS',
  locale: 'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE'
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

;
var cookieStore = {
  getLoggedInStatus: function getLoggedInStatus() {
    return getCookie(keys.loggedInStatus);
  },
  getSoldToStatus: function getSoldToStatus() {
    return getCookie(keys.soldToStatus);
  },
  getLocale: function getLocale() {
    return getCookie(keys.locale);
  },
  setLocale: function setLocale() {
    if (_scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country === _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].globalExperience) {
      return;
    }

    var locale = "".concat(_scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].language, "_").concat(_scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].country);
    var cookieName = keys.locale;
    var existingCookie = getCookie(cookieName);

    if (!existingCookie || existingCookie !== locale) {
      document.cookie = "".concat(cookieName, "=").concat(locale, "; path=/");
    }
  }
};
/* harmony default export */ __webpack_exports__["a"] = (cookieStore);

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fetchData; });
/* unused harmony export getData */
/* unused harmony export postData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return postDataRedirect; });
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
/* harmony import */ var _redirectFunctions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);




var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;




var throwError = function throwError(error) {
  throw new Error(error);
};

function fetchData(_x, _x2) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url, options) {
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _Promise(function (resolve, reject) {
              fetch(url, Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({}, options)).then(function (response) {
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
  _getData = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url) {
    var response;
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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
  _postData = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, options, setError) {
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
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
  _postDataRedirect = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(url, options, setError) {
    return C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
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

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _ecommerce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var _loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _checkOutStatus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47);




var skuDetails = {
  element: function element() {
    return document.querySelector('.cmp-sku-details');
  },
  exists: function exists() {
    return this.element() ? true : false;
  },
  discontinued: function discontinued() {
    var skuEcom = this.exists() ? this.element().querySelector('.cmp-sku-details__ecom') : null;
    return !skuEcom ? false : skuEcom.getAttribute('data-discontinued') === 'true' ? true : false;
  },
  okToConfigureSticky: function okToConfigureSticky() {
    return this.exists() && _ecommerce__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].currentState() != _ecommerce__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].disabled;
  },
  preventSticky: function preventSticky() {
    return _screenSizes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && this.discontinued();
  },
  allowSticky: function allowSticky() {
    return !_ecommerce__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].isPartialState() ? true : _loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state() && _checkOutStatus__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].state();
  },
  stickyExists: function stickyExists() {
    return this.exists() && !this.preventSticky() && this.allowSticky();
  }
};
/* harmony default export */ __webpack_exports__["a"] = (skuDetails);

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/utils/inline-svg/inline-svg.js
var inLineSVG = function () {
  // Variables
  var inlineSVG = {};
  var supports = !!document.querySelector && !!document.addEventListener;
  var settings = {}; // Defaults

  var defaults = {
    initClass: "js-inlinesvg",
    svgSelector: "img.svg"
  };
  /**
   * Stolen from underscore.js
   * @private
   * @param {Int} times
   * @param {Function} func
   */

  var after = function after(times, func) {
    return function () {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };
  /**
   * Merge two objects together
   * @private
   * @param {Function} fn
   */


  var extend = function extend() {
    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length; // Check if a deep merge

    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
      deep = arguments[0];
      i++;
    } // Merge the object into the extended object


    var merge = function merge(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    }; // Loop through each object and conduct a merge


    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;
  }; // Methods

  /**
   * Grab all the SVGs that match the selector
   * @public
   */


  var getAll = function getAll() {
    var svgs = document.querySelectorAll(settings.svgSelector);
    return svgs;
  };
  /**
   * Inline all the SVGs in the array
   * @public
   */


  var inliner = function inliner(cb) {
    var svgs = getAll();
    var callback = after(svgs.length, cb);
    Array.prototype.forEach.call(svgs, function (svg, i) {
      // Store some attributes of the image
      var src = svg.src || svg.getAttribute("data-src"),
          attributes = svg.attributes; // Get the contents of the SVG

      var request = new XMLHttpRequest();
      request.open("GET", src, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          // Setup a parser to convert the response to text/xml in order for it
          // to be manipulated and changed
          var parser = new DOMParser();
          var result = parser.parseFromString(request.responseText, "text/xml");
          var inlinedSVG = result.getElementsByTagName("svg")[0]; // Remove some of the attributes that aren't needed

          inlinedSVG.removeAttribute("xmlns:a");
          inlinedSVG.removeAttribute("width");
          inlinedSVG.removeAttribute("height");
          inlinedSVG.removeAttribute("x");
          inlinedSVG.removeAttribute("y");
          inlinedSVG.removeAttribute("enable-background");
          inlinedSVG.removeAttribute("xmlns:xlink");
          inlinedSVG.removeAttribute("xml:space");
          inlinedSVG.removeAttribute("version"); // Add in the attributes from the original <img> except `src` or
          // `alt`, we don't need either

          Array.prototype.slice.call(attributes).forEach(function (attribute) {
            if (attribute.name !== "src" && attribute.name !== "alt") {
              inlinedSVG.setAttribute(attribute.name, attribute.value);
            }
          }); // Add an additional class to the inlined SVG to imply it was
          // infact inlined, might be useful to know

          if (inlinedSVG.classList) {
            inlinedSVG.classList.add("inlined-svg");
          } else {
            inlinedSVG.className += " " + "inlined-svg";
          } // Use the `longdesc` attribute if one exists


          if (attributes.longdesc) {
            var description = document.createElementNS("http://www.w3.org/2000/svg", "desc"),
                descriptionText = document.createTextNode(attributes.longdesc.value);
            description.appendChild(descriptionText);
            inlinedSVG.insertBefore(description, inlinedSVG.firstChild);
          } // Use the `alt` attribute if one exists


          if (attributes.alt) {
            inlinedSVG.setAttribute("aria-label", attributes.alt.value);
          } else {
            inlinedSVG.setAttribute("aria-hidden", "true");
          } // Replace the image with the SVG


          svg.parentNode && svg.parentNode.replaceChild && svg.parentNode.replaceChild(inlinedSVG, svg); // Fire the callback

          if (callback) {
            callback(settings.svgSelector);
          }
        } else {
          console.error("There was an error retrieving the source of the SVG.");
        }
      };

      request.onerror = function () {
        console.error("There was an error connecting to the origin server.");
      };

      request.send();
    });
  };
  /**
   * Initialise the inliner
   * @public
   */


  inlineSVG.init = function (options, callback) {
    // Test for support
    if (!supports) return; // Merge users option with defaults

    settings = extend(defaults, options || {}); // Kick-off the inliner

    inliner(callback || function () {}); // Once inlined and a class to the HTML

    if (document.documentElement.classList) {
      document.documentElement.classList.add(settings.initClass);
    } else {
      document.documentElement.className += " " + settings.initClass;
    }
  };

  return inlineSVG;
}();

/* harmony default export */ var inline_svg = (inLineSVG);
// CONCATENATED MODULE: ./src/scripts/inlineSVG.js

var inlineSVG = {
  init: function init(svgSelector, initClass) {
    try {
      inline_svg.init({
        svgSelector: svgSelector,
        // the class attached to all images that should be inlined
        initClass: initClass // class added to <html>

      }, function () {});
    } catch (e) {// console.log(e);
    }
  }
};
/* harmony default export */ var scripts_inlineSVG = __webpack_exports__["a"] = (inlineSVG);

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return validateUploadFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return convertFileIntoBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAttachmentFieldName; });
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;



var bytesToKb = function bytesToKb(size) {
  return parseInt(Math.floor(size / 1000));
};

var configFileSize = function configFileSize(config) {
  var attachmentFileSize = config.attachmentFileSize;

  if (attachmentFileSize) {
    var fileType = attachmentFileSize.slice(-2);

    switch (fileType) {
      case 'MB':
        return parseInt(attachmentFileSize.split('MB')[0]) * 1024;

      case 'KB':
        return parseInt(attachmentFileSize.split('KB')[0]);

      default:
        return parseInt(attachmentFileSize);
    }
  }
};

var validateUploadFile = function validateUploadFile(fileObj, labels, config) {
  var status = false;
  var error = '';
  var specialChar = new RegExp(_constants__WEBPACK_IMPORTED_MODULE_2__[/* FILENAME_REGX */ "b"]);
  var name = fileObj.name,
      size = fileObj.size;
  var fileSize = bytesToKb(size);
  var sizeFromConfig = configFileSize(config);

  if (fileSize > sizeFromConfig) {
    status = true;
    error = labels.attachmentFileSizeErrorMsg;
  } else if (specialChar.test(name)) {
    status = true;
    error = labels.attachmentFileNameErrorMsg;
  } else if (name.length > parseInt(config.maxAttachmentFileNameSizeWithExt)) {
    status = true;
    error = labels.attachmentFileNameLengthErrorMsg;
  }

  return {
    status: status,
    error: error
  };
};
var convertFileIntoBase64 = function convertFileIntoBase64(files) {
  return new _Promise(function (resolve) {
    var response = {
      fileName: '',
      base64Value: ''
    };

    try {
      if (files && files.length === 0) return resolve(response);
      var file = files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        return resolve({
          fileName: file.name,
          base64Value: reader.result
        });
      };

      reader.onerror = function () {
        return resolve(response);
      };
    } catch (e) {
      return resolve(response);
    }
  });
};
var getAttachmentFieldName = function getAttachmentFieldName(data) {
  var name = '';
  Object.entries(data).forEach(function (_ref) {
    var _ref2 = Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(value) === 'object' && value.length > -1) {
      name = key;
    }
  });
  return name;
};

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46);
/* harmony import */ var _custom_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(97);





var DropdownIndicator = function DropdownIndicator(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__[/* components */ "a"].DropdownIndicator, props, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    src: props.theme.dropdownIndicator
  }));
};

var Dropdown = function Dropdown(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_2__[/* default */ "c"], {
    defaultValue: props.getOptions(props.text)[props.defaultValue - 1],
    options: props.getOptions(props.text),
    value: props.sortValue && props.sortValue.value ? props.sortValue.value : props.getOptions(props.text)[props.sortValue - 1],
    onChange: props.onChange,
    isSearchable: props.isSearchable,
    styles: _custom_styles__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"],
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

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getAttributes; });
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _patterns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);


var getAttributes = function getAttributes(ref, validation, matchRef, emailValidationEndpoint, setError, clearError, setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, setValue, name) {
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
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"]["email"](value, ref, validation.validationMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications) && _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"]["newEmail"](value, emailValidationEndpoint, ref, validation.alreadyRegisteredMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications, setValue, name);
            }
          };

        case "checkBoxOrRadio":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, ref, matchRef);
            }
          };

        case "fileValidation":
          return {
            validate: function validate(value) {
              return _patterns__WEBPACK_IMPORTED_MODULE_1__[/* functions */ "a"][validation.validateFnName](value, ref, validation, setError, clearError);
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

  return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    required: validation && validation.required ? validation.requiredMsg ? validation.requiredMsg : "Required" : false
  }, setValidation(), setMinMax());
};

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var messageObj = {};

function ErrorMessages(errorObj) {
  var skuDetailsConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);

  switch (errorObj.status) {
    case 500:
      messageObj = {
        serviceUnavailable: skuDetailsConfig.errorInfo.serviceUnavailable,
        tryAgainLater: skuDetailsConfig.errorInfo.tryAgainLater,
        img: "lowStockIcon",
        anErrorHasOccurred: skuDetailsConfig.errorInfo.anErrorHasOccurred,
        wereSorry: skuDetailsConfig.errorInfo.wereSorry,
        modalImage: skuDetailsConfig.skuInfo.lowStockIcon
      };
      break;

    default:
      messageObj = {
        serviceUnavailable: skuDetailsConfig.errorInfo.serviceUnavailable,
        tryAgainLater: skuDetailsConfig.errorInfo.tryAgainLater,
        img: "lowStockItem",
        anErrorHasOccurred: skuDetailsConfig.errorInfo.anErrorHasOccurred,
        wereSorry: skuDetailsConfig.errorInfo.wereSorry,
        modalImage: skuDetailsConfig.skuInfo.lowStockIcon
      };
      break;
  }

  return messageObj;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  ErrorMessages: ErrorMessages
});

/***/ }),

/***/ 68:
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

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _screenSizes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);


var Fader = function Fader(targetClassName) {
  var offsetWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxFadeWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;
  var forceMobile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var wrap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var targetElement = document.querySelector(".".concat(targetClassName));

  if (!targetElement || _screenSizes_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].isMobile() && !forceMobile) {
    return;
  }

  var fadeOffset = offsetWidth || 0;
  var maxWidth = maxFadeWidth || Number.POSITIVE_INFINITY;
  targetElement.classList.add('fader-fade');
  var lDiv = document.createElement('div');
  lDiv.classList.add('fader-container');
  var rDiv = lDiv.cloneNode();
  lDiv.classList.add('fader-container--left');
  rDiv.classList.add('fader-container--right');
  targetElement.prepend(lDiv);
  targetElement.appendChild(rDiv);

  if (wrap) {
    var wrapper = document.createElement('div');
    targetElement.parentNode.insertBefore(wrapper, targetElement);
    wrapper.appendChild(targetElement);
  }

  var scrollCheck = function scrollCheck() {
    if (targetElement.scrollLeft > 0) {
      targetElement.classList.add('fader-fade--left');
      var lWidth = fadeOffset + targetElement.scrollLeft / 2;

      if (lWidth > maxWidth) {
        lDiv.style.width = maxWidth + offsetWidth + "px";
      } else if (targetElement.scrollLeft < 150 - fadeOffset) {
        lDiv.style.width = lWidth + "px";
      } else {
        lDiv.style.width = fadeOffset + 100 + "px";
      }
    } else {
      targetElement.classList.remove('fader-fade--left');
    }

    if (targetElement.scrollLeft + targetElement.clientWidth < targetElement.scrollWidth) {
      targetElement.classList.add('fader-fade--right');
      var scrollPos = targetElement.scrollWidth - (targetElement.scrollLeft + targetElement.clientWidth);
      var rWidth = scrollPos / 2 + fadeOffset;

      if (rWidth > maxWidth) {
        rDiv.style.width = maxWidth + offsetWidth + "px";
      } else if (scrollPos < 150) {
        rDiv.style.width = rWidth + "px";
      } else {
        rDiv.style.width = fadeOffset + 100 + "px";
      }
    } else {
      targetElement.classList.remove('fader-fade--right');
    }
  };

  scrollCheck();
  return scrollCheck;
};

/* harmony default export */ __webpack_exports__["a"] = (Fader);

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);





var SignIn = function SignIn(props) {
  var onSignIn = function onSignIn(e) {
    e.preventDefault();
    var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]();
    store.setSignInRedirect(window.location.href);
    window.location.href = props.signInUrl;
  };

  if (!Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* isSignInHidden */ "f"])()) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cmp-sku-signin-wrapper",
      "data-locator": "sku-signin-wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cmp-sku-signin",
      "data-locator": "sku-signin"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", Object.assign({
      className: "signin-link",
      "data-locator": "signin-link"
    }, {
      onClick: function onClick(e) {
        return onSignIn(e);
      },
      rel: 'nofollow'
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
      src: props.signInIcon,
      className: "signin-icon",
      "data-locator": "signin-icon"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "signin-part1",
      "data-locator": "signin-part1"
    }, props.signInText1)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "signin-part2",
      "data-locator": "signin-part2"
    }, props.signInText2), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "signin-part3",
      "data-locator": "signin-part3"
    }, props.signInText3)));
  } else {
    return null;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (SignIn);

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);




var newNotification = function newNotification(title, description, icon) {
  return {
    title: title,
    description: description,
    icon: icon
  };
};

var buildAddress = function buildAddress(address) {
  var includeCountryName = false;
  var addressArray = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getFullCompanyAddress */ "l"])(address, includeCountryName);
  return addressArray.map(function (x, i) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
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
          title: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getFullName */ "m"])(data),
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
            text: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getCountryName */ "g"])(data.country, config),
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
      var defaultSoldToAddresses = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getDefaultSoldToAddresses */ "h"])(data.soldToAccounts);
      return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getAddressesByType */ "d"])(defaultSoldToAddresses, type).map(function (address) {
        var tile = {
          name: type,
          columns: [{
            title: address.preferred ? 'Preferred Address' : '',
            rows: [{
              text: buildAddress(address),
              "class": 'address'
            }, {
              text: Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_2__[/* getCountryName */ "g"])(address.country, config),
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

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var Title = function Title(_ref) {
  var text = _ref.text;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-title",
    "data-locator": "title"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "cmp-title__text",
    "data-locator": "title-text"
  }, text), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-title__print",
    "data-locator": "title-print"
  }, text), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-accent-rule"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null)));
};

Title.defaultProps = {
  text: ""
};
/* harmony default export */ __webpack_exports__["a"] = (Title);

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);


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

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function skuQuantityInput(e) {
  var value = e.target.value;

  if (value.length > 3 || value > 999) {
    value = 999;
  }

  e.target.value = value;
}

function skuRemoveNegative(e) {
  e = e || window.event;
  var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode); // 45 = '-' sign,  48 = '0' Don't allow minus sign or leading zero

  if (charCode === 45 || charCode === 48 && e.target.value.length === 0) {
    e.preventDefault();
    return;
  } // In for FireFox


  if (!charStr.match(/^[0-9]$/)) {
    e.preventDefault();
    return;
  }
}

var quantitySkuList = document.getElementsByClassName("cmp-sku-list__quantity");

if (quantitySkuList) {
  for (var i = 0; i < quantitySkuList.length; i++) {
    quantitySkuList[i].addEventListener('keyup', function (event) {
      return skuQuantityInput(event);
    });
    quantitySkuList[i].addEventListener('keypress', function (event) {
      return skuRemoveNegative(event);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  SkuRemoveNegative: skuRemoveNegative,
  SkuQuantityInput: skuQuantityInput
});

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_1__);


var customDropdownStyles = {
  indicatorSeparator: function indicatorSeparator() {
    return {
      display: 'none'
    };
  },
  option: function option(provided, state) {
    return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorGray50,
      padding: "".concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.spaceXS, " ").concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.spaceS),
      backgroundColor: state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBackgroundLight : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorWhite,
      cursor: !state.isSelected ? 'pointer' : 'default',
      '&:hover': {
        color: !state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBlue50 : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorGray50,
        backgroundColor: !state.isSelected ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorWhite : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBackgroundLight
      },
      margin: 0
    });
  },
  control: function control(provided, state) {
    return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      'border-radius': _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.borderRadius,
      padding: ".3em ".concat(_styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.spaceXXS),
      color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorGray50,
      'border-color': state.isFocused ? _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBorderDark : _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBorderDark,
      outline: 'none',
      cursor: 'pointer',
      'box-shadow': 'none',
      '&:hover': {
        outline: 'none',
        color: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBlue50,
        borderColor: _styles_variables_scss__WEBPACK_IMPORTED_MODULE_1___default.a.colorBlue50
      }
    });
  },
  singleValue: function singleValue(provided, state) {
    return {};
  },
  menu: function menu(provided) {
    return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      marginTop: 0,
      borderRadius: 0,
      width: 'calc(100% - 2px)',
      marginLeft: '1px',
      marginBottom: 0,
      padding: 0
    });
  },
  menuList: function menuList(provided) {
    return Object(C_Users_ussdul_Projects_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, provided, {
      paddingBottom: 0,
      paddingTop: 0
    });
  }
};
/* harmony default export */ __webpack_exports__["a"] = (customDropdownStyles);

/***/ })

}]);