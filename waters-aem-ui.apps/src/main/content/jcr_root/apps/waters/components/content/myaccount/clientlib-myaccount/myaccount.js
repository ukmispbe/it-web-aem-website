(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

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

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_fade_x_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
/* harmony import */ var _utils_eCommerceFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);




var Tabs = function Tabs(_ref) {
  var className = _ref.className,
      items = _ref.items,
      activeIndex = _ref.activeIndex,
      onClick = _ref.onClick,
      enableFading = _ref.enableFading;
  var tabsRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.useRef();
  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(function () {
    var tabFader;

    if (enableFading && items.length !== 0) {
      tabFader = Object(_scripts_fade_x_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('cmp-tabs', 0, 100);
      tabsRef.current.addEventListener('scroll', tabFader);
    }

    return function () {
      tabsRef.current.removeEventListener('scroll', tabFader);
    };
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-tabs-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    ref: tabsRef,
    className: "cmp-tabs ".concat(className)
  }, items.map(function (item, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Tab, {
      key: "CategoryTab-".concat(index),
      name: item.name,
      index: index,
      isActive: index === activeIndex,
      onClick: onClick
    });
  })));
};

Tabs.defaultProps = {
  className: "",
  items: [],
  activeIndex: -1,
  onClick: function onClick() {},
  enableFading: false
};

var Tab = function Tab(_ref2) {
  var index = _ref2.index,
      name = _ref2.name,
      isActive = _ref2.isActive,
      _onClick = _ref2.onClick;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "cmp-tabs__tab".concat(isActive ? " active" : ""),
    onClick: function onClick() {
      return _onClick(index);
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "cmp-tabs__tab-label",
    "data-locator": Object(_utils_eCommerceFunctions_js__WEBPACK_IMPORTED_MODULE_2__[/* elementLocator */ "a"])(name)
  }, name));
};

Tab.defaultProps = {
  name: "",
  index: -1,
  isActive: false,
  onClick: function onClick() {}
};
/* harmony default export */ __webpack_exports__["a"] = (Tabs);

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/HashRouter.js
var HashRouter = __webpack_require__(505);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__(507);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(503);

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
var slicedToArray = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var es_Link = __webpack_require__(504);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(506);

// EXTERNAL MODULE: ./src/typography/title.js
var typography_title = __webpack_require__(489);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(6);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(12);

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
    return react_default.a.createElement("li", {
      className: "cmp-breadcrumb-back"
    }, react_default.a.createElement(es_Link["a" /* default */], {
      "class": "cmp-breadcrumb-back__link cmp-button--secondary cmp-button--no-border cmp-button--with-icon",
      to: parentRoutePath,
      title: parentConfig.title
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: props.config.backIcon
    }), react_default.a.createElement("span", null, parentConfig.backLinkTitle)));
  };

  var renderBreadcrumbLink = function renderBreadcrumbLink(linkPath) {
    var linkRoute = Object.values(routes).filter(function (route) {
      return route.path === linkPath;
    })[0];
    var linkRouteName = linkRoute.name;
    var linkConfig = props.config.routes[linkRouteName];
    return react_default.a.createElement("li", {
      className: "cmp-breadcrumb__item",
      itemprop: "itemListElement",
      itemscope: "",
      itemtype: "http://schema.org/ListItem"
    }, react_default.a.createElement(es_Link["a" /* default */], {
      to: linkRoute.path,
      className: "cmp-breadcrumb__item-link",
      itemprop: "item"
    }, react_default.a.createElement("span", {
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
var analytics = __webpack_require__(36);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(9);

// EXTERNAL MODULE: ./src/utils/redirectFunctions.js
var redirectFunctions = __webpack_require__(14);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(90);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(15);

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
    return react_default.a.createElement("div", {
      className: "cmp-my-account__aside-wrapper",
      "data-locator": "my-account-wrapper"
    }, react_default.a.createElement(typography_title["a" /* default */], {
      text: getTitle(props.tiles, props.location.pathname)
    }), react_default.a.createElement("div", {
      className: "cmp-my-account__aside-links",
      "data-locator": "my-account-links"
    }, props.tiles.map(function (tile) {
      return react_default.a.createElement(aside_Tile, {
        key: tile.title,
        tile: tile,
        requiresEcommerce: tile.requiresEcommerce,
        isHiddenForEprocUser: tile.isHiddenForEprocUser,
        pathname: props.location.pathname
      });
    })), react_default.a.createElement("div", {
      className: "cmp-my-account__aside-content",
      "data-locator": "my-account-aside-content"
    }, props.children), breadcrumbList && react_default.a.createElement(components_breadcrumb, {
      path: props.location.pathname,
      config: props.breadcrumbs
    }));
  } else {
    return react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayTile
    });
  }
};

var aside_Tile = function Tile(_ref) {
  var tile = _ref.tile,
      pathname = _ref.pathname;

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["e" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["q" /* isEprocurementUserRole */])()) {
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  return react_default.a.createElement("div", {
    className: "tile",
    "data-locator": "my-account-tile"
  }, react_default.a.createElement("div", {
    className: "tile__title",
    "data-locator": "my-account-title-tile"
  }, tile.title), react_default.a.createElement("div", {
    className: "tile__links",
    "data-locator": "my-account-tile-links"
  }, tile.links.map(function (link) {
    if (!link.isHidden) {
      if (linkIsActive(pathname, link.url)) {
        return react_default.a.createElement(aside_ActiveLink, {
          key: link.text,
          text: link.text
        });
      } else {
        return react_default.a.createElement(aside_HyperLink, {
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
  return react_default.a.createElement("span", {
    className: "link--active",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(text)
  }, text);
};

var aside_HyperLink = function HyperLink(_ref3) {
  var link = _ref3.link;
  return link.url.startsWith("#") ? react_default.a.createElement(es_Link["a" /* default */], {
    to: "/".concat(link.url.substring(1, link.url.length)),
    onClick: function onClick() {
      return Object(analytics["f" /* setClickAnalytics */])("Side Navigation", link.linkName ? link.linkName : link.text, link.url);
    },
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(link.text)
  }, link.text) : react_default.a.createElement("a", {
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
  return react_default.a.createElement(react_default.a.Fragment, null, !!text && !!url && react_default.a.createElement("a", {
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
  return react_default.a.createElement("div", {
    className: "cmp-linktile",
    "data-locator": "".concat(Object(eCommerceFunctions["a" /* elementLocator */])(tilesName || 'my-account-tile'), "-linktile")
  }, react_default.a.createElement("div", {
    className: "cmp-linktile-column"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: icon,
    className: "cmp-linktile--icon",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(title, " icon"))
  })), react_default.a.createElement("div", {
    className: "cmp-linktile-column"
  }, react_default.a.createElement("div", {
    className: "cmp-linktile--title",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(title)
  }, title), links.map(function (link, key) {
    return react_default.a.createElement("div", {
      key: key,
      className: "cmp-linktile--links"
    }, !link.isHidden && react_default.a.createElement(components_link, Object.assign({}, link, {
      context: datalocator
    })));
  })));
};

/* harmony default export */ var link_tile = (link_tile_LinkTile);
// CONCATENATED MODULE: ./src/my-account/myaccount.js










var myaccount_Tile = function Tile(_ref) {
  var tile = _ref.tile;

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["e" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["q" /* isEprocurementUserRole */])()) {
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  return react_default.a.createElement(link_tile, Object.assign({}, tile, {
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
    return react_default.a.createElement("div", {
      className: "cmp-my-account-wrapper"
    }, react_default.a.createElement(typography_title["a" /* default */], {
      text: title
    }), react_default.a.createElement("div", {
      className: "cmp-my-account__body"
    }, body), react_default.a.createElement("div", {
      className: "cmp-my-account__tiles"
    }, react_default.a.createElement("div", {
      className: "tile",
      "data-locator": "my-account-tiles"
    }, tiles.map(function (tile, key) {
      return react_default.a.createElement(myaccount_Tile, {
        tile: tile,
        key: key
      });
    }))));
  } else {
    return react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayTile
    });
  }
};

/* harmony default export */ var myaccount = (myaccount_MyAccount);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(16);

// EXTERNAL MODULE: ./src/detail-tiles/hooks/useProfile.js
var useProfile = __webpack_require__(88);

// EXTERNAL MODULE: ./src/detail-tiles/index.js + 1 modules
var detail_tiles = __webpack_require__(51);

// EXTERNAL MODULE: ./src/detail-tiles/utils/generateTiles.js
var generateTiles = __webpack_require__(101);

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
        return react_default.a.createElement(detail_tiles["a" /* default */], Object.assign({}, config, {
          key: key
        }));
      });
    }
  };

  return react_default.a.createElement(react_default.a.Fragment, null, renderDetailTiles());
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
  return react_default.a.createElement(react_default.a.Fragment, null, !!config && react_default.a.createElement(detail_tiles["a" /* default */], config));
};

/* harmony default export */ var change_password = (change_password_ChangePassword);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

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

// EXTERNAL MODULE: ./node_modules/react-paginate/dist/react-paginate.js
var react_paginate = __webpack_require__(486);
var react_paginate_default = /*#__PURE__*/__webpack_require__.n(react_paginate);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(37);

// EXTERNAL MODULE: ./src/utils/serviceFunctions.js
var serviceFunctions = __webpack_require__(481);

// CONCATENATED MODULE: ./src/history/history.services.js





var history_services_HistoryService = /*#__PURE__*/function () {
  function HistoryService(url) {
    Object(classCallCheck["a" /* default */])(this, HistoryService);

    this.url = url;
  }

  Object(createClass["a" /* default */])(HistoryService, [{
    key: "getOrderListPost",
    value: function getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
      var options = {};
      options.orderNumber = orderNumber;
      options.purchaseOrderNumber = poNumber;
      options.fromDate = fromDate;
      options.maxRecs = "";
      return Object(serviceFunctions["b" /* postDataRedirect */])(url, options, setError);
    }
  }, {
    key: "getQuoteListPost",
    value: function getQuoteListPost(url, fromDate, poNumber, orderNumber, setError) {
      var options = {};
      options.orderNumber = orderNumber;
      options.purchaseOrderNumber = poNumber;
      options.fromDate = fromDate;
      options.maxRecs = "";
      return Object(serviceFunctions["b" /* postDataRedirect */])(url, options, setError);
    }
  }]);

  return HistoryService;
}();

/* harmony default export */ var history_services = (history_services_HistoryService);
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
        return react_default.a.createElement("div", null, react_default.a.createElement("a", {
          className: "tracking-link",
          href: shipped.carrierUrl,
          target: "_blank",
          title: labels.trackShipmentText,
          onClick: function onClick() {
            return Object(analytics["f" /* setClickAnalytics */])("Order Details", "Track Shipment", shipped.carrierUrl);
          },
          "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(labels.trackShipmentText)
        }, labels.trackShipmentText, react_default.a.createElement(react_svg["a" /* default */], {
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
        case "Expired":
          deliveryStatus = labels.expiredLabel;
          icon = icons.expiredIcon;
          iconClassName = "delivery-icon-disabled";
          deliveryStatusClass = "disabled";
          break;

        case "Order Placed":
          deliveryStatus = labels.orderPlacedLabel;
          icon = icons.orderPlacedIcon;
          iconClassName = "delivery-icon-complete";
          break;

        case "Open":
          deliveryStatus = labels.openLabel;
          icon = icons.openIcon;
          break;

        case "Partial":
          deliveryStatus = labels.partialLabel;
          icon = icons.partialIcon;
          break;

        case "Complete":
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
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "delivery-status ".concat(this.state.deliveryStatusClass),
        "data-locator": "delivery-status"
      }, react_default.a.createElement("div", {
        className: this.state.iconClassName
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.state.icon
      })), react_default.a.createElement("div", {
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
var date_formatter = __webpack_require__(482);

// EXTERNAL MODULE: ./src/utils/get-locale/index.js
var get_locale = __webpack_require__(483);

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

      return react_default.a.createElement("div", {
        className: "cmp-order-list__container"
      }, react_default.a.createElement("div", {
        className: "cmp-order-list__left"
      }, react_default.a.createElement("div", {
        className: "cmp-order-list__order-number"
      }, react_default.a.createElement("a", {
        href: '#orderdetails?id=' + this.props.data.orderNumber,
        onClick: function onClick() {
          return Object(analytics["f" /* setClickAnalytics */])("Order History", "Order Details, " + _this2.props.data.orderNumber, '#orderdetails?id=' + _this2.props.data.orderNumber);
        },
        "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(this.props.numberText, " ").concat(this.props.data.orderNumber))
      }, this.props.numberText + " " + this.props.data.orderNumber)), react_default.a.createElement("div", {
        className: "cmp-order-list__date",
        "data-locator": "order-list-date"
      }, date_formatter["a" /* default */].dateFormatter(this.props.data.date, this.userLocale))), react_default.a.createElement("div", {
        className: "cmp-order-list__right",
        "data-locator": "order-list-right"
      }, react_default.a.createElement("hr", {
        className: "cmp-order-list_hr"
      }), react_default.a.createElement(delivery_status, {
        status: this.props.data.deliveryStatus,
        labels: this.props.shipment,
        icons: this.props.icons
      })), react_default.a.createElement("div", {
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

  return react_default.a.createElement("div", {
    className: "cmp-order-list__resultsCount-container"
  }, react_default.a.createElement("h2", {
    className: "cmp-order-list__resultsCount",
    "data-locator": "order-list-result-count"
  }, getResultsText()));
};

/* harmony default export */ var count_header = (count_header_CountHeader);
// EXTERNAL MODULE: ./src/utils/dropdown/index.js
var dropdown = __webpack_require__(490);

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
  return react_default.a.createElement("div", {
    className: "cmp-order-list-timeperiod",
    "data-locator": "cmp-order-list-timeperiod"
  }, react_default.a.createElement(dropdown["a" /* default */], {
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
  return react_default.a.createElement("div", {
    className: "cmp-order-list-dropdownfilters"
  }, react_default.a.createElement(dropdown["a" /* default */], {
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
// EXTERNAL MODULE: ./src/navigation/tabs/index.js
var navigation_tabs = __webpack_require__(510);

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
      return react_default.a.createElement(navigation_tabs["a" /* default */], {
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
      return react_default.a.createElement("div", {
        className: "cmp-order-list__dropdowns"
      }, react_default.a.createElement(filter_dropdown, {
        onChange: function onChange(e) {
          return _this.handleCategorySelected(e);
        },
        dropdownfilters: _this.props.configs.dropdownfilters
      }), react_default.a.createElement(time_period_dropdown, {
        onChange: function onChange(e) {
          return _this.timePeriodHandler(e);
        },
        timePeriod: _this.props.configs.timeperiod
      }));
    };

    _this.renderCountHeader = function () {
      return react_default.a.createElement(count_header, {
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
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "cmp-order-list__no-results"
      }, react_default.a.createElement("p", {
        "data-locator": "no-results"
      }, _this.props.configs.noResultsFoundText), react_default.a.createElement("p", null, react_default.a.createElement("a", {
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
        var previousIcon = react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.previousIcon
        });
        var nextIcon = react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.nextIcon
        });
        return react_default.a.createElement(react_paginate_default.a, {
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
        return react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return react_default.a.createElement(react_default.a.Fragment, null, this.state.loading ? react_default.a.createElement(spinner["a" /* default */], {
        loading: this.state.loading
      }) : null, !this.state.loading && react_default.a.createElement(react_default.a.Fragment, null, this.renderTabs(), react_default.a.createElement("div", {
        className: "cmp-order-list__header clearfix",
        "data-locator": "order-list-header-clearfix"
      }, this.renderDropDowns(), this.renderCountHeader()), this.state.noResults && this.renderNoResults(), this.state.listCount > 0 && this.renderPaginatedResults().map(function (item, index) {
        return react_default.a.createElement(order_list_item, {
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
var toConsumableArray = __webpack_require__(138);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(494);

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
  var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(endpoint, id, setError) {
    var url, response, responseBody;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = endpoint + "/" + id;
            _context3.next = 3;
            return getData(url);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();

          case 6:
            responseBody = _context3.sent;

            if (!(response.status === 200)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", responseBody);

          case 11:
            setError({
              status: response.status,
              code: responseBody.code
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getQuoteDetails(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

var buildSearchURL = function buildSearchURL(endpoint, lineItems, isocode) {
  var skus, rows, keywords, url;
  skus = lineItems.map(function (lineItem) {
    return lineItem.materialNumber;
  });
  rows = skus.length;
  keywords = skus.join(' ');
  return url = "".concat(endpoint, "/category_facet$shop:Shop?keyword=").concat(keywords, "&rows=").concat(rows, "&isocode=").concat(isocode, "&multiselect=true&page=1&sort=most-relevant");
};

var getItemDetails = /*#__PURE__*/function () {
  var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(endpoint, lineItems, setError, isocode) {
    var url, response, responseBody;
    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = buildSearchURL(endpoint, lineItems, isocode);
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

  return function getItemDetails(_x8, _x9, _x10, _x11) {
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

      return react_default.a.createElement("div", {
        className: "cmp-sku-list__container"
      }, react_default.a.createElement("div", {
        className: "cmp-sku-list__right"
      }, react_default.a.createElement("img", {
        src: relatedSku.thumbnail,
        alt: relatedSku.title,
        "data-locator": "product-image"
      })), react_default.a.createElement("div", {
        className: "cmp-sku-list__left"
      }, react_default.a.createElement("div", {
        className: "cmp-sku-list__code",
        "data-locator": "product-number"
      }, skuConfig.skuInfo.partNumberLabel + " " + relatedSku.materialNumber), relatedSku.url && react_default.a.createElement("a", {
        href: relatedSku.url
      }, react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title)), !relatedSku.url && react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title), react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo"
      }, react_default.a.createElement("div", {
        className: "cmp-sku-list__priceinfo"
      }, react_default.a.createElement("div", {
        className: "cmp-sku__price",
        "data-locator": "sku-price"
      }, relatedSku.unitPrice)), react_default.a.createElement("div", {
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
      var deliveryStatus = "Open";
      var shippedDate = _this.props.data[0].shippedDate;

      if (shippedDate !== "" && shippedDate !== "0000-00-00") {
        deliveryStatus = "Complete";
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
          data = _this$props.data,
          totalItemsOrdered = _this$props.totalItemsOrdered;
      return react_default.a.createElement("div", {
        className: "order-shipment"
      }, react_default.a.createElement("div", {
        className: "order-shipment-header"
      }, react_default.a.createElement("div", {
        className: "order-shipment-header__left"
      }, totalShipments > 1 && react_default.a.createElement("div", {
        className: "order-shipment-header__shipment-count"
      }, shipment.shipmentText + " " + shipmentNumber), react_default.a.createElement("div", {
        className: "order-shipment-header__item-count"
      }, this.renderItemCount(totalItemsOrdered, shipment))), react_default.a.createElement("div", {
        className: "order-shipment-header__right"
      }, react_default.a.createElement(delivery_status, {
        status: this.ifShipped(),
        labels: shipment,
        icons: icons,
        shipped: this.orderShipped()
      }))), react_default.a.createElement("div", {
        className: ""
      }, this.props.data.map(function (record, index) {
        return react_default.a.createElement(details_list_item, {
          key: index,
          relatedSku: record,
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
  totalShipments: 1
};
/* harmony default export */ var components_shipment = (shipment_Shipment);
// EXTERNAL MODULE: ./src/utils/get-isocode/index.js
var get_isocode = __webpack_require__(491);

// EXTERNAL MODULE: ./src/utils/group-by/index.js
var group_by = __webpack_require__(492);

// EXTERNAL MODULE: ./src/search/ErrorBoundary.js
var ErrorBoundary = __webpack_require__(49);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(11);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(53);

// EXTERNAL MODULE: ./src/sku-details/services/index.js
var services = __webpack_require__(508);

// EXTERNAL MODULE: ./src/stores/localStore.js
var stores_localStore = __webpack_require__(109);

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
        shipments.push(react_default.a.createElement(components_shipment, {
          data: values,
          shipment: _this.props.config.shipment,
          icons: _this.props.config.icons,
          shipmentNumber: i + 1,
          totalShipments: Object.keys(airbills).length,
          addToCartReorder: _this.addToCartReorder,
          totalItemsOrdered: orderDetails.totalItemsOrdered
        }));
      }

      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("hr", {
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
          var addressArray = Object(userFunctions["n" /* getOrderDetailsAddress */])(account, includeCountryName);
          return react_default.a.createElement(react_default.a.Fragment, null, addressArray.map(function (addressLine) {
            return react_default.a.createElement("div", {
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
      return react_default.a.createElement("a", {
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
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__container")
      }, react_default.a.createElement("h2", {
        className: "".concat(_this.rootStyle, "__title"),
        "data-locator": "product-title"
      }, config.orderDetails), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-info")
      }, react_default.a.createElement("h3", {
        className: "".concat(_this.rootStyle, "__order-number"),
        "data-locator": "product-number"
      }, config.numberLabel + ": " + orderDetails.orderNumber), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-date"),
        "data-locator": "order-date"
      }, date_formatter["a" /* default */].dateFormatter(orderDetails.date, userLocale)), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__address-container")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__ship-to"),
        "data-locator": "ship-to"
      }, react_default.a.createElement("h4", null, config.shipTo), _this.renderAddress("shipping")), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__bill-to"),
        "data-locator": "bill-to"
      }, react_default.a.createElement("h4", null, config.billTo), _this.renderAddress("billing"))), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-container")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-method"),
        "data-locator": "payment-method"
      }, react_default.a.createElement("h4", null, config.paymentMethod), orderDetails.ccNum && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.creditCard.icon
      }), react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.creditCard.label)), !orderDetails.ccNum && orderDetails.purchaseOrderNumber && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.purchaseOrder.icon
      }), react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.purchaseOrder.label, ": ", orderDetails.purchaseOrderNumber))))), react_default.a.createElement("div", {
        className: "cmp-order-details__order-summary",
        "data-locator": "order-summary"
      }, react_default.a.createElement("h4", null, config.summaryTitle), react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal"
      }, react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_left",
        "data-locator": "order-summary-label-sub-total"
      }, config.subTotal, " ", _this.renderItemCount()), react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_right",
        "data-locator": "order-summary-price-sub-total"
      }, orderDetails.itemsSubTotal)), notZeroDiscountFlag && react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings"
      }, react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_left",
        "data-locator": "order-summary-label-total-discount"
      }, config.savings), react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_right",
        "data-locator": "order-summary-price-total-discount"
      }, _this.props.config.minusSign, orderDetails.orderDiscount)), react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping"
      }, react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_left",
        "data-locator": "order-summary-label-total-shipping-handling"
      }, config.shipping), react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_right",
        "data-locator": "order-summary-price-total-shipping-handling"
      }, orderDetails.shippingAmount)), react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax"
      }, react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_left",
        "data-locator": "order-summary-label-estimated-tax"
      }, config.tax), react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_right",
        "data-locator": "order-summary-price-estimated-tax"
      }, orderDetails.taxAmount)), react_default.a.createElement("div", {
        className: "cmp-order-details__order-total"
      }, react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_left",
        "data-locator": "order-summary-label-total-price"
      }, config.totalLabel), react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_right",
        "data-locator": "order-summary-price-total-price"
      }, react_default.a.createElement("h1", null, orderDetails.orderTotal))), _this.state.isCommerceApiMigrated && react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__reorder"),
        "data-locator": "order-details-reorder"
      }, _this.renderReorderButton()))));
    };

    _this.renderNotFoundError = function () {
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__no-results"),
        "data-locator": "order-details-no-results"
      }, react_default.a.createElement("p", null, _this.props.config.resultNotFoundErrorTitle)));
    };

    _this.renderOrderShipmentList = function () {
      var _this$state3 = _this.state,
          airbills = _this$state3.airbills,
          orderDetails = _this$state3.orderDetails;
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipment-list"),
        "data-locator": "order-shipment-list"
      }, Object.keys(airbills).length > 0 && _this.getShipmentList(airbills, orderDetails)), _this.state.isCommerceApiMigrated && react_default.a.createElement("div", {
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
                      var countryName = Object(userFunctions["f" /* getCountryName */])(account.country, _this2.config);
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
      return react_default.a.createElement(react_default.a.Fragment, null, isLoading && react_default.a.createElement(spinner["a" /* default */], {
        loading: isLoading
      }), !isLoading && errorOrderNotFound && this.renderNotFoundError(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList(), react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.modalShown,
        onClose: this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.modalConfig.title,
        icon: this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), react_default.a.createElement(addToCartModal["default"], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return OrderDetails;
}(react["Component"]);

var order_details_ErrorBoundaryOrderDetails = function ErrorBoundaryOrderDetails(props) {
  return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(order_details_OrderDetails, props));
};


/* harmony default export */ var order_details = (order_details_ErrorBoundaryOrderDetails);
// CONCATENATED MODULE: ./src/history/components/quote-list-item.js












var getShipmentStatus = function getShipmentStatus(data, index) {
  var status = data;

  if (index == 1) {
    status = "Expired";
  }

  if (index == 2) {
    status = "Order Placed";
  }

  return status;
};

var quote_list_item_QuoteListItem = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(QuoteListItem, _Component);

  function QuoteListItem(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, QuoteListItem);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(QuoteListItem).call(this, props));

    _this.renderQuoteAgainButton = function () {
      return react_default.a.createElement("a", {
        className: "cmp-button",
        href: "/#"
      }, _this.props.quoteAgainTitle);
    };

    _this.userLocale = get_locale["a" /* default */].getLocale();
    return _this;
  }

  Object(createClass["a" /* default */])(QuoteListItem, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var deliveryStatus = getShipmentStatus(this.props.data.deliveryStatus, this.props.index);
      return react_default.a.createElement("div", {
        className: "cmp-order-list__container"
      }, react_default.a.createElement("div", {
        className: "cmp-order-list__left"
      }, react_default.a.createElement("div", {
        className: "cmp-order-list__order-number"
      }, react_default.a.createElement("a", {
        href: '#quotedetails?id=' + this.props.data.orderNumber,
        onClick: function onClick() {
          return Object(analytics["f" /* setClickAnalytics */])("Quote History", "Quote Details, " + _this2.props.data.orderNumber, '#quotedetails?id=' + _this2.props.data.orderNumber);
        },
        "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(this.props.numberText, " ").concat(this.props.data.orderNumber))
      }, this.props.numberText + " " + this.props.data.orderNumber)), react_default.a.createElement("div", {
        className: "cmp-order-list__date",
        "data-locator": "order-list-date"
      }, date_formatter["a" /* default */].dateFormatter(this.props.data.date, this.userLocale))), react_default.a.createElement("div", {
        className: "cmp-order-list__right",
        "data-locator": "order-list-right"
      }, react_default.a.createElement("hr", {
        className: "cmp-order-list_hr"
      }), react_default.a.createElement(delivery_status, {
        status: deliveryStatus,
        labels: this.props.shipment,
        icons: this.props.icons
      })), react_default.a.createElement("div", {
        className: "cmp-order-list__total cmp-order-list__left",
        "data-locator": "order-list-total"
      }, this.props.data.orderTotal), this.props.index == 1 && react_default.a.createElement("div", {
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
                return HistoryServiceObj.getQuoteListPost(fetchEndPoint, fromDate, poNumber, orderNumber, _this.setError);

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
      var _ref2 = _this.props.configs || {},
          _ref2$tabs = _ref2.tabs,
          tabs = _ref2$tabs === void 0 ? [] : _ref2$tabs,
          _ref2$blankItemTabs = _ref2.blankItemTabs,
          blankItemTabs = _ref2$blankItemTabs === void 0 ? [] : _ref2$blankItemTabs;

      var currentTabs = _this.state.noResults ? blankItemTabs : tabs;
      return react_default.a.createElement(navigation_tabs["a" /* default */], {
        className: "cmp-search__categories-tabs",
        items: currentTabs,
        activeIndex: _this.state.activeIndex,
        onClick: function onClick(e) {
          return _this.handleCategorySelected(e);
        },
        enableFading: true
      });
    };

    _this.renderDropDowns = function () {
      return react_default.a.createElement("div", {
        className: "cmp-order-list__dropdowns"
      }, react_default.a.createElement(filter_dropdown, {
        onChange: function onChange(e) {
          return _this.handleCategorySelected(e);
        },
        dropdownfilters: _this.props.configs.dropdownfilters
      }), react_default.a.createElement(time_period_dropdown, {
        onChange: function onChange(e) {
          return _this.timePeriodHandler(e);
        },
        timePeriod: _this.props.configs.timeperiod
      }));
    };

    _this.renderCountHeader = function () {
      return react_default.a.createElement(count_header, {
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
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "cmp-order-list__no-results"
      }, react_default.a.createElement("p", {
        "data-locator": "no-results"
      }, _this.props.configs.noResultsFoundText), react_default.a.createElement("p", null, react_default.a.createElement("a", {
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

      // 0 = All Quotes, 1 = Open Quotes, 2 = Closed Quotes
      var tabId;
      var activeTabFilter = "All";
      e.value || e.value === 0 ? tabId = e.value : tabId = e;

      if (tabId === 1) {
        activeTabFilter = "Open";
      } else if (tabId === 2) {
        activeTabFilter = "Closed";
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
      Object(analytics["g" /* setSelectDropdownAnalytics */])(timePeriod, "".concat(this.page.title, " ").concat(timePeriodOptions[selectedTimeframe - 1]));

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
        var previousIcon = react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.previousIcon
        });
        var nextIcon = react_default.a.createElement(react_svg["a" /* default */], {
          src: this.paginationDefaults.nextIcon
        });
        return react_default.a.createElement(react_paginate_default.a, {
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
        return react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return react_default.a.createElement(react_default.a.Fragment, null, this.state.loading ? react_default.a.createElement(spinner["a" /* default */], {
        loading: this.state.loading
      }) : null, !this.state.loading && react_default.a.createElement(react_default.a.Fragment, null, this.renderTabs(), react_default.a.createElement("div", {
        className: "cmp-order-list__header clearfix",
        "data-locator": "order-list-header-clearfix"
      }, !this.state.noResults && this.renderDropDowns(), this.renderCountHeader()), this.state.noResults && this.renderNoResults(), this.state.listCount > 0 && this.renderPaginatedResults().map(function (item, index) {
        return react_default.a.createElement(quote_list_item, {
          data: item,
          numberText: _this5.props.configs.numberText,
          itemsText: _this5.props.configs.itemsText,
          shipment: _this5.props.configs.shipment,
          icons: _this5.props.configs.icons,
          quoteAgainTitle: _this5.props.configs.quoteAgainTitle,
          index: index
        });
      }), this.state.listCount > 0 && this.renderPagination()));
    }
  }]);

  return QuoteHistory;
}(react["Component"]);

/* harmony default export */ var quote_history = (quote_history_QuoteHistory);
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
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */]['quoteDetails'].name, model);
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

    _this.getShipmentList = function (airbills, quoteDetails) {
      var shipments = [];

      for (var i = 0; i < Object.keys(airbills).length; i++) {
        var values = Object.values(airbills)[i];
        shipments.push(react_default.a.createElement(components_shipment, {
          data: values,
          shipment: _this.props.config.shipment,
          icons: _this.props.config.icons,
          shipmentNumber: i + 1,
          totalShipments: Object.keys(airbills).length,
          addToCartReorder: _this.addToCartReorder,
          totalItemsOrdered: quoteDetails.totalItemsOrdered
        }));
      }

      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("hr", {
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
        }
      })["catch"](function (err) {
        _this.toggleModal();

        _this.setState({
          errorServiceError: false
        });
      });
    };

    _this.config = document.getElementById('json-config--cmp-detail-tiles--personal') ? JSON.parse(document.getElementById('json-config--cmp-detail-tiles--personal').innerHTML) : '';

    _this.renderAddress = function (addressType) {
      var quoteDetails = _this.state.quoteDetails;

      if (quoteDetails.account) {
        var account = quoteDetails.account.filter(function (item) {
          return item.partnerType === addressType;
        })[0];

        if (account) {
          var includeCountryName = true;
          var addressArray = Object(userFunctions["n" /* getOrderDetailsAddress */])(account, includeCountryName);
          return react_default.a.createElement(react_default.a.Fragment, null, addressArray.map(function (addressLine) {
            return react_default.a.createElement("div", {
              className: "".concat(_this.rootStyle, "-address1"),
              "data-locator": "order-details-address"
            }, addressLine);
          }));
        }
      }

      return null;
    };

    _this.renderItemCount = function () {
      var quoteDetails = _this.state.quoteDetails;
      var label = "";

      if (quoteDetails && quoteDetails.totalItemsOrdered) {
        if (parseInt(quoteDetails.totalItemsOrdered) > 1) {
          label = _this.props.config.items;
        } else if (parseInt(quoteDetails.totalItemsOrdered) === 1) {
          label = _this.props.config.item;
        }

        var itemCountLabel = " (" + quoteDetails.totalItemsOrdered + " " + label + ")";
        return itemCountLabel;
      } else {
        return label;
      }
    };

    _this.renderReorderButton = function () {
      return react_default.a.createElement("a", {
        className: "cmp-button",
        href: "/#"
      }, _this.props.config.reorderTitle);
    };

    _this.renderDetailsSection = function () {
      var _this$state2 = _this.state,
          quoteDetails = _this$state2.quoteDetails,
          userLocale = _this$state2.userLocale;
      var config = _this.props.config;
      var notZeroDiscountFlag = parseFloat(quoteDetails.orderDiscountValue) !== 0 ? true : false;
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__container")
      }, react_default.a.createElement("h2", {
        className: "".concat(_this.rootStyle, "__title"),
        "data-locator": "product-title"
      }, config.quoteDetails), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-info")
      }, react_default.a.createElement("h3", {
        className: "".concat(_this.rootStyle, "__order-number"),
        "data-locator": "product-number"
      }, config.numberLabel + ": " + quoteDetails.orderNumber), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-date"),
        "data-locator": "order-date"
      }, date_formatter["a" /* default */].dateFormatter(quoteDetails.date, userLocale)), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__address-container")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__ship-to"),
        "data-locator": "ship-to"
      }, react_default.a.createElement("h4", null, config.shipTo), _this.renderAddress("shipping")), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__bill-to"),
        "data-locator": "bill-to"
      }, react_default.a.createElement("h4", null, config.billTo), _this.renderAddress("billing"))), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-container")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__payment-method"),
        "data-locator": "payment-method"
      }, react_default.a.createElement("h4", null, config.paymentMethod), quoteDetails.ccNum && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.creditCard.icon
      }), react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.creditCard.label)), !quoteDetails.ccNum && quoteDetails.purchaseOrderNumber && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_svg["a" /* default */], {
        src: config.paymentType.purchaseOrder.icon
      }), react_default.a.createElement("div", {
        className: "text"
      }, config.paymentType.purchaseOrder.label, ": ", quoteDetails.purchaseOrderNumber))))), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-summary"),
        "data-locator": "order-summary"
      }, react_default.a.createElement("h4", null, config.summaryTitle), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal_left"),
        "data-locator": "order-subtotal-left"
      }, config.subTotal, " ", _this.renderItemCount()), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-subtotal_right"),
        "data-locator": "order-subtotal-right"
      }, quoteDetails.itemsSubTotal)), notZeroDiscountFlag && react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings_left"),
        "data-locator": "order-savings-left"
      }, config.savings), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-savings_right"),
        "data-locator": "order-savings-right"
      }, config.minusSign, quoteDetails.orderDiscount)), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping_left"),
        "data-locator": "order-shipping-left"
      }, config.shipping), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-shipping_right"),
        "data-locator": "order-shipping-right"
      }, quoteDetails.shippingAmount)), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax_left"),
        "data-locator": "order-tax-left"
      }, config.tax), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-tax_right"),
        "data-locator": "order-tax-right"
      }, quoteDetails.taxAmount)), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total")
      }, react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total_left"),
        "data-locator": "order-total-left"
      }, config.totalLabel), react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__order-total_right"),
        "data-locator": "order-total-right"
      }, react_default.a.createElement("h1", null, quoteDetails.orderTotal))), _this.state.isCommerceApiMigrated && react_default.a.createElement("div", {
        className: "".concat(_this.rootStyle, "__reorder"),
        "data-locator": "order-details-reorder"
      }, _this.renderReorderButton()))));
    };

    _this.renderNotFoundError = function () {
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "cmp-order-details__no-results",
        "data-locator": "order-details-no-results"
      }, react_default.a.createElement("p", null, _this.props.config.resultNotFoundErrorTitle)));
    };

    _this.renderOrderShipmentList = function () {
      var _this$state3 = _this.state,
          airbills = _this$state3.airbills,
          quoteDetails = _this$state3.quoteDetails;
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipment-list",
        "data-locator": "order-shipment-list"
      }, Object.keys(airbills).length > 0 && _this.getShipmentList(airbills, quoteDetails)), _this.state.isCommerceApiMigrated && react_default.a.createElement("div", {
        className: "order-shipment__reorder",
        "data-locator": "order-shipment-reorder"
      }, _this.renderReorderButton()));
    };

    _this.state = {
      quoteId: _this.getUrlParameter("id"),
      userLocale: get_locale["a" /* default */].getLocale(),
      userIsocode: get_isocode["a" /* default */].getIsocode(),
      detailsUrl: props.config.fetchDetailsEndPoint,
      itemsUrl: props.config.fetchItemsEndPoint,
      reorderUrl: props.config.fetchReorderUrlEndPoint,
      quoteDetails: {},
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

  Object(createClass["a" /* default */])(QuoteDetails, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var _this2 = this;

        var commerceConfig, buttons, updatedModalConfig, _this$state4, detailsUrl, itemsUrl, quoteId, userIsocode;

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

                _this$state4 = this.state, detailsUrl = _this$state4.detailsUrl, itemsUrl = _this$state4.itemsUrl, quoteId = _this$state4.quoteId, userIsocode = _this$state4.userIsocode;
                getQuoteDetails(detailsUrl, quoteId, this.setError).then(function (data) {
                  if (data && data.account && data.account.length) {
                    // Add Country Names to data
                    data.account.map(function (account) {
                      var countryName = Object(userFunctions["f" /* getCountryName */])(account.country, _this2.config);
                      account.countryName = countryName;
                      account.state = account.region;
                    });

                    _this2.setState({
                      isLoading: false,
                      quoteDetails: data
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
      return react_default.a.createElement(react_default.a.Fragment, null, isLoading && react_default.a.createElement(spinner["a" /* default */], {
        loading: isLoading
      }), !isLoading && errorOrderNotFound && this.renderNotFoundError(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderDetailsSection(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList(), react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.modalShown,
        onClose: this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.modalConfig.title,
        icon: this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), react_default.a.createElement(addToCartModal["default"], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return QuoteDetails;
}(react["Component"]);

var quote_details_ErrorBoundaryQuoteDetails = function ErrorBoundaryQuoteDetails(props) {
  return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(quote_details_QuoteDetails, props));
};


/* harmony default export */ var quote_details = (quote_details_ErrorBoundaryQuoteDetails);
// CONCATENATED MODULE: ./src/my-account/index.js












var my_account_MyAccountRouter = function MyAccountRouter(props) {
  return react_default.a.createElement(HashRouter["a" /* default */], {
    hashType: "noslash"
  }, react_default.a.createElement(Switch["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.myAccount.path
  }, react_default.a.createElement(myaccount, props)), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.profile.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(my_profile, {
    configs: props.myProfile
  }))), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.changePassword.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(change_password, {
    configId: props.changePassword.config,
    configs: props.myProfile
  }))), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.orderHistory.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(order_history, {
    configs: props.orderHistory
  }))), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.orderDetails.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(order_details, {
    config: props.orderDetails
  }))), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.quoteHistory.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(quote_history, {
    configs: props.quoteHistory
  }))), react_default.a.createElement(Route["a" /* default */], {
    exact: true,
    path: routes.quoteDetails.path
  }, react_default.a.createElement(aside, {
    tiles: props.tiles,
    breadcrumbs: props.breadcrumbs
  }, react_default.a.createElement(quote_details, {
    config: props.quoteDetails
  })))));
};

/* harmony default export */ var my_account = __webpack_exports__["default"] = (my_account_MyAccountRouter);

/***/ })

}]);