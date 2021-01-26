(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ analyticTypes; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ setClickAnalytics; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ setSelectDropdownAnalytics; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ mainCartContext; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ searchCartContext; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ relatedCartContext; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ shopAllCartContext; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(11);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js + 1 modules
var inlineSVG = __webpack_require__(44);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(8);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(2);

// EXTERNAL MODULE: ./src/stores/cookieStore.js
var cookieStore = __webpack_require__(45);

// CONCATENATED MODULE: ./src/analytics/eventTypes.js
var eventTypes = {
  cart: {
    name: 'cart',
    event: 'scAddAEM',
    context: ['Part Detail Page', 'Search: Global', 'Related Products', 'Shop All Products: Quick Add']
  },
  reOrder: {
    name: 'reOrder',
    event: 'scAddReorder',
    context: 'Order History: Reorder'
  },
  stock: {
    name: 'stock',
    event: 'checkAvailability'
  },
  search: {
    name: 'search',
    event: 'search'
  },
  form: {
    name: 'form',
    registration: {
      name: 'registrationForm',
      load: {
        event: 'registrationFormLoad'
      },
      submit: {
        event: 'registrationFormSubmit'
      },
      error: {
        event: 'registrationFormError'
      }
    },
    checkEmail: {
      name: 'checkEmailForm',
      load: {
        event: 'checkEmailFormLoad'
      },
      submit: {
        event: 'checkEmailFormSubmit'
      },
      error: {
        event: 'checkEmailFormError'
      }
    },
    signin: {
      name: 'signInForm',
      load: {
        event: 'signInFormLoad'
      },
      submit: {
        event: 'signInFormSubmit'
      },
      error: {
        event: 'signInFormError'
      }
    },
    troublesigningin: {
      name: 'troubleSignInForm',
      load: {
        event: 'troubleSignInFormLoad'
      },
      submit: {
        event: 'troubleSignInFormSubmit'
      },
      error: {
        event: 'troubleSignInFormError'
      }
    },
    resetpassword: {
      name: 'resetPasswordForm',
      load: {
        event: 'resetPasswordFormLoad'
      },
      submit: {
        event: 'resetPasswordFormSubmit'
      },
      error: {
        event: 'resetPasswordFormError'
      }
    },
    updatepassword: {
      name: 'updatePasswordForm',
      load: {
        event: 'legacyPasswordFormLoad'
      },
      submit: {
        event: 'legacyPasswordFormSubmit'
      },
      error: {
        event: 'legacyPasswordFormError'
      }
    },
    changepassword: {
      name: 'changePasswordForm',
      load: {
        event: 'changePasswordFormLoad'
      },
      submit: {
        event: 'changePasswordFormSubmit'
      },
      error: {
        event: 'changePasswordFormError'
      }
    },
    personaldetails: {
      name: 'personalDetailsForm',
      load: {
        event: 'personalDetailsFormLoad'
      },
      submit: {
        event: 'personalDetailsFormSubmit'
      },
      error: {
        event: 'personalDetailsFormError'
      }
    },
    contactsupport: {
      name: 'contactSupportForm',
      load: {
        event: 'contactSupportFormLoad'
      },
      submit: {
        event: 'contactSupportFormSubmit'
      },
      error: {
        event: 'contactSupportFormError'
      }
    }
  },
  linkClick: {
    name: 'linkClick',
    event: 'linkClick'
  },
  selectDropDown: {
    name: 'selectDropDown',
    event: 'selectDropDown'
  },
  orderHistory: {
    name: 'orderHistory',
    load: {
      event: 'orderHistoryPageLoad'
    },
    error: {
      event: 'orderHistoryError'
    }
  },
  orderDetails: {
    name: 'orderDetails',
    load: {
      event: 'orderDetailsPageLoad'
    },
    error: {
      event: 'orderDetailsPageError'
    }
  },
  quoteHistory: {
    name: 'quoteHistory',
    load: {
      event: 'quoteHistoryPageLoad'
    },
    error: {
      event: 'quoteHistoryError'
    }
  },
  quoteDetails: {
    name: 'quoteDetails',
    load: {
      event: 'quoteDetailsPageLoad'
    },
    error: {
      event: 'quoteDetailsPageError'
    }
  }
};
/* harmony default export */ var analytics_eventTypes = (eventTypes);
// CONCATENATED MODULE: ./src/analytics/index.js








var analytics_Analytics = function Analytics() {
  var _this = this;

  Object(classCallCheck["a" /* default */])(this, Analytics);

  this.setAnalytics = function (eventType, model) {
    var thisAnalyticEvent = null;

    if (eventType === 'form') {
      if (model.formName === 'resetpassword' && model.formType && model.formType === 'update') {
        model.formName = 'updatepassword';
      }

      if (model.formName !== 'chooseAccount') {
        thisAnalyticEvent = _this.analyticTypes[eventType][model.formName][model.event];
      }
    } else if (eventType === 'orderHistory' || eventType === 'orderDetails') {
      thisAnalyticEvent = _this.analyticTypes[eventType][model.event];
    } else {
      thisAnalyticEvent = _this.analyticTypes[eventType];
    }

    if (thisAnalyticEvent) {
      var newModel = _this.buildModel(eventType, model);

      if (newModel) {
        _this.dispatchEvent(thisAnalyticEvent.event, newModel);
      }
    }
  };

  this.setClickAnalytics = function (menuLocation, linkName, href) {
    var model = {
      detail: {
        url: href,
        menuLocation: menuLocation,
        key: 'LinkName',
        value: linkName
      }
    };

    _this.setAnalytics(_this.analyticTypes['linkClick'].name, model);
  };

  this.setSelectDropdownAnalytics = function (key, value) {
    var model = {
      detail: {
        key: key,
        value: value
      }
    };

    _this.setAnalytics(_this.analyticTypes['selectDropDown'].name, model);
  };

  this.buildModel = function (name, model) {
    var returnModel = null;

    switch (name) {
      case "stock":
      case "cart":
        returnModel = _this.mapCartAndStockModel(model);
        break;

      case "search":
        returnModel = _this.mapSearchModel(model);
        break;

      case "form":
        returnModel = _this.mapFormModel(model);
        break;

      default:
        returnModel = model;
        break;
    }

    return returnModel;
  };

  this.getUserData = function (model) {
    var userLoggedIn = cookieStore["a" /* default */].getLoggedInStatus();
    var store = new sessionStore["a" /* default */]();
    var userDetails = store.getUserDetails();
    model.page = DigitalData["a" /* default */].page ? DigitalData["a" /* default */].page : {};
    model.detail.userLoggedIn = cookieStore["a" /* default */].getLoggedInStatus() ? "yes" : "no";

    if (userDetails) {
      model.detail.userID = userDetails.userId;
    }

    return model;
  };

  this.mapFormModel = function (model) {
    model.event = _this.analyticTypes['form'][model.formName][model.event]['event'];
    model.formName = _this.analyticTypes['form'][model.formName]['name'];
    return model;
  };

  this.mapCartAndStockModel = function (model) {
    return {
      detail: {
        products: [model]
      }
    };
  };

  this.mapSearchModel = function (model) {
    if (!model) {
      return {};
    }

    var category = model.category ? model.category : '';
    var contentType = model.content_type ? model.content_type : '';
    var facetsObj = model.facets ? model.facets : {};
    var facets = Object.entries(facetsObj).map(function (item) {
      return {
        name: item[0],
        values: item[1]
      };
    });
    return {
      detail: {
        search: {
          category: category,
          contentType: contentType,
          facets: facets,
          totalResults: model.total
        }
      }
    };
  };

  this.dispatchEvent = function (eventName, model) {
    model = _this.getUserData(model); // Uncomment next two lines to test analytics
    // console.log(eventName, model);
    // alert(eventName);

    document.dispatchEvent(new CustomEvent(eventName, model));
  };

  this.siteLoad = function () {
    document.addEventListener('at-library-loaded', function (event) {
      if (typeof adobe != 'undefined') {
        document.addEventListener(adobe.target.event.CONTENT_RENDERING_SUCCEEDED, function (event) {
          inlineSVG["a" /* default */].init('img.inline-svg', 'svg-inlined');
        });
      }
    });
  };

  this.analyticTypes = analytics_eventTypes;
};

var analytics = new analytics_Analytics();
/* harmony default export */ var src_analytics = __webpack_exports__["b"] = (analytics);
var analyticTypes = analytics.analyticTypes;
var setClickAnalytics = analytics.setClickAnalytics;
var setSelectDropdownAnalytics = analytics.setSelectDropdownAnalytics;

var _analytics$analyticTy = Object(slicedToArray["a" /* default */])(analytics.analyticTypes.cart.context, 4),
    mainCartContext = _analytics$analyticTy[0],
    searchCartContext = _analytics$analyticTy[1],
    relatedCartContext = _analytics$analyticTy[2],
    shopAllCartContext = _analytics$analyticTy[3];



/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAvailability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getPricing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return matchListItems; });
/* harmony import */ var C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(113);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);









var availabilityUrlRequest = function availabilityUrlRequest(url, countryCode, partNo) {
  url = url.replace('{partnumber}', partNo).replace('{countryCode}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "v"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "k"])().toUpperCase() : countryCode);
  return url;
};

var priceUrlRequest = function priceUrlRequest(endpoint, sku, soldToId, salesOrg) {
  var url;
  return url = "".concat(endpoint, "?productNumber=").concat(sku, "&customerNumber=").concat(soldToId, "&salesOrg=").concat(salesOrg);
};

var legacyAddToCartUrlRequest = function legacyAddToCartUrlRequest(url, partNo, quantity) {
  url = url.replace('{partnumber}', partNo).replace('{quantity}', quantity);
  return url;
};

var addToCartUrlRequest = function addToCartUrlRequest(url, partNo, quantity, cartId) {
  var userId = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getUserId */ "u"])();
  userId = userId !== '' ? userId : 'anonymous';
  url = url.replace('{localeCountry}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "v"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "k"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCountryCode */ "g"])()).replace('{localeLanguage}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "v"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserLanguage */ "l"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getLanguage */ "p"])()).replace('{userType}', userId).replace('{guid}', cartId ? cartId : 'null').concat('', '?successWithCart=true');
  url = cartId ? url : url.concat('', "&createCart=".concat(!Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "v"])()));
  return url;
};

function addToCart(_x, _x2, _x3, _x4, _x5) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = Object(C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    var products, options, localStore, cartId, urlRequest, response, json, _json, _options, _urlRequest, _response, _json2;

    return C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(isCommerceApiMigrated === 'true' || isCommerceApiMigrated === true)) {
              _context.next = 36;
              break;
            }

            // Check if partNo is a single product or an array of products
            products = '';

            if (Array.isArray(partNo)) {
              products = {
                products: partNo
              };
            } else {
              products = {
                products: [{
                  code: partNo,
                  quantity: quantity
                }]
              };
            }

            options = {
              method: 'POST',
              credentials: 'include',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(products)
            };
            localStore = new _stores_localStore__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]();
            cartId = _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].state() ? localStore.getCartId() : localStore.getGUID();
            urlRequest = addToCartUrlRequest(url, partNo, quantity, cartId);
            _context.next = 9;
            return Object(_utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* fetchData */ "a"])(urlRequest, options, throwError);

          case 9:
            response = _context.sent;

            if (!(response.status === 200)) {
              _context.next = 18;
              break;
            }

            _context.next = 13;
            return response.json();

          case 13:
            json = _context.sent;

            if (!cartId && json) {
              _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].state() && json.cart.code && localStore.setCartId(json.cart.code);
              !_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].state() && json.cart.guid && localStore.setGUID(json.cart.guid);
            }

            return _context.abrupt("return", json);

          case 18:
            if (!(response.status === 400)) {
              _context.next = 32;
              break;
            }

            _context.next = 21;
            return response.json();

          case 21:
            _json = _context.sent;

            if (!(_json && _json.errors && _json.errors.length && _json.errors[0].type === 'CartError')) {
              _context.next = 28;
              break;
            }

            _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].state() && cartId && localStore.removeCartId();
            !_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].state() && cartId && localStore.removeGUID();
            addToCart(isCommerceApiMigrated, url, partNo, quantity, throwError);
            _context.next = 30;
            break;

          case 28:
            throwError({
              status: 500,
              ok: false
            });
            return _context.abrupt("return", response.status);

          case 30:
            _context.next = 34;
            break;

          case 32:
            throwError({
              status: 500,
              ok: false
            });
            return _context.abrupt("return", response.status);

          case 34:
            _context.next = 45;
            break;

          case 36:
            _options = {
              method: 'POST',
              credentials: 'include',
              body: JSON.stringify({
                partNumbers: partNo,
                quantity: quantity
              })
            };
            _urlRequest = legacyAddToCartUrlRequest(url, partNo, quantity);
            _context.next = 40;
            return Object(_utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* fetchData */ "a"])(_urlRequest, _options, throwError);

          case 40:
            _response = _context.sent;
            _context.next = 43;
            return _response.json();

          case 43:
            _json2 = _context.sent;
            return _context.abrupt("return", _json2);

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addToCart.apply(this, arguments);
}

function getAvailability(_x6, _x7, _x8) {
  return _getAvailability.apply(this, arguments);
}

function _getAvailability() {
  _getAvailability = Object(C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url, countryCode, partNo) {
    var options, urlRequest, response, json;
    return C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              method: 'GET',
              credentials: 'include'
            };
            urlRequest = availabilityUrlRequest(url, countryCode, partNo);
            _context2.next = 4;
            return Object(_utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* fetchData */ "a"])(urlRequest, options);

          case 4:
            response = _context2.sent;
            _context2.next = 7;
            return response.json();

          case 7:
            json = _context2.sent;
            return _context2.abrupt("return", json);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAvailability.apply(this, arguments);
}

function getPricing(_x9, _x10, _x11, _x12) {
  return _getPricing.apply(this, arguments);
}

function _getPricing() {
  _getPricing = Object(C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, sku, soldToId, salesOrg) {
    var options, urlRequest, response, json;
    return C_AEM_Code_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (Array.isArray(sku)) {
              sku = sku.map(function (skuItem) {
                return skuItem.code;
              }).join(',');
            }

            options = {
              method: 'GET',
              credentials: 'include',
              mode: 'cors'
            };
            urlRequest = priceUrlRequest(url, sku, soldToId, salesOrg);
            _context3.next = 5;
            return Object(_utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* fetchData */ "a"])(urlRequest, options);

          case 5:
            response = _context3.sent;
            _context3.next = 8;
            return response.json();

          case 8:
            json = _context3.sent;

            if (response.status === 200) {
              json.status = 200;
            } else {
              json.status = response.status;
            }

            return _context3.abrupt("return", json);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getPricing.apply(this, arguments);
}

var matchListItems = function matchListItems(skuListData, pricesAPIResults) {
  var skuListItem = {
    code: skuListData
  };

  for (var i = 0; i < pricesAPIResults.length; i++) {
    if (skuListItem.code === pricesAPIResults[i].productNumber) {
      skuListItem.custPrice = pricesAPIResults[i].netPrice.formattedValue;
      skuListItem.custValue = pricesAPIResults[i].netPrice.value;
      skuListItem.listPrice = pricesAPIResults[i].basePrice.formattedValue;
      skuListItem.listValue = pricesAPIResults[i].basePrice.value;
      skuListItem.currencyCode = pricesAPIResults[i].netPrice.currencyCode;
    }
  }

  return skuListItem;
};

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(9);

// EXTERNAL MODULE: ./src/sku-details/services/index.js
var services = __webpack_require__(518);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(14);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(91);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(12);

// EXTERNAL MODULE: ./src/sku-message/index.js
var sku_message = __webpack_require__(82);

// EXTERNAL MODULE: ./src/scripts/checkOutStatus.js
var checkOutStatus = __webpack_require__(63);

// EXTERNAL MODULE: ./src/scripts/ecommerce.js
var ecommerce = __webpack_require__(64);

// EXTERNAL MODULE: ./src/scripts/sku-details.js
var sku_details = __webpack_require__(66);

// EXTERNAL MODULE: ./src/scripts/stickyService.js
var stickyService = __webpack_require__(48);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(39);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(13);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

// EXTERNAL MODULE: ./src/constants/index.js
var constants = __webpack_require__(112);

// CONCATENATED MODULE: ./src/sku-list/views/sku-item.js








var Stock = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 522));
});
var Price = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 523));
});
var UnavailablePrice = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 524));
});

var AddToCart = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 520));
});
var AddToCartBody = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 55));
});













var sku_item_SkuItem = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(SkuItem, _React$Component);

  function SkuItem(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SkuItem);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SkuItem).call(this, props));

    _this.getCustPricing = function (pricingUrl, skuNumber, userInfo, propListPrice) {
      Object(services["c" /* getPricing */])(pricingUrl, skuNumber, userInfo.dynamicSoldTo, userInfo.salesOrg).then(function (response) {
        if (response.status && response.status === 200) {
          var match = Object(services["d" /* matchListItems */])(skuNumber, response);
          var listPriceValue = match.listPrice !== '' && match.listPrice != undefined ? match.listPrice : propListPrice;

          _this.setState({
            skuData: match,
            custPrice: match.custPrice,
            listPrice: listPriceValue,
            loading: false
          }, function () {//this.checkPricingAnalytics();
          });
        } else {
          // Add Error Object to State
          _this.setState({
            errorPriceType: [constants["a" /* BAD_REQUEST_CODE */], constants["g" /* SERVER_ERROR_CODE */]].includes(Object(eCommerceFunctions["c" /* getHttpStatusFromErrors */])(response.errors, response.status)) ? Object(userFunctions["v" /* isEprocurementUser */])() ? constants["i" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */] : constants["e" /* LIST_PRICE_WITH_ADD_TO_CART */] : constants["f" /* NO_PRICE_NO_ADD_TO_CART */],
            loading: false
          });
        }
      })["catch"](function (err) {
        // Add Error Object to State
        _this.setState({
          errorPriceType: constants["f" /* NO_PRICE_NO_ADD_TO_CART */],
          loading: false
        });
      });
    };

    _this.toggleErrorModal = function (err) {
      // Add Error Object to State
      _this.setState({
        errorObjCart: err
      });

      _this.setState({
        modalShown: !_this.state.modalShown
      });
    };

    _this.toggleModal = function () {
      _this.setState({
        modalShown: !_this.state.modalShown
      }, function () {
        if (sku_details["a" /* default */].exists()) {
          if (!_this.state.modalShown) {
            //Firefox bug -->
            //if on a sku page and the modal was just open, make call to check whether to stick again
            //this will unstick the current element if necessary
            var SKUDetailsSticky = stickyService["a" /* default */].findStickyEl(sku_details["a" /* default */].element);

            if (SKUDetailsSticky) {
              stickyService["a" /* default */].conditionsToStick(SKUDetailsSticky);
            }
          }
        }
      });
    };

    _this.checkAvailability = function (skuNumber) {
      Object(services["b" /* getAvailability */])(_this.state.availabilityUrl, _this.state.userCountry, skuNumber).then(function (response) {
        _this.setState({
          skuAvailability: response,
          analyticsConfig: Object(objectSpread["a" /* default */])({}, _this.state.analyticsConfig, response)
        }, function () {
          _this.checkAvailabilityAnalytics();
        });
      })["catch"](function (err) {
        // Add Error Object to State
        _this.setState({
          errorObjAvailability: err
        });
      });
    };

    _this.checkAvailabilityAnalytics = function () {
      var availabilityModel = {
        name: _this.state.analyticsConfig.name,
        price: _this.state.analyticsConfig.price,
        sku: _this.state.analyticsConfig.sku
      };

      if (_this.state.analyticsConfig.hasOwnProperty('availableDate')) {
        availabilityModel.stockDate = _this.state.analyticsConfig.availableDate;
      }

      if (_this.state.analyticsConfig.hasOwnProperty('availableQuantity')) {
        availabilityModel.stockQuantity = _this.state.analyticsConfig.availableQuantity.toString();
      }

      if (_this.state.analyticsConfig.hasOwnProperty('productStatus')) {
        availabilityModel.stockMessage = _this.state.analyticsConfig.productStatus;
      }

      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */].stock.name, availabilityModel);
    };

    _this.handleItemClick = function () {
      if (_this.props.onItemClick) {
        _this.props.onItemClick();
      }
    };

    _this.renderListOrUnavailablePrice = function () {
      var _this$state = _this.state,
          listPrice = _this$state.listPrice,
          skuInfo = _this$state.skuInfo,
          errorPriceType = _this$state.errorPriceType;

      if (errorPriceType === constants["i" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */]) {
        return /*#__PURE__*/react_default.a.createElement(UnavailablePrice, {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined') {
          return /*#__PURE__*/react_default.a.createElement(Price, {
            label: skuInfo.listPriceLabel,
            price: listPrice,
            isListPrice: true
          });
        }
      }
    };

    _this.renderPricing = function () {
      var _this$state2 = _this.state,
          custPrice = _this$state2.custPrice,
          listPrice = _this$state2.listPrice,
          skuInfo = _this$state2.skuInfo,
          errorPriceType = _this$state2.errorPriceType;

      if (loginStatus["a" /* default */].state()) {
        var price = typeof custPrice !== 'undefined' ? custPrice : listPrice;

        if (errorPriceType !== '') {
          return _this.renderListOrUnavailablePrice();
        } else {
          return /*#__PURE__*/react_default.a.createElement(Price, {
            label: skuInfo.custPriceLabel,
            price: price,
            isListPrice: false
          });
        }
      } else {
        return _this.renderListOrUnavailablePrice();
      }
    };

    _this.renderBuyInfoPartial = function () {
      var _this$state3 = _this.state,
          custPrice = _this$state3.custPrice,
          listPrice = _this$state3.listPrice,
          loading = _this$state3.loading,
          skuInfo = _this$state3.skuInfo,
          skuAvailability = _this$state3.skuAvailability,
          errorConfig = _this$state3.errorConfig,
          modalConfig = _this$state3.modalConfig,
          errorObjCart = _this$state3.errorObjCart,
          errorObjAvailability = _this$state3.errorObjAvailability;
      var _this$props = _this.props,
          relatedSku = _this$props.relatedSku,
          skuConfig = _this$props.skuConfig;
      var isErrorModal = Object.keys(errorObjCart).length !== 0;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo"
      }, loginStatus["a" /* default */].state() && typeof custPrice !== 'undefined' && custPrice !== listPrice && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__list-price",
        "data-locator": "list-price-label",
        "aria-label": "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)
      }, "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__priceinfo"
      }, loading ? /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        onClick: function onClick(e) {
          return _this.checkAvailability(relatedSku.code);
        }
      }, (skuAvailability.productStatus || _this.state && errorObjAvailability && errorObjAvailability.ok === false) && /*#__PURE__*/react_default.a.createElement(Stock, {
        skuInfo: skuInfo,
        skuNumber: relatedSku.code,
        skuAvailability: skuAvailability,
        skuType: "details",
        errorObj: errorObjAvailability
      }), !skuAvailability.productStatus && !(_this.state && errorObjAvailability && errorObjAvailability.ok === false) && /*#__PURE__*/react_default.a.createElement("span", {
        className: "cmp-sku-list__checkavailability"
      }, skuConfig.skuInfo.seeAvailabilityLabel, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        alt: skuConfig.skuInfo.seeAvailabilityLabel,
        src: skuConfig.skuInfo.refreshIcon,
        "data-locator": "check-availability"
      }))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__buttons"
      }, /*#__PURE__*/react_default.a.createElement(AddToCart, {
        toggleParentModal: _this.toggleModal,
        skuNumber: relatedSku.code,
        addToCartLabel: skuConfig.addToCartLabel,
        addToCartQty: skuConfig.defaultSkuQty,
        addToCartUrl: skuConfig.addToCartUrl,
        isCommerceApiMigrated: skuConfig.isCommerceApiMigrated,
        toggleErrorModal: _this.toggleErrorModal,
        analyticsConfig: _this.state.analyticsConfig,
        qtyLabel: skuConfig.qtyAriaLabel
      }), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: _this.state.modalShown,
        onClose: _this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, !isErrorModal && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: modalConfig.title,
        icon: modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), isErrorModal && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: errorConfig.title,
        icon: errorConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTopError
      }), /*#__PURE__*/react_default.a.createElement(AddToCartBody, {
        config: modalConfig,
        errorObjCart: errorObjCart
      }))));
    };

    _this.renderBuyInfoCommerceView = function () {
      if (ecommerce["a" /* default */].isDisabledState()) {
        return null;
      } else {
        if (ecommerce["a" /* default */].isPartialState() && loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state() || !ecommerce["a" /* default */].isPartialState() && !ecommerce["a" /* default */].isDisabledState()) {
          return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, _this.renderBuyInfoPartial());
        } else {
          return null;
        }
      }
    };

    _this.renderBuyInfo = function () {
      if (_this.props.isEProcurementUserRestricted) {
        return null;
      }

      var buyInfoCommerceView = _this.renderBuyInfoCommerceView();

      var _this$props2 = _this.props,
          relatedSku = _this$props2.relatedSku,
          skuConfig = _this$props2.skuConfig;

      if (relatedSku.discontinued) {
        var discontinuedMessage = skuConfig.skuInfo.discontinuedWithReplacementWithCode;

        if (!relatedSku.replacementskucode || !relatedSku.replacementskuurl) {
          discontinuedMessage = skuConfig.skuInfo.discontinuedNoReplacementCode;
        }

        return /*#__PURE__*/react_default.a.createElement(sku_message["a" /* default */], {
          icon: skuConfig.skuInfo.lowStockIcon,
          message: discontinuedMessage,
          link: relatedSku.replacementskuurl,
          linkMessage: relatedSku.replacementskucode
        });
      } else if (_this.state.errorPriceType === constants["f" /* NO_PRICE_NO_ADD_TO_CART */]) {
        return /*#__PURE__*/react_default.a.createElement(sku_message["a" /* default */], {
          icon: skuConfig.skuInfo.lowStockIcon,
          message: skuConfig.skuInfo.skuErrorMessage
        });
      } else {
        return buyInfoCommerceView;
      }
    };

    _this.renderBreadcrumb = function () {
      var _this$props3 = _this.props,
          relatedSku = _this$props3.relatedSku,
          skuConfig = _this$props3.skuConfig;

      if (skuConfig.showBreadcrumbs) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: "cmp-search__results-item-breadcrumb skuitem",
          "data-locator": "search-results-breadcrumb"
        }, /*#__PURE__*/react_default.a.createElement("div", {
          "aria-label": relatedSku.category_facet
        }, relatedSku.category_facet), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: skuConfig.skuInfo.nextIcon,
          "aria-hidden": "true"
        }), /*#__PURE__*/react_default.a.createElement("div", {
          "aria-label": relatedSku.contenttype_facet
        }, relatedSku.contenttype_facet));
      }

      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
    };

    _this.isDisabled = function () {
      if (ecommerce["a" /* default */].isPartialState()) {
        var conditions = loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state();
        return !conditions;
      } else {
        return ecommerce["a" /* default */].isDisabledState();
      }
    };

    _this.state = {
      modalShown: false,
      modalConfig: Object(objectSpread["a" /* default */])({}, _this.props.skuConfig.modalInfo, {
        textHeading: _this.props.relatedSku.code,
        text: _this.props.relatedSku.title,
        partNumberLabel: _this.props.skuConfig.skuInfo.partNumberLabel
      }),
      errorConfig: Object(objectSpread["a" /* default */])({}, _this.props.skuConfig.errorInfo, {
        textHeading: _this.props.relatedSku.code,
        text: _this.props.relatedSku.title,
        partNumberLabel: _this.props.skuConfig.skuInfo.partNumberLabel
      }),
      listPrice: _this.props.relatedSku.formattedPrice,
      custPrice: undefined,
      skuInfo: _this.props.skuConfig.skuInfo,
      skuNumber: _this.props.relatedSku.code,
      userInfo: _this.props.userInfo,
      userCountry: _this.props.skuConfig.countryCode,
      availabilityUrl: _this.props.skuConfig.availabilityUrl,
      pricingUrl: _this.props.skuConfig.pricingUrl,
      addToCartUrl: _this.props.skuConfig.addToCartUrl,
      loading: true,
      skuAvailability: {},
      skuData: _this.props.relatedSku,
      analyticsConfig: {
        context: sku_details["a" /* default */].exists() ? analytics["d" /* relatedCartContext */] : analytics["e" /* searchCartContext */],
        name: _this.props.relatedSku.title,
        price: _this.props.relatedSku.formattedPrice,
        custPrice: '',
        sku: _this.props.relatedSku.code
      },
      errorObjCart: {},
      errorObjAvailability: {},
      errorPriceType: ''
    };
    return _this;
  }

  Object(createClass["a" /* default */])(SkuItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state4 = this.state,
          pricingUrl = _this$state4.pricingUrl,
          skuNumber = _this$state4.skuNumber,
          userInfo = _this$state4.userInfo;

      if (loginStatus["a" /* default */].state()) {
        if (Object.keys(userInfo).length > 0 && userInfo.callCustApi) {
          this.getCustPricing(pricingUrl, skuNumber, userInfo, this.props.relatedSku.formattedPrice);
        } else {
          this.setState({
            loading: false
          });
        }
      } else {
        this.setState({
          loading: false
        });
      }
    } //Note: getCustPricing Method should be an exact match between SKU Details and SKU List

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var differentDynamicSoldToId = this.props.userInfo.dynamicSoldTo !== nextProps.userInfo.dynamicSoldTo;
      var differentSalesOrg = this.props.userInfo.salesOrg !== nextProps.userInfo.salesOrg;
      return differentDynamicSoldToId || differentSalesOrg;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          relatedSku = _this$props4.relatedSku,
          skuConfig = _this$props4.skuConfig;
      var buyInfo = this.renderBuyInfo();
      var breadcrumbs = this.renderBreadcrumb();
      var disabledClass = this.isDisabled() ? 'disabled' : '';

      if (!relatedSku.primaryImageThumbnail || relatedSku.primaryImageThumbnail === "") {
        relatedSku.primaryImageThumbnail = skuConfig.skuInfo.noThumbnailImage;
      }

      var imageAltLabel = relatedSku.primaryImageAlt ? relatedSku.primaryImageAlt : relatedSku.title;
      return /*#__PURE__*/react_default.a.createElement("li", null, /*#__PURE__*/react_default.a.createElement("div", {
        className: 'cmp-sku-list__container ' + disabledClass
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__right"
      }, /*#__PURE__*/react_default.a.createElement("img", {
        src: relatedSku.primaryImageThumbnail,
        alt: relatedSku.title,
        "data-locator": "product-image"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__left"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__code",
        "data-locator": "product-number",
        "aria-label": skuConfig.skuInfo.partNumberLabel + " " + relatedSku.code
      }, skuConfig.skuInfo.partNumberLabel + " " + relatedSku.code), /*#__PURE__*/react_default.a.createElement("a", {
        onClick: this.handleItemClick,
        href: relatedSku.skuPageHref ? relatedSku.skuPageHref : null
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title)), buyInfo, breadcrumbs)));
    }
  }]);

  return SkuItem;
}(react_default.a.Component);

sku_item_SkuItem.defaultProps = {
  key: '',
  relatedSku: {},
  skuConfig: {},
  baseSignInUrl: '',
  onItemClick: function onItemClick() {},
  userInfo: {},
  isEProcurementUserRestricted: false
};
/* harmony default export */ var sku_item = (sku_item_SkuItem);
// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/index.js
var lib = __webpack_require__(498);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./src/sku-list/views/lit-item.js




var lit_item_LitItem = function LitItem(_ref) {
  var result = _ref.result,
      nextIcon = _ref.nextIcon,
      key = _ref.key,
      onItemClick = _ref.onItemClick;
  var thumbnail = /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-thumbnail"
  }, /*#__PURE__*/react_default.a.createElement("img", {
    src: result.thumbnail,
    alt: result.title
  }));
  return /*#__PURE__*/react_default.a.createElement("li", {
    className: "cmp-search__results-item",
    key: result.literaturecode
  }, result.thumbnail && thumbnail, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-body ".concat(result.thumbnail ? 'cmp-search__results-body--image' : '')
  }, /*#__PURE__*/react_default.a.createElement("a", {
    href: result.url,
    onClick: onItemClick,
    className: "cmp-search__results-item-link"
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "cmp-search__results-item-title"
  }, result.title)), result.description && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-item-description"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-item-description-text"
  }, /*#__PURE__*/react_default.a.createElement(lib_default.a, {
    text: result.description,
    maxLine: "3",
    ellipsis: "\u2026",
    trimRight: true,
    basedOn: "words",
    clamped: "true"
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-item-breadcrumb"
  }, /*#__PURE__*/react_default.a.createElement("div", null, result.category_facet), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: nextIcon
  }), /*#__PURE__*/react_default.a.createElement("div", null, result.contenttype_facet))));
};

/* harmony default export */ var lit_item = (lit_item_LitItem);
// EXTERNAL MODULE: ./src/scripts/signIn.js
var scripts_signIn = __webpack_require__(497);

// CONCATENATED MODULE: ./src/sku-list/index.js





// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time








var sku_list_SkuList = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(SkuList, _React$Component);

  function SkuList(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SkuList);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SkuList).call(this, props));
    _this.state = {
      skuConfig: _this.props.skuConfig,
      skuAvailability: {},
      addToCartQty: undefined,
      skuInfo: _this.props.skuConfig.skuInfo,
      userCountry: _this.props.skuConfig.countryCode,
      isEProcurementUserRestricted: !Object(userFunctions["v" /* isEprocurementUser */])() && Object(userFunctions["w" /* isEprocurementUserRole */])(),
      userInfo: Object(userFunctions["a" /* callCustomerPriceApi */])(_this.props.skuConfig.isCustomerPriceApiDisabled)
    };
    return _this;
  }

  Object(createClass["a" /* default */])(SkuList, [{
    key: "renderSignIn",
    value: function renderSignIn() {
      if (!loginStatus["a" /* default */].state()) {
        return /*#__PURE__*/react_default.a.createElement(scripts_signIn["a" /* default */], {
          signInUrl: this.props.skuConfig.baseSignInUrl,
          signInIcon: this.props.skuConfig.skuInfo.signinIcon,
          signInText1: this.props.skuConfig.skuInfo.signInText1,
          signInText2: this.props.skuConfig.skuInfo.signInText2,
          signInText3: this.props.skuConfig.skuInfo.signInText3
        });
      } else {
        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "renderResultByType",
    value: function renderResultByType(record, index) {
      var nextIcon = this.props.skuConfig.skuInfo.nextIcon;
      var onItemClick = this.props.onItemClick;

      if (record.code) {
        return /*#__PURE__*/react_default.a.createElement(sku_item, {
          key: index,
          relatedSku: record,
          skuConfig: this.props.skuConfig,
          baseSignInUrl: this.props.baseSignInUrl,
          onItemClick: this.props.onItemClick,
          userInfo: this.state.userInfo,
          isEProcurementUserRestricted: this.state.isEProcurementUserRestricted
        });
      } else {
        return /*#__PURE__*/react_default.a.createElement(lit_item, {
          result: record,
          nextIcon: nextIcon,
          key: index,
          onItemClick: onItemClick
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var signIn = this.renderSignIn();
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.props.data.length > 0 &&
      /*#__PURE__*/
      //only return template if data exists
      react_default.a.createElement(react_default.a.Fragment, null, this.props.title && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__title"
      }, this.props.title), signIn, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search__results-container"
      }, /*#__PURE__*/react_default.a.createElement("ul", {
        className: "cmp-search__results"
      }, this.props.data.map(function (record, index) {
        return _this2.renderResultByType(record, index);
      })))));
    }
  }]);

  return SkuList;
}(react_default.a.Component);

sku_list_SkuList.defaultProps = {
  skuConfig: {},
  data: [],
  title: ''
};
/* harmony default export */ var sku_list = __webpack_exports__["default"] = (sku_list_SkuList);

/***/ })

}]);