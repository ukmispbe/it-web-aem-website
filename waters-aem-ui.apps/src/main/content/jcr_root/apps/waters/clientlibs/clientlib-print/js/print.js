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
/******/ 		49: 0,
/******/ 		46: 0
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
/******/ 	deferredModules.push([463,3,0,2,1,10,4,5,13,9,6,11,12,8,7,39,40,43,26,24,31,17,22,15,14,21,25,41,37,35,16,23,27,36,20,28,33,38,42,29,32,18,30,19,34]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
/* harmony import */ var core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(151);
/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_features_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(156);
/* harmony import */ var core_js_features_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_features_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_features_array_from__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(157);
/* harmony import */ var core_js_features_array_from__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_features_array_from__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_features_object_entries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(158);
/* harmony import */ var core_js_features_object_entries__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_entries__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_features_string_repeat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(159);
/* harmony import */ var core_js_features_string_repeat__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_features_string_repeat__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_features_object_values__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(160);
/* harmony import */ var core_js_features_object_values__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_values__WEBPACK_IMPORTED_MODULE_6__);
// polyfills found here: https://github.com/zloirock/core-js








/***/ }),

/***/ 108:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 109:
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

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return keys; });
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);

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

/***/ 118:
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ 119:
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ __webpack_exports__["a"] = (memoizeOne);


/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ''));
}

/* harmony default export */ __webpack_exports__["a"] = (invariant);


/***/ }),

/***/ 135:
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

/***/ 136:
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

/***/ 137:
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

/***/ 138:
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

/***/ 15:
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

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_cookieStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);

var loginStatus = {
  state: function state() {
    return _stores_cookieStore__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].getLoggedInStatus() ? true : false;
  }
};
/* harmony default export */ __webpack_exports__["a"] = (loginStatus);

/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(168)))

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = hasClass;

function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(175);
} else {}


/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 176:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/styles/index.scss
var styles = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5);

// CONCATENATED MODULE: ./src/scripts/stickyService.js



window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var last_known_scroll_position = 0;
var ticking = false;

var stickyService_Sticky = /*#__PURE__*/function () {
  function Sticky() {
    Object(classCallCheck["a" /* default */])(this, Sticky);

    this.sumHeight = 0;
    this.currentStickyClasses = [];
    this.queue = [];
    this.attachedFunctions = [];
    this.current = [];
  }

  Object(createClass["a" /* default */])(Sticky, [{
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

var sticky = new stickyService_Sticky();
document.addEventListener('DOMContentLoaded', function () {
  sticky.init();
});

function wait(fn) {
  setTimeout(fn, 50);
}

/* harmony default export */ var stickyService = (sticky);
var scrollListener = sticky.attachToScrollListener;
// EXTERNAL MODULE: ./src/scripts/scrollTo.js
var scrollTo = __webpack_require__(34);
var scrollTo_default = /*#__PURE__*/__webpack_require__.n(scrollTo);

// CONCATENATED MODULE: ./src/scripts/backtotop.js



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
  scrollListener(trackScroll);
});
goTopBtnFixed.addEventListener('click', function (e) {
  e.preventDefault();
  scrollTo_default()(0, 1500, 'easeOutSine');
});
goTopBtnRelative.addEventListener('click', function (e) {
  e.preventDefault();
  scrollTo_default()(0, 1500, 'easeOutSine');
});
// EXTERNAL MODULE: ./src/scripts/scrollToElement.js
var scrollToElement = __webpack_require__(109);
var scrollToElement_default = /*#__PURE__*/__webpack_require__.n(scrollToElement);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(15);

// CONCATENATED MODULE: ./src/scripts/fade-x.js


var fade_x_Fader = function Fader(targetClassName) {
  var offsetWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxFadeWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;
  var forceMobile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var wrap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var targetElement = document.querySelector(".".concat(targetClassName));

  if (!targetElement || screenSizes["a" /* default */].isMobile() && !forceMobile) {
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

/* harmony default export */ var fade_x = (fade_x_Fader);
// EXTERNAL MODULE: ./src/scripts/ecommerce.js
var ecommerce = __webpack_require__(27);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(16);

// EXTERNAL MODULE: ./src/scripts/checkOutStatus.js
var checkOutStatus = __webpack_require__(42);

// CONCATENATED MODULE: ./src/scripts/sku-details.js




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
    return this.exists() && ecommerce["a" /* default */].currentState() != ecommerce["a" /* default */].disabled;
  },
  preventSticky: function preventSticky() {
    return screenSizes["a" /* default */].isMobile() && this.discontinued();
  },
  allowSticky: function allowSticky() {
    return !ecommerce["a" /* default */].isPartialState() ? true : loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state();
  },
  stickyExists: function stickyExists() {
    return this.exists() && !this.preventSticky() && this.allowSticky();
  }
};
/* harmony default export */ var sku_details = (skuDetails);
// CONCATENATED MODULE: ./src/scripts/anchor.js





var anchorElement = document.querySelector('.cmp-anchor');
var anchorMenu = document.querySelector('.cmp-anchor__list-heading');
var ancFader = null; // Setup click handler for Anchor Links to scroll in view

var anchorLinks = document.querySelectorAll('.cmp-anchor__link') ? Array.from(document.querySelectorAll('.cmp-anchor__link')) : [];

var anchor_bindClickEvents = function bindClickEvents() {
  var anchorStickyHeaderOffset = 53;
  var skuDetailsStickyHeaderOffset = 145;
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var href = e.target.getAttribute('href').replace(/#/gi, '');
      var additionalScrollOffset = sku_details.stickyExists() ? skuDetailsStickyHeaderOffset : anchorStickyHeaderOffset;
      scrollToElement_default()(href, 1000, 'easeOutSine', true, additionalScrollOffset);
      anchorLinks.forEach(function (anchor) {
        return anchor.classList.remove('active');
      });
      anchor.classList.add('active');

      if (screenSizes["a" /* default */].isMobile()) {
        toggleMobileNav(true);
      }
    });
  });
};

window.addEventListener('load', anchor_bindClickEvents);
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
    ancFader = fade_x('cmp-anchor__list', 0, 75, false, true);
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

  if (screenSizes["a" /* default */].isMobile()) {
    anchorHide();
  }

  if (anchorElement) {
    setAnchorDestinations();
    scrollListener(anchorScrollSpy);
    stickyService.add({
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
// CONCATENATED MODULE: ./src/scripts/sticky-sort-filter.js



var sticky_sort_filter_SortFilterSticky = function SortFilterSticky() {
  if (screenSizes["a" /* default */].isMobile()) {
    stickyService.add({
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

document.addEventListener('DOMContentLoaded', sticky_sort_filter_SortFilterSticky);
// CONCATENATED MODULE: ./src/scripts/sticky-sku-details.js



var sticky_sku_details_SkuDetailsSticky = function SkuDetailsSticky() {
  if (sku_details.okToConfigureSticky()) {
    stickyService.add({
      element: sku_details.element(),
      priority: 1,
      modifier: 'cmp-sku-details--sticky',
      offset: {
        position: 'bottom',
        amount: 60
      },
      conditions: function conditions(element) {
        if (sku_details.preventSticky()) {
          // do not show sticky on mobile for discontinued items
          // because the sticky will show a blank space since users
          // will not see the quantity and add to cart button
          return false;
        }

        return sku_details.allowSticky();
      },
      fillHeight: 50,
      stickyHeight: 92 // setting to 92px to remove gap between anchor and sku-details sticky

    });
  }
};

document.addEventListener('DOMContentLoaded', sticky_sku_details_SkuDetailsSticky);
/* harmony default export */ var sticky_sku_details = (sticky_sku_details_SkuDetailsSticky);
// EXTERNAL MODULE: ./src/scripts/sticky-sku-scroll.js
var sticky_sku_scroll = __webpack_require__(135);

// CONCATENATED MODULE: ./src/scripts/mobile-search-scroll.js


var mobile_search_scroll_androidSuggestionFix = function androidSuggestionFix() {
  var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  var isSearchPage = document.getElementsByClassName('cmp-search__sort-filter__container').length;

  if (!isAndroid && isSearchPage) {
    document.getElementsByClassName('cmp-search__sort-filter__container')[0].classList.add('no-fix');
  }

  if (screenSizes["a" /* default */].isMobile() && isAndroid && isSearchPage) {
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

document.addEventListener('DOMContentLoaded', mobile_search_scroll_androidSuggestionFix);
// CONCATENATED MODULE: ./src/scripts/navigation-overlay.js

var elem = document.querySelector('.cmp-navigation');

if (elem) {
  var overlay = document.createElement('div');
  overlay.classList.add('cmp-navigation-overlay__container');
  overlay.classList.add('overlay-container');
  elem.parentElement.after(overlay);

  var navigation_overlay_closeOverlay = function closeOverlay() {
    if (screenSizes["a" /* default */].isTabletAndOver()) {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
      overlay.style.transitionDelay = "0s, 0s";
      elem.classList.remove('cmp-navigation--shadow');
    }
  };

  var navigation_overlay_openOverlay = function openOverlay() {
    if (screenSizes["a" /* default */].isTabletAndOver()) {
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
      navigation_overlay_closeOverlay();
    }
  };

  Array.from(document.querySelector('.navigation .cmp-navigation .cmp-navigation__group').children).forEach(function (e) {
    var level2Links = e.querySelector('.cmp-navigation__group');
    var level2LinksCount = level2Links ? level2Links.children.length : 0;

    if (level2LinksCount !== 0) {
      e.addEventListener('mouseover', navigation_overlay_openOverlay);
      e.addEventListener('mouseleave', navigation_overlay_closeOverlay);
    }

    var level1Link = e.querySelector('.cmp-navigation__container .cmp-navigation__item-link');

    if (level1Link) {
      level1Link.addEventListener('click', function (event) {
        return event.preventDefault();
      });
    }
  });
  document.body.addEventListener('click', handleClickAway);
  var navigation_overlay_header = document.querySelector('.cmp-header');

  if (navigation_overlay_header) {
    navigation_overlay_header.addEventListener('click', handleClickAway);
  }
}
// CONCATENATED MODULE: ./src/scripts/navigation.js


var navigation_FadeNav = function FadeNav() {
  var navFader = fade_x('cmp-navigation__group', 0, 100);
  var nav = document.querySelector('.cmp-navigation__group');

  if (navFader && nav) {
    nav.addEventListener('scroll', navFader);
  }
};

document.addEventListener('DOMContentLoaded', navigation_FadeNav);
// EXTERNAL MODULE: ./src/scripts/navigation-level2.js
var navigation_level2 = __webpack_require__(67);

// EXTERNAL MODULE: ./src/scripts/iframe.js
var iframe = __webpack_require__(136);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var stores_sessionStore = __webpack_require__(11);

// CONCATENATED MODULE: ./src/scripts/backtosearch.js

var backtosearch_sessionStore = new stores_sessionStore["a" /* default */]();

function removeFromSession() {
  backtosearch_sessionStore.removeFromSearchURL();
}

function checkForSessionLink() {
  var getURL = backtosearch_sessionStore.getFromSearchURL();

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
      backtosearch_sessionStore.setPreviousPagePositionEnabled();
    });
  }
}

var backtosearch_mediaQueryListener = window.matchMedia('(max-width: 650px)');

function changeBreadcrumb(source) {
  var scrollOffset = 40;

  if (source === 'FromScroll') {
    scrollOffset = 10;
  }
}

var breadcrumbDiv = document.querySelector('.breadcrumb');

if (breadcrumbDiv) {
  backtosearch_mediaQueryListener.addListener(changeBreadcrumb);
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

var backtosearch_link = checkForSessionLink();

if (backtosearch_link) {
  hideBreadcrumbShowBackToSearch(backtosearch_link);
}
// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(25);

// EXTERNAL MODULE: ./src/utils/textTransform.js
var textTransform = __webpack_require__(120);

// EXTERNAL MODULE: ./src/utils/parse-query-params/index.js
var parse_query_params = __webpack_require__(84);

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
  var footer_children = languageSelectorOptions && Array.prototype.slice.call(languageSelectorOptions.childNodes);
  var displayText = languageSelector.firstElementChild.innerText;
  var longestAnchor = displayText.length;

  if (footer_children) {
    footer_children.forEach(function (e) {
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
    Object(textTransform["a" /* replaceTextWith */])(element, {
      email: userEmail
    });
  }
};

footer_replaceTextOnEmailConfirmation();
// EXTERNAL MODULE: ./src/scripts/banner.js
var banner = __webpack_require__(137);

// CONCATENATED MODULE: ./src/scripts/breadcrumb.js


var breadcrumb_FadeBreadcrumb = function FadeBreadcrumb() {
  var bcFader = fade_x('cmp-breadcrumb__list', 0, 100, true);
  var bc = document.querySelector('.cmp-breadcrumb__list');

  if (bcFader && bc) {
    bc.addEventListener('scroll', bcFader);
  }
};

document.addEventListener('DOMContentLoaded', breadcrumb_FadeBreadcrumb);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(2);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(12);

// EXTERNAL MODULE: ./src/scripts/mobileNav.js
var scripts_mobileNav = __webpack_require__(75);

// CONCATENATED MODULE: ./src/scripts/dateRange.js
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

/* harmony default export */ var dateRange = (DateRange);
// CONCATENATED MODULE: ./src/element-creators/services/servletService.js



var basePath = "/bin/waters/";
var ServletService = {
  getSystemWideNotification: function () {
    var _getSystemWideNotification = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(language) {
      var _this = this;

      return regenerator_default.a.wrap(function _callee$(_context) {
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
    var _fetchSystemWideNotification = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(language) {
      return regenerator_default.a.wrap(function _callee2$(_context2) {
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
      dateRange: new dateRange(data.onTime, data.offTime)
    };
  }
};
/* harmony default export */ var servletService = (ServletService);
// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(19);

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

/* harmony default export */ var systemWideNotification = (systemWideNotification_SystemWideNotification);
// EXTERNAL MODULE: ./src/scripts/inlineSVG.js
var inlineSVG = __webpack_require__(45);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(13);

// CONCATENATED MODULE: ./src/scripts/header.js











var header_sessionStore = new stores_sessionStore["a" /* default */]();
var headerTB, headerTB_user, headerTB_mobile, headerTB_mobile_btn, headerNavigation_comp, headerNavigation_mainUL, headerNavigation_cartLI;

var headerInit = function headerInit() {
  domReferences();
  addEventListeners();
  header_render();
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
    var mobileNav = Object(scripts_mobileNav["a" /* default */])();

    if (mobileNav) {
      headerTB_mobile_btn.addEventListener('click', mobileNav.toggle);
      window.addEventListener('resize', mobileNav.resize);
    }
  }
}

function header_render() {
  // Show or Hide Cart Icon dependent upon eCommerce Status
  var hideCartClass = "top-bar__nav__cart--hide";

  if (Object(eCommerceFunctions["c" /* isCartHidden */])()) {
    domElements["a" /* default */].addClass(headerNavigation_cartLI, hideCartClass);
  } else {
    domElements["a" /* default */].removeClass(headerNavigation_cartLI, hideCartClass);
  }

  var loggedInClass = 'loggedIn';

  if (loginStatus["a" /* default */].state()) {
    domElements["a" /* default */].addClass(headerTB_user, loggedInClass);
  } else {
    domElements["a" /* default */].removeClass(headerTB_user, loggedInClass);
  }

  var isUsed = 'is-used';

  if (headerNavigation_comp) {
    domElements["a" /* default */].addClass(headerTB_mobile, isUsed);
  }

  if (headerNavigation_mainUL) {
    if (headerNavigation_mainUL.childNodes.length > 0) {
      if (screenSizes["a" /* default */].isMobile()) {
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
    header_sessionStore.setDismissSystemWideNotification();
  }
};

var renderSystemWideNotification = /*#__PURE__*/function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var component, result, parent;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(header_sessionStore.getDismissSystemWideNotificatiopn() === 'Y')) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            component = new systemWideNotification(servletService, handleSystemWideNotificationDismiss);
            _context.next = 5;
            return component.create(Date.now());

          case 5:
            result = _context.sent;

            if (result.visible) {
              parent = document.querySelector('.cmp-header');
              parent.appendChild(result.element);
              inlineSVG["a" /* default */].init('img.inline-svg', 'svg-inlined');
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
// EXTERNAL MODULE: ./src/scripts/collapsible.js
var collapsible = __webpack_require__(138);

// CONCATENATED MODULE: ./src/scripts/skulist.js
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
  for (var skulist_i = 0; skulist_i < quantitySkuList.length; skulist_i++) {
    quantitySkuList[skulist_i].addEventListener('keyup', function (event) {
      return skuQuantityInput(event);
    });
    quantitySkuList[skulist_i].addEventListener('keypress', function (event) {
      return skuRemoveNegative(event);
    });
  }
}

/* harmony default export */ var skulist = ({
  SkuRemoveNegative: skuRemoveNegative,
  SkuQuantityInput: skuQuantityInput
});
// CONCATENATED MODULE: ./src/scripts/continueButton.js

var session = new stores_sessionStore["a" /* default */]();
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
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(43);

// EXTERNAL MODULE: ./src/my-account/services/UserDetailsLazy.js
var UserDetailsLazy = __webpack_require__(57);

// CONCATENATED MODULE: ./src/scripts/textModifier.js




var textModifier_session = new stores_sessionStore["a" /* default */]();


function textModifier() {
  return _textModifier.apply(this, arguments);
}

function _textModifier() {
  _textModifier = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var detailsUrl, checkSessionStore, userDetails, objMapping, textReplaceElements, replaceObj;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            detailsUrl = document.getElementById('header').dataset.userDetailsUrl;
            checkSessionStore = true;

            if (Array.from(document.querySelectorAll('.text-replace')).length !== 0) {
              checkSessionStore = false;
            }

            _context.next = 5;
            return Object(UserDetailsLazy["a" /* default */])(detailsUrl, checkSessionStore, textModifier_session);

          case 5:
            userDetails = _context.sent;
            objMapping = {
              user: stores_sessionStore["b" /* keys */].userDetails,
              userDetails: stores_sessionStore["b" /* keys */].userDetails
            };

            if (userDetails) {
              textReplaceElements = document.querySelectorAll('.text-replace');
              replaceObj = Object(defineProperty["a" /* default */])({}, stores_sessionStore["b" /* keys */].userDetails, userDetails);
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
// EXTERNAL MODULE: ./src/polyfills.js
var polyfills = __webpack_require__(100);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(24);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(9);

// EXTERNAL MODULE: ./src/search/services/index.js
var services = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js
var withRouter = __webpack_require__(480);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// CONCATENATED MODULE: ./src/search/components/no-results.js



var no_results_NoResults = function NoResults(_ref) {
  var searchText = _ref.searchText,
      query = _ref.query;
  var forQuery = /*#__PURE__*/react_default.a.createElement("span", null, "for \"", /*#__PURE__*/react_default.a.createElement("strong", null, query), "\"");
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("h2", {
    className: "cmp-search__resultsCount noresults"
  }, "Showing 0 results", ' ', " ", forQuery), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__no-results"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    className: "icon",
    src: searchText.noResultsIcon
  }), /*#__PURE__*/react_default.a.createElement("h2", null, searchText.noResultsTitle), /*#__PURE__*/react_default.a.createElement("p", null, searchText.noResultsDescription, /*#__PURE__*/react_default.a.createElement("a", {
    href: window.location.href.split('?')[0]
  }, searchText.noResultsSearchLinkText))));
};

/* harmony default export */ var no_results = (no_results_NoResults);
// EXTERNAL MODULE: ./node_modules/validator/index.js
var validator = __webpack_require__(55);
var validator_default = /*#__PURE__*/__webpack_require__.n(validator);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/react-spinners/index.js
var react_spinners = __webpack_require__(94);

// CONCATENATED MODULE: ./src/search/components/spinner.js








var spinner_LoadingSpinner = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(LoadingSpinner, _Component);

  function LoadingSpinner() {
    Object(classCallCheck["a" /* default */])(this, LoadingSpinner);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(LoadingSpinner).call(this));
  }

  Object(createClass["a" /* default */])(LoadingSpinner, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      window.scrollTo(0, 0);
      window.document.documentElement.classList.add('showing-spinner');
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.document.documentElement.classList.remove('showing-spinner');
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search-overlay"
      }, /*#__PURE__*/react_default.a.createElement(react_spinners["ClipLoader"], {
        sizeUnit: 'px',
        size: 64,
        color: '#ffffff',
        loading: this.props.loading
      }));
    }
  }]);

  return LoadingSpinner;
}(react["Component"]);

/* harmony default export */ var spinner = (spinner_LoadingSpinner);
// CONCATENATED MODULE: ./src/search/components/loading.js



var loading_Loading = function Loading(_ref) {
  var visible = _ref.visible;

  if (!visible) {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  }

  return /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "overlay"
  }), /*#__PURE__*/react_default.a.createElement(spinner, {
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
    pagination: {}
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
var react_paginate = __webpack_require__(77);
var react_paginate_default = /*#__PURE__*/__webpack_require__.n(react_paginate);

// CONCATENATED MODULE: ./src/search/components/content-type-menu.js


var content_type_menu_ContentTypeMenu = function ContentTypeMenu(props) {
  var Items = function Items() {
    return props.items.map(function (item) {
      return /*#__PURE__*/react_default.a.createElement("div", {
        key: item.facetName,
        className: "content-type-menu-container__item",
        onClick: function onClick() {
          return props.onClick(item);
        }
      }, /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();
          return false;
        },
        "data-count": " (".concat(item.count, ")")
      }, item.facetTranslation)));
    });
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "content-type-menu-container"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "content-type-menu-container__heading"
  }, props.heading), /*#__PURE__*/react_default.a.createElement("div", {
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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "facet-menu-container",
    "data-locator": "facet-menu-container"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "facet-menu-container__heading",
    "data-locator": "facet-menu-container-heading"
  }, props.filterTags, /*#__PURE__*/react_default.a.createElement("div", {
    className: "heading--with-selected-value",
    "data-locator": "heading-with-selected-value"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "back-btn"
  }, /*#__PURE__*/react_default.a.createElement("a", {
    href: "javascript:void(0)",
    onClick: props.onClear,
    "data-locator": "link-back-button"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.previousIcon
  }), " ", props.heading)), /*#__PURE__*/react_default.a.createElement("h3", null, props.selectedValue))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "facet-menu-container__body",
    "data-locator": "facet-menu-container-body"
  }, props.children));
};

facet_menu_FacetMenu.defaultProps = {
  heading: '',
  selectedValue: '',
  previousIcon: '',
  filterTags: /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null),
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
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: "cmp-search-filters__filter__search"
        }, !_this.state.searchValue.length ? /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: _this.props.text.searchIcon,
          className: "searchIcon"
        }) : /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: _this.props.text.closeIcon,
          className: "closeIcon",
          onClick: function onClick() {
            return _this.handleClearClick(_this.props.minCharSearch, _this.props.facet.facets);
          }
        }), /*#__PURE__*/react_default.a.createElement("input", {
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
    value: function checkHandler(event) {
      event.currentTarget.nextElementSibling.click();
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

        return /*#__PURE__*/react_default.a.createElement("li", {
          className: "cmp-search-filters__filter__item",
          key: "".concat(item.value, "#_").concat(index)
        }, /*#__PURE__*/react_default.a.createElement("a", {
          href: "javascript:void(0)",
          className: 'checkbox ' + (checked ? 'checked' : ''),
          onClick: _this2.checkHandler.bind(_this2),
          "data-locator": "search-filters-filter-item"
        }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
          src: _this2.props.text.checkmarkIcon
        })), /*#__PURE__*/react_default.a.createElement("input", {
          type: "checkbox",
          name: "".concat(_this2.props.name, ":").concat(item.value),
          onChange: function onChange(e) {
            return _this2.props.selectHandler(item.value, _this2.props.facet.name, e);
          },
          checked: checked
        }), /*#__PURE__*/react_default.a.createElement("label", {
          htmlFor: "".concat(_this2.props.name, ":").concat(item.value)
        }, item.value, ' ', /*#__PURE__*/react_default.a.createElement("span", {
          className: "cmp-search-filters__filter__item__count"
        }, "(", item.count, ")")));
      });
      return option;
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var className = "cmp-search-filters__filter ".concat(props.isExpanded ? 'expanded' : '');
      return /*#__PURE__*/react_default.a.createElement("li", {
        className: className,
        "data-locator": "search-filters-filter"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        href: "javascript:void(0);",
        className: "filter-toggle",
        item: props.item,
        onClick: function onClick(e) {
          return props.handleInput(e, props.item);
        },
        "data-locator": "link-search-filter"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.expandIcon,
        className: "expandIcon"
      }), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.collapseIcon,
        className: "collapseIcon"
      }), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.nextIcon,
        className: "mobileIcon"
      }), props.facet.translation), /*#__PURE__*/react_default.a.createElement("div", {
        className: "facet-container"
      }, this.getFacetSearch(this.props.facet.facets, this.props.minItemSearch), /*#__PURE__*/react_default.a.createElement("ul", null, this.getFacetOptions())));
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

      if (this.props.showTagsOnly) return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
      var props = this.props;
      var mappings = this.state.facetGroups;
      var filters = Array.isArray(mappings) ? mappings.map(function (item, index) {
        return /*#__PURE__*/react_default.a.createElement(filter_section, {
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
      return /*#__PURE__*/react_default.a.createElement("ul", null, filters);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react_default.a.createElement("div", {
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
// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js
var react_select_esm = __webpack_require__(40);

// EXTERNAL MODULE: ./src/styles/variables.scss
var variables = __webpack_require__(17);
var variables_default = /*#__PURE__*/__webpack_require__.n(variables);

// CONCATENATED MODULE: ./src/search/components/category-dropdown.js






/* istanbul ignore next */

var customStyles = {
  indicatorSeparator: function indicatorSeparator() {
    return {
      display: 'none'
    };
  },
  option: function option(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      color: variables_default.a.colorGray50,
      padding: '0.75em 1em',
      backgroundColor: state.isSelected ? variables_default.a.colorBackgroundLight : variables_default.a.colorWhite,
      cursor: !state.isSelected ? 'pointer' : 'default',
      '&:hover': {
        color: !state.isSelected ? variables_default.a.colorBlue50 : variables_default.a.colorGray50,
        backgroundColor: !state.isSelected ? variables_default.a.colorWhite : variables_default.a.colorBackgroundLight
      },
      margin: 0
    });
  },
  control: function control(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      'border-radius': variables_default.a.borderRadius,
      padding: '0.3em 0.5em',
      color: variables_default.a.colorGray50,
      'border-color': state.isFocused ? variables_default.a.colorBorderDark : variables_default.a.colorBorderDark,
      outline: 'none',
      cursor: 'pointer',
      'box-shadow': 'none',
      '&:hover': {
        outline: 'none',
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
      width: 'calc(100% - 2px)',
      marginLeft: '1px',
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
};

var category_dropdown_DropdownIndicator = function DropdownIndicator(props) {
  return /*#__PURE__*/react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.theme.dropdownIndicator,
    className: "dropDownIcon"
  }));
};

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

var category_dropdown_CategoryDropdown = function CategoryDropdown(props) {
  var options = category_dropdown_getOptions(props.categoryOptions);

  var mobileView = function mobileView() {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-search-category-dropdown"
    }, /*#__PURE__*/react_default.a.createElement(react_select_esm["c" /* default */], {
      options: options,
      value: options[props.categoryValue],
      onChange: props.categoryOnChange,
      isSearchable: props.categoryIsSearchable,
      styles: customStyles,
      placeholder: props.categoryPlaceholder,
      classNamePrefix: 'cmp-custom-dropdown',
      components: {
        DropdownIndicator: category_dropdown_DropdownIndicator
      },
      theme: {
        dropdownIndicator: props.categoryDownIcon
      }
    }));
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, screenSizes["a" /* default */].isTabletAndUnder() ? mobileView() : null);
};

category_dropdown_CategoryDropdown.defaultProps = {
  categoryOptions: [],
  categoryOnChange: function categoryOnChange() {},
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search-hide-btn clearfix"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        href: "javascript:void(0);",
        onClick: props.onClick,
        className: "btn-hide-sort-filter",
        "data-locator": "link-hide-search-button"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.closeIcon
      }), props.text.sortAndFilterButton));
    }
  }]);

  return HideSortFilter;
}(react["Component"]);

/* harmony default export */ var btn_hide_sort_filter = (btn_hide_sort_filter_HideSortFilter);
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(21);

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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search-apply-btn"
      }, /*#__PURE__*/react_default.a.createElement("a", {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search-done-btn"
      }, /*#__PURE__*/react_default.a.createElement("a", {
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
// CONCATENATED MODULE: ./src/search/components/dropdown.js





var dropdown_customStyles = {
  indicatorSeparator: function indicatorSeparator() {
    return {
      display: 'none'
    };
  },
  option: function option(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      color: variables_default.a.colorGray50,
      padding: '0.75em 1em',
      backgroundColor: state.isSelected ? variables_default.a.colorBackgroundLight : variables_default.a.colorWhite,
      cursor: !state.isSelected ? 'pointer' : 'default',
      '&:hover': {
        color: !state.isSelected ? variables_default.a.colorBlue50 : variables_default.a.colorGray50,
        backgroundColor: !state.isSelected ? variables_default.a.colorWhite : variables_default.a.colorBackgroundLight
      },
      margin: 0
    });
  },
  control: function control(provided, state) {
    return Object(objectSpread["a" /* default */])({}, provided, {
      'border-radius': variables_default.a.borderRadius,
      padding: '0.3em 0.5em',
      color: variables_default.a.colorGray50,
      'border-color': state.isFocused ? variables_default.a.colorBorderDark : variables_default.a.colorBorderDark,
      outline: 'none',
      cursor: 'pointer',
      'box-shadow': 'none',
      '&:hover': {
        outline: 'none',
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
      width: 'calc(100% - 2px)',
      marginLeft: '1px',
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
};

var dropdown_DropdownIndicator = function DropdownIndicator(props) {
  return /*#__PURE__*/react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.theme.dropdownIndicator
  }));
};

var dropdown_Dropdown = function Dropdown(props) {
  return /*#__PURE__*/react_default.a.createElement("div", {
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, /*#__PURE__*/react_default.a.createElement(react_select_esm["c" /* default */], {
    defaultValue: props.getOptions(props.text)[1],
    options: props.getOptions(props.text),
    value: props.sortValue && props.sortValue.value ? props.sortValue.value : props.getOptions(props.text)[props.sortValue - 1],
    onChange: props.onChange,
    isSearchable: props.isSearchable,
    styles: dropdown_customStyles,
    placeholder: props.placeholder,
    classNamePrefix: 'cmp-custom-dropdown',
    components: {
      DropdownIndicator: dropdown_DropdownIndicator
    },
    theme: {
      dropdownIndicator: props.text.downIcon
    },
    tabIndex: "-1"
  }));
};

dropdown_Dropdown.defaultProps = {
  isSearchable: false,
  placeholder: ''
};
/* harmony default export */ var dropdown = (dropdown_Dropdown);
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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search-sortby",
    "data-locator": "sortby-label"
  }, /*#__PURE__*/react_default.a.createElement("h3", null, props.text.sortByHeading), /*#__PURE__*/react_default.a.createElement(dropdown, {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-search-show-btn"
      }, /*#__PURE__*/react_default.a.createElement("a", {
        ref: this.sortFilterBtnRef,
        href: "javascript:void(0);",
        onClick: this.handleInput,
        className: "btn-show-sort-filter"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.filterIcon,
        className: "filterIcon"
      }), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: props.text.closeIcon,
        className: "closeIcon"
      }), props.text.sortAndFilterButton));
    }
  }]);

  return ShowSortFilter;
}(react["Component"]);

/* harmony default export */ var btn_show_sort_filter = (btn_show_sort_filter_ShowSortFilter);
// CONCATENATED MODULE: ./src/search/components/results-count.js


var results_count_ResultsCount = function ResultsCount(props) {
  var endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
  var startResults = props.current * props.rows - props.rows + 1;
  var maxLength = 120;
  var searchQuery = props.query && props.query.toString().length > maxLength ? props.query.substring(0, maxLength) + '...' : props.query;

  var renderSearchTerm = function renderSearchTerm() {
    return props.spell_suggestion ? getSuggestedQueryInfo() : getSearchQuery();
  };

  var getSuggestedQueryInfo = function getSuggestedQueryInfo() {
    return /*#__PURE__*/react_default.a.createElement("span", null, "for\xA0", /*#__PURE__*/react_default.a.createElement("span", {
      className: "text-strike"
    }, searchQuery), "\xA0", /*#__PURE__*/react_default.a.createElement("strong", null, /*#__PURE__*/react_default.a.createElement("q", {
      className: "query"
    }, props.spell_suggestion), "."));
  };

  var getSearchQuery = function getSearchQuery() {
    return /*#__PURE__*/react_default.a.createElement("span", null, "for\xA0", /*#__PURE__*/react_default.a.createElement("strong", null, /*#__PURE__*/react_default.a.createElement("q", {
      className: "query"
    }, searchQuery), "."));
  };

  var renderRelatedSuggestions = function renderRelatedSuggestions() {
    return props.spell_related_suggestions.length !== 0 ? /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-search__related-suggestions"
    }, "Related Searches ", getRelatedSuggestions()) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  };

  var getRelatedSuggestions = function getRelatedSuggestions() {
    return props.spell_related_suggestions.length === 1 ? getRelatedSuggestionLink(props.spell_related_suggestions[0]) : getRelatedSuggestionLinks(props.spell_related_suggestions).reduce(function (prev, curr) {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, prev, /*#__PURE__*/react_default.a.createElement("span", {
        className: "vertical-bar"
      }, "|"), curr);
    });
  };

  var getRelatedSuggestionLink = function getRelatedSuggestionLink(word) {
    return /*#__PURE__*/react_default.a.createElement("a", {
      className: "item",
      onClick: function onClick(e) {
        return props.onRelatedSuggestionClick(word);
      }
    }, word);
  };

  var getRelatedSuggestionLinks = function getRelatedSuggestionLinks(words) {
    return words.map(function (word) {
      return getRelatedSuggestionLink(word);
    });
  };

  var getResultsText = function getResultsText() {
    return props.text.resultsText.replace(/[{]startResults[}]/, startResults.toLocaleString(undefined, {
      maximumFractionDigits: 0
    })).replace(/[{]endResults[}]/, endResults.toLocaleString(undefined, {
      maximumFractionDigits: 0
    })).replace(/[{]count[}]/, props.count.toLocaleString(undefined, {
      maximumFractionDigits: 0
    }));
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__resultsCount-container",
    "data-locator": "results-count-container"
  }, /*#__PURE__*/react_default.a.createElement("h2", {
    className: "cmp-search__resultsCount",
    "data-locator": "results-count"
  }, getResultsText(), props.noQuery || props.query === '*:*' ? null : renderSearchTerm()), renderRelatedSuggestions());
};

/* harmony default export */ var results_count = (results_count_ResultsCount);
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
          category.push( /*#__PURE__*/react_default.a.createElement("a", {
            key: "facetTag-".concat(_i),
            href: "javascript:void(0);",
            onClick: function onClick() {
              return props.removeTag({
                categoryId: cat.name,
                facet: selected
              });
            }
          }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
            src: props.text.closeIcon
          }), /*#__PURE__*/react_default.a.createElement("span", null, cat.translation, ": ", selected)));
        }
      };

      for (var n = 0; n < mapping.length; n++) {
        _loop2(n);
      }
    };

    for (var _i2 = 0; _i2 < f.length; _i2++) {
      _loop(_i2);
    }

    return category;
  }) : null;
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, props.selectedFacets && tags);
};

var filter_tags_ContentTypeTag = function ContentTypeTag(props) {
  var showTags = Object.entries(props.selected).length !== 0 ? true : false;
  if (!showTags) return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  return /*#__PURE__*/react_default.a.createElement("a", {
    href: "javascript:void(0);",
    onClick: props.onRemove,
    "data-locator": "content-type-tag-hide"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), /*#__PURE__*/react_default.a.createElement("span", null, "".concat(props.text['contentType'], ": ").concat(props.selected.facetTranslation)));
};

var filter_tags_ClearAllTag = function ClearAllTag(props) {
  return /*#__PURE__*/react_default.a.createElement("a", {
    href: "javascript:void(0);",
    className: "cmp-search-filters__tags__clear",
    "data-locator": "link-search-filters-tag-clear",
    "aria-label": props.text.clearAllFilters,
    onClick: props.onRemove
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), /*#__PURE__*/react_default.a.createElement("span", null, props.text.clearAllFilters));
};

var filter_tags_KeywordTag = function KeywordTag(props) {
  return /*#__PURE__*/react_default.a.createElement("a", {
    href: "javascript:void(0);",
    "aria-label": "".concat(props.text.keyWordLabel, ": ").concat(props.keyword),
    onClick: props.onRemove
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: props.text.closeIcon
  }), /*#__PURE__*/react_default.a.createElement("span", null, "".concat(props.text.keyWordLabel, ": ").concat(props.keyword)));
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
var ErrorMessages = __webpack_require__(53);

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
      return /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, ErrorMessages["a" /* default */].ErrorMessages(this.props.errorObj).serviceUnavailable, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.skuInfo.lowStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--outofstock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-outofstock")
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, ErrorMessages["a" /* default */].ErrorMessages(this.props.errorObj).tryAgainLater));
    }
  }, {
    key: "renderInStock",
    value: function renderInStock() {
      return /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.inStockLabel, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.skuInfo.inStockIcon,
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails--instock"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails-instock")
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-".concat(this.props.skuType, "__order"),
        "data-locator": "sku-".concat(this.props.skuType, "-order")
      }, this.props.skuInfo.orderNowLabel));
    }
  }, {
    key: "renderContactWaters",
    value: function renderContactWaters() {
      return /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement("span", {
        className: "cmp-sku-".concat(this.props.skuType, "__stockdetails"),
        "data-locator": "sku-".concat(this.props.skuType, "-stockdetails")
      }, this.props.skuInfo.contactWatersLabel), /*#__PURE__*/react_default.a.createElement("div", {
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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: priceLabelClass,
        "data-locator": "sku-price-label",
        "aria-label": this.props.label
      }, this.props.label), this.props.price && /*#__PURE__*/react_default.a.createElement("div", {
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
// CONCATENATED MODULE: ./src/sku-details/views/unavailablePrice.js




function UnavailablePrice(props) {
  var label = props.label,
      icon = props.icon,
      text = props.text;
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("label", {
    className: "cmp-sku-list__cust-price-label",
    "data-locator": "sku-price-label",
    "aria-label": label
  }, label), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-sku-list__unavailable"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    "aria-hidden": "true",
    src: icon,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("icon ".concat(text))
  }), /*#__PURE__*/react_default.a.createElement("span", {
    "aria-label": text,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(text)
  }, text)));
}

/* harmony default export */ var unavailablePrice = (UnavailablePrice);
// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(36);

// EXTERNAL MODULE: ./src/stores/localStore.js
var stores_localStore = __webpack_require__(47);

// EXTERNAL MODULE: ./src/utils/serviceFunctions.js
var serviceFunctions = __webpack_require__(70);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(14);

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
      skulist.SkuRemoveNegative(e);
    };

    _this.skuQuantityInput = function (e) {
      skulist.SkuQuantityInput(e);
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

      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("form", null, /*#__PURE__*/react_default.a.createElement("input", {
        className: "cmp-sku-details__quantity",
        placeholder: "Qty",
        value: this.state.addToCartQty,
        onChange: this.skuQuantityInput,
        onKeyPress: this.skuRemoveNegative,
        "data-locator": "input-sku-qty",
        "aria-label": this.props.qtyLabel
      })), /*#__PURE__*/react_default.a.createElement("a", {
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
var addToCartModal = __webpack_require__(35);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(20);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var utils_spinner = __webpack_require__(29);

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
      return /*#__PURE__*/react_default.a.createElement("a", {
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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, Array.isArray(_this.props.message) && _this.props.message.length > 0 && _this.props.message.map(function (block, index) {
        var itemToRender = block.type === 'link' ? _this.renderLink(block) : _this.renderText(block);
        var space = '';

        if (block.rightSpace !== 'false' || typeof block.rightSpace == 'undefined') {
          space = ' ';
        }

        return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, {
          key: index
        }, itemToRender, space);
      }));
    };

    _this.displaySkuMsg = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, _this.props.message, _this.props.linkMessage && _this.props.link && /*#__PURE__*/react_default.a.createElement("a", {
        href: _this.props.link
      }, _this.props.linkMessage));
    };

    return _this;
  }

  Object(createClass["a" /* default */])(SkuMessage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-notification-wrapper ".concat(Array.isArray(this.props.message) ? 'sku-error-code' : ''),
        "data-locator": "sku-msg-notification-wrapper"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.icon,
        className: "cmp-notification-icon",
        "data-locator": "sku-msg-notification-icon"
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-notification-body",
        "data-locator": "sku-msg-notification-body"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-notification-description",
        "data-locator": "sku-msg-notification-description"
      }, Array.isArray(this.props.message) ? this.displayError() : this.displaySkuMsg())));
    }
  }]);

  return SkuMessage;
}(react_default.a.Component);

/* harmony default export */ var sku_message = (sku_message_SkuMessage);
// CONCATENATED MODULE: ./src/constants/index.js
var BAD_REQUEST_CODE = 400;
var SERVER_ERROR_CODE = 500;
var UNAVAILABLE_PRICE_WITH_ADD_TO_CART = 'unavailable_price_with_add-to-cart';
var LIST_PRICE_WITH_ADD_TO_CART = 'list_price_with_add-to-cart';
var NO_PRICE_NO_ADD_TO_CART = 'no_price_no_add-to-cart';
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
            errorPriceType: [BAD_REQUEST_CODE, SERVER_ERROR_CODE].includes(Object(eCommerceFunctions["b" /* getHttpStatusFromErrors */])(response.errors, response.status)) ? Object(userFunctions["p" /* isEprocurementUser */])() ? UNAVAILABLE_PRICE_WITH_ADD_TO_CART : LIST_PRICE_WITH_ADD_TO_CART : NO_PRICE_NO_ADD_TO_CART,
            loading: false
          });
        }
      })["catch"](function (err) {
        // Add Error Object to State
        _this.setState({
          errorPriceType: NO_PRICE_NO_ADD_TO_CART,
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
        if (sku_details.exists()) {
          if (!_this.state.modalShown) {
            //Firefox bug -->
            //if on a sku page and the modal was just open, make call to check whether to stick again
            //this will unstick the current element if necessary
            var SKUDetailsSticky = stickyService.findStickyEl(sku_details.element);

            if (SKUDetailsSticky) {
              stickyService.conditionsToStick(SKUDetailsSticky);
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

      if (errorPriceType === UNAVAILABLE_PRICE_WITH_ADD_TO_CART) {
        return /*#__PURE__*/react_default.a.createElement(unavailablePrice, {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined') {
          return /*#__PURE__*/react_default.a.createElement(views_price, {
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
          return /*#__PURE__*/react_default.a.createElement(views_price, {
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
      }, loading ? /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        onClick: function onClick(e) {
          return _this.checkAvailability(relatedSku.code);
        }
      }, (skuAvailability.productStatus || _this.state && errorObjAvailability && errorObjAvailability.ok === false) && /*#__PURE__*/react_default.a.createElement(stock, {
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
      }, /*#__PURE__*/react_default.a.createElement(views_addToCart, {
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
      }), /*#__PURE__*/react_default.a.createElement(addToCartModal["a" /* default */], {
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

        return /*#__PURE__*/react_default.a.createElement(sku_message, {
          icon: skuConfig.skuInfo.lowStockIcon,
          message: discontinuedMessage,
          link: relatedSku.replacementskuurl,
          linkMessage: relatedSku.replacementskucode
        });
      } else if (_this.state.errorPriceType === NO_PRICE_NO_ADD_TO_CART) {
        return /*#__PURE__*/react_default.a.createElement(sku_message, {
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
        context: sku_details.exists() ? analytics["d" /* relatedCartContext */] : analytics["e" /* searchCartContext */],
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
      return /*#__PURE__*/react_default.a.createElement("div", {
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
// CONCATENATED MODULE: ./src/scripts/signIn.js





var signIn_SignIn = function SignIn(props) {
  var onSignIn = function onSignIn(e) {
    e.preventDefault();
    var store = new stores_sessionStore["a" /* default */]();
    store.setSignInRedirect(window.location.href);
    window.location.href = props.signInUrl;
  };

  if (!Object(eCommerceFunctions["d" /* isSignInHidden */])()) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-sku-signin-wrapper",
      "data-locator": "sku-signin-wrapper"
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-sku-signin",
      "data-locator": "sku-signin"
    }, /*#__PURE__*/react_default.a.createElement("a", Object.assign({
      className: "signin-link",
      "data-locator": "signin-link"
    }, {
      onClick: function onClick(e) {
        return onSignIn(e);
      },
      rel: 'nofollow'
    }), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: props.signInIcon,
      className: "signin-icon",
      "data-locator": "signin-icon"
    }), /*#__PURE__*/react_default.a.createElement("span", {
      className: "signin-part1",
      "data-locator": "signin-part1"
    }, props.signInText1)), /*#__PURE__*/react_default.a.createElement("span", {
      className: "signin-part2",
      "data-locator": "signin-part2"
    }, props.signInText2), /*#__PURE__*/react_default.a.createElement("span", {
      className: "signin-part3",
      "data-locator": "signin-part3"
    }, props.signInText3)));
  } else {
    return null;
  }
};

/* harmony default export */ var scripts_signIn = (signIn_SignIn);
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
        return /*#__PURE__*/react_default.a.createElement(scripts_signIn, {
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
    key: "render",
    value: function render() {
      var _this2 = this;

      var signIn = this.renderSignIn();
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.props.data.length > 0 &&
      /*#__PURE__*/
      //only return template if data exists
      react_default.a.createElement(react_default.a.Fragment, null, this.props.title && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-list__title"
      }, this.props.title), signIn, this.props.data.map(function (record, index) {
        return /*#__PURE__*/react_default.a.createElement(listItem, {
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
var lib = __webpack_require__(78);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./src/search/components/results.js




var results_Result = function Result(_ref) {
  var result = _ref.result,
      locale = _ref.locale,
      nextIcon = _ref.nextIcon,
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
  }, result.title)), /*#__PURE__*/react_default.a.createElement("div", {
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

var results_Results = function Results(_ref2) {
  var results = _ref2.results,
      locale = _ref2.locale,
      nextIcon = _ref2.nextIcon,
      onItemClick = _ref2.onItemClick;
  var mappedResults = Array.isArray(results) ? results.map(function (result, i) {
    return /*#__PURE__*/react_default.a.createElement(results_Result, {
      result: result,
      locale: locale,
      nextIcon: nextIcon,
      key: i,
      onItemClick: onItemClick
    });
  }) : [];
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__results-container"
  }, /*#__PURE__*/react_default.a.createElement("ul", {
    className: "cmp-search__results"
  }, mappedResults));
};

/* harmony default export */ var components_results = (results_Results);
// CONCATENATED MODULE: ./src/search/search.component.helpers.js




















var search_component_helpers_FilterTagList = function FilterTagList(_ref) {
  var text = _ref.text,
      filterMap = _ref.filterMap,
      filterTagsProps = _ref.filterTagsProps,
      filterTagsEvents = _ref.filterTagsEvents;
  var isKeywordSpecified = filterTagsProps.keyword && filterTagsProps.keyword !== services["b" /* parameterDefaults */].keyword;
  var isContentTypeSelected = Object.entries(filterTagsProps.contentTypeSelected).length !== 0 && filterTagsProps.contentTypeSelected.facetTranslation;

  if (!isKeywordSpecified && !isContentTypeSelected) {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-search-filters__emptytags"
    });
  }

  var keyword = filterTagsProps.spell_suggestion ? filterTagsProps.spell_suggestion : filterTagsProps.keyword;
  var keyWordTag = isKeywordSpecified ? /*#__PURE__*/react_default.a.createElement(filter_tags_KeywordTag, {
    keyword: keyword,
    text: text,
    onRemove: filterTagsEvents.onKeywordRemove
  }) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  var contentTypeTag = isContentTypeSelected ? /*#__PURE__*/react_default.a.createElement(filter_tags_ContentTypeTag, {
    text: text,
    selected: filterTagsProps.contentTypeSelected,
    onRemove: filterTagsEvents.onContentTypeRemove
  }) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  var subFacetTags = Object.entries(filterTagsProps.selectedFacets).length !== 0 ? /*#__PURE__*/react_default.a.createElement(filter_tags_SubFacetTags, {
    text: text,
    selectedFacets: filterTagsProps.selectedFacets,
    facets: filterTagsProps.facets,
    removeTag: filterTagsEvents.onSubFacetRemove,
    filterMap: filterMap,
    defaultFacet: filterTagsProps.contentType
  }) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search-filters__tags clearfix",
    "data-locator": "search-filters-tags"
  }, /*#__PURE__*/react_default.a.createElement(filter_tags_ClearAllTag, {
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
      children = _ref2.children;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "container__left cmp-search__sort-filter",
    "data-locator": "left-container-filter"
  }, /*#__PURE__*/react_default.a.createElement(btn_hide_sort_filter, {
    text: text,
    onClick: asideEvents.onHideSortFilterClick
  }), /*#__PURE__*/react_default.a.createElement(btn_apply_sort_filter, {
    text: text,
    applyFilters: asideEvents.onApplySortFilter,
    isPristine: asideProps.sortFilterIsPristine,
    count: asideProps.count
  }), /*#__PURE__*/react_default.a.createElement(btn_done_sort_filter, {
    text: text,
    collapseFilters: asideEvents.onCollapseFilters
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__sort-filter__container"
  }, /*#__PURE__*/react_default.a.createElement(sort, {
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
    return /*#__PURE__*/react_default.a.createElement(content_type_menu, {
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
    return /*#__PURE__*/react_default.a.createElement(facet_menu, {
      heading: menuProps.heading,
      selectedValue: facetMenuProps.selectedValue,
      previousIcon: facetMenuProps.previousIcon,
      filterTags: filterTags,
      onClear: facetMenuEvents.onContentTypeRemoval
    }, /*#__PURE__*/react_default.a.createElement(filter, {
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
  return /*#__PURE__*/react_default.a.createElement(sku_list, {
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
    return /*#__PURE__*/react_default.a.createElement(search_component_helpers_SkuResults, {
      items: items,
      skuConfig: skuConfig,
      onItemClick: resultsEvents.onResultsItemClick
    });
  }

  return /*#__PURE__*/react_default.a.createElement(components_results, {
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
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  }

  var buildHref = function buildHref(href) {
    return "".concat(window.location.href, "/page/").concat(href);
  };

  return /*#__PURE__*/react_default.a.createElement(react_paginate_default.a, {
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
    previousLabel: /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: previousIcon
    }),
    nextLabel: /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__container"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__container__header clearfix"
  }, !isEprocurementUser && /*#__PURE__*/react_default.a.createElement(category_dropdown, {
    categoryDownIcon: text.downIcon,
    categoryIsSearchable: false,
    categoryOnChange: categoryEvents.onCategoryDropdownChange,
    categoryOptions: categoryProps.categories,
    categoryValue: categoryProps.activeIndex
  }), /*#__PURE__*/react_default.a.createElement(btn_show_sort_filter, {
    text: text,
    setupFilters: showSortFilterEvents.onSetupFilters,
    resetToSavedState: showSortFilterEvents.onResetToSavedState,
    collapseFilters: showSortFilterProps.collapseFilters,
    onClose: showSortFilterEvents.onClose
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__sorted-by"
  }, text.sortedBy, ":", ' ', asideProps.sortByText === 'most-relevant' ? text.sortByBestMatch : text.sortByMostRecent)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-search__sorted-container"
  }, /*#__PURE__*/react_default.a.createElement(results_count, Object.assign({}, resultsProps, {
    text: text,
    onRelatedSuggestionClick: resultsEvents.onRelatedSuggestionClick
  })), /*#__PURE__*/react_default.a.createElement(search_component_helpers_FilterTagList, {
    text: text,
    filterMap: filterMap,
    filterTagsProps: filterTagsProps,
    filterTagsEvents: filterTagsEvents
  }), /*#__PURE__*/react_default.a.createElement(search_component_helpers_ResultsContent, {
    text: text,
    filterMap: filterMap,
    skuConfig: skuConfig,
    searchParams: searchParams,
    resultsProps: resultsProps,
    resultsEvents: resultsEvents
  })), /*#__PURE__*/react_default.a.createElement(search_component_helpers_Pagination, {
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
      tabFader = fade_x('cmp-tabs', 0, 100);
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
/* harmony default export */ var tabs = (tabs_Tabs);
// CONCATENATED MODULE: ./src/search/search.component.js






var search_component_SearchComponent = function SearchComponent(props) {
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !props.isEprocurementUser && /*#__PURE__*/react_default.a.createElement(tabs, {
    className: "cmp-search__categories-tabs",
    items: props.categoryProps.categories,
    activeIndex: props.categoryProps.activeIndex,
    onClick: props.categoryEvents.onCategoryTabClick
  }), /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "overlay"
  }), /*#__PURE__*/react_default.a.createElement(search_component_helpers_Aside, {
    sortFilterIsPristine: props.asideProps.sortFilterIsPristine,
    text: props.text,
    asideProps: props.asideProps,
    asideEvents: props.asideEvents
  }, /*#__PURE__*/react_default.a.createElement(search_component_helpers_Menu, {
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
  })), /*#__PURE__*/react_default.a.createElement(search_component_helpers_ResultsBody, {
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
        activeTabIndex: -1,
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
        return category.count !== 0 && !!_this.findFacetNameProperty(_this.props.filterMap, category.value);
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
        newState.facets['activeIndex'] = "";
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
        return /*#__PURE__*/react_default.a.createElement(components_loading, {
          visible: true
        });
      }

      ;

      if (this.state.noResults) {
        return /*#__PURE__*/react_default.a.createElement(no_results, {
          searchText: this.props.searchText,
          query: this.state.keyword
        });
      }

      return /*#__PURE__*/react_default.a.createElement(search_component, {
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
var BrowserRouter = __webpack_require__(481);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(482);

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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, react_default.a.cloneElement(this.props.children, {
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
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(BrowserRouter["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(Route["a" /* default */], {
    path: "",
    render: function render() {
      return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(search_container, {
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

        return /*#__PURE__*/react_default.a.createElement("li", {
          className: "cmp-tag-cloud__item",
          key: i
        }, /*#__PURE__*/react_default.a.createElement("a", {
          onClick: boundItemClick
        }, keyword.title));
      });
      return [/*#__PURE__*/react_default.a.createElement("h3", null, this.props.tagCloudTitle), /*#__PURE__*/react_default.a.createElement("ul", {
        className: "cmp-tag-cloud__list"
      }, mappedResults)];
    }
  }]);

  return TagCloud;
}(react["Component"]);

/* harmony default export */ var tagcloud = (tagcloud_TagCloud);
// EXTERNAL MODULE: ./node_modules/hammerjs/hammer.js
var hammer = __webpack_require__(126);
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
      return /*#__PURE__*/react_default.a.createElement("figure", {
        ref: _this.figureRef,
        className: "image-viewer-container__image-figure image-viewer-container__image-figure--".concat(_this.state.magnified, " image-viewer-container__image-figure--zoomin-").concat(_this.state.magnified),
        style: {
          backgroundImage: "url(".concat(_this.state.imageSrc, ")")
        },
        onDragStart: _this.handleOnDragStart,
        onMouseMove: _this.handleFigureMouseMove,
        onTouchMove: _this.handleFigureTouchMove
      }, /*#__PURE__*/react_default.a.createElement("img", {
        className: "image-viewer-container__image-element",
        src: _this.state.imageSrc,
        alt: _this.props.alt,
        onLoad: _this.handleImageLoad
      }));
    };

    _this.renderZoomIcon = function () {
      return _this.state.magnified ? /*#__PURE__*/react_default.a.createElement("div", {
        onClick: _this.handleMagnifyClick
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.zoomOutIcon
      })) : /*#__PURE__*/react_default.a.createElement("div", {
        onClick: _this.handleMagnifyClick
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        ref: this.containerRef,
        className: "image-viewer-container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-viewer-container__image-display"
      }, this.renderImageDisplay(), /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-viewer-container__image-zoom"
      }, /*#__PURE__*/react_default.a.createElement("div", null, this.renderZoomIcon()))));
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
        return /*#__PURE__*/react_default.a.createElement("div", {
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

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-thumbnails-wrapper ".concat(this.getImageThumbnailsWrapperClassName()),
        style: this.getImageThumbnailsWrapperStyle()
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-thumbnails-button ".concat(this.getPrevButtonClassName()),
        onClick: function onClick(e) {
          return _this2.handleSlide(PREV);
        }
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: "/content/dam/waters/en/brand-assets/icons/left.svg"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-thumbnails-container",
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd
      }, /*#__PURE__*/react_default.a.createElement("div", {
        ref: this.gradientLeftRef,
        "class": "image-thumbnails-wrapper__gradient-left"
      }), this.renderItems(), /*#__PURE__*/react_default.a.createElement("div", {
        ref: this.gradientRightRef,
        "class": "image-thumbnails-wrapper__gradient-right"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-thumbnails-button ".concat(this.getNextButtonClassName()),
        onClick: function onClick(e) {
          return _this2.handleSlide(NEXT);
        }
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        style: {
          display: _this.state.activeIndex === index ? 'block' : 'none'
        }
      }, /*#__PURE__*/react_default.a.createElement(image_viewer, {
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
      return _this.props.templates.length > 1 ? /*#__PURE__*/react_default.a.createElement(image_thumbnails, {
        items: _this.getThumbnailImages(),
        onItemClick: _this.handleThumbnailClick,
        width: _this.state.figureWidth
      }) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
    };

    _this.getThumbnailImages = function () {
      return _this.props.templates.map(function (template) {
        return _this.mapTemplateToElement(template);
      });
    };

    _this.mapTemplateToElement = function (template) {
      return /*#__PURE__*/react_default.a.createElement("div", {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-carousel"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "image-viewer-placeholder"
      }, this.getImageViewerComponents()), /*#__PURE__*/react_default.a.createElement("div", {
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
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/react-html-parser/lib/index.js
var react_html_parser_lib = __webpack_require__(69);
var react_html_parser_lib_default = /*#__PURE__*/__webpack_require__.n(react_html_parser_lib);

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

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "greetings",
    "data-locator": "user-greeting-sec"
  }, /*#__PURE__*/react_default.a.createElement("h2", {
    "data-locator": "user-greeting"
  }, greetings), /*#__PURE__*/react_default.a.createElement("h3", {
    "data-locator": "user-greeting-name"
  }, react_html_parser_lib_default()(name.trim())), /*#__PURE__*/react_default.a.createElement("h4", {
    "data-locator": "user-greeting-company"
  }, react_html_parser_lib_default()(company.trim()))), !isImageHidden && /*#__PURE__*/react_default.a.createElement("img", {
    src: "".concat(logoDirectoryPath.replace(/\/$/, ''), "/").concat(company.trim().replace(/ /g, '-').toLowerCase(), ".png"),
    alt: company,
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
          maxInputLength = _this$props2.maxInputLength;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, showLabel && /*#__PURE__*/react_default.a.createElement("label", {
        htmlFor: id,
        className: "visually-hidden"
      }, name), /*#__PURE__*/react_default.a.createElement("input", {
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
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: "quick-order-parent",
    "data-locator": "quick-order"
  }, /*#__PURE__*/react_default.a.createElement(components_Input_Input, {
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
  }), /*#__PURE__*/react_default.a.createElement(views_addToCart, {
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
  })), /*#__PURE__*/react_default.a.createElement("a", {
    href: multipleItemsLink,
    className: "quick-order-multiple-item",
    "data-locator": "link-quick-order-add-multiple-item"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    "aria-hidden": "true",
    src: isMobile ? addItemsIcon : multipleItemsIcon,
    wrapper: "span",
    "data-locator": "add-multiple-item-icon"
  }), multipleItemsLabel), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
    isOpen: modalShown,
    onClose: toggleModal,
    className: "cmp-add-to-cart-modal"
  }, !(Object.keys(errorObjCart).length !== 0) && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
    title: modalConfig.title,
    icon: modalConfig.icon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTop,
    elementLocator: "quick-order-modal-header"
  }), Object.keys(errorObjCart).length !== 0 && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
    title: skuConfig.errorInfo.title,
    icon: skuConfig.errorInfo.icon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTopError,
    elementLocator: "quick-order-modal-header"
  }), /*#__PURE__*/react_default.a.createElement(addToCartModal["a" /* default */], {
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
  return /*#__PURE__*/react_default.a.createElement("a", {
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
// EXTERNAL MODULE: ./src/legal-link-modal/styles/index.scss
var legal_link_modal_styles = __webpack_require__(173);

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
  return /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
    isOpen: isOpen,
    onClose: onClose,
    className: "cmp-modal-legal-links"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-modal-body-legal-links custom-scroll"
  }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
    title: title,
    icon: props.docIcon,
    className: modal["c" /* keys */].HeaderWithAddedMarginTop
  }), /*#__PURE__*/react_default.a.createElement(addToCartModal["a" /* default */], {
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
            errorPriceType: [BAD_REQUEST_CODE, SERVER_ERROR_CODE].includes(Object(eCommerceFunctions["b" /* getHttpStatusFromErrors */])(response.errors, response.status)) ? Object(userFunctions["p" /* isEprocurementUser */])() ? UNAVAILABLE_PRICE_WITH_ADD_TO_CART : LIST_PRICE_WITH_ADD_TO_CART : NO_PRICE_NO_ADD_TO_CART,
            loading: false
          });
        }
      })["catch"](function () {
        // Add Error Object to State
        _this.setState({
          errorPriceType: NO_PRICE_NO_ADD_TO_CART,
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
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
        icon: _this.state.skuInfo.lowStockIcon,
        message: _this.props.countryRestricted
      });
    };

    _this.renderDiscontinued = function () {
      var discontinuedMessage = _this.props.config.skuInfo.discontinuedWithReplacementWithCode;

      if (!_this.props.replacementSkuCode || !_this.props.replacementSkuHref) {
        discontinuedMessage = _this.props.config.skuInfo.discontinuedNoReplacementCode;
      }

      return /*#__PURE__*/react_default.a.createElement(sku_message, {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: discontinuedMessage,
        link: _this.props.replacementSkuHref,
        linkMessage: _this.props.replacementSkuCode
      });
    };

    _this.renderEcommerceDisabled = function () {
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.disabledText
      });
    };

    _this.renderEcommercePartialDisabled = function () {
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
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
      var isHiddenListPrice = errorPriceType === NO_PRICE_NO_ADD_TO_CART && isStickyAvailable && Object(userFunctions["p" /* isEprocurementUser */])() ? true : false;

      if (errorPriceType === UNAVAILABLE_PRICE_WITH_ADD_TO_CART && !isStickyAvailable) {
        return /*#__PURE__*/react_default.a.createElement(unavailablePrice, {
          label: skuInfo.custPriceLabel,
          icon: skuInfo.lowStockIcon,
          text: skuInfo.unavailablePriceLabel
        });
      } else {
        if (typeof listPrice !== 'undefined' && !isHiddenListPrice) {
          return /*#__PURE__*/react_default.a.createElement(views_price, {
            label: skuInfo.listPriceLabel,
            price: listPrice,
            isListPrice: true
          });
        } else {
          return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
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
          return /*#__PURE__*/react_default.a.createElement(views_price, {
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

      var isHiddenAddToCart = errorPriceType === NO_PRICE_NO_ADD_TO_CART && isStickyAvailable ? true : false;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__buyinfo",
        "data-locator": "sku-details-buyinfo"
      }, loginStatus["a" /* default */].state() && typeof custPrice !== 'undefined' && custPrice !== listPrice && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__list-price"
      }, "".concat(skuInfo.listPriceLabel, " ").concat(listPrice)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__priceinfo",
        "data-locator": "sku-details-priceinfo"
      }, loading ? /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
        loading: loading,
        type: "inline"
      }) : _this.renderPricing()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__availability",
        "data-locator": "sku-details-availability"
      }, /*#__PURE__*/react_default.a.createElement(stock, {
        skuInfo: skuInfo,
        skuNumber: skuNumber,
        skuAvailability: skuAvailability,
        skuType: "details",
        errorObj: errorObjAvailability
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-sku-details__buttons".concat(isHiddenAddToCart ? ' cmp-sku-details__add-to-cart-hide' : ''),
        "data-locator": "sku-details-add-to-cart-sec"
      }, /*#__PURE__*/react_default.a.createElement(views_addToCart, {
        toggleParentModal: _this.toggleModal,
        skuNumber: skuNumber,
        addToCartLabel: config.addToCartLabel,
        addToCartQty: config.defaultSkuQty,
        addToCartUrl: config.addToCartUrl,
        isCommerceApiMigrated: config.isCommerceApiMigrated,
        toggleErrorModal: _this.toggleErrorModal,
        analyticsConfig: _this.state.analyticsConfig
      })), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: _this.state.modalShown,
        onClose: _this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, !isErrorModal && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: _this.state.modalConfig.title,
        icon: _this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop,
        elementLocator: "add-to-cart-modal-header"
      }), isErrorModal && /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: _this.state.errorInfo.title,
        icon: _this.state.errorInfo.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTopError,
        elementLocator: "add-to-cart-modal-header"
      }), /*#__PURE__*/react_default.a.createElement(addToCartModal["a" /* default */], {
        config: _this.state.modalConfig,
        errorObjCart: _this.state.errorObjCart
      })));
    };

    _this.renderActiveSku = function () {
      if (ecommerce["a" /* default */].isDisabledState()) {
        return _this.renderEcommerceDisabled();
      } else {
        if (ecommerce["a" /* default */].isPartialState() && loginStatus["a" /* default */].state() && checkOutStatus["a" /* default */].state() || !ecommerce["a" /* default */].isPartialState() && !ecommerce["a" /* default */].isDisabledState()) {
          return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !loginStatus["a" /* default */].state() && /*#__PURE__*/react_default.a.createElement(scripts_signIn, {
            signInUrl: _this.props.config.baseSignInUrl,
            signInIcon: _this.state.skuInfo.signinIcon,
            signInText1: _this.state.skuInfo.signInText1,
            signInText2: _this.state.skuInfo.signInText2,
            signInText3: _this.state.skuInfo.signInText3
          }) || loginStatus["a" /* default */].state() && /*#__PURE__*/react_default.a.createElement("div", {
            className: "cmp-sku-signin-wrapper-not-displayed"
          }), _this.renderBuyInfo());
        } else {
          return _this.renderEcommercePartialDisabled();
        }
      }
    };

    _this.renderEProcurementUserRestricted = function () {
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
        icon: _this.props.config.commerceConfig.disabledIcon,
        message: _this.props.config.commerceConfig.eProcurementRestrictedText
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
        icon: _this.props.config.skuInfo.lowStockIcon,
        message: _this.props.config.skuInfo.skuErrorMessage
      });
    };

    _this.renderSkuPriceErrorMsg = function () {
      return /*#__PURE__*/react_default.a.createElement(sku_message, {
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
      } else if (this.state.errorPriceType === NO_PRICE_NO_ADD_TO_CART && !this.state.isStickyAvailable) {
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
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/react-hook-form.ie11.js
var react_hook_form_ie11 = __webpack_require__(127);
var react_hook_form_ie11_default = /*#__PURE__*/__webpack_require__.n(react_hook_form_ie11);

// EXTERNAL MODULE: ./src/forms/fields/utils/stateWatcher.js + 1 modules
var stateWatcher = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js
var objectDestructuringEmpty = __webpack_require__(32);

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
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form-field cmp-form-field-".concat(type)
    }, children);
  };

  var renderValid = function renderValid() {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form-field cmp-form-field-".concat(type, " cmp-form-field--valid")
    }, children);
  };

  var renderInvalid = function renderInvalid() {
    return /*#__PURE__*/react_default.a.createElement("div", {
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

  var eyeIcons = type === 'password' ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.eyeIcon,
    className: "showHide-icon toggled",
    onMouseDown: toggleEye
  }), /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.eyeOffIcon,
    className: "showHideOff-icon",
    onMouseDown: toggleEye
  })) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field--icons"
  }, eyeIcons, !disabled && /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.validIcon,
    className: "valid-icon"
  }), !disabled && /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.invalidIcon,
    className: "invalid-icon"
  }), disabled && /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
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

  var errors = Object(stateWatcher["c" /* useErrorsContext */])();

  var getInfo = function getInfo() {
    var fieldErr = errors[name];
    var message = '';
    var link = /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null);

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
            break;
          }

          message = fieldErr.message || validation.validationMsg || validation.requiredMsg;
          break;

        default:
          message = fieldErr.message;
          break;
      }
    }

    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, message, link);
  };

  var showSignIn = function showSignIn() {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, validation.alreadyRegisteredMsg, /*#__PURE__*/react_default.a.createElement("a", {
      href: validation.signInURL,
      className: "cmp-sign-in-link"
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: icons.signInIcon,
      className: "email-signin"
    }), validation.signInMsg));
  };

  return /*#__PURE__*/react_default.a.createElement("span", {
    className: "cmp-form-field--errorText"
  }, getInfo());
};

/* harmony default export */ var displaymessage = (react_default.a.memo(displaymessage_DisplayMessage));
// EXTERNAL MODULE: ./src/forms/fields/patterns/index.js + 1 modules
var patterns = __webpack_require__(44);

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
      return /*#__PURE__*/react_default.a.createElement("div", {
        key: "requirements-info-".concat(key)
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        id: name,
        src: icons.checkmarkIcon,
        className: validFields[key] ? "valid requirements-info-svg" : "requirements-info-svg"
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "requirements-info"
      }, msg));
    });
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field--input-requirements" + (toggled ? " toggled" : "")
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "requirements-title"
  }, header), renderRequirementFields());
};

/* harmony default export */ var components_requirements = (Object(react["forwardRef"])(requirements_Requirements));
// EXTERNAL MODULE: ./src/forms/fields/utils/validations.js
var validations = __webpack_require__(79);

// EXTERNAL MODULE: ./src/utils/labelFunctions.js
var labelFunctions = __webpack_require__(49);

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
      formName = _useContext2.formName;

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
    switch (type) {
      case "text":
        {
          // use react-hook-form validation
          setValue(name, inputRef.current.value, true);
          break;
        }

      case "email":
        {
          if (patterns["a" /* functions */][validation.validateFnName](inputRef.current.value, inputRef.current, validation.requiredMsg, setError, clearError) === false) {
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
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("label", {
      htmlFor: name,
      className: validation.validateFnName === 'matching' ? 'cmp-form-field--label-matching' : '',
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
    }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form_description"
    }, description), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form-field--input"
    }, /*#__PURE__*/react_default.a.createElement("input", {
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
    }), /*#__PURE__*/react_default.a.createElement(components_icons, null)), /*#__PURE__*/react_default.a.createElement(displaymessage, {
      name: name,
      validation: validation
    }), validation.validateFnName === 'password' && validation.requirements && /*#__PURE__*/react_default.a.createElement(components_requirements, {
      header: validation.requirementsLabel,
      requirements: validation.requirements,
      ref: reqRef
    }));
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, renderInput(), hasMatch && Object(react["useMemo"])(function () {
    return /*#__PURE__*/react_default.a.createElement(Input, {
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
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("label", {
      htmlFor: name,
      className: validation.validateFnName === 'matching' ? 'cmp-form-field--label-matching' : '',
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
    }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form_description"
    }, description), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form-field--textarea"
    }, /*#__PURE__*/react_default.a.createElement("textarea", {
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
    })), /*#__PURE__*/react_default.a.createElement("div", {
      className: "textarea-info"
    }, /*#__PURE__*/react_default.a.createElement(displaymessage, {
      name: name,
      validation: validation
    }), showTextInfo && /*#__PURE__*/react_default.a.createElement("div", {
      "data-locator": "text-info",
      className: "text-info ".concat(textInfo.isCharOver ? 'errorText' : '')
    }, "".concat(textInfo.remainingChar, " ").concat(textInfo.text))));
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, renderTextArea(), hasMatch && Object(react["useMemo"])(function () {
    return /*#__PURE__*/react_default.a.createElement(TextArea, {
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

    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, formattedLabel + ' ', renderAddOnLink(thisName), !state[thisName].required && type !== 'radio' && optionalLabel && /*#__PURE__*/react_default.a.createElement("span", {
      className: "cmp-form-field--optional"
    }, optionalLabel));
  };

  var renderAddOnLink = function renderAddOnLink(thisName) {
    var thisState = state[thisName];
    return thisState.text && thisState.link && thisState.blank && /*#__PURE__*/react_default.a.createElement("a", {
      href: thisState.link,
      target: thisState ? '_blank' : '',
      rel: "noopener noreferrer",
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(thisState.text || 'add-on-link')
    }, thisState.text);
  };

  var renderType = function renderType(thisName, label) {
    var thisState = state[thisName];
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("input", {
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
    }), /*#__PURE__*/react_default.a.createElement("a", {
      className: "".concat(type, " ") + (disabled ? ' disabled' : '') + (hasError(thisName) ? ' error' : ' valid'),
      onClick: function onClick(e) {
        return checkHandler(e, thisName);
      },
      id: thisName + '_link'
    }, type == 'checkbox' ? /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: icons.checkmarkIcon
    }) : /*#__PURE__*/react_default.a.createElement("div", {
      className: "selector"
    })), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-form-field-".concat(type, "--wrapper") + (disabled ? ' disabled' : '')
    }, /*#__PURE__*/react_default.a.createElement("label", {
      htmlFor: thisName,
      onClick: function onClick(e) {
        return checkHandler(e, thisName);
      }
    }, renderLabel(thisName, label)), thisState.description && /*#__PURE__*/react_default.a.createElement("span", {
      "class": "cmp-form_description"
    }, thisState.description)));
  };

  try {
    return !options ? renderType(name, label) : /*#__PURE__*/react_default.a.createElement("div", {
      id: name,
      className: "cmp-form-field-".concat(type, "--grouping")
    }, options.map(function (option, i) {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        style: {
          paddingTop: "10px"
        },
        className: "cmp-form-field-".concat(type, "--grouping-item"),
        key: "".concat(type, "-").concat(name, "-grouping-").concat(i)
      }, renderType(option.name, option.label)), option.accountStreet && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-form-field-".concat(type, "--address1")
      }, option.accountStreet), option.accountCity && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-form-field-".concat(type, "--address1")
      }, option.accountCity + ", " + option.state + " " + option.accountZip));
    }));
  } catch (error) {
    console.log("error ", error);
  }
};

/* harmony default export */ var checkboxOrRadio = (react_default.a.memo(checkboxOrRadio_CheckboxOrRadio));
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
  return /*#__PURE__*/react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
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

  return /*#__PURE__*/react_default.a.createElement(react_select_esm["c" /* default */], Object.assign({}, props, {
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









var fields_dropdown_Dropdown = function Dropdown(_ref) {
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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field-dropdown--wrapper"
  }, /*#__PURE__*/react_default.a.createElement("label", {
    htmlFor: name,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(name, " label"))
  }, newLabel), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field-dropdown--wrapper",
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(name) || 'form-field-dropdown',
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, /*#__PURE__*/react_default.a.createElement(components_select, {
    name: name,
    defaultValue: defaultValue,
    ref: register({
      name: name
    }, validation),
    id: name,
    tabIndex: "-1",
    "aria-label": name
  }), /*#__PURE__*/react_default.a.createElement(components_icons, null)), /*#__PURE__*/react_default.a.createElement(displaymessage, {
    name: name,
    validation: validation
  }));
};

/* harmony default export */ var fields_dropdown = (react_default.a.memo(fields_dropdown_Dropdown));
// CONCATENATED MODULE: ./src/forms/fields/hr.js


var hr_Hr = function Hr(_ref) {
  var addClass = _ref.addClass;
  return /*#__PURE__*/react_default.a.createElement("hr", {
    className: addClass
  });
};

/* harmony default export */ var hr = (react_default.a.memo(hr_Hr));
// EXTERNAL MODULE: ./node_modules/react-google-recaptcha/lib/esm/index.js + 2 modules
var esm = __webpack_require__(132);

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

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(esm["a" /* default */], {
    sitekey: siteKey,
    onChange: onChange,
    ref: register({
      name: name
    }, {
      required: validation.required
    }),
    hl: isocode,
    "data-locator": "captcha"
  }), /*#__PURE__*/react_default.a.createElement(displaymessage, {
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

  return /*#__PURE__*/react_default.a.createElement("div", null, text, displayAdditionalText && /*#__PURE__*/react_default.a.createElement("span", {
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

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, text && link && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field-".concat(type, "--").concat(name, " ") + (addClass ? addClass : '')
  }, /*#__PURE__*/react_default.a.createElement("a", {
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
    return /*#__PURE__*/react_default.a.createElement("a", {
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

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, config.length > 0 && /*#__PURE__*/react_default.a.createElement("div", {
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

    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, {
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
  return /*#__PURE__*/react_default.a.createElement("label", {
    className: addClass,
    htmlFor: htmlFor
  }, label);
};

/* harmony default export */ var fields_label = (react_default.a.memo(label_Label));
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
  label: fields_label
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

  return Component && field.active !== false && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(field_validation_display, {
    name: name,
    matchName: hasMatch ? getMatchName() : ''
  }, /*#__PURE__*/react_default.a.createElement(Component, field)));
};

/* harmony default export */ var forms_fields = (react_default.a.memo(fields_Field));
// EXTERNAL MODULE: ./src/utils/redirectFunctions.js
var redirectFunctions = __webpack_require__(26);

// EXTERNAL MODULE: ./src/my-account/services/SoldToDetailsLazy.js + 1 modules
var SoldToDetailsLazy = __webpack_require__(58);

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
            var control = document.getElementById(name);

            if (control) {
              var mainControlDiv = control.parentElement.parentElement;

              if (mainControlDiv) {
                mainControlDiv.classList.add("cmp-form-field--invalid");
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

  var _useState11 = Object(react["useState"])(),
      _useState12 = Object(slicedToArray["a" /* default */])(_useState11, 2),
      newConfig = _useState12[0],
      setNewConfig = _useState12[1];

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
          tempOption.name = item.customerNumber;
          tempOption.label = item.name;
          tempOption.accountStreet = item.soldToInfo[0].street;
          tempOption.accountCity = item.soldToInfo[0].city;
          tempOption.accountZip = item.soldToInfo[0].postalCode;
          tempOption.state = item.soldToInfo[0].state;
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
      regionalConfig: regionalConfig
    };
  }, [register]);

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

    return /*#__PURE__*/react_default.a.createElement(FieldApi.Provider, {
      value: getFieldApi,
      key: "field-".concat(i)
    }, /*#__PURE__*/react_default.a.createElement(forms_fields, null));
  });

  var renderForm = function renderForm() {
    return /*#__PURE__*/react_default.a.createElement("form", {
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
    }, /*#__PURE__*/react_default.a.createElement(FormApi.Provider, {
      value: getApi
    }, /*#__PURE__*/react_default.a.createElement(stateWatcher["b" /* FormStateProvider */], {
      watch: formState
    }, /*#__PURE__*/react_default.a.createElement(stateWatcher["a" /* ErrorsProvider */], {
      watch: errors
    }, fields))), /*#__PURE__*/react_default.a.createElement("button", {
      type: "submit",
      className: "cmp-button cmp-button--no-border cmp-form--submit",
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(config.buttonLocator || 'form-submit')
    }, config.buttonText), config.cancelText && !!cancelHandler && /*#__PURE__*/react_default.a.createElement("a", {
      className: "cmp-button cmp-button--cancel",
      onClick: cancelHandler,
      "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(config.cancelText || 'form-cancel')
    }, config.cancelText));
  };

  if (isInEditMode || config.getRadioOptions && config.options || displayForm && !config.getRadioOptions) {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, renderForm());
  } else {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
      loading: !displayForm
    }), renderForm());
  }
};

var form_ErrorBoundaryForm = function ErrorBoundaryForm(props) {
  return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(form_Form, props));
};

/* harmony default export */ var forms_form = (form_ErrorBoundaryForm); // Context Variables

var useFormApi = FormApi;
var useFieldApi = FieldApi;
// EXTERNAL MODULE: ./src/my-account/services/UserDetails.js
var UserDetails = __webpack_require__(50);

// CONCATENATED MODULE: ./src/forms/services/submit.js











var submit_postData = /*#__PURE__*/function () {
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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url, body);

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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url, data);

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
            return submit_postData(this.url + "/" + selectedAccount, "");

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
            return submit_postData(urlChooseAccount + "/" + selectedAccount, "");

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
    var isCaptcha, response, responseBody;
    return regenerator_default.a.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            _context11.next = 4;
            return submit_postData(this.url, data);

          case 4:
            response = _context11.sent;
            _context11.next = 7;
            return response.json();

          case 7:
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

          case 10:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));
  return _contactSupportSubmit.apply(this, arguments);
}
// EXTERNAL MODULE: ./node_modules/@brightcove/react-player-loader/dist/brightcove-react-player-loader.es.js
var brightcove_react_player_loader_es = __webpack_require__(128);

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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-video_modal-body"
      }, /*#__PURE__*/react_default.a.createElement(brightcove_react_player_loader_es["a" /* default */], {
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
var responsiveHOC = __webpack_require__(129);
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
      var toggleEllipsisContent = this.props.useEllipsis ? /*#__PURE__*/react_default.a.createElement(ResponsiveEllipsis, {
        style: {
          whiteSpace: 'pre-wrap'
        },
        text: this.props.text,
        maxLine: "3",
        ellipsis: "\u2026",
        trimRight: "true",
        basedOn: "words"
      }) : this.props.text;
      return /*#__PURE__*/react_default.a.createElement("p", {
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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, _this.state.title && /*#__PURE__*/react_default.a.createElement("h3", {
        className: "cmp-video_title"
      }, _this.state.title), _this.state.description && /*#__PURE__*/react_default.a.createElement(video_description, {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-video_video-container",
        ref: this.videoRef
      }, /*#__PURE__*/react_default.a.createElement(video_modal_body, {
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



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(90).Promise : Promise;



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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat-content"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat__icon"
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.icon
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat__text"
      }, this.props.text), /*#__PURE__*/react_default.a.createElement("a", {
        className: "cmp-button ".concat(!isActive ? "cmp-button--disabled" : ""),
        href: isActive ? this.props.url : "#",
        target: "_blank",
        rel: "noopener noreferrer",
        disabled: !isActive,
        role: "button",
        "aria-disabled": !isActive
      }, this.props.buttonText), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat__status"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat__status-icon ".concat(isActive ? "online" : "offline")
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: isActive ? this.props.onlineIcon : this.props.offlineIcon
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-chat__status-text"
      }, isActive ? this.props.availableText : this.props.unavailableText)));
    }
  }]);

  return Chat;
}(react_default.a.Component);

/* harmony default export */ var chat = (chat_Chat);
// EXTERNAL MODULE: ./src/detail-tiles/utils/generateTiles.js
var generateTiles = __webpack_require__(80);

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
        Object(SoldToDetailsLazy["a" /* default */])(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg).then(function (soldToDetails) {
          var mergeAPIs = Object(userFunctions["r" /* matchAddresses */])(userDetails, soldToDetails);
          setData(mergeAPIs);
        });
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
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-edit",
      onClick: handleToggle,
      "data-locator": "detail-tiles-tile-edit"
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: icon,
      className: "cmp-detail-tiles-list--tile-edit--icon",
      "data-locator": "edit-icon"
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-edit--title",
      "data-locator": "tile-edit-title"
    }, editText));
  };

  var renderColumns = function renderColumns() {
    return columns.map(function (_ref2, key) {
      var title = _ref2.title,
          rows = _ref2.rows;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-detail-tiles-list--tile-column column-".concat(key),
        key: key,
        "data-locator": "detail-tile-list-column-".concat(key)
      }, title && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-detail-tiles-list--tile-column--title",
        "data-locator": "detail-tile-list-column-title-".concat(key)
      }, title), rows && rows.map(function (row, idx) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: "".concat(row["class"], " cmp-detail-tiles-list--tile-column--text"),
          key: idx,
          "data-locator": "detail-tile-list-column-text-".concat(key, "-").concat(idx)
        }, row.text);
      }));
    });
  };

  var renderNotification = function renderNotification() {
    return /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification-wrapper",
      "data-locator": "detail-tiles-list-notification-wrapper"
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification",
      "data-locator": "detail-tiles-list-notification"
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: notification.icon,
      className: "cmp-detail-tiles-list--tile-notification--icon",
      "data-locator": "tile-notification--icon"
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification--title",
      "data-locator": "detail-tiles-list-notification--title"
    }, notification.title), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-notification--description",
      "data-locator": "detail-tiles-list-notification-description"
    }, notification.description)));
  };

  var renderTile = function renderTile() {
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, canCreate && renderEdit(), renderColumns(), notification && renderNotification());
  };

  var renderBlank = function renderBlank() {
    var blank = columns[0];
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-noAddress",
      "data-locator": "tile-no-address"
    }, /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles-list--tile-noAddress--title",
      "data-locator": "no-address-blank-title"
    }, blank.title), canCreate && /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles--add",
      "data-locator": "add-detail-tiles"
    }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
      src: blank.addIcon,
      className: "cmp-detail-tiles--add-icon"
    }), /*#__PURE__*/react_default.a.createElement("div", {
      className: "cmp-detail-tiles--add-title"
    }, blank.addTitle))));
  };

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
    className: 'cmp-detail-tiles-list--tile' + (formShown ? ' form-shown' : '') + (isNoAddress ? ' no-address' : ''),
    id: name
  }, isNoAddress ? renderBlank() : renderTile()), form && formShown && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list--form"
  }, formMessage && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list--form-message",
    "data-locator": "form-message"
  }, formMessage.text, /*#__PURE__*/react_default.a.createElement("a", {
    href: formMessage.linkURL,
    "data-locator": "link-text"
  }, formMessage.linkText)), /*#__PURE__*/react_default.a.createElement(forms_form, {
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
      return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(views_tile, {
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
      return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(views_tile, {
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

      return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(views_tile, Object.assign({}, tile, {
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

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles",
    id: name,
    "data-locator": "detail-tiles"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles--title",
    "data-locator": "detail-tiles-title"
  }, title), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles-list",
    "data-locator": "details-tiles-list"
  }, renderTiles()), canCreate && !!tiles.length && type !== "personal" && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-detail-tiles--add",
    "data-locator": "details-tile-add"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: icons.add,
    className: "cmp-detail-tiles--add-icon",
    "data-locator": "details-tile-add-icon"
  }), /*#__PURE__*/react_default.a.createElement("div", {
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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-wechat-modal"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-wechat-modal__image"
      }, /*#__PURE__*/react_default.a.createElement("img", {
        src: qrCodeImg,
        alt: alt
      })), /*#__PURE__*/react_default.a.createElement("div", {
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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("a", {
        className: weChatLinkClass,
        href: "#",
        target: "_blank",
        onClick: this.showModal
      }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: this.props.config.chatIcon
      })), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.isModalShown,
        onClose: this.toggleModal
      }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: this.props.config.title,
        className: modal["c" /* keys */].HeaderTitleCentered
      }), /*#__PURE__*/react_default.a.createElement(wechat_modal_body, {
        config: this.props.config
      })));
    }
  }]);

  return WeChat;
}(react_default.a.Component);

/* harmony default export */ var wechat = (wechat_WeChat);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/HashRouter.js
var HashRouter = __webpack_require__(484);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Switch.js
var Switch = __webpack_require__(485);

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
  }
});
// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Link.js
var es_Link = __webpack_require__(483);

// CONCATENATED MODULE: ./src/typography/title.js


var title_Title = function Title(_ref) {
  var text = _ref.text;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-title",
    "data-locator": "title"
  }, /*#__PURE__*/react_default.a.createElement("h1", {
    className: "cmp-title__text",
    "data-locator": "title-text"
  }, text), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-title__print",
    "data-locator": "title-print"
  }, text), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-accent-rule"
  }, /*#__PURE__*/react_default.a.createElement("hr", null)));
};

title_Title.defaultProps = {
  text: ""
};
/* harmony default export */ var typography_title = (title_Title);
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
    }, /*#__PURE__*/react_default.a.createElement(typography_title, {
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
    return /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
      loading: !displayTile
    });
  }
};

var aside_Tile = function Tile(_ref) {
  var tile = _ref.tile,
      pathname = _ref.pathname;

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["c" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["q" /* isEprocurementUserRole */])()) {
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




var components_link_Link = function Link(_ref) {
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

/* harmony default export */ var components_link = (components_link_Link);
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
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(tilesName || 'my-account-tile')
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

  if (tile.requiresEcommerce === "true" && Object(eCommerceFunctions["c" /* isCartHidden */])() || tile.isHiddenForEprocUser === "true" && Object(userFunctions["q" /* isEprocurementUserRole */])()) {
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
    }, /*#__PURE__*/react_default.a.createElement(typography_title, {
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
    return /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
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
        return /*#__PURE__*/react_default.a.createElement(detail_tiles, Object.assign({}, config, {
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
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, !!config && /*#__PURE__*/react_default.a.createElement(detail_tiles, config));
};

/* harmony default export */ var change_password = (change_password_ChangePassword);
// CONCATENATED MODULE: ./src/order-history/orderHistory.services.js





var orderHistory_services_OrderHistoryService = /*#__PURE__*/function () {
  function OrderHistoryService() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://stgservices.waters.com/api/waters/order/v1/list";

    Object(classCallCheck["a" /* default */])(this, OrderHistoryService);

    this.url = url;
  }

  Object(createClass["a" /* default */])(OrderHistoryService, [{
    key: "postData",
    value: function postData(url, options, setError) {
      return fetch(url, {
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
          Object(redirectFunctions["d" /* signInRedirect */])();
        }
      })["catch"](function (error) {
        setError(error);
      });
    }
  }, {
    key: "getOrderListPost",
    value: function getOrderListPost(url, fromDate, poNumber, orderNumber, setError) {
      var options = {};
      options.orderNumber = orderNumber;
      options.purchaseOrderNumber = poNumber;
      options.fromDate = fromDate;
      options.maxRecs = "";
      return this.postData(url, options, setError);
    }
  }]);

  return OrderHistoryService;
}();

/* harmony default export */ var orderHistory_services = (orderHistory_services_OrderHistoryService);
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

      switch (status) {
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
        iconClassName: iconClassName
      });
    };

    _this.state = {
      deliveryStatus: "",
      icon: "",
      iconClassName: ""
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
        className: "delivery-status",
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
var date_formatter = __webpack_require__(59);

// EXTERNAL MODULE: ./src/utils/get-locale/index.js
var get_locale = __webpack_require__(60);

// CONCATENATED MODULE: ./src/order-history/components/order-list-item.js












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
        "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])("".concat(this.props.orderText, " ").concat(this.props.data.orderNumber))
      }, this.props.orderText + " " + this.props.data.orderNumber)), /*#__PURE__*/react_default.a.createElement("div", {
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
var utils_dropdown = __webpack_require__(81);

// CONCATENATED MODULE: ./src/order-history/components/time-period-dropdown.js



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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-order-list-timeperiod",
    "data-locator": "cmp-order-list-timeperiod"
  }, /*#__PURE__*/react_default.a.createElement(utils_dropdown["a" /* default */], {
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
// CONCATENATED MODULE: ./src/order-history/components/order-filter-dropdown.js



var order_filter_dropdown_getOptions = function getOptions(text) {
  return [{
    value: 0,
    label: text.allOrders
  }, {
    value: 1,
    label: text.openOrders
  }];
};

var order_filter_dropdown_OrderFilterDropdown = function OrderFilterDropdown(props) {
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-order-list-orderfilters"
  }, /*#__PURE__*/react_default.a.createElement(utils_dropdown["a" /* default */], {
    getOptions: order_filter_dropdown_getOptions,
    onChange: function onChange(e) {
      return props.onChange(e);
    },
    isSearchable: false,
    text: props.orderFilters,
    defaultValue: 1
  }));
};

/* harmony default export */ var order_filter_dropdown = (order_filter_dropdown_OrderFilterDropdown);
// CONCATENATED MODULE: ./src/order-history/index.js



















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
      analytics["b" /* default */].setAnalytics(analytics["a" /* analyticTypes */]['orderHistory'].name, model);
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
        orderList: null,
        pageCount: 0,
        listCount: 0,
        currentPage: 1,
        noResults: true,
        loading: false
      });
    };

    _this.setResultsState = function (filteredOrders) {
      _this.setState({
        orderList: filteredOrders,
        pageCount: Math.ceil(filteredOrders.length / _this.paginationDefaults.visibleRows),
        listCount: filteredOrders.length,
        currentPage: 1,
        noResults: false,
        loading: false
      });
    };

    _this.retrieveData = /*#__PURE__*/function () {
      var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(fromDate, poNumber, orderNumber, activeTabFilter) {
        var OrderHistoryServiceObj, fetchEndPoint, orders, filteredOrders;
        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                OrderHistoryServiceObj = new orderHistory_services();
                fetchEndPoint = _this.props.configs.fetchEndPoint;
                _context.next = 4;
                return OrderHistoryServiceObj.getOrderListPost(fetchEndPoint, fromDate, poNumber, orderNumber, _this.setError);

              case 4:
                orders = _context.sent;

                if (orders && orders.length > 0) {
                  filteredOrders = orders;

                  if (activeTabFilter !== undefined && activeTabFilter !== "All" && activeTabFilter === "Open") {
                    filteredOrders = orders.filter(function (i) {
                      return i.deliveryStatus === "Open" || i.deliveryStatus === "Partial";
                    });

                    if (filteredOrders.length > 0) {
                      _this.setResultsState(filteredOrders);
                    } else {
                      _this.setNoResultsState();
                    }
                  } else {
                    _this.setResultsState(filteredOrders);
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
      return /*#__PURE__*/react_default.a.createElement(tabs, {
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
      }, /*#__PURE__*/react_default.a.createElement(order_filter_dropdown, {
        onChange: function onChange(e) {
          return _this.handleCategorySelected(e);
        },
        orderFilters: _this.props.configs.orderfilters
      }), /*#__PURE__*/react_default.a.createElement(time_period_dropdown, {
        onChange: function onChange(e) {
          return _this.timePeriodHandler(e);
        },
        timePeriod: _this.props.configs.timeperiod
      }));
    };

    _this.renderOrderCountHeader = function () {
      return /*#__PURE__*/react_default.a.createElement(count_header, {
        rows: _this.paginationDefaults.visibleRows,
        count: _this.state.listCount,
        current: _this.state.currentPage,
        resultsText: _this.props.configs.resultsText,
        noResultsText: _this.props.configs.noOrdersFoundTitle
      });
    };

    _this.renderPaginatedResults = function () {
      var rows = _this.paginationDefaults.visibleRows;
      var count = _this.state.listCount;
      var current = _this.state.currentPage;
      var endResults = count > current * rows ? current * rows : count;
      var startResults = current * rows - rows;

      var itemsToRender = _this.state.orderList.slice(startResults, endResults);

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
      }, _this.props.configs.noOrdersFoundText), /*#__PURE__*/react_default.a.createElement("p", null, /*#__PURE__*/react_default.a.createElement("a", {
        href: _this.props.configs.shopAllHref,
        "data-locator": "shop-all"
      }, _this.props.configs.shopAllTitle))));
    };

    var today = new Date();
    _this.state = {
      orderList: "",
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
        Object(analytics["f" /* setClickAnalytics */])('Order History', 'Order History Open Orders', '#');
      } else {
        Object(analytics["f" /* setClickAnalytics */])('Order History', 'Order History All Orders', '#');
      }

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

      var selectedTimeframe = e.value;
      var currentDate = new Date();
      var now = new Date();

      switch (selectedTimeframe) {
        case 1:
          Object(analytics["g" /* setSelectDropdownAnalytics */])('Order Period Selected', 'Order History Last 30 Days');
          var thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
          this.setState({
            fromDate: thirtyDaysAgo.toISOString(),
            activeTimePeriod: selectedTimeframe
          }, function () {
            var _this3$state = _this3.state,
                fromDate = _this3$state.fromDate,
                poNumber = _this3$state.poNumber,
                orderNumber = _this3$state.orderNumber,
                activeTabFilter = _this3$state.activeTabFilter;

            _this3.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
          });
          break;

        case 2:
          Object(analytics["g" /* setSelectDropdownAnalytics */])('Order Period Selected', 'Order History Last 6 Months');
          var sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
          this.setState({
            fromDate: sixMonthsAgo.toISOString(),
            activeTimePeriod: selectedTimeframe
          }, function () {
            var _this3$state2 = _this3.state,
                fromDate = _this3$state2.fromDate,
                poNumber = _this3$state2.poNumber,
                orderNumber = _this3$state2.orderNumber,
                activeTabFilter = _this3$state2.activeTabFilter;

            _this3.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
          });
          break;

        case 3:
          Object(analytics["g" /* setSelectDropdownAnalytics */])('Order Period Selected', 'Order History Last 12 Months');
          var twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
          this.setState({
            fromDate: twelveMonthsAgo.toISOString(),
            activeTimePeriod: selectedTimeframe
          }, function () {
            var _this3$state3 = _this3.state,
                fromDate = _this3$state3.fromDate,
                poNumber = _this3$state3.poNumber,
                orderNumber = _this3$state3.orderNumber,
                activeTabFilter = _this3$state3.activeTabFilter;

            _this3.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
          });
          break;

        case 4:
          Object(analytics["g" /* setSelectDropdownAnalytics */])('Order Period Selected', 'Order History Show All');
          var showAllTimeframe = new Date(now.setMonth(now.getMonth() - 15));
          this.setState({
            fromDate: showAllTimeframe.toISOString(),
            activeTimePeriod: selectedTimeframe
          }, function () {
            var _this3$state4 = _this3.state,
                fromDate = _this3$state4.fromDate,
                poNumber = _this3$state4.poNumber,
                orderNumber = _this3$state4.orderNumber,
                activeTabFilter = _this3$state4.activeTabFilter;

            _this3.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
          });
          break;

        default:
      }
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

      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.state.loading ? /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
        loading: this.state.loading
      }) : null, !this.state.loading && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, this.renderTabs(), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-list__header clearfix",
        "data-locator": "order-list-header-clearfix"
      }, this.renderDropDowns(), this.renderOrderCountHeader()), this.state.noResults && this.renderNoResults(), this.state.listCount > 0 && this.renderPaginatedResults().map(function (item, index) {
        return /*#__PURE__*/react_default.a.createElement(order_list_item, {
          data: item,
          orderText: _this5.props.configs.orderText,
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
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(133);

// CONCATENATED MODULE: ./src/order-details/orderDetails.services.js




var orderDetails_services_getData = /*#__PURE__*/function () {
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
            return orderDetails_services_getData(url);

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
  var _ref3 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(endpoint, lineItems, setError, isocode) {
    var url, response, responseBody;
    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = buildSearchURL(endpoint, lineItems, isocode);
            _context3.next = 3;
            return orderDetails_services_getData(url);

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

  return function getItemDetails(_x5, _x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
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
// CONCATENATED MODULE: ./src/order-details/components/order-details-list-item.js







var order_details_list_item_OrderDetailsListItem = /*#__PURE__*/function (_React$Component) {
  Object(inherits["a" /* default */])(OrderDetailsListItem, _React$Component);

  function OrderDetailsListItem(props) {
    Object(classCallCheck["a" /* default */])(this, OrderDetailsListItem);

    return Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(OrderDetailsListItem).call(this, props));
  }

  Object(createClass["a" /* default */])(OrderDetailsListItem, [{
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

  return OrderDetailsListItem;
}(react_default.a.Component);

order_details_list_item_OrderDetailsListItem.defaultProps = {
  key: 1,
  relatedSku: {},
  skuConfig: {}
};
/* harmony default export */ var order_details_list_item = (order_details_list_item_OrderDetailsListItem);
// CONCATENATED MODULE: ./src/order-details/components/shipment.js













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
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__left"
      }, totalShipments > 1 && /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__shipment-count"
      }, shipment.shipmentText + " " + shipmentNumber), /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__item-count"
      }, this.renderItemCount(totalItemsOrdered, shipment))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "order-shipment-header__right"
      }, /*#__PURE__*/react_default.a.createElement(delivery_status, {
        status: this.ifShipped(),
        labels: shipment,
        icons: icons,
        shipped: this.orderShipped()
      }))), /*#__PURE__*/react_default.a.createElement("div", {
        className: ""
      }, this.props.data.map(function (record, index) {
        return /*#__PURE__*/react_default.a.createElement(order_details_list_item, {
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
var get_isocode = __webpack_require__(130);

// EXTERNAL MODULE: ./src/utils/group-by/index.js
var group_by = __webpack_require__(97);

// CONCATENATED MODULE: ./src/order-details/index.js




























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
          return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, addressArray.map(function (addressLine) {
            return /*#__PURE__*/react_default.a.createElement("div", {
              className: "cmp-order-details-address1",
              "data-locator": "order-details-address"
            }, addressLine);
          }));
        }
      }

      return null;
    };

    _this.renderItemCount = function () {
      var orderDetails = _this.state.orderDetails;
      var label = "";

      if (orderDetails && orderDetails.totalItemsOrdered) {
        if (parseInt(orderDetails.totalItemsOrdered) > 1) {
          label = _this.props.config.items;
        } else if (parseInt(orderDetails.totalItemsOrdered) === 1) {
          label = _this.props.config.item;
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

    _this.renderOrderDetails = function () {
      var _this$state2 = _this.state,
          orderDetails = _this$state2.orderDetails,
          userLocale = _this$state2.userLocale;
      var notZeroDiscountFlag = parseFloat(orderDetails.orderDiscountValue) !== 0 ? true : false;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__container"
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: "cmp-order-details__title",
        "data-locator": "product-title"
      }, _this.props.config.orderDetails), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-info"
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: "cmp-order-details__order-number",
        "data-locator": "product-number"
      }, _this.props.config.orderNumber + ": " + orderDetails.orderNumber), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-date",
        "data-locator": "order-date"
      }, date_formatter["a" /* default */].dateFormatter(orderDetails.date, userLocale)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__address-container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__ship-to",
        "data-locator": "ship-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, _this.props.config.shipTo), _this.renderAddress("shipping")), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__bill-to",
        "data-locator": "bill-to"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, _this.props.config.billTo), _this.renderAddress("billing"))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__payment-container"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__payment-method",
        "data-locator": "payment-method"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, _this.props.config.paymentMethod), orderDetails.ccNum && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.config.paymentType.creditCard.icon
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "text"
      }, _this.props.config.paymentType.creditCard.label)), !orderDetails.ccNum && orderDetails.purchaseOrderNumber && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
        src: _this.props.config.paymentType.purchaseOrder.icon
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: "text"
      }, _this.props.config.paymentType.purchaseOrder.label, ": ", orderDetails.purchaseOrderNumber))))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-summary",
        "data-locator": "order-summary"
      }, /*#__PURE__*/react_default.a.createElement("h4", null, _this.props.config.orderSummary), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_left",
        "data-locator": "order-subtotal-left"
      }, _this.props.config.subTotal, " ", _this.renderItemCount()), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-subtotal_right",
        "data-locator": "order-subtotal-right"
      }, orderDetails.itemsSubTotal)), notZeroDiscountFlag && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_left",
        "data-locator": "order-savings-left"
      }, _this.props.config.savings), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-savings_right",
        "data-locator": "order-savings-right"
      }, _this.props.config.minusSign, orderDetails.orderDiscount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_left",
        "data-locator": "order-shipping-left"
      }, _this.props.config.shipping), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipping_right",
        "data-locator": "order-shipping-right"
      }, orderDetails.shippingAmount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_left",
        "data-locator": "order-tax-left"
      }, _this.props.config.tax), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-tax_right",
        "data-locator": "order-tax-right"
      }, orderDetails.taxAmount)), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total"
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_left",
        "data-locator": "order-total-left"
      }, _this.props.config.orderTotal), /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-total_right",
        "data-locator": "order-total-right"
      }, /*#__PURE__*/react_default.a.createElement("h1", null, orderDetails.orderTotal))), _this.state.isCommerceApiMigrated && /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__reorder",
        "data-locator": "order-details-reorder"
      }, _this.renderReorderButton())));
    };

    _this.renderOrderNotFoundError = function () {
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__no-results",
        "data-locator": "order-details-no-results"
      }, /*#__PURE__*/react_default.a.createElement("p", null, _this.props.config.orderNotFoundErrorTitle)));
    };

    _this.renderOrderShipmentList = function () {
      var _this$state3 = _this.state,
          airbills = _this$state3.airbills,
          orderDetails = _this$state3.orderDetails;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: "cmp-order-details__order-shipment-list",
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
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isLoading && /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], {
        loading: isLoading
      }), !isLoading && errorOrderNotFound && this.renderOrderNotFoundError(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderDetails(), !errorOrderNotFound && !errorServiceError && !isLoading && this.renderOrderShipmentList(), /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
        isOpen: this.state.modalShown,
        onClose: this.toggleModal,
        className: "cmp-add-to-cart-modal"
      }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
        title: this.state.modalConfig.title,
        icon: this.state.modalConfig.icon,
        className: modal["c" /* keys */].HeaderWithAddedMarginTop
      }), /*#__PURE__*/react_default.a.createElement(addToCartModal["a" /* default */], {
        config: this.state.modalConfig,
        errorObjCart: this.state.errorObjCart
      })));
    }
  }]);

  return OrderDetails;
}(react["Component"]);

var order_details_ErrorBoundaryOrderDetails = function ErrorBoundaryOrderDetails(props) {
  return /*#__PURE__*/react_default.a.createElement(search_ErrorBoundary, null, /*#__PURE__*/react_default.a.createElement(order_details_OrderDetails, props));
};


/* harmony default export */ var order_details = (order_details_ErrorBoundaryOrderDetails);
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
      return /*#__PURE__*/react_default.a.createElement("option", {
        key: country.href,
        value: country.href
      }, country.title);
    });
  };

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__text"
  }, props.translations.changeCountryText), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__dropdown"
  }, /*#__PURE__*/react_default.a.createElement("select", {
    className: "select-css",
    value: selectedValue,
    onChange: handleDropdownChange
  }, /*#__PURE__*/react_default.a.createElement(Items, null))), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__note"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: "/content/dam/waters/en/brand-assets/icons/externallink.svg"
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__note-text"
  }, /*#__PURE__*/react_default.a.createElement("span", null, props.translations.changeCountryNoteText, ":"), "\xA0", props.translations.changeCountryNewTabText)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__button"
  }, /*#__PURE__*/react_default.a.createElement("a", {
    className: "cmp-button",
    onClick: handleButtonClick
  }, props.translations.changeCountryButton)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-country-selector__cancel"
  }, /*#__PURE__*/react_default.a.createElement("a", {
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

  return /*#__PURE__*/react_default.a.createElement(modal["b" /* default */], {
    isOpen: open,
    onClose: handleClose,
    className: "cmp-country-selector-modal"
  }, /*#__PURE__*/react_default.a.createElement(modal["a" /* Header */], {
    title: props.translations.preferredCountryHeading,
    icon: "/content/dam/waters/en/brand-assets/icons/globe.svg"
  }), /*#__PURE__*/react_default.a.createElement(country_selector_CountrySelection, Object.assign({}, props, {
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

  return showRegistrationForm ? /*#__PURE__*/react_default.a.createElement(forms_form, Object.assign({}, registrationFormConfig, {
    isocode: isocode
  })) : /*#__PURE__*/react_default.a.createElement(forms_form, Object.assign({}, checkEmailFormConfig, {
    submitFn: checkEmailSubmit,
    isocode: isocode
  }));
};

/* harmony default export */ var create_account_form = (create_account_form_CreateAccountForm);
// CONCATENATED MODULE: ./src/create-account-form/index.js

// CONCATENATED MODULE: ./src/index.js



























if (false) { var whyDidYouRender; }

var globalTranslationsScript = document.getElementById('global-translations-json');
var src_globalTranslations = globalTranslationsScript ? JSON.parse(globalTranslationsScript.innerHTML) : {};
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
    react_dom_default.a.render(showLoader ? /*#__PURE__*/react_default.a.createElement(utils_spinner["a" /* default */], props) : null, container);
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(src_search, {
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

    var _data = getAuthoredDataForTagCloud(header, tagCloudContainers[src_i]);

    react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(tagcloud, {
      tagCloudTitle: _data.tagTitle,
      searchPath: _data.searchPath,
      keywords: src_json,
      category: _data.category,
      contentType: _data.contentType
    }), tagCloudContainers[src_i]);
  }
}

var imageGalleryContainers = Array.from(document.querySelectorAll('.cmp-image-gallery'));

if (imageGalleryContainers) {
  imageGalleryContainers.forEach(function (container) {
    var json = JSON.parse(container.getAttribute('data-json'));
    react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(image_carousel, {
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
    react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(src_sku_details, {
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(sku_list, {
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
    react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(sku_message, {
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

      react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(video, {
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
  react_dom_default.a.render(
  /*#__PURE__*/
  // replace isocode with a value supplied by AEM
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(forms_form, {
    config: src_config,
    submitFn: contactSupportSubmit,
    callback: headerData.userDetailsUrl,
    isocode: DigitalData["a" /* default */].language,
    defaultValues: {
      formCategoryType: objData.defaultValue || ''
    }
  }), /*#__PURE__*/react_default.a.createElement(legal_link_modal_LegalLinkModal, {
    docIcon: src_config.icons.docIcon || ''
  })), contactSupportFormContainer);
}

var troubleSigningInFormContainer = document.getElementById('cmp-trouble-signing-in-form');

if (troubleSigningInFormContainer) {
  var _config = JSON.parse(document.getElementById('js-trouble-signing-in-form').innerHTML);

  react_dom_default.a.render(
  /*#__PURE__*/
  // replace isocode with a value supplied by AEM
  react_default.a.createElement(forms_form, {
    config: _config,
    submitFn: troubleSigningInSubmit,
    isocode: DigitalData["a" /* default */].language
  }), troubleSigningInFormContainer);
}

var chooseAccountFormContainer = document.getElementById('cmp-choose-account-form');

if (chooseAccountFormContainer) {
  var _config2 = JSON.parse(document.getElementById('js-choose-account-form').innerHTML);

  react_dom_default.a.render(
  /*#__PURE__*/
  // replace isocode with a value supplied by AEM
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(forms_form, {
    config: _config3,
    submitFn: resetPasswordSubmit,
    callback: headerData.userDetailsUrl
  }), resetPasswordContainer);
}

var changePasswordContainer = document.getElementById('changePassword-details-tile');

if (changePasswordContainer) {
  var _config4 = JSON.parse(document.getElementById('cmp-detail-tiles--changePassword').innerHTML);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(detail_tiles, _config4), changePasswordContainer);
}

var chatContainer = document.querySelector('.cmp-chat');

if (chatContainer) {
  var _data2 = getAuthoredDataForChat(chatContainer);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(chat, {
    url: _data2.url,
    statusApi: _data2.statusApi,
    countryCode: skuDetailsConfig.countryCode,
    icon: _data2.icon,
    availableText: _data2.availableText,
    unavailableText: _data2.unavailableText,
    text: _data2.text,
    buttonText: _data2.buttonText,
    offlineIcon: skuDetailsConfig.skuInfo.outOfStockIcon,
    onlineIcon: skuDetailsConfig.skuInfo.inStockIcon
  }), chatContainer);
}

var shippingDetailsTile = document.getElementById('shipping-details-tile');

if (shippingDetailsTile) {
  var _config5 = JSON.parse(document.getElementById('cmp-detail-tiles--shipping').innerHTML);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(detail_tiles, _config5), shippingDetailsTile);
}

var billingDetailsTile = document.getElementById('billing-details-tile');

if (billingDetailsTile) {
  var _config6 = JSON.parse(document.getElementById('cmp-detail-tiles--billing').innerHTML);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(detail_tiles, _config6), billingDetailsTile);
}

var src_wechat = document.querySelector('.cmp-wechat');
var wechatContainer = document.querySelector('.cmp-wechat-container');
var wechatJSON = document.getElementById('wechat-json');

if (src_wechat && wechatContainer && wechatJSON) {
  var _config7 = JSON.parse(wechatJSON.innerHTML);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(wechat, {
    config: _config7
  }), wechatContainer);
}

var myAccountPage = document.getElementById('my-account');

if (myAccountPage) {
  var _config8 = JSON.parse(document.getElementById('cmp-my-account').innerHTML);

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(my_account, _config8), myAccountPage);
}

var countryModalRoot = document.getElementById('country-selector-root');

if (countryModalRoot) {
  var src_scriptElement = document.getElementById('country-list-json');
  var src_countries = src_scriptElement && src_scriptElement.innerHTML.trim() ? JSON.parse(src_scriptElement.innerHTML) : [];

  if (Array.isArray(src_countries) && src_countries.length !== 0) {
    react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(country_selector, {
      countries: src_countries,
      translations: src_globalTranslations
    }), countryModalRoot);
  }
}

var signInFormContainer = document.getElementById("js-signin-form");

if (signInFormContainer) {
  var _config9 = JSON.parse(document.getElementById("cmp-signin-form").innerHTML);

  react_dom_default.a.render(
  /*#__PURE__*/
  // replace isocode with a value supplied by AEM
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(user_greetings_UserGreeting, props), userGreetingContainer);
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
  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(quick_order_QuickOrder, Object.assign({}, props, {
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

  react_dom_default.a.render( /*#__PURE__*/react_default.a.createElement(link_button_LinkButton, {
    label: src_label,
    url: src_url
  }), contactusContainer);
}
// EXTERNAL MODULE: ./node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.esm.js
var css_vars_ponyfill_esm = __webpack_require__(131);

// CONCATENATED MODULE: ./src/entry.js























 // import(/* webpackChunkName: "externallist" */ './scripts/externallist');

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

/***/ 179:
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
	 true ? (module['exports'] = factory()) :
		undefined
}(function () {

	'use strict'

	return function (insertRule) {
		var delimiter = '/*|*/'
		var needle = delimiter+'}'

		function toSheet (block) {
			if (block)
				try {
					insertRule(block + '}')
				} catch (e) {}
		}

		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
			switch (context) {
				// property
				case 1:
					// @import
					if (depth === 0 && content.charCodeAt(0) === 64)
						return insertRule(content+';'), ''
					break
				// selector
				case 2:
					if (ns === 0)
						return content + delimiter
					break
				// at-rule
				case 3:
					switch (ns) {
						// @font-face, @page
						case 102:
						case 112:
							return insertRule(selectors[0]+content), ''
						default:
							return content + (at === 0 ? delimiter : '')
					}
				case -2:
					content.split(needle).forEach(toSheet)
			}
		}
	}
}))


/***/ }),

/***/ 18:
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
var slicedToArray = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js
var inlineSVG = __webpack_require__(45);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(19);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(11);

// EXTERNAL MODULE: ./src/stores/cookieStore.js
var cookieStore = __webpack_require__(30);

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

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(167)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(48)))

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (resolvePathname);


/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = valueOf(a);
    var bValue = valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["a"] = (valueEqual);


/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(174);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 19:
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

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return parameterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parameterDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return searchMapper; });
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);







var queryString = __webpack_require__(28);

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

    Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, SearchService);

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
      var _ref5 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(rows, term) {
        var searchString, callService, response;
        return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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

  Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SearchService, [{
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

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(169);

exports.__esModule = true;
exports.default = addClass;

var _hasClass = _interopRequireDefault(__webpack_require__(170));

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}

module.exports = exports["default"];

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 242:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(172)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 245:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


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

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);

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

/***/ 34:
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

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(53);
/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);






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

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, props.config)),
      _useState2 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState, 1),
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
      if (!text || !textHeading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    } else {
      if (!text) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.InfoTextWrapper
    }, props.children);
  };

  var TextHeading = function TextHeading() {
    if (!textHeading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.TextHeading
    }, partNumberLabel, "\xA0", textHeading);
  };

  var Text = function Text(props) {
    if (!props.text) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: props.className,
      "data-locator": "modal-information-text"
    }, props.text);
  };

  var buttonType = function buttonType(btn) {
    if (btn.action === 'close') {
      if (!onClose) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
        onClick: function onClick() {
          return onClose();
        },
        className: keys.AltButton,
        "data-locator": Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__[/* elementLocator */ "a"])(btn.text),
        "aria-label": btn.text
      }, btn.text);
    } else if (btn.action.indexOf('://') >= 0 || btn.action.indexOf('.com') >= 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", Object.assign({
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
    if (!buttons) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: keys.ButtonWrapper
    }, buttons.map(function (btn, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: keys.FullWidthButton,
        key: "modal-btn-".concat(index),
        "data-locator": "modal-btn-".concat(index)
      }, btn.text ? buttonType(btn) : null);
    }));
  };

  var Error = function Error() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InfoTextWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Text, {
      className: keys.ErrorText,
      text: _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].ErrorMessages(errorObjCart).wereSorry
    }));
  };

  var Body = function Body() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(InfoTextWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(TextHeading, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Text, {
      className: keys.Text,
      text: text
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Buttons, null));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, errorObjCart && errorObjCart.ok === false ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Error, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Body, null));
};

AddToCartModalBody.whyDidYouRender = true;
/* harmony default export */ __webpack_exports__["a"] = (AddToCartModalBody);

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _stores_cookieStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);


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

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ functions; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(36);

// CONCATENATED MODULE: ./src/forms/services/EmailService.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(90).Promise : Promise;



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
  email: function email(value, ref, invalidMsg, setError, clearError) {
    if (test(value, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      clearError("invalidEmail");
      return true;
    } else {
      setError("invalidEmail", "invalidEmail", invalidMsg, ref);
      return false;
    }
  },
  newEmail: function newEmail(value, emailValidationEndpoint, ref, invalidMsg, setError, clearError) {
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
            return false;
          }

          clearError("alreadyRegistered");
          return removeError(ref);
        })["catch"](function (err) {
          setError("alreadyRegistered", "alreadyRegistered", err, ref);
          return false;
        });
        return newEmail;
      } else {
        clearError("alreadyRegistered");
        return true;
      }
    }
  }
};

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var inline_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76);
/* harmony import */ var inline_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inline_svg__WEBPACK_IMPORTED_MODULE_0__);

var inlineSVG = {
  init: function init(svgSelector, initClass) {
    try {
      inline_svg__WEBPACK_IMPORTED_MODULE_0___default.a.init({
        svgSelector: svgSelector,
        // the class attached to all images that should be inlined
        initClass: initClass // class added to <html>

      }, function () {});
    } catch (e) {// console.log(e);
    }
  }
};
/* harmony default export */ __webpack_exports__["a"] = (inlineSVG);

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(464);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(178);
// Print Breaking CSS File



/***/ }),

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 47:
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

/***/ 48:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);





var getData = /*#__PURE__*/function () {
  var _ref = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
    var response;
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  var _ref2 = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var url,
        _response,
        _args2 = arguments;

    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ }),

/***/ 53:
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

/***/ 54:
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

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _services_UserDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50);





/* harmony default export */ __webpack_exports__["a"] = (/*#__PURE__*/(function () {
  var _ref = Object(C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(userDetailsUrl, checkSessionStore) {
    var sessionStore,
        service,
        navBarControls,
        userDetails,
        response,
        _args = arguments;
    return C_Users_ankupadh1_Documents_sapient_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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

            console.info("UserDetails API cannot be initiated due to unavailibility of login cookie");
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

/***/ }),

/***/ 58:
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
var stores_sessionStore = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(36);

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
var eCommerceFunctions = __webpack_require__(13);

// CONCATENATED MODULE: ./src/my-account/services/SoldToDetailsLazy.js







/* harmony default export */ var SoldToDetailsLazy = __webpack_exports__["a"] = (/*#__PURE__*/(function () {
  var _ref = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(soldToDetailsUrl, userId, salesOrg) {
    var sessionStore,
        service,
        currentPage,
        soldToUrl,
        soldToDetails,
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
            soldToDetails = sessionStore.getSoldToDetails();

            if (!soldToDetails) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", soldToDetails);

          case 9:
            _context.next = 11;
            return service(soldToUrl);

          case 11:
            response = _context.sent;

            if (response.failed) {
              _context.next = 18;
              break;
            }

            sessionStore.setSoldToDetails(response); // Show or Hide Cart Icon dependent upon eCommerce Status

            hideCartClass = "top-bar__nav__cart--hide";
            headerNavigation_cartLI = document.querySelector(".top-bar__nav__cart");

            if (headerNavigation_cartLI) {
              if (Object(eCommerceFunctions["c" /* isCartHidden */])()) {
                domElements["a" /* default */].addClass(headerNavigation_cartLI, hideCartClass);
              } else {
                domElements["a" /* default */].removeClass(headerNavigation_cartLI, hideCartClass);
              }
            }

            return _context.abrupt("return", response);

          case 18:
            return _context.abrupt("return", []);

          case 19:
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

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(48)))

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(176);

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(48)))

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _scripts_screenSizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _scripts_navigation_level2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
/* harmony import */ var _feedbackSurvey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(54);
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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 92:
/***/ (function(module, exports) {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ })

/******/ });