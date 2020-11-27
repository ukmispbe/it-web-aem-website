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
/******/ 		6: 0
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
/******/ 	deferredModules.push([380,1,2,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
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
var slicedToArray = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js
var inlineSVG = __webpack_require__(53);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(23);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(13);

// EXTERNAL MODULE: ./src/stores/cookieStore.js
var cookieStore = __webpack_require__(46);

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

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
// head JS entry file

_analytics__WEBPACK_IMPORTED_MODULE_0__[/* default */ "b"].siteLoad();

/***/ })

/******/ });