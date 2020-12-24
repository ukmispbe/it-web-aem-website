/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		3: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([493,1,2,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f6f8f9","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 14:
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
var slicedToArray = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js + 1 modules
var inlineSVG = __webpack_require__(58);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(21);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(15);

// EXTERNAL MODULE: ./src/stores/cookieStore.js
var cookieStore = __webpack_require__(52);

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

/***/ 143:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return parameterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parameterDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return searchMapper; });
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);








var queryString = __webpack_require__(30);

var parameterValues = {
  undefined: 'undefined',
  sort: {
    mostRecent: 'most-recent',
    mostRelevant: 'most-relevant'
  }
};
var parameterDefaults = {
  page: 1,
  rows: 25,
  keyword: '*:*',
  category: '',
  content_type: '',
  sort: parameterValues.sort.mostRecent,
  selectedFacets: {},
  contentTypeSelected: {}
};

var SearchService = /*#__PURE__*/function () {
  function SearchService(isocode) {
    var _this = this;

    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://stgservices.waters.com/api/waters/search';

    var _page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : parameterDefaults.page;

    var _rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : parameterDefaults.rows;

    var _sort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : parameterDefaults.sort;

    var multiselect = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var throwError = arguments.length > 6 ? arguments[6] : undefined;

    Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, SearchService);

    this.getCategories = function (_ref) {
      var _ref$keyword = _ref.keyword,
          keyword = _ref$keyword === void 0 ? parameterDefaults.keyword : _ref$keyword,
          _ref$page = _ref.page,
          page = _ref$page === void 0 ? parameterDefaults.page : _ref$page,
          _ref$sort = _ref.sort,
          sort = _ref$sort === void 0 ? parameterDefaults.sort : _ref$sort;

      var paramString = _this.getQueryParamString({
        keyword: keyword,
        page: page,
        sort: sort
      });

      var searchString = "".concat(_this.path, "?").concat(paramString);
      return window.fetch(searchString).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          _this.throwError(response);
        }
      })["catch"](function (err) {
        return console.log(err);
      });
    };

    this.getResultsByCategory = function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$keyword = _ref2.keyword,
          keyword = _ref2$keyword === void 0 ? parameterDefaults.keyword : _ref2$keyword,
          _ref2$facets = _ref2.facets,
          facets = _ref2$facets === void 0 ? {} : _ref2$facets,
          _ref2$page = _ref2.page,
          page = _ref2$page === void 0 ? parameterDefaults.page : _ref2$page,
          _ref2$sort = _ref2.sort,
          sort = _ref2$sort === void 0 ? parameterDefaults.sort : _ref2$sort,
          _ref2$category = _ref2.category,
          category = _ref2$category === void 0 ? parameterDefaults.category : _ref2$category;

      var paramString = _this.getQueryParamString({
        keyword: keyword,
        page: page,
        sort: sort
      });

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "?").concat(paramString).concat(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCategoryReferenceType */ "e"])());

      if (category === "All") {
        searchString = "".concat(_this.path, "?").concat(paramString);
      }

      return window.fetch(searchString).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          _this.throwError(response);
        }
      })["catch"](function (err) {
        return console.log(err);
      });
    };

    this.getContentType = function (contentTypeKey, contentTypeValue) {
      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$keyword = _ref3.keyword,
          keyword = _ref3$keyword === void 0 ? parameterDefaults.keyword : _ref3$keyword,
          _ref3$facets = _ref3.facets,
          facets = _ref3$facets === void 0 ? {} : _ref3$facets,
          _ref3$page = _ref3.page,
          page = _ref3$page === void 0 ? parameterDefaults.page : _ref3$page,
          _ref3$sort = _ref3.sort,
          sort = _ref3$sort === void 0 ? parameterDefaults.sort : _ref3$sort,
          _ref3$category = _ref3.category,
          category = _ref3$category === void 0 ? parameterDefaults.category : _ref3$category;

      var paramString = _this.getQueryParamString({
        keyword: keyword,
        page: page,
        sort: sort
      });

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "&contenttype_facet$").concat(contentTypeKey, ":").concat(encodeURIComponent(encodeURIComponent(contentTypeValue)), "?").concat(paramString).concat(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCategoryReferenceType */ "e"])());
      return window.fetch(searchString).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          _this.throwError(response);

          return response;
        }
      });
    };

    this.getSubFacet = function (contentTypeName, contentTypeValue) {
      var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref4$keyword = _ref4.keyword,
          keyword = _ref4$keyword === void 0 ? parameterDefaults.keyword : _ref4$keyword,
          _ref4$facets = _ref4.facets,
          facets = _ref4$facets === void 0 ? {} : _ref4$facets,
          _ref4$page = _ref4.page,
          page = _ref4$page === void 0 ? parameterDefaults.page : _ref4$page,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? parameterDefaults.sort : _ref4$sort,
          _ref4$category = _ref4.category,
          category = _ref4$category === void 0 ? parameterDefaults.category : _ref4$category;

      var paramString = _this.getQueryParamString({
        keyword: keyword,
        page: page,
        sort: sort
      });

      var facetString = _this.getQueryFacetString(facets);

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "&contenttype_facet$").concat(contentTypeName.replace('_facet', ''), ":").concat(encodeURIComponent(encodeURIComponent(contentTypeValue))).concat(facetString, "?").concat(paramString).concat(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCategoryReferenceType */ "e"])());
      return window.fetch(searchString).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          _this.throwError(response);

          return response;
        }
      });
    };

    this.getSuggestedKeywords = /*#__PURE__*/function () {
      var _ref5 = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(rows, term) {
        var searchString, callService, response;
        return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                searchString = "".concat(_this.path, "/v1/autocomplete?term=").concat(term, "&rows=").concat(rows, "&isocode=").concat(_this.options.isocode).concat(Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_6__[/* getCategoryReferenceType */ "e"])());
                callService = window.fetch(searchString).then(function (response) {
                  if (response.ok) {
                    return response.json();
                  } else {
                    _this.throwError(response);

                    return response.json();
                  }
                });
                _context.next = 4;
                return callService;

              case 4:
                response = _context.sent;
                return _context.abrupt("return", response.suggestions);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref5.apply(this, arguments);
      };
    }();

    this.getUrlParameter = function (sParam, sPageURL) {
      var sURLVariables = sPageURL.split('&');

      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
    };

    this.mapFacetGroupsToArray = function (facetParam) {
      if (Array.isArray(facetParam)) {
        var facetArray = facetParam.map(function (item) {
          var splitArray = item.split(':');
          return splitArray.length === 2 ? splitArray[0] : '';
        });
        return facetArray.filter(function (item) {
          return item !== '';
        });
      } else if (facetParam) {
        var splitArray = facetParam.split(':');
        return splitArray.length === 2 ? [splitArray[0]] : [];
      }

      return [];
    };

    this.buildParameters = function (searchValue) {
      var keyword = searchValue ? searchValue : parameterDefaults.keyword;
      var sort = keyword === parameterDefaults.keyword ? parameterDefaults.sort : parameterValues.sort.mostRelevant;
      return {
        keyword: keyword,
        sort: sort
      };
    };

    this.stringifyParameters = function (parameters) {
      return Object.keys(parameters).length !== 0 ? Object.keys(parameters).reduce(function (accumulator, currentValue) {
        return "".concat(accumulator, "=").concat(parameters[accumulator], "&").concat(currentValue, "=").concat(parameters[currentValue]);
      }) : '';
    };

    this.setUrlParameter = function (searchTerm, searchPath) {
      var parameters = _this.buildParameters(searchTerm);

      var querystring = _this.stringifyParameters(parameters);

      window.location.href = "".concat(searchPath, "?").concat(querystring);
    };

    this.isDefaultKeyword = function (value) {
      return value === parameterDefaults.keyword;
    };

    this.setStorageForPagePosition = function () {
      var scrolled = (window.pageYOffset || window.document.scrollTop) - (window.document.clientTop || 0);

      _this.sessionStore.setPreviousPagePosition(scrolled);

      _this.sessionStore.setFromSearchURL(window.location.href);
    };

    this.setStorageForTabHistory = function (tabHistory) {
      _this.sessionStore.setSearchTabHistory(tabHistory);
    };

    this.setStorageForPagination = function () {
      var scrolled = (window.pageYOffset || window.document.scrollTop) - (window.document.clientTop || 0);

      _this.sessionStore.setPreviousPaginationClick(scrolled);
    };

    this.getSessionStore = function () {
      var previousPagePosition = _this.sessionStore.getPreviousPagePositionEnabled() ? _this.sessionStore.getPreviousPagePosition() : null;
      return {
        previousPagePosition: previousPagePosition,
        fromSearchURL: _this.sessionStore.getFromSearchURL(),
        searchTabHistory: _this.sessionStore.getSearchTabHistory(),
        previousPaginationClick: _this.sessionStore.getPreviousPaginationClick()
      };
    };

    this.clearSessionStore = function () {
      _this.sessionStore.removePreviousPagePosition();

      _this.sessionStore.removePreviousPagePositionEnabled();

      _this.sessionStore.removeFromSearchURL();

      _this.sessionStore.removeSearchTabHistory();

      _this.sessionStore.removePreviousPaginationClick();
    };

    this.scrollToPosition = function (position) {
      window.scrollTo(0, position);

      _this.sessionStore.removePreviousPagePosition();

      _this.sessionStore.removePreviousPagePositionEnabled();
    };

    this.scrollToTop = function () {
      window.scrollTo(0, 0);

      _this.sessionStore.removePreviousPagePositionEnabled();
    };

    this.path = path;
    this.options = {
      isocode: isocode,
      page: _page,
      rows: _rows,
      sort: _sort,
      multiselect: multiselect
    };
    this.throwError = throwError;
    this.sessionStore = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]();
  }

  Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SearchService, [{
    key: "getParamsFromString",
    value: function getParamsFromString() {
      var str = window.location.search;
      var obj = queryString.parse(str);
      obj.selectedFacets = {};

      if (Array.isArray(obj.facet)) {
        for (var i = 0; i < obj.facet.length; i++) {
          var facetSplit = obj.facet[i].split(':');
          var decodedFacetValue = decodeURIComponent(facetSplit[1]);

          if (!obj.selectedFacets[facetSplit[0]]) {
            obj.selectedFacets[facetSplit[0]] = [];
          }

          obj.selectedFacets[facetSplit[0]].push(decodedFacetValue);
        }
      } else {
        if (obj.facet) {
          var _facetSplit = obj.facet.split(':');

          var _decodedFacetValue = decodeURIComponent(_facetSplit[1]);

          if (!obj.selectedFacets[_facetSplit[0]]) {
            obj.selectedFacets[_facetSplit[0]] = [];
          }

          obj.selectedFacets[_facetSplit[0]].push(_decodedFacetValue);
        }
      }

      return obj;
    }
  }, {
    key: "getQueryParamString",
    value: function getQueryParamString() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref6$keyword = _ref6.keyword,
          keyword = _ref6$keyword === void 0 ? parameterDefaults.keyword : _ref6$keyword,
          _ref6$page = _ref6.page,
          page = _ref6$page === void 0 ? parameterDefaults.page : _ref6$page,
          _ref6$sort = _ref6.sort,
          sort = _ref6$sort === void 0 ? parameterDefaults.sort : _ref6$sort,
          _ref6$category = _ref6.category,
          category = _ref6$category === void 0 ? parameterDefaults.category : _ref6$category,
          _ref6$content_type = _ref6.content_type,
          content_type = _ref6$content_type === void 0 ? parameterDefaults.content_type : _ref6$content_type;

      var facets = arguments.length > 1 ? arguments[1] : undefined;
      var fullParams = Object.assign({}, this.options, {
        keyword: keyword,
        page: page,
        sort: sort,
        category: category,
        content_type: content_type
      });
      if (!fullParams.category) delete fullParams.category;
      if (!fullParams.content_type) delete fullParams.content_type;
      var paramString = queryString.stringify(fullParams);

      if (facets) {
        for (var i = 0; i <= Object.keys(facets).length; i++) {
          var key = Object.keys(facets)[i];
          var facet = facets[key];

          if (facet) {
            for (var n = 0; n < facet.length; n++) {
              var f = encodeURIComponent(facet[n]);
              paramString = paramString + "&facet=".concat(key, ":").concat(encodeURI(f));
            }
          }
        }
      }

      return paramString;
    }
  }, {
    key: "getQueryFacetString",
    value: function getQueryFacetString(facets) {
      var facetString = '';

      for (var i = 0; i <= Object.keys(facets).length; i++) {
        var facetName = Object.keys(facets)[i];
        var category = facetName ? "".concat(facetName, "$").concat(facetName.replace('_facet', '')) : null;
        var facet = facets[facetName];

        if (facet && category) {
          if (i === 0) {
            facetString = facetString + "&".concat(category, ":");
          } else {
            facetString = facetString + "&".concat(category, ":");
          }

          for (var f = 0; f <= facet.length; f++) {
            var filter = facet[f];

            if (filter) {
              facetString = filter ? facetString + "".concat(f > 0 ? encodeURIComponent('||') : '').concat(encodeURIComponent(encodeURIComponent(filter))) : facetString;
            }
          }
        } else if (category) {
          facetString = facetString + "&".concat(category, ":");
        }
      }

      return facetString;
    }
  }, {
    key: "createQueryObject",
    value: function createQueryObject(params) {
      var obj = {};
      obj['keyword'] = params.keyword;
      obj['page'] = params.page || parameterDefaults.page;
      obj['facets'] = {};
      obj['sort'] = params.sort;
      if (params.category) obj['category'] = params.category;
      if (params.content_type) obj['content_type'] = params.content_type;

      if (params.facet) {
        var facets = params.facet;

        if (Array.isArray(facets)) {
          for (var n = 0; n <= facets.length; n++) {
            var facet = facets[n];

            if (facet) {
              var splitName = facet.split(':');

              if (Array.isArray(obj['facets'][splitName[0]])) {
                obj['facets'][splitName[0]].push(decodeURIComponent(splitName[1]));
              } else {
                obj['facets'][splitName[0]] = [decodeURIComponent(splitName[1])];
              }
            }
          }
        } else if (facets) {
          var _splitName = facets.split(':');

          obj['facets'][_splitName[0]] = [decodeURIComponent(_splitName[1])];
        }
      }

      return obj;
    }
  }]);

  return SearchService;
}();

var searchMapper = {
  mapFacetGroups: function mapFacetGroups(contentType, filterMap, facets) {
    var facetName = "".concat(contentType, "_facet");
    var facet = Array.isArray(filterMap.orderedFacets) ? filterMap.orderedFacets.find(function (item) {
      return item.facetName === facetName;
    }) : null;

    if (!facet) {
      return;
    }

    var orderedFacets = facet.orderedFacets.filter(function (item) {
      return facets[item.facetName];
    });
    var mapping = orderedFacets.map(function (facet) {
      return {
        name: facet.facetName,
        category: facet.facetValue,
        translation: facet.facetTranslation,
        facets: facets[facet.facetName],
        isExpanded: false
      };
    });
    return mapping;
  }
};


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _scripts_dateRange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(237);



var basePath = "/bin/waters/";
var ServletService = {
  getSystemWideNotification: function () {
    var _getSystemWideNotification = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(language) {
      var _this = this;

      return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.fetchSystemWideNotification(language).then(function (data) {
                return _this.mapSystemWideNotification(data);
              })["catch"](function (error) {
                return {
                  enabled: false,
                  title: error.message
                };
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getSystemWideNotification(_x) {
      return _getSystemWideNotification.apply(this, arguments);
    }

    return getSystemWideNotification;
  }(),
  fetchSystemWideNotification: function () {
    var _fetchSystemWideNotification = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(language) {
      return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", fetch("".concat(basePath, "notifications.").concat(language, ".json")).then(function (response) {
                return response.json();
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function fetchSystemWideNotification(_x2) {
      return _fetchSystemWideNotification.apply(this, arguments);
    }

    return fetchSystemWideNotification;
  }(),
  mapSystemWideNotification: function mapSystemWideNotification(data) {
    return {
      enabled: data.message ? true : false,
      title: data.title,
      message: data.message,
      dateRange: new _scripts_dateRange__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"](data.onTime, data.offTime)
    };
  }
};
/* harmony default export */ __webpack_exports__["a"] = (ServletService);

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(13);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(21);

// CONCATENATED MODULE: ./src/json-script-blocks/globalTranslations.js
var script = document.getElementById('global-translations-json');
var innerHtml = script ? script.innerHTML : '';
var GlobalTranslations = innerHtml ? JSON.parse(innerHtml) : {};
/* harmony default export */ var globalTranslations = (GlobalTranslations);
// CONCATENATED MODULE: ./src/element-creators/systemWideNotification.js





var systemWideNotification_SystemWideNotification = function SystemWideNotification(service, onDismiss) {
  var data;

  this.create = /*#__PURE__*/function () {
    var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(time) {
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return service.getSystemWideNotification(DigitalData["a" /* default */].language);

            case 2:
              data = _context.sent;

              if (!(!data.enabled || !data.dateRange.isValid(time))) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", {
                visible: false
              });

            case 5:
              return _context.abrupt("return", {
                visible: true,
                element: createFullWidthContainer()
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  function createFullWidthContainer() {
    var element = document.createElement('div');
    element.classList.add('container-sitewide-notification');
    element.appendChild(createPageContainer());
    return element;
  }

  function createPageContainer() {
    var element = document.createElement('div');
    element.classList.add('container');
    element.appendChild(createWrapper());
    return element;
  }

  function createWrapper() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification--sitewide');
    element.appendChild(createIcon());
    element.appendChild(createBody());
    return element;
  }

  function createIcon() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification-icon');
    var icon = document.createElement('img');
    icon.src = '/content/dam/waters/en/brand-assets/icons/attention.svg';
    icon.classList.add('inline-svg');
    element.appendChild(icon);
    return element;
  }

  function createBody() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification-body');
    element.appendChild(createTitle());
    element.appendChild(createMessage());
    element.appendChild(createDismiss());
    return element;
  }

  function createTitle() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification-title');
    element.innerHTML = data.title;
    return element;
  }

  function createMessage() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification-description');
    element.innerHTML = data.message;
    return element;
  }

  function createDismiss() {
    var element = document.createElement('div');
    element.classList.add('cmp-notification-dismiss');
    var anchor = document.createElement('a');
    anchor.href = 'javascript:void(0)';
    anchor.innerHTML = globalTranslations.dismissButton;
    anchor.onclick = onDismiss;
    element.appendChild(anchor);
    return element;
  }
};

/* harmony default export */ var systemWideNotification = __webpack_exports__["a"] = (systemWideNotification_SystemWideNotification);

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);
/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);






var keys = {
  AddToCartPrefix: 'cmp-atc-modal',
  InfoTextWrapper: "cmp-atc-modal__information",
  TextHeading: "cmp-atc-modal__information-header",
  Text: "cmp-atc-modal__information-text",
  ErrorText: "cmp-atc-modal__information-text error",
  ButtonWrapper: 'cmp-atc-modal__btn',
  AltButton: "cmp-button cmp-atc-modal__btn-alt",
  MainButton: "cmp-button cmp-atc-modal__btn-main",
  FullWidthButton: "cmp-button--fullWidth"
};

var AddToCartModalBody = function AddToCartModalBody(props) {
  var errorObjCart = props.errorObjCart;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, props.config)),
      _useState2 = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState, 1),
      state = _useState2[0];

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_utils_modal__WEBPACK_IMPORTED_MODULE_4__[/* useModalApi */ "d"]),
      onClose = _useContext.onClose;

  var text = state.text,
      textHeading = state.textHeading,
      partNumberLabel = state.partNumberLabel,
      buttons = state.buttons,
      isOrderDetails = state.isOrderDetails;

  var InfoTextWrapper = function InfoTextWrapper(props) {
    if (!isOrderDetails) {
      if (!text || !textHeading) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    } else {
      if (!text) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.InfoTextWrapper
    }, props.children);
  };

  var TextHeading = function TextHeading() {
    if (!textHeading) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.TextHeading
    }, partNumberLabel, "\xA0", textHeading);
  };

  var Text = function Text(props) {
    if (!props.text) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: props.className,
      "data-locator": "modal-information-text"
    }, props.text);
  };

  var buttonType = function buttonType(btn) {
    if (btn.action === 'close') {
      if (!onClose) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
        onClick: function onClick() {
          return onClose();
        },
        className: keys.AltButton,
        "data-locator": Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* elementLocator */ "a"])(btn.text),
        "aria-label": btn.text
      }, btn.text);
    } else if (btn.action.indexOf('://') >= 0 || btn.action.indexOf('.com') >= 0) {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", Object.assign({
        href: btn.action,
        className: keys.MainButton,
        target: btn.target || ''
      }, btn.callback && {
        onClick: function onClick(e) {
          return btn.callback(e);
        }
      }, {
        "data-locator": Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* elementLocator */ "a"])(btn.text),
        role: "button",
        "aria-label": btn.text
      }), btn.text);
    }
  };

  var Buttons = function Buttons() {
    if (!buttons) return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.ButtonWrapper
    }, buttons.map(function (btn, index) {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: keys.FullWidthButton,
        key: "modal-btn-".concat(index),
        "data-locator": "modal-btn-".concat(index)
      }, btn.text ? buttonType(btn) : null);
    }));
  };

  var Error = function Error() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InfoTextWrapper, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Text, {
      className: keys.ErrorText,
      text: _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].ErrorMessages(errorObjCart).wereSorry
    }));
  };

  var Body = function Body() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InfoTextWrapper, null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TextHeading, null), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Text, {
      className: keys.Text,
      text: text
    })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Buttons, null));
  };

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, errorObjCart && errorObjCart.ok === false ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, null) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Body, null));
};

AddToCartModalBody.whyDidYouRender = true;
/* harmony default export */ __webpack_exports__["a"] = (AddToCartModalBody);

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f6f8f9","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/scripts/stickyService.js
var stickyService = __webpack_require__(50);

// EXTERNAL MODULE: ./src/scripts/backtotop.js
var backtotop = __webpack_require__(399);

// EXTERNAL MODULE: ./src/scripts/anchor.js
var scripts_anchor = __webpack_require__(400);

// EXTERNAL MODULE: ./src/scripts/sticky-sort-filter.js
var sticky_sort_filter = __webpack_require__(401);

// EXTERNAL MODULE: ./src/scripts/sticky-sku-details.js
var sticky_sku_details = __webpack_require__(402);

// EXTERNAL MODULE: ./src/scripts/sticky-sku-scroll.js
var sticky_sku_scroll = __webpack_require__(403);

// EXTERNAL MODULE: ./src/scripts/mobile-search-scroll.js
var mobile_search_scroll = __webpack_require__(404);

// EXTERNAL MODULE: ./src/scripts/navigation-overlay.js
var navigation_overlay = __webpack_require__(405);

// EXTERNAL MODULE: ./src/scripts/navigation.js
var navigation = __webpack_require__(406);

// EXTERNAL MODULE: ./src/scripts/navigation-level2.js
var navigation_level2 = __webpack_require__(161);

// EXTERNAL MODULE: ./src/scripts/iframe.js
var iframe = __webpack_require__(407);

// EXTERNAL MODULE: ./src/scripts/backtosearch.js
var backtosearch = __webpack_require__(408);

// EXTERNAL MODULE: ./src/scripts/footer.js + 1 modules
var footer = __webpack_require__(494);

// EXTERNAL MODULE: ./src/scripts/banner.js
var banner = __webpack_require__(409);

// EXTERNAL MODULE: ./src/scripts/breadcrumb.js
var breadcrumb = __webpack_require__(410);

// EXTERNAL MODULE: ./src/scripts/header.js
var scripts_header = __webpack_require__(411);

// EXTERNAL MODULE: ./src/scripts/collapsible.js
var collapsible = __webpack_require__(412);

// EXTERNAL MODULE: ./src/scripts/skulist.js
var skulist = __webpack_require__(91);

// EXTERNAL MODULE: ./src/scripts/continueButton.js
var continueButton = __webpack_require__(413);

// EXTERNAL MODULE: ./src/scripts/textModifier.js
var textModifier = __webpack_require__(414);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/assign.js
var object_assign = __webpack_require__(415);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/entries.js
var entries = __webpack_require__(424);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/values.js
var values = __webpack_require__(427);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/keys.js
var keys = __webpack_require__(430);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/get-own-property-names.js
var get_own_property_names = __webpack_require__(433);

// EXTERNAL MODULE: ./node_modules/core-js/features/object/to-string.js
var to_string = __webpack_require__(437);

// EXTERNAL MODULE: ./node_modules/core-js/features/promise/index.js
var promise = __webpack_require__(443);

// EXTERNAL MODULE: ./node_modules/core-js/features/array/find.js
var find = __webpack_require__(465);

// EXTERNAL MODULE: ./node_modules/core-js/features/array/from.js
var from = __webpack_require__(472);

// EXTERNAL MODULE: ./node_modules/core-js/features/string/repeat.js
var repeat = __webpack_require__(477);

// CONCATENATED MODULE: ./src/polyfills.js
// polyfills found here: https://github.com/zloirock/core-js










// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(23);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(19);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(18);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(17);

// EXTERNAL MODULE: ./src/scripts/mobileNav.js
var scripts_mobileNav = __webpack_require__(132);

// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(38);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var stores_sessionStore = __webpack_require__(15);

// CONCATENATED MODULE: ./src/my-account-dropdown/services/index.js





var getData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
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

function signOutRequest(_x2, _x3, _x4) {
  return _signOutRequest.apply(this, arguments);
}

function _signOutRequest() {
  _signOutRequest = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(url, signOutUrl, homepageLink) {
    var sessionStore, response;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sessionStore = new stores_sessionStore["a" /* default */]();
            sessionStore.removeUserDetails();
            sessionStore.removeSoldToDetails();
            _context2.next = 5;
            return getData(url);

          case 5:
            response = _context2.sent;

            //TODO: Remove after MyAccount-R-6.1.0 release
            if (signOutUrl.indexOf('/nextgen') === -1) {
              homepageLink = signOutUrl;
            }

            window.location.href = homepageLink;

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signOutRequest.apply(this, arguments);
}
// EXTERNAL MODULE: ./src/scripts/checkOutStatus.js
var checkOutStatus = __webpack_require__(47);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(14);

// CONCATENATED MODULE: ./src/my-account-dropdown/my-account-user-details.js




var my_account_user_details_renderUserName = function renderUserName(props) {
  return react_default.a.createElement(react_default.a.Fragment, null, props.userName && react_default.a.createElement("div", {
    className: "my-account-dropdown__user-details__name"
  }, props.userName));
};

var my_account_user_details_renderAccountDetails = function renderAccountDetails(props) {
  if (!checkOutStatus["a" /* default */].length && !props.accountName) return react_default.a.createElement(react_default.a.Fragment, null);
  return react_default.a.createElement(react_default.a.Fragment, null, props.accountName && react_default.a.createElement("div", {
    className: "my-account-dropdown__user-details__account"
  }, props.accountName && react_default.a.createElement("span", {
    className: "my-account-dropdown__user-details__account__name"
  }, props.accountName)));
};

var my_account_user_details_renderSwitchAccountLink = function renderSwitchAccountLink(props) {
  if (checkOutStatus["a" /* default */].length < 2) return react_default.a.createElement(react_default.a.Fragment, null);
  return react_default.a.createElement(react_default.a.Fragment, null, props.switchAccount.text && props.switchAccount.url && react_default.a.createElement("a", {
    className: "my-account-dropdown__user-details__switch-account",
    href: props.switchAccount.url + "?fromMenu=true",
    onClick: function onClick() {
      return Object(analytics["f" /* setClickAnalytics */])('Account Dropdown', props.switchAccount.linkName, props.switchAccount.url);
    }
  }, props.switchAccount.text));
};

var my_account_user_details_MyAccountUserDetails = function MyAccountUserDetails(props) {
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
    className: "my-account-dropdown__user-details"
  }, my_account_user_details_renderUserName(props), my_account_user_details_renderAccountDetails(props), my_account_user_details_renderSwitchAccountLink(props)), react_default.a.createElement("hr", {
    className: "my-account-dropdown__hr"
  }));
};

/* harmony default export */ var my_account_user_details = (my_account_user_details_MyAccountUserDetails);
var funcs = {
  renderUserName: my_account_user_details_renderUserName,
  renderAccountDetails: my_account_user_details_renderAccountDetails,
  renderSwitchAccountLink: my_account_user_details_renderSwitchAccountLink
};
// EXTERNAL MODULE: ./src/scripts/ecommerce.js
var ecommerce = __webpack_require__(31);

// CONCATENATED MODULE: ./src/my-account-dropdown/my-account-item-list.js





var MyOrderClass = 'dropdown__item-list__my-orders';

var my_account_item_list_MyAccountItemList = function MyAccountItemList(props) {
  var list = props.itemList;

  var shouldRender = function shouldRender(listItemClass) {
    if (listItemClass == MyOrderClass && ecommerce["a" /* default */].isDisabledState() || listItemClass == MyOrderClass && ecommerce["a" /* default */].isPartialState() && !checkOutStatus["a" /* default */].state()) {
      return false;
    }

    return true;
  };

  var saveUrlToSession = function saveUrlToSession(e, linkName, url) {
    e.preventDefault();
    var store = new stores_sessionStore["a" /* default */]();
    store.setSignInRedirect(url);
    Object(analytics["f" /* setClickAnalytics */])('Account Dropdown', linkName, url);
    window.location.href = url;
  };

  var listItems = Object.keys(list).map(function (key) {
    var text = list[key].text;
    var linkName = list[key].linkName ? list[key].linkName : list[key].text;
    var url = list[key].url;
    var target = list[key].target || '_self';
    var listItemClass = list[key]["class"];
    return react_default.a.createElement("div", {
      key: key,
      className: "my-account-dropdown__item-list",
      "data-locator": "my-account-dropdown-list"
    }, shouldRender(listItemClass) && react_default.a.createElement("a", {
      className: 'my-account-dropdown__item-list--link ' + listItemClass,
      href: url,
      target: target,
      onClick: function onClick(e) {
        return saveUrlToSession(e, linkName, url);
      },
      "data-locator": "my-account-dropdown-list-items"
    }, react_default.a.createElement("span", null, text)));
  });
  return react_default.a.createElement(react_default.a.Fragment, null, listItems, list.length > 0 && react_default.a.createElement("hr", {
    className: "my-account-dropdown__hr"
  }));
};

/* harmony default export */ var my_account_item_list = (my_account_item_list_MyAccountItemList);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(10);

// CONCATENATED MODULE: ./src/my-account-dropdown/my-account-container.js








var my_account_container_keys = {
  MyAccountContainer: 'my-account-dropdown'
};

var my_account_container_MyAccountContainer = function MyAccountContainer(props) {
  var _props$config = props.config,
      createAccount = _props$config.createAccount,
      icon = _props$config.icon,
      itemList = _props$config.itemList,
      notRegistered = _props$config.notRegistered,
      signIn = _props$config.signIn,
      signOut = _props$config.signOut,
      switchAccount = _props$config.switchAccount,
      loginState = _props$config.loginState,
      userDetails = _props$config.userDetails,
      homepageLink = _props$config.homepageLink;
  var userName = userDetails.userName,
      accountName = userDetails.accountName,
      accountNumber = userDetails.accountNumber;

  var onSignIn = function onSignIn(e) {
    e.preventDefault();
    var store = new stores_sessionStore["a" /* default */]();
    store.setSignInRedirect(window.location.href);
    Object(analytics["f" /* setClickAnalytics */])('Account Dropdown', signIn.linkName, signIn.url);
    window.location.href = signIn.url;
  };

  var onSignOut = function onSignOut(e) {
    e.preventDefault();
    Object(analytics["f" /* setClickAnalytics */])('Account Dropdown', signOut.linkName, signOut.url);
    signOutRequest(signOut.signOutEndpoint, signOut.url, homepageLink);
  };

  var filterItemList = function filterItemList(list) {
    return list.filter(function (item) {
      return !(item.isHiddenForEprocUser === "true" && Object(userFunctions["t" /* isEprocurementUserRole */])());
    });
  };

  var signInOutLink = function signInOutLink() {
    return react_default.a.createElement(react_default.a.Fragment, null, signOut.url && signIn.url && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("a", Object.assign({
      className: "my-account-dropdown__sign-in-out",
      href: loginState ? signOut.url : signIn.url
    }, !loginState && {
      onClick: function onClick(e) {
        return onSignIn(e);
      },
      rel: 'nofollow'
    }, loginState && {
      onClick: function onClick(e) {
        return onSignOut(e);
      }
    }, {
      "data-locator": "my-account-dropdown-sign-in-out"
    }), react_default.a.createElement(react_svg["a" /* default */], {
      src: icon,
      className: "sign-in-out__icon"
    }), loginState ? signOut.text : signIn.text)));
  };

  var createAccountButton = function createAccountButton() {
    return react_default.a.createElement(react_default.a.Fragment, null, notRegistered && createAccount.url && createAccount.text && react_default.a.createElement("div", {
      className: "my-account-dropdown__create-account",
      "data-locator": "my-account-dropdown-not-registered"
    }, notRegistered, react_default.a.createElement("a", {
      "class": "cmp-button",
      href: createAccount.url,
      onClick: function onClick(e) {
        return Object(analytics["f" /* setClickAnalytics */])('Account Dropdown', createAccount.linkName, createAccount.url);
      },
      "data-locator": "link-my-account-dropdown-create-account"
    }, createAccount.text)));
  };

  return react_default.a.createElement("div", {
    className: my_account_container_keys.MyAccountContainer
  }, loginState && react_default.a.createElement(my_account_user_details, {
    userName: userName,
    accountName: accountName,
    accountNumber: accountNumber,
    switchAccount: switchAccount
  }), itemList && react_default.a.createElement(my_account_item_list, {
    itemList: filterItemList(itemList)
  }), signInOutLink(), !loginState && createAccountButton());
};

/* harmony default export */ var my_account_container = (my_account_container_MyAccountContainer);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(16);

// EXTERNAL MODULE: ./src/my-account/services/UserDetailsLazy.js
var UserDetailsLazy = __webpack_require__(70);

// EXTERNAL MODULE: ./src/my-account/services/SoldToDetailsLazy.js + 1 modules
var SoldToDetailsLazy = __webpack_require__(62);

// EXTERNAL MODULE: ./src/stores/localStore.js
var localStore = __webpack_require__(45);

// CONCATENATED MODULE: ./src/my-account/services/PunchoutLogin.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;

var PunchoutLogin_punchoutLogin = function punchoutLogin(url, body) {
  return new _Promise( /*#__PURE__*/function () {
    var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(resolve) {
      var response;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              });

            case 2:
              response = _context.sent;
              return _context.abrupt("return", resolve({
                response: response
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};

/* harmony default export */ var PunchoutLogin = (PunchoutLogin_punchoutLogin);
// CONCATENATED MODULE: ./src/my-account/services/PunchoutSetup.js





var PunchoutSetup_getData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 4:
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

var punchoutSetup = /*#__PURE__*/function () {
  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(url) {
    var _response, data;

    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return PunchoutSetup_getData(url);

          case 3:
            _response = _context2.sent;
            _context2.next = 6;
            return _response.json();

          case 6:
            data = _context2.sent;
            return _context2.abrupt("return", Object(objectSpread["a" /* default */])({}, data, {
              status: _response.status
            }));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", {
              status: response.status
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function punchoutSetup(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ var PunchoutSetup = (punchoutSetup);
// EXTERNAL MODULE: ./src/utils/parse-query-params/index.js
var parse_query_params = __webpack_require__(113);

// EXTERNAL MODULE: ./src/utils/remove-query-string/index.js
var remove_query_string = __webpack_require__(162);

// EXTERNAL MODULE: ./src/utils/buildUrl.js
var buildUrl = __webpack_require__(238);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(33);

// EXTERNAL MODULE: ./src/eproc-setup-failure/styles/index.scss
var styles = __webpack_require__(481);

// CONCATENATED MODULE: ./src/eproc-setup-failure/EprocSetupFailure.js





function EprocSetupFailure(props) {
  var status = props.status,
      title = props.title,
      text = props.text,
      icon = props.icon,
      buttons = props.buttons;
  return react_default.a.createElement(modal["b" /* default */], {
    isOpen: status,
    onClose: function onClose() {},
    className: "cmp-add-to-cart-modal",
    showCloseIcon: false
  }, react_default.a.createElement(modal["a" /* Header */], {
    title: title,
    icon: icon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTopError
  }), react_default.a.createElement(addToCartModal["a" /* default */], {
    config: {
      isOrderDetails: true,
      textHeading: '',
      text: text,
      buttons: buttons
    },
    errorObjCart: {},
    onClose: function onClose() {}
  }));
}

EprocSetupFailure.defaultProps = {
  status: false,
  title: '',
  text: '',
  icon: '',
  buttons: [{
    text: ''
  }]
};
/* harmony default export */ var eproc_setup_failure_EprocSetupFailure = (EprocSetupFailure);
// CONCATENATED MODULE: ./src/my-account-dropdown/index.js




























var myAccountModalTheme = 'my-account-dropdown';

var my_account_dropdown_MyAccountDropDown = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(MyAccountDropDown, _React$Component);

  function MyAccountDropDown(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, MyAccountDropDown);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(MyAccountDropDown).call(this, props));

    _this.updateViewport = function () {
      if (!screenSizes["a" /* default */].isMobile()) {
        if (_this.state.isShown == true) {
          _this.willShow(false);
        }
      }

      _this.setState({
        isMobile: screenSizes["a" /* default */].isMobile()
      });
    };

    _this.toggleModal = function () {
      _this.willShow(!_this.state.isShown);
    };

    _this.hideOnClick = function (e) {
      if (_this.state.isShown == true) {
        _this.willShow(false, e.currentTarget);
      }
    };

    _this.formatUserName = function (userDetails) {
      var userName = '';

      if (userDetails.mailingAddressCountryCode === 'jp' || userDetails.mailingAddressCountryCode === 'cn' || userDetails.mailingAddressCountryCode === 'kr' || userDetails.mailingAddressCountryCode === 'tw') {
        userName = userDetails.firstName && userDetails.lastName ? "".concat(userDetails.lastName, " ").concat(userDetails.firstName) : '';
      } else {
        userName = userDetails.firstName && userDetails.lastName ? "".concat(userDetails.firstName, " ").concat(userDetails.lastName) : '';
      }

      return userName;
    };

    _this.willShow = function (newState) {
      var caller = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      // Check if Personal Details have been updated
      var store = new stores_sessionStore["a" /* default */]();
      var hasBeenUpdated = store.getPersonalDetailsUpdated() === 'Y' ? true : false;

      if (hasBeenUpdated) {
        var savedUserDetails = store.getUserDetails();
        var savedSoldToDetails = store.getSoldToDetails();
        var updatedUserName = '';

        if (Object.keys(savedUserDetails).length !== 0) {
          updatedUserName = _this.formatUserName(savedUserDetails);
        } else {
          _this.retrieveUserDetails();
        }

        var updatedAccountName = savedUserDetails.company; // Check that Sold to Exists

        if (savedSoldToDetails && savedSoldToDetails.length !== 0) {
          var updatedAccount;
          savedSoldToDetails.map(function (soldTo) {
            if (soldTo.soldToFlag === 1) {
              updatedAccount = soldTo;
            }
          });
          updatedAccountName = updatedAccount.name ? updatedAccount.name : "";
        }

        var currentState = _this.state;
        currentState.config.userDetails.userName = updatedUserName;
        currentState.config.userDetails.accountName = updatedAccountName;

        _this.setState(Object(objectSpread["a" /* default */])({}, currentState));

        store.removePersonalDetailsUpdated();
      }

      var headerOverlay = document.querySelector('.cmp-header__overlay.overlay');
      var activeDDClass = 'is-active';
      var activeOverlay = 'active';

      _this.setState({
        isShown: newState
      }, function () {
        if (_this.state.isShown) {
          var mobileNav = Object(scripts_mobileNav["a" /* default */])();

          if (mobileNav) {
            mobileNav.hide();
          }

          _this.accountHeaderUser.classList.add(activeDDClass);

          if (!_this.state.isMobile) {
            headerOverlay.classList.add(activeOverlay);
          } else {
            domElements["a" /* default */].noScroll(true);

            if (_this.header) {
              header.classList.add('is-fixed');
            }
          }
        } else {
          _this.accountHeaderUser.classList.remove(activeDDClass);

          if (!_this.state.isMobile) {
            headerOverlay.classList.remove(activeOverlay);
          } else {
            if (caller != 'default') {
              if (caller instanceof HTMLElement) {
                if (!caller.classList.contains('top-bar__nav__mobile')) {
                  // change scrolling unless needed next (ie hamburger menu)
                  domElements["a" /* default */].noScroll(false);

                  if (_this.header) {
                    header.classList.remove('is-fixed');
                  }
                }
              }
            } else {
              domElements["a" /* default */].noScroll(false);

              if (_this.header) {
                header.classList.remove('is-fixed');
              }
            }
          }
        }
      });
    };

    _this.handleOutsideEvent = function (e) {
      var domNode = react_dom_default.a.findDOMNode(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));

      if (!domNode || !domNode.contains(e.target)) {
        e.preventDefault();

        switch (true) {
          case e.type == 'mouseover' && !_this.state.isMobile:
            _this.willShow(true);

            break;

          case e.type == 'click' && _this.state.isMobile:
            e.preventDefault();

            _this.toggleModal();

            break;

          case e.type == 'click' && !_this.state.isMobile:
            e.preventDefault();

            if (_this.props.config.myAccount.url && _this.props.config.myAccount.target) {
              window.open(_this.props.config.myAccount.url, _this.props.config.myAccount.target);
            }

            break;

          case e.type == 'mouseleave' && !_this.state.isMobile:
            _this.willShow(false);

            break;
        }
      }
    };

    _this.retrieveUserDetails = /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
      var checkSessionStore, userDetailsUrl, soldToDetailsUrl, userDetails, soldToDetails, userName, priorityAccount, accountName;
      return regenerator_default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              checkSessionStore = true;
              userDetailsUrl = _this.props.config && _this.props.config.userDetailsUrl || '';
              soldToDetailsUrl = _this.props.config && _this.props.config.soldToDetailsUrl || '';

              if (!(userDetailsUrl && soldToDetailsUrl)) {
                _context.next = 17;
                break;
              }

              _context.next = 6;
              return Object(UserDetailsLazy["a" /* default */])(userDetailsUrl, checkSessionStore);

            case 6:
              userDetails = _context.sent;

              if (!(Object.keys(userDetails).length && userDetails.userId && userDetails.salesOrg)) {
                _context.next = 17;
                break;
              }

              _context.next = 10;
              return Object(SoldToDetailsLazy["a" /* default */])(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg);

            case 10:
              soldToDetails = _context.sent;
              userName = _this.formatUserName(userDetails);
              priorityAccount = {};
              accountName = "";

              if (Object.keys(soldToDetails).length) {
                soldToDetails.map(function (soldTo) {
                  if (soldTo.soldToFlag === 1) {
                    priorityAccount = soldTo;
                  }
                });
              }

              if (Object.keys(priorityAccount).length) {
                accountName = priorityAccount.name ? "".concat(priorityAccount.name, " ") : '';
              } else {
                accountName = userDetails.company;
              }

              _this.setState(Object(objectSpread["a" /* default */])({}, _this.state, {
                config: Object(objectSpread["a" /* default */])({}, _this.props.config, {
                  loginState: loginStatus["a" /* default */].state(),
                  userDetails: {
                    userName: userName,
                    accountName: accountName
                  }
                })
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.getConfig = function () {
      if (_this.state.config.userDetails.userName || !loginStatus["a" /* default */].state()) {
        return _this.state.config;
      }

      var store = new stores_sessionStore["a" /* default */]();
      var userDetails = store.getUserDetails();
      var soldToDetails = store.getSoldToDetails();

      var userName = _this.formatUserName(userDetails);

      var priorityAccount = soldToDetails && soldToDetails.length !== 0 ? soldToDetails[0] : {};
      var accountName = priorityAccount.company ? "".concat(priorityAccount.company, " ") : userDetails.company;
      return Object(objectSpread["a" /* default */])({}, _this.props.config, {
        loginState: loginStatus["a" /* default */].state(),
        userDetails: {
          userName: userName,
          accountName: accountName
        }
      });
    };

    _this.setEprocFailure = function (config) {
      _this.setState(function (prevState) {
        return {
          eprocSetupFailure: Object(objectSpread["a" /* default */])({}, prevState.eprocSetupFailure, {
            status: !_this.props.isEditMode
          }, config)
        };
      });
    };

    _this.punchoutLogin = /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3() {
      var urlParams, token, sessionStore, _this$props$eProcSetu, requestFailureTitle, requestFailureMessage, sessionTimeoutTitle, sessionTimeoutMessage, checkAndSetError, _yield$punchoutLogin, response, responseJson, userDetailsUrl, soldToDetailsUrl, userDetails;

      return regenerator_default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              urlParams = Object(parse_query_params["a" /* default */])(window.location.search);
              token = urlParams['1tu'] || '';
              sessionStore = new stores_sessionStore["a" /* default */]();
              _this$props$eProcSetu = _this.props.eProcSetupFailure, requestFailureTitle = _this$props$eProcSetu.requestFailureTitle, requestFailureMessage = _this$props$eProcSetu.requestFailureMessage, sessionTimeoutTitle = _this$props$eProcSetu.sessionTimeoutTitle, sessionTimeoutMessage = _this$props$eProcSetu.sessionTimeoutMessage;

              checkAndSetError = /*#__PURE__*/function () {
                var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
                  var responseJson,
                      punchoutSetupDetails,
                      buttonConfig,
                      _args2 = arguments;
                  return regenerator_default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          responseJson = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                          _context2.prev = 1;
                          punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();

                          if (_this.state.eprocSetupFailure.status) {
                            _context2.next = 10;
                            break;
                          }

                          if (!(Object.keys(punchoutSetupDetails).length === 0)) {
                            _context2.next = 8;
                            break;
                          }

                          _context2.next = 7;
                          return _this.punchoutSetup();

                        case 7:
                          // retrieve punchout setup
                          punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();

                        case 8:
                          buttonConfig = _this.state.eprocSetupFailure.buttons && _this.state.eprocSetupFailure.buttons[0] ? {
                            text: _this.state.eprocSetupFailure.buttons[0].text,
                            action: Object.keys(punchoutSetupDetails).length > 0 && punchoutSetupDetails.redirectUrl ? punchoutSetupDetails.redirectUrl : ''
                          } : {};

                          _this.setEprocFailure({
                            title: responseJson.code === 804 ? sessionTimeoutTitle : requestFailureTitle,
                            text: responseJson.code === 804 ? sessionTimeoutMessage : requestFailureMessage,
                            buttons: [buttonConfig]
                          });

                        case 10:
                          _context2.next = 15;
                          break;

                        case 12:
                          _context2.prev = 12;
                          _context2.t0 = _context2["catch"](1);

                          _this.setEprocFailure({
                            title: requestFailureTitle,
                            text: requestFailureMessage
                          });

                        case 15:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[1, 12]]);
                }));

                return function checkAndSetError() {
                  return _ref3.apply(this, arguments);
                };
              }();

              _context3.prev = 5;

              if (!token) {
                _context3.next = 36;
                break;
              }

              sessionStore.removeUserDetails();
              _context3.next = 10;
              return PunchoutLogin(_this.props.config.punchoutLogin, {
                token: token
              });

            case 10:
              _yield$punchoutLogin = _context3.sent;
              response = _yield$punchoutLogin.response;

              if (!(response && response.status !== 200)) {
                _context3.next = 20;
                break;
              }

              _context3.next = 15;
              return response.json();

            case 15:
              responseJson = _context3.sent;
              _context3.next = 18;
              return checkAndSetError(responseJson);

            case 18:
              _context3.next = 34;
              break;

            case 20:
              userDetailsUrl = _this.props.config && _this.props.config.userDetailsUrl || '';
              soldToDetailsUrl = _this.props.config && _this.props.config.soldToDetailsUrl || '';
              sessionStore.removeSoldToDetails();

              if (!(userDetailsUrl && soldToDetailsUrl)) {
                _context3.next = 34;
                break;
              }

              _context3.next = 26;
              return Object(UserDetailsLazy["a" /* default */])(userDetailsUrl, false);

            case 26:
              userDetails = _context3.sent;

              if (!(Object.keys(userDetails).length && userDetails.userId && userDetails.salesOrg)) {
                _context3.next = 32;
                break;
              }

              _context3.next = 30;
              return Object(SoldToDetailsLazy["a" /* default */])(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg);

            case 30:
              _context3.next = 34;
              break;

            case 32:
              _context3.next = 34;
              return checkAndSetError();

            case 34:
              _context3.next = 41;
              break;

            case 36:
              if (loginStatus["a" /* default */].state()) {
                _context3.next = 41;
                break;
              }

              sessionStore.removeUserDetails();
              sessionStore.removeSoldToDetails();
              _context3.next = 41;
              return checkAndSetError();

            case 41:
              _context3.next = 46;
              break;

            case 43:
              _context3.prev = 43;
              _context3.t0 = _context3["catch"](5);
              checkAndSetError();

            case 46:
              _this.setState({
                eProcLoginCallCompleted: true
              }, function () {
                return _this.showHideLoader();
              });

              Object(remove_query_string["a" /* default */])(window.location.href, '1tu', true);

            case 48:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 43]]);
    }));
    _this.punchoutSetup = /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4() {
      var sessionStore, urlParams, sid, _this$props$eProcSetu2, requestFailureTitle, requestFailureMessage, setPunchoutError, response, punchoutSetupDetails, buttonConfig;

      return regenerator_default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              sessionStore = new stores_sessionStore["a" /* default */]();
              urlParams = Object(parse_query_params["a" /* default */])(window.location.search);
              sid = urlParams['sid'] || '';
              _this$props$eProcSetu2 = _this.props.eProcSetupFailure, requestFailureTitle = _this$props$eProcSetu2.requestFailureTitle, requestFailureMessage = _this$props$eProcSetu2.requestFailureMessage;

              setPunchoutError = function setPunchoutError() {
                _this.setEprocFailure({
                  title: requestFailureTitle,
                  text: requestFailureMessage
                });
              };

              _context4.prev = 5;

              if (!sid) {
                _context4.next = 15;
                break;
              }

              sessionStore.removePunchoutSetupDetails();
              new localStore["a" /* default */]().removeCartId();
              _context4.next = 11;
              return PunchoutSetup(Object(buildUrl["a" /* default */])({
                pathname: _this.props.config.punchoutSetup,
                query: {},
                pathVars: {
                  userId: "anonymous",
                  sid: sid
                }
              }));

            case 11:
              response = _context4.sent;

              if (response && response.status !== 200) {
                punchoutSetupDetails = sessionStore.getPunchoutSetupDetails();
                buttonConfig = _this.state.eprocSetupFailure.buttons && _this.state.eprocSetupFailure.buttons[0] ? {
                  text: _this.state.eprocSetupFailure.buttons[0].text,
                  action: Object.keys(punchoutSetupDetails).length > 0 && punchoutSetupDetails.redirectUrl ? punchoutSetupDetails.redirectUrl : ''
                } : {};

                _this.setEprocFailure({
                  title: requestFailureTitle,
                  text: requestFailureMessage,
                  buttons: [buttonConfig]
                });
              } else {
                sessionStore.setPunchoutSetupDetails({
                  returnUrl: response.return_url,
                  redirectUrl: response.redirect_url,
                  buyerOrgName: response.buyerOrgName,
                  currency: response.currency,
                  country: response.country
                });
                new localStore["a" /* default */]().setCartId(response.cartId);
              }

              _context4.next = 16;
              break;

            case 15:
              if (Object.keys(sessionStore.getPunchoutSetupDetails()).length === 0) {
                setPunchoutError();
              }

            case 16:
              _context4.next = 21;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](5);
              setPunchoutError();

            case 21:
              _this.setState({
                punchoutSetupCallCompleted: true
              }, function () {
                return _this.showHideLoader();
              });

              Object(remove_query_string["a" /* default */])(window.location.href, 'sid', true);

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 18]]);
    }));
    _this.state = {
      isShown: false,
      isMobile: screenSizes["a" /* default */].isMobile(),
      config: Object(objectSpread["a" /* default */])({}, _this.props.config, {
        loginState: loginStatus["a" /* default */].state(),
        userDetails: {
          userName: '',
          accountName: ''
        }
      }),
      eprocSetupFailure: {
        status: false,
        title: '',
        text: '',
        icon: _this.props.eProcSetupFailure.icon,
        buttons: _this.props.eProcSetupFailure.buttons
      },
      punchoutSetupCallCompleted: false,
      eProcLoginCallCompleted: false
    };
    _this.accountHeaderUser = null;
    _this.allNavItems = null;
    _this.header = null;
    return _this;
  }

  Object(createClass["a" /* default */])(MyAccountDropDown, [{
    key: "showHideLoader",
    value: function showHideLoader() {
      var _this$state = this.state,
          punchoutSetupCallCompleted = _this$state.punchoutSetupCallCompleted,
          eProcLoginCallCompleted = _this$state.eProcLoginCallCompleted;
      window.dispatchEvent(new CustomEvent("showLoaderEproc", {
        detail: {
          showLoader: !(punchoutSetupCallCompleted && eProcLoginCallCompleted)
        }
      }));
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5() {
        var hideOnClick;
        return regenerator_default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                new stores_sessionStore["a" /* default */]().setUserType(this.props.config.siteConfig);
                this.accountHeaderUser = document.querySelector('.cmp-header__top-bar__nav .top-bar__nav__user');
                this.allNavItems = document.querySelectorAll('.top-bar__nav__item:not(.top-bar__nav__user)');
                this.header = document.querySelector('header.cmp-header');
                hideOnClick = this.hideOnClick;

                if (this.allNavItems) {
                  Array.from(this.allNavItems).forEach(function (e) {
                    e.addEventListener('click', hideOnClick);
                  });
                }

                if (this.accountHeaderUser) {
                  this.accountHeaderUser.addEventListener('mouseover', this.handleOutsideEvent);
                  this.accountHeaderUser.addEventListener('mouseleave', this.handleOutsideEvent);
                  this.accountHeaderUser.addEventListener('click', this.handleOutsideEvent);
                }

                window.addEventListener('resize', this.updateViewport, true);

                if (!Object(userFunctions["s" /* isEprocurementUser */])()) {
                  _context5.next = 13;
                  break;
                }

                // Show loader in case of eproc user
                this.showHideLoader();
                this.punchoutSetup(); // Validates 1TU token, once get from query string

                _context5.next = 13;
                return this.punchoutLogin();

              case 13:
                if (loginStatus["a" /* default */].state()) {
                  this.retrieveUserDetails();
                }

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnMount",
    value: function componentWillUnMount() {
      var hideOnClick = this.hideOnClick;

      if (this.allNavItems) {
        Array.from(this.allNavItems).forEach(function (e) {
          e.removeEventListener('click', hideOnClick);
        });
      }

      if (this.accountHeaderUser) {
        this.accountHeaderUser.removeEventListener('mouseover', this.handleOutsideEvent);
        this.accountHeaderUser.removeEventListener('mouseleave', this.handleOutsideEvent);
        this.accountHeaderUser.removeEventListener('click', this.handleOutsideEvent);
      }

      window.removeEventListener('resize', this.updateViewport, true);
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(react_default.a.Fragment, null, this.state.isMobile ? react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.isShown,
        className: modal["c" /* keys */].ModalWithSiteNavOnMobile,
        onClose: this.toggleModal
      }, react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.config.title
      }), react_default.a.createElement(my_account_container, {
        config: this.getConfig()
      })) : react_default.a.createElement(my_account_container, {
        config: this.getConfig()
      }), react_default.a.createElement(eproc_setup_failure_EprocSetupFailure, this.state.eprocSetupFailure));
    }
  }]);

  return MyAccountDropDown;
}(react_default.a.Component);

my_account_dropdown_MyAccountDropDown.defaultProps = {
  eProcSetupFailure: {
    requestFailureTitle: '',
    requestFailureMessage: '',
    sessionTimeoutTitle: '',
    sessionTimeoutMessage: '',
    icon: '',
    buttons: [{
      text: ''
    }]
  },
  isEditMode: false
};
/* harmony default export */ var my_account_dropdown = (my_account_dropdown_MyAccountDropDown);

// EXTERNAL MODULE: ./node_modules/react-autosuggest/dist/index.js
var dist = __webpack_require__(239);
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./node_modules/throttle-debounce/index.umd.js
var index_umd = __webpack_require__(102);

// EXTERNAL MODULE: ./src/search/services/index.js
var services = __webpack_require__(20);

// CONCATENATED MODULE: ./src/search/components/overlay.js


var overlay_OverLay = function OverLay(props) {
  var className = props.darkOverlay ? 'overlay-container' : 'overlay-container--light';

  var getContent = function getContent() {
    return props.isOpen ? react_default.a.createElement("div", {
      className: className
    }) : react_default.a.createElement(react_default.a.Fragment, null);
  };

  return react_default.a.createElement(react_default.a.Fragment, null, getContent());
};

overlay_OverLay.defaultProps = {
  isOpen: false,
  darkOverlay: true
};
/* harmony default export */ var overlay = (overlay_OverLay);
// EXTERNAL MODULE: ./src/styles/index.scss
var src_styles = __webpack_require__(104);

// CONCATENATED MODULE: ./src/search/components/searchbar.js
















var cssOverridesForSearchBar = "cmp-search-bar__auto-suggest--open";
var cssOverridesForSearchBody = "cmp-search-body__auto-suggest--open";
var searchBarFocusClassName = 'cmp-search-bar--focus';

var searchbar_SearchBar = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(SearchBar, _Component);

  function SearchBar(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SearchBar);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SearchBar).call(this, props));

    _this.updateSearchService = function (isocode) {
      return new services["a" /* SearchService */](isocode, _this.props.baseUrl);
    };

    _this.componentDidMount = function () {
      _this.inputElement = document.querySelectorAll('.cmp-search-bar .react-autosuggest__container .react-autosuggest__input')[0]; // this is for desktop

      window.addEventListener('resize', _this.handleWindowResizeDebounce); // this is for iPad orientation

      window.addEventListener('orientationchange', _this.handleViewChange); // this is for mobile devices

      window.addEventListener('deviceorientation', _this.handleViewChange);
    };

    _this.renderAutoSuggest = function () {
      var inputProps = {
        placeholder: _this.state.placeholder,
        value: _this.state.value,
        onChange: _this.handleSearchValueChange,
        onKeyPress: _this.handleSearchValuePress,
        onBlur: _this.handleSearchValueBlur,
        'aria-label': _this.props.labels.autoSuggest
      };

      if (Object(userFunctions["s" /* isEprocurementUser */])() && !_this.eprocIsoCode) {
        _this.eprocIsoCode = Object(userFunctions["n" /* getIsoCode */])();
        _this.search = _this.updateSearchService(_this.eprocIsoCode);
      }

      return react_default.a.createElement(dist_default.a, {
        suggestions: _this.state.suggestions,
        onSuggestionsFetchRequested: _this.handleSuggestionsFetchRequestedDebounce,
        onSuggestionsClearRequested: _this.onSuggestionsClearRequested,
        onSuggestionSelected: _this.handleSuggestionSelected,
        getSuggestionValue: _this.getSuggestionValueCallback,
        renderSuggestion: _this.renderSuggestionCallback,
        inputProps: inputProps
      });
    };

    _this.renderHideClearIcon = function () {
      return _this.state.value ? _this.renderClearIcon() : react_default.a.createElement(react_default.a.Fragment, null);
    };

    _this.renderClearIcon = function () {
      return react_default.a.createElement("button", {
        "aria-label": _this.props.labels.clear,
        onClick: function onClick(e) {
          return _this.handleClearIconClick(e);
        },
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        className: "clear-icon"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.iconClear,
        className: "cmp-search-bar__icons-clear"
      }));
    };

    _this.renderSearchIcon = function () {
      return react_default.a.createElement("button", {
        "aria-label": _this.props.labels.search,
        onClick: function onClick(e) {
          return _this.handleSearchIconClick(e);
        },
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        className: "search-icon"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        "aria-hidden": "true",
        src: _this.props.iconSearch,
        className: "cmp-search-bar__icons-search"
      }));
    };

    _this.handleViewChange = function () {
      if (screenSizes["a" /* default */].isMobile() && _this.state.placeholder !== _this.props.placeholderMobile) {
        _this.setState({
          placeholder: _this.props.placeholderMobile
        });
      } else if (!screenSizes["a" /* default */].isMobile() && _this.state.placeholder !== _this.props.placeholderTablet) {
        _this.setState({
          placeholder: _this.props.placeholderTablet
        });
      }
    };

    _this.handleAutosuggestClick = function (e) {
      if (Array.from(e.target.classList).find(function (element) {
        return element === 'react-autosuggest__input--focused';
      })) {
        _this.addSearchBarFocusCss();
      }
    };

    _this.handleSearchValuePress = function (e) {
      if (e.key !== 'Enter') return;

      if (_this.state.value.length !== 0) {
        _this.handleSuggestionSelected(e, {
          suggestionValue: _this.state.value
        });
      }
    };

    _this.handleSearchIconClick = function (e) {
      if (_this.state.value.length !== 0) {
        _this.handleSuggestionSelected(e, {
          suggestionValue: _this.state.value
        });
      }
    };

    _this.handleClearIconClick = function (e) {
      _this.inputElement.focus();

      _this.addSearchBarFocusCss();

      _this.setState({
        value: '',
        suggestions: [],
        openOverlay: false
      }, function () {
        return _this.removeCssOverridesForSearchBody();
      });
    };

    _this.handleSearchValueChange = function (event, _ref) {
      var newValue = _ref.newValue;

      if (newValue.length === 0) {
        // this will prevent white space from appearing below the search bar
        // as the user backspaces and deletes all of the characters
        _this.removeCssOverridesForSearchBar();
      }

      _this.setState({
        value: newValue
      }, function () {
        if (newValue.length === 0) {
          // the user has manually cleared the search bar so need to update the state
          _this.setState({
            suggestions: [],
            openOverlay: false
          }, function () {
            return _this.removeCssOverridesForSearchBody();
          });
        }
      });
    };

    _this.handleSearchValueBlur = function (event, _ref2) {
      var highlightedSuggestion = _ref2.highlightedSuggestion;
      return _this.removeSearchBarFocusCss();
    };

    _this.handleSuggestionsFetchRequested = /*#__PURE__*/function () {
      var _ref4 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(_ref3) {
        var value, suggestions, openOverlay;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = _ref3.value;

                if (_this.state.value.length < _this.props.minSearchCharacters) {
                  _context.next = 10;
                  break;
                }

                _context.t1 = _this;
                _context.t2 = _this.state.value.trim();
                _context.next = 6;
                return _this.search.getSuggestedKeywords(_this.props.maxSuggestions, _this.state.value);

              case 6:
                _context.t3 = _context.sent;
                _context.t0 = _context.t1.formatSuggestions.call(_context.t1, _context.t2, _context.t3);
                _context.next = 11;
                break;

              case 10:
                _context.t0 = [];

              case 11:
                suggestions = _context.t0;
                openOverlay = suggestions.length !== 0;

                if (openOverlay) {
                  _this.addCssOverridesForSearchBar();

                  _this.addCssOverridesForSearchBody();
                }

                _this.setState({
                  suggestions: suggestions,
                  openOverlay: openOverlay
                }, function () {
                  if (!openOverlay) {
                    _this.removeCssOverridesForSearchBar();

                    _this.removeCssOverridesForSearchBody();
                  }
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.onSuggestionsClearRequested = function () {
      _this.removeCssOverridesForSearchBar(); // delay updating the state so the onClick of the X icon is not ignored
      // otherwise, the event handler for the X icon will never execute


      setTimeout(function () {
        return _this.setState({
          openOverlay: false,
          suggestions: []
        }, function () {
          return _this.removeCssOverridesForSearchBody();
        });
      }, 125);
    };

    _this.getSuggestionValueCallback = function (suggestion) {
      return suggestion.key;
    };

    _this.renderSuggestionCallback = function (suggestion) {
      return react_default.a.createElement("div", null, suggestion.value);
    };

    _this.handleSuggestionSelected = function (event, _ref5) {
      var suggestionValue = _ref5.suggestionValue;

      _this.removeCssOverridesForSearchBar();

      _this.setState({
        value: suggestionValue,
        suggestions: [],
        openOverlay: false
      }, function () {
        // clearing search session variables ensures the page position is set to the top after keyword search
        _this.search.clearSessionStore();

        _this.removeCssOverridesForSearchBody();

        _this.search.setUrlParameter(_this.state.value, _this.props.searchPath);
      });
    };

    _this.addCssOverridesForSearchBar = function () {
      return document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBar);
    };

    _this.removeCssOverridesForSearchBar = function () {
      return document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBar);
    };

    _this.addCssOverridesForSearchBody = function () {
      return document.getElementsByTagName('body')[0].classList.add(cssOverridesForSearchBody);
    };

    _this.removeCssOverridesForSearchBody = function () {
      return document.getElementsByTagName('body')[0].classList.remove(cssOverridesForSearchBody);
    };

    _this.formatSuggestions = function (term, suggestions) {
      return suggestions.map(function (suggestion) {
        return {
          key: suggestion,
          value: react_default.a.createElement("span", {
            className: "formatted-suggestion"
          }, _this.formatSuggestion(term, suggestion).reduce(function (accumulator, currentValue) {
            return react_default.a.createElement(react_default.a.Fragment, null, accumulator, " ", currentValue);
          }))
        };
      });
    };

    _this.formatSuggestion = function (term, suggestion) {
      // wrap the matching characters with a pipe |
      var delimittedSuggestion = suggestion.replace(new RegExp("\\b".concat(term), 'ig'), "|".concat(term, "|")); // convert string to array split with pipe |
      // this will isolate the matching characters into it's own location in the array

      var words = delimittedSuggestion.split('|').filter(function (word) {
        return word !== '';
      }); // create a new array that will wrap the matching characters into a styled span to highlight
      // non-matching characters will simply display inside a span element

      return words.map(function (item) {
        return item.toLowerCase() === term.toLowerCase() ? _this.formatMatchingWord(item, term.length) : _this.formatNonMatchingWords(item);
      });
    };

    _this.formatMatchingWord = function (word, termLength) {
      return react_default.a.createElement("span", {
        className: "emphasis-matching-characters"
      }, word.substring(0, termLength));
    };

    _this.formatNonMatchingWords = function (value) {
      // wrap spaces with a pipe | & split into an array
      var words = value.replace(/\s/g, '| |').split('|').filter(function (word) {
        return word !== '';
      }); // use an underscore instead of a space to preserve the space in the flex row
      // this is needed because IE doesn't handle white-space: pre-wrap the same as other browsers
      // therefore, pre-wrap is not need since we are replacing the space with an underscore

      var formattedWords = words.map(function (word) {
        return word === ' ' ? react_default.a.createElement("span", {
          className: "white-text"
        }, "_") : react_default.a.createElement("span", null, word);
      });
      return formattedWords.reduce(function (accumulator, currentValue) {
        return react_default.a.createElement(react_default.a.Fragment, null, accumulator, currentValue);
      });
    };

    _this.addSearchBarFocusCss = function () {
      return _this.searchBarRef.current.classList.add(searchBarFocusClassName);
    };

    _this.removeSearchBarFocusCss = function () {
      return _this.searchBarRef.current.classList.remove(searchBarFocusClassName);
    };

    _this.inputElement = null;
    _this.eprocIsoCode = '';
    _this.searchBarRef = react_default.a.createRef();
    _this.search = _this.updateSearchService(Object(userFunctions["s" /* isEprocurementUser */])() ? Object(userFunctions["n" /* getIsoCode */])() : _this.props.isocode);

    var searchValue = _this.search.getUrlParameter('keyword', window.location.search.substring(1));

    if (_this.search.isDefaultKeyword(searchValue)) searchValue = '';
    _this.state = {
      value: searchValue ? searchValue : '',
      suggestions: [],
      openOverlay: false,
      placeholder: screenSizes["a" /* default */].isMobile() ? _this.props.placeholderMobile : _this.props.placeholderTablet
    };
    _this.handleSuggestionsFetchRequestedDebounce = Object(index_umd["debounce"])(250, _this.handleSuggestionsFetchRequested);
    _this.handleWindowResizeDebounce = Object(index_umd["debounce"])(150, _this.handleViewChange);
    return _this;
  }

  Object(createClass["a" /* default */])(SearchBar, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement(react_default.a.Fragment, null, !this.props.disableOverlay && react_default.a.createElement(overlay, {
        isOpen: this.state.openOverlay
      }), react_default.a.createElement("div", {
        ref: this.searchBarRef,
        className: "cmp-search-bar ".concat(this.props.customStyle),
        id: "notesSearch",
        onClick: this.handleAutosuggestClick
      }, this.renderAutoSuggest(), react_default.a.createElement("div", {
        className: "cmp-search-bar__icons"
      }, this.renderHideClearIcon(), this.renderSearchIcon())));
    }
  }]);

  return SearchBar;
}(react["Component"]);

searchbar_SearchBar.defaultProps = {
  maxSuggestions: 10,
  minSearchCharacters: 1,
  customStyle: '',
  disableOverlay: false
};
/* harmony default export */ var searchbar = (searchbar_SearchBar);
// CONCATENATED MODULE: ./src/header-search-bar/header-search-bar.js










var header_search_bar_HeaderSearchBar = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(HeaderSearchBar, _Component);

  function HeaderSearchBar(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, HeaderSearchBar);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(HeaderSearchBar).call(this, props));

    _this.checkScreenSize = function () {
      var isMobile = screenSizes["a" /* default */].isMobile();
      _this.state.isMobile !== isMobile && _this.setState({
        isMobile: isMobile
      });
    };

    _this.handleSearchIconClick = function (e) {
      window.dispatchEvent(new CustomEvent("showMobileSearch"));
    };

    _this.state = {
      isMobile: screenSizes["a" /* default */].isMobile()
    };
    return _this;
  }

  Object(createClass["a" /* default */])(HeaderSearchBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // this is for desktop
      window.addEventListener("resize", this.checkScreenSize); // this is for iPad orientation

      window.addEventListener("orientationchange", this.checkScreenSize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.checkScreenSize);
      window.removeEventListener("orientationchange", this.checkScreenSize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mobileView = react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("button", {
        "aria-label": this.props.labels.search,
        onClick: function onClick(e) {
          return _this2.handleSearchIconClick(e);
        },
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        className: "mobile-search-icon",
        "data-locator": "link-header-my-account-search"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        "aria-hidden": "true",
        src: this.props.iconSearch
      })));
      var defaultview = react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(searchbar, this.props));
      return this.state.isMobile ? mobileView : defaultview;
    }
  }]);

  return HeaderSearchBar;
}(react["Component"]);

/* harmony default export */ var header_search_bar = (header_search_bar_HeaderSearchBar);
// CONCATENATED MODULE: ./src/header-search-bar/index.js

// CONCATENATED MODULE: ./src/header-search-modal/header-search-modal.js












var header_search_modal_HeaderSearchModal = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(HeaderSearchModal, _Component);

  function HeaderSearchModal(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, HeaderSearchModal);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(HeaderSearchModal).call(this, props));

    _this.showSearchModal = function () {
      _this.setState({
        mobileSearchOpen: !_this.state.mobileSearchOpen
      }, function () {
        return _this.elementNoScrollDebounce(_this.state.mobileSearchOpen);
      });
    };

    _this.hideSearchModal = function (e) {
      if (_this.state.mobileSearchOpen) {
        _this.setState({
          mobileSearchOpen: false
        });

        _this.elementNoScrollDebounce(false);
      }
    };

    _this.windowResizeHandler = function () {
      if (!_this.state.mobileSearchOpen) {
        return;
      } // Trigger the action only when screen width changes


      if (_this.prevWindowWidth === window.innerWidth) {
        _this.elementNoScrollDebounce(true);

        return;
      }

      _this.prevWindowWidth = window.innerWidth;

      _this.hideSearchModalDebounce();
    };

    _this.state = {
      isMobile: screenSizes["a" /* default */].isMobile(),
      mobileSearchOpen: false
    };
    _this.prevWindowWidth = window.innerWidth; // Debouncing functions to reduce frequency of execution

    _this.hideSearchModalDebounce = Object(index_umd["debounce"])(100, _this.hideSearchModal);
    _this.elementNoScrollDebounce = Object(index_umd["debounce"])(100, domElements["a" /* default */].noScroll);
    return _this;
  }

  Object(createClass["a" /* default */])(HeaderSearchModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("showMobileSearch", this.showSearchModal, false); // this is for desktop

      window.addEventListener("resize", this.windowResizeHandler); // this is for iPad orientation

      window.addEventListener("orientationchange", this.hideSearchModalDebounce);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("showMobileSearch", this.showSearchModal);
      window.removeEventListener("resize", this.windowResizeHandler);
      window.removeEventListener("orientationchange", this.hideSearchModalDebounce);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var modalView = react_default.a.createElement("div", {
        className: "mobile-header-search-bar"
      }, react_default.a.createElement("div", {
        className: "mobile-header-search-bar__title"
      }, react_default.a.createElement("span", null, this.props.labels.search), react_default.a.createElement("button", {
        "aria-label": this.props.labels.clear,
        onClick: function onClick(e) {
          return _this2.hideSearchModal(e);
        },
        onMouseDown: function onMouseDown(e) {
          return e.preventDefault();
        },
        className: "mobile-clear-icon"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        "aria-hidden": "true",
        src: this.props.iconClear
      }))), react_default.a.createElement(searchbar, Object.assign({}, this.props, {
        disableOverlay: true
      })));
      return this.state.mobileSearchOpen && modalView;
    }
  }]);

  return HeaderSearchModal;
}(react["Component"]);

/* harmony default export */ var header_search_modal = (header_search_modal_HeaderSearchModal);
// CONCATENATED MODULE: ./src/header-search-modal/index.js

// CONCATENATED MODULE: ./src/globalEntry.js



























function getAuthoredDataForSearchBar(c, h) {
  return {
    baseUrl: c.dataset.baseUrl,
    searchPath: h.dataset.searchPath,
    placeholderTablet: c.dataset.placeholderTablet,
    placeholderMobile: c.dataset.placeholderMobile,
    iconSearch: c.dataset.iconSearch,
    iconClear: c.dataset.iconClear,
    isocode: c.dataset.isocode,
    customStyle: c.dataset.customStyle || '',
    clearLabel: c.dataset.clearLabel || '',
    searchLabel: c.dataset.searchLabel || '',
    autoSuggestLabel: c.dataset.autoSuggestLabel || ''
  };
}

var MyAccountDropDownContainer = document.querySelector('.top-bar__nav__user__dropdown');
var searchBarContainer = document.getElementById('js-search-bar');
var globalEntry_header = document.querySelector('.cmp-header');

if (globalEntry_header && MyAccountDropDownContainer) {
  var globalEntry_config = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
  var commerceConfigs = document.getElementById('commerce-configs-json');
  var isEditMode = document.getElementById("header") ? document.getElementById("header").hasAttribute("data-is-edit-mode") : false;
  var eProcSetupFailure = {};

  if (commerceConfigs) {
    eProcSetupFailure = JSON.parse(commerceConfigs.innerHTML);
  }

  react_dom_default.a.render(react_default.a.createElement(my_account_dropdown, {
    config: globalEntry_config,
    eProcSetupFailure: eProcSetupFailure.setupFailure || {},
    isEditMode: isEditMode
  }), MyAccountDropDownContainer);
}

var headerSearchBarContainer = document.getElementById('header-search-bar');
var headerMobileSearchContainer = document.getElementById('mobile-header-search-container');

if (headerMobileSearchContainer && headerSearchBarContainer && globalEntry_header) {
  var globalEntry_data = getAuthoredDataForSearchBar(headerSearchBarContainer, globalEntry_header);
  var searchLabels = {
    clear: globalEntry_data.clearLabel,
    search: globalEntry_data.searchLabel,
    autoSuggest: globalEntry_data.autoSuggestLabel
  };
  react_dom_default.a.render(react_default.a.createElement(header_search_bar, {
    iconSearch: globalEntry_data.iconSearch,
    iconClear: globalEntry_data.iconClear,
    searchPath: globalEntry_data.searchPath,
    placeholderTablet: globalEntry_data.placeholderTablet,
    placeholderMobile: globalEntry_data.placeholderMobile,
    baseUrl: globalEntry_data.baseUrl,
    isocode: globalEntry_data.isocode,
    customStyle: globalEntry_data.customStyle,
    labels: searchLabels
  }), headerSearchBarContainer);
  react_dom_default.a.render(react_default.a.createElement(header_search_modal, {
    iconSearch: globalEntry_data.iconSearch,
    iconClear: globalEntry_data.iconClear,
    searchPath: globalEntry_data.searchPath,
    placeholderTablet: globalEntry_data.placeholderTablet,
    placeholderMobile: globalEntry_data.placeholderMobile,
    baseUrl: globalEntry_data.baseUrl,
    isocode: globalEntry_data.isocode,
    customStyle: globalEntry_data.customStyle,
    labels: searchLabels
  }), headerMobileSearchContainer);
}

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var _utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);





var getData = /*#__PURE__*/function () {
  var _ref = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
    var response;
    return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
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

var UserDetails = /*#__PURE__*/function () {
  var _ref2 = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var url,
        _response,
        _args2 = arguments;

    return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : "https://stgservices.waters.com/api/waters/user/v1/details";
            _context2.prev = 1;
            _context2.next = 4;
            return getData(url);

          case 4:
            _response = _context2.sent;

            if (!(_response.status === 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", _response.json());

          case 9:
            if (_response.status === 401 && window.location.href.indexOf('my-account.html') !== -1) {
              Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_3__[/* signInRedirect */ "d"])();
            }

          case 10:
            return _context2.abrupt("return", {
              failed: true,
              error: _response.status
            });

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", {
              failed: true,
              error: response.status
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));

  return function UserDetails() {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["a"] = (UserDetails);

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(13);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(16);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var stores_sessionStore = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(38);

// CONCATENATED MODULE: ./src/my-account/services/SoldToDetails.js




var getData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url, {
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

var SoldToDetails = /*#__PURE__*/function () {
  var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(url) {
    var _response, json, returnArray;

    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getData(url);

          case 3:
            _response = _context2.sent;
            _context2.next = 6;
            return _response.json();

          case 6:
            json = _context2.sent;

            if (!(_response.status === 200)) {
              _context2.next = 12;
              break;
            }

            returnArray = Array.isArray(json.customers) ? json.customers : [];
            return _context2.abrupt("return", returnArray);

          case 12:
            if (_response.status === 401 && window.location.href.indexOf('my-account.html') !== -1) {
              signInRedirect();
            }

          case 13:
            return _context2.abrupt("return", {
              failed: true,
              error: _response.status
            });

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", {
              failed: true,
              error: response.status
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function SoldToDetails(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/* harmony default export */ var services_SoldToDetails = (SoldToDetails);
// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(11);

// CONCATENATED MODULE: ./src/my-account/services/SoldToDetailsLazy.js







/* harmony default export */ var SoldToDetailsLazy = __webpack_exports__["a"] = (/*#__PURE__*/(function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(soldToDetailsUrl, userId, salesOrg) {
    var sessionStore,
        service,
        currentPage,
        soldToUrl,
        soldToDetails,
        hasDefaultSoldTo,
        response,
        hideCartClass,
        headerNavigation_cartLI,
        _args = arguments;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sessionStore = _args.length > 3 && _args[3] !== undefined ? _args[3] : new stores_sessionStore["a" /* default */]();
            service = _args.length > 4 && _args[4] !== undefined ? _args[4] : services_SoldToDetails;
            currentPage = window.location.href;
            soldToUrl = "".concat(soldToDetailsUrl, "/").concat(userId, "?salesOrg=").concat(salesOrg);

            if (!((!loginStatus["a" /* default */].state() || currentPage.indexOf("sign-in") !== -1 || currentPage.indexOf("create-account") !== -1 || currentPage.indexOf("trouble-signing-in") !== -1 || currentPage.indexOf("update-password") !== -1 || currentPage.indexOf("reset-password") !== -1) && currentPage.indexOf('choose-account') !== -1)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", []);

          case 6:
            soldToDetails = sessionStore.getSoldToDetails(); //START Patches for EComm

            if (!(soldToDetails && soldToDetails.length !== 0)) {
              _context.next = 12;
              break;
            }

            hasDefaultSoldTo = false;
            soldToDetails.map(function (soldTo) {
              if ((soldTo.soldToFlag && soldTo.soldToFlag === 1 || soldTo.default_soldTo && soldTo.default_soldTo === 1) && soldTo.soldToInfo && soldTo.soldToInfo.length !== 0 && soldTo.billToInfo && soldTo.shipToInfo) {
                hasDefaultSoldTo = true;
                soldTo.soldToFlag = 1;
                soldTo.default_soldTo = 1;
              }
            });

            if (!hasDefaultSoldTo) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", soldToDetails);

          case 12:
            _context.next = 14;
            return service(soldToUrl);

          case 14:
            response = _context.sent;

            if (response.failed) {
              _context.next = 21;
              break;
            }

            sessionStore.setSoldToDetails(response); // Show or Hide Cart Icon dependent upon eCommerce Status

            hideCartClass = "top-bar__nav__cart--hide";
            headerNavigation_cartLI = document.querySelector(".top-bar__nav__cart");

            if (headerNavigation_cartLI) {
              if (Object(eCommerceFunctions["e" /* isCartHidden */])()) {
                domElements["a" /* default */].addClass(headerNavigation_cartLI, hideCartClass);
              } else {
                domElements["a" /* default */].removeClass(headerNavigation_cartLI, hideCartClass);
              }
            }

            return _context.abrupt("return", response);

          case 21:
            return _context.abrupt("return", []);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _services_UserDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51);





/* harmony default export */ __webpack_exports__["a"] = (/*#__PURE__*/(function () {
  var _ref = Object(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(userDetailsUrl, checkSessionStore) {
    var sessionStore,
        service,
        navBarControls,
        userDetails,
        response,
        _args = arguments;
    return C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sessionStore = _args.length > 2 && _args[2] !== undefined ? _args[2] : new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]();
            service = _args.length > 3 && _args[3] !== undefined ? _args[3] : _services_UserDetails__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"];
            // Don't get User Details if My-Account Drop Down is not present
            navBarControls = document.getElementsByClassName("cmp-header__top-bar__nav");

            if (!(navBarControls.length === 0)) {
              _context.next = 6;
              break;
            }

            console.info("UserDetails API cannot be initiated due to nav bar controls");
            return _context.abrupt("return", {});

          case 6:
            if (_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].state()) {
              _context.next = 9;
              break;
            }

            console.info("UserDetails API cannot be initiated due to unavailability of login cookie");
            return _context.abrupt("return", {});

          case 9:
            if (!checkSessionStore) {
              _context.next = 13;
              break;
            }

            userDetails = sessionStore.getUserDetails();

            if (!(userDetails && Object.keys(userDetails).length !== 0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", userDetails);

          case 13:
            _context.next = 15;
            return service(userDetailsUrl);

          case 15:
            response = _context.sent;

            if (response.failed) {
              _context.next = 19;
              break;
            }

            sessionStore.setUserDetails(response);
            return _context.abrupt("return", response);

          case 19:
            return _context.abrupt("return", {});

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

/***/ })

/******/ });