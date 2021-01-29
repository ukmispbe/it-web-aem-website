(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f6f8f9","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

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
    },
    quoteAgainClick: {
      event: 'quoteAgainClick'
    }
  },
  quoteDetails: {
    name: 'quoteDetails',
    load: {
      event: 'quoteDetailsPageLoad'
    },
    error: {
      event: 'quoteDetailsPageError'
    },
    quotePlaceOrder: {
      event: 'quotePlaceOrder'
    },
    quoteAgainClick: {
      event: 'quoteAgainClick'
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
    } else if (eventType === 'orderHistory' || eventType === 'orderDetails' || eventType === 'quoteHistory' || eventType === 'quoteDetails') {
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

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAvailability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getPricing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return matchListItems; });
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(114);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);









var availabilityUrlRequest = function availabilityUrlRequest(url, countryCode, partNo) {
  url = url.replace('{partnumber}', partNo).replace('{countryCode}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "x"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "m"])().toUpperCase() : countryCode);
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
  var userId = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getUserId */ "w"])();
  userId = userId !== '' ? userId : 'anonymous';
  url = url.replace('{localeCountry}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "x"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "m"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCountryCode */ "i"])()).replace('{localeLanguage}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "x"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserLanguage */ "n"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getLanguage */ "r"])()).replace('{userType}', userId).replace('{guid}', cartId ? cartId : 'null').concat('', '?successWithCart=true');
  url = cartId ? url : url.concat('', "&createCart=".concat(!Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "x"])()));
  return url;
};

function addToCart(_x, _x2, _x3, _x4, _x5) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    var products, options, localStore, cartId, urlRequest, response, json, _json, _options, _urlRequest, _response, _json2;

    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  _getAvailability = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url, countryCode, partNo) {
    var options, urlRequest, response, json;
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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
  _getPricing = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, sku, soldToId, salesOrg) {
    var options, urlRequest, response, json;
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
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

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/HashRouter.js
var HashRouter = __webpack_require__(510);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__(512);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(508);

// CONCATENATED MODULE: ./src/my-account/routes.js
/* harmony default export */ var routes = ({
  myAccount: {
    name: "myAccount",
    path: "/"
  },
  profile: {
    name: "profile",
    path: "/profile",
    parentTrail: ['/']
  },
  changePassword: {
    name: "changePassword",
    path: "/changepassword",
    parentTrail: ['/']
  },
  orderHistory: {
    name: "orderHistory",
    path: "/orderhistory",
    parentTrail: ['/']
  },
  orderDetails: {
    name: "orderDetails",
    path: "/orderdetails",
    parentTrail: ['/', '/orderhistory']
  },
  quoteHistory: {
    name: "quoteHistory",
    path: "/quotehistory",
    parentTrail: ['/']
  },
  quoteDetails: {
    name: "quoteDetails",
    path: "/quotedetails",
    parentTrail: ['/', '/quotehistory']
  }
});
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var es_Link = __webpack_require__(509);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(511);

// EXTERNAL MODULE: ./src/typography/title.js
var typography_title = __webpack_require__(494);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(6);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(9);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(10);

// CONCATENATED MODULE: ./src/my-account/components/breadcrumb.js








var breadcrumb_Breadcrumb = function Breadcrumb(props) {
  var breadcrumbList = document.querySelector('.cmp-breadcrumb__list');

  var _useState = Object(react["useState"])(screenSizes["a" /* default */].isMobile()),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      isMobile = _useState2[0],
      setIsMobile = _useState2[1];

  var currentPath = Object.values(routes).filter(function (route) {
    return route.path === props.path;
  })[0];
  Object(react["useEffect"])(function () {
    var breadcrumb = document.querySelector('.cmp-breadcrumb-my-account');
    breadcrumb && breadcrumb.classList.add('show');

    var handleResize = function handleResize() {
      return setIsMobile(screenSizes["a" /* default */].isMobile());
    };

    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
      breadcrumb.classList.remove('show');
    };
  }, []);

  var renderBackToLink = function renderBackToLink() {
    var parentRoutePath = currentPath.parentTrail[currentPath.parentTrail.length - 1];
    var parentRouteName = Object.values(routes).filter(function (route) {
      return route.path === parentRoutePath;
    })[0].name;
    var parentConfig = props.config.routes[parentRouteName];
    return /*#__PURE__*/react_default.a.createElement("li", {
      className: "cmp-breadcrumb-back"
    }, /*#__PURE__*/react_default.a.createElement(es_Link["a" /* default */], {
      "class": "cmp-breadcrumb-back__link cmp-button--secondary cmp-button--no-border cmp-button--with-icon",
      to: parentRoutePath,
      title: parentConfig.title
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: props.config.backIcon
    }), /*#__PURE__*/react_default.a.createElement("span", null, parentConfig.backLinkTitle)));
  };

  var renderBreadcrumbLink = function renderBreadcrumbLink(linkPath) {
    var linkRoute = Object.values(routes).filter(function (route) {
      return route.path === linkPath;
    })[0];
    var linkRouteName = linkRoute.name;
    var linkConfig = props.config.routes[linkRouteName];
    return /*#__PURE__*/react_default.a.createElement("li", {
      className: "cmp-breadcrumb__item",
      itemprop: "itemListElement",
      itemscope: "",
      itemtype: "http://schema.org/ListItem"
    }, /*#__PURE__*/react_default.a.createElement(es_Link["a" /* default */], {
      to: linkRoute.path,
      className: "cmp-breadcrumb__item-link",
      itemprop: "item"
    }, /*#__PURE__*/react_default.a.createElement("span", {
      itemprop: "name"
    }, linkConfig.title)));
  };

  var renderBreadcrumb = function renderBreadcrumb() {
    var parentLinks = currentPath.parentTrail.map(renderBreadcrumbLink);
    return parentLinks;
  };

  return react_dom_default.a.createPortal(isMobile ? renderBackToLink() : renderBreadcrumb(), breadcrumbList);
};

/* harmony default export */ var components_breadcrumb = (breadcrumb_Breadcrumb);
// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(39);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(12);

// EXTERNAL MODULE: ./src/utils/redirectFunctions.js
var redirectFunctions = __webpack_require__(17);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(93);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(13);

// CONCATENATED MODULE: ./src/my-account/aside.js













var aside_Aside = function Aside(props) {
  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      displayTile = _useState2[0],
      setDisplayTile = _useState2[1];

  var _useState3 = Object(react["useState"])(document.getElementById("header").hasAttribute("data-is-edit-mode")),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      isInEditMode = _useState4[0],
      setIsInEditMode = _useState4[1];

  var breadcrumbList = document.querySelector('.cmp-breadcrumb__list');
  Object(react["useEffect"])(function () {
    if (!loginStatus["a" /* default */].state()) {
      if (!isInEditMode) {
        Object(redirectFunctions["c" /* notLoggedInRedirect */])();
        return null;
      }
    }

    setDisplayTile(true);
  }, []);

  if (isInEditMode || displayTile) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account__aside-wrapper",
      "data-locator": "my-account-wrapper"
    }, /*#__PURE__*/react_default.a.createElement(typography_title["a" /* default */], {
      text: getTitle(props.tiles, props.location.pathname)
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account__aside-links",
      "data-locator": "my-account-links"
    }, props.tiles.map(function (tile) {
      return /*#__PURE__*/react_default.a.createElement(aside_Tile, {
        key: tile.title,
        tile: tile,
        requiresEcommerce: tile.requiresEcommerce,
        isHiddenForEprocUser: tile.isHiddenForEprocUser,
        pathname: props.location.pathname
      });
    })), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account__aside-content",
      "data-locator": "my-account-aside-content"
    }, props.children), breadcrumbList && /*#__PURE__*/react_default.a.createElement(components_breadcrumb, {
      path: props.location.pathname,
      config: props.breadcrumbs
    }));
  } else {
    return /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayTile
    });
  }
};

var aside_Tile = function Tile(_ref) {
  var tile = _ref.tile,
      pathname = _ref.pathname;

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["e" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["y" /* isEprocurementUserRole */])()) {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  }

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "tile",
    "data-locator": "my-account-tile"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "tile__title",
    "data-locator": "my-account-title-tile"
  }, tile.title), /*#__PURE__*/react_default.a.createElement("div", {
    className: "tile__links",
    "data-locator": "my-account-tile-links"
  }, tile.links.map(function (link) {
    if (!link.isHidden) {
      if (linkIsActive(pathname, link.url)) {
        return /*#__PURE__*/react_default.a.createElement(aside_ActiveLink, {
          key: link.text,
          text: link.text
        });
      } else {
        return /*#__PURE__*/react_default.a.createElement(aside_HyperLink, {
          key: link.text,
          link: link,
          linkName: link.linkName
        });
      }
    }
  })));
};

var getTitle = function getTitle(tiles, pathname) {
  var tile = tiles.filter(function (filterValue) {
    return filterValue.links.find(function (link) {
      return linkIsActive(pathname, link.url);
    });
  });
  var links = tile.length !== 0 ? tile[0].links : [];
  var link = links.find(function (link) {
    return linkIsActive(pathname, link.url);
  });
  return link ? link.text : "";
};

var linkIsActive = function linkIsActive(pathname, url) {
  return pathname.substring(1, pathname.length) === url.substring(1, url.length);
};

var aside_ActiveLink = function ActiveLink(_ref2) {
  var text = _ref2.text;
  return /*#__PURE__*/react_default.a.createElement("span", {
    className: "link--active",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(text)
  }, text);
};

var aside_HyperLink = function HyperLink(_ref3) {
  var link = _ref3.link;
  return link.url.startsWith("#") ? /*#__PURE__*/react_default.a.createElement(es_Link["a" /* default */], {
    to: "/".concat(link.url.substring(1, link.url.length)),
    onClick: function onClick() {
      return Object(analytics["f" /* setClickAnalytics */])("Side Navigation", link.linkName ? link.linkName : link.text, link.url);
    },
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(link.text)
  }, link.text) : /*#__PURE__*/react_default.a.createElement("a", {
    href: link.url,
    onClick: function onClick() {
      return Object(analytics["f" /* setClickAnalytics */])("Side Navigation", link.linkName ? link.linkName : link.text, link.url);
    },
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(link.text)
  }, link.text);
};

aside_Aside.defaultProps = {
  tiles: []
};
/* harmony default export */ var aside = (Object(withRouter["a" /* default */])(aside_Aside));
// CONCATENATED MODULE: ./src/link-tile/components/link.js




var link_Link = function Link(_ref) {
  var text = _ref.text,
      url = _ref.url,
      linkName = _ref.linkName,
      context = _ref.context;
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !!text && !!url && /*#__PURE__*/react_default.a.createElement("a", {
    className: "cmp-linktile--link",
    href: url,
    onClick: function onClick() {
      return Object(analytics["f" /* setClickAnalytics */])("Account Home", linkName ? linkName : text, url);
    },
    "data-locator": context ? "".concat(context, "-").concat(Object(eCommerceFunctions["a" /* elementLocator */])(linkName || text)) : Object(eCommerceFunctions["a" /* elementLocator */])(linkName || text)
  }, text));
};

/* harmony default export */ var components_link = (link_Link);
// CONCATENATED MODULE: ./src/link-tile/components/index.js

// CONCATENATED MODULE: ./src/link-tile/index.js





var link_tile_LinkTile = function LinkTile(_ref) {
  var title = _ref.title,
      icon = _ref.icon,
      links = _ref.links,
      tilesName = _ref.tilesName,
      datalocator = _ref.datalocator;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-linktile",
    "data-locator": "".concat(Object(eCommerceFunctions["a" /* elementLocator */])(tilesName || 'my-account-tile'), "-linktile")
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-linktile-column"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icon,
    className: "cmp-linktile--icon",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(title, " icon"))
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-linktile-column"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-linktile--title",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(title)
  }, title), links.map(function (link, key) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      key: key,
      className: "cmp-linktile--links"
    }, !link.isHidden && /*#__PURE__*/react_default.a.createElement(components_link, Object.assign({}, link, {
      context: datalocator
    })));
  })));
};

/* harmony default export */ var link_tile = (link_tile_LinkTile);
// CONCATENATED MODULE: ./src/my-account/myaccount.js










var myaccount_Tile = function Tile(_ref) {
  var tile = _ref.tile;

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["e" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["y" /* isEprocurementUserRole */])()) {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  }

  return /*#__PURE__*/react_default.a.createElement(link_tile, Object.assign({}, tile, {
    datalocator: "my-account"
  }));
};

var myaccount_MyAccount = function MyAccount(_ref2) {
  var title = _ref2.title,
      body = _ref2.body,
      tiles = _ref2.tiles;

  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      displayTile = _useState2[0],
      setDisplayTile = _useState2[1];

  var _useState3 = Object(react["useState"])(document.getElementById("header").hasAttribute("data-is-edit-mode")),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      isInEditMode = _useState4[0],
      setIsInEditMode = _useState4[1];

  Object(react["useEffect"])(function () {
    if (!loginStatus["a" /* default */].state()) {
      if (!isInEditMode) {
        Object(redirectFunctions["c" /* notLoggedInRedirect */])();
        return null;
      }
    }

    setDisplayTile(true);
  }, []);

  if (isInEditMode || displayTile) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account-wrapper"
    }, /*#__PURE__*/react_default.a.createElement(typography_title["a" /* default */], {
      text: title
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account__body"
    }, body), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-my-account__tiles"
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: "tile",
      "data-locator": "my-account-tiles"
    }, tiles.map(function (tile, key) {
      return /*#__PURE__*/react_default.a.createElement(myaccount_Tile, {
        tile: tile,
        key: key
      });
    }))));
  } else {
    return /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayTile
    });
  }
};

/* harmony default export */ var myaccount = (myaccount_MyAccount);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(15);

// EXTERNAL MODULE: ./src/detail-tiles/hooks/useProfile.js
var useProfile = __webpack_require__(91);

// EXTERNAL MODULE: ./src/detail-tiles/index.js + 1 modules
var detail_tiles = __webpack_require__(53);

// EXTERNAL MODULE: ./src/detail-tiles/utils/generateTiles.js
var generateTiles = __webpack_require__(104);

// CONCATENATED MODULE: ./src/my-profile/index.js







var my_profile_MyProfile = function MyProfile(_ref) {
  var configs = _ref.configs;

  var _useState = Object(react["useState"])(configs.userDetailsUrl),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      userDetailsUrl = _useState2[0],
      setUserDetailsUrl = _useState2[1];

  var _useState3 = Object(react["useState"])(configs.soldToDetailsUrl),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      soldToDetailsUrl = _useState4[0],
      setSoldToDetailsUrl = _useState4[1];

  var _useState5 = Object(react["useState"])(configs.submitEndpoint),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      submitEndpoint = _useState6[0],
      setSubmitEndpoint = _useState6[1];

  var setupConfig = function setupConfig(configId) {
    var abstractConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var config = Object(objectSpread["a" /* default */])({}, abstractConfig, {
      userDetailsUrl: userDetailsUrl,
      soldToDetailsUrl: soldToDetailsUrl,
      submitEndpoint: submitEndpoint
    });

    config = Object(objectSpread["a" /* default */])({}, config, JSON.parse(document.getElementById(configId).innerHTML));
    return config;
  };

  var renderDetailTiles = function renderDetailTiles() {
    var detailTiles = [];
    var personalConfig = setupConfig(configs.personalConfigId);
    var profileReturnData = Object(useProfile["a" /* default */])(userDetailsUrl, soldToDetailsUrl, personalConfig.type, personalConfig.icons ? personalConfig.icons.refresh : {});

    if (profileReturnData && profileReturnData.data && profileReturnData.tiles.length !== 0) {
      personalConfig.profileTiles = profileReturnData.tiles;
      personalConfig.profileData = profileReturnData.setData;
      personalConfig.data = profileReturnData.data;
      detailTiles.push(personalConfig);
      var abstractAddress = JSON.parse(document.getElementById(configs.addressConfig.abstractConfig).innerHTML);
      configs.addressConfig.configs.map(function (id) {
        var addressConfig = setupConfig(id, abstractAddress);
        addressConfig.profileTiles = Object(generateTiles["a" /* default */])(personalConfig.data, addressConfig.type, addressConfig.icons ? addressConfig.icons.refresh : {});
        addressConfig.profileData = profileReturnData.setData;
        addressConfig.data = profileReturnData.data;
        detailTiles.push(addressConfig);
      });
      return detailTiles.map(function (config, key) {
        return /*#__PURE__*/react_default.a.createElement(detail_tiles["a" /* default */], Object.assign({}, config, {
          key: key
        }));
      });
    }
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, renderDetailTiles());
};

/* harmony default export */ var my_profile = (my_profile_MyProfile);
// CONCATENATED MODULE: ./src/change-password/index.js




var change_password_ChangePassword = function ChangePassword(_ref) {
  var configId = _ref.configId,
      configs = _ref.configs;

  var _useState = Object(react["useState"])(),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      config = _useState2[0],
      setConfig = _useState2[1];

  var configContent = JSON.parse(document.getElementById(configId).innerHTML);
  configContent.userDetailsUrl = configs.userDetailsUrl;
  Object(react["useEffect"])(function () {
    setConfig(configContent);
  }, []);
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !!config && /*#__PURE__*/react_default.a.createElement(detail_tiles["a" /* default */], config));
};

/* harmony default export */ var change_password = (change_password_ChangePassword);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

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

// EXTERNAL MODULE: ./node_modules/react-paginate/dist/react-paginate.js
var react_paginate = __webpack_require__(488);
var react_paginate_default = /*#__PURE__*/__webpack_require__.n(react_paginate);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(40);

// EXTERNAL MODULE: ./src/utils/serviceFunctions.js
var serviceFunctions = __webpack_require__(28);

// CONCATENATED MODULE: ./src/history/history.services.js







var history_services_HistoryService = /*#__PURE__*/function () {
  function HistoryService(url) {
    Object(classCallCheck["a" /* default */])(this, HistoryService);

    this.url = url;
  }

  Object(createClass["a" /* default */])(HistoryService, [{
    key: "getQuoteHistory",
    value: function () {
      var _getQuoteHistory = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
        var options, response;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = {
                  method: 'GET',
                  credentials: 'include',
                  mode: 'cors'
                };
                _context.next = 3;
                return Object(serviceFunctions["a" /* fetchData */])(url, options);

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getQuoteHistory(_x) {
        return _getQuoteHistory.apply(this, arguments);
      }

      return getQuoteHistory;
    }()
  }, {
    key: "getOrderListPost",
    value: function getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
      var options = {};
      options.orderNumber = orderNumber;
      options.purchaseOrderNumber = poNumber;
      options.fromDate = fromDate;
      options.maxRecs = "";
      return Object(serviceFunctions["c" /* postDataRedirect */])(url, options, setError);
    }
  }]);

  return HistoryService;
}();

/* harmony default export */ var history_services = (history_services_HistoryService);
// EXTERNAL MODULE: ./src/constants/index.js
var constants = __webpack_require__(113);

// CONCATENATED MODULE: ./src/common/delivery-status/index.js





//for Order History and Order Details Shipments






var delivery_status_DeliveryStatus = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(DeliveryStatus, _Component);

  function DeliveryStatus(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, DeliveryStatus);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(DeliveryStatus).call(this, props));

    _this.renderTrackingLink = function () {
      var _this$props = _this.props,
          shipped = _this$props.shipped,
          labels = _this$props.labels;

      if (Object.keys(shipped).length && shipped.carrierUrl !== "") {
        return /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("a", {
          className: "tracking-link",
          href: shipped.carrierUrl,
          target: "_blank",
          title: labels.trackShipmentText,
          onClick: function onClick() {
            return Object(analytics["f" /* setClickAnalytics */])("Order Details", "Track Shipment", shipped.carrierUrl);
          },
          "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(labels.trackShipmentText)
        }, labels.trackShipmentText, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: "/content/dam/waters/en/brand-assets/icons/externallink.svg",
          className: "tracking-link__icon",
          "data-locator": "tracking-link-icon"
        })));
      }

      return null;
    };

    _this.configureStatusContent = function (status) {
      var _this$props2 = _this.props,
          labels = _this$props2.labels,
          icons = _this$props2.icons,
          shipped = _this$props2.shipped;
      var deliveryStatus = "";
      var icon = "";
      var iconClassName = "delivery-icon";
      var deliveryStatusClass = '';

      switch (status) {
        case constants["c" /* DELIVERY_STATUS */].PENDING:
          deliveryStatus = labels.pendingLabel;
          icon = icons.pendingIcon;
          break;

        case constants["c" /* DELIVERY_STATUS */].QUOTE_REPLACED:
          deliveryStatus = labels.quoteReplacedLabel;
          icon = icons.replacedIcon;
          break;

        case constants["c" /* DELIVERY_STATUS */].REJECTED:
          deliveryStatus = labels.rejectedLabel;
          icon = icons.rejectedIcon;
          iconClassName = "rejected-icon";
          break;

        case constants["c" /* DELIVERY_STATUS */].EXPIRED:
          deliveryStatus = labels.expiredLabel;
          icon = icons.expiredIcon;
          iconClassName = "delivery-icon-disabled";
          deliveryStatusClass = "disabled";
          break;

        case constants["c" /* DELIVERY_STATUS */].ORDER_PLACED:
          deliveryStatus = labels.orderPlacedLabel;
          icon = icons.orderPlacedIcon;
          iconClassName = "delivery-icon-complete";
          break;

        case constants["c" /* DELIVERY_STATUS */].OPEN:
          deliveryStatus = labels.openLabel;
          icon = icons.openIcon;
          break;

        case constants["c" /* DELIVERY_STATUS */].PARTIAL:
          deliveryStatus = labels.partialLabel;
          icon = icons.partialIcon;
          break;

        case constants["c" /* DELIVERY_STATUS */].COMPLETE:
          if (shipped.shippedDate && shipped.shippedDate !== "") {
            deliveryStatus = labels.completeShippedLabel + " " + shipped.shippedDate;
          } else {
            deliveryStatus = labels.completeLabel;
          }

          icon = icons.completeIcon;
          iconClassName = "delivery-icon-complete";
          break;

        default:
          deliveryStatus = labels.openLabel;
      }

      _this.setState({
        deliveryStatus: deliveryStatus,
        icon: icon,
        iconClassName: iconClassName,
        deliveryStatusClass: deliveryStatusClass
      });
    };

    _this.state = {
      deliveryStatus: "",
      icon: "",
      iconClassName: "",
      deliveryStatusClass: ""
    };
    return _this;
  }

  Object(createClass["a" /* default */])(DeliveryStatus, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.configureStatusContent(this.props.status);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.status !== this.props.status) {
        this.configureStatusContent(this.props.status);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "delivery-status ".concat(this.state.deliveryStatusClass),
        "data-locator": "delivery-status"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: this.state.iconClassName
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.state.icon
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "delivery-text",
        "data-locator": "delivery-text"
      }, this.state.deliveryStatus), this.renderTrackingLink()));
    }
  }]);

  return DeliveryStatus;
}(react["Component"]);

delivery_status_DeliveryStatus.defaultProps = {
  status: '',
  labels: {},
  icons: {},
  shipped: {}
};
/* harmony default export */ var delivery_status = (delivery_status_DeliveryStatus);
// EXTERNAL MODULE: ./src/utils/date-formatter/index.js
var date_formatter = __webpack_require__(489);

// EXTERNAL MODULE: ./src/utils/get-locale/index.js
var get_locale = __webpack_require__(490);

// CONCATENATED MODULE: ./src/history/components/order-list-item.js












var order_list_item_OrderListItem = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(OrderListItem, _Component);

  function OrderListItem(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, OrderListItem);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(OrderListItem).call(this, props));
    _this.userLocale = get_locale["a" /* default */].getLocale();
    return _this;
  }

  Object(createClass["a" /* default */])(OrderListItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__left"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__order-number"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        href: '#orderdetails?id=' + this.props.data.orderNumber,
        onClick: function onClick() {
          return Object(analytics["f" /* setClickAnalytics */])("Order History", "Order Details, " + _this2.props.data.orderNumber, '#orderdetails?id=' + _this2.props.data.orderNumber);
        },
        "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(this.props.numberText, " ").concat(this.props.data.orderNumber))
      }, this.props.numberText + " " + this.props.data.orderNumber)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__date",
        "data-locator": "order-list-date"
      }, date_formatter["a" /* default */].dateFormatter(this.props.data.date, this.userLocale))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__right",
        "data-locator": "order-list-right"
      }, /*#__PURE__*/react_default.a.createElement("hr", {
        className: "cmp-order-list_hr"
      }), /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: this.props.data.deliveryStatus,
        labels: this.props.shipment,
        icons: this.props.icons
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__total",
        "data-locator": "order-list-total"
      }, this.props.data.orderTotal));
      s;
    }
  }]);

  return OrderListItem;
}(react["Component"]);

/* harmony default export */ var order_list_item = (order_list_item_OrderListItem);
// CONCATENATED MODULE: ./src/common/count-header/index.js
//for Order History and Order Details Pagination; Search has a different format 


var count_header_CountHeader = function CountHeader(props) {
  var getResultsText = "";

  if (props.count > 0) {
    var endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
    var startResults = props.current * props.rows - props.rows + 1;

    getResultsText = function getResultsText() {
      return props.resultsText.replace(/[{]startResults[}]/, startResults.toLocaleString(undefined, {
        maximumFractionDigits: 0
      })).replace(/[{]endResults[}]/, endResults.toLocaleString(undefined, {
        maximumFractionDigits: 0
      })).replace(/[{]count[}]/, props.count.toLocaleString(undefined, {
        maximumFractionDigits: 0
      }));
    };
  } else {
    getResultsText = function getResultsText() {
      return props.noResultsText;
    };
  }

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-order-list__resultsCount-container"
  }, /*#__PURE__*/react_default.a.createElement("h2", {
    className: "cmp-order-list__resultsCount",
    "data-locator": "order-list-result-count"
  }, getResultsText()));
};

/* harmony default export */ var count_header = (count_header_CountHeader);
// EXTERNAL MODULE: ./src/utils/dropdown/index.js
var dropdown = __webpack_require__(495);

// CONCATENATED MODULE: ./src/history/components/time-period-dropdown.js



var getOptions = function getOptions(text) {
  return [{
    value: 1,
    label: text.last30days
  }, {
    value: 2,
    label: text.last6months
  }, {
    value: 3,
    label: text.last12months
  }, {
    value: 4,
    label: text.showall
  }];
};

var time_period_dropdown_TimePeriod = function TimePeriod(props) {
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-order-list-timeperiod",
    "data-locator": "cmp-order-list-timeperiod"
  }, /*#__PURE__*/react_default.a.createElement(dropdown["a" /* default */], {
    getOptions: getOptions,
    onChange: function onChange(e) {
      return props.onChange(e);
    },
    isSearchable: false,
    text: props.timePeriod,
    defaultValue: 1
  }));
};

/* harmony default export */ var time_period_dropdown = (time_period_dropdown_TimePeriod);
// CONCATENATED MODULE: ./src/history/components/filter-dropdown.js



var filter_dropdown_getOptions = function getOptions(text) {
  var options = [{
    value: 0,
    label: text.all
  }, {
    value: 1,
    label: text.open
  }];

  if (text.hasOwnProperty('closed')) {
    options.push({
      value: 2,
      label: text.closed
    });
  }

  return options;
};

var filter_dropdown_FilterDropdown = function FilterDropdown(props) {
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-order-list-dropdownfilters"
  }, /*#__PURE__*/react_default.a.createElement(dropdown["a" /* default */], {
    getOptions: filter_dropdown_getOptions,
    onChange: function onChange(e) {
      return props.onChange(e);
    },
    isSearchable: false,
    text: props.dropdownfilters,
    defaultValue: 1
  }));
};

/* harmony default export */ var filter_dropdown = (filter_dropdown_FilterDropdown);
// EXTERNAL MODULE: ./src/scripts/fade-x.js
var fade_x = __webpack_require__(75);

// CONCATENATED MODULE: ./src/navigation/tabs/index.js




var tabs_Tabs = function Tabs(_ref) {
  var className = _ref.className,
      items = _ref.items,
      activeIndex = _ref.activeIndex,
      onClick = _ref.onClick,
      enableFading = _ref.enableFading;
  var tabsRef = react_default.a.useRef();
  react_default.a.useEffect(function () {
    var tabFader;

    if (enableFading && items.length !== 0) {
      tabFader = Object(fade_x["a" /* default */])('cmp-tabs', 0, 100);
      tabsRef.current.addEventListener('scroll', tabFader);
    }

    return function () {
      tabsRef.current.removeEventListener('scroll', tabFader);
    };
  }, []);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-tabs-wrapper"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    ref: tabsRef,
    className: "cmp-tabs ".concat(className)
  }, items.map(function (item, index) {
    return /*#__PURE__*/react_default.a.createElement(tabs_Tab, {
      key: "CategoryTab-".concat(index),
      name: item.name,
      index: index,
      isActive: index === activeIndex,
      onClick: onClick
    });
  })));
};

tabs_Tabs.defaultProps = {
  className: "",
  items: [],
  activeIndex: -1,
  onClick: function onClick() {},
  enableFading: false
};

var tabs_Tab = function Tab(_ref2) {
  var index = _ref2.index,
      name = _ref2.name,
      isActive = _ref2.isActive,
      _onClick = _ref2.onClick;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-tabs__tab".concat(isActive ? " active" : ""),
    onClick: function onClick() {
      return _onClick(index);
    }
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: "cmp-tabs__tab-label",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name)
  }, name));
};

tabs_Tab.defaultProps = {
  name: "",
  index: -1,
  isActive: false,
  onClick: function onClick() {}
};
/* harmony default export */ var navigation_tabs = (tabs_Tabs);
// CONCATENATED MODULE: ./src/history/order-history/index.js



















var order_history_OrderHistory = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(OrderHistory, _Component);

  function OrderHistory(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, OrderHistory);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(OrderHistory).call(this, props));

    _this.setAnalytics = function (event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = {
        detail: detail,
        event: event
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */][_this.page.analytics.reference].name, model);
    };

    _this.setError = function (error) {
      _this.setAnalytics('error', {
        error: error
      });

      _this.setState({
        error: true
      });
    };

    _this.setNoResultsState = function () {
      _this.setState({
        listItems: null,
        pageCount: 0,
        listCount: 0,
        currentPage: 1,
        noResults: true,
        loading: false
      });
    };

    _this.setResultsState = function (filteredListItems) {
      _this.setState({
        listItems: filteredListItems,
        pageCount: Math.ceil(filteredListItems.length / _this.paginationDefaults.visibleRows),
        listCount: filteredListItems.length,
        currentPage: 1,
        noResults: false,
        loading: false
      });
    };

    _this.retrieveData = /*#__PURE__*/function () {
      var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(fromDate, poNumber, orderNumber, activeTabFilter) {
        var HistoryServiceObj, fetchEndPoint, orders, filteredListItems;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                HistoryServiceObj = new history_services();
                fetchEndPoint = _this.props.configs.fetchEndPoint;
                _context.next = 4;
                return HistoryServiceObj.getOrderListPost(fetchEndPoint, fromDate, poNumber, orderNumber, _this.setError);

              case 4:
                orders = _context.sent;

                if (orders && orders.length > 0) {
                  filteredListItems = orders;

                  if (activeTabFilter !== undefined && activeTabFilter !== "All" && activeTabFilter === "Open") {
                    filteredListItems = orders.filter(function (i) {
                      return i.deliveryStatus === "Open" || i.deliveryStatus === "Partial";
                    });

                    if (filteredListItems.length > 0) {
                      _this.setResultsState(filteredListItems);
                    } else {
                      _this.setNoResultsState();
                    }
                  } else {
                    _this.setResultsState(filteredListItems);
                  }
                } else {
                  _this.setNoResultsState();
                }

                !_this.state.error && _this.state.initialPageLoad && _this.setAnalytics('load');

                _this.setState({
                  initialPageLoad: false
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.renderTabs = function () {
      return /*#__PURE__*/react_default.a.createElement(navigation_tabs, {
        className: "cmp-search__categories-tabs",
        items: _this.props.configs.tabs,
        activeIndex: _this.state.activeIndex,
        onClick: function onClick(e) {
          return _this.handleCategorySelected(e);
        },
        enableFading: true
      });
    };

    _this.renderDropDowns = function () {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__dropdowns"
      }, /*#__PURE__*/react_default.a.createElement(filter_dropdown, {
        onChange: function onChange(e) {
          return _this.handleCategorySelected(e);
        },
        dropdownfilters: _this.props.configs.dropdownfilters
      }), /*#__PURE__*/react_default.a.createElement(time_period_dropdown, {
        onChange: function onChange(e) {
          return _this.timePeriodHandler(e);
        },
        timePeriod: _this.props.configs.timeperiod
      }));
    };

    _this.renderCountHeader = function () {
      return /*#__PURE__*/react_default.a.createElement(count_header, {
        rows: _this.paginationDefaults.visibleRows,
        count: _this.state.listCount,
        current: _this.state.currentPage,
        resultsText: _this.props.configs.resultsText,
        noResultsText: _this.props.configs.noResultsFoundTitle
      });
    };

    _this.renderPaginatedResults = function () {
      var rows = _this.paginationDefaults.visibleRows;
      var count = _this.state.listCount;
      var current = _this.state.currentPage;
      var endResults = count > current * rows ? current * rows : count;
      var startResults = current * rows - rows;

      var itemsToRender = _this.state.listItems.slice(startResults, endResults);

      return itemsToRender;
    };

    _this.paginationClickHandler = function (page) {
      _this.setState({
        currentPage: page.selected + 1
      });

      window.scroll(0, 0);
    };

    _this.renderNoResults = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__no-results"
      }, /*#__PURE__*/react_default.a.createElement("p", {
        "data-locator": "no-results"
      }, _this.props.configs.noResultsFoundText), /*#__PURE__*/react_default.a.createElement("p", null, /*#__PURE__*/react_default.a.createElement("a", {
        href: _this.props.configs.shopAllHref,
        "data-locator": "shop-all"
      }, _this.props.configs.shopAllTitle))));
    };

    var today = new Date();
    _this.state = {
      listItems: "",
      fromDate: new Date(today.setDate(today.getDate() - 30)),
      poNumber: "",
      orderNumber: "",
      activeTabFilter: "All",
      activeIndex: 0,
      activeTimePeriod: 1,
      errorObjHistory: {},
      loading: true,
      noResults: false,
      error: false,
      initialPageLoad: true
    };
    _this.page = {
      name: "Order History",
      type: "Orders",
      analytics: {
        reference: "orderHistory",
        timePeriod: "Order Period Selected",
        timePeriodOptions: ['Last 30 Days', 'Last 6 Months', 'Last 12 Months', 'Show All']
      }
    };
    _this.paginationDefaults = {
      visibleRows: 10,
      nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
      previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
      pageRangeDisplayed: 8,
      marginPagesDisplayed: 1
    };
    return _this;
  }

  Object(createClass["a" /* default */])(OrderHistory, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state = this.state,
          fromDate = _this$state.fromDate,
          poNumber = _this$state.poNumber,
          orderNumber = _this$state.orderNumber,
          activeTabFilter = _this$state.activeTabFilter;
      this.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
    }
  }, {
    key: "handleCategorySelected",
    value: function handleCategorySelected(e) {
      var _this2 = this;

      // 0 = All Orders, 1 = Open Orders
      var tabId;
      var activeTabFilter = "All";
      e.value || e.value === 0 ? tabId = e.value : tabId = e;

      if (tabId === 1) {
        activeTabFilter = "Open";
      }

      Object(analytics["f" /* setClickAnalytics */])(this.page.title, "".concat(this.page.title, " ").concat(activeTabFilter, " ").concat(this.page.type), '#');
      this.setState({
        activeTabFilter: activeTabFilter,
        activeIndex: tabId
      }, function () {
        var _this2$state = _this2.state,
            fromDate = _this2$state.fromDate,
            poNumber = _this2$state.poNumber,
            orderNumber = _this2$state.orderNumber,
            activeTabFilter = _this2$state.activeTabFilter;

        _this2.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
      });
    }
  }, {
    key: "timePeriodHandler",
    value: function timePeriodHandler(e) {
      var _this3 = this;

      var _this$page$analytics = this.page.analytics,
          timePeriod = _this$page$analytics.timePeriod,
          timePeriodOptions = _this$page$analytics.timePeriodOptions;
      var selectedTimeframe = e.value;
      var now = new Date();
      var timeValue = '';
      var days = 30;
      var sixMonths = 6;
      var twelveMonths = 12;
      var allTime = 15;
      Object(analytics["g" /* setSelectDropdownAnalytics */])(timePeriod, "".concat(this.page.title, " ").concat(timePeriodOptions[selectedTimeframe]));

      switch (selectedTimeframe) {
        case 1:
          timeValue = new Date(now.setDate(now.getDate() - days));
          break;

        case 2:
          timeValue = new Date(now.setMonth(now.getMonth() - sixMonths));
          break;

        case 3:
          timeValue = new Date(now.setMonth(now.getMonth() - twelveMonths));
          break;

        case 4:
          timeValue = new Date(now.setMonth(now.getMonth() - allTime));
          break;

        default:
      }

      this.setState({
        fromDate: timeValue.toISOString(),
        activeTimePeriod: selectedTimeframe
      }, function () {
        var _this3$state = _this3.state,
            fromDate = _this3$state.fromDate,
            poNumber = _this3$state.poNumber,
            orderNumber = _this3$state.orderNumber,
            activeTabFilter = _this3$state.activeTabFilter;

        _this3.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
      });
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this4 = this;

      if (this.state.listCount > this.paginationDefaults.visibleRows) {
        var previousIcon = /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.previousIcon
        });
        var nextIcon = /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.nextIcon
        });
        return /*#__PURE__*/react_default.a.createElement(react_paginate_default.a, {
          pageCount: this.state.pageCount,
          forcePage: this.state.currentPage - 1,
          pageRangeDisplayed: this.paginationDefaults.pageRangeDisplayed,
          marginPagesDisplayed: this.paginationDefaults.marginPagesDisplayed,
          containerClassName: "paginate__container",
          onPageChange: function onPageChange(page) {
            return _this4.paginationClickHandler(page);
          },
          breakLabel: '…',
          previousLabel: previousIcon,
          nextLabel: nextIcon,
          initialPage: this.state.currentPage - 1,
          disableInitialCallback: true,
          hrefBuilder: this.buildHref
        });
      } else {
        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.state.loading ? /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
        loading: this.state.loading
      }) : null, !this.state.loading && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.renderTabs(), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__header clearfix",
        "data-locator": "order-list-header-clearfix"
      }, this.renderDropDowns(), this.renderCountHeader()), this.state.noResults && this.renderNoResults(), this.state.listCount > 0 && this.renderPaginatedResults().map(function (item, index) {
        return /*#__PURE__*/react_default.a.createElement(order_list_item, {
          data: item,
          numberText: _this5.props.configs.numberText,
          itemsText: _this5.props.configs.itemsText,
          shipment: _this5.props.configs.shipment,
          icons: _this5.props.configs.icons
        });
      }), this.state.listCount > 0 && this.renderPagination()));
    }
  }]);

  return OrderHistory;
}(react["Component"]);

/* harmony default export */ var order_history = (order_history_OrderHistory);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(144);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(116);

// CONCATENATED MODULE: ./src/details/details.services.js





var getData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(fetch["a" /* fetch */])(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response;

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getData(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getOrderDetails = /*#__PURE__*/function () {
  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(endpoint, id, setError) {
    var url, response, responseBody;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = endpoint + "/" + id;
            _context2.next = 3;
            return getData(url);

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            responseBody = _context2.sent;

            if (!(response.status === 200)) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", responseBody);

          case 11:
            setError({
              status: response.status,
              code: responseBody.code
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOrderDetails(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getQuoteDetails = /*#__PURE__*/function () {
  var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(endpoint, setError) {
    var response, responseBody;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getData(endpoint);

          case 2:
            response = _context3.sent;
            _context3.next = 5;
            return response.json();

          case 5:
            responseBody = _context3.sent;

            if (!(response.status === 200)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", responseBody);

          case 10:
            setError({
              status: response.status,
              code: responseBody.code
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getQuoteDetails(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var details_services_buildSearchURL = function buildSearchURL(endpoint, lineItems, isocode) {
  var skus, rows, keywords, url;
  skus = lineItems.map(function (lineItem) {
    return lineItem.materialNumber;
  });
  rows = skus.length;
  keywords = skus.join(' ');
  return url = "".concat(endpoint, "/category_facet$shop:Shop?keyword=").concat(keywords, "&rows=").concat(rows, "&isocode=").concat(isocode, "&multiselect=true&page=1&sort=most-relevant").concat(Object(userFunctions["h" /* getCategoryReferenceType */])());
};

var getItemDetails = /*#__PURE__*/function () {
  var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(endpoint, lineItems, setError, isocode) {
    var url, response, responseBody;
    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = details_services_buildSearchURL(endpoint, lineItems, isocode);
            _context4.next = 3;
            return getData(url);

          case 3:
            response = _context4.sent;
            _context4.next = 6;
            return response.json();

          case 6:
            responseBody = _context4.sent;

            if (!(response.status === 200)) {
              _context4.next = 11;
              break;
            }

            return _context4.abrupt("return", responseBody);

          case 11:
            setError({
              status: response.status,
              code: responseBody.code
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getItemDetails(_x7, _x8, _x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}();
var matchLineItems = function matchLineItems(orderDetailsAPIResults, searchAPIResults) {
  orderDetailsAPIResults.lineItems.forEach(function (soldItem) {
    for (var i = 0; i < searchAPIResults.length; i++) {
      if (soldItem.materialNumber === searchAPIResults[i].skucode) {
        soldItem.url = searchAPIResults[i].url;
        soldItem.title = searchAPIResults[i].title;
        soldItem.description = searchAPIResults[i].description;
        soldItem.thumbnail = searchAPIResults[i].thumbnail;
      }
    }
  });
  return orderDetailsAPIResults;
};
// CONCATENATED MODULE: ./src/details/components/details-list-item.js







var details_list_item_DetailsListItem = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(DetailsListItem, _React$Component);

  function DetailsListItem(props) {
    Object(classCallCheck["a" /* default */])(this, DetailsListItem);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(DetailsListItem).call(this, props));
  }

  Object(createClass["a" /* default */])(DetailsListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          relatedSku = _this$props.relatedSku,
          skuConfig = _this$props.skuConfig;

      if (!relatedSku.title || relatedSku.title === "") {
        relatedSku.title = relatedSku.materialDecription;
      }

      if (!relatedSku.thumbnail || relatedSku.thumbnail === "") {
        relatedSku.thumbnail = skuConfig.skuInfo.noThumbnailImage;
      }

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__right"
      }, /*#__PURE__*/react_default.a.createElement("img", {
        src: relatedSku.thumbnail,
        alt: relatedSku.title,
        "data-locator": "product-image"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__left"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__code",
        "data-locator": "product-number"
      }, skuConfig.skuInfo.partNumberLabel + " " + relatedSku.materialNumber), relatedSku.url && /*#__PURE__*/react_default.a.createElement("a", {
        href: relatedSku.url
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title)), !relatedSku.url && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__priceinfo"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku__price",
        "data-locator": "sku-price"
      }, relatedSku.unitPrice)), /*#__PURE__*/react_default.a.createElement("div", {
        "class": "cmp-sku-details__quantitytext",
        "data-locator": "sku-qty"
      }, skuConfig.qtyLabel, ": ", relatedSku.orderedQuantity))));
    }
  }]);

  return DetailsListItem;
}(react_default.a.Component);

details_list_item_DetailsListItem.defaultProps = {
  key: 1,
  relatedSku: {},
  skuConfig: {}
};
/* harmony default export */ var details_list_item = (details_list_item_DetailsListItem);
// CONCATENATED MODULE: ./src/details/components/shipment.js













var shipment_Shipment = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(Shipment, _Component);

  function Shipment(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Shipment);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Shipment).call(this, props));

    _this.ifShipped = function () {
      var deliveryStatus = constants["c" /* DELIVERY_STATUS */].OPEN;
      var shippedDate = _this.props.data[0].shippedDate;

      if (shippedDate !== "" && shippedDate !== "0000-00-00") {
        deliveryStatus = constants["c" /* DELIVERY_STATUS */].COMPLETE;
      }

      return deliveryStatus;
    };

    _this.orderShipped = function () {
      var _this$props$data$ = _this.props.data[0],
          shippedDate = _this$props$data$.shippedDate,
          carrierUrl = _this$props$data$.carrierUrl,
          carrier = _this$props$data$.carrier;

      if (shippedDate !== "" && shippedDate !== "0000-00-00") {
        var shipped, formattedShippedDate;
        formattedShippedDate = date_formatter["a" /* default */].monthDayFormatter(shippedDate, _this.userLocale);
        return shipped = {
          shippedDate: formattedShippedDate,
          carrierUrl: carrierUrl,
          carrier: carrier
        };
      } else {
        return {};
      }
    };

    _this.renderItemCount = function (totalItemsOrdered, shipment) {
      var label = "";

      if (totalItemsOrdered) {
        if (parseInt(totalItemsOrdered) > 1) {
          label = shipment.itemsText;
        } else if (parseInt(totalItemsOrdered) === 1) {
          label = shipment.itemText;
        }

        var itemCountLabel = totalItemsOrdered + " " + label;
        return itemCountLabel;
      } else {
        return label;
      }
    };

    _this.addToCartReorder = function () {
      _this.props.addToCartReorder();

      return false;
    };

    _this.getDetailsItemData = function () {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props$isQuoteDe = _this.props.isQuoteDetails,
          isQuoteDetails = _this$props$isQuoteDe === void 0 ? false : _this$props$isQuoteDe;
      var item = data;

      if (isQuoteDetails && data) {
        var _data$product = data.product,
            product = _data$product === void 0 ? {} : _data$product,
            _data$basePrice = data.basePrice,
            basePrice = _data$basePrice === void 0 ? {} : _data$basePrice,
            quantity = data.quantity;
        var code = product.code,
            name = product.name,
            sKUPageUrl = product.sKUPageUrl,
            imageUrl = product.imageUrl;
        var formattedValue = basePrice.formattedValue;
        item = {
          materialNumber: code,
          title: name,
          materialDecription: name,
          url: sKUPageUrl,
          thumbnail: imageUrl,
          unitPrice: formattedValue,
          orderedQuantity: quantity
        };
      }

      return item;
    };

    _this.userLocale = get_locale["a" /* default */].getLocale();
    _this.skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
    return _this;
  }

  Object(createClass["a" /* default */])(Shipment, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          shipmentNumber = _this$props.shipmentNumber,
          totalShipments = _this$props.totalShipments,
          shipment = _this$props.shipment,
          icons = _this$props.icons,
          totalItems = _this$props.totalItems,
          totalItemsOrdered = _this$props.totalItemsOrdered,
          resultsText = _this$props.resultsText,
          noResultsFoundTitle = _this$props.noResultsFoundTitle,
          _this$props$isQuoteDe2 = _this$props.isQuoteDetails,
          isQuoteDetails = _this$props$isQuoteDe2 === void 0 ? false : _this$props$isQuoteDe2;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment"
      }, isQuoteDetails && /*#__PURE__*/react_default.a.createElement("div", {
        className: "showing-item-counter",
        "data-locator": "quote-showing-item-count-header"
      }, /*#__PURE__*/react_default.a.createElement(count_header, {
        rows: totalItems,
        count: totalItems,
        current: 1,
        resultsText: resultsText,
        noResultsText: noResultsFoundTitle
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__left"
      }, totalShipments > 1 && !isQuoteDetails && /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__shipment-count"
      }, shipment.shipmentText + " " + shipmentNumber), /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__item-count"
      }, this.renderItemCount(totalItemsOrdered, shipment))), !isQuoteDetails && /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__right"
      }, /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: this.ifShipped(),
        labels: shipment,
        icons: icons,
        shipped: this.orderShipped()
      }))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "details-item-tiles-section",
        "data-locator": "details-item-section"
      }, this.props.data.map(function (record, index) {
        return /*#__PURE__*/react_default.a.createElement(details_list_item, {
          key: index,
          relatedSku: _this2.getDetailsItemData(record),
          skuConfig: _this2.skuConfig
        });
      })));
    }
  }]);

  return Shipment;
}(react["Component"]);

shipment_Shipment.defaultProps = {
  data: [],
  shipment: {},
  icons: {},
  shipmentNumber: 1,
  totalShipments: 1,
  isQuoteDetails: false
};
/* harmony default export */ var components_shipment = (shipment_Shipment);
// EXTERNAL MODULE: ./src/utils/get-isocode/index.js
var get_isocode = __webpack_require__(502);

// EXTERNAL MODULE: ./src/utils/group-by/index.js
var group_by = __webpack_require__(503);

// EXTERNAL MODULE: ./src/search/ErrorBoundary.js
var ErrorBoundary = __webpack_require__(52);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(14);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(55);

// EXTERNAL MODULE: ./src/sku-details/services/index.js
var services = __webpack_require__(513);

// EXTERNAL MODULE: ./src/stores/localStore.js
var stores_localStore = __webpack_require__(114);

// CONCATENATED MODULE: ./src/details/order-details/index.js




























var order_details_OrderDetails = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(OrderDetails, _Component);

  function OrderDetails(_ref) {
    var _this;

    var setErrorBoundaryToTrue = _ref.setErrorBoundaryToTrue,
        resetErrorBoundaryToFalse = _ref.resetErrorBoundaryToFalse,
        removeNotifications = _ref.removeNotifications,
        props = Object(objectWithoutProperties["a" /* default */])(_ref, ["setErrorBoundaryToTrue", "resetErrorBoundaryToFalse", "removeNotifications"]);

    Object(classCallCheck["a" /* default */])(this, OrderDetails);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(OrderDetails).call(this, Object(objectSpread["a" /* default */])({
      setErrorBoundaryToTrue: setErrorBoundaryToTrue,
      resetErrorBoundaryToFalse: resetErrorBoundaryToFalse,
      removeNotifications: removeNotifications
    }, props)));
    _this.rootStyle = "cmp-order-details";

    _this.setAnalytics = function (event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = {
        detail: detail,
        event: event
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */]['orderDetails'].name, model);
    };

    _this.toggleModal = function () {
      _this.setState({
        modalShown: !_this.state.modalShown
      });
    };

    _this.getUrlParameter = function (name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(window.location.hash);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    _this.setError = function (response) {
      _this.setAnalytics('error', {
        error: Object(objectSpread["a" /* default */])({}, response)
      });

      if (response.status === 400 && response.code === 704) {
        _this.setState({
          orderNotFoundError: true
        });
      } else {
        _this.props.setErrorBoundaryToTrue({
          code: 400
        });

        _this.setState({
          errorServiceError: true
        });
      }
    };

    _this.getShipmentList = function (airbills, orderDetails) {
      var shipments = [];

      for (var i = 0; i < Object.keys(airbills).length; i++) {
        var values = Object.values(airbills)[i];
        shipments.push( /*#__PURE__*/react_default.a.createElement(components_shipment, {
          data: values,
          shipment: _this.props.config.shipment,
          icons: _this.props.config.icons,
          shipmentNumber: i + 1,
          totalShipments: Object.keys(airbills).length,
          addToCartReorder: _this.addToCartReorder,
          totalItemsOrdered: orderDetails.totalItemsOrdered
        }));
      }

      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("hr", {
        className: "order-shipment-list__hr"
      }), Object.keys(airbills).length > 0 && shipments);
    };

    _this.addReorderAnalytics = function (response) {
      var localStore = new stores_localStore["a" /* default */]();
      var cartId = loginStatus["a" /* default */].state() ? localStore.getCartId() : localStore.getGUID();
      var cartModifications = response.cartModifications;
      var items = {};

      if (cartModifications) {
        items = cartModifications.map(function (item) {
          return {
            "sku": item.entry.product.code,
            "qty": item.quantityAdded
          };
        });
      }

      var reOrderModel = {
        detail: {
          cartId: cartId,
          "addContext": analytics["a" /* analyticTypes */]["reOrder"].context,
          items: items
        }
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */]["reOrder"].name, reOrderModel);
    };

    _this.addToCartReorder = function (e) {
      e.preventDefault();
      var _this$state = _this.state,
          isCommerceApiMigrated = _this$state.isCommerceApiMigrated,
          addToCartUrl = _this$state.addToCartUrl,
          reorderData = _this$state.reorderData;
      Object(services["a" /* addToCart */])(isCommerceApiMigrated, addToCartUrl, reorderData, null, _this.setError).then(function (response) {
        // Redirect if at least one item was successfully added to the cart
        if (response && response.cartModifications && response.cartModifications.length) {
          _this.addReorderAnalytics(response);

          window.location.href = _this.state.viewCartUrl;
        } else {
          _this.toggleModal();

          response && response.errors && _this.setState({
            errorCartErrors: response.errors
          });

          _this.setError(response);

          _this.setState({
            errorServiceError: false
          });
        } //this.addToCartAnalytics(response);

      })["catch"](function (err) {
        _this.toggleModal();

        _this.setState({
          errorServiceError: false
        });
      });
    };

    _this.config = document.getElementById('json-config--cmp-detail-tiles--personal') ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    _this.renderAddress = function (addressType) {
      var orderDetails = _this.state.orderDetails;

      if (orderDetails.account) {
        var account = orderDetails.account.filter(function (item) {
          return item.partnerType === addressType;
        })[0];

        if (account) {
          var includeCountryName = true;
          var addressArray = Object(userFunctions["s" /* getOrderDetailsAddress */])(account, includeCountryName);
          return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, addressArray.map(function (addressLine) {
            return /*#__PURE__*/react_default.a.createElement("div", {
              className: "".concat(_this.rootStyle, "-address1"),
              "data-locator": "order-details-address"
            }, addressLine);
          }));
        }
      }

      return null;
    };

    _this.renderItemCount = function () {
      var orderDetails = _this.state.orderDetails;
      var config = _this.props.config;
      var label = "";

      if (orderDetails && orderDetails.totalItemsOrdered) {
        if (parseInt(orderDetails.totalItemsOrdered) > 1) {
          label = config.items;
        } else if (parseInt(orderDetails.totalItemsOrdered) === 1) {
          label = config.item;
        }

        var itemCountLabel = " (" + orderDetails.totalItemsOrdered + " " + label + ")";
        return itemCountLabel;
      } else {
        return label;
      }
    };

    _this.renderReorderButton = function () {
      return /*#__PURE__*/react_default.a.createElement("a", {
        className: "cmp-button",
        onClick: function onClick() {
          return _this.toggleModal();
        }
      }, _this.props.config.reorderTitle);
    };

    _this.renderDetailsSection = function () {
      var _this$state2 = _this.state,
          orderDetails = _this$state2.orderDetails,
          userLocale = _this$state2.userLocale;
      var config = _this.props.config;
      var notZeroDiscountFlag = parseFloat(orderDetails.orderDiscountValue) !== 0 ? true : false;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__container")
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: "".concat(_this.rootStyle, "__title"),
        "data-locator": "product-title"
      }, config.orderDetails), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-info")
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: "".concat(_this.rootStyle, "__order-number"),
        "data-locator": "product-number"
      }, config.numberLabel + ": " + orderDetails.orderNumber), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-date"),
        "data-locator": "order-date"
      }, date_formatter["a" /* default */].dateFormatter(orderDetails.date, userLocale)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__address-container")
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__ship-to"),
        "data-locator": "ship-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, config.shipTo), _this.renderAddress("shipping")), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__bill-to"),
        "data-locator": "bill-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, config.billTo), _this.renderAddress("billing"))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-container")
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-method"),
        "data-locator": "payment-method"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, config.paymentMethod), orderDetails.ccNum && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.creditCard.icon
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.creditCard.label)), !orderDetails.ccNum && orderDetails.purchaseOrderNumber && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.purchaseOrder.icon
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.purchaseOrder.label, ": ", orderDetails.purchaseOrderNumber))))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-summary",
        "data-locator": "order-summary"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, config.summaryTitle), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_left",
        "data-locator": "order-summary-label-sub-total"
      }, config.subTotal, " ", _this.renderItemCount()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_right",
        "data-locator": "order-summary-price-sub-total"
      }, orderDetails.itemsSubTotal)), notZeroDiscountFlag && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_left",
        "data-locator": "order-summary-label-total-discount"
      }, config.savings), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_right",
        "data-locator": "order-summary-price-total-discount"
      }, _this.props.config.minusSign, orderDetails.orderDiscount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_left",
        "data-locator": "order-summary-label-total-shipping-handling"
      }, config.shipping), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_right",
        "data-locator": "order-summary-price-total-shipping-handling"
      }, orderDetails.shippingAmount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_left",
        "data-locator": "order-summary-label-estimated-tax"
      }, config.tax), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_right",
        "data-locator": "order-summary-price-estimated-tax"
      }, orderDetails.taxAmount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_left",
        "data-locator": "order-summary-label-total-price"
      }, config.totalLabel), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_right",
        "data-locator": "order-summary-price-total-price"
      }, /*#__PURE__*/react_default.a.createElement("h1", null, orderDetails.orderTotal))), _this.state.isCommerceApiMigrated && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__reorder"),
        "data-locator": "order-details-reorder"
      }, _this.renderReorderButton()))));
    };

    _this.renderNotFoundError = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__no-results"),
        "data-locator": "order-details-no-results"
      }, /*#__PURE__*/react_default.a.createElement("p", null, _this.props.config.resultNotFoundErrorTitle)));
    };

    _this.renderOrderShipmentList = function () {
      var _this$state3 = _this.state,
          airbills = _this$state3.airbills,
          orderDetails = _this$state3.orderDetails;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipment-list"),
        "data-locator": "order-shipment-list"
      }, Object.keys(airbills).length > 0 && _this.getShipmentList(airbills, orderDetails)), _this.state.isCommerceApiMigrated && /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment__reorder",
        "data-locator": "order-shipment-reorder"
      }, _this.renderReorderButton()));
    };

    _this.state = {
      orderId: _this.getUrlParameter("id"),
      userLocale: get_locale["a" /* default */].getLocale(),
      userIsocode: get_isocode["a" /* default */].getIsocode(),
      detailsUrl: props.config.fetchDetailsEndPoint,
      itemsUrl: props.config.fetchItemsEndPoint,
      reorderUrl: props.config.fetchReorderUrlEndPoint,
      orderDetails: {},
      reorderData: [],
      airbills: {},
      skusSoldCount: 0,
      errorServiceError: false,
      errorOrderNotFound: false,
      isLoading: true,
      modalShown: false,
      modalConfig: props.config.modalInfo,
      isCommerceApiMigrated: false,
      addToCartUrl: '',
      viewCartUrl: '',
      errorCartErrors: []
    };
    return _this;
  }

  Object(createClass["a" /* default */])(OrderDetails, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var _this2 = this;

        var commerceConfig, buttons, updatedModalConfig, _this$state4, detailsUrl, itemsUrl, orderId, userIsocode;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commerceConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);

                if (commerceConfig) {
                  this.setState({
                    isCommerceApiMigrated: JSON.parse(commerceConfig.isCommerceApiMigrated.toLowerCase()),
                    addToCartUrl: commerceConfig.addToCartUrl,
                    viewCartUrl: commerceConfig.viewCartUrl
                  });

                  if (commerceConfig.isCommerceApiMigrated.toLowerCase() === 'true') {
                    // Update modal config button with a callback and new cart url
                    buttons = Object(toConsumableArray["a" /* default */])(this.state.modalConfig.buttons);
                    buttons[0] = Object(objectSpread["a" /* default */])({}, buttons[0], {
                      action: commerceConfig.viewCartUrl,
                      callback: this.addToCartReorder
                    });
                    updatedModalConfig = Object(objectSpread["a" /* default */])({}, this.state.modalConfig, {
                      buttons: buttons
                    });
                    this.setState({
                      modalConfig: updatedModalConfig
                    });
                  }
                }

                _this$state4 = this.state, detailsUrl = _this$state4.detailsUrl, itemsUrl = _this$state4.itemsUrl, orderId = _this$state4.orderId, userIsocode = _this$state4.userIsocode;
                getOrderDetails(detailsUrl, orderId, this.setError).then(function (data) {
                  if (data && data.account && data.account.length) {
                    // Add Country Names to data
                    data.account.map(function (account) {
                      var countryName = Object(userFunctions["j" /* getCountryName */])(account.country, _this2.config);
                      account.countryName = countryName;
                      account.state = account.region;
                    });

                    _this2.setState({
                      isLoading: false,
                      orderDetails: data
                    });

                    var reorderData = data.lineItems.map(function (item) {
                      return {
                        code: item.materialNumber,
                        quantity: item.orderedQuantity
                      };
                    });

                    _this2.setState({
                      reorderData: Object(toConsumableArray["a" /* default */])(reorderData)
                    });

                    getItemDetails(itemsUrl, data.lineItems, _this2.setError, userIsocode).then(function (itemData) {
                      if (itemData && itemData.documents && itemData.documents.length) {
                        var mergedAPIs = matchLineItems(data, itemData.documents);

                        _this2.setState({
                          airbills: group_by["a" /* default */].groupBy(mergedAPIs.lineItems, 'airbill')
                        });
                      } else {
                        _this2.setState({
                          airbills: group_by["a" /* default */].groupBy(data.lineItems, 'airbill')
                        });
                      }

                      _this2.setAnalytics('load');
                    });
                  } else {
                    _this2.setState({
                      errorOrderNotFound: true,
                      isLoading: false
                    });
                  }
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.resetErrorBoundaryToFalse();
      this.props.removeNotifications();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state5 = this.state,
          isLoading = _this$state5.isLoading,
          errorOrderNotFound = _this$state5.errorOrderNotFound,
          errorServiceError = _this$state5.errorServiceError;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isLoading && /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
        loading: isLoading
      }), !isLoading && errorOrderNotFound && this.renderNotFoundError(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList(), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.modalShown,
        onClose: this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.modalConfig.title,
        icon: this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), /*#__PURE__*/react_default.a.createElement(addToCartModal["default"], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return OrderDetails;
}(react["Component"]);

var order_details_ErrorBoundaryOrderDetails = function ErrorBoundaryOrderDetails(props) {
  return /*#__PURE__*/react_default.a.createElement(ErrorBoundary["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(order_details_OrderDetails, props));
};


/* harmony default export */ var order_details = (order_details_ErrorBoundaryOrderDetails);
// CONCATENATED MODULE: ./src/history/components/quote-list-item.js











var quote_list_item_QuoteListItem = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(QuoteListItem, _Component);

  function QuoteListItem(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, QuoteListItem);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(QuoteListItem).call(this, props));

    _this.quoteAgain = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          setAnalytics = _this$props.setAnalytics,
          data = _this$props.data;
      var quoteId = data.quoteId;

      if (quoteId) {
        var quoteAgainModel = {
          detail: {
            quoteId: quoteId
          }
        };
        setAnalytics('quoteAgainClick', quoteAgainModel);
      }
    };

    _this.renderQuoteAgainButton = function () {
      return /*#__PURE__*/react_default.a.createElement("a", {
        className: "cmp-button",
        href: "/#",
        onClick: function onClick(e) {
          return _this.quoteAgain(e);
        }
      }, _this.props.quoteAgainTitle);
    };

    return _this;
  }

  Object(createClass["a" /* default */])(QuoteListItem, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          _this$props2$data = _this$props2.data,
          data = _this$props2$data === void 0 ? {} : _this$props2$data,
          numberText = _this$props2.numberText,
          created = _this$props2.created,
          expires = _this$props2.expires,
          shipment = _this$props2.shipment,
          icons = _this$props2.icons,
          orderNumberText = _this$props2.orderNumberText,
          isShowQuoteAgainButton = _this$props2.isShowQuoteAgainButton,
          newQuote = _this$props2.newQuote;
      var quoteId = data.quoteId,
          orderNumber = data.orderNumber,
          quoteCreationDate = data.quoteCreationDate,
          quoteExpirationDate = data.quoteExpirationDate,
          totalPriceFormatted = data.totalPriceFormatted,
          quoteStatus = data.quoteStatus,
          replacedQuoteNumber = data.replacedQuoteNumber;
      var showExpireDate = !!(quoteStatus === constants["c" /* DELIVERY_STATUS */].PENDING || quoteStatus === constants["c" /* DELIVERY_STATUS */].REJECTED || quoteStatus === constants["c" /* DELIVERY_STATUS */].OPEN);
      var showOrderNumber = !!(quoteStatus === constants["c" /* DELIVERY_STATUS */].ORDER_PLACED);
      var showQuoteAgainBtn = !!(quoteStatus === constants["c" /* DELIVERY_STATUS */].EXPIRED);
      var showQuoteReplacedNumber = !!(quoteStatus === constants["c" /* DELIVERY_STATUS */].QUOTE_REPLACED);
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__left"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__order-number"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        href: '#quotedetails?id=' + quoteId,
        onClick: function onClick() {
          return Object(analytics["f" /* setClickAnalytics */])("Quote History", "Quote Details, " + quoteId, '#quotedetails?id=' + quoteId);
        },
        "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(numberText, " ").concat(quoteId))
      }, numberText + " " + quoteId)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-quote-data-section"
      }, quoteCreationDate && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__date",
        "data-locator": "quote-history-tiles-created-date"
      }, "".concat(created, " ").concat(quoteCreationDate)), showExpireDate && quoteExpirationDate && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__date",
        "data-locator": "quote-history-tiles-expires-date"
      }, "".concat(expires, " ").concat(quoteExpirationDate)), showOrderNumber && orderNumber && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__order-number-text",
        "data-locator": "quote-order-number"
      }, "".concat(orderNumberText, " ").concat(orderNumber)), showQuoteReplacedNumber && replacedQuoteNumber && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__order-number-text",
        "data-locator": "quote-order-number"
      }, "".concat(newQuote, " ").concat(replacedQuoteNumber)))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__right",
        "data-locator": "order-list-right"
      }, /*#__PURE__*/react_default.a.createElement("hr", {
        className: "cmp-order-list_hr"
      }), quoteStatus && /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: quoteStatus,
        labels: shipment,
        icons: icons
      })), totalPriceFormatted && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__total cmp-order-list__left",
        "data-locator": "order-list-total"
      }, totalPriceFormatted), showQuoteAgainBtn && isShowQuoteAgainButton && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__right quote-again-section",
        "data-locator": "quote-history-quote-again"
      }, this.renderQuoteAgainButton()));
    }
  }]);

  return QuoteListItem;
}(react["Component"]);

/* harmony default export */ var quote_list_item = (quote_list_item_QuoteListItem);
// CONCATENATED MODULE: ./src/history/quote-history/index.js




















var quote_history_QuoteHistory = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(QuoteHistory, _Component);

  function QuoteHistory(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, QuoteHistory);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(QuoteHistory).call(this, props));

    _this.setAnalytics = function (event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = {
        detail: detail,
        event: event
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */][_this.page.analytics.reference].name, model);
    };

    _this.setError = function (error) {
      _this.setAnalytics('error', {
        error: error
      });

      _this.setState({
        error: true
      });
    };

    _this.setNoResultsState = function () {
      _this.setState({
        listItems: null,
        pageCount: 0,
        listCount: 0,
        currentPage: 0,
        noResults: true,
        loading: false
      });
    };

    _this.setResultsState = function (quoteData) {
      var _ref = quoteData || {},
          _ref$totalNumberOfRes = _ref.totalNumberOfResults,
          totalNumberOfResults = _ref$totalNumberOfRes === void 0 ? 0 : _ref$totalNumberOfRes,
          _ref$quotes = _ref.quotes,
          quotes = _ref$quotes === void 0 ? [] : _ref$quotes,
          numberOfPages = _ref.numberOfPages,
          currentPage = _ref.currentPage;

      _this.setState({
        listItems: quotes,
        pageCount: numberOfPages,
        listCount: totalNumberOfResults,
        currentPage: currentPage,
        noResults: false,
        loading: false
      });
    };

    _this.getQueryParam = function (fetchEndPoint, noOfMonths, activeTabFilter) {
      var url = fetchEndPoint;
      var _this$state = _this.state,
          currentPage = _this$state.currentPage,
          pageSize = _this$state.pageSize;
      var userId = Object(userFunctions["w" /* getUserId */])();
      var soldToId = Object(userFunctions["t" /* getSoldToId */])() || Object(userFunctions["l" /* getDummySoldToId */])();
      var queryParam = "userId=".concat(userId, "&soldToId=").concat(soldToId, "&currentPage=").concat(currentPage, "&pageSize=").concat(pageSize, "&fields=DEFAULT");

      if (activeTabFilter && activeTabFilter !== "ALL") {
        queryParam = "".concat(queryParam, "&state=").concat(activeTabFilter);
      }

      if (noOfMonths) {
        queryParam = "".concat(queryParam, "&duration=").concat(noOfMonths);
      }

      return "".concat(url, "?").concat(queryParam);
    };

    _this.retrieveData = /*#__PURE__*/function () {
      var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(noOfMonths, activeTabFilter) {
        var HistoryServiceObj, fetchEndPoint, quoteData, _quoteData$totalNumbe, totalNumberOfResults;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                HistoryServiceObj = new history_services();
                fetchEndPoint = _this.props.configs.fetchEndPoint;
                fetchEndPoint = _this.getQueryParam(fetchEndPoint, noOfMonths, activeTabFilter);
                _context.next = 5;
                return HistoryServiceObj.getQuoteHistory(fetchEndPoint);

              case 5:
                quoteData = _context.sent;
                _quoteData$totalNumbe = quoteData.totalNumberOfResults, totalNumberOfResults = _quoteData$totalNumbe === void 0 ? 0 : _quoteData$totalNumbe;

                if (quoteData && totalNumberOfResults > 0) {
                  _this.setResultsState(quoteData);
                } else {
                  _this.setNoResultsState();
                }

                !_this.state.error && _this.state.initialPageLoad && _this.setAnalytics('load');

                _this.setState({
                  initialPageLoad: false
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.renderTabs = function () {
      var _ref3 = _this.props.configs || {},
          _ref3$tabs = _ref3.tabs,
          tabs = _ref3$tabs === void 0 ? [] : _ref3$tabs;

      return /*#__PURE__*/react_default.a.createElement(navigation_tabs, {
        className: "cmp-search__categories-tabs",
        items: tabs,
        activeIndex: _this.state.activeIndex,
        onClick: function onClick(e) {
          return _this.handleCategorySelected(e);
        },
        enableFading: true
      });
    };

    _this.renderDropDowns = function () {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__dropdowns"
      }, /*#__PURE__*/react_default.a.createElement(filter_dropdown, {
        onChange: function onChange(e) {
          return _this.handleCategorySelected(e);
        },
        dropdownfilters: _this.props.configs.dropdownfilters
      }), /*#__PURE__*/react_default.a.createElement(time_period_dropdown, {
        onChange: function onChange(e) {
          return _this.timePeriodHandler(e);
        },
        timePeriod: _this.props.configs.timeperiod
      }));
    };

    _this.renderCountHeader = function () {
      return /*#__PURE__*/react_default.a.createElement(count_header, {
        rows: _this.state.pageSize,
        count: _this.state.listCount,
        current: _this.state.currentPage + 1,
        resultsText: _this.props.configs.resultsText,
        noResultsText: _this.props.configs.noResultsFoundTitle
      });
    };

    _this.paginationClickHandler = function (page) {
      _this.setState({
        currentPage: page.selected
      }, function () {
        var _this$state2 = _this.state,
            noOfMonths = _this$state2.noOfMonths,
            activeTabFilter = _this$state2.activeTabFilter;

        _this.retrieveData(noOfMonths, activeTabFilter);
      });

      window.scroll(0, 0);
    };

    _this.renderNoResults = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__no-results"
      }, /*#__PURE__*/react_default.a.createElement("p", {
        "data-locator": "no-results"
      }, _this.props.configs.noResultsFoundText), /*#__PURE__*/react_default.a.createElement("p", null, /*#__PURE__*/react_default.a.createElement("a", {
        href: _this.props.configs.shopAllHref,
        "data-locator": "shop-all"
      }, _this.props.configs.shopAllTitle))));
    };

    _this.state = {
      listItems: "",
      noOfMonths: 1,
      poNumber: "",
      orderNumber: "",
      activeTabFilter: "ALL",
      activeIndex: 0,
      activeTimePeriod: 1,
      errorObjHistory: {},
      loading: true,
      noResults: false,
      error: false,
      initialPageLoad: true,
      currentPage: 0,
      pageSize: 10
    };
    _this.page = {
      name: "Quote History",
      type: "Quotes",
      analytics: {
        reference: "quoteHistory",
        timePeriod: "Quote Period Selected",
        timePeriodOptions: ['Last 30 Days', 'Last 6 Months', 'Last 12 Months', 'Show All']
      }
    };
    _this.paginationDefaults = {
      visibleRows: 10,
      nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
      previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
      pageRangeDisplayed: 8,
      marginPagesDisplayed: 1
    };
    return _this;
  }

  Object(createClass["a" /* default */])(QuoteHistory, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state3 = this.state,
          noOfMonths = _this$state3.noOfMonths,
          activeTabFilter = _this$state3.activeTabFilter;
      this.retrieveData(noOfMonths, activeTabFilter);
    }
  }, {
    key: "handleCategorySelected",
    value: function handleCategorySelected(e) {
      var _this2 = this;

      // 0 = All Quotes, 1 = Open Quotes, 2 = Closed Quotes
      var tabId;
      var activeTabFilterStatus = "ALL";
      e.value || e.value === 0 ? tabId = e.value : tabId = e;

      if (tabId === 1) {
        activeTabFilterStatus = "OPEN";
      } else if (tabId === 2) {
        activeTabFilterStatus = "CLOSED";
      }

      Object(analytics["f" /* setClickAnalytics */])(this.page.title, "".concat(this.page.title, " ").concat(activeTabFilterStatus, " ").concat(this.page.type), '#');
      this.setState({
        activeTabFilter: activeTabFilterStatus,
        activeIndex: tabId,
        currentPage: 0
      }, function () {
        var _this2$state = _this2.state,
            noOfMonths = _this2$state.noOfMonths,
            activeTabFilter = _this2$state.activeTabFilter;

        _this2.retrieveData(noOfMonths, activeTabFilter);
      });
    }
  }, {
    key: "timePeriodHandler",
    value: function timePeriodHandler(e) {
      var _this3 = this;

      var _this$page$analytics = this.page.analytics,
          timePeriod = _this$page$analytics.timePeriod,
          timePeriodOptions = _this$page$analytics.timePeriodOptions;
      var selectedTimeframe = e.value;
      var timeValue = '';
      var month = 1;
      var sixMonths = 6;
      var twelveMonths = 12;
      var allTime = 0;
      Object(analytics["g" /* setSelectDropdownAnalytics */])(timePeriod, "".concat(this.page.title, " ").concat(timePeriodOptions[selectedTimeframe - 1]));

      switch (selectedTimeframe) {
        case 1:
          timeValue = month;
          break;

        case 2:
          timeValue = sixMonths;
          break;

        case 3:
          timeValue = twelveMonths;
          break;

        case 4:
          timeValue = allTime;
          break;

        default:
      }

      this.setState({
        noOfMonths: timeValue,
        activeTimePeriod: selectedTimeframe,
        currentPage: 0
      }, function () {
        var _this3$state = _this3.state,
            noOfMonths = _this3$state.noOfMonths,
            activeTabFilter = _this3$state.activeTabFilter;

        _this3.retrieveData(noOfMonths, activeTabFilter);
      });
    }
  }, {
    key: "renderPagination",
    value: function renderPagination() {
      var _this4 = this;

      if (this.state.listCount > this.state.pageSize) {
        var previousIcon = /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.previousIcon
        });
        var nextIcon = /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.nextIcon
        });
        return /*#__PURE__*/react_default.a.createElement(react_paginate_default.a, {
          pageCount: this.state.pageCount,
          forcePage: this.state.currentPage,
          pageRangeDisplayed: this.paginationDefaults.pageRangeDisplayed,
          marginPagesDisplayed: this.paginationDefaults.marginPagesDisplayed,
          containerClassName: "paginate__container",
          onPageChange: function onPageChange(page) {
            return _this4.paginationClickHandler(page);
          },
          breakLabel: '…',
          previousLabel: previousIcon,
          nextLabel: nextIcon,
          initialPage: this.state.currentPage,
          disableInitialCallback: true,
          hrefBuilder: this.buildHref
        });
      } else {
        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state4 = this.state,
          listCount = _this$state4.listCount,
          listItems = _this$state4.listItems,
          noResults = _this$state4.noResults,
          loading = _this$state4.loading;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, loading ? /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
        loading: loading
      }) : null, !loading && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.renderTabs(), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__header clearfix",
        "data-locator": "order-list-header-clearfix"
      }, this.renderDropDowns(), this.renderCountHeader()), noResults && this.renderNoResults(), listCount > 0 && listItems.map(function (item, index) {
        return /*#__PURE__*/react_default.a.createElement(quote_list_item, {
          data: item,
          numberText: _this5.props.configs.numberText,
          itemsText: _this5.props.configs.itemsText,
          shipment: _this5.props.configs.shipment,
          created: _this5.props.configs.created,
          expires: _this5.props.configs.expires,
          orderNumberText: _this5.props.configs.orderNumberText,
          icons: _this5.props.configs.icons,
          quoteAgainTitle: _this5.props.configs.quoteAgainTitle,
          index: index,
          isShowQuoteAgainButton: _this5.props.configs.isShowQuoteAgainButton,
          newQuote: _this5.props.configs.newQuote,
          setAnalytics: _this5.setAnalytics
        });
      }), listCount > 0 && this.renderPagination()));
    }
  }]);

  return QuoteHistory;
}(react["Component"]);

/* harmony default export */ var quote_history = (quote_history_QuoteHistory);
// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(2);

// CONCATENATED MODULE: ./src/details/quote-details/index.js























var quote_details_QuoteDetails = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(QuoteDetails, _Component);

  function QuoteDetails(_ref) {
    var _this;

    var setErrorBoundaryToTrue = _ref.setErrorBoundaryToTrue,
        resetErrorBoundaryToFalse = _ref.resetErrorBoundaryToFalse,
        removeNotifications = _ref.removeNotifications,
        props = Object(objectWithoutProperties["a" /* default */])(_ref, ["setErrorBoundaryToTrue", "resetErrorBoundaryToFalse", "removeNotifications"]);

    Object(classCallCheck["a" /* default */])(this, QuoteDetails);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(QuoteDetails).call(this, Object(objectSpread["a" /* default */])({
      setErrorBoundaryToTrue: setErrorBoundaryToTrue,
      resetErrorBoundaryToFalse: resetErrorBoundaryToFalse,
      removeNotifications: removeNotifications
    }, props)));
    _this.rootStyle = "cmp-order-details";

    _this.setAnalytics = function (event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var model = {
        detail: detail,
        event: event
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */][_this.page.analytics.reference].name, model);
    };

    _this.toggleModal = function () {
      _this.setState({
        modalShown: !_this.state.modalShown
      });
    };

    _this.setError = function (response) {
      _this.setAnalytics('error', {
        error: Object(objectSpread["a" /* default */])({}, response)
      });

      if (response.status === 400 && response.code === 704) {
        _this.setState({
          orderNotFoundError: true
        });
      } else {
        _this.props.setErrorBoundaryToTrue({
          code: 400
        });

        _this.setState({
          errorServiceError: true
        });
      }
    };

    _this.getQuoteDetailsData = function () {
      var _this$state = _this.state,
          detailsUrl = _this$state.detailsUrl,
          quoteId = _this$state.quoteId;
      var url = Object(userFunctions["v" /* getUrlPath */])(detailsUrl, quoteId);
      getQuoteDetails(url, _this.setError).then(function (data) {
        var quotes = data && data.quotes || undefined;
        var totalItemsCount = 0;

        if (quotes) {
          totalItemsCount = quotes.totalItems || 0;

          _this.setState({
            isLoading: false,
            quoteDetails: quotes,
            totalItemsCount: totalItemsCount,
            errorOrderNotFound: false
          });
        } else {
          _this.setState({
            errorOrderNotFound: true,
            isLoading: false,
            totalItemsCount: totalItemsCount
          });
        }
      });
    };

    _this.config = document.getElementById('json-config--cmp-detail-tiles--personal') ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    _this.renderAddress = function () {
      var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (address) {
        var addressArray = Object(userFunctions["o" /* getFullCompanyAddress */])(address, true);
        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, addressArray.map(function (addressLine) {
          return /*#__PURE__*/react_default.a.createElement("div", {
            className: "".concat(_this.rootStyle, "-address1"),
            "data-locator": "order-details-address"
          }, addressLine);
        }));
      }
    };

    _this.renderItemCount = function () {
      var totalItemsCount = _this.state.totalItemsCount;
      var label = "";

      if (totalItemsCount > 0) {
        if (totalItemsCount > 1) {
          label = _this.props.config.items;
        } else if (totalItemsCount === 1) {
          label = _this.props.config.item;
        }

        var itemCountLabel = " (" + totalItemsCount + " " + label + ")";
        return itemCountLabel;
      } else {
        return label;
      }
    };

    _this.placeOrderForQuote = function (e, quoteId) {
      e.preventDefault();

      if (quoteId) {
        new sessionStore["a" /* default */]().setQuoteId(quoteId);
        var quoteDetails = _this.state.quoteDetails;
        var totalItems = quoteDetails.totalItems,
            entries = quoteDetails.entries,
            subTotal = quoteDetails.subTotal,
            totalShippingAndHandling = quoteDetails.totalShippingAndHandling,
            totalDiscounts = quoteDetails.totalDiscounts,
            totalTax = quoteDetails.totalTax,
            _quoteDetails$totalPr = quoteDetails.totalPriceWithTax,
            totalPriceWithTax = _quoteDetails$totalPr === void 0 ? {} : _quoteDetails$totalPr;
        var placeOrderModel = {
          detail: {
            quoteId: quoteId,
            subTotal: subTotal,
            totalTax: totalTax,
            totalDiscounts: totalDiscounts,
            totalShippingAndHandling: totalShippingAndHandling,
            totalPriceWithTax: totalPriceWithTax,
            totalItems: totalItems,
            entries: entries
          }
        };

        _this.setAnalytics('quotePlaceOrder', placeOrderModel);

        var checkoutUrl = Object(userFunctions["g" /* getCartCheckoutUrl */])(constants["h" /* STORE */], constants["b" /* CHECKOUT */]);
        window.location.href = checkoutUrl;
      }
    };

    _this.renderPlaceOrderButton = function (className, elementLocator) {
      var quoteDetails = _this.state.quoteDetails;
      var quoteStatus = quoteDetails.quoteStatus,
          quoteId = quoteDetails.quoteId;
      var commerceConfigs = document.getElementById('commerce-configs-json');

      if (commerceConfigs) {
        commerceConfigs = JSON.parse(commerceConfigs.innerHTML);
      }

      var _commerceConfigs = commerceConfigs,
          isQuoteDisabled = _commerceConfigs.isQuoteDisabled,
          isCheckoutDisabled = _commerceConfigs.isCheckoutDisabled;
      var approvalStatus = Object(userFunctions["f" /* getApprovalStatus */])();
      var isDisabled = Object(userFunctions["b" /* convertToBoolean */])(isQuoteDisabled) || Object(userFunctions["b" /* convertToBoolean */])(isCheckoutDisabled) || approvalStatus === 'R';
      return quoteStatus === constants["c" /* DELIVERY_STATUS */].OPEN && !isDisabled && /*#__PURE__*/react_default.a.createElement("div", {
        className: className,
        "data-locator": elementLocator
      }, /*#__PURE__*/react_default.a.createElement("a", {
        className: "cmp-button",
        href: "#",
        onClick: function onClick(e) {
          return _this.placeOrderForQuote(e, quoteId);
        },
        "data-locator": "".concat(elementLocator, "-button")
      }, _this.props.config.reorderTitle));
    };

    _this.quoteAgain = function (e, quoteId) {
      e.preventDefault();

      if (quoteId) {
        var quoteAgainModel = {
          detail: {
            quoteId: quoteId
          }
        };

        _this.setAnalytics('quoteAgainClick', quoteAgainModel);
      }
    };

    _this.renderQuoteAgainButton = function (className) {
      var quoteDetails = _this.state.quoteDetails;
      var quoteStatus = quoteDetails.quoteStatus,
          quoteId = quoteDetails.quoteId;
      return quoteStatus === constants["c" /* DELIVERY_STATUS */].EXPIRED && /*#__PURE__*/react_default.a.createElement("div", {
        className: className,
        "data-locator": "quote-details-quote-again-cta"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        className: "cmp-button",
        href: "/#",
        onClick: function onClick(e) {
          return _this.quoteAgain(e, quoteId);
        }
      }, _this.props.config.quoteAgainTitle));
    };

    _this.getValue = function (data, attribute) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var value = defaultValue;

      if (data) {
        value = data[attribute];
      }

      return value;
    };

    _this.renderDetailsSection = function () {
      var quoteDetails = _this.state.quoteDetails;
      var config = _this.props.config;
      var created = config.created,
          expires = config.expires,
          shipTo = config.shipTo,
          billTo = config.billTo,
          savings = config.savings,
          shipping = config.shipping,
          tax = config.tax,
          totalLabel = config.totalLabel,
          shipment = config.shipment,
          icons = config.icons,
          isShowQuoteAgainButton = config.isShowQuoteAgainButton;
      var quoteId = quoteDetails.quoteId,
          quoteCreationDate = quoteDetails.quoteCreationDate,
          quoteExpirationDate = quoteDetails.quoteExpirationDate,
          subTotal = quoteDetails.subTotal,
          totalShippingAndHandling = quoteDetails.totalShippingAndHandling,
          totalDiscounts = quoteDetails.totalDiscounts,
          totalTax = quoteDetails.totalTax,
          totalPriceWithTax = quoteDetails.totalPriceWithTax,
          shipToInfo = quoteDetails.shipToInfo,
          billToInfo = quoteDetails.billToInfo,
          quoteStatus = quoteDetails.quoteStatus,
          orderNumber = quoteDetails.orderNumber,
          replacedQuoteNumber = quoteDetails.replacedQuoteNumber;

      var isTotalDiscount = _this.getValue(totalDiscounts, 'value', '0');

      var notZeroDiscountFlag = parseFloat(isTotalDiscount) !== 0 ? true : false;

      var subTotalValue = _this.getValue(subTotal, 'formattedValue');

      var ShippingAndHandlingValue = _this.getValue(totalShippingAndHandling, 'formattedValue');

      var totalDiscountsValue = _this.getValue(totalDiscounts, 'formattedValue');

      var totalTaxValue = _this.getValue(totalTax, 'formattedValue');

      var totalPriceValue = _this.getValue(totalPriceWithTax, 'formattedValue');

      var showExpireDate = !!(quoteStatus === constants["c" /* DELIVERY_STATUS */].PENDING || quoteStatus === constants["c" /* DELIVERY_STATUS */].REJECTED || quoteStatus === constants["c" /* DELIVERY_STATUS */].OPEN);
      var showNewDetailsLinkSection = quoteStatus === constants["c" /* DELIVERY_STATUS */].QUOTE_REPLACED || quoteStatus === constants["c" /* DELIVERY_STATUS */].ORDER_PLACED;
      var newItemUrl = quoteStatus === constants["c" /* DELIVERY_STATUS */].ORDER_PLACED ? "#orderdetails?id=".concat(orderNumber) : "#quotedetails?id=".concat(replacedQuoteNumber);
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__container")
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: "".concat(_this.rootStyle, "__title"),
        "data-locator": "product-title"
      }, config.detailsTitle), showNewDetailsLinkSection && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__new-details-link-text")
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "new-details-link-section"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        href: newItemUrl
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "new-details-icon"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: config.icons.newQuoteOrderIcon
      })), quoteStatus === constants["c" /* DELIVERY_STATUS */].QUOTE_REPLACED && /*#__PURE__*/react_default.a.createElement("div", {
        className: "new-details-text",
        "data-locator": "delivery-text"
      }, "".concat(config.newQuote).concat(replacedQuoteNumber)), quoteStatus === constants["c" /* DELIVERY_STATUS */].ORDER_PLACED && /*#__PURE__*/react_default.a.createElement("div", {
        className: "new-details-text",
        "data-locator": "delivery-text"
      }, "".concat(config.orderNumberText).concat(orderNumber)))), quoteStatus && quoteStatus === constants["c" /* DELIVERY_STATUS */].ORDER_PLACED && /*#__PURE__*/react_default.a.createElement("div", {
        className: "new-details-status-icon"
      }, /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: quoteStatus,
        labels: shipment,
        icons: icons
      }), " ")), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-info")
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: "".concat(_this.rootStyle, "__order-number"),
        "data-locator": "product-number"
      }, config.numberLabel + ": " + quoteId)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-summary")
      }, quoteStatus && quoteStatus !== constants["c" /* DELIVERY_STATUS */].ORDER_PLACED && /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: quoteStatus,
        labels: shipment,
        icons: icons
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-info")
      }, quoteCreationDate && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-date"),
        "data-locator": "quote-details-created-date"
      }, "".concat(created, " ").concat(quoteCreationDate)), showExpireDate && quoteExpirationDate && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-date"),
        "data-locator": "quote-details-expire-date"
      }, "".concat(expires, " ").concat(quoteExpirationDate)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__address-container")
      }, shipToInfo && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__ship-to"),
        "data-locator": "ship-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, shipTo), _this.renderAddress(shipToInfo)), billToInfo && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__bill-to"),
        "data-locator": "bill-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, billTo), _this.renderAddress(billToInfo)))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-summary"),
        "data-locator": "order-summary-cart-details"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, config.summaryTitle), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal"),
        "data-locator": "order-summary-line-sub-total"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal_left"),
        "data-locator": "order-summary-label-sub-total"
      }, config.subTotal, " ", _this.renderItemCount()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal_right"),
        "data-locator": "order-summary-price-sub-total"
      }, subTotalValue)), notZeroDiscountFlag && /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings"),
        "data-locator": "order-summary-line-total-discount"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings_left"),
        "data-locator": "order-summary-label-total-discount"
      }, savings), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings_right"),
        "data-locator": "order-summary-price-total-discount"
      }, config.minusSign, totalDiscountsValue)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping"),
        "data-locator": "order-summary-line-total-shipping-handling"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping_left"),
        "data-locator": "order-summary-label-total-shipping-handling"
      }, shipping), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping_right"),
        "data-locator": "order-summary-price-total-shipping-handling"
      }, ShippingAndHandlingValue)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax"),
        "data-locator": "order-summary-line-estimated-tax"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax_left"),
        "data-locator": "order-summary-label-estimated-tax"
      }, tax), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax_right"),
        "data-locator": "order-summary-price-estimated-tax"
      }, totalTaxValue)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total"),
        "data-locator": "order-summary-line-total-price"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total_left"),
        "data-locator": "order-summary-label-total-price"
      }, totalLabel), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total_right"),
        "data-locator": "order-summary-price-total-price"
      }, /*#__PURE__*/react_default.a.createElement("h1", null, totalPriceValue))), _this.renderPlaceOrderButton("".concat(_this.rootStyle, "__reorder"), "quote-details-summary-order-place"), isShowQuoteAgainButton && _this.renderQuoteAgainButton("".concat(_this.rootStyle, "__reorder")))));
    };

    _this.renderNotFoundError = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__no-results",
        "data-locator": "order-details-no-results"
      }, /*#__PURE__*/react_default.a.createElement("p", null, _this.props.config.resultNotFoundErrorTitle)));
    };

    _this.renderOrderShipmentList = function () {
      var _this$state2 = _this.state,
          quoteDetails = _this$state2.quoteDetails,
          totalItemsCount = _this$state2.totalItemsCount;
      var _quoteDetails$entries = quoteDetails.entries,
          entries = _quoteDetails$entries === void 0 ? [] : _quoteDetails$entries;
      var isShowQuoteAgainButton = _this.props.config.isShowQuoteAgainButton;

      if (entries && entries.length > 0) {
        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
          className: "cmp-order-details__order-shipment-list",
          "data-locator": "order-shipment-list"
        }, /*#__PURE__*/react_default.a.createElement("hr", {
          className: "order-shipment-list__hr"
        }), /*#__PURE__*/react_default.a.createElement(components_shipment, {
          data: entries,
          shipment: _this.props.config.shipment,
          icons: _this.props.config.icons,
          resultsText: _this.props.config.resultsText,
          noResultsFoundTitle: _this.props.noResultsFoundTitle,
          totalItemsOrdered: totalItemsCount,
          totalItems: entries.length,
          isQuoteDetails: true
        })), _this.renderPlaceOrderButton("order-shipment__reorder", "quote-details-shipment-order-place"), isShowQuoteAgainButton && _this.renderQuoteAgainButton("order-shipment__reorder"));
      } else {
        return null;
      }
    };

    _this.state = {
      quoteId: Object(userFunctions["u" /* getUrlParameter */])("id"),
      detailsUrl: props.config.fetchDetailsEndPoint,
      itemsUrl: props.config.fetchItemsEndPoint,
      quoteDetails: {},
      errorServiceError: false,
      errorOrderNotFound: false,
      isLoading: true,
      modalShown: false,
      modalConfig: props.config.modalInfo,
      totalItemsCount: 0
    };
    _this.page = {
      name: "Quote Details",
      type: "Quotes",
      analytics: {
        reference: "quoteDetails"
      }
    };
    return _this;
  }

  Object(createClass["a" /* default */])(QuoteDetails, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.getQuoteDetailsData();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var quoteId = prevState.quoteId;

      if (quoteId !== this.state.quoteId) {
        this.getQuoteDetailsData();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.resetErrorBoundaryToFalse();
      this.props.removeNotifications();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          isLoading = _this$state3.isLoading,
          errorOrderNotFound = _this$state3.errorOrderNotFound,
          errorServiceError = _this$state3.errorServiceError;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isLoading && /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
        loading: isLoading
      }), !isLoading && errorOrderNotFound && this.renderNotFoundError(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList(), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.modalShown,
        onClose: this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.modalConfig.title,
        icon: this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), /*#__PURE__*/react_default.a.createElement(addToCartModal["default"], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var quoteId = prevState.quoteId;
      var urlQuoteId = Object(userFunctions["u" /* getUrlParameter */])("id");

      if (quoteId !== urlQuoteId) {
        return {
          quoteId: urlQuoteId
        };
      }
    }
  }]);

  return QuoteDetails;
}(react["Component"]);

var quote_details_ErrorBoundaryQuoteDetails = function ErrorBoundaryQuoteDetails(props) {
  return /*#__PURE__*/react_default.a.createElement(ErrorBoundary["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(quote_details_QuoteDetails, props));
};


/* harmony default export */ var quote_details = (quote_details_ErrorBoundaryQuoteDetails);
// CONCATENATED MODULE: ./src/my-account/index.js












var my_account_MyAccountRouter = function MyAccountRouter(props) {
  return /*#__PURE__*/react_default.a.createElement(HashRouter["a" /* default */], {
    hashType: "noslash"
  }, /*#__PURE__*/react_default.a.createElement(Switch["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.myAccount.path
  }, /*#__PURE__*/react_default.a.createElement(myaccount, props)), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.profile.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(my_profile, {
    configs: props.myProfile
  }))), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.changePassword.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(change_password, {
    configId: props.changePassword.config,
    configs: props.myProfile
  }))), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.orderHistory.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(order_history, {
    configs: props.orderHistory
  }))), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.orderDetails.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(order_details, {
    config: props.orderDetails
  }))), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.quoteHistory.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(quote_history, {
    configs: props.quoteHistory
  }))), /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.quoteDetails.path
  }, /*#__PURE__*/react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, /*#__PURE__*/react_default.a.createElement(quote_details, {
    config: props.quoteDetails
  })))));
};

/* harmony default export */ var my_account = __webpack_exports__["default"] = (my_account_MyAccountRouter);

/***/ })

}]);