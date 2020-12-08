(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 36:
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
var slicedToArray = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(13);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js
var inlineSVG = __webpack_require__(41);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(7);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(2);

// EXTERNAL MODULE: ./src/stores/cookieStore.js
var cookieStore = __webpack_require__(42);

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

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addToCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAvailability; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getPricing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return matchListItems; });
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(109);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _utils_serviceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(481);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);









var availabilityUrlRequest = function availabilityUrlRequest(url, countryCode, partNo) {
  url = url.replace('{partnumber}', partNo).replace('{countryCode}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "p"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "h"])().toUpperCase() : countryCode);
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
  var userId = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getUserId */ "o"])();
  userId = userId !== '' ? userId : 'anonymous';
  url = url.replace('{localeCountry}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "p"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserCountryCode */ "h"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCountryCode */ "e"])()).replace('{localeLanguage}', Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "p"])() ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getEprocUserLanguage */ "i"])().toLowerCase() : Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getLanguage */ "m"])()).replace('{userType}', userId).replace('{guid}', cartId ? cartId : 'null').concat('', '?successWithCart=true');
  url = cartId ? url : url.concat('', "&createCart=".concat(!Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* isEprocurementUser */ "p"])()));
  return url;
};

function addToCart(_x, _x2, _x3, _x4, _x5) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    var products, options, localStore, cartId, urlRequest, response, json, _json, _options, _urlRequest, _response, _json2;

    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  _getAvailability = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url, countryCode, partNo) {
    var options, urlRequest, response, json;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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
  _getPricing = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, sku, soldToId, salesOrg) {
    var options, urlRequest, response, json;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
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

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(508);
/* harmony import */ var _scripts_skulist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(220);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(36);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(109);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9);












var AddToCart = /*#__PURE__*/function (_React$Component) {
  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(AddToCart, _React$Component);

  function AddToCart(props) {
    var _this;

    Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, AddToCart);

    _this = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(AddToCart).call(this, props));

    _this.onChangeSku = function (skuNumber) {
      _this.setState({
        skuNumber: skuNumber
      });
    };

    _this.quantityInput = function (e) {
      var cartValue = Number(e.target.value.replace(/[^\w\s]/gi, '')); // Cast the value as a number, and regex out anything but whole numbers
      // Doing it this way instead of setting the input as a number because even with input set to type="number" special characters can be input
      // also there were a problems with negatives/resetting to zero as number type

      if (cartValue < 0 || isNaN(cartValue)) {
        cartValue = 0;
      }

      _this.setState({
        addToCartQty: cartValue
      });
    };

    _this.addToCart = function () {
      if (_this.state.skuNumber) {
        if (_this.state.addToCartQty > 0) {
          _this.cartAPIRequest();
        } else {
          // TODO: Make this also an error modal?
          _this.setState({
            addToCartQty: 1
          }, function () {
            return _this.cartAPIRequest();
          });
        }
      }
    };

    _this.skuRemoveNegative = function (e) {
      _scripts_skulist__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].SkuRemoveNegative(e);
    };

    _this.skuQuantityInput = function (e) {
      _scripts_skulist__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].SkuQuantityInput(e);
      var value = e.target.value;

      _this.setState({
        addToCartQty: value
      });
    };

    _this.addToCartAnalytics = function (response) {
      var localStore = new _stores_localStore__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"]();
      var cartId = _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"].state() ? localStore.getCartId() : localStore.getGUID();
      var addToCartModel = {
        addContext: _this.props.analyticsConfig.context,
        name: _this.props.analyticsConfig.name,
        price: _this.props.analyticsConfig.price,
        quantity: _this.state.addToCartQty.toString(),
        sku: _this.state.skuNumber,
        cartId: cartId
      };

      if (typeof response == 'boolean' || response.statusCode === 'success') {
        addToCartModel.success = response.toString();
      }

      if (_this.props.analyticsConfig.hasOwnProperty('availableDate')) {
        if (_this.props.analyticsConfig.availableDate) {
          addToCartModel.stockDate = _this.props.analyticsConfig.availableDate;
        }
      }

      if (_this.props.analyticsConfig.hasOwnProperty('availableQuantity')) {
        if (_this.props.analyticsConfig.availableQuantity) {
          addToCartModel.stockQuantity = _this.props.analyticsConfig.availableQuantity.toString();
        }
      }

      if (_this.props.analyticsConfig.hasOwnProperty('productStatus')) {
        if (_this.props.analyticsConfig.productStatus) {
          addToCartModel.stockMessage = _this.props.analyticsConfig.productStatus;
        }
      }

      _analytics__WEBPACK_IMPORTED_MODULE_8__[/* default */ "b"].setAnalytics(_analytics__WEBPACK_IMPORTED_MODULE_8__[/* analyticTypes */ "a"].cart.name, addToCartModel);
    };

    _this.state = {
      skuNumber: _this.props.skuNumber,
      addToCartLabel: _this.props.addToCartLabel,
      addToCartQty: _this.props.addToCartQty,
      addToCartUrl: _this.props.addToCartUrl,
      isCommerceApiMigrated: _this.props.isCommerceApiMigrated,
      toggleErrorModal: _this.props.toggleErrorModal,
      toggleParentModal: _this.props.toggleParentModal,
      errorObj: _this.props.errorObj,
      skuResponse: _this.props.skuResponse
    };
    return _this;
  }

  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(AddToCart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onRef) {
        this.props.onRef(this);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.onRef) {
        this.props.onRef(undefined);
      }
    }
  }, {
    key: "cartAPIRequest",
    value: function cartAPIRequest() {
      var _this2 = this;

      Object(_services_index__WEBPACK_IMPORTED_MODULE_6__[/* addToCart */ "a"])(this.props.isCommerceApiMigrated, this.props.addToCartUrl, this.state.skuNumber, this.state.addToCartQty, this.state.toggleErrorModal).then(function (response) {
        // If any other type of error eg 400, 401, 404 return 
        if (Object.keys(response).length === 0) {
          return;
        } // Check for an errors object in the response. If present display the error modal instead of the View Cart


        var cartAPIError = response.errors;

        if (!response.errors) {
          _this2.state.skuResponse(response);

          _this2.state.toggleParentModal(true);

          _this2.addToCartAnalytics(response);
        } else {
          var status = cartAPIError[0].code;
          var errTemp = {
            "ok": false,
            "status": status
          };

          _this2.setState({
            errorObj: errTemp
          });

          _this2.state.toggleErrorModal(errTemp);
        }
      })["catch"](function (err) {
        _this2.setState({
          errorObj: err
        });

        _this2.state.toggleErrorModal(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("form", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        className: "cmp-sku-details__quantity",
        placeholder: "Qty",
        value: this.state.addToCartQty,
        onChange: this.skuQuantityInput,
        onKeyPress: this.skuRemoveNegative,
        "data-locator": "input-sku-qty",
        "aria-label": this.props.qtyLabel
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        className: "cmp-button ".concat(!this.state.skuNumber.trim() && 'disabled'),
        onClick: function onClick() {
          return _this3.addToCart();
        },
        "data-locator": "link-add-to-cart"
      }, this.props.addToCartLabel));
    }
  }]);

  return AddToCart;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

AddToCart.defaultProps = {
  addToCartQty: null,
  onRef: function onRef() {},
  skuResponse: function skuResponse() {},
  qtyLabel: ''
};
/* harmony default export */ __webpack_exports__["default"] = (AddToCart);

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(4);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

// EXTERNAL MODULE: ./src/sku-details/views/addToCart.js
var addToCart = __webpack_require__(511);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(53);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(38);

// CONCATENATED MODULE: ./src/components/Input/Input.js








var Input_Input = /*#__PURE__*/function (_PureComponent) {
  Object(inherits["a" /* default */])(Input, _PureComponent);

  function Input(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Input);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Input).call(this, props));
    _this.state = {
      value: '',
      isApplyDisabled: false
    };
    _this.onChange = _this.onChange.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.onBlur = _this.onBlur.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.onKeyPress = _this.onKeyPress.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.onKeyUp = _this.onKeyUp.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.onFocus = _this.onFocus.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(Input, [{
    key: "onChange",
    value: function onChange(e) {
      var _this$props = this.props,
          onChange = _this$props.onChange,
          type = _this$props.type;
      this.setState({
        value: e.target.value
      });
      var value = e.target.value;
      this.setState({
        isApplyDisabled: value ? false : true
      });
      var currentValue = type === 'file' ? e.target.files : e.target.value;
      onChange(currentValue);
    }
  }, {
    key: "onBlur",
    value: function onBlur(e) {
      var onBlur = this.props.onBlur;
      onBlur(e);
    }
  }, {
    key: "onKeyPress",
    value: function onKeyPress(e) {
      var onKeyPress = this.props.onKeyPress;
      onKeyPress(e);
    }
  }, {
    key: "onKeyUp",
    value: function onKeyUp(e) {
      var onKeyUp = this.props.onKeyUp;
      onKeyUp(e);
    }
  }, {
    key: "onFocus",
    value: function onFocus(e) {
      var onFocus = this.props.onFocus;
      onFocus(e);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          type = _this$props2.type,
          showLabel = _this$props2.showLabel,
          name = _this$props2.name,
          className = _this$props2.className,
          placeholder = _this$props2.placeholder,
          value = _this$props2.value,
          minLength = _this$props2.minLength,
          maxLength = _this$props2.maxLength,
          readOnly = _this$props2.readOnly,
          disabled = _this$props2.disabled,
          ariaLabel = _this$props2.ariaLabel,
          elementLocator = _this$props2.elementLocator,
          accept = _this$props2.accept,
          maxInputLength = _this$props2.maxInputLength;
      return react_default.a.createElement(react_default.a.Fragment, null, showLabel && react_default.a.createElement("label", {
        htmlFor: id,
        className: "visually-hidden"
      }, name), react_default.a.createElement("input", {
        id: id,
        type: type,
        name: name,
        className: className,
        placeholder: placeholder,
        value: type !== 'file' ? value : undefined,
        readOnly: readOnly,
        disabled: disabled,
        "aria-label": ariaLabel,
        "data-locator": elementLocator || "input-".concat(type, "-").concat(name),
        min: minLength,
        max: maxLength,
        maxLength: maxInputLength,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onKeyPress: this.onKeyPress,
        onKeyUp: this.onKeyUp,
        onFocus: this.onFocus,
        accept: accept,
        autoComplete: "off"
      }));
    }
  }]);

  return Input;
}(react["PureComponent"]);

Input_Input.defaultProps = {
  id: '',
  name: '',
  type: 'text',
  showLabel: true,
  className: '',
  placeholder: '',
  value: '',
  minLength: 0,
  maxLength: 999,
  ariaLabel: '',
  readOnly: false,
  disabled: false,
  elementLocator: '',
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  onKeyPress: function onKeyPress() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  accept: ''
};
/* harmony default export */ var components_Input_Input = (Input_Input);
// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(12);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(36);

// CONCATENATED MODULE: ./src/quick-order/QuickOrder.js












function QuickOrder(props) {
  var buttonLabel = props.buttonLabel,
      addToCartPlaceHolder = props.addToCartPlaceHolder,
      addToCartUrl = props.addToCartUrl,
      multipleItemsLabel = props.multipleItemsLabel,
      multipleItemsLink = props.multipleItemsLink,
      addItemsIcon = props.addItemsIcon,
      multipleItemsIcon = props.multipleItemsIcon,
      isCommerceApiMigrated = props.isCommerceApiMigrated,
      showLabel = props.showLabel,
      titleText = props.titleText,
      price = props.price,
      skuConfig = props.skuConfig,
      qtyLabel = props.qtyLabel;
  var childRef = Object(react["useRef"])();

  var _useState = Object(react["useState"])(''),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      sku = _useState2[0],
      setSku = _useState2[1];

  var _useState3 = Object(react["useState"])({}),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      errorObjCart = _useState4[0],
      setErrorObjCart = _useState4[1];

  var _useState5 = Object(react["useState"])(false),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      modalShown = _useState6[0],
      setModalShown = _useState6[1];

  var _useState7 = Object(react["useState"])(screenSizes["a" /* default */].isMobile()),
      _useState8 = Object(slicedToArray["a" /* default */])(_useState7, 2),
      isMobile = _useState8[0],
      setIsMobile = _useState8[1];

  var _useState9 = Object(react["useState"])(Object(objectSpread["a" /* default */])({}, skuConfig.modalInfo, {
    partNumberLabel: skuConfig.skuInfo.partNumberLabel
  })),
      _useState10 = Object(slicedToArray["a" /* default */])(_useState9, 2),
      modalConfig = _useState10[0],
      setModalConfig = _useState10[1];

  function onChange(value) {
    setSku(value);
    childRef.current.onChangeSku(value);
  } // HideShow SKU Error


  function skuErrorMgs(showError) {
    var skuNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    try {
      var element = document.querySelector('.cmp-notification--error');

      if (element) {
        if (showError) {
          document.querySelector('.cmp-notification--error .cmp-notification-description').innerText = "".concat(skuNumber, " ").concat(document.querySelector('.cmp-notification--error .cmp-notification-title').innerText);
          element.classList.remove('cmp-notification--dynamic');
        } else {
          document.querySelector('.cmp-notification--error .cmp-notification-description').innerText = '';
          element.classList.add('cmp-notification--dynamic');
        }
      }
    } catch (error) {}
  }

  ; // Hide SKU title msg on ComponentWillMount

  Object(react["useLayoutEffect"])(function () {
    if (document.querySelector('.cmp-notification--error .cmp-notification-title')) {
      document.querySelector('.cmp-notification--error .cmp-notification-title').style.display = 'none';
    }
  }, []); // Call During Screen resize

  var updateViewport = Object(react["useCallback"])(function () {
    setIsMobile(screenSizes["a" /* default */].isMobile());
  }, [setIsMobile]); // Register updateViewport method on screen resize

  Object(react["useEffect"])(function () {
    window.addEventListener('resize', updateViewport, true);
  }, [updateViewport]); // Get Added SKU info

  var skuResponse = Object(react["useCallback"])(function (response) {
    if (response.cartModifications && response.cartModifications.length > 0) {
      if (response.cartModifications[0].entry && response.cartModifications[0].entry.product) {
        var _response$cartModific = response.cartModifications[0].entry.product,
            code = _response$cartModific.code,
            name = _response$cartModific.name;
        setModalConfig(function (currentVal) {
          return Object(objectSpread["a" /* default */])({}, currentVal, {
            textHeading: code,
            text: name
          });
        });
      }
    }
  }, [setModalConfig, setErrorObjCart, setModalShown]); // Reset SKU and Qty

  Object(react["useEffect"])(function () {
    if (!modalShown && childRef.current) {
      childRef.current.onChangeSku('');
      childRef.current.skuQuantityInput({
        target: {
          value: 1
        }
      });
      setSku(function () {
        return '';
      });
    }
  }, [modalShown]); // Used for modal status

  var toggleModal = Object(react["useCallback"])(function () {
    setErrorObjCart(function () {
      return {};
    });
    skuErrorMgs(false);
    setModalShown(function (status) {
      return !status;
    });
  }, [setErrorObjCart, skuErrorMgs, setModalShown]); // Error scenarios

  var toggleErrorModal = Object(react["useCallback"])(function (error) {
    if (Object.keys(error).length > 0) {
      if ([400, 401, 404, 500].includes(error.status)) {
        setModalConfig(function (currentVal) {
          return Object(objectSpread["a" /* default */])({}, currentVal, {
            isOrderDetails: true,
            textHeading: skuConfig.errorInfo.title,
            text: skuConfig.errorInfo.wereSorry
          });
        });
        setErrorObjCart(error);
        setModalShown(true);
      } else {
        skuErrorMgs(true, childRef.current.state.skuNumber);
      }
    }
  }, [skuErrorMgs, setErrorObjCart, setModalConfig, setModalShown]);
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
    className: "quick-order-parent",
    "data-locator": "quick-order"
  }, react_default.a.createElement(components_Input_Input, {
    id: "code",
    type: "text",
    name: "quickOrder",
    placeholder: addToCartPlaceHolder,
    value: sku,
    className: "cmp-sku-details__quantity quick-order-sku",
    showLabel: showLabel,
    onChange: onChange,
    elementLocator: "input-quick-order-sku",
    ariaLabel: addToCartPlaceHolder
  }), react_default.a.createElement(addToCart["default"], {
    skuNumber: sku,
    addToCartQty: 1,
    qtyLabel: qtyLabel,
    addToCartLabel: buttonLabel,
    addToCartUrl: addToCartUrl,
    isCommerceApiMigrated: isCommerceApiMigrated,
    toggleParentModal: toggleModal,
    toggleErrorModal: toggleErrorModal,
    analyticsConfig: {
      sku: sku,
      price: price,
      context: analytics["h" /* shopAllCartContext */],
      name: titleText
    },
    onRef: function onRef(ref) {
      childRef.current = ref;
    },
    skuResponse: skuResponse
  })), react_default.a.createElement("a", {
    href: multipleItemsLink,
    className: "quick-order-multiple-item",
    "data-locator": "link-quick-order-add-multiple-item"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    "aria-hidden": "true",
    src: isMobile ? addItemsIcon : multipleItemsIcon,
    wrapper: "span",
    "data-locator": "add-multiple-item-icon"
  }), multipleItemsLabel), react_default.a.createElement(modal["b" /* default */], {
    isOpen: modalShown,
    onClose: toggleModal,
    className: "cmp-add-to-cart-modal"
  }, !(Object.keys(errorObjCart).length !== 0) && react_default.a.createElement(modal["a" /* Header */], {
    title: modalConfig.title,
    icon: modalConfig.icon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTop,
    elementLocator: "quick-order-modal-header"
  }), Object.keys(errorObjCart).length !== 0 && react_default.a.createElement(modal["a" /* Header */], {
    title: skuConfig.errorInfo.title,
    icon: skuConfig.errorInfo.icon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTopError,
    elementLocator: "quick-order-modal-header"
  }), react_default.a.createElement(addToCartModal["default"], {
    config: modalConfig,
    errorObjCart: errorObjCart,
    onClose: function onClose() {}
  })));
}

QuickOrder.defaultProps = {
  buttonLabel: prop_types_default.a.string,
  addToCartPlaceHolder: prop_types_default.a.string,
  addToCartUrl: prop_types_default.a.string,
  multipleItemsLabel: prop_types_default.a.string,
  multipleItemsLink: prop_types_default.a.string,
  addItemsIcon: prop_types_default.a.string,
  multipleItemsIcon: prop_types_default.a.string,
  showLabel: prop_types_default.a.bool,
  isCommerceApiMigrated: prop_types_default.a.bool,
  titleText: prop_types_default.a.string,
  price: prop_types_default.a.string,
  skuConfig: prop_types_default.a.object,
  qtyLabel: prop_types_default.a.string
};
QuickOrder.defaultProps = {
  buttonLabel: '',
  isCommerceApiMigrated: true,
  addToCartPlaceHolder: '',
  addToCartUrl: '',
  multipleItemsLabel: '',
  multipleItemsLink: '',
  addItemsIcon: '/content/dam/waters/en/brand-assets/icons/add.svg',
  multipleItemsIcon: '/content/dam/waters/en/brand-assets/icons/multiple.svg',
  showLabel: false,
  titleText: '',
  price: '',
  skuConfig: {},
  qtyLabel: ''
};
/* harmony default export */ var quick_order_QuickOrder = __webpack_exports__["default"] = (QuickOrder);

/***/ })

}]);