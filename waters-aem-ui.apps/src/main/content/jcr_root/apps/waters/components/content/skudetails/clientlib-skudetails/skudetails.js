(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

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
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(40);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(111);
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
  _addToCart = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    var products, options, localStore, cartId, urlRequest, response, json, _json, _options, _urlRequest, _response, _json2;

    return C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  _getAvailability = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url, countryCode, partNo) {
    var options, urlRequest, response, json;
    return C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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
  _getPricing = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, sku, soldToId, salesOrg) {
    var options, urlRequest, response, json;
    return C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
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

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(518);
/* harmony import */ var _scripts_skulist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(226);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(39);
/* harmony import */ var _stores_localStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(111);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);












var AddToCart = /*#__PURE__*/function (_React$Component) {
  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(AddToCart, _React$Component);

  function AddToCart(props) {
    var _this;

    Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, AddToCart);

    _this = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(AddToCart).call(this, props));

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

  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(AddToCart, [{
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

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        className: "cmp-sku-details__quantity",
        placeholder: "Qty",
        value: this.state.addToCartQty,
        onChange: this.skuQuantityInput,
        onKeyPress: this.skuRemoveNegative,
        "data-locator": "input-sku-qty",
        "aria-label": this.props.qtyLabel
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
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

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(73);









var Stock = /*#__PURE__*/function (_React$Component) {
  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Stock, _React$Component);

  function Stock(props) {
    Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Stock);

    return Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Stock).call(this, props));
  }

  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Stock, [{
    key: "renderStockError",
    value: function renderStockError() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].ErrorMessages(this.props.errorObj).serviceUnavailable, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
        src: this.props.skuInfo.lowStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--outofstock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-outofstock")
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"].ErrorMessages(this.props.errorObj).tryAgainLater));
    }
  }, {
    key: "renderInStock",
    value: function renderInStock() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.inStockLabel, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
        src: this.props.skuInfo.inStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--instock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-instock")
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, this.props.skuInfo.orderNowLabel));
    }
  }, {
    key: "renderContactWaters",
    value: function renderContactWaters() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.contactWatersLabel), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, this.props.skuInfo.contactWatersInfoLabel));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props && this.props.errorObj && this.props.errorObj.ok === false) {
        return this.renderStockError();
      } else {
        if (this.props.skuAvailability.availableQuantity > 0) {
          return this.renderInStock();
        } else {
          return this.renderContactWaters();
        }
      }
    }
  }]);

  return Stock;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Stock);

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







var Price = /*#__PURE__*/function (_React$Component) {
  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Price, _React$Component);

  function Price(props) {
    Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Price);

    return Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Price).call(this, props));
  }

  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Price, [{
    key: "render",
    value: function render() {
      var priceLabelClass = this.props.isListPrice === true ? "cmp-sku-list__list-price-label" : "cmp-sku-list__cust-price-label";
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: priceLabelClass,
        "data-locator": "sku-price-label",
        "aria-label": this.props.label
      }, this.props.label), this.props.price && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-sku__price",
        "data-locator": "sku-price",
        "aria-label": this.props.price
      }, this.props.price));
    }
  }]);

  return Price;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

Price.defaultProps = {
  label: '',
  price: ''
};
/* harmony default export */ __webpack_exports__["default"] = (Price);

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);




function UnavailablePrice(props) {
  var label = props.label,
      icon = props.icon,
      text = props.text;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "cmp-sku-list__cust-price-label",
    "data-locator": "sku-price-label",
    "aria-label": label
  }, label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-sku-list__unavailable"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    "aria-hidden": "true",
    src: icon,
    "data-locator": Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_2__[/* elementLocator */ "a"])("icon ".concat(text))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "aria-label": text,
    "data-locator": Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_2__[/* elementLocator */ "a"])(text)
  }, text)));
}

/* harmony default export */ __webpack_exports__["default"] = (UnavailablePrice);

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(41);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _views_stock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(522);
/* harmony import */ var _views_price__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(523);
/* harmony import */ var _sku_details_views_unavailablePrice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(524);
/* harmony import */ var _views_addToCart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(520);
/* harmony import */ var _sku_details_views_addToCartModal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(55);
/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(13);
/* harmony import */ var _utils_spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(90);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(12);
/* harmony import */ var _scripts_checkOutStatus__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(63);
/* harmony import */ var _sku_message__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(81);
/* harmony import */ var _scripts_ecommerce__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(64);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(39);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(518);
/* harmony import */ var _scripts_signIn__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(499);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(8);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(23);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(110);







// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time




















var SkuDetails = /*#__PURE__*/function (_React$Component) {
  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(SkuDetails, _React$Component);

  function SkuDetails(props) {
    var _this;

    Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, SkuDetails);

    _this = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this, Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(SkuDetails).call(this, props));

    _this.handleScroll = function () {
      try {
        var isStickyAvailable = _this.state.isStickyAvailable;
        var elem = document.querySelector('.cmp-sku-details');

        if (elem) {
          if (elem.classList.contains('cmp-sku-details--sticky')) {
            if (!isStickyAvailable) {
              _this.setState({
                isStickyAvailable: true
              });
            }
          } else {
            if (isStickyAvailable) {
              _this.setState({
                isStickyAvailable: false
              });
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    _this.getCustPricing = function (pricingUrl, skuNumber, userInfo, propListPrice) {
      Object(_services_index__WEBPACK_IMPORTED_MODULE_21__[/* getPricing */ "c"])(pricingUrl, skuNumber, userInfo.dynamicSoldTo, userInfo.salesOrg).then(function (response) {
        if (response.status && response.status === 200) {
          var match = Object(_services_index__WEBPACK_IMPORTED_MODULE_21__[/* matchListItems */ "d"])(skuNumber, response);
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
            errorPriceType: [_constants__WEBPACK_IMPORTED_MODULE_25__[/* BAD_REQUEST_CODE */ "a"], _constants__WEBPACK_IMPORTED_MODULE_25__[/* SERVER_ERROR_CODE */ "g"]].includes(Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_24__[/* getHttpStatusFromErrors */ "c"])(response.errors, response.status)) ? Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__[/* isEprocurementUser */ "v"])() ? _constants__WEBPACK_IMPORTED_MODULE_25__[/* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */ "i"] : _constants__WEBPACK_IMPORTED_MODULE_25__[/* LIST_PRICE_WITH_ADD_TO_CART */ "e"] : _constants__WEBPACK_IMPORTED_MODULE_25__[/* NO_PRICE_NO_ADD_TO_CART */ "f"],
            loading: false
          });
        }
      })["catch"](function () {
        // Add Error Object to State
        _this.setState({
          errorPriceType: _constants__WEBPACK_IMPORTED_MODULE_25__[/* NO_PRICE_NO_ADD_TO_CART */ "f"],
          loading: false
        });
      });
    };

    _this.toggleModal = function () {
      _this.setState({
        modalShown: !_this.state.modalShown
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

    _this.renderCountryRestricted = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.state.skuInfo.lowStockIcon,
        message: _this.props.countryRestricted
      });
    };

    _this.renderDiscontinued = function () {
      var discontinuedMessage = _this.props.config.skuInfo.discontinuedWithReplacementWithCode;

      if (!_this.props.replacementSkuCode || !_this.props.replacementSkuHref) {
        discontinuedMessage = _this.props.config.skuInfo.discontinuedNoReplacementCode;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: discontinuedMessage,
        link: _this.props.replacementSkuHref,
        linkMessage: _this.props.replacementSkuCode
      });
    };

    _this.renderEcommerceDisabled = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.disabledText
      });
    };

    _this.renderEcommercePartialDisabled = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.partialDisabledText,
        link: _this.props.config.commerceConfig.partialDisabledHref,
        linkMessage: _this.props.config.commerceConfig.partialDisabledLinkText
      });
    };

    _this.renderListOrUnavailablePrice = function () {
      var _this$state = _this.state,
          listPrice = _this$state.listPrice,
          skuInfo = _this$state.skuInfo,
          errorPriceType = _this$state.errorPriceType,
          isStickyAvailable = _this$state.isStickyAvailable;
      var isHiddenListPrice = errorPriceType === _constants__WEBPACK_IMPORTED_MODULE_25__[/* NO_PRICE_NO_ADD_TO_CART */ "f"] && isStickyAvailable && Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__[/* isEprocurementUser */ "v"])() ? true : false;

      if (errorPriceType === _constants__WEBPACK_IMPORTED_MODULE_25__[/* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */ "i"] && !isStickyAvailable) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_details_views_unavailablePrice__WEBPACK_IMPORTED_MODULE_10__["default"], {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined' && !isHiddenListPrice) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_views_price__WEBPACK_IMPORTED_MODULE_9__["default"], {
            label: skuInfo.listPriceLabel,
            price: listPrice,
            isListPrice: true
          });
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null);
        }
      }
    };

    _this.renderPricing = function () {
      var _this$state2 = _this.state,
          custPrice = _this$state2.custPrice,
          listPrice = _this$state2.listPrice,
          skuInfo = _this$state2.skuInfo,
          errorPriceType = _this$state2.errorPriceType;

      if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state()) {
        var price = typeof custPrice !== 'undefined' ? custPrice : listPrice;

        if (errorPriceType !== '') {
          return _this.renderListOrUnavailablePrice();
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_views_price__WEBPACK_IMPORTED_MODULE_9__["default"], {
            label: skuInfo.custPriceLabel,
            price: price,
            isListPrice: false
          });
        }
      } else {
        return _this.renderListOrUnavailablePrice();
      }
    };

    _this.renderBuyInfo = function () {
      var _this$state3 = _this.state,
          custPrice = _this$state3.custPrice,
          listPrice = _this$state3.listPrice,
          loading = _this$state3.loading,
          skuInfo = _this$state3.skuInfo,
          skuNumber = _this$state3.skuNumber,
          errorObjAvailability = _this$state3.errorObjAvailability,
          skuAvailability = _this$state3.skuAvailability,
          errorObjCart = _this$state3.errorObjCart,
          errorPriceType = _this$state3.errorPriceType,
          isStickyAvailable = _this$state3.isStickyAvailable;
      var config = _this.props.config;
      var isErrorModal = false;

      if (errorObjCart) {
        isErrorModal = Object.keys(errorObjCart).length !== 0;
      }

      var isHiddenAddToCart = errorPriceType === _constants__WEBPACK_IMPORTED_MODULE_25__[/* NO_PRICE_NO_ADD_TO_CART */ "f"] && isStickyAvailable ? true : false;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo",
        "data-locator": "sku-details-buyinfo"
      }, _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state() && typeof custPrice !== 'undefined' && custPrice !== listPrice && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "cmp-sku-details__list-price"
      }, "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "cmp-sku-details__priceinfo",
        "data-locator": "sku-details-priceinfo"
      }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_utils_spinner__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        "data-locator": "sku-details-availability"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_views_stock__WEBPACK_IMPORTED_MODULE_8__["default"], {
        skuInfo: skuInfo,
        skuNumber: skuNumber,
        skuAvailability: skuAvailability,
        skuType: "details",
        errorObj: errorObjAvailability
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "cmp-sku-details__buttons".concat(isHiddenAddToCart ? ' cmp-sku-details__add-to-cart-hide' : ''),
        "data-locator": "sku-details-add-to-cart-sec"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_views_addToCart__WEBPACK_IMPORTED_MODULE_11__["default"], {
        toggleParentModal: _this.toggleModal,
        skuNumber: skuNumber,
        addToCartLabel: config.addToCartLabel,
        addToCartQty: config.defaultSkuQty,
        addToCartUrl: config.addToCartUrl,
        isCommerceApiMigrated: config.isCommerceApiMigrated,
        toggleErrorModal: _this.toggleErrorModal,
        analyticsConfig: _this.state.analyticsConfig
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_utils_modal__WEBPACK_IMPORTED_MODULE_13__[/* default */ "b"], {
        isOpen: _this.state.modalShown,
        onClose: _this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, !isErrorModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_utils_modal__WEBPACK_IMPORTED_MODULE_13__[/* Header */ "a"], {
        title: _this.state.modalConfig.title,
        icon: _this.state.modalConfig.icon,
        className: _utils_modal__WEBPACK_IMPORTED_MODULE_13__[/* keys */ "c"].HeaderWithAddedMarginTop,
        elementLocator: "add-to-cart-modal-header"
      }), isErrorModal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_utils_modal__WEBPACK_IMPORTED_MODULE_13__[/* Header */ "a"], {
        title: _this.state.errorInfo.title,
        icon: _this.state.errorInfo.icon,
        className: _utils_modal__WEBPACK_IMPORTED_MODULE_13__[/* keys */ "c"].HeaderWithAddedMarginTopError,
        elementLocator: "add-to-cart-modal-header"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_details_views_addToCartModal__WEBPACK_IMPORTED_MODULE_12__["default"], {
        config: _this.state.modalConfig,
        errorObjCart: _this.state.errorObjCart
      })));
    };

    _this.renderActiveSku = function () {
      if (_scripts_ecommerce__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"].isDisabledState()) {
        return _this.renderEcommerceDisabled();
      } else {
        if (_scripts_ecommerce__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"].isPartialState() && _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state() && _scripts_checkOutStatus__WEBPACK_IMPORTED_MODULE_17__[/* default */ "a"].state() || !_scripts_ecommerce__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"].isPartialState() && !_scripts_ecommerce__WEBPACK_IMPORTED_MODULE_19__[/* default */ "a"].isDisabledState()) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_7___default.a.Fragment, null, !_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_scripts_signIn__WEBPACK_IMPORTED_MODULE_22__[/* default */ "a"], {
            signInUrl: _this.props.config.baseSignInUrl,
            signInIcon: _this.state.skuInfo.signinIcon,
            signInText1: _this.state.skuInfo.signInText1,
            signInText2: _this.state.skuInfo.signInText2,
            signInText3: _this.state.skuInfo.signInText3
          }) || _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
            className: "cmp-sku-signin-wrapper-not-displayed"
          }), _this.renderBuyInfo());
        } else {
          return _this.renderEcommercePartialDisabled();
        }
      }
    };

    _this.renderEProcurementUserRestricted = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.eProcurementRestrictedText
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: _this.props.config.skuInfo.skuErrorMessage
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_sku_message__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"], {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: _this.props.config.skuInfo.skuErrorMessage
      });
    };

    _this.state = {
      modalShown: false,
      modalConfig: Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, _this.props.config.modalInfo, {
        textHeading: _this.props.skuNumber,
        text: _this.props.titleText,
        partNumberLabel: _this.props.config.skuInfo.partNumberLabel
      }),
      code: _this.props.skuNumber,
      skuInfo: _this.props.config.skuInfo,
      skuNumber: _this.props.skuNumber,
      userInfo: {},
      userCountry: _this.props.config.countryCode,
      isGlobal: _this.props.config.countryCode === _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_23__[/* default */ "a"].globalExperience,
      userLocale: _this.props.config.locale,
      availabilityUrl: _this.props.config.availabilityUrl,
      pricingUrl: _this.props.config.pricingUrl,
      addToCartUrl: _this.props.config.addToCartUrl,
      loading: true,
      skuAvailability: {},
      addToCartQty: undefined,
      custPrice: undefined,
      custPriceApiDisabled: _this.props.config.isCustomerPriceApiDisabled,
      listPrice: _this.props.price,
      analyticsConfig: {
        context: _analytics__WEBPACK_IMPORTED_MODULE_20__[/* mainCartContext */ "c"],
        name: _this.props.titleText,
        price: _this.props.price,
        sku: _this.props.skuNumber
      },
      errorObjCart: {},
      errorObjAvailability: {},
      errorPriceType: '',
      discontinued: _this.props.discontinued == "true",
      signInUrl: _this.props.baseSignInUrl,
      errorInfo: _this.props.config.errorInfo,
      isEProcurementUserRestricted: !Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__[/* isEprocurementUser */ "v"])() && Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__[/* isEprocurementUserRole */ "w"])(),
      isStickyAvailable: false
    };
    _this.toggleModal = _this.toggleModal.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_this)));
    return _this;
  }

  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(SkuDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$state4 = this.state,
          availabilityUrl = _this$state4.availabilityUrl,
          custPriceApiDisabled = _this$state4.custPriceApiDisabled,
          isGlobal = _this$state4.isGlobal,
          pricingUrl = _this$state4.pricingUrl,
          skuNumber = _this$state4.skuNumber,
          userCountry = _this$state4.userCountry;

      if (!isGlobal) {
        if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"].state()) {
          var userInfo = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_14__[/* callCustomerPriceApi */ "a"])(custPriceApiDisabled);

          if (Object.keys(userInfo).length > 0 && userInfo.callCustApi) {
            this.setState({
              userInfo: userInfo
            }, function () {
              _this2.getCustPricing(pricingUrl, skuNumber, userInfo, _this2.props.price);
            });
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

        Object(_services_index__WEBPACK_IMPORTED_MODULE_21__[/* getAvailability */ "b"])(availabilityUrl, userCountry, skuNumber).then(function (response) {
          _this2.setState({
            skuAvailability: response,
            modalInfo: Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, _this2.props.config.modalInfo, {
              textHeading: _this2.props.skuNumber,
              text: _this2.props.titleText
            }),
            analyticsConfig: Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, _this2.state.analyticsConfig, response)
          });
        })["catch"](function (err) {
          // Add Error Object to State
          _this2.setState({
            errorObjAvailability: err
          });
        });
      }

      window.addEventListener('scroll', this.handleScroll);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    } // Determines, cmp-sku-details--sticky class is added or not in the DOM

  }, {
    key: "render",
    value: function render() {
      if (this.state.isEProcurementUserRestricted) {
        return this.renderEProcurementUserRestricted();
      } else if (!this.state.listPrice || this.state.isGlobal) {
        return this.renderCountryRestricted();
      } else if (this.state.discontinued) {
        return this.renderDiscontinued();
      } else if (this.state.errorPriceType === _constants__WEBPACK_IMPORTED_MODULE_25__[/* NO_PRICE_NO_ADD_TO_CART */ "f"] && !this.state.isStickyAvailable) {
        return this.renderSkuPriceErrorMsg();
      } else {
        return this.renderActiveSku();
      }
    }
  }]);

  return SkuDetails;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

SkuDetails.defaultProps = {
  config: {},
  price: '',
  countryRestricted: '',
  skuNumber: '',
  titleText: '',
  discontinued: false,
  replacementSkuCode: '',
  replacementSkuHref: ''
};
/* harmony default export */ __webpack_exports__["default"] = (SkuDetails);

/***/ })

}]);