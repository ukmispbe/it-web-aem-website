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
/******/ 		6: 0,
/******/ 		5: 0
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
/******/ 	deferredModules.push([396,1,2,0]);
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

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f6f8f9","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/styles/index.scss
var styles = __webpack_require__(104);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(23);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(36);

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

// EXTERNAL MODULE: ./src/search/services/index.js
var services = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(500);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// CONCATENATED MODULE: ./src/search/components/no-results.js



var no_results_NoResults = function NoResults(_ref) {
  var searchText = _ref.searchText,
      query = _ref.query;
  var forQuery = react_default.a.createElement("span", null, "for \"", react_default.a.createElement("strong", null, query), "\"");
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("h2", {
    className: "cmp-search__resultsCount noresults"
  }, searchText.noResultsText, " ", ' ', " ", forQuery), react_default.a.createElement("div", {
    className: "cmp-search__no-results"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    className: "icon",
    src: searchText.noResultsIcon
  }), react_default.a.createElement("h2", null, searchText.noResultsTitle), react_default.a.createElement("p", null, searchText.noResultsDescription, react_default.a.createElement("a", {
    href: window.location.href.split('?')[0]
  }, searchText.noResultsSearchLinkText))));
};

/* harmony default export */ var no_results = (no_results_NoResults);
// EXTERNAL MODULE: ./node_modules/validator/index.js
var validator = __webpack_require__(59);
var validator_default = /*#__PURE__*/__webpack_require__.n(validator);

// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(17);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(14);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(27);

// CONCATENATED MODULE: ./src/search/components/loading.js



var loading_Loading = function Loading(_ref) {
  var visible = _ref.visible;

  if (!visible) {
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  return react_default.a.createElement("div", null, react_default.a.createElement("div", {
    className: "overlay"
  }), react_default.a.createElement(spinner["a" /* default */], {
    loading: true
  }));
};

loading_Loading.defaultProps = {
  visible: false
};
/* harmony default export */ var components_loading = (loading_Loading);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./src/search/search.component.props.js

var propTypes = {
  text: prop_types_default.a.object.isRequired,
  filterMap: prop_types_default.a.any.isRequired,
  skuConfig: prop_types_default.a.object.isRequired,
  searchParams: prop_types_default.a.object.isRequired,
  category: prop_types_default.a.any,
  categoryProps: prop_types_default.a.shape({
    categories: prop_types_default.a.arrayOf(prop_types_default.a.object).isRequired,
    activeIndex: prop_types_default.a.number.isRequired
  }).isRequired,
  categoryEvents: prop_types_default.a.shape({
    onCategoryTabClick: prop_types_default.a.func.isRequired,
    onCategoryDropdownChange: prop_types_default.a.func.isRequired
  }).isRequired,
  showSortFilterProps: prop_types_default.a.shape({
    collapseFilters: prop_types_default.a.func.isRequired
  }).isRequired,
  showSortFilterEvents: prop_types_default.a.shape({
    onSetupFilters: prop_types_default.a.func.isRequired,
    onResetToSavedState: prop_types_default.a.func.isRequired,
    onClose: prop_types_default.a.func.isRequired
  }).isRequired,
  asideProps: prop_types_default.a.shape({
    sortFilterIsPristine: prop_types_default.a.bool,
    count: prop_types_default.a.number,
    sortValue: prop_types_default.a.number
  }).isRequired,
  asideEvents: prop_types_default.a.shape({
    onHideSortFilterClick: prop_types_default.a.func,
    onApplySortFilter: prop_types_default.a.func,
    onCollapseFilters: prop_types_default.a.func,
    onSort: prop_types_default.a.func
  }).isRequired,
  menuProps: prop_types_default.a.shape({
    showContentTypeMenu: prop_types_default.a.bool.isRequired,
    showFacetMenu: prop_types_default.a.bool.isRequired,
    heading: prop_types_default.a.string
  }).isRequired,
  resultsProps: prop_types_default.a.shape({
    rows: prop_types_default.a.number.isRequired,
    count: prop_types_default.a.number.isRequired,
    query: prop_types_default.a.string,
    current: prop_types_default.a.number.isRequired,
    noQuery: prop_types_default.a.bool,
    spell_check: prop_types_default.a.bool.isRequired,
    spell_related_suggestions: prop_types_default.a.array.isRequired,
    spell_suggestion: prop_types_default.a.string,
    items: prop_types_default.a.any,
    isSkuList: prop_types_default.a.bool.isRequired,
    pagination: prop_types_default.a.object.isRequired
  }).isRequired,
  resultsEvents: prop_types_default.a.shape({
    onRelatedSuggestionClick: prop_types_default.a.func.isRequired,
    onResultsItemClick: prop_types_default.a.func.isRequired,
    onPageChange: prop_types_default.a.func.isRequired
  }).isRequired,
  contentTypeMenuProps: prop_types_default.a.shape({
    items: prop_types_default.a.array.isRequired
  }).isRequired,
  contentTypeMenuEvents: prop_types_default.a.shape({
    onContentTypeItemClick: prop_types_default.a.func.isRequired
  }).isRequired,
  facetMenuProps: prop_types_default.a.shape({
    selectedValue: prop_types_default.a.string,
    previousIcon: prop_types_default.a.string
  }).isRequired,
  facetMenuEvents: prop_types_default.a.shape({
    onContentTypeRemoval: prop_types_default.a.func.isRequired
  }).isRequired,
  subFacetFiltersProps: prop_types_default.a.shape({
    items: prop_types_default.a.array | prop_types_default.a.object,
    filterMap: prop_types_default.a.array.isRequired | prop_types_default.a.object,
    defaultFacet: prop_types_default.a.string,
    selectedFacets: prop_types_default.a.object.isRequired,
    contentType: prop_types_default.a.string,
    facetGroupsSelectedOrder: prop_types_default.a.array.isRequired,
    collapseAllFilters: prop_types_default.a.bool.isRequired,
    activeIndex: prop_types_default.a.number.isRequired
  }).isRequired,
  subFacetFiltersEvents: prop_types_default.a.shape({
    onFilterSelect: prop_types_default.a.func.isRequired,
    onGroupClick: prop_types_default.a.func.isRequired
  }).isRequired,
  filterTagsProps: prop_types_default.a.shape({
    keyword: prop_types_default.a.string,
    spell_suggestion: prop_types_default.a.string,
    contentTypeSelected: prop_types_default.a.object.isRequired,
    selectedFacets: prop_types_default.a.object.isRequired,
    facets: prop_types_default.a.object.isRequired | prop_types_default.a.array,
    defaultFacet: prop_types_default.a.string,
    contentType: prop_types_default.a.string
  }).isRequired,
  filterTagsEvents: prop_types_default.a.shape({
    onClearAll: prop_types_default.a.func.isRequired,
    onKeywordRemove: prop_types_default.a.func.isRequired,
    onContentTypeRemove: prop_types_default.a.func.isRequired,
    onSubFacetRemove: prop_types_default.a.func.isRequired
  }).isRequired
};
var defaultProps = {
  text: {},
  filterMap: {},
  skuConfig: {},
  searchParams: {},
  category: '',
  categoryProps: {
    categories: [],
    activeIndex: -1
  },
  categoryEvents: {
    onCategoryTabClick: function onCategoryTabClick() {},
    onCategoryDropdownChange: function onCategoryDropdownChange() {}
  },
  showSortFilterProps: {
    collapseFilters: function collapseFilters() {}
  },
  showSortFilterEvents: {
    onSetupFilters: function onSetupFilters() {},
    onResetToSavedState: function onResetToSavedState() {},
    onClose: function onClose() {}
  },
  asideProps: {
    sortFilterIsPristine: false,
    count: 0,
    sortValue: 1
  },
  asideEvents: {
    onHideSortFilterClick: function onHideSortFilterClick() {},
    onApplySortFilter: function onApplySortFilter() {},
    onCollapseFilters: function onCollapseFilters() {},
    onSort: function onSort() {}
  },
  menuProps: {
    showContentTypeMenu: false,
    showFacetMenu: false,
    heading: ''
  },
  resultsProps: {
    rows: 0,
    count: 0,
    query: "",
    current: 0,
    noQuery: false,
    spell_check: false,
    spell_related_suggestions: [],
    spell_suggestion: '',
    items: [],
    isSkuList: false,
    pagination: {},
    categoryOptions: [],
    categoryValue: 0
  },
  resultsEvents: {
    onRelatedSuggestionClick: function onRelatedSuggestionClick() {},
    onResultsItemClick: function onResultsItemClick() {},
    onPageChange: function onPageChange() {}
  },
  contentTypeMenuProps: {
    items: []
  },
  contentTypeMenuEvents: {
    onContentTypeItemClick: function onContentTypeItemClick() {}
  },
  facetMenuProps: {
    selectedValue: '',
    previousIcon: ''
  },
  facetMenuEvents: {
    onContentTypeRemoval: function onContentTypeRemoval() {}
  },
  subFacetFiltersProps: {
    items: [],
    filterMap: {},
    defaultFacet: '',
    selectedFacets: {},
    contentType: '',
    facetGroupsSelectedOrder: [],
    collapseAllFilters: false,
    activeIndex: -1
  },
  subFacetFiltersEvents: {
    onFilterSelect: function onFilterSelect() {},
    onGroupClick: function onGroupClick() {}
  },
  filterTagsProps: {
    keyword: '',
    spell_suggestion: '',
    contentTypeSelected: {},
    selectedFacets: {},
    facets: {},
    defaultFacet: '',
    contentType: ''
  },
  filterTagsEvents: {
    onClearAll: function onClearAll() {},
    onKeywordRemove: function onKeywordRemove() {},
    onContentTypeRemove: function onContentTypeRemove() {},
    onSubFacetRemove: function onSubFacetRemove() {}
  }
};

// EXTERNAL MODULE: ./node_modules/react-paginate/dist/react-paginate.js
var react_paginate = __webpack_require__(64);
var react_paginate_default = /*#__PURE__*/__webpack_require__.n(react_paginate);

// CONCATENATED MODULE: ./src/search/components/content-type-menu.js


var content_type_menu_ContentTypeMenu = function ContentTypeMenu(props) {
  var Items = function Items() {
    return props.items.map(function (item) {
      return react_default.a.createElement("div", {
        key: item.facetName,
        className: "content-type-menu-container__item",
        onClick: function onClick() {
          return props.onClick(item);
        }
      }, react_default.a.createElement("div", null, react_default.a.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();
          return false;
        },
        "data-count": " (".concat(item.count, ")")
      }, item.facetTranslation)));
    });
  };

  return react_default.a.createElement("div", {
    className: "content-type-menu-container"
  }, react_default.a.createElement("div", {
    className: "content-type-menu-container__heading"
  }, props.heading), react_default.a.createElement("div", {
    className: "content-type-menu-container__body"
  }, Items()));
};

content_type_menu_ContentTypeMenu.defaultProps = {
  heading: '',
  items: [],
  onClick: function onClick() {}
};
/* harmony default export */ var content_type_menu = (content_type_menu_ContentTypeMenu);
// CONCATENATED MODULE: ./src/search/components/facet-menu.js



var facet_menu_FacetMenu = function FacetMenu(props) {
  return react_default.a.createElement("div", {
    className: "facet-menu-container",
    "data-locator": "facet-menu-container"
  }, react_default.a.createElement("div", {
    className: "facet-menu-container__heading",
    "data-locator": "facet-menu-container-heading"
  }, props.filterTags, react_default.a.createElement("div", {
    className: "heading--with-selected-value",
    "data-locator": "heading-with-selected-value"
  }, react_default.a.createElement("div", {
    className: "back-btn"
  }, react_default.a.createElement("a", {
    href: "javascript:void(0)",
    onClick: props.onClear,
    "data-locator": "link-back-button"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.previousIcon
  }), " ", props.heading)), react_default.a.createElement("h3", null, props.selectedValue))), react_default.a.createElement("div", {
    className: "facet-menu-container__body",
    "data-locator": "facet-menu-container-body"
  }, props.children));
};

facet_menu_FacetMenu.defaultProps = {
  heading: '',
  selectedValue: '',
  previousIcon: '',
  filterTags: react_default.a.createElement(react_default.a.Fragment, null),
  onClear: function onClear() {}
};
/* harmony default export */ var facet_menu = (facet_menu_FacetMenu);
// CONCATENATED MODULE: ./src/search/components/filter-section.js









var filter_section_FilterSection = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(FilterSection, _Component);

  function FilterSection(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, FilterSection);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(FilterSection).call(this, props));

    _this.setStateForItems = function (items) {
      return _this.setState({
        items: items
      });
    };

    _this.setStateForSearchValue = function (searchValue) {
      return _this.setState({
        searchValue: searchValue
      });
    };

    _this.isEmpty = function (value) {
      return validator_default.a.isEmpty(value, {
        ignore_whitespace: false
      });
    };

    _this.lengthLessThan = function (value, lengthComparison) {
      return value.length < lengthComparison;
    };

    _this.valueStartsWith = function (value, valueComparison) {
      return value.toLowerCase().startsWith(valueComparison.toLowerCase());
    };

    _this.filterList = function (value, minCharSearch, items) {
      return _this.isEmpty(value) || _this.lengthLessThan(value, minCharSearch) ? items : items.filter(function (item) {
        return _this.valueStartsWith(item.value, value);
      });
    };

    _this.handleSearchChange = function (value, minCharSearch, items) {
      _this.setStateForSearchValue(value);

      _this.setStateForItems(_this.filterList(value, minCharSearch, items));
    };

    _this.handleClearClick = function (minCharSearch, items) {
      _this.setStateForSearchValue('');

      _this.setStateForItems(_this.filterList('', minCharSearch, items));
    };

    _this.getFacetSearch = function (items, minItemSearch) {
      if (items.length >= minItemSearch) {
        return react_default.a.createElement("div", {
          className: "cmp-search-filters__filter__search"
        }, !_this.state.searchValue.length ? react_default.a.createElement(react_svg["a" /* default */], {
          src: _this.props.text.searchIcon,
          className: "searchIcon"
        }) : react_default.a.createElement(react_svg["a" /* default */], {
          src: _this.props.text.closeIcon,
          className: "closeIcon",
          onClick: function onClick() {
            return _this.handleClearClick(_this.props.minCharSearch, _this.props.facet.facets);
          }
        }), react_default.a.createElement("input", {
          type: "input",
          placeholder: "Search",
          onChange: function onChange(e) {
            return _this.handleSearchChange(e.target.value, _this.props.minCharSearch, _this.props.facet.facets);
          },
          value: _this.state.searchValue,
          ref: _this.searchRef
        }));
      }
    };

    _this.state = {
      items: props.facet.facets,
      searchValue: ''
    };
    _this.searchRef = react_default.a.createRef();
    return _this;
  }

  Object(createClass["a" /* default */])(FilterSection, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      /*
          This will check if the facets have been modified
          due to other facets being checked off.  If so,
          set state using the updated facets props.
      */
      var prevFacets = JSON.stringify(prevProps.facet.facets);
      var currFacets = JSON.stringify(this.props.facet.facets);

      if (!validator_default.a.equals(prevFacets, currFacets)) {
        this.setStateForItems(this.props.facet.facets);
        /*
            Since the facets prop has changed check to see
            if there is a search value so it can be
            applied on the updated facets props
        */

        if (this.searchRef.current && !this.isEmpty(this.state.searchValue)) {
          this.handleSearchChange(this.state.searchValue, this.props.minCharSearch, this.props.facet.facets);
        }
      }
    }
  }, {
    key: "checkHandler",
    value: function checkHandler(itemCount, event) {
      if (itemCount !== 0) {
        event.currentTarget.nextElementSibling.click();
      }
    }
  }, {
    key: "getFacetOptions",
    value: function getFacetOptions() {
      var _this2 = this;

      var options = this.state.items;
      var option = options.map(function (item, index) {
        var checked = false;

        if (_this2.props.selectedFacets[_this2.props.facet.name]) {
          for (var i = 0; i < _this2.props.selectedFacets[_this2.props.facet.name].length; i++) {
            var f = _this2.props.selectedFacets[_this2.props.facet.name][i];
            if (f === item.value) checked = true;
          }
        }

        return react_default.a.createElement("li", {
          className: "cmp-search-filters__filter__item ".concat(item.count === 0 ? "inactive" : ""),
          key: "".concat(item.value, "#_").concat(index)
        }, react_default.a.createElement("a", {
          href: "javascript:void(0)",
          className: "checkbox ".concat(item.count === 0 ? "inactive" : "") + (checked ? 'checked' : ''),
          onClick: _this2.checkHandler.bind(_this2, item.count),
          "data-locator": "search-filters-filter-item"
        }, react_default.a.createElement(react_svg["a" /* default */], {
          src: _this2.props.text.checkmarkIcon
        })), react_default.a.createElement("input", {
          type: "checkbox",
          name: "".concat(_this2.props.name, ":").concat(item.value),
          onChange: function onChange(e) {
            return _this2.props.selectHandler(item.value, _this2.props.facet.name, e);
          },
          checked: checked
        }), react_default.a.createElement("label", {
          htmlFor: "".concat(_this2.props.name, ":").concat(item.value)
        }, item.value, ' ', react_default.a.createElement("span", {
          className: "cmp-search-filters__filter__item__count ".concat(item.count === 0 ? "inactive" : "")
        }, "(", item.count, ")")));
      });
      return option;
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var className = "cmp-search-filters__filter ".concat(props.isExpanded ? 'expanded' : '');
      return react_default.a.createElement("li", {
        className: className,
        "data-locator": "search-filters-filter"
      }, react_default.a.createElement("a", {
        href: "javascript:void(0);",
        className: "filter-toggle",
        item: props.item,
        onClick: function onClick(e) {
          return props.handleInput(e, props.item);
        },
        "data-locator": "link-search-filter"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.expandIcon,
        className: "expandIcon"
      }), react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.collapseIcon,
        className: "collapseIcon"
      }), react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.nextIcon,
        className: "mobileIcon"
      }), props.facet.translation), react_default.a.createElement("div", {
        className: "facet-container"
      }, this.getFacetSearch(this.props.facet.facets, this.props.minItemSearch), react_default.a.createElement("ul", null, this.getFacetOptions())));
    }
  }]);

  return FilterSection;
}(react["Component"]);

/* harmony default export */ var filter_section = (filter_section_FilterSection);
// CONCATENATED MODULE: ./src/search/components/filter.js











var filter_Filter = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(Filter, _Component);

  function Filter(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Filter);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Filter).call(this, props));

    _this.collapseAllFilters = function () {
      var facetGroups = _this.mapFacetGroupsState(-1, _this.getMappings());

      _this.setState({
        facetGroups: facetGroups
      });
    };

    _this.mapFacetGroupsState = function (activeIndex, mappings) {
      // defensive programming
      if (!mappings || !Array.isArray(mappings)) {
        return [];
      }

      if (activeIndex === -1) {
        return mappings;
      }

      var facetGroups = mappings.map(function (group, groupIndex) {
        if (groupIndex === activeIndex) {
          // expand the group that was clicked
          return Object(objectSpread["a" /* default */])({}, group, {
            isExpanded: true
          });
        } else {
          // ensures all other groups are not expanded
          return Object(objectSpread["a" /* default */])({}, group, {
            isExpanded: false
          });
        }
      });
      return facetGroups;
    };

    _this.setState_ActiveFacet = function () {
      var mappings = _this.getMappings();

      var facetGroups = _this.mapFacetGroupsState(_this.props.activeIndex, mappings);

      var facetName = _this.props.activeIndex !== -1 ? _this.props.facetGroupsSelectedOrder[_this.props.activeIndex] : '';

      _this.setState({
        facetName: facetName,
        facetGroups: facetGroups
      });
    };

    _this.getMappings = function () {
      return services["d" /* searchMapper */].mapFacetGroups(_this.props.contentType, _this.props.filterMap, _this.props.facets);
    };

    _this.state = {
      lastIndex: -1,
      facetName: '',
      isExpanded: false,
      facetGroups: _this.mapFacetGroupsState(-1, _this.getMappings())
    };
    return _this;
  }

  Object(createClass["a" /* default */])(Filter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState_ActiveFacet();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      /*
          Check if content type was removed and there is an expanded filter.
          If so, reset state so all filters are collapsed.
      */
      if (prevProps.contentType && !this.props.contentType && this.props.activeIndex !== -1) {
        var classNameFilterActive = 'filter-active';

        if (Array.from(document.body.classList).find(function (item) {
          return item === classNameFilterActive;
        })) {
          document.body.classList.remove(classNameFilterActive);
        } //this.setState({activeIndex: -1, facetName: "", isExpanded: false, lastIndex: -1});


        this.props.onGroupClick(-1);
        return;
      }
      /*
          This will validate the selected facet group.
          If the facet groups have been modified due to other facets being checked off,
          then this will recaludate the active index because it may have changed.
      */


      if (this.props.activeIndex !== -1) {
        var prevFacets = JSON.stringify(prevProps.facets);
        var currFacets = JSON.stringify(this.props.facets);

        if (!validator_default.a.equals(prevFacets, currFacets)) {
          // When the facets have changed it indicates that the facet groups were reordered
          // therefore, it will not have the same index in the array since the array has changed
          this.setState_ActiveFacet();
        }
      }

      if (!prevProps.collapseAllFilters && this.props.collapseAllFilters) {
        this.collapseAllFilters();
      }
    }
  }, {
    key: "filterHandler",
    value: function filterHandler(facetName, index) {
      // defensive programming
      if (!this.state.facetGroups || this.state.facetGroups.length === 0) {
        return;
      }

      if (this.state.facetGroups[index].isExpanded) {
        var facetGroups = this.mapFacetGroupsState(-1, this.getMappings());
        this.setState({
          facetGroups: facetGroups,
          lastIndex: -1
        });
        document.body.classList.remove('filter-active');
        this.props.onGroupClick(facetName, -1);
      } else {
        var lastIndex = this.props.activeIndex === -1 ? index : this.props.activeIndex;

        var _facetGroups = this.mapFacetGroupsState(index, this.getMappings());

        this.setState({
          facetGroups: _facetGroups,
          lastIndex: lastIndex
        });
        document.body.classList.add('filter-active');
        this.props.onGroupClick(facetName, index);
      }
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      var _this2 = this;

      if (this.props.showTagsOnly) return react_default.a.createElement(react_default.a.Fragment, null);
      var props = this.props;
      var mappings = this.state.facetGroups;
      var filters = Array.isArray(mappings) ? mappings.map(function (item, index) {
        return react_default.a.createElement(filter_section, {
          key: "".concat(item.category, "#_").concat(index),
          last: _this2.state.lastIndex,
          selected: _this2.props.activeIndex,
          item: index,
          handleInput: function handleInput(e) {
            return _this2.filterHandler(item.name, index);
          },
          text: props.text,
          facet: item,
          selectHandler: props.selectHandler,
          selectedFacets: props.selectedFacets,
          minItemSearch: 21,
          minCharSearch: 2,
          activeCategory: _this2.state.facetName,
          isExpanded: item.isExpanded
        });
      }) : [];
      return react_default.a.createElement("ul", null, filters);
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        id: "js-search-filters",
        className: "cmp-search-filters"
      }, this.props.facets && this.getFilters());
    }
  }]);

  return Filter;
}(react["Component"]);

filter_Filter.defaultProps = {
  facets: null,
  filterMap: {
    orderedFacets: []
  },
  showTagsOnly: false,
  facetGroupsSelectedOrder: [],
  collapseAllFilters: false,
  onGroupClick: function onGroupClick() {}
};
/* harmony default export */ var filter = (filter_Filter);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js + 1 modules
var react_select_esm = __webpack_require__(48);

// EXTERNAL MODULE: ./src/utils/dropdown/custom-styles.js
var custom_styles = __webpack_require__(98);

// CONCATENATED MODULE: ./src/search/components/category-dropdown.js







var category_dropdown_getOptions = function getOptions(options) {
  var newList = options.filter(function (item) {
    return item.count !== 0;
  }).map(function (a, index) {
    return {
      value: index,
      label: a.translation
    };
  });
  return newList;
};

var category_dropdown_dropdownComponents = function dropdownComponents(label) {
  var prefix = label != '' ? label + ' ' : '';
  return {
    SingleValue: function SingleValue(_ref) {
      var children = _ref.children,
          props = Object(objectWithoutProperties["a" /* default */])(_ref, ["children"]);

      return react_default.a.createElement(react_select_esm["a" /* components */].SingleValue, props, prefix + children);
    },
    DropdownIndicator: function DropdownIndicator(_ref2) {
      var children = _ref2.children,
          props = Object(objectWithoutProperties["a" /* default */])(_ref2, ["children"]);

      return react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, react_default.a.createElement(react_svg["a" /* default */], {
        src: props.theme.dropdownIndicator,
        className: "dropDownIcon"
      }));
    }
  };
};

var category_dropdown_CategoryDropdown = function CategoryDropdown(props) {
  var options = category_dropdown_getOptions(props.categoryOptions);

  var mobileView = function mobileView() {
    return react_default.a.createElement("div", {
      className: "cmp-search-category-dropdown"
    }, react_default.a.createElement(react_select_esm["c" /* default */], {
      options: options,
      value: options[props.categoryValue],
      onChange: props.categoryOnChange,
      isSearchable: props.categoryIsSearchable,
      styles: custom_styles["a" /* default */],
      placeholder: props.categoryPlaceholder,
      classNamePrefix: 'cmp-custom-dropdown',
      components: category_dropdown_dropdownComponents(props.categoryLabelPrefix),
      theme: {
        dropdownIndicator: props.categoryDownIcon
      }
    }));
  };

  return react_default.a.createElement(react_default.a.Fragment, null, screenSizes["a" /* default */].isTabletAndUnder() ? mobileView() : null);
};

category_dropdown_CategoryDropdown.defaultProps = {
  categoryOptions: [],
  categoryOnChange: function categoryOnChange() {},
  categoryLabelPrefix: '',
  categoryIsSearchable: false,
  categoryPlaceholder: '',
  categoryDownIcon: '',
  categoryValue: 0
};
/* harmony default export */ var category_dropdown = (category_dropdown_CategoryDropdown);
// CONCATENATED MODULE: ./src/search/components/btn-hide-sort-filter.js








var btn_hide_sort_filter_HideSortFilter = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(HideSortFilter, _Component);

  function HideSortFilter(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, HideSortFilter);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(HideSortFilter).call(this, props));
    _this.state = {
      value: ''
    };
    return _this;
  }

  Object(createClass["a" /* default */])(HideSortFilter, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return react_default.a.createElement("div", {
        className: "cmp-search-hide-btn clearfix"
      }, react_default.a.createElement("a", {
        href: "javascript:void(0);",
        onClick: props.onClick,
        className: "btn-hide-sort-filter",
        "data-locator": "link-hide-search-button"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.closeIcon
      }), props.text.sortAndFilterButton));
    }
  }]);

  return HideSortFilter;
}(react["Component"]);

/* harmony default export */ var btn_hide_sort_filter = (btn_hide_sort_filter_HideSortFilter);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(19);

// CONCATENATED MODULE: ./src/search/components/btn-apply-sort-filter.js










var btn_apply_sort_filter_ApplySortFilter = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(ApplySortFilter, _Component);

  function ApplySortFilter(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ApplySortFilter);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ApplySortFilter).call(this, props));

    _this.buttonCaption = function () {
      return _this.props.isPristine ? _this.props.text.applyButton : _this.props.text.showResultCount.replace(/[{]count[}]/, _this.props.count);
    };

    _this.handleClick = function () {
      _this.props.applyFilters();

      if (screenSizes["a" /* default */].isMobile()) {
        // show the header after filters are applied
        var header = domElements["a" /* default */].getHeader();
        header.style.display = '';
      }
    };

    _this.state = {
      value: ''
    };
    _this.handleInput = _this.handleInput.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(ApplySortFilter, [{
    key: "handleInput",
    value: function handleInput(e) {
      this.setState({
        showSortFilters: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "cmp-search-apply-btn"
      }, react_default.a.createElement("a", {
        href: "javascript:void(0);",
        onClick: this.handleClick,
        className: "btn-apply-sort-filter",
        "data-locator": "link-search-apply-button"
      }, this.buttonCaption()));
    }
  }]);

  return ApplySortFilter;
}(react["Component"]);

/* harmony default export */ var btn_apply_sort_filter = (btn_apply_sort_filter_ApplySortFilter);
// CONCATENATED MODULE: ./src/search/components/btn-done-sort-filter.js








var btn_done_sort_filter_DoneSortFilter = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(DoneSortFilter, _Component);

  function DoneSortFilter(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, DoneSortFilter);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(DoneSortFilter).call(this, props));
    _this.state = {
      value: ''
    };
    _this.handleInput = _this.handleInput.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(DoneSortFilter, [{
    key: "handleInput",
    value: function handleInput(e) {
      this.props.collapseFilters();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return react_default.a.createElement("div", {
        className: "cmp-search-done-btn"
      }, react_default.a.createElement("a", {
        href: "javascript:void(0);",
        onClick: this.handleInput,
        className: "btn-done-sort-filter",
        "data-locator": "link-done-sort-filter"
      }, props.text.doneButton));
    }
  }]);

  return DoneSortFilter;
}(react["Component"]);

/* harmony default export */ var btn_done_sort_filter = (btn_done_sort_filter_DoneSortFilter);
// EXTERNAL MODULE: ./src/utils/dropdown/index.js
var dropdown = __webpack_require__(65);

// CONCATENATED MODULE: ./src/search/components/sort.js



var sort_getOptions = function getOptions(text) {
  return [{
    value: 1,
    label: text.sortByBestMatch
  }, {
    value: 2,
    label: text.sortByMostRecent
  }];
};

var sort_Sort = function Sort(props) {
  return react_default.a.createElement("div", {
    className: "cmp-search-sortby",
    "data-locator": "sortby-label"
  }, react_default.a.createElement("h3", null, props.text.sortByHeading), react_default.a.createElement(dropdown["a" /* default */], {
    getOptions: sort_getOptions,
    sortValue: props.sortValue,
    onChange: function onChange(e) {
      return props.sortHandler(e);
    },
    isSearchable: false,
    text: props.text
  }));
};

/* harmony default export */ var sort = (sort_Sort);
// CONCATENATED MODULE: ./src/search/components/btn-show-sort-filter.js











var btn_show_sort_filter_ShowSortFilter = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(ShowSortFilter, _Component);

  function ShowSortFilter(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ShowSortFilter);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ShowSortFilter).call(this, props));
    _this.state = {
      value: ''
    };
    _this.handleInput = _this.handleInput.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.sortFilterBtnRef = react_default.a.createRef();
    return _this;
  }

  Object(createClass["a" /* default */])(ShowSortFilter, [{
    key: "handleInput",
    value: function handleInput(e) {
      var showFilterClass = 'show-sort-filters';
      var header = domElements["a" /* default */].getHeader();
      var sortFilterModal = domElements["a" /* default */].getSortFilterhModal();

      if (document.body.classList.contains(showFilterClass)) {
        this.setState({
          showSortFilters: true
        });
        this.props.collapseFilters();
        this.props.onClose();
        header.style.display = '';
        sortFilterModal.style.top = '';
        domElements["a" /* default */].noScroll(false);
      } else {
        document.body.classList.add(showFilterClass);
        this.setState({
          showSortFilters: true
        });
        this.props.setupFilters();
        this.props.collapseFilters();
        domElements["a" /* default */].noScroll(true);

        if (screenSizes["a" /* default */].isMobile()) {
          // hide header so the sort filter is fixed at the top of the page
          header.style.display = 'none'; // shift the sort filter modal to the bottom of the sort filter button

          var sortFilterButtonBottom = this.sortFilterBtnRef.current.getBoundingClientRect().bottom;
          sortFilterModal.style.top = "".concat(sortFilterButtonBottom - 1, "px");
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return react_default.a.createElement("div", {
        className: "cmp-search-show-btn"
      }, react_default.a.createElement("a", {
        ref: this.sortFilterBtnRef,
        href: "javascript:void(0);",
        onClick: this.handleInput,
        className: "btn-show-sort-filter"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.filterIcon,
        className: "filterIcon"
      }), react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.closeIcon,
        className: "closeIcon"
      }), props.text.sortAndFilterButton));
    }
  }]);

  return ShowSortFilter;
}(react["Component"]);

/* harmony default export */ var btn_show_sort_filter = (btn_show_sort_filter_ShowSortFilter);
// CONCATENATED MODULE: ./src/search/components/results-count.js



function ResultsCount(props) {
  var maxLength = 120;
  var searchQuery = props.query && props.query.toString().length > maxLength ? props.query.substring(0, maxLength) + '...' : props.query;

  var getSearchQuery = function getSearchQuery(query) {
    return react_default.a.createElement("h1", {
      className: "query"
    }, query);
  };

  var getSuggestedQuery = function getSuggestedQuery() {
    return react_default.a.createElement("span", {
      className: "text-strike"
    }, searchQuery);
  };

  var getRelatedSuggestionsTags = function getRelatedSuggestionsTags(words) {
    return words.map(function (word) {
      return react_default.a.createElement("a", {
        href: "javascript:void(0);",
        "aria-label": word,
        className: "item",
        onClick: function onClick(e) {
          return props.onRelatedSuggestionClick(word);
        }
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.searchIcon
      }), react_default.a.createElement("span", null, word));
    });
  };

  var getOptions = function getOptions(options) {
    var categoryOptionsList = options.map(function (a, index) {
      return {
        value: index,
        label: a.translation
      };
    });
    return categoryOptionsList;
  };

  var categoryLabel = '';

  if (Array.isArray(props.categoryOptions) && props.categoryOptions.length) {
    var options = getOptions(props.categoryOptions);
    categoryLabel = options[props.categoryValue].label;
  }

  var renderResultsText = function renderResultsText(resultsText) {
    return resultsText.replace(/[{]count[}]/, "<span class='count'>" + props.count.toLocaleString(undefined, {
      maximumFractionDigits: 0
    }) + "</span>");
  };

  var renderSearchQuery = function renderSearchQuery() {
    return props.spell_suggestion ? getSearchQuery(props.spell_suggestion) : getSearchQuery(searchQuery);
  };

  var renderSuggestedSearchQuery = function renderSuggestedSearchQuery() {
    return props.spell_suggestion ? getSuggestedQuery() : '';
  };

  var renderCategoryText = function renderCategoryText(selectedCategory) {
    return selectedCategory !== "" ? react_default.a.createElement("span", {
      "class": "category"
    }, props.text.inCategoryText + selectedCategory) : '';
  };

  var renderRelatedSuggestions = function renderRelatedSuggestions() {
    if (props.spell_related_suggestions.length !== 0) {
      return react_default.a.createElement("div", {
        className: "cmp-search__related-suggestions"
      }, react_default.a.createElement("span", {
        "class": "related-searches-text"
      }, props.text.relatedSearchesText), getRelatedSuggestionsTags(props.spell_related_suggestions));
    } else {
      return react_default.a.createElement(react_default.a.Fragment, null);
    }

    ;
  };

  return react_default.a.createElement("div", {
    className: "cmp-search__resultsCount",
    "data-locator": "results-count"
  }, props.noQuery || props.query === '*:*' && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
    "class": "query-box"
  }, react_default.a.createElement("span", {
    "class": "results",
    dangerouslySetInnerHTML: {
      __html: renderResultsText(props.text.resultsText)
    }
  })), react_default.a.createElement("hr", {
    className: "small-accent-rule"
  })), !props.noQuery && props.query !== '*:*' && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("span", {
    "class": "results",
    dangerouslySetInnerHTML: {
      __html: renderResultsText(props.text.resultsForText)
    }
  }), renderSuggestedSearchQuery(), react_default.a.createElement("div", {
    "class": "query-box"
  }, renderSearchQuery(), " ", " ", " ", renderCategoryText(categoryLabel)), react_default.a.createElement("hr", {
    className: "small-accent-rule"
  }), renderRelatedSuggestions()));
}

;
ResultsCount.defaultProps = {
  count: 0,
  query: '',
  noQuery: false,
  spell_related_suggestions: [],
  spell_suggestion: '',
  onRelatedSuggestionClick: function onRelatedSuggestionClick() {},
  text: {},
  categoryOptions: [],
  categoryValue: 0
};
/* harmony default export */ var results_count = (ResultsCount);
// CONCATENATED MODULE: ./src/search/components/filter-tags.js




var filter_tags_SubFacetTags = function SubFacetTags(props) {
  var facets = props.facets ? props.facets : {};
  var defaultFacet = "".concat(props.defaultFacet, "_facet");
  var mapping = [];

  for (var i = 0; i < props.filterMap.length; i++) {
    if (props.filterMap[i].categoryFacetName === defaultFacet) {
      var appLibrary = props.filterMap[i];
      var categories = appLibrary.orderedFacets;

      for (var c = 0; c < categories.length; c++) {
        var category = categories[c];

        if (facets[category.facetName]) {
          mapping.push({
            name: category.facetName,
            category: category.facetValue,
            translation: category.facetTranslation,
            facets: facets[category.facetName]
          });
        }
      }
    }
  }

  var tags = props.selectedFacets && Object.keys(props.selectedFacets).length !== 0 ? Object.keys(props.selectedFacets).map(function (facet, index) {
    var f = props.selectedFacets[facet];
    var category = [];

    var _loop = function _loop(_i) {
      var selected = f[_i];

      var _loop2 = function _loop2(n) {
        var cat = mapping[n];

        if (cat.name === facet) {
          category.push(react_default.a.createElement("a", {
            key: "facetTag-".concat(_i),
            href: "javascript:void(0);",
            onClick: function onClick() {
              return props.removeTag({
                categoryId: cat.name,
                facet: selected
              });
            }
          }, react_default.a.createElement(react_svg["a" /* default */], {
            src: props.text.closeIcon
          }), react_default.a.createElement("span", null, cat.translation, ": ", selected)));
        }
      };

      for (var n = 0; n < mapping.length; n++) {
        _loop2(n);
      }
    };

    for (var _i = 0; _i < f.length; _i++) {
      _loop(_i);
    }

    return category;
  }) : null;
  return react_default.a.createElement(react_default.a.Fragment, null, props.selectedFacets && tags);
};

var filter_tags_ContentTypeTag = function ContentTypeTag(props) {
  var showTags = Object.entries(props.selected).length !== 0 ? true : false;
  if (!showTags) return react_default.a.createElement(react_default.a.Fragment, null);
  return react_default.a.createElement("a", {
    href: "javascript:void(0);",
    onClick: props.onRemove,
    "data-locator": "content-type-tag-hide"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), react_default.a.createElement("span", null, "".concat(props.text['resultType'], ": ").concat(props.selected.facetTranslation)));
};

var filter_tags_ClearAllTag = function ClearAllTag(props) {
  return react_default.a.createElement("a", {
    href: "javascript:void(0);",
    className: "cmp-search-filters__tags__clear",
    "data-locator": "link-search-filters-tag-clear",
    "aria-label": props.text.clearAllFilters,
    onClick: props.onRemove
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), react_default.a.createElement("span", null, props.text.clearAllFilters));
};

var filter_tags_KeywordTag = function KeywordTag(props) {
  return react_default.a.createElement("a", {
    href: "javascript:void(0);",
    "aria-label": "".concat(props.text.keyWordLabel, ": ").concat(props.keyword),
    onClick: props.onRemove
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), react_default.a.createElement("span", null, "".concat(props.text.keyWordLabel, ": ").concat(props.keyword)));
};

filter_tags_SubFacetTags.defaultProps = {
  filterMap: [],
  defaultFacet: '',
  removeTag: function removeTag() {},
  selectedFacets: {},
  text: {}
};
filter_tags_ContentTypeTag.proptTypes = {
  categoryKey: prop_types_default.a.string,
  selected: prop_types_default.a.object.isRequired,
  text: prop_types_default.a.object.isRequired,
  onRemove: prop_types_default.a.func.isRequired
};
filter_tags_ContentTypeTag.defaultProps = {
  categoryKey: '',
  selected: {},
  text: {},
  onRemove: function onRemove() {}
};
filter_tags_ClearAllTag.proptTypes = {
  text: prop_types_default.a.object.isRequired,
  onRemove: prop_types_default.a.func.isRequired
};
filter_tags_ClearAllTag.defaultProps = {
  text: {},
  onRemove: function onRemove() {}
};
filter_tags_KeywordTag.defaultProps = {
  keyword: '',
  text: {},
  onRemove: function onRemove() {}
};

// EXTERNAL MODULE: ./src/scripts/ErrorMessages.js
var ErrorMessages = __webpack_require__(67);

// CONCATENATED MODULE: ./src/sku-details/views/stock.js









var stock_Stock = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(Stock, _React$Component);

  function Stock(props) {
    Object(classCallCheck["a" /* default */])(this, Stock);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Stock).call(this, props));
  }

  Object(createClass["a" /* default */])(Stock, [{
    key: "renderStockError",
    value: function renderStockError() {
      return react_default.a.createElement("span", null, react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, ErrorMessages["a" /* default */].ErrorMessages(this.props.errorObj).serviceUnavailable, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.skuInfo.lowStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--outofstock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-outofstock")
      })), react_default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, ErrorMessages["a" /* default */].ErrorMessages(this.props.errorObj).tryAgainLater));
    }
  }, {
    key: "renderInStock",
    value: function renderInStock() {
      return react_default.a.createElement("span", null, react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.inStockLabel, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.skuInfo.inStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--instock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-instock")
      })), react_default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, this.props.skuInfo.orderNowLabel));
    }
  }, {
    key: "renderContactWaters",
    value: function renderContactWaters() {
      return react_default.a.createElement("span", null, react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.contactWatersLabel), react_default.a.createElement("div", {
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
}(react_default.a.Component);

/* harmony default export */ var stock = (stock_Stock);
// CONCATENATED MODULE: ./src/sku-details/views/price.js







var price_Price = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(Price, _React$Component);

  function Price(props) {
    Object(classCallCheck["a" /* default */])(this, Price);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Price).call(this, props));
  }

  Object(createClass["a" /* default */])(Price, [{
    key: "render",
    value: function render() {
      var priceLabelClass = this.props.isListPrice === true ? "cmp-sku-list__list-price-label" : "cmp-sku-list__cust-price-label";
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: priceLabelClass,
        "data-locator": "sku-price-label",
        "aria-label": this.props.label
      }, this.props.label), this.props.price && react_default.a.createElement("div", {
        className: "cmp-sku__price",
        "data-locator": "sku-price",
        "aria-label": this.props.price
      }, this.props.price));
    }
  }]);

  return Price;
}(react_default.a.Component);

price_Price.defaultProps = {
  label: '',
  price: ''
};
/* harmony default export */ var views_price = (price_Price);
// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(11);

// CONCATENATED MODULE: ./src/sku-details/views/unavailablePrice.js




function UnavailablePrice(props) {
  var label = props.label,
      icon = props.icon,
      text = props.text;
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("label", {
    className: "cmp-sku-list__cust-price-label",
    "data-locator": "sku-price-label",
    "aria-label": label
  }, label), react_default.a.createElement("div", {
    className: "cmp-sku-list__unavailable"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    "aria-hidden": "true",
    src: icon,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("icon ".concat(text))
  }), react_default.a.createElement("span", {
    "aria-label": text,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(text)
  }, text)));
}

/* harmony default export */ var unavailablePrice = (UnavailablePrice);
// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(38);

// EXTERNAL MODULE: ./src/stores/localStore.js
var stores_localStore = __webpack_require__(47);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(16);

// EXTERNAL MODULE: ./src/utils/serviceFunctions.js
var serviceFunctions = __webpack_require__(53);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(13);

// CONCATENATED MODULE: ./src/sku-details/services/index.js









var services_availabilityUrlRequest = function availabilityUrlRequest(url, countryCode, partNo) {
  url = url.replace('{partnumber}', partNo).replace('{countryCode}', Object(userFunctions["p" /* isEprocurementUser */])() ? Object(userFunctions["h" /* getEprocUserCountryCode */])().toUpperCase() : countryCode);
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

var services_addToCartUrlRequest = function addToCartUrlRequest(url, partNo, quantity, cartId) {
  var userId = Object(userFunctions["o" /* getUserId */])();
  userId = userId !== '' ? userId : 'anonymous';
  url = url.replace('{localeCountry}', Object(userFunctions["p" /* isEprocurementUser */])() ? Object(userFunctions["h" /* getEprocUserCountryCode */])().toLowerCase() : Object(userFunctions["e" /* getCountryCode */])()).replace('{localeLanguage}', Object(userFunctions["p" /* isEprocurementUser */])() ? Object(userFunctions["i" /* getEprocUserLanguage */])().toLowerCase() : Object(userFunctions["m" /* getLanguage */])()).replace('{userType}', userId).replace('{guid}', cartId ? cartId : 'null').concat('', '?successWithCart=true');
  url = cartId ? url : url.concat('', "&createCart=".concat(!Object(userFunctions["p" /* isEprocurementUser */])()));
  return url;
};

function addToCart(_x, _x2, _x3, _x4, _x5) {
  return _addToCart.apply(this, arguments);
}

function _addToCart() {
  _addToCart = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(isCommerceApiMigrated, url, partNo, quantity, throwError) {
    var products, options, localStore, cartId, urlRequest, response, json, _json, _options, _urlRequest, _response, _json2;

    return regenerator_default.a.wrap(function _callee$(_context) {
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
            localStore = new stores_localStore["a" /* default */]();
            cartId = loginStatus["a" /* default */].state() ? localStore.getCartId() : localStore.getGUID();
            urlRequest = services_addToCartUrlRequest(url, partNo, quantity, cartId);
            _context.next = 9;
            return Object(serviceFunctions["a" /* fetchData */])(urlRequest, options, throwError);

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
              loginStatus["a" /* default */].state() && json.cart.code && localStore.setCartId(json.cart.code);
              !loginStatus["a" /* default */].state() && json.cart.guid && localStore.setGUID(json.cart.guid);
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

            loginStatus["a" /* default */].state() && cartId && localStore.removeCartId();
            !loginStatus["a" /* default */].state() && cartId && localStore.removeGUID();
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
            return Object(serviceFunctions["a" /* fetchData */])(_urlRequest, _options, throwError);

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
  _getAvailability = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(url, countryCode, partNo) {
    var options, urlRequest, response, json;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              method: 'GET',
              credentials: 'include'
            };
            urlRequest = services_availabilityUrlRequest(url, countryCode, partNo);
            _context2.next = 4;
            return Object(serviceFunctions["a" /* fetchData */])(urlRequest, options);

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
  _getPricing = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(url, sku, soldToId, salesOrg) {
    var options, urlRequest, response, json;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
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
            return Object(serviceFunctions["a" /* fetchData */])(urlRequest, options);

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
// EXTERNAL MODULE: ./src/scripts/skulist.js
var skulist = __webpack_require__(91);

// CONCATENATED MODULE: ./src/sku-details/views/addToCart.js












var addToCart_AddToCart = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(AddToCart, _React$Component);

  function AddToCart(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, AddToCart);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(AddToCart).call(this, props));

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
      skulist["a" /* default */].SkuRemoveNegative(e);
    };

    _this.skuQuantityInput = function (e) {
      skulist["a" /* default */].SkuQuantityInput(e);
      var value = e.target.value;

      _this.setState({
        addToCartQty: value
      });
    };

    _this.addToCartAnalytics = function (response) {
      var localStore = new stores_localStore["a" /* default */]();
      var cartId = loginStatus["a" /* default */].state() ? localStore.getCartId() : localStore.getGUID();
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

      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */].cart.name, addToCartModel);
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

  Object(createClass["a" /* default */])(AddToCart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onRef(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.onRef(undefined);
    }
  }, {
    key: "cartAPIRequest",
    value: function cartAPIRequest() {
      var _this2 = this;

      addToCart(this.props.isCommerceApiMigrated, this.props.addToCartUrl, this.state.skuNumber, this.state.addToCartQty, this.state.toggleErrorModal).then(function (response) {
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

      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("form", null, react_default.a.createElement("input", {
        className: "cmp-sku-details__quantity",
        placeholder: "Qty",
        value: this.state.addToCartQty,
        onChange: this.skuQuantityInput,
        onKeyPress: this.skuRemoveNegative,
        "data-locator": "input-sku-qty",
        "aria-label": this.props.qtyLabel
      })), react_default.a.createElement("a", {
        className: "cmp-button ".concat(!this.state.skuNumber.trim() && 'disabled'),
        onClick: function onClick() {
          return _this3.addToCart();
        },
        "data-locator": "link-add-to-cart"
      }, this.props.addToCartLabel));
    }
  }]);

  return AddToCart;
}(react_default.a.Component);

addToCart_AddToCart.defaultProps = {
  addToCartQty: null,
  onRef: function onRef() {},
  skuResponse: function skuResponse() {},
  qtyLabel: ''
};
/* harmony default export */ var views_addToCart = (addToCart_AddToCart);
// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(32);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(18);

// CONCATENATED MODULE: ./src/sku-message/index.js








var sku_message_SkuMessage = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(SkuMessage, _React$Component);

  function SkuMessage(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SkuMessage);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SkuMessage).call(this, props));

    _this.renderLink = function (_ref) {
      var label = _ref.label,
          title = _ref.title,
          url = _ref.url,
          blank = _ref.blank;
      return react_default.a.createElement("a", {
        href: url,
        target: blank ? "_blank" : "",
        rel: "noopener",
        title: title
      }, label);
    };

    _this.renderText = function (_ref2) {
      var text = _ref2.text;
      return text;
    };

    _this.displayError = function () {
      return react_default.a.createElement(react_default.a.Fragment, null, Array.isArray(_this.props.message) && _this.props.message.length > 0 && _this.props.message.map(function (block, index) {
        var itemToRender = block.type === 'link' ? _this.renderLink(block) : _this.renderText(block);
        var space = '';

        if (block.rightSpace !== 'false' || typeof block.rightSpace == 'undefined') {
          space = ' ';
        }

        return react_default.a.createElement(react_default.a.Fragment, {
          key: index
        }, itemToRender, space);
      }));
    };

    _this.displaySkuMsg = function () {
      return react_default.a.createElement(react_default.a.Fragment, null, _this.props.message, _this.props.linkMessage && _this.props.link && react_default.a.createElement("a", {
        href: _this.props.link
      }, _this.props.linkMessage));
    };

    return _this;
  }

  Object(createClass["a" /* default */])(SkuMessage, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "cmp-notification-wrapper ".concat(Array.isArray(this.props.message) ? 'sku-error-code' : ''),
        "data-locator": "sku-msg-notification-wrapper"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.icon,
        className: "cmp-notification-icon",
        "data-locator": "sku-msg-notification-icon"
      }), react_default.a.createElement("div", {
        className: "cmp-notification-body",
        "data-locator": "sku-msg-notification-body"
      }, react_default.a.createElement("div", {
        className: "cmp-notification-description",
        "data-locator": "sku-msg-notification-description"
      }, Array.isArray(this.props.message) ? this.displayError() : this.displaySkuMsg())));
    }
  }]);

  return SkuMessage;
}(react_default.a.Component);

/* harmony default export */ var sku_message = (sku_message_SkuMessage);
// EXTERNAL MODULE: ./src/scripts/checkOutStatus.js
var checkOutStatus = __webpack_require__(49);

// EXTERNAL MODULE: ./src/scripts/ecommerce.js
var ecommerce = __webpack_require__(30);

// EXTERNAL MODULE: ./src/scripts/sku-details.js
var sku_details = __webpack_require__(56);

// EXTERNAL MODULE: ./src/scripts/stickyService.js
var stickyService = __webpack_require__(50);

// EXTERNAL MODULE: ./src/constants/index.js
var constants = __webpack_require__(28);

// CONCATENATED MODULE: ./src/sku-list/views/listItem.js



























var listItem_ListItem = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(ListItem, _React$Component);

  function ListItem(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ListItem);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ListItem).call(this, props));

    _this.getCustPricing = function (pricingUrl, skuNumber, userInfo, propListPrice) {
      getPricing(pricingUrl, skuNumber, userInfo.dynamicSoldTo, userInfo.salesOrg).then(function (response) {
        if (response.status && response.status === 200) {
          var match = matchListItems(skuNumber, response);
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
            errorPriceType: [constants["a" /* BAD_REQUEST_CODE */], constants["e" /* SERVER_ERROR_CODE */]].includes(Object(eCommerceFunctions["c" /* getHttpStatusFromErrors */])(response.errors, response.status)) ? Object(userFunctions["p" /* isEprocurementUser */])() ? constants["f" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */] : constants["c" /* LIST_PRICE_WITH_ADD_TO_CART */] : constants["d" /* NO_PRICE_NO_ADD_TO_CART */],
            loading: false
          });
        }
      })["catch"](function (err) {
        // Add Error Object to State
        _this.setState({
          errorPriceType: constants["d" /* NO_PRICE_NO_ADD_TO_CART */],
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
      getAvailability(_this.state.availabilityUrl, _this.state.userCountry, skuNumber).then(function (response) {
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

      if (errorPriceType === constants["f" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */]) {
        return react_default.a.createElement(unavailablePrice, {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined') {
          return react_default.a.createElement(views_price, {
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
          return react_default.a.createElement(views_price, {
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
      return react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo"
      }, loginStatus["a" /* default */].state() && typeof custPrice !== 'undefined' && custPrice !== listPrice && react_default.a.createElement("div", {
        className: "cmp-sku-list__list-price",
        "data-locator": "list-price-label",
        "aria-label": "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)
      }, "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)), react_default.a.createElement("div", {
        className: "cmp-sku-list__priceinfo"
      }, loading ? react_default.a.createElement(spinner["a" /* default */], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), react_default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        onClick: function onClick(e) {
          return _this.checkAvailability(relatedSku.code);
        }
      }, (skuAvailability.productStatus || _this.state && errorObjAvailability && errorObjAvailability.ok === false) && react_default.a.createElement(stock, {
        skuInfo: skuInfo,
        skuNumber: relatedSku.code,
        skuAvailability: skuAvailability,
        skuType: "details",
        errorObj: errorObjAvailability
      }), !skuAvailability.productStatus && !(_this.state && errorObjAvailability && errorObjAvailability.ok === false) && react_default.a.createElement("span", {
        className: "cmp-sku-list__checkavailability"
      }, skuConfig.skuInfo.seeAvailabilityLabel, react_default.a.createElement(react_svg["a" /* default */], {
        alt: skuConfig.skuInfo.seeAvailabilityLabel,
        src: skuConfig.skuInfo.refreshIcon,
        "data-locator": "check-availability"
      }))), react_default.a.createElement("div", {
        className: "cmp-sku-list__buttons"
      }, react_default.a.createElement(views_addToCart, {
        toggleParentModal: _this.toggleModal,
        skuNumber: relatedSku.code,
        addToCartLabel: skuConfig.addToCartLabel,
        addToCartQty: skuConfig.defaultSkuQty,
        addToCartUrl: skuConfig.addToCartUrl,
        isCommerceApiMigrated: skuConfig.isCommerceApiMigrated,
        toggleErrorModal: _this.toggleErrorModal,
        analyticsConfig: _this.state.analyticsConfig,
        qtyLabel: skuConfig.qtyAriaLabel
      }), react_default.a.createElement(modal["b" /* default */], {
        isOpen: _this.state.modalShown,
        onClose: _this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, !isErrorModal && react_default.a.createElement(modal["a" /* Header */], {
        title: modalConfig.title,
        icon: modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), isErrorModal && react_default.a.createElement(modal["a" /* Header */], {
        title: errorConfig.title,
        icon: errorConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTopError
      }), react_default.a.createElement(addToCartModal["a" /* default */], {
        config: modalConfig,
        errorObjCart: errorObjCart
      }))));
    };

    _this.renderBuyInfoCommerceView = function () {
      if (ecommerce["a" /* default */].isDisabledState()) {
        return null;
      } else {
        if (ecommerce["a" /* default */].isPartialState() && loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state() || !ecommerce["a" /* default */].isPartialState() && !ecommerce["a" /* default */].isDisabledState()) {
          return react_default.a.createElement(react_default.a.Fragment, null, _this.renderBuyInfoPartial());
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

        return react_default.a.createElement(sku_message, {
          icon: skuConfig.skuInfo.lowStockIcon,
          message: discontinuedMessage,
          link: relatedSku.replacementskuurl,
          linkMessage: relatedSku.replacementskucode
        });
      } else if (_this.state.errorPriceType === constants["d" /* NO_PRICE_NO_ADD_TO_CART */]) {
        return react_default.a.createElement(sku_message, {
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
        return react_default.a.createElement("div", {
          className: "cmp-search__results-item-breadcrumb skuitem",
          "data-locator": "search-results-breadcrumb"
        }, react_default.a.createElement("div", {
          "aria-label": relatedSku.category_facet
        }, relatedSku.category_facet), react_default.a.createElement(react_svg["a" /* default */], {
          src: skuConfig.skuInfo.nextIcon,
          "aria-hidden": "true"
        }), react_default.a.createElement("div", {
          "aria-label": relatedSku.contenttype_facet
        }, relatedSku.contenttype_facet));
      }

      return react_default.a.createElement(react_default.a.Fragment, null);
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

  Object(createClass["a" /* default */])(ListItem, [{
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
      return react_default.a.createElement("div", {
        className: 'cmp-sku-list__container ' + disabledClass
      }, react_default.a.createElement("div", {
        className: "cmp-sku-list__right"
      }, react_default.a.createElement("img", {
        src: relatedSku.primaryImageThumbnail,
        alt: relatedSku.title,
        "data-locator": "product-image"
      })), react_default.a.createElement("div", {
        className: "cmp-sku-details__left"
      }, react_default.a.createElement("div", {
        className: "cmp-sku-list__code",
        "data-locator": "product-number",
        "aria-label": skuConfig.skuInfo.partNumberLabel + " " + relatedSku.code
      }, skuConfig.skuInfo.partNumberLabel + " " + relatedSku.code), react_default.a.createElement("a", {
        onClick: this.handleItemClick,
        href: relatedSku.skuPageHref ? relatedSku.skuPageHref : null
      }, react_default.a.createElement("div", {
        className: "cmp-sku-details__title",
        "data-locator": "product-title"
      }, relatedSku.title)), buyInfo, breadcrumbs));
    }
  }]);

  return ListItem;
}(react_default.a.Component);

listItem_ListItem.defaultProps = {
  key: '',
  relatedSku: {},
  skuConfig: {},
  baseSignInUrl: '',
  onItemClick: function onItemClick() {},
  userInfo: {},
  isEProcurementUserRestricted: false
};
/* harmony default export */ var listItem = (listItem_ListItem);
// EXTERNAL MODULE: ./src/scripts/signIn.js
var scripts_signIn = __webpack_require__(83);

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
      isEProcurementUserRestricted: !Object(userFunctions["p" /* isEprocurementUser */])() && Object(userFunctions["q" /* isEprocurementUserRole */])(),
      userInfo: Object(userFunctions["a" /* callCustomerPriceApi */])(_this.props.skuConfig.isCustomerPriceApiDisabled)
    };
    return _this;
  }

  Object(createClass["a" /* default */])(SkuList, [{
    key: "renderSignIn",
    value: function renderSignIn() {
      if (!loginStatus["a" /* default */].state()) {
        return react_default.a.createElement(scripts_signIn["a" /* default */], {
          signInUrl: this.props.skuConfig.baseSignInUrl,
          signInIcon: this.props.skuConfig.skuInfo.signinIcon,
          signInText1: this.props.skuConfig.skuInfo.signInText1,
          signInText2: this.props.skuConfig.skuInfo.signInText2,
          signInText3: this.props.skuConfig.skuInfo.signInText3
        });
      } else {
        return react_default.a.createElement(react_default.a.Fragment, null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var signIn = this.renderSignIn();
      return react_default.a.createElement(react_default.a.Fragment, null, this.props.data.length > 0 && //only return template if data exists
      react_default.a.createElement(react_default.a.Fragment, null, this.props.title && react_default.a.createElement("div", {
        className: "cmp-sku-list__title"
      }, this.props.title), signIn, this.props.data.map(function (record, index) {
        return react_default.a.createElement(listItem, {
          key: index,
          relatedSku: record,
          skuConfig: _this2.props.skuConfig,
          baseSignInUrl: _this2.props.baseSignInUrl,
          onItemClick: _this2.props.onItemClick,
          userInfo: _this2.state.userInfo,
          isEProcurementUserRestricted: _this2.state.isEProcurementUserRestricted
        });
      })));
    }
  }]);

  return SkuList;
}(react_default.a.Component);

sku_list_SkuList.defaultProps = {
  skuConfig: {},
  data: [],
  title: ''
};
/* harmony default export */ var sku_list = (sku_list_SkuList);
// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/index.js
var lib = __webpack_require__(84);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./src/search/components/results.js




var results_Result = function Result(_ref) {
  var result = _ref.result,
      locale = _ref.locale,
      nextIcon = _ref.nextIcon,
      onItemClick = _ref.onItemClick;
  var thumbnail = react_default.a.createElement("div", {
    className: "cmp-search__results-thumbnail"
  }, react_default.a.createElement("img", {
    src: result.thumbnail,
    alt: result.title
  }));
  return react_default.a.createElement("li", {
    className: "cmp-search__results-item",
    key: result.literaturecode
  }, result.thumbnail && thumbnail, react_default.a.createElement("div", {
    className: "cmp-search__results-body ".concat(result.thumbnail ? 'cmp-search__results-body--image' : '')
  }, react_default.a.createElement("a", {
    href: result.url,
    onClick: onItemClick,
    className: "cmp-search__results-item-link"
  }, react_default.a.createElement("span", {
    className: "cmp-search__results-item-title"
  }, result.title)), react_default.a.createElement("div", {
    className: "cmp-search__results-item-description"
  }, react_default.a.createElement("div", {
    className: "cmp-search__results-item-description-text"
  }, react_default.a.createElement(lib_default.a, {
    text: result.description,
    maxLine: "3",
    ellipsis: "\u2026",
    trimRight: true,
    basedOn: "words",
    clamped: "true"
  }))), react_default.a.createElement("div", {
    className: "cmp-search__results-item-breadcrumb"
  }, react_default.a.createElement("div", null, result.category_facet), react_default.a.createElement(react_svg["a" /* default */], {
    src: nextIcon
  }), react_default.a.createElement("div", null, result.contenttype_facet))));
};

var results_Results = function Results(_ref2) {
  var results = _ref2.results,
      locale = _ref2.locale,
      nextIcon = _ref2.nextIcon,
      onItemClick = _ref2.onItemClick;
  var mappedResults = Array.isArray(results) ? results.map(function (result, i) {
    return react_default.a.createElement(results_Result, {
      result: result,
      locale: locale,
      nextIcon: nextIcon,
      key: i,
      onItemClick: onItemClick
    });
  }) : [];
  return react_default.a.createElement("div", {
    className: "cmp-search__results-container"
  }, react_default.a.createElement("ul", {
    className: "cmp-search__results"
  }, mappedResults));
};

/* harmony default export */ var components_results = (results_Results);
// CONCATENATED MODULE: ./src/navigation/RadioList/index.js



var RadioList_RadioList = function RadioList(_ref) {
  var items = _ref.items,
      activeIndex = _ref.activeIndex,
      onClick = _ref.onClick;
  var radialRef = react_default.a.useRef();
  return react_default.a.createElement("div", {
    className: "cmp-category-wrapper"
  }, react_default.a.createElement("div", null, react_default.a.createElement("h3", null, "Category")), react_default.a.createElement("div", {
    role: "radiogroup",
    ref: radialRef,
    className: "cmp-category-items"
  }, items.map(function (item, index) {
    return react_default.a.createElement(RadioList_Radio, {
      key: "CategoryRadio-".concat(index),
      name: item.name,
      count: item.count,
      index: index,
      isActive: index === activeIndex,
      onClick: onClick
    });
  })));
};

var checkIfZero = function checkIfZero(onClick, index, count) {
  if (count !== 0) {
    onClick(index);
  }
};

var RadioList_Radio = function Radio(_ref2) {
  var index = _ref2.index,
      name = _ref2.name,
      count = _ref2.count,
      isActive = _ref2.isActive,
      _onClick = _ref2.onClick;
  return react_default.a.createElement("div", {
    className: "cmp-category-item".concat(isActive ? " active" : ""),
    onClick: function onClick() {
      return checkIfZero(_onClick, index, count);
    }
  }, react_default.a.createElement("input", {
    type: "radio",
    role: "radio",
    name: name,
    id: name,
    "aria-labelledby": name,
    "aria-disabled": "false",
    "aria-checked": isActive,
    checked: isActive,
    "aria-required": "false",
    "class": "".concat(count === 0 ? "inactive" : ""),
    readonly: "",
    "data-locator": name
  }), react_default.a.createElement("a", {
    "class": "radio ".concat(count === 0 ? "inactive" : "valid"),
    id: name + '_link'
  }, react_default.a.createElement("div", {
    "class": "selector ".concat(count === 0 ? "inactive" : "")
  })), react_default.a.createElement("span", {
    className: "cmp-radio__radio-label ".concat(count === 0 ? " inactive" : ""),
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name)
  }, name, " (", count, ")"));
};

RadioList_Radio.defaultProps = {
  name: "",
  index: -1,
  isActive: false,
  onClick: function onClick() {}
};
RadioList_RadioList.defaultProps = {
  items: [],
  activeIndex: -1,
  onClick: function onClick() {}
};
/* harmony default export */ var navigation_RadioList = (RadioList_RadioList);
// CONCATENATED MODULE: ./src/search/search.component.helpers.js





















var search_component_helpers_FilterTagList = function FilterTagList(_ref) {
  var text = _ref.text,
      filterMap = _ref.filterMap,
      filterTagsProps = _ref.filterTagsProps,
      filterTagsEvents = _ref.filterTagsEvents;
  var isKeywordSpecified = filterTagsProps.keyword && filterTagsProps.keyword !== services["b" /* parameterDefaults */].keyword;
  var isContentTypeSelected = Object.entries(filterTagsProps.contentTypeSelected).length !== 0 && filterTagsProps.contentTypeSelected.facetTranslation;

  if (!isKeywordSpecified && !isContentTypeSelected) {
    return react_default.a.createElement("div", {
      className: "cmp-search-filters__emptytags"
    });
  }

  var keyword = filterTagsProps.spell_suggestion ? filterTagsProps.spell_suggestion : filterTagsProps.keyword;
  var keyWordTag = isKeywordSpecified ? react_default.a.createElement(filter_tags_KeywordTag, {
    keyword: keyword,
    text: text,
    onRemove: filterTagsEvents.onKeywordRemove
  }) : react_default.a.createElement(react_default.a.Fragment, null);
  var contentTypeTag = isContentTypeSelected ? react_default.a.createElement(filter_tags_ContentTypeTag, {
    text: text,
    selected: filterTagsProps.contentTypeSelected,
    onRemove: filterTagsEvents.onContentTypeRemove
  }) : react_default.a.createElement(react_default.a.Fragment, null);
  var subFacetTags = Object.entries(filterTagsProps.selectedFacets).length !== 0 ? react_default.a.createElement(filter_tags_SubFacetTags, {
    text: text,
    selectedFacets: filterTagsProps.selectedFacets,
    facets: filterTagsProps.facets,
    removeTag: filterTagsEvents.onSubFacetRemove,
    filterMap: filterMap,
    defaultFacet: filterTagsProps.contentType
  }) : react_default.a.createElement(react_default.a.Fragment, null);
  return react_default.a.createElement("div", {
    className: "cmp-search-filters__tags clearfix",
    "data-locator": "search-filters-tags"
  }, react_default.a.createElement(filter_tags_ClearAllTag, {
    text: text,
    onRemove: filterTagsEvents.onClearAll
  }), keyWordTag, contentTypeTag, subFacetTags);
};

search_component_helpers_FilterTagList.defaultProps = {
  text: defaultProps.text,
  filterMap: defaultProps.filterMap,
  filterTagsProps: defaultProps.filterTagsProps,
  filterTagsEvents: defaultProps.filterTagsEvents
};

var search_component_helpers_Aside = function Aside(_ref2) {
  var text = _ref2.text,
      asideProps = _ref2.asideProps,
      asideEvents = _ref2.asideEvents,
      children = _ref2.children,
      items = _ref2.items,
      activeIndex = _ref2.activeIndex,
      categoryClick = _ref2.categoryClick;
  return react_default.a.createElement("div", {
    className: "container__left cmp-search__sort-filter",
    "data-locator": "left-container-filter"
  }, !Object(userFunctions["p" /* isEprocurementUser */])() && react_default.a.createElement(navigation_RadioList, {
    items: items,
    activeIndex: activeIndex,
    onClick: categoryClick
  }), react_default.a.createElement(btn_hide_sort_filter, {
    text: text,
    onClick: asideEvents.onHideSortFilterClick
  }), react_default.a.createElement(btn_apply_sort_filter, {
    text: text,
    applyFilters: asideEvents.onApplySortFilter,
    isPristine: asideProps.sortFilterIsPristine,
    count: asideProps.count
  }), react_default.a.createElement(btn_done_sort_filter, {
    text: text,
    collapseFilters: asideEvents.onCollapseFilters
  }), react_default.a.createElement("div", {
    className: "cmp-search__sort-filter__container"
  }, react_default.a.createElement(sort, {
    sortValue: asideProps.sortByValue,
    sortHandler: asideEvents.onSort,
    text: text
  }), children));
};

search_component_helpers_Aside.defaultProps = {
  text: defaultProps.text,
  asideProps: defaultProps.asideProps,
  asideEvents: defaultProps.asideEvents
};

var search_component_helpers_Menu = function Menu(_ref3) {
  var text = _ref3.text,
      filterMap = _ref3.filterMap,
      menuProps = _ref3.menuProps,
      contentTypeMenuProps = _ref3.contentTypeMenuProps,
      contentTypeMenuEvents = _ref3.contentTypeMenuEvents,
      facetMenuProps = _ref3.facetMenuProps,
      facetMenuEvents = _ref3.facetMenuEvents,
      subFacetFiltersProps = _ref3.subFacetFiltersProps,
      subFacetFiltersEvents = _ref3.subFacetFiltersEvents,
      filterTagsProps = _ref3.filterTagsProps,
      filterTagsEvents = _ref3.filterTagsEvents;

  if (menuProps.showContentTypeMenu) {
    return react_default.a.createElement(content_type_menu, {
      heading: menuProps.heading,
      items: contentTypeMenuProps.items,
      onClick: contentTypeMenuEvents.onContentTypeItemClick
    });
  }

  var filterTags = search_component_helpers_FilterTagList({
    text: text,
    filterMap: filterMap,
    filterTagsProps: filterTagsProps,
    filterTagsEvents: filterTagsEvents
  });

  if (menuProps.showFacetMenu) {
    return react_default.a.createElement(facet_menu, {
      heading: menuProps.heading,
      selectedValue: facetMenuProps.selectedValue,
      previousIcon: facetMenuProps.previousIcon,
      filterTags: filterTags,
      onClear: facetMenuEvents.onContentTypeRemoval
    }, react_default.a.createElement(filter, {
      facets: subFacetFiltersProps.items,
      text: text,
      filterMap: subFacetFiltersProps.filterMap,
      defaultFacet: subFacetFiltersProps.defaultFacet,
      selectHandler: subFacetFiltersEvents.onFilterSelect,
      selectedFacets: subFacetFiltersProps.selectedFacets,
      contentType: subFacetFiltersProps.contentType,
      facetGroupsSelectedOrder: subFacetFiltersProps.facetGroupsSelectedOrder,
      collapseAllFilters: subFacetFiltersProps.collapseAllFilters,
      activeIndex: subFacetFiltersProps.activeIndex,
      onGroupClick: subFacetFiltersEvents.onGroupClick
    }));
  }
};

search_component_helpers_Menu.defaultProps = {
  text: defaultProps.text,
  filterMap: defaultProps.filterMap,
  menuProps: defaultProps.menuProps,
  contentTypeMenuProps: defaultProps.contentTypeMenuProps,
  contentTypeMenuEvents: defaultProps.contentTypeMenuEvents,
  facetMenuProps: defaultProps.facetMenuProps,
  facetMenuEvents: defaultProps.facetMenuEvents,
  subFacetFiltersProps: defaultProps.subFacetFiltersProps,
  subFacetFiltersEvents: defaultProps.subFacetFiltersEvents,
  filterTagsProps: defaultProps.filterTagsProps,
  filterTagsEvents: defaultProps.filterTagsEvents
};

var search_component_helpers_SkuResults = function SkuResults(_ref4) {
  var items = _ref4.items,
      skuConfig = _ref4.skuConfig,
      onItemClick = _ref4.onItemClick;
  var isEprocUser = Object(userFunctions["p" /* isEprocurementUser */])();
  var skuData = Array.isArray(items) ? items.map(function (item) {
    return {
      code: item.skucode,
      category_facet: item.category_facet,
      contenttype_facet: item.contenttype_facet,
      skuPageHref: isEprocUser ? item.eprocUrl : item.url,
      formattedPrice: item.displayprice,
      primaryImageAlt: item.title,
      primaryImageThumbnail: item.thumbnail,
      discontinued: item.status !== 'Active',
      // covers DiscontinueNoReplacement, DiscontinueWithReplacement, ObsoleteNoReplacement, and ObsoleteWithReplacement
      replacementskuurl: item.replacementskuurl,
      replacementskucode: item.replacementskucode,
      title: item.title
    };
  }) : [];
  return react_default.a.createElement(sku_list, {
    skuConfig: skuConfig,
    data: skuData,
    onItemClick: onItemClick
  });
};

search_component_helpers_SkuResults.defaultProps = {
  skuConfig: defaultProps.skuConfig,
  items: [],
  onItemClick: function onItemClick() {}
};

var search_component_helpers_ResultsContent = function ResultsContent(_ref5) {
  var text = _ref5.text,
      skuConfig = _ref5.skuConfig,
      searchParams = _ref5.searchParams,
      resultsProps = _ref5.resultsProps,
      resultsEvents = _ref5.resultsEvents;
  var items = resultsProps.items[searchParams.page];

  if (resultsProps.isSkuList) {
    return react_default.a.createElement(search_component_helpers_SkuResults, {
      items: items,
      skuConfig: skuConfig,
      onItemClick: resultsEvents.onResultsItemClick
    });
  }

  return react_default.a.createElement(components_results, {
    results: items,
    nextIcon: text.nextIcon,
    onItemClick: resultsEvents.onResultsItemClick
  });
};

search_component_helpers_ResultsContent.defaultProps = {
  text: defaultProps.text,
  skuConfig: defaultProps.skuConfig,
  searchParams: defaultProps.searchParams,
  resultsProps: defaultProps.resultsProps,
  resultsEvents: defaultProps.resultsEvents
};

var search_component_helpers_Pagination = function Pagination(_ref6) {
  var resultsProps = _ref6.resultsProps,
      resultsEvents = _ref6.resultsEvents,
      nextIcon = _ref6.nextIcon,
      previousIcon = _ref6.previousIcon;

  if (resultsProps.count <= services["b" /* parameterDefaults */].rows) {
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  var buildHref = function buildHref(href) {
    return "".concat(window.location.href, "/page/").concat(href);
  };

  return react_default.a.createElement(react_paginate_default.a, {
    pageCount: resultsProps.pagination.amount,
    forcePage: resultsProps.pagination.current ? resultsProps.pagination.current - 1 : 0,
    pageRangeDisplayed: 8,
    marginPagesDisplayed: 1,
    containerClassName: "paginate__container",
    onPageChange: function onPageChange(num) {
      return resultsEvents.onPageChange(num, 'clicked');
    },
    breakLabel: '…',
    hrefBuilder: buildHref,
    previousLabel: react_default.a.createElement(react_svg["a" /* default */], {
      src: previousIcon
    }),
    nextLabel: react_default.a.createElement(react_svg["a" /* default */], {
      src: nextIcon
    }),
    initialPage: resultsProps.pagination.current ? resultsProps.pagination.current - 1 : 0,
    disableInitialCallback: true
  });
};

search_component_helpers_Pagination.defaultProps = {
  resultsProps: defaultProps.resultsProps,
  resultsEvents: defaultProps.resultsEvents,
  nextIcon: "",
  previousIcon: ""
};

var search_component_helpers_ResultsBody = function ResultsBody(_ref7) {
  var text = _ref7.text,
      filterMap = _ref7.filterMap,
      skuConfig = _ref7.skuConfig,
      searchParams = _ref7.searchParams,
      categoryProps = _ref7.categoryProps,
      categoryEvents = _ref7.categoryEvents,
      showSortFilterProps = _ref7.showSortFilterProps,
      showSortFilterEvents = _ref7.showSortFilterEvents,
      asideProps = _ref7.asideProps,
      filterTagsProps = _ref7.filterTagsProps,
      filterTagsEvents = _ref7.filterTagsEvents,
      resultsProps = _ref7.resultsProps,
      resultsEvents = _ref7.resultsEvents,
      isEprocurementUser = _ref7.isEprocurementUser;
  return react_default.a.createElement("div", {
    className: "cmp-search__container"
  }, react_default.a.createElement("div", {
    className: "cmp-search__container__header clearfix"
  }, !isEprocurementUser && react_default.a.createElement(category_dropdown, {
    categoryDownIcon: text.downIcon,
    categoryLabelPrefix: text.categoryText,
    categoryIsSearchable: false,
    categoryOnChange: categoryEvents.onCategoryDropdownChange,
    categoryOptions: categoryProps.categories,
    categoryValue: categoryProps.activeIndex
  }), react_default.a.createElement(btn_show_sort_filter, {
    text: text,
    setupFilters: showSortFilterEvents.onSetupFilters,
    resetToSavedState: showSortFilterEvents.onResetToSavedState,
    collapseFilters: showSortFilterProps.collapseFilters,
    onClose: showSortFilterEvents.onClose
  }), react_default.a.createElement("div", {
    className: "cmp-search__sorted-by"
  }, text.sortedBy, ":", ' ', asideProps.sortByText === 'most-relevant' ? text.sortByBestMatch : text.sortByMostRecent)), react_default.a.createElement("div", {
    className: "cmp-search__sorted-container"
  }, react_default.a.createElement(results_count, Object.assign({}, resultsProps, {
    text: text,
    categoryOptions: categoryProps.categories,
    categoryValue: categoryProps.activeIndex,
    onRelatedSuggestionClick: resultsEvents.onRelatedSuggestionClick
  })), react_default.a.createElement(search_component_helpers_FilterTagList, {
    text: text,
    filterMap: filterMap,
    filterTagsProps: filterTagsProps,
    filterTagsEvents: filterTagsEvents
  }), react_default.a.createElement(search_component_helpers_ResultsContent, {
    text: text,
    filterMap: filterMap,
    skuConfig: skuConfig,
    searchParams: searchParams,
    resultsProps: resultsProps,
    resultsEvents: resultsEvents
  })), react_default.a.createElement(search_component_helpers_Pagination, {
    resultsProps: resultsProps,
    resultsEvents: resultsEvents,
    nextIcon: text.nextIcon,
    previousIcon: text.previousIcon
  }));
};

search_component_helpers_ResultsBody.defaultProps = {
  text: defaultProps.text,
  filterMap: defaultProps.filterMap,
  skuConfig: defaultProps.skuConfig,
  searchParams: defaultProps.searchParams,
  categoryProps: defaultProps.categoryProps,
  categoryEvents: defaultProps.categoryEvents,
  showSortFilterProps: defaultProps.showSortFilterProps,
  showSortFilterEvents: defaultProps.showSortFilterEvents,
  asideProps: defaultProps.asideProps,
  filterTagsProps: defaultProps.filterTagsProps,
  filterTagsEvents: defaultProps.filterTagsEvents,
  resultsProps: defaultProps.resultsProps,
  resultsEvents: defaultProps.resultsEvents
};

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(6);

// EXTERNAL MODULE: ./src/utils/redirectFunctions.js
var redirectFunctions = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/react-ellipsis-text/index.js
var react_ellipsis_text = __webpack_require__(124);
var react_ellipsis_text_default = /*#__PURE__*/__webpack_require__.n(react_ellipsis_text);

// CONCATENATED MODULE: ./src/common/search-breadcrumb/index.js






var search_breadcrumb_SearchBreadcrumb = function SearchBreadcrumb(props) {
  var _useState = Object(react["useState"])(screenSizes["a" /* default */].isMobile()),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      isMobile = _useState2[0],
      setIsMobile = _useState2[1];

  Object(react["useEffect"])(function () {
    var breadcrumb = document.querySelector('#searchBreadcrumb');
    isMobile && breadcrumb && breadcrumb.classList.add('fader-fade--right');
    !isMobile && breadcrumb && breadcrumb.classList.remove('fader-fade--right');
  }, [props.searchParams]);

  var renderBreadcrumbLink = function renderBreadcrumbLink(linkInfo) {
    return react_default.a.createElement("li", {
      className: "cmp-breadcrumb__item",
      itemprop: "itemListElement",
      itemscope: "",
      itemtype: "http://schema.org/ListItem"
    }, react_default.a.createElement("a", {
      href: linkInfo.path,
      className: "cmp-breadcrumb__item-link"
    }, react_default.a.createElement("span", {
      itemprop: "name"
    }, react_default.a.createElement(react_ellipsis_text_default.a, {
      text: linkInfo.title,
      length: "20"
    }))));
  };

  var renderBreadcrumb = function renderBreadcrumb(links) {
    var parentLinks = links.map(function (link) {
      return renderBreadcrumbLink(link);
    });
    return parentLinks;
  };

  var buildQueryString = function buildQueryString(baseUrl, options) {
    var queryString = baseUrl + "?";

    if (options.keywordParam && options.keywordParam !== "*:*") {
      queryString += "keyword=".concat(options.keywordParam, "&");
    }

    if (options.categoryParam) {
      queryString += "category=".concat(options.categoryParam, "&");
    }

    if (options.contentTypeParam) {
      queryString += "content_type=".concat(options.contentTypeParam, "&");
    }

    if (queryString.indexOf("&") !== -1) {
      queryString = queryString.substr(0, queryString.length - 1);
    }

    return queryString;
  };

  var createLinkData = function createLinkData() {
    var links = [];
    var homeUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-homepage-url");
    var baseSearchUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-search-path");
    var correctKeyword = props.searchParams.keyword;

    if (props.searchParams.spell_suggestion) {
      correctKeyword = props.searchParams.spell_suggestion;
    }

    var homeLink = {
      "title": props.text.homeLinkText,
      "path": homeUrl
    };
    links.push(homeLink);
    var searchLink = {
      "title": props.text.searchLinkText,
      "path": baseSearchUrl
    };
    links.push(searchLink);

    if (correctKeyword && correctKeyword !== "*:*") {
      var urlOptions = {
        keywordParam: props.searchParams.keyword,
        categoryParam: "",
        contentTypeParam: ""
      };
      var queryString = buildQueryString(baseSearchUrl, urlOptions);
      var queryLink = {
        "title": correctKeyword,
        "path": queryString
      };
      links.push(queryLink);
    }

    if (props.searchParams.category) {
      var _urlOptions = {
        keywordParam: correctKeyword,
        categoryParam: props.searchParams.category,
        contentTypeParam: ""
      };

      var _queryString = buildQueryString(baseSearchUrl, _urlOptions);

      var categoryLink = {
        "title": props.searchParams.category,
        "path": _queryString
      };
      links.push(categoryLink);
    }

    if (props.searchParams.contentTypeSelected.facetTranslation) {
      var _urlOptions2 = {
        keywordParam: correctKeyword,
        categoryParam: props.searchParams.category,
        contentTypeParam: props.searchParams.content_type
      };

      var _queryString2 = buildQueryString(baseSearchUrl, _urlOptions2);

      var _categoryLink = {
        "title": props.searchParams.contentTypeSelected.facetTranslation,
        "path": _queryString2
      };
      links.push(_categoryLink);
    }

    return links;
  };

  var linkData = createLinkData();
  return react_default.a.createElement("nav", {
    "class": "cmp-breadcrumb"
  }, react_default.a.createElement("ol", {
    id: "searchBreadcrumb",
    "class": "cmp-breadcrumb__list fader-fade",
    itemscope: "",
    itemtype: "http://schema.org/BreadcrumbList"
  }, react_default.a.createElement("div", {
    "class": "fader-container fader-container--left",
    style: {
      width: 0 + "px"
    }
  }), renderBreadcrumb(linkData), react_default.a.createElement("div", {
    "class": "fader-container fader-container--right",
    style: {
      width: 65 + "px"
    }
  })));
};

/* harmony default export */ var search_breadcrumb = (search_breadcrumb_SearchBreadcrumb);
// CONCATENATED MODULE: ./src/search/search.component.js





var search_component_SearchComponent = function SearchComponent(props) {
  // Append Facet Description & spelling of keyword
  props.searchParams.contentTypeSelected = props.filterTagsProps.contentTypeSelected;
  props.searchParams.spell_suggestion = props.filterTagsProps.spell_suggestion;
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(search_breadcrumb, {
    text: props.text,
    searchParams: props.searchParams
  }), react_default.a.createElement("div", null, react_default.a.createElement("div", {
    className: "overlay"
  }), react_default.a.createElement(search_component_helpers_Aside, {
    sortFilterIsPristine: props.asideProps.sortFilterIsPristine,
    text: props.text,
    asideProps: props.asideProps,
    asideEvents: props.asideEvents,
    items: props.categoryProps.categories,
    activeIndex: props.categoryProps.activeIndex,
    categoryClick: props.categoryEvents.onCategoryTabClick
  }, react_default.a.createElement(search_component_helpers_Menu, {
    text: props.text,
    filterMap: props.filterMap,
    menuProps: props.menuProps,
    contentTypeMenuProps: props.contentTypeMenuProps,
    contentTypeMenuEvents: props.contentTypeMenuEvents,
    facetMenuProps: props.facetMenuProps,
    facetMenuEvents: props.facetMenuEvents,
    subFacetFiltersProps: props.subFacetFiltersProps,
    subFacetFiltersEvents: props.subFacetFiltersEvents,
    filterTagsProps: props.filterTagsProps,
    filterTagsEvents: props.filterTagsEvents
  })), react_default.a.createElement(search_component_helpers_ResultsBody, {
    text: props.text,
    filterMap: props.filterMap,
    skuConfig: props.skuConfig,
    searchParams: props.searchParams,
    categoryProps: props.categoryProps,
    categoryEvents: props.categoryEvents,
    showSortFilterProps: props.showSortFilterProps,
    showSortFilterEvents: props.showSortFilterEvents,
    asideProps: props.asideProps,
    filterTagsProps: props.filterTagsProps,
    filterTagsEvents: props.filterTagsEvents,
    resultsProps: props.resultsProps,
    resultsEvents: props.resultsEvents,
    isEprocurementUser: props.isEprocurementUser
  })));
};

search_component_SearchComponent.defaultProps = defaultProps;
/* harmony default export */ var search_component = (search_component_SearchComponent);
// CONCATENATED MODULE: ./src/search/search.container.js






















var SEARCH_TYPES = {
  INITIAL: 'initial',
  CATEGORY_ONLY: 'category only',
  CONTENT_TYPE: 'content type',
  SUB_FACETS: 'sub facets'
};

var search_container_SearchContainer = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(SearchContainer, _Component);

  function SearchContainer(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SearchContainer);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SearchContainer).call(this, props));

    _this.parseFacetsFromUrlToArray = function () {
      return _this.search.mapFacetGroupsToArray(Object(query_string["parse"])(location.search).facet);
    };

    _this.addHistoryListener = function () {
      _this.props.history.listen(function (location, action) {
        var facetGroupsSelectedOrder = _this.parseFacetsFromUrlToArray();

        _this.setState({
          facetGroupsSelectedOrder: facetGroupsSelectedOrder
        });

        var query = _this.getQueryObject(Object(query_string["parse"])(location.search));

        if (action === 'POP') {
          _this.handleHistoryPop(query);
        } else if (action === 'PUSH') {
          _this.handleHistoryPush(query);
        }
      });
    };

    _this.addResizeListener = function () {
      var checkWindowWidth = function checkWindowWidth() {
        var newState = Object.assign({}, _this.state);
        var desktop = window.matchMedia('screen and (min-width: 1200px)');
        newState.isDesktop = desktop.matches;

        _this.setState(newState);
      };

      window.addEventListener('resize', checkWindowWidth);
      checkWindowWidth();
    };

    _this.initialState = function () {
      var query = _this.search.getParamsFromString();

      _this.query = query;

      if ((Object(esm_typeof["a" /* default */])(_this.query.keyword) === services["c" /* parameterValues */].undefined || _this.query.keyword === services["b" /* parameterDefaults */].keyword) && Object(esm_typeof["a" /* default */])(_this.query.sort) === services["c" /* parameterValues */].undefined) {
        _this.query.sort = services["c" /* parameterValues */].sort.mostRecent;
      } else {
        _this.query.sort = Object(esm_typeof["a" /* default */])(_this.query.sort) === services["c" /* parameterValues */].undefined ? services["c" /* parameterValues */].sort.mostRelevant : _this.query.sort;
      }

      var category = _this.query.category ? _this.query.category : '';
      var contentType = _this.query.content_type ? _this.query.content_type : null;

      var contentTypeElement = _this.findContentType(_this.props.filterMap, contentType);

      var contentTypeSelected = contentTypeElement ? contentTypeElement : {};
      var skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
      skuConfig.showBreadcrumbs = true;
      skuConfig.baseSignInUrl = _this.props.baseSignInUrl;
      return {
        forceCollapseFilters: true,
        loading: true,
        searchParams: {},
        results: {},
        pagination: {
          current: _this.query.page ? _this.query.page : services["b" /* parameterDefaults */].page
        },
        rows: _this.props.searchDefaults ? _this.props.searchDefaults && _this.props.searchDefaults.rows : services["b" /* parameterDefaults */].rows,
        sort: _this.query.sort ? _this.query.sort : services["b" /* parameterDefaults */].sort,
        selectedFacets: _this.query.selectedFacets || {},
        unappliedFilters: {},
        isDesktop: false,
        isSkuList: false,
        initialRender: true,
        performedSearches: 0,
        category: category,
        contentType: contentType,
        contentTypeSelected: contentTypeSelected,
        skuConfig: skuConfig,
        facets: [],
        filterMap: [],
        keyword: _this.query.keyword ? _this.query.keyword : services["b" /* parameterDefaults */].keyword,
        spell_check: false,
        spell_related_suggestions: [],
        spell_suggestion: '',
        erroredOut: false,
        categoryTabs: [],
        activeTabIndex: 0,
        tabHistory: {},
        facetGroupsSelectedOrder: [],
        collapseAllFilters: false,
        activeFilterIndex: -1,
        count: 0
      };
    };

    _this.handleHistoryPush = function (query) {
      var categoryIndex = _this.state.categoryTabs.findIndex(function (category) {
        return category.name === query.category;
      });

      var contentTypeElement = _this.findContentType(_this.props.filterMap, query.content_type);

      _this.setState({
        activeTabIndex: categoryIndex,
        category: query.category,
        sort: query.sort,
        contentType: query.content_type,
        contentTypeSelected: Object.assign({}, contentTypeElement),
        selectedFacets: Object.entries(query.facets).length === 0 ? {} : Object.assign({}, query.facets)
      }, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.performSearch(query);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    };

    _this.isSkuList = function (category) {
      var categoryKey = _this.findFacetNameProperty(_this.props.filterMap, category);

      return validator_default.a.equals(categoryKey, 'shop');
    };

    _this.handleHistoryPop = function (query) {
      var categoryIndex = _this.state.categoryTabs.findIndex(function (category) {
        return category.name === query.category;
      });

      if (_this.state.activeTabIndex !== categoryIndex) {
        _this.setCategorySelected(categoryIndex, query, query.category);
      } else {
        var contentTypeElement = _this.findContentType(_this.props.filterMap, query.content_type);

        _this.setState({
          category: query.category,
          sort: query.sort,
          contentType: query.content_type,
          contentTypeSelected: Object.assign({}, contentTypeElement),
          selectedFacets: Object.entries(query.facets).length === 0 ? {} : Object.assign({}, query.facets)
        }, /*#__PURE__*/Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2() {
          return regenerator_default.a.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.performSearch(query);

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })));
      }
    };

    _this.findFacetNameProperty = function (filterMap, searchValue) {
      if (!filterMap || !Array.isArray(filterMap)) {
        return "";
      }

      var facet = filterMap.find(function (item) {
        return item.categoryFacetValue === searchValue;
      });

      if (!facet) {
        return "";
      }

      return facet.categoryFacetName.replace('_facet', '');
    };

    _this.findFacetTranslationProperty = function (filterMap, searchValue) {
      if (!filterMap || !Array.isArray(filterMap)) {
        return "";
      }

      var facet = filterMap.find(function (item) {
        return item.categoryFacetValue === searchValue;
      });

      if (!facet) {
        return "";
      }

      return facet.categoryFacetTranslation;
    };

    _this.mapCategories = function (categories) {
      return !categories || !categories.facets || !categories.facets.category_facet ? [] : categories.facets.category_facet.filter(function (category) {
        return !!_this.findFacetNameProperty(_this.props.filterMap, category.value);
      }).map(function (category) {
        return {
          translation: _this.findFacetTranslationProperty(_this.props.filterMap, category.value),
          name: category.value,
          count: category.count
        };
      });
    };

    _this.findMaxCategory = function (categories) {
      if (!categories) {
        return -1;
      }

      var counts = categories.map(function (category) {
        return category.count;
      });
      var maxCount = Math.max.apply(Math, Object(toConsumableArray["a" /* default */])(counts));
      return categories.findIndex(function (category) {
        return category.count === maxCount;
      });
    };

    _this.getQueryObject = function (q) {
      return q ? _this.search.createQueryObject(q) : _this.search.createQueryObject(Object(query_string["parse"])(window.location.search));
    };

    _this.buildSearchParams = function (q) {
      var query = q && Object.entries(q).length !== 0 ? Object(objectSpread["a" /* default */])({}, q) : _this.getQueryObject();

      if (!query.sort && _this.state) {
        query = Object.assign({}, query, {
          sort: _this.state.sort
        });
      }

      return query;
    };

    _this.calcRows = function () {
      return _this.props.searchDefaults && _this.props.searchDefaults.rows ? _this.props.searchDefaults.rows : services["b" /* parameterDefaults */].rows;
    };

    _this.persistTabHistory = function (query) {
      var tabHistory = _this.createTabHistoryEntryForCurrentTab(query);

      _this.search.setStorageForTabHistory(tabHistory);
    };

    _this.executeSearch = function (query, rows) {
      var searchType = _this.getSearchType(query);

      if (searchType === SEARCH_TYPES.INITIAL) {
        _this.executeInitialSearch(query);

        return;
      }

      _this.setStateForActiveCategory(query);

      _this.persistTabHistory(query);

      switch (searchType) {
        case SEARCH_TYPES.CATEGORY_ONLY:
          _this.executeSearchByCategoryOnly(query, rows);

          break;

        case SEARCH_TYPES.CONTENT_TYPE:
          _this.executeSearchByContentType(query, rows);

          break;

        case SEARCH_TYPES.SUB_FACETS:
          _this.executeSearchBySubFacets(query, rows);

          break;
      }
    };

    _this.getSearchType = function (query) {
      if (!query.category) {
        return SEARCH_TYPES.INITIAL;
      }

      if (_this.isCategoryOnlySelected(query.category, query.content_type)) {
        return SEARCH_TYPES.CATEGORY_ONLY;
      }

      if (query.content_type && !_this.isFacetsSelected(query.facets)) {
        return SEARCH_TYPES.CONTENT_TYPE;
      }

      if (query.content_type && _this.isFacetsSelected(query.facets)) {
        return SEARCH_TYPES.SUB_FACETS;
      } // return a default value for defensive programming


      return SEARCH_TYPES.INITIAL;
    };

    _this.executeInitialSearch = function (query) {
      var maxCategory = _this.findMaxCategory(_this.state.categoryTabs);

      if (maxCategory === -1) {
        _this.setEmptyResults();

        return;
      }

      var categoryName = _this.state.categoryTabs[maxCategory].name;

      _this.setState({
        activeTabIndex: maxCategory,
        category: categoryName
      });

      query.category = categoryName;

      _this.pushToHistory(query, _this.state.selectedFacets);
    };

    _this.setStateForActiveCategory = function (query) {
      var categoryIndex = _this.state.categoryTabs.findIndex(function (category) {
        return category.name === query.category;
      });

      var categoryName = categoryIndex !== -1 ? _this.state.categoryTabs[categoryIndex].name : '';

      _this.setState({
        activeTabIndex: categoryIndex,
        category: categoryName
      });
    };

    _this.executeSearchByCategoryOnly = function (query, rows) {
      // deselects content type when user clicks the back button on browser
      _this.setState({
        category: query.category,
        contentType: null,
        contentTypeSelected: {}
      });

      if (!_this.props.hasError) {
        _this.search.getResultsByCategory(query).then(function (res) {
          if (res && !_this.props.hasError) {
            _this.searchOnSuccess(query, rows, res, true);
          } else {
            _this.search.getResultsByCategory(query).then(function (results) {
              if (!results) {
                _this.setState({
                  loading: false,
                  erroredOut: true
                });
              } else {
                var newQuery = Object.assign({}, query, {
                  keyword: ''
                });

                _this.searchOnSuccess(newQuery, rows, results, true);
              }
            });
          }
        });
      }
    };

    _this.executeSearchByContentType = function (query, rows) {
      // no sub-facets have been selected, only the content type has been selected
      var contentTypeValue = _this.getSelectedContentTypeValue();

      _this.search.getContentType(query.content_type, contentTypeValue, query).then(function (res) {
        return _this.searchOnSuccess(query, rows, res, false, 'success');
      })["catch"](function (error) {
        return _this.searchOnError(error);
      });
    };

    _this.executeSearchBySubFacets = function (query, rows) {
      // sub-facets have been selected
      var contentTypeName = _this.getSelectedContentTypeName();

      var contentTypeValue = _this.getSelectedContentTypeValue();

      _this.search.getSubFacet(contentTypeName, contentTypeValue, query).then(function (res) {
        return _this.searchOnSuccess(query, rows, res, false, 'success');
      })["catch"](function (error) {
        return _this.searchOnError(error);
      });
    };

    _this.findContentType = function (items, content_type) {
      return items.find(function (element) {
        return element.categoryFacetName === "".concat(content_type, "_facet");
      });
    };

    _this.isCategoryOnlySelected = function (category, content_type) {
      return category && !content_type ? true : false;
    };

    _this.isFacetsSelected = function (selectedFacets) {
      return Object.entries(selectedFacets).length !== 0 ? true : false;
    };

    _this.getFilterMap = function (authoredTags, backendFacets) {
      var categoryFacetName = "".concat(_this.state.category.toLowerCase(), "_facet");
      var category = authoredTags.find(function (authoredItem) {
        return authoredItem.categoryFacetName === categoryFacetName;
      });

      if (!category) {
        return;
      }

      var orderedFacets = category.orderedFacets.filter(function (facet) {
        return backendFacets.find(function (beFacet) {
          return beFacet.value === facet.facetValue;
        });
      });
      var orderedFacetsWithCount = orderedFacets.map(function (facet) {
        var authTag = authoredTags.find(function (authoredItem) {
          return facet.facetValue === authoredItem.categoryFacetValue;
        });
        var beFacet = backendFacets.find(function (beFacet) {
          return beFacet.value === facet.facetValue;
        });
        return Object(objectSpread["a" /* default */])({}, facet, {
          orderedFacets: authTag ? authTag.orderedFacets : [],
          count: beFacet ? beFacet.count : 0
        });
      });
      return {
        categoryFacetName: category.categoryFacetName,
        categoryFacetValue: category.categoryFacetValue,
        orderedFacets: orderedFacetsWithCount
      };
    };

    _this.searchOnSuccess = function (query, rows, res) {
      var initCategories = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var newState = Object.assign({}, _this.state);
      newState.filterMap = res.num_found !== 0 ? Object.assign({}, _this.getFilterMap(_this.props.filterMap, res.facets[_this.parentCategory])) : [];
      newState.loading = false;
      newState.rows = rows;
      newState.count = parseInt(res.num_found);
      newState.query = query.keyword;
      newState.results = newState.results || {};
      newState.results[query.page] = res.num_found !== 0 ? res.documents : [];
      newState.noQuery = query.keyword ? false : true;
      newState.sort = _this.state.sort;
      newState.performedSearches = _this.state.performedSearches + 1;
      newState.initialRender = false;
      newState.erroredOut = false;
      newState.pagination = {
        current: query.page,
        amount: Math.ceil(res.num_found / rows)
      };
      newState.noResults = !newState.results[query.page].length;
      newState.facets = res.facets;

      if ("activeIndex" in _this.state) {
        newState.facets['activeIndex'] = _this.state.activeIndex;
        newState.activeFilterIndex = _this.getActiveFilterIndex(_this.state.contentType, newState.filterMap, newState.facets, _this.state.activeIndex);
      } else {
        if (newState.facets in _this.state) {
          newState.facets['activeIndex'] = "";
        }
      }

      newState.spell_check = res.hasOwnProperty('spell_check') ? res.spell_check : false;
      newState.spell_related_suggestions = res.hasOwnProperty('spell_related_suggestions') ? res.spell_related_suggestions : [];
      newState.spell_suggestion = res.hasOwnProperty('spell_suggestion') ? res.spell_suggestion : '';
      newState.isSkuList = _this.isSkuList(query.category);

      _this.setState(Object.assign({}, _this.state, newState), function () {
        // collapse all facet groups when flag is true and the device is tablet or mobile
        if (_this.state.forceCollapseFilters) {
          if (screenSizes["a" /* default */].isTabletAndUnder()) {
            _this.collapseFilters();
          } // reset flag to false


          _this.setState({
            forceCollapseFilters: false
          });
        }
      });

      var sessionStore = _this.search.getSessionStore();

      var scrollToPosition = sessionStore.previousPagePosition;
      var previousPagePosition = sessionStore.previousPaginationClick;

      if (scrollToPosition) {
        _this.search.scrollToPosition(scrollToPosition);
      } else if (_this.props.history && _this.props.history.action === 'POP' && previousPagePosition && previousPagePosition !== 'NaN' && _this.props.resetToDefault && _this.props.resetToDefault === false) {
        setTimeout(function () {
          _this.search.scrollToPosition(previousPagePosition);
        }, 0);
      } else if (!scrollToPosition && previousPagePosition) {
        _this.search.scrollToTop();
      } else {
        if (newState.performedSearches > 1) {
          _this.search.scrollToTop();
        }
      }

      _this.submitAnalytics(Object(objectSpread["a" /* default */])({}, _this.state.searchParams, {
        total: res.num_found
      }));
    };

    _this.submitAnalytics = function (data) {
      return analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */].search.name, data);
    };

    _this.getActiveFilterIndex = function (contentType, filterMap, facets, facetName) {
      var mappings = services["d" /* searchMapper */].mapFacetGroups(contentType, filterMap, facets);
      var activeFilterIndex = mappings && Array.isArray(mappings) ? mappings.findIndex(function (item) {
        return item.name === facetName;
      }) : _this.state.activeFilterIndex;

      if (_this.state.activeFilterIndex !== activeFilterIndex) {
        return activeFilterIndex;
      }

      return _this.state.activeFilterIndex;
    };

    _this.searchOnError = function (error) {
      _this.setEmptyResults();
    };

    _this.setEmptyResults = function () {
      var newState = Object.assign({}, _this.state);
      newState.loading = false;
      newState.rows = [];
      newState.count = 0;
      newState.noResults = true;
      newState.results = {};

      _this.setState(Object.assign({}, _this.state, newState));
    };

    _this.paginationClickHandler = function (page, e) {
      if (e === 'clicked') {
        _this.search.setStorageForPagination();
      }

      ;
      var state = _this.state;
      var newState = Object.assign({}, _this.state, {
        pagination: {
          amount: state.pagination.amount,
          current: page.selected + 1
        }
      });

      _this.setState(newState, function () {
        var query = _this.getQueryObject();

        query.page = page.selected + 1;

        _this.pushToHistory(query, query.facets);
      });
    };

    _this.sortHandler = function (e) {
      var sortOption = parseInt(e.value) === 1 ? services["c" /* parameterValues */].sort.mostRelevant : services["c" /* parameterValues */].sort.mostRecent;

      var query = _this.getQueryObject();

      query.page = 1;
      query.sort = sortOption;

      _this.setState({
        forceCollapseFilters: true
      }, function () {
        _this.pushToHistory(query, query.facets);
      });
    };

    _this.categoryChangeHandler = function (e) {
      return _this.handleCategorySelected(e.value);
    };

    _this.filterSelectHandler = function (facet, categoryId, e, activeIndex) {
      var isChecked = e.target.checked;
      var newState = Object.assign({}, _this.state);

      if (isChecked) {
        if (!newState.selectedFacets["".concat(categoryId)]) {
          newState.selectedFacets["".concat(categoryId)] = [];
        }

        newState.selectedFacets["".concat(categoryId)].push(facet);
      } else {
        var filteredArr = newState.selectedFacets["".concat(categoryId)].filter(function (f, index) {
          if (f === facet) {
            return false;
          } else {
            return true;
          }
        });
        newState.selectedFacets["".concat(categoryId)] = filteredArr;
      }

      _this.state['activeIndex'] = categoryId;

      var query = _this.getQueryObject();

      query.page = 1;
      query.facets = Object(objectSpread["a" /* default */])({}, newState.selectedFacets);

      _this.pushToHistory(query, query.facets);
    };

    _this.handleSubFacetRemove = function (tag) {
      var newState = Object.assign({}, _this.state);
      var filteredArr = newState.selectedFacets["".concat(tag.categoryId)].filter(function (f, index) {
        if (f === tag.facet) {
          return false;
        } else {
          return true;
        }
      });
      newState.selectedFacets["".concat(tag.categoryId)] = filteredArr;

      var query = _this.getQueryObject();

      query.page = 1;
      query.facets = Object(objectSpread["a" /* default */])({}, newState.selectedFacets);

      _this.setState({
        forceCollapseFilters: true
      }, function () {
        _this.pushToHistory(query, query.facets);
      });
    };

    _this.applyFilters = function () {
      _this.hideSortFiltersModal();

      _this.deactivateFilters();

      domElements["a" /* default */].noScroll(false);
      setTimeout(function () {
        _this.search.scrollToTop();
      }, 1000);

      _this.clearUnappliedFilters();
    };

    _this.resetToSavedState = function () {
      _this.setState({
        forceCollapseFilters: true
      }, function () {
        _this.pushToHistory(_this.state.savedState.searchParams, _this.state.savedState.searchParams.facets);
      });
    };

    _this.collapseFilters = function () {
      // setting to true will trigger componentDidUpdate method on the filter component
      // which will take care of doing the actual collapsing of the facet groups
      _this.setState({
        collapseAllFilters: true
      }, function () {
        // reset back to false after state has been updated
        _this.setState({
          collapseAllFilters: false
        });

        setTimeout(_this.deactivateFilters, 0);
      });
    };

    _this.deactivateFilters = function () {
      return document.body.classList.remove('filter-active');
    };

    _this.hideSortFiltersModal = function () {
      return document.body.classList.remove('show-sort-filters');
    };

    _this.setupFilters = function () {
      if (!_this.state.isDesktop) {
        var state = Object.assign({}, _this.state);
        _this.savedSelectFilterState = JSON.stringify(state.selectedFacets);

        _this.setState({
          savedState: state
        });
      }
    };

    _this.handleContentTypeItemClick = function (item) {
      var contentType = item.facetName.replace('_facet', '');

      var query = _this.search.createQueryObject(Object(query_string["parse"])(window.location.search));

      query.content_type = contentType;
      query.page = 1;

      _this.setState({
        forceCollapseFilters: true,
        activeFilterIndex: -1
      }, function () {
        _this.pushToHistory(query, query.facets);
      });
    };

    _this.handleResetSearchToDefault = function () {
      var query = _this.search.createQueryObject(Object(query_string["parse"])(window.location.search));

      if (query.keyword && !_this.search.isDefaultKeyword(query.keyword)) {
        _this.search.clearSessionStore();

        _this.search.setUrlParameter('', window.location.pathname);
      } else {
        // no keyword has been selected so no need to reload page
        // simply clear active filters and update the route
        delete query.content_type;
        delete query.facets;
        query.page = services["b" /* parameterDefaults */].page;

        _this.pushToHistory(query, query.facets);
      }
    };

    _this.handleRemoveKeyword = function () {
      _this.search.clearSessionStore();

      var parameters = Object(query_string["parse"])(window.location.search);
      parameters.keyword = services["b" /* parameterDefaults */].keyword;
      parameters.page = services["b" /* parameterDefaults */].page;
      window.location.href = "".concat(window.location.pathname, "?").concat(Object(query_string["stringify"])(parameters));
    };

    _this.handleRemoveContentType = function () {
      var query = Object(query_string["parse"])(window.location.search);
      delete query.content_type;
      query.page = services["b" /* parameterDefaults */].page;

      _this.pushToHistory(query, query.facets);
    };

    _this.getSelectedContentTypeName = function () {
      var query = _this.getQueryObject();

      var contentTypeElement = _this.findContentType(_this.props.filterMap, query.content_type);

      var contentTypeName = contentTypeElement ? contentTypeElement.categoryFacetName : 'NA';
      return contentTypeName;
    };

    _this.getSelectedContentTypeValue = function () {
      var query = _this.getQueryObject();

      var contentTypeElement = _this.findContentType(_this.props.filterMap, query.content_type);

      var contentTypeValue = contentTypeElement ? contentTypeElement.categoryFacetValue : 'NA';
      return contentTypeValue;
    };

    _this.getSelectedContentTypeTranslation = function () {
      var query = _this.getQueryObject();

      var contentTypeElement = _this.findContentType(_this.props.filterMap, query.content_type);

      var categoryFacetTranslation = contentTypeElement ? contentTypeElement.categoryFacetTranslation : 'NA';
      return categoryFacetTranslation;
    };

    _this.handleFilterGroupClick = function (facetName, index) {
      var activeIndex = index === -1 ? '' : _this.state.activeIndex;

      _this.setState({
        activeFilterIndex: index,
        activeIndex: activeIndex
      });
    };

    _this.getSelectedContentType = function () {
      if (_this.state.contentTypeSelected) {
        if (_this.state.contentTypeSelected.hasOwnProperty('categoryFacetName')) {
          return {
            facetName: _this.state.contentTypeSelected.categoryFacetName,
            facetValue: _this.state.contentTypeSelected.categoryFacetValue,
            facetTranslation: _this.state.contentTypeSelected.categoryFacetTranslation
          };
        } else if (_this.state.contentTypeSelected.hasOwnProperty('facetName')) {
          return _this.state.contentTypeSelected;
        }
      }

      var query = _this.getQueryObject();

      var contentType = _this.props.filterMap.find(function (item) {
        return item.categoryFacetName === "".concat(query.content_type, "_facet");
      });

      return {
        facetName: contentType ? contentType.categoryFacetName : '',
        facetValue: contentType ? contentType.categoryFacetValue : '',
        facetTranslation: contentType ? contentType.categoryFacetTranslation : ''
      };
    };

    _this.handleRelatedSuggestionClick = function (suggestion) {
      var parameters = Object(query_string["parse"])(window.location.search);
      parameters.keyword = suggestion;
      window.location.href = "".concat(window.location.pathname, "?").concat(Object(query_string["stringify"])(parameters));
    };

    _this.handleResultsItemClick = function () {
      _this.search.setStorageForPagePosition();

      _this.search.setStorageForTabHistory(_this.state.tabHistory);
    };

    _this.handleCategorySelected = function (index) {
      if (_this.state.activeTabIndex === index) {
        return;
      }

      var query = _this.getQueryObject();

      _this.persistTabHistory(query);

      _this.setCategorySelected(index, query, _this.state.categoryTabs[index].name);
    };

    _this.setCategorySelected = function (index, query, category) {
      var tabHistoryEntrySelected = _this.getTabHistoryEntry(category);

      if (Object.entries(tabHistoryEntrySelected.searchParams).length === 0) {
        query.category = category;
        query.page = services["b" /* parameterDefaults */].page;
        query.sort = services["b" /* parameterDefaults */].sort;
        delete query.content_type;
        delete query.facets;

        _this.setCategorySelectedState(index, query, services["b" /* parameterDefaults */].content_type, services["b" /* parameterDefaults */].contentTypeSelected, null);
      } else {
        _this.setCategorySelectedState(index, tabHistoryEntrySelected.searchParams, tabHistoryEntrySelected.contentType, tabHistoryEntrySelected.contentTypeSelected, tabHistoryEntrySelected.selectedFacets);
      }
    };

    _this.createTabHistoryEntryForCurrentTab = function (query) {
      var tabHistoryEntry = _this.getTabHistoryEntry(query.category);

      tabHistoryEntry.searchParams = Object.assign({}, query);
      tabHistoryEntry.contentType = _this.state.contentType;
      tabHistoryEntry.contentTypeSelected = Object.assign({}, _this.state.contentTypeSelected);
      tabHistoryEntry.selectedFacets = Object.assign({}, _this.state.selectedFacets);
      return _this.setTabHistoryEntryState(query.category, tabHistoryEntry);
    };

    _this.getTabHistoryEntry = function (category) {
      if (_this.state.tabHistory && _this.state.tabHistory.hasOwnProperty("".concat(category))) {
        return _this.state.tabHistory["".concat(category)];
      }

      return {
        searchParams: {},
        contentType: '',
        contentTypeSelected: {},
        selectedFacets: null
      };
    };

    _this.setTabHistoryEntryState = function (category, tabHistoryEntry) {
      var tabHistory = _this.state.tabHistory ? _this.state.tabHistory : {};
      tabHistory["".concat(category)] = tabHistoryEntry;

      _this.setState({
        tabHistory: tabHistory
      });

      return tabHistory;
    };

    _this.setCategorySelectedState = function (activeTabIndex, searchParams, contentType, contentTypeSelected, selectedFacets) {
      _this.setState({
        activeTabIndex: activeTabIndex,
        searchParams: searchParams,
        keyword: searchParams.keyword,
        category: searchParams.category,
        sort: searchParams.sort,
        contentType: contentType,
        contentTypeSelected: contentTypeSelected,
        selectedFacets: selectedFacets ? selectedFacets : {},
        forceCollapseFilters: screenSizes["a" /* default */].isTabletAndUnder()
      });

      setTimeout(function () {
        _this.pushToHistory(searchParams, selectedFacets);
      }, 0);
    };

    _this.handleHideSortFilterClick = function () {
      var searchParamsStringify = JSON.stringify(_this.state.searchParams);
      var savedParamsStringify = JSON.stringify(_this.state.savedState.searchParams);

      if (searchParamsStringify !== savedParamsStringify) {
        _this.resetToSavedState();
      }

      setTimeout(function () {
        domElements["a" /* default */].noScroll(false);

        _this.deactivateFilters();

        _this.hideSortFiltersModal();
      }, 0);
    };

    _this.categoryProps = function () {
      return {
        categories: _this.state.categoryTabs,
        activeIndex: _this.state.activeTabIndex
      };
    };

    _this.categoryEvents = function () {
      return {
        onCategoryTabClick: _this.handleCategorySelected,
        onCategoryDropdownChange: _this.categoryChangeHandler
      };
    };

    _this.showSortFilterProps = function () {
      return {
        collapseFilters: _this.collapseFilters
      };
    };

    _this.showSortFilterEvents = function () {
      return {
        onSetupFilters: _this.setupFilters,
        onResetToSavedState: _this.resetToSavedState,
        onClose: _this.handleHideSortFilterClick
      };
    };

    _this.resultsProps = function () {
      return {
        rows: _this.state.rows,
        count: _this.state.count,
        query: _this.state.query,
        current: _this.state.pagination && _this.state.pagination.current ? parseInt(_this.state.pagination.current) : 1,
        noQuery: _this.state.noQuery,
        spell_check: _this.state.spell_check,
        spell_related_suggestions: _this.state.spell_related_suggestions,
        spell_suggestion: _this.state.spell_suggestion,
        isSkuList: _this.state.isSkuList,
        items: Array.isArray(_this.state.results) ? _this.state.results : _this.state.results ? _this.state.results : [],
        pagination: _this.state.pagination
      };
    };

    _this.resultsEvents = function () {
      return {
        onRelatedSuggestionClick: _this.handleRelatedSuggestionClick,
        onResultsItemClick: _this.handleResultsItemClick,
        onPageChange: _this.paginationClickHandler
      };
    };

    _this.asideProps = function () {
      return {
        sortFilterIsPristine: _this.state.contentType || _this.state.keyword !== services["b" /* parameterDefaults */].keyword ? false : true,
        count: _this.state.count,
        sortByText: _this.state.sort,
        sortByValue: _this.state.unappliedFilters && _this.state.unappliedFilters.sort ? _this.state.unappliedFilters.sort === services["c" /* parameterValues */].sort.mostRecent ? 2 : 1 : _this.state.sort === services["c" /* parameterValues */].sort.mostRecent ? 2 : 1
      };
    };

    _this.asideEvents = function () {
      return {
        onHideSortFilterClick: _this.handleHideSortFilterClick,
        onApplySortFilter: _this.applyFilters,
        onCollapseFilters: _this.collapseFilters,
        onSort: _this.sortHandler
      };
    };

    _this.menuProps = function () {
      return {
        showContentTypeMenu: _this.isCategoryOnlySelected(_this.state.category, _this.state.contentType),
        showFacetMenu: !_this.isCategoryOnlySelected(_this.state.category, _this.state.contentType),
        heading: _this.props.searchText.filterBy
      };
    };

    _this.contentTypeMenuProps = function () {
      return {
        items: _this.state.filterMap && _this.state.filterMap.orderedFacets ? _this.state.filterMap.orderedFacets : []
      };
    };

    _this.contentTypeMenuEvents = function () {
      return {
        onContentTypeItemClick: _this.handleContentTypeItemClick
      };
    };

    _this.facetMenuProps = function () {
      return {
        selectedValue: _this.getSelectedContentTypeTranslation(),
        previousIcon: _this.props.searchText.previousIcon
      };
    };

    _this.facetMenuEvents = function () {
      return {
        onContentTypeRemoval: _this.handleRemoveContentType
      };
    };

    _this.subFacetFiltersEvents = function () {
      return {
        onFilterSelect: _this.filterSelectHandler,
        onGroupClick: _this.handleFilterGroupClick
      };
    };

    _this.subFacetFiltersProps = function () {
      return {
        items: _this.state.facets,
        filterMap: _this.state.filterMap,
        defaultFacet: _this.props.defaultFacet,
        selectedFacets: _this.state.selectedFacets,
        contentType: _this.state.contentType,
        facetGroupsSelectedOrder: _this.state.facetGroupsSelectedOrder,
        collapseAllFilters: _this.state.collapseAllFilters,
        activeIndex: _this.state.activeFilterIndex
      };
    };

    _this.filterTagsProps = function () {
      return {
        keyword: _this.state.keyword,
        spell_suggestion: _this.state.spell_suggestion,
        contentTypeSelected: _this.getSelectedContentType(),
        selectedFacets: _this.state.unappliedFilters && _this.state.unappliedFilters.selectedFacets ? _this.state.unappliedFilters.selectedFacets : _this.state.selectedFacets,
        facets: _this.state.facets,
        contentType: _this.state.contentType
      };
    };

    _this.filterTagsEvents = function () {
      return {
        onClearAll: _this.handleResetSearchToDefault,
        onKeywordRemove: _this.handleRemoveKeyword,
        onContentTypeRemove: _this.handleRemoveContentType,
        onSubFacetRemove: _this.handleSubFacetRemove
      };
    };

    _this.savedSelectFilterState = null;
    _this.parentCategory = 'contenttype_facet';
    _this.search = props.search;
    _this.search.throwError = _this.props.setErrorBoundaryToTrue;
    _this.state = _this.initialState();
    return _this;
  }

  Object(createClass["a" /* default */])(SearchContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.addHistoryListener();
      this.addResizeListener();
      var facetGroupsSelectedOrder = this.parseFacetsFromUrlToArray();
      var sessionStore = this.search.getSessionStore();
      this.setState({
        tabHistory: sessionStore.searchTabHistory,
        facetGroupsSelectedOrder: facetGroupsSelectedOrder
      }, function () {
        _this2.performSearch();
      });
      this.setState({
        isEprocurementUser: Object(userFunctions["p" /* isEprocurementUser */])()
      });
    }
  }, {
    key: "performSearch",
    value: function () {
      var _performSearch = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(q) {
        var _this3 = this;

        var query, rows, categories, categoriesWithData;
        return regenerator_default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // continue setting up the search
                query = this.buildSearchParams(q);
                rows = this.calcRows(); // update the component's state with pre-search values

                this.setState({
                  searchParams: query,
                  loading: true,
                  results: {},
                  filterMap: {}
                }); // fetch categories only once on the initial rendering
                // store category tabs in the component's state

                if (!this.state.initialRender) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 6;
                return this.search.getCategories({
                  keyword: query.keyword
                });

              case 6:
                categories = _context3.sent;
                // find the categories that have results
                categoriesWithData = this.mapCategories(categories); // execute the search after the category tabs has been saved in the component's state

                this.setState({
                  categoryTabs: categoriesWithData,
                  initialRender: false
                }, function () {
                  return _this3.executeSearch(query, rows);
                });
                _context3.next = 12;
                break;

              case 11:
                // execute the search because the category tabs have already been saved in the component's state
                this.executeSearch(query, rows);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function performSearch(_x) {
        return _performSearch.apply(this, arguments);
      }

      return performSearch;
    }()
  }, {
    key: "pushToHistory",
    value: function pushToHistory(query, facets) {
      this.props.history.push("?".concat(this.search.getQueryParamString(query, facets)));
    }
  }, {
    key: "clearUnappliedFilters",
    value: function clearUnappliedFilters() {
      this.setState({
        savedState: {}
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading && !screenSizes["a" /* default */].isTabletAndUnder()) {
        return react_default.a.createElement(components_loading, {
          visible: true
        });
      }

      ;

      if (this.state.noResults) {
        return react_default.a.createElement(no_results, {
          searchText: this.props.searchText,
          query: this.state.keyword
        });
      }

      return react_default.a.createElement(search_component, {
        isEprocurementUser: this.state.isEprocurementUser,
        text: this.props.searchText,
        filterMap: this.props.filterMap,
        skuConfig: this.state.skuConfig,
        searchParams: this.state.searchParams,
        category: this.state.category ? this.state.category : '',
        categoryProps: this.categoryProps(),
        categoryEvents: this.categoryEvents(),
        showSortFilterProps: this.showSortFilterProps(),
        showSortFilterEvents: this.showSortFilterEvents(),
        resultsProps: this.resultsProps(),
        resultsEvents: this.resultsEvents(),
        asideProps: this.asideProps(),
        asideEvents: this.asideEvents(),
        menuProps: this.menuProps(),
        contentTypeMenuProps: this.contentTypeMenuProps(),
        contentTypeMenuEvents: this.contentTypeMenuEvents(),
        facetMenuProps: this.facetMenuProps(),
        facetMenuEvents: this.facetMenuEvents(),
        subFacetFiltersProps: this.subFacetFiltersProps(),
        subFacetFiltersEvents: this.subFacetFiltersEvents(),
        filterTagsProps: this.filterTagsProps(),
        filterTagsEvents: this.filterTagsEvents()
      });
    }
  }]);

  return SearchContainer;
}(react["Component"]);

/* harmony default export */ var search_container = (Object(withRouter["a" /* default */])(search_container_SearchContainer));
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/BrowserRouter.js
var BrowserRouter = __webpack_require__(496);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(497);

// CONCATENATED MODULE: ./src/search/ErrorBoundary.js







var ErrorBoundary_ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ErrorBoundary);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false,
      hasErrored: false
    };
    return _this;
  }

  Object(createClass["a" /* default */])(ErrorBoundary, [{
    key: "resetErrorBoundaryToFalse",
    value: function resetErrorBoundaryToFalse() {
      this.setState({
        hasError: false
      });
    }
  }, {
    key: "removeNotifications",
    value: function removeNotifications() {
      this.setState({
        hasError: false,
        hasErrored: false
      });
      var notifications = document.querySelectorAll('.cmp-notification--dynamic[class*=cmp-notification--]');
      Array.from(notifications).forEach(function (notification) {
        if (notification) {
          notification.classList.remove('error');
        }
      });
    }
  }, {
    key: "setErrorBoundaryToTrue",
    value: function setErrorBoundaryToTrue(response) {
      var status = response.hasOwnProperty('code') ? response.code : "";
      var notification = document.querySelector('.cmp-notification--dynamic.cmp-notification--error' + status);

      if (notification) {
        notification.classList.add('error');
      }

      this.setState({
        hasError: true,
        hasErrored: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.cloneElement(this.props.children, {
        hasError: this.state.hasError,
        hasErrored: this.state.hasErrored,
        resetErrorBoundaryToFalse: this.resetErrorBoundaryToFalse.bind(this),
        setErrorBoundaryToTrue: this.setErrorBoundaryToTrue.bind(this),
        removeNotifications: this.removeNotifications.bind(this)
      }));
    }
  }]);

  return ErrorBoundary;
}(react_default.a.Component);

/* harmony default export */ var search_ErrorBoundary = (ErrorBoundary_ErrorBoundary);
// CONCATENATED MODULE: ./src/search/index.js







var search_SearchApp = function SearchApp(props) {
  var isoCode = Object(userFunctions["p" /* isEprocurementUser */])() && Object(userFunctions["l" /* getIsoCode */])() || props.isocode;
  var search = new services["a" /* SearchService */](isoCode, props.searchServicePath, services["b" /* parameterDefaults */].page, props.searchDefaults.rows, services["b" /* parameterDefaults */].sort, undefined, function () {});
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(BrowserRouter["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
    path: "",
    render: function render() {
      return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(search_container, {
        defaultFacet: props.defaultFacet,
        searchDefaults: props.searchDefaults,
        searchServicePath: props.searchServicePath,
        searchText: props.searchText,
        searchLocale: props.searchLocale,
        filterMap: props.filterMap,
        isocode: isoCode,
        search: search,
        baseSignInUrl: props.baseSignInUrl
      }));
    }
  })));
};

/* harmony default export */ var src_search = (search_SearchApp);
// EXTERNAL MODULE: ./src/stores/sessionStore.js
var stores_sessionStore = __webpack_require__(15);

// CONCATENATED MODULE: ./src/search/components/tagcloud.js








var tagcloud_TagCloud = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(TagCloud, _Component);

  function TagCloud(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, TagCloud);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(TagCloud).call(this, props));
    _this.sessionStore = new stores_sessionStore["a" /* default */]();
    return _this;
  }

  Object(createClass["a" /* default */])(TagCloud, [{
    key: "handleRelatedSearch",
    value: function handleRelatedSearch(keyword) {
      var filter = keyword.split(':');
      var filterCategory = filter[0];
      var filterValue = encodeURI(encodeURIComponent(filter[1]));
      this.sessionStore.removePreviousPagePosition();
      window.location.href = "".concat(this.props.searchPath, "?category=").concat(this.props.category, "&content_type=").concat(this.props.contentType, "&facet=").concat(filterCategory, ":").concat(filterValue);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mappedResults = this.props.keywords.map(function (keyword, i) {
        var boundItemClick = _this2.handleRelatedSearch.bind(_this2, keyword.filter);

        return react_default.a.createElement("li", {
          className: "cmp-tag-cloud__item",
          key: i
        }, react_default.a.createElement("a", {
          onClick: boundItemClick
        }, keyword.title));
      });
      return [react_default.a.createElement("h3", null, this.props.tagCloudTitle), react_default.a.createElement("ul", {
        className: "cmp-tag-cloud__list"
      }, mappedResults)];
    }
  }]);

  return TagCloud;
}(react["Component"]);

/* harmony default export */ var tagcloud = (tagcloud_TagCloud);
// EXTERNAL MODULE: ./node_modules/hammerjs/hammer.js
var hammer = __webpack_require__(127);
var hammer_default = /*#__PURE__*/__webpack_require__.n(hammer);

// CONCATENATED MODULE: ./src/image-carousel/image-viewer.js









var image_viewer_ImageViewer = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(ImageViewer, _React$Component);

  function ImageViewer() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ImageViewer);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ImageViewer).call(this));

    _this.touchActionNotSupported = function () {
      return typeof CSS != "undefined" && !CSS.supports('touch-action', 'none');
    };

    _this.handleOnDragStart = function (e) {
      return e.preventDefault();
    };

    _this.handleMagnifyClick = function (e) {
      // delay clearing background position so the image gets rendered on the page
      setTimeout(function () {
        return _this.figureRef.current.style.backgroundPosition = '';
      }, 0);
      var magnified = !_this.state.magnified;

      if (magnified && _this.props.onZoomIn) {
        _this.props.onZoomIn();
      }

      if (!magnified && _this.props.onZoomOut) {
        _this.props.onZoomOut();
      }

      if (magnified) {
        _this.setState({
          magnified: magnified
        }, function () {
          if (_this.state.magnified) {
            // CSS hack for browsers that do not support background-size transitions
            // delay 500ms to allow the transform transition to conplete
            setTimeout(function () {
              _this.figureRef.current.classList.add('image-viewer-container__image-figure--zoomin-background');

              _this.figureRef.current.classList.remove('image-viewer-container__image-figure--zoomout-background');
            }, 500);
          }
        });
      } else {
        // CSS hack for browsers that do not support background-size transitions
        _this.figureRef.current.classList.add('image-viewer-container__image-figure--zoomout-background');

        _this.figureRef.current.classList.remove('image-viewer-container__image-figure--zoomin-background'); // delay to allow the CSS ruleset above to render


        setTimeout(function () {
          return _this.setState({
            magnified: magnified
          });
        }, 0);
      }
    };

    _this.handleFigureMove = function (magnified, offsetX, offsetY, figureElement) {
      if (!magnified) return;
      var x = offsetX / figureElement.offsetWidth * 100;
      var y = offsetY / figureElement.offsetHeight * 100; // prevent user from scrolling off the boundary of the figure element
      // which will also prevent from the image going blank when touch is out of boundary

      if (x > 100) {
        x = 100;
      }

      if (x < 0) {
        x = 0;
      }

      if (y > 100) {
        y = 100;
      }

      if (y < 0) {
        y = 0;
      }

      figureElement.style.backgroundPosition = "".concat(x, "% ").concat(y, "%");
    };

    _this.handleFigureMouseMove = function (e) {
      var offsetX = e.nativeEvent.offsetX;
      var offsetY = e.nativeEvent.offsetY;

      _this.handleFigureMove(_this.state.magnified, offsetX, offsetY, e.currentTarget);
    };

    _this.handleFigureTouchMove = function (e) {
      var rectObj = e.nativeEvent.touches[0].target.getBoundingClientRect();
      var offsetX = e.nativeEvent.touches[0].pageX - rectObj.left - window.pageXOffset;
      var offsetY = e.nativeEvent.touches[0].pageY - rectObj.top - window.pageYOffset;

      _this.handleFigureMove(_this.state.magnified, offsetX, offsetY, e.currentTarget);
    };

    _this.handleImageLoad = function (e) {
      var figureWidth = _this.figureRef.current.getBoundingClientRect().width;

      _this.setState({
        figureWidth: figureWidth
      });
    };

    _this.renderImageDisplay = function () {
      return react_default.a.createElement("figure", {
        ref: _this.figureRef,
        className: "image-viewer-container__image-figure image-viewer-container__image-figure--".concat(_this.state.magnified, " image-viewer-container__image-figure--zoomin-").concat(_this.state.magnified),
        style: {
          backgroundImage: "url(".concat(_this.state.imageSrc, ")")
        },
        onDragStart: _this.handleOnDragStart,
        onMouseMove: _this.handleFigureMouseMove,
        onTouchMove: _this.handleFigureTouchMove
      }, react_default.a.createElement("img", {
        className: "image-viewer-container__image-element",
        src: _this.state.imageSrc,
        alt: _this.props.alt,
        onLoad: _this.handleImageLoad
      }));
    };

    _this.renderZoomIcon = function () {
      return _this.state.magnified ? react_default.a.createElement("div", {
        onClick: _this.handleMagnifyClick
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.zoomOutIcon
      })) : react_default.a.createElement("div", {
        onClick: _this.handleMagnifyClick
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.zoomInIcon
      }));
    };

    _this.getClosestWidth = function (containerWidth) {
      if (_this.widths.length) {
        return _this.widths.reduce(function (prev, curr) {
          return curr > containerWidth ? prev : curr;
        });
      } else {
        return '660';
      }
    };

    _this.calculateWidth = function () {
      var containerWidth = _this.containerRef.current.getBoundingClientRect().width;

      var imageWidth = _this.getClosestWidth(containerWidth);

      var figureWidth = _this.figureRef.current.getBoundingClientRect().width;

      var imageSrc = _this.props.template.replace(/{{width}}/gi, imageWidth);

      _this.setState({
        containerWidth: containerWidth,
        imageWidth: imageWidth,
        figureWidth: figureWidth,
        imageSrc: imageSrc
      });
    };

    _this.touchActionPolyfill = null;

    if (_this.props && _this.props.widths.length === 0) {
      _this.widths = [128, 140, 256, 320, 375, 620, 770, 1280];
    } else if (_this.props && _this.props.widths.length > 0) {
      _this.widths = _this.props.widths;
    } else {
      _this.widths = [];
    }

    _this.state = {
      containerWidth: 0,
      imageWidth: 0,
      figureWidth: 0,
      imageSrc: '',
      magnified: false
    };
    _this.containerRef = react_default.a.createRef();
    _this.figureRef = react_default.a.createRef();
    return _this;
  }

  Object(createClass["a" /* default */])(ImageViewer, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        ref: this.containerRef,
        className: "image-viewer-container"
      }, react_default.a.createElement("div", {
        className: "image-viewer-container__image-display"
      }, this.renderImageDisplay(), react_default.a.createElement("div", {
        className: "image-viewer-container__image-zoom"
      }, react_default.a.createElement("div", null, this.renderZoomIcon()))));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.magnified && !prevState.magnified && this.touchActionNotSupported()) {
        this.touchActionPolyfill = hammer_default()(this.figureRef.current, {
          touchAction: 'pan-x'
        });
      } else if (!this.state.magnified && prevState.magnified && this.touchActionNotSupported()) {
        this.touchActionPolyfill.destroy();
        this.touchActionPolyfill = null;
      }

      if (this.props.isActive !== prevProps.isActive) {
        this.setState({
          magnified: false
        });
      }

      if ((prevState.imageWidth !== this.state.imageWidth || prevState.containerWidth !== this.state.containerWidth || prevState.figureWidth !== this.state.figureWidth) && this.props.onCalculate) {
        this.props.onCalculate(this.state);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.figureRef.current.style.backgroundPosition = '50% 50%';
      this.calculateWidth(); // this is for desktop

      window.addEventListener('resize', this.calculateWidth); // this is for iPad orientation

      window.addEventListener('orientationchange', this.calculateWidth); // this is for mobile devices

      window.addEventListener('deviceorientation', this.calculateWidth);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.calculateWidth);
      window.removeEventListener('orientationchange', this.calculateWidth);
      window.removeEventListener('deviceorientation', this.calculateWidth);
    }
  }]);

  return ImageViewer;
}(react_default.a.Component);

/* harmony default export */ var image_viewer = (image_viewer_ImageViewer);
// CONCATENATED MODULE: ./src/image-carousel/image-thumbnails.js








var PREV = -1;
var NEXT = 1;
var WIDTH_PER_THUMBNAIL = 86;

var image_thumbnails_ImageThumbnails = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(ImageThumbnails, _React$Component);

  function ImageThumbnails(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ImageThumbnails);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ImageThumbnails).call(this, props));

    _this.handleSlide = function (dir) {
      var newIndex = _this.state.firstIndex + dir; // check the boundaries to prevent sliding beyond left/right boundary

      if (dir === PREV && newIndex === -1) {
        return;
      }

      if (dir === NEXT && newIndex >= _this.getLastIndex(_this.props.width, _this.props.items.length) + 1) {
        return;
      }

      if (dir === NEXT) {
        _this.handleSlideNext(_this.state.firstIndex, newIndex);
      } else {
        _this.handleSlidePrev(_this.state.firstIndex, newIndex);
      }
    };

    _this.getSlideDelay = function () {
      return screenSizes["a" /* default */].isTabletAndUnder() ? 125 : 250;
    };

    _this.handleSlideNext = function (currentIndex, newIndex) {
      // delay so the CSS transition for sliding is not prevented
      setTimeout(function () {
        return _this.refs[currentIndex].current.style.display = "none";
      }, _this.getSlideDelay());

      _this.setState({
        firstIndex: newIndex
      });
    };

    _this.handleSlidePrev = function (currentIndex, newIndex) {
      // delay both statements to allow fast continous sliding
      // this will happend if the user continously clicks the previous button
      setTimeout(function () {
        return _this.refs[newIndex].current.style.display = "";
      }, 25);
      setTimeout(function () {
        return _this.setState({
          firstIndex: newIndex
        });
      }, 50);
    };

    _this.handleTouchStart = function (e) {
      var touch = e.touches[0];

      _this.setState({
        xStart: touch.clientX,
        yStart: touch.clientY
      });
    };

    _this.handleTouchMove = function (e) {
      var touch = e.touches[0];

      _this.setState({
        xMove: touch.clientX,
        yMove: touch.clientY
      });
    };

    _this.handleTouchEnd = function (e) {
      if (_this.state.xMove === 0) return;

      if (_this.state.xStart < _this.state.xMove) {
        _this.handleSlide(PREV);
      } else {
        _this.handleSlide(NEXT);
      }

      _this.setState({
        xStart: 0,
        yStart: 0,
        xMove: 0,
        yMove: 0
      });
    };

    _this.getItemClassName = function (index) {
      if (index < _this.state.firstIndex) {
        return "image-thumbnails-container__item--hidden ".concat(_this.state.selectedIndex === index ? "image-thumbnails-container__item--selected" : "");
      }

      return "image-thumbnails-container__item--visible ".concat(_this.state.selectedIndex === index ? "image-thumbnails-container__item--selected" : "");
    };

    _this.handleItemClick = function (item, index) {
      if (_this.props.onItemClick) {
        _this.props.onItemClick({
          item: item,
          index: index
        });
      }

      _this.setState({
        selectedIndex: index
      });
    };

    _this.renderItems = function () {
      // refs are used to toggle the display property for each item during sliding
      // and to highlight the selected that has been clicked
      _this.refs = [];

      for (var i = 0; i < _this.props.items.length; i++) {
        _this.refs.push(react_default.a.createRef());
      }

      return _this.props.items.map(function (item, index) {
        return react_default.a.createElement("div", {
          ref: _this.refs[index],
          key: index,
          className: "image-thumbnails-container__item ".concat(_this.getItemClassName(index)),
          onClick: function onClick(e) {
            return _this.handleItemClick(item, index);
          }
        }, item);
      });
    };

    _this.getPrevButtonClassName = function () {
      return _this.state.firstIndex === 0 ? 'image-thumbails-button--disabled' : '';
    };

    _this.getNextButtonClassName = function () {
      var lastIndex = _this.getLastIndex(_this.props.width, _this.props.items.length);

      if (_this.state.firstIndex === lastIndex) {
        return 'image-thumbails-button--disabled';
      }

      return '';
    };

    _this.getTotalVisibleItems = function (width, widthPerThumbnail) {
      return Math.floor((width - (screenSizes["a" /* default */].isTabletAndUnder() ? 0 : 100)) / widthPerThumbnail);
    };

    _this.getLastIndex = function (width, totalItems) {
      return totalItems - _this.getTotalVisibleItems(width, WIDTH_PER_THUMBNAIL);
    };

    _this.getImageThumbnailsWrapperStyle = function () {
      // check if scrolling thumbnails is needed
      // if scrolling is needed, set width and show the next and previous buttons
      // if scrolling is not needed, no need for width and buttons... simply center images
      var totalVisibleItems = _this.getTotalVisibleItems(_this.props.width, WIDTH_PER_THUMBNAIL);

      if (_this.props.items.length <= totalVisibleItems) {
        return {};
      }

      return {
        width: "".concat(_this.props.width, "px")
      };
    };

    _this.getImageThumbnailsWrapperClassName = function () {
      // check if scrolling thumbnails is needed
      // if scrolling is needed, set width and show the next and previous buttons
      // if scrolling is not needed, no need for width and buttons... simply center images
      var totalVisibleItems = _this.getTotalVisibleItems(_this.props.width, WIDTH_PER_THUMBNAIL);

      if (_this.props.items.length <= totalVisibleItems) {
        return 'image-thumbnails-wrapper--no-x-scroll';
      }

      return '';
    };

    _this.gradientLeft = function () {
      if (_this.state.firstIndex !== 0) {
        _this.addGradientLeft();
      } else {
        _this.removeGradientLeft();
      }
    };

    _this.gradientRight = function () {
      var lastIndex = _this.getLastIndex(_this.props.width, _this.props.items.length);

      if (_this.state.firstIndex < lastIndex) {
        _this.addGradientRight();
      } else {
        _this.removeGradientRight();
      }
    };

    _this.addGradientLeft = function () {
      if (_this.gradientLeftRef.current) {
        _this.gradientLeftRef.current.style.display = 'block';
      }
    };

    _this.removeGradientLeft = function () {
      if (_this.gradientLeftRef.current) {
        _this.gradientLeftRef.current.style.display = 'none';
      }
    };

    _this.addGradientRight = function () {
      if (_this.gradientRightRef.current) {
        _this.gradientRightRef.current.style.display = 'block';
      }
    };

    _this.removeGradientRight = function () {
      if (_this.gradientRightRef.current) {
        _this.gradientRightRef.current.style.display = 'none';
      }
    };

    _this.gradientLeftRef = react_default.a.createRef();
    _this.gradientRightRef = react_default.a.createRef();
    _this.refs = [];
    _this.state = {
      firstIndex: 0,
      selectedIndex: 0,
      xStart: 0,
      yStart: 0,
      xMove: 0,
      yMove: 0
    };
    return _this;
  }

  Object(createClass["a" /* default */])(ImageThumbnails, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return react_default.a.createElement("div", {
        className: "image-thumbnails-wrapper ".concat(this.getImageThumbnailsWrapperClassName()),
        style: this.getImageThumbnailsWrapperStyle()
      }, react_default.a.createElement("div", {
        className: "image-thumbnails-button ".concat(this.getPrevButtonClassName()),
        onClick: function onClick(e) {
          return _this2.handleSlide(PREV);
        }
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: "/content/dam/waters/en/brand-assets/icons/left.svg"
      })), react_default.a.createElement("div", {
        className: "image-thumbnails-container",
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      }, react_default.a.createElement("div", {
        ref: this.gradientLeftRef,
        "class": "image-thumbnails-wrapper__gradient-left"
      }), this.renderItems(), react_default.a.createElement("div", {
        ref: this.gradientRightRef,
        "class": "image-thumbnails-wrapper__gradient-right"
      })), react_default.a.createElement("div", {
        className: "image-thumbnails-button ".concat(this.getNextButtonClassName()),
        onClick: function onClick(e) {
          return _this2.handleSlide(NEXT);
        }
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: "/content/dam/waters/en/brand-assets/icons/right.svg"
      })));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (screenSizes["a" /* default */].isTabletAndUnder()) {
        this.gradientLeft();
        this.gradientRight();
      }
    }
  }]);

  return ImageThumbnails;
}(react_default.a.Component);

/* harmony default export */ var image_thumbnails = (image_thumbnails_ImageThumbnails);
// CONCATENATED MODULE: ./src/image-carousel/index.js









var image_carousel_ImageCarousel = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(ImageCarousel, _React$Component);

  function ImageCarousel() {
    var _this;

    Object(classCallCheck["a" /* default */])(this, ImageCarousel);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(ImageCarousel).call(this));

    _this.handleImageViewerCalculate = function (data) {
      // this will prevent the thumbnail width from changing when user clicks on thumbnails
      if (_this.state.thumbnailClicked) {
        _this.setState({
          thumbnailClicked: false
        });

        return;
      }

      if (_this.state.figureWidth !== data.figureWidth && data.figureWidth !== 0) {
        _this.setState({
          figureWidth: data.figureWidth
        });
      }
    };

    _this.handleThumbnailClick = function (e) {
      return _this.setState({
        activeIndex: e.index,
        thumbnailClicked: true
      });
    };

    _this.getImageViewerComponents = function () {
      return _this.props.templates.map(function (template, index) {
        return _this.mapTemplateToImageViewer(template, index);
      });
    };

    _this.mapTemplateToImageViewer = function (template, index) {
      return react_default.a.createElement("div", {
        style: {
          display: _this.state.activeIndex === index ? 'block' : 'none'
        }
      }, react_default.a.createElement(image_viewer, {
        key: template,
        template: template,
        widths: _this.props.widths,
        alt: _this.props.alt,
        isActive: index === _this.state.activeIndex,
        zoomInIcon: _this.props.zoomInIcon,
        zoomOutIcon: _this.props.zoomOutIcon,
        onZoomIn: _this.handleZoomIn,
        onZoomOut: _this.handleZoomOut,
        onCalculate: _this.handleImageViewerCalculate
      }));
    };

    _this.getThumbnails = function () {
      return _this.props.templates.length > 1 ? react_default.a.createElement(image_thumbnails, {
        items: _this.getThumbnailImages(),
        onItemClick: _this.handleThumbnailClick,
        width: _this.state.figureWidth
      }) : react_default.a.createElement(react_default.a.Fragment, null);
    };

    _this.getThumbnailImages = function () {
      return _this.props.templates.map(function (template) {
        return _this.mapTemplateToElement(template);
      });
    };

    _this.mapTemplateToElement = function (template) {
      return react_default.a.createElement("div", {
        className: "image-thumbnails-container__image",
        style: {
          backgroundImage: "url(".concat(template.replace(/{{width}}/gi, _this.props.widths[0]), ")")
        }
      });
    };

    _this.state = {
      activeIndex: 0,
      figureWidth: 0,
      thumbnailClicked: false
    };
    return _this;
  }

  Object(createClass["a" /* default */])(ImageCarousel, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "image-carousel"
      }, react_default.a.createElement("div", {
        className: "image-viewer-placeholder"
      }, this.getImageViewerComponents()), react_default.a.createElement("div", {
        className: "image-thumbnails-placeholder"
      }, this.getThumbnails()));
    }
  }]);

  return ImageCarousel;
}(react_default.a.Component);

image_carousel_ImageCarousel.defaultProps = {
  widths: ['128', '140', '256', '320', '375', '620', '770', '1280']
};
/* harmony default export */ var image_carousel = (image_carousel_ImageCarousel);
// CONCATENATED MODULE: ./src/user-greetings/UserGreeting.js





function UserGreeting(props) {
  var greetings = props.greetings,
      logoDirectoryPath = props.logoDirectoryPath;
  var store = new stores_sessionStore["a" /* default */]();
  var savedUserDetails = store.getUserDetails();
  var name = "".concat(savedUserDetails.firstName || '', " ").concat(savedUserDetails.lastName || '');
  var company = savedUserDetails.company || '';

  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      isImageHidden = _useState2[0],
      hideCompanyImageOnError = _useState2[1];

  var srcLogo = Object(eCommerceFunctions["b" /* getCompanyLogo */])(logoDirectoryPath, Object(eCommerceFunctions["d" /* htmlParser */])(company));
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
    className: "greetings",
    "data-locator": "user-greeting-sec"
  }, react_default.a.createElement("h2", {
    "data-locator": "user-greeting"
  }, greetings), react_default.a.createElement("h3", {
    "data-locator": "user-greeting-name"
  }, Object(eCommerceFunctions["d" /* htmlParser */])(name)), react_default.a.createElement("h4", {
    "data-locator": "user-greeting-company"
  }, Object(eCommerceFunctions["d" /* htmlParser */])(company))), !isImageHidden && react_default.a.createElement("img", {
    src: srcLogo,
    alt: Object(eCommerceFunctions["d" /* htmlParser */])(company),
    className: "logo",
    "data-locator": "user-greeting-logo",
    onError: function onError() {
      return hideCompanyImageOnError(true);
    }
  }));
}

UserGreeting.defaultProps = {
  greetings: '',
  logoDirectoryPath: ''
};
/* harmony default export */ var user_greetings_UserGreeting = (UserGreeting);
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
          maxInputLength = _this$props2.maxInputLength,
          setRef = _this$props2.setRef;
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
        autoComplete: "off",
        ref: function ref(_ref) {
          return setRef(_ref);
        }
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
  accept: '',
  setRef: function setRef() {}
};
/* harmony default export */ var components_Input_Input = (Input_Input);
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
  }), react_default.a.createElement(views_addToCart, {
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
  }), react_default.a.createElement(addToCartModal["a" /* default */], {
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
/* harmony default export */ var quick_order_QuickOrder = (QuickOrder);
// CONCATENATED MODULE: ./src/link-button/LinkButton.js



function LinkButton(props) {
  var url = props.url,
      label = props.label;
  return react_default.a.createElement("a", {
    className: "cmp-button",
    href: url,
    title: label,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("link ".concat(label)),
    "aria-label": label
  }, label);
}

LinkButton.defaultProps = {
  url: '#',
  label: 'Contact Waters'
};
/* harmony default export */ var link_button_LinkButton = (LinkButton);
// EXTERNAL MODULE: ./node_modules/react-html-parser/lib/index.js
var react_html_parser_lib = __webpack_require__(99);
var react_html_parser_lib_default = /*#__PURE__*/__webpack_require__.n(react_html_parser_lib);

// EXTERNAL MODULE: ./src/legal-link-modal/styles/index.scss
var legal_link_modal_styles = __webpack_require__(144);

// CONCATENATED MODULE: ./src/legal-link-modal/LegalLinkModal.js







function LegalLinkModal(props) {
  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = Object(react["useState"])(''),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      title = _useState4[0],
      setTitle = _useState4[1];

  var _useState5 = Object(react["useState"])(''),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      bodyContent = _useState6[0],
      setBodyContent = _useState6[1];

  var instanceTimeOut; // Content Fragment

  function openModal(event) {
    try {
      var _event$target = event.target,
          href = _event$target.href,
          _title = _event$target.title;
      fetch(href, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'text/html',
          'Content-Type': 'text/html'
        }
      }).then(function (response) {
        return response.text();
      }).then(function (content) {
        setTitle(_title);
        setBodyContent(content);
        setIsOpen(true);
      })["catch"](function (e) {
        return console.error(e);
      });
    } catch (error) {
      console.error(error);
    }
  } // Wait untill selector is loaded


  function waitUntilLinkExists(container) {
    var elem = document.getElementById(container);

    if (elem) {
      // Adds addEventListener event on terms-of-use' and privacy-policy link
      document.addEventListener('click', function (event) {
        if (event.target.id === container) {
          event.preventDefault();
          openModal(event);
          clearTimeout(instanceTimeOut);
        }
      });
    } else {
      instanceTimeOut = setTimeout(function () {
        waitUntilLinkExists(container);
      }, 10);
    }
  } // componentDidMount


  Object(react["useEffect"])(function () {
    waitUntilLinkExists('contact-support-form-terms-of-use');
    waitUntilLinkExists('contact-support-form-waters-privacy');
  }, []); // Close Modal

  var onClose = Object(react["useCallback"])(function () {
    setIsOpen(false);
  }, [isOpen, setIsOpen]);
  return react_default.a.createElement(modal["b" /* default */], {
    isOpen: isOpen,
    onClose: onClose,
    className: "cmp-modal-legal-links"
  }, react_default.a.createElement("div", {
    className: "cmp-modal-body-legal-links custom-scroll"
  }, react_default.a.createElement(modal["a" /* Header */], {
    title: title,
    icon: props.docIcon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTop
  }), react_default.a.createElement(addToCartModal["a" /* default */], {
    config: {
      isOrderDetails: true,
      text: react_html_parser_lib_default()("<main>".concat(bodyContent, "</main>"))
    },
    errorObjCart: {},
    onClose: function onClose() {}
  })));
}

LegalLinkModal.defaultProps = {
  docIcon: ''
};
/* harmony default export */ var legal_link_modal_LegalLinkModal = (LegalLinkModal);
// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(21);

// CONCATENATED MODULE: ./src/sku-details/index.js







// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time




















var sku_details_SkuDetails = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(SkuDetails, _React$Component);

  function SkuDetails(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, SkuDetails);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(SkuDetails).call(this, props));

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
      getPricing(pricingUrl, skuNumber, userInfo.dynamicSoldTo, userInfo.salesOrg).then(function (response) {
        if (response.status && response.status === 200) {
          var match = matchListItems(skuNumber, response);
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
            errorPriceType: [constants["a" /* BAD_REQUEST_CODE */], constants["e" /* SERVER_ERROR_CODE */]].includes(Object(eCommerceFunctions["c" /* getHttpStatusFromErrors */])(response.errors, response.status)) ? Object(userFunctions["p" /* isEprocurementUser */])() ? constants["f" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */] : constants["c" /* LIST_PRICE_WITH_ADD_TO_CART */] : constants["d" /* NO_PRICE_NO_ADD_TO_CART */],
            loading: false
          });
        }
      })["catch"](function () {
        // Add Error Object to State
        _this.setState({
          errorPriceType: constants["d" /* NO_PRICE_NO_ADD_TO_CART */],
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
      return react_default.a.createElement(sku_message, {
        icon: _this.state.skuInfo.lowStockIcon,
        message: _this.props.countryRestricted
      });
    };

    _this.renderDiscontinued = function () {
      var discontinuedMessage = _this.props.config.skuInfo.discontinuedWithReplacementWithCode;

      if (!_this.props.replacementSkuCode || !_this.props.replacementSkuHref) {
        discontinuedMessage = _this.props.config.skuInfo.discontinuedNoReplacementCode;
      }

      return react_default.a.createElement(sku_message, {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: discontinuedMessage,
        link: _this.props.replacementSkuHref,
        linkMessage: _this.props.replacementSkuCode
      });
    };

    _this.renderEcommerceDisabled = function () {
      return react_default.a.createElement(sku_message, {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.disabledText
      });
    };

    _this.renderEcommercePartialDisabled = function () {
      return react_default.a.createElement(sku_message, {
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
      var isHiddenListPrice = errorPriceType === constants["d" /* NO_PRICE_NO_ADD_TO_CART */] && isStickyAvailable && Object(userFunctions["p" /* isEprocurementUser */])() ? true : false;

      if (errorPriceType === constants["f" /* UNAVAILABLE_PRICE_WITH_ADD_TO_CART */] && !isStickyAvailable) {
        return react_default.a.createElement(unavailablePrice, {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined' && !isHiddenListPrice) {
          return react_default.a.createElement(views_price, {
            label: skuInfo.listPriceLabel,
            price: listPrice,
            isListPrice: true
          });
        } else {
          return react_default.a.createElement(react_default.a.Fragment, null);
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
          return react_default.a.createElement(views_price, {
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

      var isHiddenAddToCart = errorPriceType === constants["d" /* NO_PRICE_NO_ADD_TO_CART */] && isStickyAvailable ? true : false;
      return react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo",
        "data-locator": "sku-details-buyinfo"
      }, loginStatus["a" /* default */].state() && typeof custPrice !== 'undefined' && custPrice !== listPrice && react_default.a.createElement("div", {
        className: "cmp-sku-details__list-price"
      }, "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)), react_default.a.createElement("div", {
        className: "cmp-sku-details__priceinfo",
        "data-locator": "sku-details-priceinfo"
      }, loading ? react_default.a.createElement(spinner["a" /* default */], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), react_default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        "data-locator": "sku-details-availability"
      }, react_default.a.createElement(stock, {
        skuInfo: skuInfo,
        skuNumber: skuNumber,
        skuAvailability: skuAvailability,
        skuType: "details",
        errorObj: errorObjAvailability
      })), react_default.a.createElement("div", {
        className: "cmp-sku-details__buttons".concat(isHiddenAddToCart ? ' cmp-sku-details__add-to-cart-hide' : ''),
        "data-locator": "sku-details-add-to-cart-sec"
      }, react_default.a.createElement(views_addToCart, {
        toggleParentModal: _this.toggleModal,
        skuNumber: skuNumber,
        addToCartLabel: config.addToCartLabel,
        addToCartQty: config.defaultSkuQty,
        addToCartUrl: config.addToCartUrl,
        isCommerceApiMigrated: config.isCommerceApiMigrated,
        toggleErrorModal: _this.toggleErrorModal,
        analyticsConfig: _this.state.analyticsConfig
      })), react_default.a.createElement(modal["b" /* default */], {
        isOpen: _this.state.modalShown,
        onClose: _this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, !isErrorModal && react_default.a.createElement(modal["a" /* Header */], {
        title: _this.state.modalConfig.title,
        icon: _this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop,
        elementLocator: "add-to-cart-modal-header"
      }), isErrorModal && react_default.a.createElement(modal["a" /* Header */], {
        title: _this.state.errorInfo.title,
        icon: _this.state.errorInfo.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTopError,
        elementLocator: "add-to-cart-modal-header"
      }), react_default.a.createElement(addToCartModal["a" /* default */], {
        config: _this.state.modalConfig,
        errorObjCart: _this.state.errorObjCart
      })));
    };

    _this.renderActiveSku = function () {
      if (ecommerce["a" /* default */].isDisabledState()) {
        return _this.renderEcommerceDisabled();
      } else {
        if (ecommerce["a" /* default */].isPartialState() && loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state() || !ecommerce["a" /* default */].isPartialState() && !ecommerce["a" /* default */].isDisabledState()) {
          return react_default.a.createElement(react_default.a.Fragment, null, !loginStatus["a" /* default */].state() && react_default.a.createElement(scripts_signIn["a" /* default */], {
            signInUrl: _this.props.config.baseSignInUrl,
            signInIcon: _this.state.skuInfo.signinIcon,
            signInText1: _this.state.skuInfo.signInText1,
            signInText2: _this.state.skuInfo.signInText2,
            signInText3: _this.state.skuInfo.signInText3
          }) || loginStatus["a" /* default */].state() && react_default.a.createElement("div", {
            className: "cmp-sku-signin-wrapper-not-displayed"
          }), _this.renderBuyInfo());
        } else {
          return _this.renderEcommercePartialDisabled();
        }
      }
    };

    _this.renderEProcurementUserRestricted = function () {
      return react_default.a.createElement(sku_message, {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.eProcurementRestrictedText
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return react_default.a.createElement(sku_message, {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: _this.props.config.skuInfo.skuErrorMessage
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return react_default.a.createElement(sku_message, {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: _this.props.config.skuInfo.skuErrorMessage
      });
    };

    _this.state = {
      modalShown: false,
      modalConfig: Object(objectSpread["a" /* default */])({}, _this.props.config.modalInfo, {
        textHeading: _this.props.skuNumber,
        text: _this.props.titleText,
        partNumberLabel: _this.props.config.skuInfo.partNumberLabel
      }),
      code: _this.props.skuNumber,
      skuInfo: _this.props.config.skuInfo,
      skuNumber: _this.props.skuNumber,
      userInfo: {},
      userCountry: _this.props.config.countryCode,
      isGlobal: _this.props.config.countryCode === DigitalData["a" /* default */].globalExperience,
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
        context: analytics["c" /* mainCartContext */],
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
      isEProcurementUserRestricted: !Object(userFunctions["p" /* isEprocurementUser */])() && Object(userFunctions["q" /* isEprocurementUserRole */])(),
      isStickyAvailable: false
    };
    _this.toggleModal = _this.toggleModal.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(SkuDetails, [{
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
        if (loginStatus["a" /* default */].state()) {
          var userInfo = Object(userFunctions["a" /* callCustomerPriceApi */])(custPriceApiDisabled);

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

        getAvailability(availabilityUrl, userCountry, skuNumber).then(function (response) {
          _this2.setState({
            skuAvailability: response,
            modalInfo: Object(objectSpread["a" /* default */])({}, _this2.props.config.modalInfo, {
              textHeading: _this2.props.skuNumber,
              text: _this2.props.titleText
            }),
            analyticsConfig: Object(objectSpread["a" /* default */])({}, _this2.state.analyticsConfig, response)
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
      } else if (this.state.errorPriceType === constants["d" /* NO_PRICE_NO_ADD_TO_CART */] && !this.state.isStickyAvailable) {
        return this.renderSkuPriceErrorMsg();
      } else {
        return this.renderActiveSku();
      }
    }
  }]);

  return SkuDetails;
}(react_default.a.Component);

sku_details_SkuDetails.defaultProps = {
  config: {},
  price: '',
  countryRestricted: '',
  skuNumber: '',
  titleText: '',
  discontinued: false,
  replacementSkuCode: '',
  replacementSkuHref: ''
};
/* harmony default export */ var src_sku_details = (sku_details_SkuDetails);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/react-hook-form.ie11.js
var react_hook_form_ie11 = __webpack_require__(128);
var react_hook_form_ie11_default = /*#__PURE__*/__webpack_require__.n(react_hook_form_ie11);

// EXTERNAL MODULE: ./src/forms/fields/utils/stateWatcher.js + 1 modules
var stateWatcher = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js
var objectDestructuringEmpty = __webpack_require__(33);

// CONCATENATED MODULE: ./src/forms/fields/components/field-validation-display.js





var field_validation_display_FieldValidationDisplay = function FieldValidationDisplay(_ref) {
  var name = _ref.name,
      matchName = _ref.matchName,
      children = _ref.children;
  var formState = Object(stateWatcher["d" /* useFormStateContext */])();
  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var _useContext = Object(react["useContext"])(useFieldApi),
      options = _useContext.options,
      type = _useContext.type;

  var isDirty = function isDirty(name) {
    return formState.touched[0] && (Object(esm_typeof["a" /* default */])(formState.touched[0]) === "object" ? formState.touched[0].has(name) : formState.touched.indexOf(name) > -1);
  };

  var isDirtyMatch = function isDirtyMatch(name) {
    return matchName !== "" ? isDirty(name) : false;
  };

  var isValid = function isValid(name) {
    return !errors[name];
  };

  var isValidMatch = function isValidMatch(name) {
    return matchName !== "" ? isValid(name) : true;
  };

  var renderClean = function renderClean() {
    return react_default.a.createElement("div", {
      className: "cmp-form-field cmp-form-field-".concat(type)
    }, children);
  };

  var renderValid = function renderValid() {
    return react_default.a.createElement("div", {
      className: "cmp-form-field cmp-form-field-".concat(type, " cmp-form-field--valid")
    }, children);
  };

  var renderInvalid = function renderInvalid() {
    return react_default.a.createElement("div", {
      className: "cmp-form-field cmp-form-field-".concat(type, " cmp-form-field--invalid")
    }, children);
  };

  var renderDisplay = function renderDisplay(name) {
    if (type === "dropdown" && !isValid(name)) return "invalid";
    if (!isDirty(name) && !isDirtyMatch(matchName)) return "clean";
    if (isValid(name) && isValidMatch(matchName)) return "valid";
    if (!isValid(name) || !isValidMatch(matchName)) return "invalid";
    return "clean";
  };

  var displayType = renderDisplay(name);

  if ((type === "radio" || type === "checkbox") && !!options) {
    options.forEach(function (option) {
      if (renderDisplay(option.name) !== "clean") {
        displayType = renderDisplay(option.name);
      }
    });
  }

  switch (displayType) {
    case "valid":
      return renderValid();

    case "invalid":
      return renderInvalid();

    case "clean":
    default:
      return renderClean();
  }
};

/* harmony default export */ var field_validation_display = (react_default.a.memo(field_validation_display_FieldValidationDisplay));
// CONCATENATED MODULE: ./src/forms/fields/components/icons.js





var icons_Icons = function Icons(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      icons = _useContext.icons,
      type = _useContext.type,
      disabled = _useContext.disabled;

  var getType = function getType(elem) {
    return elem.classList.contains('toggled') ? 'text' : type;
  };

  var toggleEye = function toggleEye(e) {
    e.preventDefault();
    var parent = e.currentTarget.parentNode;
    var onIcon = parent.querySelector('.showHide-icon');
    var offIcon = parent.querySelector('.showHideOff-icon');

    if (onIcon && offIcon) {
      onIcon.classList.toggle('toggled');
      offIcon.classList.toggle('toggled');
      parent.parentNode.querySelector('input').type = getType(offIcon);
    }
  };

  var eyeIcons = type === 'password' ? react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.eyeIcon,
    className: "showHide-icon toggled",
    onMouseDown: toggleEye
  }), react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.eyeOffIcon,
    className: "showHideOff-icon",
    onMouseDown: toggleEye
  })) : react_default.a.createElement(react_default.a.Fragment, null);
  return react_default.a.createElement("div", {
    className: "cmp-form-field--icons"
  }, eyeIcons, !disabled && react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.validIcon,
    className: "valid-icon"
  }), !disabled && react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.invalidIcon,
    className: "invalid-icon"
  }), disabled && react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.lockIcon,
    className: "lock-icon"
  }));
};

/* harmony default export */ var components_icons = (react_default.a.memo(icons_Icons));
// CONCATENATED MODULE: ./src/forms/fields/components/displaymessage.js






var displaymessage_DisplayMessage = function DisplayMessage(_ref) {
  var name = _ref.name,
      validation = _ref.validation;

  var _useContext = Object(react["useContext"])(useFieldApi),
      icons = _useContext.icons;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      isAlreadyRegistered = _useContext2.isAlreadyRegistered;

  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var getInfo = function getInfo() {
    var fieldErr = errors[name];
    var message = '';
    var link = react_default.a.createElement(react_default.a.Fragment, null);

    if (validation && fieldErr) {
      switch (fieldErr.type) {
        case 'required':
          message = fieldErr.message || validation.requiredMsg;
          break;

        case 'pattern':
        case 'validate':
          if (validation.validateFnName === 'email') {
            if (errors.invalidEmail) message = errors.invalidEmail.message;
            if (errors.alreadyRegistered) return showSignIn();
            if (isAlreadyRegistered) return showSignIn();
            break;
          }

          message = fieldErr.message || validation.validationMsg || validation.requiredMsg;
          break;

        default:
          message = fieldErr.message;
          break;
      }
    }

    return react_default.a.createElement(react_default.a.Fragment, null, message, link);
  };

  var showSignIn = function showSignIn() {
    return react_default.a.createElement(react_default.a.Fragment, null, validation.alreadyRegisteredMsg, react_default.a.createElement("a", {
      href: validation.signInURL,
      className: "cmp-sign-in-link"
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: icons.signInIcon,
      className: "email-signin"
    }), validation.signInMsg));
  };

  return react_default.a.createElement("span", {
    className: "cmp-form-field--errorText"
  }, getInfo());
};

/* harmony default export */ var displaymessage = (react_default.a.memo(displaymessage_DisplayMessage));
// EXTERNAL MODULE: ./src/forms/fields/patterns/index.js + 1 modules
var patterns = __webpack_require__(42);

// CONCATENATED MODULE: ./src/forms/fields/components/requirements.js






var requirements_Requirements = function Requirements(_ref, ref) {
  var header = _ref.header,
      requirements = _ref.requirements;

  var _useContext = Object(react["useContext"])(useFieldApi),
      icons = _useContext.icons;

  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      toggled = _useState2[0],
      setToggled = _useState2[1];

  var _useState3 = Object(react["useState"])(""),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      input = _useState4[0],
      setInput = _useState4[1];

  var _useState5 = Object(react["useState"])({}),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      errors = _useState6[0],
      setErrors = _useState6[1];

  var _useState7 = Object(react["useState"])(Array.from({
    length: requirements.length
  }, function () {
    return false;
  })),
      _useState8 = Object(slicedToArray["a" /* default */])(_useState7, 2),
      validFields = _useState8[0],
      setValidFields = _useState8[1];

  Object(react["useEffect"])(function () {
    setValidFields(requirements.map(function (_ref2) {
      var name = _ref2.name;
      return !hasError(name) && !emptyInput();
    }));
  }, [input]);
  Object(react["useImperativeHandle"])(ref, function () {
    return {
      toggle: function toggle() {
        setToggled(!toggled);
        return toggled;
      },
      update: function update(newInput) {
        setInput(newInput);
        setErrors(patterns["a" /* functions */].password(newInput, {}, null, null, false));
        return input;
      }
    };
  });

  var hasError = function hasError(name) {
    return errors[name];
  };

  var emptyInput = function emptyInput() {
    return input === "" || input === undefined;
  };

  var renderRequirementFields = function renderRequirementFields() {
    return requirements.map(function (_ref3, key) {
      var name = _ref3.name,
          msg = _ref3.msg;
      return react_default.a.createElement("div", {
        key: "requirements-info-".concat(key)
      }, react_default.a.createElement(react_svg["a" /* default */], {
        id: name,
        src: icons.checkmarkIcon,
        className: validFields[key] ? "valid requirements-info-svg" : "requirements-info-svg"
      }), react_default.a.createElement("div", {
        className: "requirements-info"
      }, msg));
    });
  };

  return react_default.a.createElement("div", {
    className: "cmp-form-field--input-requirements" + (toggled ? " toggled" : "")
  }, react_default.a.createElement("div", {
    className: "requirements-title"
  }, header), renderRequirementFields());
};

/* harmony default export */ var components_requirements = (Object(react["forwardRef"])(requirements_Requirements));
// EXTERNAL MODULE: ./src/forms/fields/utils/validations.js
var validations = __webpack_require__(66);

// EXTERNAL MODULE: ./src/utils/labelFunctions.js
var labelFunctions = __webpack_require__(43);

// CONCATENATED MODULE: ./src/forms/fields/input.js











var input_Input = function Input(_ref) {
  var name = _ref.name,
      label = _ref.label,
      description = _ref.description,
      validation = _ref.validation,
      hasMatch = _ref.hasMatch,
      matchRef = _ref.matchRef;
  var reqRef = Object(react["useRef"])(null);
  var inputRef = Object(react["useRef"])(null);

  var _useContext = Object(react["useContext"])(useFieldApi),
      type = _useContext.type,
      disabled = _useContext.disabled,
      matchLabel = _useContext.matchLabel,
      emailValidationEndpoint = _useContext.emailValidationEndpoint,
      optionalLabel = _useContext.optionalLabel;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register,
      setError = _useContext2.setError,
      setValue = _useContext2.setValue,
      clearError = _useContext2.clearError,
      setErrorBoundaryToTrue = _useContext2.setErrorBoundaryToTrue,
      resetErrorBoundaryToFalse = _useContext2.resetErrorBoundaryToFalse,
      removeNotifications = _useContext2.removeNotifications,
      isAlreadyRegistered = _useContext2.isAlreadyRegistered;

  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var getRegisterAttributes = function getRegisterAttributes(ref) {
    inputRef.current = ref;
    return Object(validations["a" /* getAttributes */])(ref, validation, matchRef, emailValidationEndpoint, setError, clearError, setErrorBoundaryToTrue, resetErrorBoundaryToFalse, removeNotifications, setValue, name);
  };

  var getMatchName = function getMatchName() {
    return 'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1));
  };

  var toggleReq = function toggleReq() {
    return reqRef.current ? reqRef.current.toggle() : function () {
      return false;
    };
  };

  var updateReq = function updateReq() {
    switch (type) {
      case "text":
        {
          // use react-hook-form validation
          setValue(name, inputRef.current.value, true);
          break;
        }

      case "email":
        {
          if (patterns["a" /* functions */][validation.validateFnName](inputRef.current.value, inputRef.current, validation.requiredMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications, setValue, name) === false) {
            // Hide the Tick Icon as not a valid email and don't validate using react-hook-form mechanism
            hideShowValidIcon(name, true);
            clearError(name);
          } else {
            // Stop hiding the tick icon as email is now valid 
            hideShowValidIcon(name, false);
            setValue(name, inputRef.current.value, true);
          }

          break;
        }

      case "password":
        {
          if (inputRef.current.name === "currentPassword") {
            // Not the standard password validation use text validation
            setValue(name, inputRef.current.value, true);
            break;
          }

          if (inputRef.current.name === "password" || inputRef.current.name === "newPassword") {
            // password: (value, ref, setError, clearError, throwErrors=true)
            if (patterns["a" /* functions */][validation.validateFnName](inputRef.current.value, inputRef.current, setError, clearError) === false) {
              // Hide the Tick Icon as not a valid password and don't validate using react-hook-form mechanism
              hideShowValidIcon(name, true);
              clearError(name);
            } else {
              // Stop hiding the tick icon as password is now valid 
              hideShowValidIcon(name, false);
              setValue(name, inputRef.current.value, true);
            }
          }

          if (inputRef.current.name === "confirmPassword" || inputRef.current.name === "confirmNewPassword") {
            var passwordId = "password";

            if (inputRef.current.name === "confirmNewPassword") {
              passwordId = "newPassword";
            }

            var passwordControl = document.getElementById(passwordId); // matching: (value, matchRef, ref) 

            if (patterns["a" /* functions */][validation.validateFnName](inputRef.current.value, passwordControl, inputRef.current) === false) {
              // Hide the Tick Icon as not a valid confirm password and don't validate using react-hook-form mechanism
              hideShowValidIcon(name, true, 1);
              clearError(name);
            } else {
              // Stop hiding the tick icon as confirm password is now valid 
              hideShowValidIcon(name, false, 1);
              setValue(name, inputRef.current.value, true);
            }
          }

          break;
        }

      default:
        {
          break;
        }
    }

    reqRef.current ? reqRef.current.update(inputRef.current.value) : function () {
      return false;
    };
  };

  var hideShowValidIcon = function hideShowValidIcon(controlName, isHidden) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var control = document.getElementById(controlName);
    var styleString = "inline-block";

    if (isHidden) {
      styleString = "none";
    }

    if (control) {
      var mainControlDiv = control.parentElement.parentElement;

      if (mainControlDiv) {
        mainControlDiv.getElementsByClassName("valid-icon")[index].style.display = styleString;
      }
    }
  };

  var getMatchReq = Object(react["useMemo"])(function () {
    return {
      required: validation['required'],
      requiredMsg: validation.requiredMatchMsg,
      validateFnName: 'matching',
      validationMsg: validation['nonMatchingMsg'],
      maxLength: validation.maxLength
    };
  }, [name, validation]);

  var renderInput = function renderInput() {
    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("label", {
      htmlFor: name,
      className: validation.validateFnName === 'matching' ? 'cmp-form-field--label-matching' : '',
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
    }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && react_default.a.createElement("div", {
      className: "cmp-form_description"
    }, description), react_default.a.createElement("div", {
      className: "cmp-form-field--input"
    }, react_default.a.createElement("input", {
      type: type,
      name: name,
      id: name,
      ref: function ref(_ref2) {
        return register(_ref2, getRegisterAttributes(_ref2));
      },
      onBlur: toggleReq,
      onFocus: toggleReq,
      onChange: updateReq,
      placeholder: " ",
      "aria-label": name,
      disabled: disabled,
      "aria-labelledby": name,
      "aria-required": validation.required,
      className: !!errors[name] ? 'error' : !!inputRef.current ? !!inputRef.current.value ? 'valid' : '' : '',
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name) || 'form-field-input'
    }), react_default.a.createElement(components_icons, null)), react_default.a.createElement(displaymessage, {
      name: name,
      validation: validation,
      isAlreadyRegistered: isAlreadyRegistered
    }), validation.validateFnName === 'password' && validation.requirements && react_default.a.createElement(components_requirements, {
      header: validation.requirementsLabel,
      requirements: validation.requirements,
      ref: reqRef
    }));
  };

  return react_default.a.createElement(react_default.a.Fragment, null, renderInput(), hasMatch && Object(react["useMemo"])(function () {
    return react_default.a.createElement(Input, {
      name: getMatchName(),
      label: matchLabel,
      hasMatch: false,
      description: description ? 'Match for '.concat(name) : '',
      validation: getMatchReq,
      matchRef: inputRef
    });
  }, [matchLabel, description, inputRef]));
};

/* harmony default export */ var fields_input = (react_default.a.memo(input_Input));
// CONCATENATED MODULE: ./src/forms/fields/textarea.js










var textarea_TextArea = function TextArea(_ref) {
  var name = _ref.name,
      label = _ref.label,
      resize = _ref.resize,
      rows = _ref.rows,
      description = _ref.description,
      validation = _ref.validation,
      showTextInfo = _ref.showTextInfo,
      hasMatch = _ref.hasMatch,
      matchRef = _ref.matchRef;
  var reqRef = Object(react["useRef"])(null);
  var inputRef = Object(react["useRef"])(null);

  var _useState = Object(react["useState"])({
    remainingChar: validation.maxLength ? validation.maxLength.value : 0,
    maxLength: validation.maxLength ? validation.maxLength.value : 0,
    text: showTextInfo && showTextInfo.remainingMoreTextMsg ? showTextInfo.remainingMoreTextMsg : '',
    isCharOver: false
  }),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      textInfo = _useState2[0],
      setTextInfo = _useState2[1];

  var _useContext = Object(react["useContext"])(useFieldApi),
      disabled = _useContext.disabled,
      matchLabel = _useContext.matchLabel,
      emailValidationEndpoint = _useContext.emailValidationEndpoint,
      optionalLabel = _useContext.optionalLabel;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register,
      setError = _useContext2.setError,
      setValue = _useContext2.setValue,
      clearError = _useContext2.clearError;

  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var getRegisterAttributes = function getRegisterAttributes(ref) {
    inputRef.current = ref;
    return Object(validations["a" /* getAttributes */])(ref, validation, matchRef, emailValidationEndpoint, setError, clearError);
  };

  var getMatchName = function getMatchName() {
    return 'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1));
  };

  var toggleReq = function toggleReq() {
    return reqRef.current ? reqRef.current.toggle() : function () {
      return false;
    };
  };

  var updateReq = function updateReq() {
    setValue(name, inputRef.current.value, true);
    reqRef.current ? reqRef.current.update(inputRef.current.value) : function () {
      return false;
    };
  };

  var getMatchReq = Object(react["useMemo"])(function () {
    return {
      required: validation['required'],
      requiredMsg: validation.requiredMatchMsg,
      validateFnName: 'matching',
      validationMsg: validation['nonMatchingMsg'],
      maxLength: validation.maxLength
    };
  }, [name, validation]);

  var onKeyUp = function onKeyUp(event) {
    if (showTextInfo) {
      var remainingChar = textInfo.maxLength - event.target.value.length;
      var text;
      var isCharOver = false;

      if (remainingChar >= 0) {
        text = remainingChar > 1 ? showTextInfo.remainingMoreTextMsg : showTextInfo.remainingOneTextMsg;
      } else {
        text = Math.abs(remainingChar) > 1 ? showTextInfo.overMoreTextMsg : showTextInfo.overOneTextMsg;
        isCharOver = true;
      }

      setTextInfo(function (prevState) {
        return Object(objectSpread["a" /* default */])({}, prevState, {
          remainingChar: Math.abs(remainingChar),
          text: text,
          isCharOver: isCharOver
        });
      });
    }
  };

  var renderTextArea = function renderTextArea() {
    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("label", {
      htmlFor: name,
      className: validation.validateFnName === 'matching' ? 'cmp-form-field--label-matching' : '',
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
    }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && react_default.a.createElement("div", {
      className: "cmp-form_description"
    }, description), react_default.a.createElement("div", {
      className: "cmp-form-field--textarea"
    }, react_default.a.createElement("textarea", {
      name: name,
      id: name,
      ref: function ref(_ref2) {
        return register(_ref2, getRegisterAttributes(_ref2));
      },
      onBlur: toggleReq,
      onFocus: toggleReq,
      onChange: updateReq,
      onKeyUp: onKeyUp,
      placeholder: " ",
      disabled: disabled,
      "aria-labelledby": name,
      "aria-required": validation.required,
      resize: resize,
      rows: rows,
      className: !!errors[name] ? "error ".concat(resize ? '' : 'disable-resize') : !!inputRef.current ? !!inputRef.current.value ? "valid ".concat(resize ? '' : 'disable-resize') : "".concat(resize ? '' : 'disable-resize') : "".concat(resize ? '' : 'disable-resize'),
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name) || 'form-field-textarea'
    })), react_default.a.createElement("div", {
      className: "textarea-info"
    }, react_default.a.createElement(displaymessage, {
      name: name,
      validation: validation
    }), showTextInfo && react_default.a.createElement("div", {
      "data-locator": "text-info",
      className: "text-info ".concat(textInfo.isCharOver ? 'errorText' : '')
    }, "".concat(textInfo.remainingChar, " ").concat(textInfo.text))));
  };

  return react_default.a.createElement(react_default.a.Fragment, null, renderTextArea(), hasMatch && Object(react["useMemo"])(function () {
    return react_default.a.createElement(TextArea, {
      name: getMatchName(),
      label: matchLabel,
      hasMatch: false,
      description: description ? 'Match for '.concat(name) : '',
      validation: getMatchReq,
      matchRef: inputRef
    });
  }, [matchLabel, description, inputRef]));
};

/* harmony default export */ var fields_textarea = (react_default.a.memo(textarea_TextArea));
// CONCATENATED MODULE: ./src/forms/fields/checkboxOrRadio.js












var checkboxOrRadio_CheckboxOrRadio = function CheckboxOrRadio(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      name = _useContext.name,
      label = _useContext.label,
      options = _useContext.options,
      disabled = _useContext.disabled,
      icons = _useContext.icons,
      config = _useContext.config,
      validation = _useContext.validation,
      type = _useContext.type,
      description = _useContext.description,
      initialState = _useContext.initialState,
      optionalLabel = _useContext.optionalLabel;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register,
      setValue = _useContext2.setValue;

  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var _useState = Object(react["useState"])(function () {
    if (!options) {
      return Object(defineProperty["a" /* default */])({}, name, Object(objectSpread["a" /* default */])({
        isChecked: initialState,
        required: validation && validation.required ? true : false,
        description: description ? description : ''
      }, config));
    } else {
      var defaultOptions = options.map(function (option, i) {
        var thisOption = Object(defineProperty["a" /* default */])({}, option.name, Object(objectSpread["a" /* default */])({
          isChecked: false,
          required: validation && validation.validateFnName && option.required ? true : false,
          description: option.description ? option.description : ''
        }, option.config));

        return thisOption;
      });
      return Object.assign.apply(Object, [{}].concat(Object(toConsumableArray["a" /* default */])(defaultOptions)));
    }
  }),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var checkHandler = function checkHandler(event, thisName) {
    if (!disabled) {
      var thisState = state[thisName];

      if (config.getRadioOptions && options) {
        for (var _i = 0, _Object$keys = Object.keys(state); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];

          if (key === thisName) {
            state[key].isChecked = true;
          } else {
            state[key].isChecked = false;
          }

          setValue(key, state[key].isChecked, state[key].required);
        }

        setState(Object(objectSpread["a" /* default */])({}, state)); // Non Mobile has Link Wrapper

        var submitControlArrayLength = document.getElementsByClassName("cmp-button").length;

        if (submitControlArrayLength > 0) {
          document.getElementsByClassName("cmp-button")[submitControlArrayLength - 1].classList.remove("cmp-button--disabled");
          document.getElementsByClassName("cmp-button")[submitControlArrayLength - 1].disabled = false;
        }

        return;
      }

      setValue(thisName, !thisState.isChecked, thisState.required);
      setState(Object(objectSpread["a" /* default */])({}, state, Object(defineProperty["a" /* default */])({}, thisName, Object(objectSpread["a" /* default */])({}, thisState, {
        isChecked: !thisState.isChecked
      }))));
    }
  };

  var hasError = Object(react["useCallback"])(function (name) {
    return !!errors[name];
  }, [errors]);

  var renderLabel = function renderLabel(thisName, lbl) {
    var formattedLabel = lbl; // If a check Box and required add required indicator to label

    if (state[thisName].required && type !== 'radio') {
      formattedLabel = Object(labelFunctions["b" /* renderFormattedLabelText */])(label, true);
    }

    return react_default.a.createElement(react_default.a.Fragment, null, formattedLabel + ' ', renderAddOnLink(thisName), !state[thisName].required && type !== 'radio' && optionalLabel && react_default.a.createElement("span", {
      className: "cmp-form-field--optional"
    }, optionalLabel));
  };

  var renderAddOnLink = function renderAddOnLink(thisName) {
    var thisState = state[thisName];
    return thisState.text && thisState.link && thisState.blank && react_default.a.createElement("a", {
      href: thisState.link,
      target: thisState ? '_blank' : '',
      rel: "noopener noreferrer",
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(thisState.text || 'add-on-link')
    }, thisState.text);
  };

  var renderType = function renderType(thisName, label) {
    var thisState = state[thisName];
    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("input", {
      type: type,
      role: type,
      name: thisName,
      id: thisName,
      "aria-labelledby": thisName,
      disabled: disabled,
      "aria-disabled": disabled ? true : false,
      checked: thisState.isChecked,
      "aria-checked": thisState.isChecked,
      "aria-required": thisState.required,
      className: hasError(thisName) ? 'error' : 'valid',
      ref: register(thisState.required ? {
        required: true
      } : {}),
      readOnly: true,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(thisName || 'input-type')
    }), react_default.a.createElement("a", {
      className: "".concat(type, " ") + (disabled ? ' disabled' : '') + (hasError(thisName) ? ' error' : ' valid'),
      onClick: function onClick(e) {
        return checkHandler(e, thisName);
      },
      id: thisName + '_link'
    }, type == 'checkbox' ? react_default.a.createElement(react_svg["a" /* default */], {
      src: icons.checkmarkIcon
    }) : react_default.a.createElement("div", {
      className: "selector"
    })), react_default.a.createElement("div", {
      className: "cmp-form-field-".concat(type, "--wrapper") + (disabled ? ' disabled' : '')
    }, react_default.a.createElement("label", {
      htmlFor: thisName,
      onClick: function onClick(e) {
        return checkHandler(e, thisName);
      }
    }, renderLabel(thisName, label)), thisState.description && react_default.a.createElement("span", {
      "class": "cmp-form_description"
    }, thisState.description)));
  };

  try {
    return !options ? renderType(name, label) : react_default.a.createElement("div", {
      id: name,
      className: "cmp-form-field-".concat(type, "--grouping")
    }, options.map(function (option, i) {
      var address = [];
      option.address.map(function (addressPiece) {
        address.push(react_default.a.createElement("div", {
          className: "cmp-form-field-".concat(type, "--address1")
        }, addressPiece));
      });
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        style: {
          paddingTop: "10px"
        },
        className: "cmp-form-field-".concat(type, "--grouping-item"),
        key: "".concat(type, "-").concat(name, "-grouping-").concat(i)
      }, renderType(option.name, option.label)), address);
    }));
  } catch (error) {
    console.log("error ", error);
  }
};

/* harmony default export */ var checkboxOrRadio = (react_default.a.memo(checkboxOrRadio_CheckboxOrRadio));
// EXTERNAL MODULE: ./src/styles/variables.scss
var variables = __webpack_require__(26);
var variables_default = /*#__PURE__*/__webpack_require__.n(variables);

// CONCATENATED MODULE: ./src/forms/fields/styles/dropdown.scss.js


/* harmony default export */ var dropdown_scss = ({
  indicatorSeparator: function indicatorSeparator() {
    return {
      display: "none"
    };
  },
  option: function option(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      color: variables_default.a.colorGray50,
      padding: '0.75em 1em',
      backgroundColor: state.isSelected ? variables_default.a.colorBackgroundLight : variables_default.a.colorWhite,
      cursor: !state.isSelected ? "pointer" : "default",
      "&:hover": {
        color: !state.isSelected ? variables_default.a.colorBlue50 : variables_default.a.colorGray50,
        backgroundColor: !state.isSelected ? variables_default.a.colorWhite : variables_default.a.colorBackgroundLight
      },
      margin: 0
    });
  },
  control: function control(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      "border-radius": variables_default.a.borderRadius,
      padding: "0.3em 0.5em",
      color: variables_default.a.colorGray50,
      "border-color": state.isFocused ? variables_default.a.colorBorderDark : variables_default.a.colorBorderDark,
      outline: "none",
      cursor: "pointer",
      "box-shadow": "none",
      "&:hover": {
        outline: "none",
        color: variables_default.a.colorBlue50,
        borderColor: variables_default.a.colorBlue50
      }
    });
  },
  singleValue: function singleValue(provided, state) {
    return {};
  },
  menu: function menu(provided) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      marginTop: 0,
      borderRadius: 0,
      width: "calc(100% - 2px)",
      marginLeft: "1px",
      marginBottom: 0,
      padding: 0
    });
  },
  menuList: function menuList(provided) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      paddingBottom: 0,
      paddingTop: 0
    });
  }
});
// CONCATENATED MODULE: ./src/forms/fields/components/select.js







var select_DropdownIndicator = function DropdownIndicator(props) {
  return react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.theme.dropdownIndicator
  }));
};

var select_Select = function Select(props) {
  var _useContext = Object(react["useContext"])(useFieldApi),
      name = _useContext.name,
      options = _useContext.options,
      dropdownIndicator = _useContext.dropdownIndicator,
      placeholder = _useContext.placeholder,
      disabled = _useContext.disabled;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      triggerValidation = _useContext2.triggerValidation,
      setValue = _useContext2.setValue,
      getValue = _useContext2.getValue,
      activateField = _useContext2.activateField,
      deactivateField = _useContext2.deactivateField,
      setCountrySaved = _useContext2.setCountrySaved,
      regionalConfig = _useContext2.regionalConfig;

  var _useState = Object(react["useState"])(getValue(name) ? getValue(name).toLowerCase() : props.defaultValue || ""),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      selectedValue = _useState2[0],
      setSelectedValue = _useState2[1];

  var setupOptions = function setupOptions(label, value) {
    return {
      label: label,
      value: value
    };
  };

  var getOptions = function getOptions() {
    switch (name) {
      case "country":
        return options.map(function (val) {
          return setupOptions(val.displayName, val.countryCode);
        });

      case "state":
        return options.map(function (val) {
          return setupOptions(val.displayName, val.stateCode);
        });

      case "namePrefix":
        return options.map(function (val) {
          return setupOptions(val.displayName, val.namePrefixCode);
        });

      default:
        return options.map(function (val) {
          return setupOptions(val.label, val.value);
        });
    }
  };

  var handleChange = function handleChange(option) {
    setSelectedValue(option.value);
    setValue(name, option.value, true);

    if (name === "country") {
      // Check if any Form Elements need hiding or displaying
      // Get Regional config 
      var countryOptionsConfig = regionalConfig; // Hide all country configurable fields

      var allCountryOptions = countryOptionsConfig.filter(function (p) {
        return p.country === "all";
      });

      if (allCountryOptions.length === 1) {
        allCountryOptions[0].fields.map(function (fieldName) {
          return deactivateField(fieldName);
        });
      } // Display Specific fields for the selected country


      var selectedCountryOptions = countryOptionsConfig.filter(function (p) {
        return p.country === option.value;
      });

      if (selectedCountryOptions.length === 1) {
        selectedCountryOptions[0].fields.map(function (fieldName) {
          return activateField(fieldName);
        });
      } // Update Country Code in State


      setCountrySaved(option.value);
    }
  };

  return react_default.a.createElement(react_select_esm["c" /* default */], Object.assign({}, props, {
    options: getOptions(),
    isDisabled: disabled,
    isSearchable: true,
    styles: dropdown_scss,
    placeholder: placeholder,
    classNamePrefix: "cmp-custom-dropdown",
    components: {
      DropdownIndicator: select_DropdownIndicator
    },
    theme: {
      dropdownIndicator: dropdownIndicator
    },
    filterOption: Object(react_select_esm["b" /* createFilter */])({
      ignoreCase: true,
      trim: true,
      matchFrom: "start"
    }),
    onBlur: function onBlur() {
      return triggerValidation({
        name: name
      });
    },
    onChange: handleChange,
    value: getOptions().filter(function (o) {
      return o.value === selectedValue;
    })
  }));
};

/* harmony default export */ var components_select = (react_default.a.memo(select_Select));
// CONCATENATED MODULE: ./src/forms/fields/dropdown.js









var dropdown_Dropdown = function Dropdown(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      name = _useContext.name,
      label = _useContext.label,
      defaultValue = _useContext.defaultValue,
      validation = _useContext.validation,
      optionalLabel = _useContext.optionalLabel;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register;

  var newLabel = Object(labelFunctions["b" /* renderFormattedLabelText */])(label, validation.required, optionalLabel);
  return react_default.a.createElement("div", {
    className: "cmp-form-field-dropdown--wrapper"
  }, react_default.a.createElement("label", {
    htmlFor: name,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(name, " label"))
  }, newLabel), react_default.a.createElement("div", {
    className: "cmp-form-field-dropdown--wrapper",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name) || 'form-field-dropdown',
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, react_default.a.createElement(components_select, {
    name: name,
    defaultValue: defaultValue,
    ref: register({
      name: name
    }, validation),
    id: name,
    tabIndex: "-1",
    "aria-label": name
  }), react_default.a.createElement(components_icons, null)), react_default.a.createElement(displaymessage, {
    name: name,
    validation: validation
  }));
};

/* harmony default export */ var fields_dropdown = (react_default.a.memo(dropdown_Dropdown));
// CONCATENATED MODULE: ./src/forms/fields/hr.js


var hr_Hr = function Hr(_ref) {
  var addClass = _ref.addClass;
  return react_default.a.createElement("hr", {
    className: addClass
  });
};

/* harmony default export */ var hr = (react_default.a.memo(hr_Hr));
// EXTERNAL MODULE: ./node_modules/react-google-recaptcha/lib/esm/index.js + 3 modules
var esm = __webpack_require__(133);

// CONCATENATED MODULE: ./src/forms/fields/captcha.js






var captcha_Captcha = function Captcha(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      siteKey = _useContext.siteKey,
      name = _useContext.name,
      isocode = _useContext.isocode,
      validation = _useContext.validation;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register,
      setValue = _useContext2.setValue;

  var onChange = function onChange(value) {
    setValue(name, value, true);
  };

  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(esm["a" /* default */], {
    sitekey: siteKey,
    onChange: onChange,
    ref: register({
      name: name
    }, {
      required: validation.required
    }),
    hl: isocode,
    "data-locator": "captcha"
  }), react_default.a.createElement(displaymessage, {
    name: name,
    validation: validation
  }));
};

/* harmony default export */ var captcha = (react_default.a.memo(captcha_Captcha));
// CONCATENATED MODULE: ./src/forms/fields/body.js



var body_Body = function Body(_ref) {
  var text = _ref.text,
      additionalText = _ref.additionalText;
  var displayAdditionalText;

  if (typeof additionalText === 'string') {
    getAdditionalText = additionalText;
  } else if (additionalText) {
    if (additionalText.query) {
      displayAdditionalText = Object(query_string["parse"])(window.location.search)[additionalText.query];
    }
  }

  return react_default.a.createElement("div", null, text, displayAdditionalText && react_default.a.createElement("span", {
    className: "cmp-form__additionalText"
  }, displayAdditionalText));
};

/* harmony default export */ var fields_body = (body_Body);
// CONCATENATED MODULE: ./src/forms/fields/link.js





var link_Link = function Link(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      type = _useContext.type,
      name = _useContext.name,
      text = _useContext.text,
      link = _useContext.link,
      blank = _useContext.blank,
      addClass = _useContext.addClass;

  return react_default.a.createElement(react_default.a.Fragment, null, text && link && react_default.a.createElement("div", {
    className: "cmp-form-field-".concat(type, "--").concat(name, " ") + (addClass ? addClass : '')
  }, react_default.a.createElement("a", {
    href: link,
    target: blank ? "_blank" : "",
    rel: "noopener noreferrer",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(text)
  }, text)));
};

/* harmony default export */ var fields_link = (link_Link);
// CONCATENATED MODULE: ./src/forms/fields/textWithLinks.js






var textWithLinks_TextWithLinks = function TextWithLinks(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      type = _useContext.type,
      name = _useContext.name,
      config = _useContext.config,
      addClass = _useContext.addClass;

  var renderLink = function renderLink(_ref2) {
    var label = _ref2.label,
        url = _ref2.url,
        blank = _ref2.blank,
        className = _ref2.className,
        title = _ref2.title,
        id = _ref2.id;
    return react_default.a.createElement("a", {
      href: url,
      target: blank ? "_blank" : "",
      rel: "noopener noreferrer",
      className: className,
      id: id,
      title: title,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label)
    }, label);
  };

  var renderText = function renderText(_ref3) {
    var text = _ref3.text;
    return text;
  };

  return react_default.a.createElement(react_default.a.Fragment, null, config.length > 0 && react_default.a.createElement("div", {
    className: "cmp-form-field-".concat(type, "--").concat(name, " ") + (addClass ? addClass : '')
  }, config.map(function (block, index) {
    var itemToRender = block.type === "link" ? renderLink(Object(objectSpread["a" /* default */])({}, block, {
      className: block.className || '',
      title: block.title || '',
      id: block.id || "text-with-link-".concat(index)
    })) : renderText(block);
    var space = "";

    if (block.rightSpace !== "false" || typeof block.rightSpace == "undefined") {
      space = " ";
    }

    return react_default.a.createElement(react_default.a.Fragment, {
      key: index
    }, itemToRender, space);
  })));
};

/* harmony default export */ var textWithLinks = (textWithLinks_TextWithLinks);
// CONCATENATED MODULE: ./src/forms/fields/label.js


var label_Label = function Label(_ref) {
  var addClass = _ref.addClass,
      label = _ref.label,
      _ref$htmlFor = _ref.htmlFor,
      htmlFor = _ref$htmlFor === void 0 ? "" : _ref$htmlFor;
  return react_default.a.createElement("label", {
    className: addClass,
    htmlFor: htmlFor
  }, label);
};

/* harmony default export */ var fields_label = (react_default.a.memo(label_Label));
// EXTERNAL MODULE: ./src/forms/fields/utils/fileAttachment.js
var fileAttachment = __webpack_require__(60);

// CONCATENATED MODULE: ./src/forms/fields/components/file-error-notification/index.js



var file_error_notification_Notification = function Notification(_ref) {
  var className = _ref.className,
      variation = _ref.variation,
      type = _ref.type,
      title = _ref.title,
      description = _ref.description,
      link = _ref.link,
      linkText = _ref.linkText,
      icon = _ref.icon,
      elementLocator = _ref.elementLocator;
  return react_default.a.createElement("div", {
    className: "file-error-notification ".concat(variation, " ").concat(type, " ").concat(className),
    "data-locator": elementLocator
  }, icon && react_default.a.createElement(react_svg["a" /* default */], {
    className: "icon",
    src: icon,
    "data-locator": "".concat(elementLocator, "-icon"),
    "aria-hidden": true
  }), react_default.a.createElement("div", null, title && react_default.a.createElement("span", {
    className: "title",
    "data-locator": elementLocator && "".concat(elementLocator, "-title"),
    "aria-label": title
  }, title), description && react_default.a.createElement("span", {
    className: "description",
    "data-locator": elementLocator && "".concat(elementLocator, "-description"),
    "aria-label": description
  }, description), linkText && react_default.a.createElement("a", Object.assign({}, link, {
    elementLocator: elementLocator && "".concat(elementLocator, "-link-text"),
    "aria-label": linkText
  }), linkText)));
};

file_error_notification_Notification.defaultProps = {
  className: '',
  variation: '',
  type: '',
  title: '',
  description: '',
  icon: '',
  linkText: '',
  link: {},
  elementLocator: ''
};
/* harmony default export */ var file_error_notification = (file_error_notification_Notification);
// CONCATENATED MODULE: ./src/forms/fields/components/divider/index.js


function Divider(props) {
  var type = props.type,
      className = props.className,
      elementLocator = props.elementLocator;
  return react_default.a.createElement("div", {
    className: "".concat(type, " ").concat(className),
    "data-locator": elementLocator || "divider-".concat(type)
  });
}

Divider.defaultProps = {
  className: '',
  type: 'v-large',
  elementLocator: ''
};
/* harmony default export */ var divider = (Divider);
// CONCATENATED MODULE: ./src/forms/fields/components/file-upload/index.js








function FileUpload(props) {
  var name = props.name,
      setRef = props.setRef,
      clearError = props.clearError,
      className = props.className,
      icons = props.icons,
      chooseAFileToUpload = props.chooseAFileToUpload,
      removeTextLabel = props.removeTextLabel,
      attachmentFileValidMsg = props.attachmentFileValidMsg,
      attachmentFileInvalidValidMsg = props.attachmentFileInvalidValidMsg,
      accept = props.accept,
      fileTypePattern = props.fileTypePattern,
      attachmentFileSize = props.attachmentFileSize,
      attachmentFileSizeErrorMsg = props.attachmentFileSizeErrorMsg,
      maxAttachmentFileNameSizeWithExt = props.maxAttachmentFileNameSizeWithExt,
      attachmentFileNameLengthErrorMsg = props.attachmentFileNameLengthErrorMsg,
      attachmentFileNameErrorMsg = props.attachmentFileNameErrorMsg;
  var upload = icons.upload,
      preview = icons.preview,
      valid = icons.valid,
      invalid = icons.invalid;

  var _useState = Object(react["useState"])(''),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];

  var _useState3 = Object(react["useState"])(false),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      hasError = _useState4[0],
      setHasError = _useState4[1];

  var _useState5 = Object(react["useState"])(''),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      errorMsg = _useState6[0],
      setErrorMsg = _useState6[1];

  function pickedHandler(files) {
    var pickedFile = {};
    var fileValidation = {};
    var fileType = new RegExp(fileTypePattern, 'i');
    var labels = {
      attachmentFileSizeErrorMsg: attachmentFileSizeErrorMsg,
      attachmentFileNameLengthErrorMsg: attachmentFileNameLengthErrorMsg,
      attachmentFileNameErrorMsg: attachmentFileNameErrorMsg
    };
    var config = {
      maxAttachmentFileNameSizeWithExt: maxAttachmentFileNameSizeWithExt,
      attachmentFileSize: attachmentFileSize
    };

    if (files && files.length === 1) {
      var fileObj = files[0];
      fileValidation = Object(fileAttachment["c" /* validateUploadFile */])(fileObj, labels, config);

      if (!fileType.test(fileObj.name)) {
        setHasError(true);
        setErrorMsg(attachmentFileInvalidValidMsg);
      } else if (fileValidation.status) {
        setHasError(true);
        setErrorMsg(fileValidation.error);
      } else {
        setHasError(false);
        clearError(name);
        setErrorMsg('');
      }

      pickedFile = fileObj;
      setFile(pickedFile);
    }

    if (fileType.test(pickedFile.name) && !fileValidation.status) {
      clearError(name);
      setHasError(false);
    }
  }

  function handleLinkClick(e) {
    e.preventDefault();
    var fileInput = document.getElementById(name);

    if (fileInput && document.createEvent) {
      fileInput.click();
    }
  }

  function resetFile(e) {
    e.preventDefault();
    var fileInput = document.getElementById(name);
    setFile();

    if (fileInput) {
      fileInput.value = '';
    }

    clearError(name);
  }

  return react_default.a.createElement("div", {
    className: "file-empty file-upload-input ".concat(className, " ").concat(file ? 'has-file' : '')
  }, react_default.a.createElement(components_Input_Input, {
    showLabel: false,
    id: name,
    name: name,
    className: "file-input",
    type: "file",
    accept: accept,
    onChange: pickedHandler,
    setRef: setRef
  }), react_default.a.createElement("div", {
    className: "select-file",
    style: file ? {
      display: 'none'
    } : null
  }, react_default.a.createElement("a", {
    className: "file-upload-link",
    onClick: handleLinkClick,
    "data-locator": "upload-link-".concat(name),
    "aria-label": chooseAFileToUpload,
    role: "button",
    href: ""
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: upload,
    wrapper: "span",
    "data-locator": "icon-".concat(name),
    "aria-hidden": true
  }), "".concat(chooseAFileToUpload, " (").concat(accept, ")"))), file && react_default.a.createElement("div", {
    className: "file-upload__preview"
  }, react_default.a.createElement("div", {
    className: "file-info-sec"
  }, react_default.a.createElement("div", {
    className: "file-view"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    className: "file-svg",
    src: preview,
    "data-locator": "file-svg",
    "aria-hidden": true
  }), react_default.a.createElement("span", {
    "data-locator": "file-name-added",
    "aria-label": file.name
  }, file.name), react_default.a.createElement(divider, {
    type: "v-small"
  }), react_default.a.createElement("a", {
    className: "file-remove-link",
    onClick: resetFile,
    elementLocator: "file-remove-link",
    "aria-label": removeTextLabel,
    role: "button",
    href: ""
  }, removeTextLabel)), react_default.a.createElement("div", {
    className: "file-notify-sec"
  }, react_default.a.createElement("div", {
    className: "notify-container"
  }, !hasError && react_default.a.createElement(file_error_notification, {
    variation: "inline",
    className: "file-notify",
    type: "success",
    description: attachmentFileValidMsg,
    icon: valid,
    elementLocator: "file-format-verified"
  }), hasError && react_default.a.createElement(file_error_notification, {
    variation: "inline",
    className: "file-notify",
    type: "error",
    description: errorMsg,
    icon: invalid
  }))))));
}

;
FileUpload.defaultProps = {
  className: '',
  name: 'fileUploadInput',
  setRef: function setRef() {},
  clearError: function clearError() {},
  icons: {
    upload: '',
    preview: '',
    valid: '',
    invalid: ''
  },
  chooseAFileToUpload: '',
  removeTextLabel: '',
  attachmentFileValidMsg: '',
  attachmentFileInvalidValidMsg: '',
  attachmentFileSize: '5MB',
  attachmentFileSizeErrorMsg: '',
  maxAttachmentFileNameSizeWithExt: 32,
  attachmentFileNameLengthErrorMsg: '',
  attachmentFileNameErrorMsg: '',
  accept: '.pdf, .jpg, .png',
  fileTypePattern: '(\\.pdf|\.jpg|\.png)$'
};
/* harmony default export */ var file_upload = (FileUpload);
// CONCATENATED MODULE: ./src/forms/fields/file.js







function File(props) {
  var name = props.name,
      label = props.label,
      optionalLabel = props.optionalLabel,
      chooseAFileToUpload = props.chooseAFileToUpload,
      removeTextLabel = props.removeTextLabel,
      accept = props.accept,
      attachmentFileValidMsg = props.attachmentFileValidMsg,
      attachmentFileInvalidValidMsg = props.attachmentFileInvalidValidMsg,
      attachmentFileSize = props.attachmentFileSize,
      attachmentFileSizeErrorMsg = props.attachmentFileSizeErrorMsg,
      maxAttachmentFileNameSizeWithExt = props.maxAttachmentFileNameSizeWithExt,
      attachmentFileNameLengthErrorMsg = props.attachmentFileNameLengthErrorMsg,
      attachmentFileNameErrorMsg = props.attachmentFileNameErrorMsg,
      validation = props.validation,
      icons = props.icons,
      description = props.description,
      matchRef = props.matchRef;
  var inputRef = Object(react["useRef"])(null);

  var _useContext = Object(react["useContext"])(useFieldApi),
      emailValidationEndpoint = _useContext.emailValidationEndpoint;

  var _useContext2 = Object(react["useContext"])(useFormApi),
      register = _useContext2.register,
      setError = _useContext2.setError,
      clearError = _useContext2.clearError; // e.g. (\.pdf|\.jpg|\.png)$


  var fileTypePattern = "(\\".concat(accept.replace(/[,]/g, '|\\').replace(/\s+/g, ''), ")$");
  validation.fileTypePattern = fileTypePattern;
  validation.attachmentFileSize = attachmentFileSize;
  validation.maxAttachmentFileNameSizeWithExt = maxAttachmentFileNameSizeWithExt;
  validation.attachmentFileInvalidValidMsg = attachmentFileInvalidValidMsg;
  validation.attachmentFileSizeErrorMsg = attachmentFileSizeErrorMsg;
  validation.attachmentFileNameLengthErrorMsg = attachmentFileNameLengthErrorMsg;
  validation.attachmentFileNameErrorMsg = attachmentFileNameErrorMsg;

  var getRegisterAttributes = function getRegisterAttributes(ref) {
    inputRef.current = ref;
    return Object(validations["a" /* getAttributes */])(ref, validation, matchRef, emailValidationEndpoint, setError, clearError);
  };

  function setRef(ref) {
    register(ref, getRegisterAttributes(ref));
  }

  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("label", {
    htmlFor: name,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
  }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && react_default.a.createElement("div", {
    className: "cmp-form_description"
  }, description), react_default.a.createElement("div", {
    className: "cmp-form-field file-upload-container"
  }, react_default.a.createElement(file_upload, {
    name: name,
    setRef: setRef,
    setError: setError,
    clearError: clearError,
    icons: icons,
    chooseAFileToUpload: chooseAFileToUpload,
    removeTextLabel: removeTextLabel,
    attachmentFileValidMsg: attachmentFileValidMsg,
    attachmentFileInvalidValidMsg: attachmentFileInvalidValidMsg,
    attachmentFileSize: attachmentFileSize,
    attachmentFileSizeErrorMsg: attachmentFileSizeErrorMsg,
    maxAttachmentFileNameSizeWithExt: maxAttachmentFileNameSizeWithExt,
    attachmentFileNameLengthErrorMsg: attachmentFileNameLengthErrorMsg,
    attachmentFileNameErrorMsg: attachmentFileNameErrorMsg,
    accept: accept,
    fileTypePattern: fileTypePattern
  })));
}

File.defaultProps = {
  name: '',
  icons: {},
  chooseAFileToUpload: '',
  removeTextLabel: '',
  attachmentFileValidMsg: '',
  attachmentFileInvalidValidMsg: '',
  attachmentFileSize: '5MB',
  attachmentFileSizeErrorMsg: '',
  maxAttachmentFileNameSizeWithExt: 32,
  attachmentFileNameLengthErrorMsg: '',
  attachmentFileNameErrorMsg: '',
  accept: '',
  validation: {},
  label: '',
  optionalLabel: '',
  description: ''
};
/* harmony default export */ var fields_file = (File);
// CONCATENATED MODULE: ./src/forms/fields/index.js















var formType = {
  text: fields_input,
  textarea: fields_textarea,
  number: fields_input,
  password: fields_input,
  email: fields_input,
  radio: checkboxOrRadio,
  checkbox: checkboxOrRadio,
  dropdown: fields_dropdown,
  select: fields_dropdown,
  "break": hr,
  captcha: captcha,
  body: fields_body,
  link: fields_link,
  textwithlinks: textWithLinks,
  label: fields_label,
  file: fields_file
};

var fields_Field = function Field(_ref) {
  Object(objectDestructuringEmpty["a" /* default */])(_ref);

  var _useContext = Object(react["useContext"])(useFieldApi),
      type = _useContext.type,
      name = _useContext.name,
      hasMatch = _useContext.hasMatch,
      field = _useContext.field;

  var Component = formType[type];

  var getMatchName = function getMatchName() {
    return name ? 'confirm'.concat(name.charAt(0).toUpperCase() + name.slice(1)) : '';
  };

  return Component && field.active !== false && react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(field_validation_display, {
    name: name,
    matchName: hasMatch ? getMatchName() : ''
  }, react_default.a.createElement(Component, field)));
};

/* harmony default export */ var forms_fields = (react_default.a.memo(fields_Field));
// EXTERNAL MODULE: ./src/my-account/services/SoldToDetailsLazy.js + 1 modules
var SoldToDetailsLazy = __webpack_require__(62);

// CONCATENATED MODULE: ./src/forms/form.js


















var FormApi = Object(react["createContext"])(null);
FormApi.displayName = 'FormApi';
var FieldApi = Object(react["createContext"])(null);
FieldApi.displayName = 'FieldApi';

var form_Form = function Form(_ref) {
  var config = _ref.config,
      submitFn = _ref.submitFn,
      cancelFn = _ref.cancelFn,
      isocode = _ref.isocode,
      setErrorBoundaryToTrue = _ref.setErrorBoundaryToTrue,
      resetErrorBoundaryToFalse = _ref.resetErrorBoundaryToFalse,
      removeNotifications = _ref.removeNotifications,
      defaultValues = _ref.defaultValues,
      callback = _ref.callback,
      setProfileData = _ref.setProfileData;

  if (defaultValues) {
    defaultValues.communications = defaultValues.communications === 'true' || defaultValues.communications === true ? true : false;
  }

  var _useForm = react_hook_form_ie11_default()({
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
    defaultValues: Object(objectSpread["a" /* default */])({
      country: DigitalData["a" /* default */]["default"]
    }, defaultValues)
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      errors = _useForm.errors,
      formState = _useForm.formState,
      setValue = _useForm.setValue,
      setError = _useForm.setError,
      clearError = _useForm.clearError,
      triggerValidation = _useForm.triggerValidation,
      getValues = _useForm.getValues,
      reset = _useForm.reset;

  var checkIfDisabled = function checkIfDisabled() {
    var requiredFields = config.fields.filter(function (field) {
      return 'validation' in field && field.validation.required === true && ('active' in field ? field.active === true : true);
    });
    var values = getValues();
    var emptyRequiredFields = requiredFields.filter(function (field) {
      return values[field.name] === "" || values[field.name] === false || values[field.name] === null || values[field.name] === undefined;
    });
    var isConfirmPasswordFieldEmpty = 'confirmPassword' in values ? values['confirmPassword'] === "" : false;
    return emptyRequiredFields.length !== 0 || isConfirmPasswordFieldEmpty || Object.keys(errors).length > 0;
  };

  var cancelHandler = function cancelHandler(clear) {
    if (defaultValues) {
      reset(Object(objectSpread["a" /* default */])({
        country: DigitalData["a" /* default */]["default"]
      }, defaultValues));
    } else {
      reset({});
    }

    cancelFn();
  };

  var _useState = Object(react["useState"])({}),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      errorUpdates = _useState2[0],
      setUpdate = _useState2[1];

  var _useState3 = Object(react["useState"])(1),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      failedAttempts = _useState4[0],
      setFailedAttempts = _useState4[1];

  var _useState5 = Object(react["useState"])(),
      _useState6 = Object(slicedToArray["a" /* default */])(_useState5, 2),
      countrySaved = _useState6[0],
      setCountrySaved = _useState6[1];

  var regionalConfig = config.regionalConfig;

  var _useState7 = Object(react["useState"])(false),
      _useState8 = Object(slicedToArray["a" /* default */])(_useState7, 2),
      displayForm = _useState8[0],
      setDisplayForm = _useState8[1];

  var _useState9 = Object(react["useState"])(document.getElementById("header").hasAttribute("data-is-edit-mode")),
      _useState10 = Object(slicedToArray["a" /* default */])(_useState9, 2),
      isInEditMode = _useState10[0],
      setIsInEditMode = _useState10[1];

  var _useState11 = Object(react["useState"])(false),
      _useState12 = Object(slicedToArray["a" /* default */])(_useState11, 2),
      isAlreadyRegistered = _useState12[0],
      setIsAlreadyRegistered = _useState12[1];

  var captchaField = config.fields.filter(function (field) {
    return field.type === 'captcha';
  })[0];
  var captchaFailedAttempts = captchaField && captchaField.failedAttempts ? captchaField.failedAttempts : 0;

  var updateFailedAttempts = function updateFailedAttempts(formName) {
    if (formName === 'signin') {
      setFailedAttempts(function (failedAttempts) {
        return failedAttempts + 1;
      });

      if (captchaFailedAttempts && failedAttempts === captchaFailedAttempts) {
        activateField('captcha');
      }
    }
  };

  var activateField = function activateField(inputName) {
    var fields = config.fields.map(function (field) {
      if (field.type === inputName || field.name === inputName) {
        field.active = true;
      }

      return field;
    });
    config.fields = Object(toConsumableArray["a" /* default */])(fields);
  };

  var deactivateField = function deactivateField(inputName) {
    var fields = config.fields.map(function (field) {
      if (field.name === inputName) {
        field.active = false;
      }

      return field;
    });
    config.fields = Object(toConsumableArray["a" /* default */])(fields);
  }; // Hook to check the user's Authentication Status and redirect if needed


  Object(react["useEffect"])(function () {
    if (!isInEditMode) {
      var needsToBeSignedOut = config.needsToBeSignedOut;

      if (needsToBeSignedOut) {
        if (loginStatus["a" /* default */].state()) {
          Object(redirectFunctions["b" /* homePageRedirect */])();
          return null;
        }
      }

      setDisplayForm(true);
    }
  }, []); // Hook to add error styles if there are errors on Submitting

  Object(react["useEffect"])(function () {
    if (Object.keys(errors).length !== 0) {
      for (var name in errors) {
        if (errors.hasOwnProperty(name)) {
          if (name !== "captcha") {
            if (name === "alreadyRegistered") {
              setIsAlreadyRegistered(true);
            } // If alreadyRegistered error is already set no need to change


            if (name !== "email" || !isAlreadyRegistered) {
              var control = document.getElementById(name);

              if (control) {
                var mainControlDiv = control.parentElement.parentElement;

                if (mainControlDiv) {
                  mainControlDiv.classList.add("cmp-form-field--invalid");
                }
              }
            }
          } else {
            var captchaControl = document.getElementsByClassName("cmp-form-field-captcha")[0];

            if (captchaControl) {
              captchaControl.classList.add("cmp-form-field--invalid");
            }
          }
        }
      }
    }
  });
  Object(react["useEffect"])(function () {
    setFormAnalytics('load');
  }, []);
  Object(react["useEffect"])(function () {
    // Configure Registration Form on "Loading"
    if (config.formName === "registration") {
      var countryRegion = DigitalData["a" /* default */].page.country.toLowerCase(); // Get Regional config 

      var countryOptionsConfig = regionalConfig; // Hide all country configurable fields

      var allCountryOptions = countryOptionsConfig.filter(function (p) {
        return p.country === "all";
      });

      if (allCountryOptions.length === 1) {
        allCountryOptions[0].fields.map(function (fieldName) {
          return deactivateField(fieldName);
        });
      } // Display Specific fields for the current country


      var selectedCountryOptions = countryOptionsConfig.filter(function (p) {
        return p.country === countryRegion;
      });

      if (selectedCountryOptions.length === 1) {
        selectedCountryOptions[0].fields.map(function (fieldName) {
          return activateField(fieldName);
        });
      }
    }
  }, [config.formName]);

  var _useState13 = Object(react["useState"])(),
      _useState14 = Object(slicedToArray["a" /* default */])(_useState13, 2),
      newConfig = _useState14[0],
      setNewConfig = _useState14[1];

  Object(react["useEffect"])(function () {
    if (!config.getRadioOptions) {
      return;
    } // Only put this logic in for formName ==="chooseAccount"


    if (config.formName === "chooseAccount") {
      var store = new stores_sessionStore["a" /* default */]();
      var userDetails = store.getUserDetails();
      Object(SoldToDetailsLazy["a" /* default */])(config.optionsEndpoint, userDetails.userId, userDetails.salesOrg).then(function (resp) {
        var store = new stores_sessionStore["a" /* default */]();
        store.setSoldToDetails(resp);
        var tempArray = resp.map(function (item) {
          var tempOption = {};
          var tempAddress;
          tempOption.name = item.customerNumber;
          tempOption.label = item.name;
          tempAddress = Object(userFunctions["d" /* getAddressesByType */])(item, "soldToInfo")[0];
          delete tempAddress.name;
          tempOption.address = Object(userFunctions["j" /* getFullCompanyAddress */])(tempAddress, false);
          return tempOption;
        });
        config.options = tempArray;
        config.fields[1].options = tempArray;
        setDisplayForm(true); // Setting newConfig to trigger a reload

        setNewConfig(config);
      });
    }
  }, []);
  Object(react["useEffect"])(function () {
    for (var name in errorUpdates) {
      if (errors[name]) {
        errors[name].ref = errorUpdates[name];
      }

      delete errorUpdates[name];
    }
  }, [errorUpdates, errors]);
  var newError = Object(react["useCallback"])(function (name, type, msg, ref) {
    setError(name, type, msg);
    setUpdate(Object(objectSpread["a" /* default */])({}, errorUpdates, Object(defineProperty["a" /* default */])({}, name, ref)));
  }, [errors]);

  var setFormAnalytics = function setFormAnalytics(event) {
    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (config.formName) {
      var model = {
        detail: detail,
        formName: config.formName,
        formType: config.formType ? config.formType : undefined,
        event: event
      };
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */]['form'].name, model);
    }
  };

  var getValue = function getValue(name) {
    return getValues()[name];
  };

  var getApi = Object(react["useMemo"])(function () {
    return {
      setValue: setValue,
      setError: newError,
      clearError: clearError,
      register: register,
      triggerValidation: triggerValidation,
      getValues: getValues,
      getValue: getValue,
      activateField: activateField,
      deactivateField: deactivateField,
      setCountrySaved: setCountrySaved,
      regionalConfig: regionalConfig,
      setErrorBoundaryToTrue: setErrorBoundaryToTrue,
      resetErrorBoundaryToFalse: resetErrorBoundaryToFalse,
      removeNotifications: removeNotifications,
      isAlreadyRegistered: isAlreadyRegistered
    };
  }, [register, isAlreadyRegistered]);

  var submitErrorHandler = function submitErrorHandler(res) {
    if (res) {
      setErrorBoundaryToTrue(res);
    } else {
      resetErrorBoundaryToFalse();
      removeNotifications();
    }
  };

  var fields = config.fields.map(function (field, i) {
    var getFieldApi = Object(objectSpread["a" /* default */])({}, config, {
      config: config
    }, field, {
      field: field,
      isocode: isocode,
      initialState: defaultValues ? defaultValues[field.name] : undefined
    });

    return react_default.a.createElement(FieldApi.Provider, {
      value: getFieldApi,
      key: "field-".concat(i)
    }, react_default.a.createElement(forms_fields, null));
  });

  var renderForm = function renderForm() {
    return react_default.a.createElement("form", {
      className: "cmp-form cmp-form--registration ".concat(config.customFormClass || ''),
      "data-locator": "".concat(config.elementLocator || 'form-component'),
      onSubmit: handleSubmit(submitFn.bind({
        url: config.submitEndpoint,
        setError: submitErrorHandler,
        redirect: config.redirectUrl,
        passwordUpdateUrl: config.passwordUpdateUrl,
        callback: callback,
        updateFailedAttempts: updateFailedAttempts,
        setProfileData: setProfileData,
        setFormAnalytics: setFormAnalytics,
        urlChooseAccount: config.chooseAccountEndPoint
      }))
    }, react_default.a.createElement(FormApi.Provider, {
      value: getApi
    }, react_default.a.createElement(stateWatcher["b" /* FormStateProvider */], {
      watch: formState
    }, react_default.a.createElement(stateWatcher["a" /* ErrorsProvider */], {
      watch: errors
    }, fields))), react_default.a.createElement("button", {
      type: "submit",
      className: "cmp-button cmp-button--no-border cmp-form--submit",
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(config.buttonLocator || 'form-submit')
    }, config.buttonText), config.cancelText && !!cancelHandler && react_default.a.createElement("a", {
      className: "cmp-button cmp-button--cancel",
      onClick: cancelHandler,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(config.cancelText || 'form-cancel')
    }, config.cancelText));
  };

  if (isInEditMode || config.getRadioOptions && config.options || displayForm && !config.getRadioOptions) {
    return react_default.a.createElement(react_default.a.Fragment, null, renderForm());
  } else {
    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayForm
    }), renderForm());
  }
};

var form_ErrorBoundaryForm = function ErrorBoundaryForm(props) {
  return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(form_Form, props));
};

/* harmony default export */ var forms_form = (form_ErrorBoundaryForm); // Context Variables

var useFormApi = FormApi;
var useFieldApi = FieldApi;
// EXTERNAL MODULE: ./src/scripts/scrollTo.js
var scrollTo = __webpack_require__(41);
var scrollTo_default = /*#__PURE__*/__webpack_require__.n(scrollTo);

// EXTERNAL MODULE: ./src/my-account/services/UserDetails.js
var UserDetails = __webpack_require__(51);

// CONCATENATED MODULE: ./src/forms/services/submit.js














var postData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url, data) {
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
              body: JSON.stringify(data)
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

  return function postData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function registrationSubmit(_x3) {
  return _registrationSubmit.apply(this, arguments);
}

function _registrationSubmit() {
  _registrationSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(data) {
    var isCaptcha, localeLanguage, localeCountry, response, responseBody, userDetails, store;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            delete data.confirmPassword;
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            localeLanguage = DigitalData["a" /* default */].language;
            localeCountry = DigitalData["a" /* default */].country;

            if (!localeLanguage && !localeCountry || DigitalData["a" /* default */].country === DigitalData["a" /* default */].globalExperience) {
              localeLanguage = 'en';
              localeCountry = 'US';
            }

            data.country = data.country.toUpperCase();
            data.localeCountry = localeCountry;
            data.localeLanguage = localeLanguage;
            _context2.next = 11;
            return postData(this.url, data);

          case 11:
            response = _context2.sent;
            _context2.next = 14;
            return response.json();

          case 14:
            responseBody = _context2.sent;
            // remove all previous server error notifications
            this.setError();

            if (!(response.status === 200)) {
              _context2.next = 26;
              break;
            }

            if (!this.callback) {
              _context2.next = 22;
              break;
            }

            _context2.next = 20;
            return Object(UserDetails["a" /* default */])(this.callback);

          case 20:
            userDetails = _context2.sent;

            if (!userDetails.failed) {
              store = new stores_sessionStore["a" /* default */]();
              store.setUserDetails(userDetails);
              store.removeSoldToDetails();
            }

          case 22:
            this.setFormAnalytics('submit');

            if (this.redirect) {
              window.location.replace(this.redirect);
            }

            _context2.next = 29;
            break;

          case 26:
            this.setFormAnalytics('error', responseBody);
            this.setError(responseBody);
            scrollTo_default()(0);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _registrationSubmit.apply(this, arguments);
}

function checkEmailResetPasswordSubmit(_x4) {
  return _checkEmailResetPasswordSubmit.apply(this, arguments);
}

function _checkEmailResetPasswordSubmit() {
  _checkEmailResetPasswordSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(data) {
    var response, responseBody;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            this.url = "".concat(this.url.replace('{email}', data.email), "&isEproc=true");
            _context3.next = 3;
            return postData(this.url, data);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();

          case 6:
            responseBody = _context3.sent;
            // remove all previous server error notifications
            this.setError();

            if (response.status === 200) {
              this.setFormAnalytics('submit');

              if (this.redirect) {
                window.location.href = this.redirect + "?email=".concat(data.email);
              }
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              scrollTo_default()(0);
            }

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _checkEmailResetPasswordSubmit.apply(this, arguments);
}

function troubleSigningInSubmit(_x5) {
  return _troubleSigningInSubmit.apply(this, arguments);
}

function _troubleSigningInSubmit() {
  _troubleSigningInSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(data) {
    var isCaptcha, response, responseBody;
    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "&captcha=").concat(data.captcha);
              delete data.captcha;
            }

            this.url = this.url.replace('{email}', data.email);
            _context4.next = 5;
            return postData(this.url, data);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.json();

          case 8:
            responseBody = _context4.sent;
            // remove all previous server error notifications
            this.setError();

            if (response.status === 200) {
              this.setFormAnalytics('submit');

              if (this.redirect) {
                window.location.href = this.redirect;
              }
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              scrollTo_default()(0);
            }

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _troubleSigningInSubmit.apply(this, arguments);
}

function resetPasswordSubmit(_x6) {
  return _resetPasswordSubmit.apply(this, arguments);
}

function _resetPasswordSubmit() {
  _resetPasswordSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee5(data) {
    var store, resetToken, queryString, newPassword, body, response, responseBody, userDetails, _store2, needToChooseAccount, switchAccountUrl, _store, signInRedirectStore;

    return regenerator_default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            store = new stores_sessionStore["a" /* default */]();
            resetToken = store.getLegacyToken();
            store.removeLegacyToken();

            if (resetToken === null) {
              queryString = Object(query_string["parse"])(window.location.search);
              resetToken = queryString.token;
            }

            newPassword = data.password;
            body = {
              resetToken: resetToken,
              newPassword: newPassword
            };
            _context5.next = 8;
            return postData(this.url, body);

          case 8:
            response = _context5.sent;
            _context5.next = 11;
            return response.json();

          case 11:
            responseBody = _context5.sent;
            // remove all previous server error notifications
            this.setError();

            if (!(response.status === 200)) {
              _context5.next = 39;
              break;
            }

            this.setFormAnalytics('submit'); // Use Call back to added userDetails to Session State

            if (!this.callback) {
              _context5.next = 31;
              break;
            }

            _context5.next = 18;
            return Object(UserDetails["a" /* default */])(this.callback);

          case 18:
            userDetails = _context5.sent;

            if (userDetails.failed) {
              _context5.next = 31;
              break;
            }

            _store2 = new stores_sessionStore["a" /* default */]();

            _store2.setUserDetails(userDetails);

            needToChooseAccount = checkRedirectToChooseAccount(userDetails.soldToAccounts);

            if (!needToChooseAccount) {
              _context5.next = 30;
              break;
            }

            if (!(userDetails.soldToAccounts.length === 1)) {
              _context5.next = 27;
              break;
            }

            submitAccount(userDetails.soldToAccounts[0].soldTo, this.urlChooseAccount);
            return _context5.abrupt("return");

          case 27:
            // Choose Account URL
            switchAccountUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-switch-account-url");
            window.location.replace(switchAccountUrl);
            return _context5.abrupt("return");

          case 30:
            _store2.removeSoldToDetails();

          case 31:
            _store = new stores_sessionStore["a" /* default */]();
            signInRedirectStore = _store.getSignInRedirect();

            _store.removeSignInRedirect();

            if (!(signInRedirectStore || this.redirect)) {
              _context5.next = 37;
              break;
            }

            window.location.replace(signInRedirectStore ? signInRedirectStore : this.redirect);
            return _context5.abrupt("return");

          case 37:
            _context5.next = 40;
            break;

          case 39:
            if (response.status === 401) {
              Object(redirectFunctions["d" /* signInRedirect */])();
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              scrollTo_default()(0);
            }

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _resetPasswordSubmit.apply(this, arguments);
}

function changePasswordSubmit(_x7) {
  return _changePasswordSubmit.apply(this, arguments);
}

function _changePasswordSubmit() {
  _changePasswordSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee6(data) {
    var queryString, email, response, responseBody;
    return regenerator_default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            delete data.confirmNewPassword;
            queryString = Object(query_string["parse"])(window.location.search);
            email = queryString.email;
            data.email = email;
            _context6.next = 6;
            return postData(this.url, data);

          case 6:
            response = _context6.sent;
            _context6.next = 9;
            return response.json();

          case 9:
            responseBody = _context6.sent;
            // remove all previous server error notifications
            this.setError();

            if (!(response.status === 200)) {
              _context6.next = 24;
              break;
            }

            this.setFormAnalytics('submit');
            document.getElementsByName("currentPassword")[0].value = "";
            document.getElementsByName("newPassword")[0].value = "";
            document.getElementsByName("confirmNewPassword")[0].value = "";

            if (!(this.callback && typeof this.callback === 'function')) {
              _context6.next = 22;
              break;
            }

            _context6.t0 = this;
            _context6.next = 20;
            return responseBody;

          case 20:
            _context6.t1 = _context6.sent;

            _context6.t0.callback.call(_context6.t0, _context6.t1);

          case 22:
            _context6.next = 25;
            break;

          case 24:
            if (response.status === 401) {
              Object(redirectFunctions["d" /* signInRedirect */])();
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              scrollTo_default()(0);
            }

          case 25:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _changePasswordSubmit.apply(this, arguments);
}

function personalSubmit(_x8) {
  return _personalSubmit.apply(this, arguments);
} //Note: this method uses the USER Details API, not the SoldToDetailsAPI

function _personalSubmit() {
  _personalSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee7(data) {
    var response, responseBody, store, soldToDetails, mergedResponse, model;
    return regenerator_default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return postData(this.url, data);

          case 2:
            response = _context7.sent;
            _context7.next = 5;
            return response.json();

          case 5:
            responseBody = _context7.sent;
            // remove all previous server error notifications
            this.setError();

            if (response.status === 200) {
              store = new stores_sessionStore["a" /* default */]();
              store.setUserDetails(responseBody);
              store.setPersonalDetailsUpdated();
              soldToDetails = store.getSoldToDetails();
              mergedResponse = Object(userFunctions["r" /* matchAddresses */])(responseBody, soldToDetails);
              this.setProfileData(mergedResponse);
              model = {
                "communications": data.communications
              };
              this.setFormAnalytics('submit', model);
              this.callback();
            } else if (response.status === 401) {
              Object(redirectFunctions["d" /* signInRedirect */])();
            } else {
              this.setError(response);
              this.setFormAnalytics('error', responseBody);
              scrollTo_default()(0);
            }

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _personalSubmit.apply(this, arguments);
}

var checkRedirectToChooseAccount = function checkRedirectToChooseAccount(soldToAccounts) {
  if (soldToAccounts === null || soldToAccounts === undefined || !soldToAccounts.length) {
    return false;
  }

  var defaultSoldTos = soldToAccounts.filter(function (i) {
    return i.defaultFlag === 1;
  });

  if (defaultSoldTos.length > 1 || defaultSoldTos.length === 0) {
    return true;
  }

  return false;
};

function signInSubmit(_x9) {
  return _signInSubmit.apply(this, arguments);
}

function _signInSubmit() {
  _signInSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee8(data) {
    var isCaptcha, response, responseBody, store, userDetails, _store3, needToChooseAccount, switchAccountUrl, signInRedirectStore, _store4, _signInRedirectStore;

    return regenerator_default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            _context8.next = 4;
            return postData(this.url, data);

          case 4:
            response = _context8.sent;
            _context8.next = 7;
            return response.json();

          case 7:
            responseBody = _context8.sent;
            // remove all previous server error notifications
            this.setError();

            if (!(response.status === 200)) {
              _context8.next = 49;
              break;
            }

            this.setFormAnalytics('submit');

            if (!(responseBody.migrated === "N")) {
              _context8.next = 16;
              break;
            }

            store = new stores_sessionStore["a" /* default */]();
            store.setLegacyToken(responseBody.resetToken);
            window.location.replace(this.passwordUpdateUrl);
            return _context8.abrupt("return");

          case 16:
            if (!this.callback) {
              _context8.next = 40;
              break;
            }

            _context8.next = 19;
            return Object(UserDetails["a" /* default */])(this.callback);

          case 19:
            userDetails = _context8.sent;

            if (userDetails.failed) {
              _context8.next = 38;
              break;
            }

            _store3 = new stores_sessionStore["a" /* default */]();

            _store3.setUserDetails(userDetails);

            needToChooseAccount = checkRedirectToChooseAccount(userDetails.soldToAccounts);

            if (!needToChooseAccount) {
              _context8.next = 31;
              break;
            }

            if (!(userDetails.soldToAccounts.length === 1)) {
              _context8.next = 28;
              break;
            }

            submitAccount(userDetails.soldToAccounts[0].soldTo, this.urlChooseAccount);
            return _context8.abrupt("return");

          case 28:
            // Choose Account URL
            switchAccountUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-switch-account-url");
            window.location.replace(switchAccountUrl);
            return _context8.abrupt("return");

          case 31:
            _store3.removeSoldToDetails();

            this.setFormAnalytics('submit');
            signInRedirectStore = _store3.getSignInRedirect();

            _store3.removeSignInRedirect();

            if (!(signInRedirectStore || this.redirect)) {
              _context8.next = 38;
              break;
            }

            window.location.replace(signInRedirectStore ? signInRedirectStore : this.redirect);
            return _context8.abrupt("return");

          case 38:
            _context8.next = 47;
            break;

          case 40:
            this.setFormAnalytics('submit');
            _store4 = new stores_sessionStore["a" /* default */]();
            _signInRedirectStore = _store4.getSignInRedirect();

            _store4.removeSignInRedirect();

            if (!(_signInRedirectStore || this.redirect)) {
              _context8.next = 47;
              break;
            }

            window.location.replace(_signInRedirectStore ? _signInRedirectStore : this.redirect);
            return _context8.abrupt("return");

          case 47:
            _context8.next = 53;
            break;

          case 49:
            this.setFormAnalytics('error', responseBody);
            this.updateFailedAttempts('signin');
            this.setError(responseBody);
            scrollTo_default()(0);

          case 53:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _signInSubmit.apply(this, arguments);
}

var submit_setNewSoldTo = function setNewSoldTo(newSoldto) {
  var store = new stores_sessionStore["a" /* default */]();
  var soldToDetails = store.getSoldToDetails();
  var user = store.getUserDetails();
  var updatedSoldToDetails = soldToDetails.map(function (soldTo) {
    if (soldTo.customerNumber === newSoldto) {
      soldTo.soldToFlag = 1;
    } else {
      soldTo.soldToFlag = 0;
    }

    return soldTo;
  });
  store.setSoldToDetails(updatedSoldToDetails);
  var updatedUserDetailsSoldTos = user.soldToAccounts.map(function (soldTo) {
    if (soldTo.soldTo === newSoldto) {
      soldTo.defaultFlag = 1;
    } else {
      soldTo.defaultFlag = 0;
    }

    return soldTo;
  });
  user.soldToAccounts = updatedUserDetailsSoldTos;
  store.setUserDetails(user);
  store.setPersonalDetailsUpdated();
};

function chooseAccountSubmit(_x10) {
  return _chooseAccountSubmit.apply(this, arguments);
}

function _chooseAccountSubmit() {
  _chooseAccountSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee9(data) {
    var selectedAccount, _i, _Object$keys, key, response, responseBody, queryString, store, signInRedirectStore, homePageUrl;

    return regenerator_default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            // Determine the selected Account
            selectedAccount = "";

            for (_i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
              key = _Object$keys[_i];

              if (data[key] === "on") {
                selectedAccount = key;
              }
            }

            submit_setNewSoldTo(selectedAccount);
            _context9.next = 5;
            return postData(this.url + "/" + selectedAccount, "");

          case 5:
            response = _context9.sent;
            _context9.next = 8;
            return response.json();

          case 8:
            responseBody = _context9.sent;
            // remove all previous server error notifications
            this.setError();

            if (!(response.status === 200)) {
              _context9.next = 26;
              break;
            }

            // If accessed from My Account Drop Down - Return to same page
            queryString = location.search;

            if (!(queryString === "?fromMenu=true")) {
              _context9.next = 15;
              break;
            }

            window.location.replace(document.referrer);
            return _context9.abrupt("return");

          case 15:
            // If User had previously been directed to Sign in - Return to Original page
            store = new stores_sessionStore["a" /* default */]();
            signInRedirectStore = store.getSignInRedirect();
            store.removeSignInRedirect();

            if (!signInRedirectStore) {
              _context9.next = 21;
              break;
            }

            window.location.replace(signInRedirectStore.replace(/"/g, ""));
            return _context9.abrupt("return");

          case 21:
            // If user has accessed directly from Sign in Page - Return to Home page
            homePageUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-homepage-url");
            window.location.replace(homePageUrl);
            return _context9.abrupt("return");

          case 26:
            if (response.status === 401) {
              Object(redirectFunctions["d" /* signInRedirect */])();
            } else {
              this.setError(responseBody);
              scrollTo_default()(0);
            }

          case 27:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _chooseAccountSubmit.apply(this, arguments);
}

function submitAccount(_x11, _x12) {
  return _submitAccount.apply(this, arguments);
}

function _submitAccount() {
  _submitAccount = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee10(selectedAccount, urlChooseAccount) {
    var response, queryString, store, signInRedirectStore, homePageUrl;
    return regenerator_default.a.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return postData(urlChooseAccount + "/" + selectedAccount, "");

          case 2:
            response = _context10.sent;

            if (!(response.status === 200)) {
              _context10.next = 19;
              break;
            }

            // If accessed from My Account Drop Down - Return to same page
            queryString = location.search;

            if (!(queryString === "?fromMenu=true")) {
              _context10.next = 8;
              break;
            }

            window.location.replace(document.referrer);
            return _context10.abrupt("return");

          case 8:
            // If User had previously been directed to Sign in - Return to Original page
            store = new stores_sessionStore["a" /* default */]();
            signInRedirectStore = store.getSignInRedirect();
            store.removeSignInRedirect();

            if (!signInRedirectStore) {
              _context10.next = 14;
              break;
            }

            window.location.replace(signInRedirectStore.replace(/"/g, ""));
            return _context10.abrupt("return");

          case 14:
            // If user has accessed directly from Sign in Page - Return to Home page
            homePageUrl = Object(redirectFunctions["a" /* getNamedHeaderLink */])("data-homepage-url");
            window.location.replace(homePageUrl);
            return _context10.abrupt("return");

          case 19:
            Object(redirectFunctions["d" /* signInRedirect */])();

          case 20:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _submitAccount.apply(this, arguments);
}

function contactSupportSubmit(_x13) {
  return _contactSupportSubmit.apply(this, arguments);
}

function _contactSupportSubmit() {
  _contactSupportSubmit = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee11(data) {
    var _objectSpread2, isCaptcha, attachmentFieldName, _yield$convertFileInt, fileName, base64Value, encodeValue, formData, response, responseBody;

    return regenerator_default.a.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            attachmentFieldName = Object(fileAttachment["b" /* getAttachmentFieldName */])(data);
            _context11.next = 6;
            return Object(fileAttachment["a" /* convertFileIntoBase64 */])(data[attachmentFieldName]);

          case 6:
            _yield$convertFileInt = _context11.sent;
            fileName = _yield$convertFileInt.fileName;
            base64Value = _yield$convertFileInt.base64Value;
            encodeValue = base64Value.replace(/^[^,]*,/, '');
            formData = Object(objectSpread["a" /* default */])({}, data, (_objectSpread2 = {}, Object(defineProperty["a" /* default */])(_objectSpread2, attachmentFieldName, encodeValue), Object(defineProperty["a" /* default */])(_objectSpread2, "hasAttachment", encodeValue ? 'Y' : 'N'), Object(defineProperty["a" /* default */])(_objectSpread2, "fileName", fileName), _objectSpread2));
            _context11.next = 13;
            return postData(this.url, formData);

          case 13:
            response = _context11.sent;
            _context11.next = 16;
            return response.json();

          case 16:
            responseBody = _context11.sent;
            // remove all previous server error notifications
            this.setError();

            if (response.status === 200) {
              this.setFormAnalytics('submit');

              if (this.redirect) {
                window.location.replace(this.redirect);
              }
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(responseBody);
              scrollTo_default()(0);
            }

            _context11.next = 24;
            break;

          case 21:
            _context11.prev = 21;
            _context11.t0 = _context11["catch"](0);
            console.error(_context11.t0);

          case 24:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this, [[0, 21]]);
  }));
  return _contactSupportSubmit.apply(this, arguments);
}
// EXTERNAL MODULE: ./node_modules/@brightcove/react-player-loader/dist/brightcove-react-player-loader.es.js
var brightcove_react_player_loader_es = __webpack_require__(129);

// CONCATENATED MODULE: ./src/video/video-modal-body.js









var video_modal_body_VideoModalBody = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(VideoModalBody, _React$Component);

  function VideoModalBody(props) {
    Object(classCallCheck["a" /* default */])(this, VideoModalBody);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(VideoModalBody).call(this, props));
  }

  Object(createClass["a" /* default */])(VideoModalBody, [{
    key: "render",
    value: function render() {
      var playerAttrs = {
        className: 'waters-brightcove-player'
      }; //Any video option support by Video-js : https://docs.videojs.com/tutorial-options.html
      //don't pass in autoplay here rather programmatically call after loadedmetadata event

      var optionsVideoJS = {
        fluid: true,
        controls: !screenSizes["a" /* default */].isMobile() ? true : false,
        loop: false
      };
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
        className: "cmp-video_modal-body"
      }, react_default.a.createElement(brightcove_react_player_loader_es["a" /* default */], {
        options: optionsVideoJS,
        videoId: this.props.config.brightcoveVideoId,
        playerId: this.props.config.brightcovePlayerId,
        accountId: this.props.config.brightcoveAccount,
        onFailure: this.props.onVideoFailure,
        onSuccess: this.props.onVideoSuccess // embedOptions={{unminified:true}}
        ,
        attrs: playerAttrs
      })));
    }
  }]);

  return VideoModalBody;
}(react_default.a.Component);

/* harmony default export */ var video_modal_body = (video_modal_body_VideoModalBody);
// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/responsiveHOC.js
var responsiveHOC = __webpack_require__(130);
var responsiveHOC_default = /*#__PURE__*/__webpack_require__.n(responsiveHOC);

// CONCATENATED MODULE: ./src/video/video-description.js








var ResponsiveEllipsis = responsiveHOC_default()()(lib_default.a);

var video_description_VideoDescription = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(VideoDescription, _React$Component);

  function VideoDescription(props) {
    Object(classCallCheck["a" /* default */])(this, VideoDescription);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(VideoDescription).call(this, props));
  }

  Object(createClass["a" /* default */])(VideoDescription, [{
    key: "render",
    value: function render() {
      var toggleEllipsisContent = this.props.useEllipsis ? react_default.a.createElement(ResponsiveEllipsis, {
        style: {
          whiteSpace: 'pre-wrap'
        },
        text: this.props.text,
        maxLine: "3",
        ellipsis: "\u2026",
        trimRight: "true",
        basedOn: "words"
      }) : this.props.text;
      return react_default.a.createElement("p", {
        "class": "cmp-video_description",
        onClick: this.props.click ? this.props.click : null
      }, toggleEllipsisContent);
    }
  }]);

  return VideoDescription;
}(react_default.a.Component);

/* harmony default export */ var video_description = (video_description_VideoDescription);
// CONCATENATED MODULE: ./src/video/index.js










var video_VideoContainer = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(VideoContainer, _React$Component);

  function VideoContainer(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, VideoContainer);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(VideoContainer).call(this, props));

    _this.onSuccess = function (success) {
      var player = _this.brightcovePlayer = success.ref;

      if (player) {
        if (player.el_) {
          //on pause show big-play-button
          player.el_.classList.add('vjs-show-big-play-button-on-pause');
        }

        player.on("play", _this.onPlay.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this))));
        player.on("ended", _this.onEnd.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this))));
      }
    };

    _this.onPlay = function () {
      //check for any existin video and pause them
      if (window.cmpVideos) {
        window.cmpVideos.forEach(function (videoComponent) {
          if (_this.videoRef.current != videoComponent.videoRef.current) {
            if (videoComponent.brightcovePlayer) {
              videoComponent.brightcovePlayer.pause();
            }
          }
        });
      }
    };

    _this.onEnd = function (e) {
      var brightcove = _this.brightcovePlayer;

      if (brightcove.player_.isFullscreen()) {
        brightcove.player_.exitFullscreen();
      }
    };

    _this.onFailure = function (failure) {//on brightcove load failure
    };

    _this.renderVideoInfo = function () {
      return react_default.a.createElement(react_default.a.Fragment, null, _this.state.title && react_default.a.createElement("h3", {
        className: "cmp-video_title"
      }, _this.state.title), _this.state.description && react_default.a.createElement(video_description, {
        text: _this.state.description,
        useEllipsis: _this.state.useEllipsis
      }));
    };

    _this.state = {
      title: _this.props.videoConfig.title,
      description: _this.props.videoConfig.description,
      useEllipsis: true
    };
    _this.brightcovePlayer = null;
    _this.videoRef = react_default.a.createRef();
    _this.onSuccess = _this.onSuccess.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    _this.onFailure = _this.onFailure.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(VideoContainer, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement("div", {
        className: "cmp-video_video-container",
        ref: this.videoRef
      }, react_default.a.createElement(video_modal_body, {
        config: this.props.videoConfig,
        onVideoSuccess: this.onSuccess,
        onVideoFailure: this.onFailure
      }), this.renderVideoInfo());
    }
  }]);

  return VideoContainer;
}(react_default.a.Component);

/* harmony default export */ var video = (video_VideoContainer);
// CONCATENATED MODULE: ./src/chat/services/index.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;



var services_ChatService = /*#__PURE__*/function () {
  function ChatService() {
    var countryCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'US';
    var statusApi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://stgservices.waters.com/api/waters/v1/chat/enabled/{countryCode}';

    Object(classCallCheck["a" /* default */])(this, ChatService);

    this.countryCode = countryCode;
    this.statusApi = statusApi;
  }

  Object(createClass["a" /* default */])(ChatService, [{
    key: "checkFetch",
    value: function checkFetch(response) {
      if (!response.ok) {
        throw response;
      }

      return response;
    }
  }, {
    key: "getChatStatus",
    value: function getChatStatus() {
      var url = this.statusApi.replace('{countryCode}', this.countryCode);
      return this.getData(url);
    }
  }, {
    key: "getData",
    value: function getData(url) {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        window.fetch(url).then(_this.checkFetch).then(function (response) {
          resolve(response.json());
        })["catch"](function (err) {
          reject(err);
        });
      });
    }
  }]);

  return ChatService;
}();

/* harmony default export */ var chat_services = (services_ChatService);
// CONCATENATED MODULE: ./src/chat/index.js









var chat_Chat = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(Chat, _React$Component);

  function Chat(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, Chat);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(Chat).call(this, props));
    _this.state = {
      isActive: false
    };
    _this.request = new chat_services(_this.props.countryCode, _this.props.statusApi);
    return _this;
  }

  Object(createClass["a" /* default */])(Chat, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.request.getChatStatus().then(function (response) {
        _this2.setState({
          isActive: response.isChatActive
        });
      })["catch"](function (err) {
        console.log("Unable to connect to chat api.");
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isActive = this.state.isActive;
      return react_default.a.createElement("div", {
        className: "cmp-chat-content"
      }, react_default.a.createElement("div", {
        className: "cmp-chat__icon"
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.icon
      })), react_default.a.createElement("div", {
        className: "cmp-chat__text"
      }, this.props.text), react_default.a.createElement("a", {
        className: "cmp-button ".concat(!isActive ? "cmp-button--disabled" : ""),
        href: isActive ? this.props.url : "#",
        target: "_blank",
        rel: "noopener noreferrer",
        disabled: !isActive,
        role: "button",
        "aria-disabled": !isActive
      }, this.props.buttonText), react_default.a.createElement("div", {
        className: "cmp-chat__status"
      }, react_default.a.createElement("div", {
        className: "cmp-chat__status-icon ".concat(isActive ? "online" : "offline")
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: isActive ? this.props.onlineIcon : this.props.offlineIcon
      })), react_default.a.createElement("div", {
        className: "cmp-chat__status-text"
      }, isActive ? this.props.availableText : this.props.unavailableText)));
    }
  }]);

  return Chat;
}(react_default.a.Component);

/* harmony default export */ var chat = (chat_Chat);
// EXTERNAL MODULE: ./src/detail-tiles/utils/generateTiles.js
var generateTiles = __webpack_require__(85);

// EXTERNAL MODULE: ./src/my-account/services/UserDetailsLazy.js
var UserDetailsLazy = __webpack_require__(70);

// CONCATENATED MODULE: ./src/detail-tiles/hooks/useProfile.js








/* harmony default export */ var useProfile = (function (userDetailsUrl, soldToDetailsUrl, type, icon) {
  var _useState = Object(react["useState"])(),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = Object(react["useState"])([]),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      tiles = _useState4[0],
      setTiles = _useState4[1];

  function getData() {
    var checkSessionStore = false;
    Object(UserDetailsLazy["a" /* default */])(userDetailsUrl, checkSessionStore).then(function (userDetails) {
      if (userDetails.phone) {
        userDetails.phone = userDetails.phone.replace(/\D/g, '');
      }

      if (userDetails && userDetails.userId && userDetails.salesOrg) {
        if (type !== 'password') {
          Object(SoldToDetailsLazy["a" /* default */])(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg).then(function (soldToDetails) {
            var mergeAPIs = Object(userFunctions["r" /* matchAddresses */])(userDetails, soldToDetails);
            setData(mergeAPIs);
          });
        } else {
          setData(userDetails);
        }
      }
    });
  }

  Object(react["useEffect"])(function () {
    if (!loginStatus["a" /* default */].state()) {
      var isInEditMode = document.getElementById("header").hasAttribute("data-is-edit-mode");

      if (!isInEditMode) {
        Object(redirectFunctions["c" /* notLoggedInRedirect */])();
        return null;
      }
    }
  }, []);
  Object(react["useEffect"])(function () {
    getData();
  }, []);
  Object(react["useEffect"])(function () {
    setTiles(Object(generateTiles["a" /* default */])(data, type, icon));
  }, [data]);
  return {
    data: data,
    tiles: tiles,
    setData: setData
  };
});
// CONCATENATED MODULE: ./src/detail-tiles/views/tile.js





var tile_Tile = function Tile(_ref) {
  var name = _ref.name,
      columns = _ref.columns,
      notification = _ref.notification,
      formMessage = _ref.formMessage,
      form = _ref.form,
      icon = _ref.icon,
      defaultValues = _ref.defaultValues,
      _ref$isNoAddress = _ref.isNoAddress,
      isNoAddress = _ref$isNoAddress === void 0 ? false : _ref$isNoAddress,
      editText = _ref.editText,
      _ref$canCreate = _ref.canCreate,
      canCreate = _ref$canCreate === void 0 ? true : _ref$canCreate,
      setProfileData = _ref.setProfileData;

  var _useState = Object(react["useState"])(false),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      formShown = _useState2[0],
      setFormShown = _useState2[1];

  var handleToggle = function handleToggle() {
    setFormShown(!formShown);
  };

  var renderEdit = function renderEdit() {
    return react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-edit",
      onClick: handleToggle,
      "data-locator": "detail-tiles-tile-edit"
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: icon,
      className: "cmp-detail-tiles-list--tile-edit--icon",
      "data-locator": "edit-icon"
    }), react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-edit--title",
      "data-locator": "tile-edit-title"
    }, editText));
  };

  var renderColumns = function renderColumns() {
    return columns.map(function (_ref2, key) {
      var title = _ref2.title,
          rows = _ref2.rows;
      return react_default.a.createElement("div", {
        className: "cmp-detail-tiles-list--tile-column column-".concat(key),
        key: key,
        "data-locator": "detail-tile-list-column-".concat(key)
      }, title && react_default.a.createElement("div", {
        className: "cmp-detail-tiles-list--tile-column--title",
        "data-locator": "detail-tile-list-column-title-".concat(key)
      }, title), rows && rows.map(function (row, idx) {
        return react_default.a.createElement("div", {
          className: "".concat(row["class"], " cmp-detail-tiles-list--tile-column--text"),
          key: idx,
          "data-locator": "detail-tile-list-column-text-".concat(key, "-").concat(idx)
        }, row.text);
      }));
    });
  };

  var renderNotification = function renderNotification() {
    return react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification-wrapper",
      "data-locator": "detail-tiles-list-notification-wrapper"
    }, react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification",
      "data-locator": "detail-tiles-list-notification"
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: notification.icon,
      className: "cmp-detail-tiles-list--tile-notification--icon",
      "data-locator": "tile-notification--icon"
    }), react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification--title",
      "data-locator": "detail-tiles-list-notification--title"
    }, notification.title), react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification--description",
      "data-locator": "detail-tiles-list-notification-description"
    }, notification.description)));
  };

  var renderTile = function renderTile() {
    return react_default.a.createElement(react_default.a.Fragment, null, canCreate && renderEdit(), renderColumns(), notification && renderNotification());
  };

  var renderBlank = function renderBlank() {
    var blank = columns[0];
    return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-noAddress",
      "data-locator": "tile-no-address"
    }, react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-noAddress--title",
      "data-locator": "no-address-blank-title"
    }, blank.title), canCreate && react_default.a.createElement("div", {
      className: "cmp-detail-tiles--add",
      "data-locator": "add-detail-tiles"
    }, react_default.a.createElement(react_svg["a" /* default */], {
      src: blank.addIcon,
      className: "cmp-detail-tiles--add-icon"
    }), react_default.a.createElement("div", {
      className: "cmp-detail-tiles--add-title"
    }, blank.addTitle))));
  };

  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("div", {
    className: 'cmp-detail-tiles-list--tile' + (formShown ? ' form-shown' : '') + (isNoAddress ? ' no-address' : ''),
    id: name
  }, isNoAddress ? renderBlank() : renderTile()), form && formShown && react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list--form"
  }, formMessage && react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list--form-message",
    "data-locator": "form-message"
  }, formMessage.text, react_default.a.createElement("a", {
    href: formMessage.linkURL,
    "data-locator": "link-text"
  }, formMessage.linkText)), react_default.a.createElement(forms_form, {
    config: form,
    submitFn: form.submitFn,
    callback: handleToggle,
    cancelFn: handleToggle,
    defaultValues: defaultValues,
    setProfileData: setProfileData
  })));
};

/* harmony default export */ var views_tile = (tile_Tile);
// CONCATENATED MODULE: ./src/detail-tiles/index.js








var detail_tiles_DetailTiles = function DetailTiles(_ref) {
  var name = _ref.name,
      type = _ref.type,
      title = _ref.title,
      userDetailsUrl = _ref.userDetailsUrl,
      soldToDetailsUrl = _ref.soldToDetailsUrl,
      canCreate = _ref.canCreate,
      addTitle = _ref.addTitle,
      addAddressMessage = _ref.addAddressMessage,
      noAddressMessage = _ref.noAddressMessage,
      formMessage = _ref.formMessage,
      form = _ref.form,
      icons = _ref.icons,
      submitFn = _ref.submitFn,
      editText = _ref.editText,
      profileData = _ref.profileData,
      profileTiles = _ref.profileTiles,
      data = _ref.data;
  var tiles = [];
  var setData;

  if (!data) {
    var profileReturnData = useProfile(userDetailsUrl, soldToDetailsUrl, type, icons.refresh);
    tiles = profileReturnData.tiles;
    setData = profileReturnData.setData;
  } else {
    tiles = profileTiles;
    setData = profileData;
  }

  var swapFirstAndLastNames = function swapFirstAndLastNames() {
    var indexofFirstName = form.fields.map(function (e) {
      return e.name;
    }).indexOf('firstName');
    var indexofLastName = form.fields.map(function (e) {
      return e.name;
    }).indexOf('lastName');

    if (indexofFirstName !== -1 && indexofLastName !== -1) {
      var temp = form.fields[indexofFirstName];
      form.fields[indexofFirstName] = form.fields[indexofLastName];
      form.fields[indexofLastName] = temp;
    }
  };

  var processFormData = function processFormData() {
    form.fields = form.fields.map(function (field) {
      // Check if disableForEprocUser flag is true and userRole is eproc
      if (field.disableForEprocUser && Object(userFunctions["q" /* isEprocurementUserRole */])()) {
        field.disabled = true;
      }

      delete field.disableForEprocUser;
      return field;
    });
  };

  var renderTiles = function renderTiles() {
    switch (type) {
      case 'personal':
        submitFn = personalSubmit;
        break;

      case 'password':
        submitFn = changePasswordSubmit;
        break;

      case 'shipToInfo':
        // Assign shipping submit function when done
        break;

      case 'billToInfo':
        // Assign billing submit function when done
        break;

      default:
    }

    form.submitFn = submitFn || function () {};

    if (!tiles.length) {
      return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(views_tile, {
        name: 'emptyAddressTile',
        columns: [{
          title: noAddressMessage,
          addTitle: addTitle,
          addIcon: icons.add
        }],
        formMessage: formMessage,
        form: form,
        icon: icons.edit,
        isNoAddress: true,
        editText: editText,
        canCreate: canCreate
      }));
    }

    if (!canCreate && !tiles.length) {
      return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(views_tile, {
        name: 'emptyAddressTile',
        columns: [{
          title: noAddressMessage,
          addTitle: addTitle,
          addIcon: icons.add
        }],
        formMessage: formMessage,
        form: form,
        icon: icons.edit,
        isNoAddress: true,
        editText: editText,
        canCreate: canCreate
      }));
    }

    return tiles.map(function (tile, key) {
      if (tile.name === 'personalDetailsTile') {
        var mailingAddress = tile.defaultValues.userAddress && tile.defaultValues.userAddress.filter(function (address) {
          return address.addressType === 'mailingAddress';
        });
        var userCountry = mailingAddress.length ? mailingAddress[0].countryCode.toLowerCase() : '';

        if (userCountry === 'kr' || userCountry === 'jp' || userCountry === 'tw' || userCountry === 'cn') {
          swapFirstAndLastNames();
        }

        processFormData();
      }

      return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(views_tile, Object.assign({}, tile, {
        key: name + key,
        formMessage: formMessage,
        form: form,
        icon: icons.edit,
        editText: editText,
        canCreate: canCreate,
        setProfileData: setData
      })));
    });
  };

  return react_default.a.createElement("div", {
    className: "cmp-detail-tiles",
    id: name,
    "data-locator": "detail-tiles"
  }, react_default.a.createElement("div", {
    className: "cmp-detail-tiles--title",
    "data-locator": "detail-tiles-title"
  }, title), react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list",
    "data-locator": "details-tiles-list"
  }, renderTiles()), canCreate && !!tiles.length && type !== "personal" && react_default.a.createElement("div", {
    className: "cmp-detail-tiles--add",
    "data-locator": "details-tile-add"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.add,
    className: "cmp-detail-tiles--add-icon",
    "data-locator": "details-tile-add-icon"
  }), react_default.a.createElement("div", {
    className: "cmp-detail-tiles--add-title",
    "data-locator": "detail-tiles-add-title"
  }, addTitle)));
};

/* harmony default export */ var detail_tiles = (detail_tiles_DetailTiles);
// CONCATENATED MODULE: ./src/wechat/wechat-modal-body.js







var wechat_modal_body_WeChatModalBody = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(WeChatModalBody, _React$Component);

  function WeChatModalBody(props) {
    Object(classCallCheck["a" /* default */])(this, WeChatModalBody);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(WeChatModalBody).call(this, props));
  }

  Object(createClass["a" /* default */])(WeChatModalBody, [{
    key: "render",
    value: function render() {
      var _this$props$config = this.props.config,
          text = _this$props$config.text,
          qrCodeImg = _this$props$config.qrCodeImg,
          alt = _this$props$config.alt;
      return react_default.a.createElement("div", {
        className: "cmp-wechat-modal"
      }, react_default.a.createElement("div", {
        className: "cmp-wechat-modal__image"
      }, react_default.a.createElement("img", {
        src: qrCodeImg,
        alt: alt
      })), react_default.a.createElement("div", {
        className: "cmp-wechat-modal__text"
      }, text));
    }
  }]);

  return WeChatModalBody;
}(react_default.a.Component);

/* harmony default export */ var wechat_modal_body = (wechat_modal_body_WeChatModalBody);
// CONCATENATED MODULE: ./src/wechat/index.js










var weChatLinkClass = 'cmp-footer-social-links__link';

var wechat_WeChat = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(WeChat, _React$Component);

  function WeChat(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, WeChat);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(WeChat).call(this, props));

    _this.showModal = function (e) {
      e.preventDefault();

      _this.toggleModal();
    };

    _this.toggleModal = function () {
      _this.setState({
        isModalShown: !_this.state.isModalShown
      });
    };

    _this.state = {
      isModalShown: false
    };
    _this.showModal = _this.showModal.bind(Object(assertThisInitialized["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this)));
    return _this;
  }

  Object(createClass["a" /* default */])(WeChat, [{
    key: "render",
    value: function render() {
      return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("a", {
        className: weChatLinkClass,
        href: "#",
        target: "_blank",
        onClick: this.showModal
      }, react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.config.chatIcon
      })), react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.isModalShown,
        onClose: this.toggleModal
      }, react_default.a.createElement(modal["a" /* Header */], {
        title: this.props.config.title,
        className: modal["c" /* keys */].HeaderTitleCentered
      }), react_default.a.createElement(wechat_modal_body, {
        config: this.props.config
      })));
    }
  }]);

  return WeChat;
}(react_default.a.Component);

/* harmony default export */ var wechat = (wechat_WeChat);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/HashRouter.js
var HashRouter = __webpack_require__(499);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js + 1 modules
var Switch = __webpack_require__(501);

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
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var es_Link = __webpack_require__(498);

// EXTERNAL MODULE: ./src/typography/title.js
var typography_title = __webpack_require__(86);

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




var components_link_Link = function Link(_ref) {
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

/* harmony default export */ var components_link = (components_link_Link);
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
    var profileReturnData = useProfile(userDetailsUrl, soldToDetailsUrl, personalConfig.type, personalConfig.icons ? personalConfig.icons.refresh : {});

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
        return react_default.a.createElement(detail_tiles, Object.assign({}, config, {
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
  return react_default.a.createElement(react_default.a.Fragment, null, !!config && react_default.a.createElement(detail_tiles, config));
};

/* harmony default export */ var change_password = (change_password_ChangePassword);
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
var date_formatter = __webpack_require__(44);

// EXTERNAL MODULE: ./src/utils/get-locale/index.js
var get_locale = __webpack_require__(45);

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
// CONCATENATED MODULE: ./src/history/components/time-period-dropdown.js



var time_period_dropdown_getOptions = function getOptions(text) {
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
    getOptions: time_period_dropdown_getOptions,
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
// EXTERNAL MODULE: ./src/scripts/fade-x.js
var fade_x = __webpack_require__(74);

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
  return react_default.a.createElement("div", {
    className: "cmp-tabs-wrapper"
  }, react_default.a.createElement("div", {
    ref: tabsRef,
    className: "cmp-tabs ".concat(className)
  }, items.map(function (item, index) {
    return react_default.a.createElement(tabs_Tab, {
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
  return react_default.a.createElement("div", {
    className: "cmp-tabs__tab".concat(isActive ? " active" : ""),
    onClick: function onClick() {
      return _onClick(index);
    }
  }, react_default.a.createElement("span", {
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
      return react_default.a.createElement(navigation_tabs, {
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
// CONCATENATED MODULE: ./src/details/details.services.js




var details_services_getData = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(url) {
    var response;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(whatwg_fetch_fetch["a" /* fetch */])(url, {
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
            return details_services_getData(url);

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
            return details_services_getData(url);

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
            return details_services_getData(url);

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
var get_isocode = __webpack_require__(87);

// EXTERNAL MODULE: ./src/utils/group-by/index.js
var group_by = __webpack_require__(68);

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
      addToCart(isCommerceApiMigrated, addToCartUrl, reorderData, null, _this.setError).then(function (response) {
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
      }), react_default.a.createElement(addToCartModal["a" /* default */], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return OrderDetails;
}(react["Component"]);

var order_details_ErrorBoundaryOrderDetails = function ErrorBoundaryOrderDetails(props) {
  return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(order_details_OrderDetails, props));
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
      return react_default.a.createElement(navigation_tabs, {
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
      addToCart(isCommerceApiMigrated, addToCartUrl, reorderData, null, _this.setError).then(function (response) {
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
      }), react_default.a.createElement(addToCartModal["a" /* default */], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return QuoteDetails;
}(react["Component"]);

var quote_details_ErrorBoundaryQuoteDetails = function ErrorBoundaryQuoteDetails(props) {
  return react_default.a.createElement(search_ErrorBoundary, null, react_default.a.createElement(quote_details_QuoteDetails, props));
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

/* harmony default export */ var my_account = (my_account_MyAccountRouter);
// CONCATENATED MODULE: ./src/country-selector/index.js





var country_selector_CountrySelection = function CountrySelection(props) {
  var _React$useState = react_default.a.useState(""),
      _React$useState2 = Object(slicedToArray["a" /* default */])(_React$useState, 2),
      selectedValue = _React$useState2[0],
      setSelectedValue = _React$useState2[1];

  react_default.a.useEffect(function () {
    setSelectedValue(props.countries[0].href);
  }, []);

  var handleDropdownChange = function handleDropdownChange(e) {
    setSelectedValue(e.target.value);
  };

  var handleButtonClick = function handleButtonClick() {
    return props.onChange(selectedValue);
  };

  var Items = function Items() {
    return props.countries.map(function (country) {
      return react_default.a.createElement("option", {
        key: country.href,
        value: country.href
      }, country.title);
    });
  };

  return react_default.a.createElement("div", {
    className: "cmp-country-selector"
  }, react_default.a.createElement("div", {
    className: "cmp-country-selector__text"
  }, props.translations.changeCountryText), react_default.a.createElement("div", {
    className: "cmp-country-selector__dropdown"
  }, react_default.a.createElement("select", {
    className: "select-css",
    value: selectedValue,
    onChange: handleDropdownChange
  }, react_default.a.createElement(Items, null))), react_default.a.createElement("div", {
    className: "cmp-country-selector__note"
  }, react_default.a.createElement(react_svg["a" /* default */], {
    src: "/content/dam/waters/en/brand-assets/icons/externallink.svg"
  }), react_default.a.createElement("div", {
    className: "cmp-country-selector__note-text"
  }, react_default.a.createElement("span", null, props.translations.changeCountryNoteText, ":"), "\xA0", props.translations.changeCountryNewTabText)), react_default.a.createElement("div", {
    className: "cmp-country-selector__button"
  }, react_default.a.createElement("a", {
    className: "cmp-button",
    onClick: handleButtonClick
  }, props.translations.changeCountryButton)), react_default.a.createElement("div", {
    className: "cmp-country-selector__cancel"
  }, react_default.a.createElement("a", {
    onClick: props.onClose
  }, props.translations.cancelButton)));
};

var country_selector_CountrySelector = function CountrySelector(props) {
  var _React$useState3 = react_default.a.useState(props.initialState),
      _React$useState4 = Object(slicedToArray["a" /* default */])(_React$useState3, 2),
      open = _React$useState4[0],
      setOpen = _React$useState4[1];

  var handleOpen = function handleOpen() {
    return setOpen(true);
  };

  var handleClose = function handleClose() {
    return setOpen(false);
  };

  react_default.a.useEffect(function () {
    var regionSelectorElements = Array.from(document.getElementsByClassName('cmp-footer__selector__region'));
    regionSelectorElements.forEach(function (element) {
      element.addEventListener('click', handleOpen);
    });
    return function () {
      regionSelectorElements.forEach(function (element) {
        element.removeEventListener('click', handleOpen);
      });
    };
  }, []);

  var handleCountrySelectionChange = function handleCountrySelectionChange(item) {
    handleClose();
    window.open("".concat(window.location.origin).concat(item), "_blank");
  };

  return react_default.a.createElement(modal["b" /* default */], {
    isOpen: open,
    onClose: handleClose,
    className: "cmp-country-selector-modal"
  }, react_default.a.createElement(modal["a" /* Header */], {
    title: props.translations.preferredCountryHeading,
    icon: "/content/dam/waters/en/brand-assets/icons/globe.svg"
  }), react_default.a.createElement(country_selector_CountrySelection, Object.assign({}, props, {
    onChange: handleCountrySelectionChange,
    onClose: handleClose
  })));
};

country_selector_CountrySelector.defaultProps = {
  countries: [],
  translations: {},
  initialState: false
};
/* harmony default export */ var country_selector = (country_selector_CountrySelector);

// CONCATENATED MODULE: ./src/create-account-form/create-account-form.js





var create_account_form_CreateAccountForm = function CreateAccountForm(_ref) {
  var registrationFormConfig = _ref.registrationFormConfig,
      checkEmailFormConfig = _ref.checkEmailFormConfig,
      isocode = _ref.isocode,
      isTwoStepRegistrationForm = _ref.isTwoStepRegistrationForm;

  var _useState = Object(react["useState"])(!isTwoStepRegistrationForm),
      _useState2 = Object(slicedToArray["a" /* default */])(_useState, 2),
      showRegistrationForm = _useState2[0],
      setRegistrationFormVisibility = _useState2[1];

  var _useState3 = Object(react["useState"])(null),
      _useState4 = Object(slicedToArray["a" /* default */])(_useState3, 2),
      isEProcUser = _useState4[0],
      setEProcUser = _useState4[1];

  window.addEventListener("setEProcUser", function (_ref2) {
    var data = _ref2.detail;
    setEProcUser(data.isEProcUser);
  }, false);

  function checkEmailSubmit(data) {
    if (isEProcUser !== null) isEProcUser ? checkEmailResetPasswordSubmit.call(this, data) : setRegistrationFormVisibility(true);
  }

  return showRegistrationForm ? react_default.a.createElement(forms_form, Object.assign({}, registrationFormConfig, {
    isocode: isocode
  })) : react_default.a.createElement(forms_form, Object.assign({}, checkEmailFormConfig, {
    submitFn: checkEmailSubmit,
    isocode: isocode
  }));
};

/* harmony default export */ var create_account_form = (create_account_form_CreateAccountForm);
// CONCATENATED MODULE: ./src/create-account-form/index.js

// CONCATENATED MODULE: ./src/index.js


























if (false) { var whyDidYouRender; }

var globalTranslationsScript = document.getElementById('global-translations-json');
var globalTranslations = globalTranslationsScript ? JSON.parse(globalTranslationsScript.innerHTML) : {};
var headerRef = document.getElementById("header");
var headerData = headerRef ? {
  userDetailsUrl: headerRef.dataset.userDetailsUrl
} : {
  userDetailsUrl: ""
};

function getAuthoredDataForSearchApp(c, s) {
  return {
    searchPath: c.dataset.baseUrl,
    searchText: s,
    isocode: c.dataset.isocode,
    locale: c.dataset.locale
  };
}

function getAuthoredDataForTagCloud(h, t) {
  return {
    searchPath: h.dataset.searchPath,
    tagTitle: t.dataset.title,
    category: t.dataset.category,
    contentType: t.dataset.contentType
  };
}

function getAuthoredDataForChat(c) {
  return {
    url: c.dataset.chatUrl,
    statusApi: c.dataset.chatStatusApi,
    icon: c.dataset.chatIcon,
    availableText: c.dataset.chatAvailableText,
    unavailableText: c.dataset.chatUnavailableText,
    text: c.dataset.chatText,
    buttonText: c.dataset.chatButtonText
  };
} // Bind Loader component on Demand


var spinnerContainer = document.getElementById("cmp-header--loader");

if (spinnerContainer) {
  var src_bindLoaderToDom = function bindLoaderToDom(container) {
    var showLoader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var props = {
      loading: showLoader,
      color: '#ffffff'
    };
    react_dom_default.a.render(showLoader ? react_default.a.createElement(spinner["a" /* default */], props) : null, container);
  };

  window.addEventListener("showLoaderEproc", function (_ref) {
    var data = _ref.detail;
    src_bindLoaderToDom(spinnerContainer, data.showLoader);
  }, false);
} // End Bind Loader component on Demand


var searchAppContainer = document.getElementById('js-search-app');

if (searchAppContainer) {
  var src_text = JSON.parse(document.getElementById('search-results-translations-json').innerHTML);
  var src_filterMap = JSON.parse(document.getElementById('search-results-categories-json').innerHTML);
  var accountModalConfig = {};
  var baseSignInUrlString = "";

  if (header) {
    accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
    baseSignInUrlString = accountModalConfig.signIn.url;
  }

  var src_data = getAuthoredDataForSearchApp(searchAppContainer);
  react_dom_default.a.render(react_default.a.createElement(src_search, {
    defaultFacet: "category_facet:waters%253Acategory%252Fapplicationslibrary",
    searchDefaults: {
      rows: 25
    },
    searchServicePath: src_data.searchPath,
    searchLocale: src_data.locale,
    searchText: src_text,
    filterMap: src_filterMap,
    isocode: src_data.isocode,
    baseSignInUrl: baseSignInUrlString
  }), searchAppContainer);
}

var tagCloudContainers = document.querySelectorAll('.cmp-tag-cloud');

if (tagCloudContainers) {
  for (var src_i = 0; src_i < tagCloudContainers.length; src_i++) {
    var src_json = JSON.parse(tagCloudContainers[src_i].getAttribute('data-json'));

    var _data2 = getAuthoredDataForTagCloud(header, tagCloudContainers[src_i]);

    react_dom_default.a.render(react_default.a.createElement(tagcloud, {
      tagCloudTitle: _data2.tagTitle,
      searchPath: _data2.searchPath,
      keywords: src_json,
      category: _data2.category,
      contentType: _data2.contentType
    }), tagCloudContainers[src_i]);
  }
}

var imageGalleryContainers = Array.from(document.querySelectorAll('.cmp-image-gallery'));

if (imageGalleryContainers) {
  imageGalleryContainers.forEach(function (container) {
    var json = JSON.parse(container.getAttribute('data-json'));
    react_dom_default.a.render(react_default.a.createElement(image_carousel, {
      templates: json.templates,
      widths: json.widths,
      alt: json.alt,
      zoomInIcon: "/content/dam/waters/en/brand-assets/icons/zoom-in.svg",
      zoomOutIcon: "/content/dam/waters/en/brand-assets/icons/zoom-out.svg"
    }), container);
  });
} // Start SKU Details Component


var src_skuDetailsContainer = document.querySelector('.cmp-sku-details__ecom');
var skuDetailsConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
var src_skuData, skuDetailsListPrice;

if (document.querySelector('.cmp-sku-details__ecom')) {
  // If a product is discontinued, the ecom class never gets added,
  // but not having a price is a valid option for some products
  // This check allows us to pass in a price of undefined without breaking the frontend
  src_skuData = document.querySelector('.cmp-sku-details__ecom');
  skuDetailsListPrice = src_skuData.dataset.price;
}

if (src_skuDetailsContainer) {
  var src_skuDetailsRender = function skuDetailsRender(skuDetailsContainer) {
    react_dom_default.a.render(react_default.a.createElement(src_sku_details, {
      config: skuDetailsConfig,
      price: skuDetailsListPrice,
      countryRestricted: skuCountryRestricted,
      skuNumber: src_skuNumber,
      titleText: skuTitle,
      discontinued: skuDiscontinued,
      replacementSkuCode: replacementSkuCode,
      replacementSkuHref: replacementSkuHref
    }), skuDetailsContainer);
  };

  var src_skuNumber = src_skuData.dataset.skuCode;
  var skuTitle = src_skuData.dataset.skuTitle;
  var skuDiscontinued = src_skuData.dataset.discontinued;
  var skuCountryRestricted = src_skuData.dataset.countryRestricted;
  var replacementSkuCode = src_skuData.dataset.replacementSkuCode;
  var replacementSkuHref = src_skuData.dataset.replacementSkuHref;

  if (skuDetailsConfig) {
    var _accountModalConfig = {};

    if (header) {
      _accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
    }

    skuDetailsConfig.baseSignInUrl = _accountModalConfig.signIn.url;
  }

  if (loginStatus["a" /* default */].state()) {
    var src_store = new stores_sessionStore["a" /* default */]();
    waitUntilUserExists(src_store, src_skuDetailsContainer, src_skuDetailsRender);
  } else {
    src_skuDetailsRender(src_skuDetailsContainer);
  }
} // End SKU Details Component
// Start SKU List Component


var skuListContainer = document.querySelector('.cmp-sku-list');

if (skuListContainer) {
  var skuListData = JSON.parse(skuListContainer.dataset.json);
  var skuListTitle = skuListContainer.dataset.componenttitle ? skuListContainer.dataset.componenttitle : '';
  react_dom_default.a.render(react_default.a.createElement(sku_list, {
    skuConfig: skuDetailsConfig,
    data: skuListData,
    title: skuListTitle
  }), skuListContainer);
}

var skuUnavailableContainer = document.querySelector('.cmp-notification-wrapper');

if (skuUnavailableContainer) {
  if (skuUnavailableContainer.dataset.replacementcode) {
    var _replacementSkuCode, _replacementSkuHref, skuMessageText;

    if (skuUnavailableContainer.dataset.replacementcode) {
      _replacementSkuCode = skuUnavailableContainer.dataset.replacementcode;
    }

    if (skuUnavailableContainer.dataset.replacementSkuHref) {
      _replacementSkuHref = skuUnavailableContainer.dataset.replacementSkuHref;
    }

    var replacementSkuIcon = skuDetailsConfig.skuInfo.lowStockIcon;

    if (_replacementSkuCode && _replacementSkuHref) {
      skuMessageText = skuDetailsConfig.skuInfo.discontinuedWithReplacementWithCode;
    } else {
      skuMessageText = skuDetailsConfig.skuInfo.discontinuedNoReplacementCode;
    }

    var skuDetailsUnavailableBindingContainer = document.querySelector('#cmp-sku-details-replacement');
    react_dom_default.a.render(react_default.a.createElement(sku_message, {
      icon: replacementSkuIcon,
      message: skuMessageText,
      link: _replacementSkuHref,
      linkMessage: _replacementSkuCode
    }), skuDetailsUnavailableBindingContainer);
  }
}

var videoContainers = Array.from(document.querySelectorAll('.cmp-video'));

if (videoContainers) {
  videoContainers.forEach(function (container) {
    var videoContainer = container.querySelector('.video-wrapper');
    var videoConfig = container.querySelector('.video-configs-json');

    if (videoContainer && videoConfig) {
      var _json = JSON.parse(videoConfig.innerHTML);

      react_dom_default.a.render(react_default.a.createElement(video, {
        videoConfig: _json.videoConfig,
        ref: function ref(ourComponent) {
          if (window.cmpVideos) {
            window.cmpVideos.push(ourComponent);
          } else {
            window.cmpVideos = [ourComponent];
          }
        }
      }), videoContainer);
    }
  });
}

var registrationFormContainer = document.getElementById('js-registration-form');

if (registrationFormContainer) {
  var configCheckEmailForm = JSON.parse(document.getElementById('cmp-check-email-form').innerHTML);
  var configRegistrationForm = JSON.parse(document.getElementById('cmp-registration-form').innerHTML);
  var src_country = DigitalData["a" /* default */].page.country.toLowerCase();

  var src_swapFirstAndLastNames = function swapFirstAndLastNames() {
    var indexofFirstName = configRegistrationForm.fields.map(function (e) {
      return e.name;
    }).indexOf('firstName');
    var indexofLastName = configRegistrationForm.fields.map(function (e) {
      return e.name;
    }).indexOf('lastName');

    if (indexofFirstName !== -1 && indexofLastName !== -1) {
      var temp = configRegistrationForm.fields[indexofFirstName];
      configRegistrationForm.fields[indexofFirstName] = configRegistrationForm.fields[indexofLastName];
      configRegistrationForm.fields[indexofLastName] = temp;
    }
  };

  var AddExtraDisclosures = function AddExtraDisclosures(config, addDisclosuresJSON) {
    var indexofPrivacy = config.fields.map(function (e) {
      return e.name;
    }).indexOf('privacy');
    var privacyConfig = config.fields[indexofPrivacy].config;
    privacyConfig.pop();
    config.fields[indexofPrivacy].config = privacyConfig.concat(addDisclosuresJSON);
  };

  var changeDisclosures = function changeDisclosures(config) {
    var KRconfig = JSON.parse(document.getElementById('cmp-registration-form-kr').innerHTML).koreanDisclosures;
    var indexofPrivacy = config.fields.map(function (e) {
      return e.name;
    }).indexOf('privacy');
    config.fields[indexofPrivacy].config = KRconfig;
  };

  if (configRegistrationForm.formName === "registration" && (src_country === "jp" || src_country === "cn" || src_country === "tw" || src_country === "kr")) {
    src_swapFirstAndLastNames();
  }

  if (configRegistrationForm.formName === "registration" && src_country === "kr") {
    changeDisclosures(configRegistrationForm);
  }

  var registrationForm = {
    config: configRegistrationForm,
    submitFn: registrationSubmit,
    callback: headerData.userDetailsUrl
  };
  var checkEmailForm = {
    config: configCheckEmailForm
  };
  var src_isTwoStepRegistrationForm = configCheckEmailForm.isTwoStepRegistrationForm;
  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(create_account_form, {
    registrationFormConfig: registrationForm,
    checkEmailFormConfig: checkEmailForm,
    isocode: DigitalData["a" /* default */].language,
    isTwoStepRegistrationForm: src_isTwoStepRegistrationForm
  }), registrationFormContainer);
} // Contact Support


var contactSupportFormContainer = document.getElementById('js-contact-support-form');

if (contactSupportFormContainer) {
  var src_config = JSON.parse(document.getElementById('cmp-contact-support-form').innerHTML);
  var objData = src_config.fields.find(function (x) {
    return x.type === 'dropdown' && x.name === 'formCategoryType' && Object.keys(x).includes('defaultValue');
  });
  react_dom_default.a.render(react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(forms_form, {
    config: src_config,
    submitFn: contactSupportSubmit,
    callback: headerData.userDetailsUrl,
    isocode: DigitalData["a" /* default */].language,
    defaultValues: {
      formCategoryType: objData.defaultValue || ''
    }
  }), react_default.a.createElement(legal_link_modal_LegalLinkModal, {
    docIcon: src_config.icons.docIcon || ''
  })), contactSupportFormContainer);
}

var troubleSigningInFormContainer = document.getElementById('cmp-trouble-signing-in-form');

if (troubleSigningInFormContainer) {
  var _config = JSON.parse(document.getElementById('js-trouble-signing-in-form').innerHTML);

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(forms_form, {
    config: _config,
    submitFn: troubleSigningInSubmit,
    isocode: DigitalData["a" /* default */].language
  }), troubleSigningInFormContainer);
}

var chooseAccountFormContainer = document.getElementById('cmp-choose-account-form');

if (chooseAccountFormContainer) {
  var _config2 = JSON.parse(document.getElementById('js-choose-account-form').innerHTML);

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(forms_form, {
    config: _config2,
    submitFn: chooseAccountSubmit,
    isocode: DigitalData["a" /* default */].language
  }), chooseAccountFormContainer);
}

var resetPasswordContainer = document.querySelector('.cmp-form-reset-password--attach');

if (resetPasswordContainer) {
  var _config3 = JSON.parse(document.getElementById('cmp-reset-password-form').innerHTML);

  _config3.submitEndpoint = "".concat(_config3.submitEndpoint).concat(_config3.isEproc === "true" ? '?isEproc=true' : '');
  react_dom_default.a.render(react_default.a.createElement(forms_form, {
    config: _config3,
    submitFn: resetPasswordSubmit,
    callback: headerData.userDetailsUrl
  }), resetPasswordContainer);
}

var changePasswordContainer = document.getElementById('changePassword-details-tile');

if (changePasswordContainer) {
  var _config4 = JSON.parse(document.getElementById('cmp-detail-tiles--changePassword').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles, _config4), changePasswordContainer);
}

var chatContainer = document.querySelector('.cmp-chat');

if (chatContainer) {
  var _data3 = getAuthoredDataForChat(chatContainer);

  react_dom_default.a.render(react_default.a.createElement(chat, {
    url: _data3.url,
    statusApi: _data3.statusApi,
    countryCode: skuDetailsConfig.countryCode,
    icon: _data3.icon,
    availableText: _data3.availableText,
    unavailableText: _data3.unavailableText,
    text: _data3.text,
    buttonText: _data3.buttonText,
    offlineIcon: skuDetailsConfig.skuInfo.outOfStockIcon,
    onlineIcon: skuDetailsConfig.skuInfo.inStockIcon
  }), chatContainer);
}

var shippingDetailsTile = document.getElementById('shipping-details-tile');

if (shippingDetailsTile) {
  var _config5 = JSON.parse(document.getElementById('cmp-detail-tiles--shipping').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles, _config5), shippingDetailsTile);
}

var billingDetailsTile = document.getElementById('billing-details-tile');

if (billingDetailsTile) {
  var _config6 = JSON.parse(document.getElementById('cmp-detail-tiles--billing').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles, _config6), billingDetailsTile);
}

var src_wechat = document.querySelector('.cmp-wechat');
var wechatContainer = document.querySelector('.cmp-wechat-container');
var wechatJSON = document.getElementById('wechat-json');

if (src_wechat && wechatContainer && wechatJSON) {
  var _config7 = JSON.parse(wechatJSON.innerHTML);

  react_dom_default.a.render(react_default.a.createElement(wechat, {
    config: _config7
  }), wechatContainer);
}

var myAccountPage = document.getElementById('my-account');

if (myAccountPage) {
  var _config8 = JSON.parse(document.getElementById('cmp-my-account').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(my_account, _config8), myAccountPage);
}

var countryModalRoot = document.getElementById('country-selector-root');

if (countryModalRoot) {
  var scriptElement = document.getElementById('country-list-json');
  var countries = scriptElement && scriptElement.innerHTML.trim() ? JSON.parse(scriptElement.innerHTML) : [];

  if (Array.isArray(countries) && countries.length !== 0) {
    react_dom_default.a.render(react_default.a.createElement(country_selector, {
      countries: countries,
      translations: globalTranslations
    }), countryModalRoot);
  }
}

var signInFormContainer = document.getElementById("js-signin-form");

if (signInFormContainer) {
  var _config9 = JSON.parse(document.getElementById("cmp-signin-form").innerHTML);

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(forms_form, {
    config: _config9,
    submitFn: signInSubmit,
    isocode: DigitalData["a" /* default */].language,
    callback: headerData.userDetailsUrl
  }), signInFormContainer);
} // User Greeting Component


var src_userGreetingContainer = document.getElementById("user-greetings");

if (src_userGreetingContainer) {
  var src_store_0 = new stores_sessionStore["a" /* default */]();

  waitUntilUserExists(src_store_0, src_userGreetingContainer, userGreeting);
} // Inject UserGreeting Component user-greetings container


function userGreeting(userGreetingContainer) {
  var props = JSON.parse(document.getElementById("cmp-user-greetings").innerHTML);
  react_dom_default.a.render(react_default.a.createElement(user_greetings_UserGreeting, props), userGreetingContainer);
} // Checks user set in session storage or not


function waitUntilUserExists(store, container, callback) {
  var savedUserDetails = store.getUserDetails();

  if (Object.keys(savedUserDetails).length > 0) {
    return callback(container);
  }

  setTimeout(function () {
    return waitUntilUserExists(store, container, callback);
  }, 1000);
} // End User Greeting Component
// Quick Order Component


var quickOrderContainer = document.getElementById("quick-order");

if (quickOrderContainer) {
  var src_store2 = new stores_sessionStore["a" /* default */]();

  waitUntilUserExists(src_store2, quickOrderContainer, quickOrder);
}

function quickOrder(container) {
  var props = JSON.parse(document.getElementById("cmp-quick-order").innerHTML);
  var skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
  react_dom_default.a.render(react_default.a.createElement(quick_order_QuickOrder, Object.assign({}, props, {
    skuConfig: skuConfig
  })), container);
} // End Quick Order Component
// Add Contact Waters Link


var contactusContainer = document.getElementById('contactWatersLink');

if (contactusContainer) {
  var _config10 = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);

  var src_label;
  var src_url;

  if (Object.keys(_config10.commerceConfig).length > 0) {
    src_label = _config10.commerceConfig.contactSupportLinkLabel;
    src_url = _config10.commerceConfig.contactSupportHref;
  }

  react_dom_default.a.render(react_default.a.createElement(link_button_LinkButton, {
    label: src_label,
    url: src_url
  }), contactusContainer);
}
// EXTERNAL MODULE: ./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.esm.js
var css_vars_ponyfill_esm = __webpack_require__(131);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js + 1 modules
var inlineSVG = __webpack_require__(58);

// CONCATENATED MODULE: ./src/entry.js




var japanTheme = {
  '--font-weight-light': 'lighter',
  '--font-weight-regular': 'normal',
  '--font-weight-bold': 'bold'
};
var isJapanese = document.documentElement.lang == 'ja';
Object(css_vars_ponyfill_esm["a" /* default */])({
  variables: isJapanese ? japanTheme : Object.assign({}),
  include: 'style,link[rel="stylesheet"]:not([href*="//"])'
});
inlineSVG["a" /* default */].init('img.inline-svg', 'svg-inlined');

function addEllipses() {
  var desc = document.querySelectorAll('.cmp-list__item-description-text');
  var num = 0;

  if (desc) {
    for (var i = 0; i <= desc.length; i++) {
      if (document.querySelectorAll('.cmp-list__item-description-text')[i]) {
        var eel = desc[i];

        if (eel) {
          while (eel.clientHeight > eel.parentElement.clientHeight) {
            if (num >= 2000) break;
            var text = eel.innerText;
            eel.innerText = text.replace(/\W*\s(\S)*$/, '…');
            num++;
          }
        }
      }
    }
  }
}

function checkIfFirefox() {
  var firefox = window.navigator.userAgent.search('Firefox');

  if (firefox > -1) {
    var body = document.body;
    body.classList.add('column-table-support-false');
  }
}

checkIfFirefox();
addEllipses();
window.addEventListener('resize', addEllipses);

/***/ }),

/***/ 190:
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
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);







var queryString = __webpack_require__(29);

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

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "?").concat(paramString);
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

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "&contenttype_facet$").concat(contentTypeKey, ":").concat(encodeURIComponent(encodeURIComponent(contentTypeValue)), "?").concat(paramString);
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

      var searchString = "".concat(_this.path, "/category_facet$").concat(category.toLowerCase(), ":").concat(encodeURIComponent(encodeURIComponent(category)), "&contenttype_facet$").concat(contentTypeName.replace('_facet', ''), ":").concat(encodeURIComponent(encodeURIComponent(contentTypeValue))).concat(facetString, "?").concat(paramString);
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
                searchString = "".concat(_this.path, "/v1/autocomplete?term=").concat(term, "&rows=").concat(rows, "&isocode=").concat(_this.options.isocode);
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

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f6f8f9","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BAD_REQUEST_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SERVER_ERROR_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UNAVAILABLE_PRICE_WITH_ADD_TO_CART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return LIST_PRICE_WITH_ADD_TO_CART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NO_PRICE_NO_ADD_TO_CART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FILENAME_REGX; });
var BAD_REQUEST_CODE = 400;
var SERVER_ERROR_CODE = 500;
var UNAVAILABLE_PRICE_WITH_ADD_TO_CART = 'unavailable_price_with_add-to-cart';
var LIST_PRICE_WITH_ADD_TO_CART = 'list_price_with_add-to-cart';
var NO_PRICE_NO_ADD_TO_CART = 'no_price_no_add-to-cart';
var FILENAME_REGX = /\*|\/|\?|\!|\<|\>|\"|\||\\|\:/gm;

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
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

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(397);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(160);
// Print Breaking CSS File



/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ functions; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(38);

// CONCATENATED MODULE: ./src/forms/services/EmailService.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(89).Promise : Promise;



var EmailService_EmailService = /*#__PURE__*/function () {
  function EmailService() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://stgservices.waters.com/api/waters/user/v1/validate/{email}";

    Object(classCallCheck["a" /* default */])(this, EmailService);

    this.url = url;
  }

  Object(createClass["a" /* default */])(EmailService, [{
    key: "checkEmail",
    value: function checkEmail(email) {
      return this.getData(this.createEmailRequest(email));
    }
  }, {
    key: "createEmailRequest",
    value: function createEmailRequest(email) {
      var url = this.url.replace("{email}", encodeURI(email).replace(/#/g, '%23'));
      return url;
    }
  }, {
    key: "checkFetch",
    value: function checkFetch(response) {
      if (!response.ok) {
        throw response;
      }

      return response;
    }
  }, {
    key: "getData",
    value: function getData(url) {
      var _this = this;

      // Should be logic for all get requests we have to send
      return new _Promise(function (resolve, reject) {
        window.fetch(url).then(_this.checkFetch).then(function (response) {
          resolve(response.json());
        })["catch"](function (err) {
          console.log("err - ", err);
          reject(err);
        });
      });
    }
  }]);

  return EmailService;
}();

/* harmony default export */ var services_EmailService = (EmailService_EmailService);
// EXTERNAL MODULE: ./src/forms/fields/utils/fileAttachment.js
var fileAttachment = __webpack_require__(60);

// CONCATENATED MODULE: ./src/forms/fields/patterns/index.js



var test = function test(value, regex) {
  return regex.test(value);
};

var removeError = function removeError() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  refs.forEach(function (ref) {
    if (ref) {
      ref.classList.remove("error");
      ref.value && ref.classList.add("valid");
    }
  });
  return true;
};

var patterns_getFileValidation = function getFileValidation(fileObj, validation) {
  var status = false;
  var errorMsg = '';
  var fileTypePattern = validation.fileTypePattern,
      attachmentFileSize = validation.attachmentFileSize,
      maxAttachmentFileNameSizeWithExt = validation.maxAttachmentFileNameSizeWithExt,
      attachmentFileInvalidValidMsg = validation.attachmentFileInvalidValidMsg,
      attachmentFileSizeErrorMsg = validation.attachmentFileSizeErrorMsg,
      attachmentFileNameLengthErrorMsg = validation.attachmentFileNameLengthErrorMsg,
      attachmentFileNameErrorMsg = validation.attachmentFileNameErrorMsg;
  var labels = {
    attachmentFileSizeErrorMsg: attachmentFileSizeErrorMsg,
    attachmentFileNameLengthErrorMsg: attachmentFileNameLengthErrorMsg,
    attachmentFileNameErrorMsg: attachmentFileNameErrorMsg
  };
  var config = {
    maxAttachmentFileNameSizeWithExt: maxAttachmentFileNameSizeWithExt,
    attachmentFileSize: attachmentFileSize
  };

  if (fileObj) {
    var fileValidation = Object(fileAttachment["c" /* validateUploadFile */])(fileObj, labels, config);
    var fileType = new RegExp(fileTypePattern, 'i');

    if (!fileType.test(fileObj.name)) {
      status = true;
      errorMsg = attachmentFileInvalidValidMsg;
    } else if (fileValidation.status) {
      status = true;
      errorMsg = fileValidation.error;
    }
  }

  return {
    status: status,
    errorMsg: errorMsg
  };
};

var functions = {
  noValidation: function noValidation() {
    return true;
  },
  matching: function matching(value, matchRef, ref) {
    return value === matchRef.value ? removeError(ref) : false;
  },
  noWhitespaceOrSpecialChars: function noWhitespaceOrSpecialChars(value, ref) {
    if (value.length) {
      if (test(value, /^.*(?=^[^\\\/~`!@#$%^|&*_+=:;"<>?\(\)\]\[\{\}\n\r]+$)(?=^.*[^\s]+).*$/g)) {
        return removeError(ref);
      }

      return false;
    } else {
      return removeError(ref);
    }
  },
  noWhitespaceOnly: function noWhitespaceOnly(value, ref) {
    if (value) {
      if (test(value, /^.*[^\s]+.*$/)) {
        return removeError(ref);
      }

      return false;
    } else {
      return removeError(ref);
    }
  },
  noWhitespace: function noWhitespace(value, ref) {
    if (value) {
      if (!test(value, /^.*\s+.*$/)) {
        return removeError(ref);
      }

      return false;
    } else {
      return removeError(ref);
    }
  },
  blankOrNumbersOnly: function blankOrNumbersOnly(value, ref) {
    if (value) {
      if (test(value, /(^[0-9]+$|^$)/)) {
        return removeError(ref);
      }

      return false;
    } else {
      return removeError(ref);
    }
  },
  password: function password(value, ref, setError, clearError) {
    var throwErrors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var validations = 0;
    var newErrors = []; // Check length (required)

    if (value.length < 8) {
      newErrors.push({
        name: "shortPassword",
        type: "invalidLength",
        msg: "Password",
        ref: ref
      });
    } else {
      validations++;
      if (throwErrors) clearError("shortPassword");
    } // Check for lowercase


    if (!test(value, /^.*[a-z]+.*$/)) {
      newErrors.push({
        name: "noLowercase",
        type: "missingLowercase",
        msg: "Password",
        ref: ref
      });
    } else {
      validations++;
      if (throwErrors) clearError("noLowercase");
    } // Check for uppercase


    if (!test(value, /^.*[A-Z]+.*$/)) {
      newErrors.push({
        name: "noUppercase",
        type: "missingUppercase",
        msg: "Password",
        ref: ref
      });
    } else {
      validations++;
      if (throwErrors) clearError("noUppercase");
    } // Check for digit


    if (!test(value, /^.*[0-9]+.*$/)) {
      newErrors.push({
        name: "noDigits",
        type: "missingDigits",
        msg: "Password",
        ref: ref
      });
    } else {
      validations++;
      if (throwErrors) clearError("noDigits");
    } // Check for special character


    if (!test(value, /^.*[^a-zA-Z0-9]+.*$/)) {
      newErrors.push({
        name: "noSpecial",
        type: "missingSpecial",
        msg: "Password",
        ref: ref
      });
    } else {
      validations++;
      if (throwErrors) clearError("noSpecial");
    }

    if (throwErrors) {
      newErrors.forEach(function (error) {
        setError(error.name, error.type, error.msg, error.ref);
      });
    } else {
      return newErrors.length ? newErrors.reduce(function (map, error) {
        map[error.name] = true;
        return map;
      }, {}) : {};
    }

    if (validations >= 5 && value.length >= 8) {
      return removeError(ref);
    } else {
      return false;
    }
  },
  email: function email(value, ref, invalidMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications) {
    // Clear Notifications because Notification Error could be set
    removeNotifications();

    if (test(value, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      clearError("invalidEmail");
      return true;
    } else {
      setError("invalidEmail", "invalidEmail", invalidMsg, ref);
      return false;
    }
  },
  newEmail: function newEmail(value, emailValidationEndpoint, ref, invalidMsg, setError, clearError, setErrorBoundaryToTrue, removeNotifications, setValue, name) {
    // Only Run if invalidMsg is supplied
    if (invalidMsg) {
      if (test(value, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        var myService = new services_EmailService(emailValidationEndpoint);
        var newEmail = myService.checkEmail(value).then(function (response) {
          var isRegisteredUser = response.isregistereduser,
              isAccountPartial = response.isAccountPartial;
          window.dispatchEvent(new CustomEvent("setEProcUser", {
            detail: {
              isEProcUser: isAccountPartial
            }
          }));

          if (isRegisteredUser) {
            // Display Sign In span
            setError("alreadyRegistered", "alreadyRegistered", invalidMsg, ref);
            removeNotifications();
            return false;
          }

          removeNotifications();
          clearError("alreadyRegistered");
          return removeError(ref);
        })["catch"](function (err) {
          // Clear the Input Error, Clear the Text and invoke the Notification
          setValue(name, "", true);
          removeError(ref);
          setErrorBoundaryToTrue({
            code: 500
          });
          return true;
        });
        return newEmail;
      } else {
        removeNotifications();
        clearError("alreadyRegistered");
        return true;
      }
    }
  },
  fileValidation: function fileValidation(value, ref, validation, setError, clearError) {
    if (ref) {
      if (value && value.length === 1) {
        var _getFileValidation = patterns_getFileValidation(value[0], validation),
            status = _getFileValidation.status,
            errorMsg = _getFileValidation.errorMsg;

        if (status) {
          setError(ref.name, ref.name, errorMsg, ref);
          return false;
        }

        clearError(ref.name);
        return true;
      } else {
        clearError(ref.name);
        return true;
      }
    }

    return true;
  }
};

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
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
var asyncToGenerator = __webpack_require__(12);

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
/* harmony import */ var C_AEMWorkspace_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
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