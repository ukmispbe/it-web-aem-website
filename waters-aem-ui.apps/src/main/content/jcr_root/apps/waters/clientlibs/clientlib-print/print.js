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
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		10: 0,
/******/ 		8: 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		10: 0,
/******/ 		8: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({"3":"chat","4":"forms","7":"imagegallery","9":"myaccount","11":"quickorder","12":"searchresults","13":"skudetails","14":"skulist","15":"usergreetings","16":"video"}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"4":1,"9":1,"12":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "/etc.clientlibs/waters/components/content/" + ({"3":"chat","4":"forms","7":"imagegallery","9":"myaccount","11":"quickorder","12":"searchresults","13":"skudetails","14":"skulist","15":"usergreetings","16":"video"}[chunkId]||chunkId) + "/clientlib-" + ({"3":"chat","4":"forms","7":"imagegallery","9":"myaccount","11":"quickorder","12":"searchresults","13":"skudetails","14":"skulist","15":"usergreetings","16":"video"}[chunkId]||chunkId) + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push([298,1,2,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 112:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/styles/index.scss
var styles = __webpack_require__(77);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(6);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

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

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(2);

// CONCATENATED MODULE: ./src/search/components/tagcloud.js








var tagcloud_TagCloud = /*#__PURE__*/function (_Component) {
  Object(inherits["a" /* default */])(TagCloud, _Component);

  function TagCloud(props) {
    var _this;

    Object(classCallCheck["a" /* default */])(this, TagCloud);

    _this = Object(possibleConstructorReturn["a" /* default */])(this, Object(getPrototypeOf["a" /* default */])(TagCloud).call(this, props));
    _this.sessionStore = new sessionStore["a" /* default */]();
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
// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

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
// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/react-html-parser/lib/index.js
var lib = __webpack_require__(72);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(11);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(53);

// EXTERNAL MODULE: ./src/legal-link-modal/styles/index.scss
var legal_link_modal_styles = __webpack_require__(113);

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
  }), react_default.a.createElement(addToCartModal["default"], {
    config: {
      isOrderDetails: true,
      text: lib_default()("<main>".concat(bodyContent, "</main>"))
    },
    errorObjCart: {},
    onClose: function onClose() {}
  })));
}

LegalLinkModal.defaultProps = {
  docIcon: ''
};
/* harmony default export */ var legal_link_modal_LegalLinkModal = (LegalLinkModal);
// EXTERNAL MODULE: ./src/sku-message/index.js
var sku_message = __webpack_require__(79);

// EXTERNAL MODULE: ./src/forms/services/submit.js
var services_submit = __webpack_require__(24);

// EXTERNAL MODULE: ./src/detail-tiles/index.js + 1 modules
var detail_tiles = __webpack_require__(51);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

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

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(9);

// CONCATENATED MODULE: ./src/create-account-form/create-account-form.js

 // import Form from "../forms/form";

var Form = react_default.a.lazy(function () {
  return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
});


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
    if (isEProcUser !== null) isEProcUser ? services_submit["b" /* checkEmailResetPasswordSubmit */].call(this, data) : setRegistrationFormVisibility(true);
  }

  return showRegistrationForm ? react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(Form, Object.assign({}, registrationFormConfig, {
    isocode: isocode
  }))) : react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(Form, Object.assign({}, checkEmailFormConfig, {
    submitFn: checkEmailSubmit,
    isocode: isocode
  })));
};

/* harmony default export */ var create_account_form = (create_account_form_CreateAccountForm);
// CONCATENATED MODULE: ./src/create-account-form/index.js

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(90);

// CONCATENATED MODULE: ./src/index.js

 // import Search from './search/index';

var Search = react_default.a.lazy(function () {
  return Promise.all(/* import() | searchresults */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, 519));
}); // const Search = React.lazy(() => import(/* webpackChunkName: "searchresults" */'./search/index'));

 // import ImageCarousel from './image-carousel';

var ImageCarousel = react_default.a.lazy(function () {
  return Promise.all(/* import() | imagegallery */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, 521));
}); // import UserGreeting from './user-greetings/UserGreeting';

var UserGreeting = react_default.a.lazy(function () {
  return __webpack_require__.e(/* import() | usergreetings */ 15).then(__webpack_require__.bind(null, 516));
}); // import QuickOrder from './quick-order/QuickOrder';

var QuickOrder = react_default.a.lazy(function () {
  return Promise.all(/* import() | quickorder */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, 524));
});

 // import SkuDetails from './sku-details';

var SkuDetails = react_default.a.lazy(function () {
  return Promise.all(/* import() | skudetails */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, 517));
}); // import SkuList from './sku-list';

var SkuList = react_default.a.lazy(function () {
  return Promise.all(/* import() | skulist */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, 525));
});
 // import Form from './forms/form';

 // import Video from './video/index';

var Video = react_default.a.lazy(function () {
  return Promise.all(/* import() | video */[__webpack_require__.e(1), __webpack_require__.e(0), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, 522));
}); // import Chat from './chat';

var Chat = react_default.a.lazy(function () {
  return Promise.all(/* import() | chat */[__webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, 523));
});


 // import MyAccountRouter from './my-account';

var MyAccountRouter = react_default.a.lazy(function () {
  return Promise.all(/* import() | myaccount */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, 518));
});






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
  var filterMap = JSON.parse(document.getElementById('search-results-categories-json').innerHTML);
  var accountModalConfig = {};
  var baseSignInUrlString = "";

  if (header) {
    accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
    baseSignInUrlString = accountModalConfig.signIn.url;
  }

  var src_data = getAuthoredDataForSearchApp(searchAppContainer);
  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(Search, {
    defaultFacet: "category_facet:waters%253Acategory%252Fapplicationslibrary",
    searchDefaults: {
      rows: 25
    },
    searchServicePath: src_data.searchPath,
    searchLocale: src_data.locale,
    searchText: src_text,
    filterMap: filterMap,
    isocode: src_data.isocode,
    baseSignInUrl: baseSignInUrlString
  })), searchAppContainer);
}

var tagCloudContainers = document.querySelectorAll('.cmp-tag-cloud');

if (tagCloudContainers) {
  for (var src_i = 0; src_i < tagCloudContainers.length; src_i++) {
    var src_json = JSON.parse(tagCloudContainers[src_i].getAttribute('data-json'));

    var _data = getAuthoredDataForTagCloud(header, tagCloudContainers[src_i]);

    react_dom_default.a.render(react_default.a.createElement(tagcloud, {
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
    react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
      fallback: react_default.a.createElement("div", null, "Loading...")
    }, react_default.a.createElement(ImageCarousel, {
      templates: json.templates,
      widths: json.widths,
      alt: json.alt,
      zoomInIcon: "/content/dam/waters/en/brand-assets/icons/zoom-in.svg",
      zoomOutIcon: "/content/dam/waters/en/brand-assets/icons/zoom-out.svg"
    })), container);
  });
} // Start SKU Details Component


var src_skuDetailsContainer = document.querySelector('.cmp-sku-details__ecom');
var skuDetailsConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
var skuData, skuDetailsListPrice;

if (document.querySelector('.cmp-sku-details__ecom')) {
  // If a product is discontinued, the ecom class never gets added,
  // but not having a price is a valid option for some products
  // This check allows us to pass in a price of undefined without breaking the frontend
  skuData = document.querySelector('.cmp-sku-details__ecom');
  skuDetailsListPrice = skuData.dataset.price;
}

if (src_skuDetailsContainer) {
  var src_skuDetailsRender = function skuDetailsRender(skuDetailsContainer) {
    react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
      fallback: react_default.a.createElement("div", null, "Loading...")
    }, react_default.a.createElement(SkuDetails, {
      config: skuDetailsConfig,
      price: skuDetailsListPrice,
      countryRestricted: skuCountryRestricted,
      skuNumber: skuNumber,
      titleText: skuTitle,
      discontinued: skuDiscontinued,
      replacementSkuCode: replacementSkuCode,
      replacementSkuHref: replacementSkuHref
    })), skuDetailsContainer);
  };

  var skuNumber = skuData.dataset.skuCode;
  var skuTitle = skuData.dataset.skuTitle;
  var skuDiscontinued = skuData.dataset.discontinued;
  var skuCountryRestricted = skuData.dataset.countryRestricted;
  var replacementSkuCode = skuData.dataset.replacementSkuCode;
  var replacementSkuHref = skuData.dataset.replacementSkuHref;

  if (skuDetailsConfig) {
    var _accountModalConfig = {};

    if (header) {
      _accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
    }

    skuDetailsConfig.baseSignInUrl = _accountModalConfig.signIn.url;
  }

  if (loginStatus["a" /* default */].state()) {
    var store = new sessionStore["a" /* default */]();
    waitUntilUserExists(store, src_skuDetailsContainer, src_skuDetailsRender);
  } else {
    src_skuDetailsRender(src_skuDetailsContainer);
  }
} // End SKU Details Component
// Start SKU List Component


var skuListContainer = document.querySelector('.cmp-sku-list');

if (skuListContainer) {
  var skuListData = JSON.parse(skuListContainer.dataset.json);
  var skuListTitle = skuListContainer.dataset.componenttitle ? skuListContainer.dataset.componenttitle : '';
  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(SkuList, {
    skuConfig: skuDetailsConfig,
    data: skuListData,
    title: skuListTitle
  })), skuListContainer);
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
    react_dom_default.a.render(react_default.a.createElement(sku_message["a" /* default */], {
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

      react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
        fallback: react_default.a.createElement("div", null, "Loading...")
      }, react_default.a.createElement(Video, {
        videoConfig: _json.videoConfig,
        ref: function ref(ourComponent) {
          if (window.cmpVideos) {
            window.cmpVideos.push(ourComponent);
          } else {
            window.cmpVideos = [ourComponent];
          }
        }
      })), videoContainer);
    }
  });
}

var registrationFormContainer = document.getElementById('js-registration-form');

if (registrationFormContainer) {
  var configCheckEmailForm = JSON.parse(document.getElementById('cmp-check-email-form').innerHTML);
  var configRegistrationForm = JSON.parse(document.getElementById('cmp-registration-form').innerHTML);
  var src_country = DigitalData["a" /* default */].page.country.toLowerCase();

  var swapFirstAndLastNames = function swapFirstAndLastNames() {
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
    swapFirstAndLastNames();
  }

  if (configRegistrationForm.formName === "registration" && src_country === "kr") {
    changeDisclosures(configRegistrationForm);
  }

  var registrationForm = {
    config: configRegistrationForm,
    submitFn: services_submit["f" /* registrationSubmit */],
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
  var config = JSON.parse(document.getElementById('cmp-contact-support-form').innerHTML);
  var objData = config.fields.find(function (x) {
    return x.type === 'dropdown' && x.name === 'formCategoryType' && Object.keys(x).includes('defaultValue');
  });
  var src_Form = react_default.a.lazy(function () {
    return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
  });
  react_dom_default.a.render(react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(src_Form, {
    config: config,
    submitFn: services_submit["d" /* contactSupportSubmit */],
    callback: headerData.userDetailsUrl,
    isocode: DigitalData["a" /* default */].language,
    defaultValues: {
      formCategoryType: objData.defaultValue || ''
    }
  })), react_default.a.createElement(legal_link_modal_LegalLinkModal, {
    docIcon: config.icons.docIcon || ''
  })), contactSupportFormContainer);
}

var troubleSigningInFormContainer = document.getElementById('cmp-trouble-signing-in-form');

if (troubleSigningInFormContainer) {
  var _config = JSON.parse(document.getElementById('js-trouble-signing-in-form').innerHTML);

  var _Form = react_default.a.lazy(function () {
    return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
  });

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(_Form, {
    config: _config,
    submitFn: services_submit["i" /* troubleSigningInSubmit */],
    isocode: DigitalData["a" /* default */].language
  })), troubleSigningInFormContainer);
}

var chooseAccountFormContainer = document.getElementById('cmp-choose-account-form');

if (chooseAccountFormContainer) {
  var _config2 = JSON.parse(document.getElementById('js-choose-account-form').innerHTML);

  var _Form2 = react_default.a.lazy(function () {
    return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
  });

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(_Form2, {
    config: _config2,
    submitFn: services_submit["c" /* chooseAccountSubmit */],
    isocode: DigitalData["a" /* default */].language
  })), chooseAccountFormContainer);
}

var resetPasswordContainer = document.querySelector('.cmp-form-reset-password--attach');

if (resetPasswordContainer) {
  var _config3 = JSON.parse(document.getElementById('cmp-reset-password-form').innerHTML);

  _config3.submitEndpoint = "".concat(_config3.submitEndpoint).concat(_config3.isEproc === "true" ? '?isEproc=true' : '');

  var _Form3 = react_default.a.lazy(function () {
    return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
  });

  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(_Form3, {
    config: _config3,
    submitFn: services_submit["g" /* resetPasswordSubmit */],
    callback: headerData.userDetailsUrl
  })), resetPasswordContainer);
}

var changePasswordContainer = document.getElementById('changePassword-details-tile');

if (changePasswordContainer) {
  var _config4 = JSON.parse(document.getElementById('cmp-detail-tiles--changePassword').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles["a" /* default */], _config4), changePasswordContainer);
}

var chatContainer = document.querySelector('.cmp-chat');

if (chatContainer) {
  var _data2 = getAuthoredDataForChat(chatContainer);

  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(Chat, {
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
  })), chatContainer);
}

var shippingDetailsTile = document.getElementById('shipping-details-tile');

if (shippingDetailsTile) {
  var _config5 = JSON.parse(document.getElementById('cmp-detail-tiles--shipping').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles["a" /* default */], _config5), shippingDetailsTile);
}

var billingDetailsTile = document.getElementById('billing-details-tile');

if (billingDetailsTile) {
  var _config6 = JSON.parse(document.getElementById('cmp-detail-tiles--billing').innerHTML);

  react_dom_default.a.render(react_default.a.createElement(detail_tiles["a" /* default */], _config6), billingDetailsTile);
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

  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(MyAccountRouter, _config8)), myAccountPage);
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

  var _Form4 = react_default.a.lazy(function () {
    return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
  });

  react_dom_default.a.render( // replace isocode with a value supplied by AEM
  react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(_Form4, {
    config: _config9,
    submitFn: services_submit["h" /* signInSubmit */],
    isocode: DigitalData["a" /* default */].language,
    callback: headerData.userDetailsUrl
  })), signInFormContainer);
} // User Greeting Component


var src_userGreetingContainer = document.getElementById("user-greetings");

if (src_userGreetingContainer) {
  var _store = new sessionStore["a" /* default */]();

  waitUntilUserExists(_store, src_userGreetingContainer, userGreeting);
} // Inject UserGreeting Component user-greetings container


function userGreeting(userGreetingContainer) {
  var props = JSON.parse(document.getElementById("cmp-user-greetings").innerHTML);
  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(UserGreeting, props)), userGreetingContainer);
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
  var _store2 = new sessionStore["a" /* default */]();

  waitUntilUserExists(_store2, quickOrderContainer, quickOrder);
}

function quickOrder(container) {
  var props = JSON.parse(document.getElementById("cmp-quick-order").innerHTML);
  var skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
  react_dom_default.a.render(react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(QuickOrder, Object.assign({}, props, {
    skuConfig: skuConfig
  }))), container);
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
var css_vars_ponyfill_esm = __webpack_require__(103);

// EXTERNAL MODULE: ./src/scripts/inlineSVG.js
var inlineSVG = __webpack_require__(41);

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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return registrationSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkEmailResetPasswordSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return troubleSigningInSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return resetPasswordSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changePasswordSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return personalSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return signInSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return chooseAccountSubmit; });
/* unused harmony export submitAccount */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return contactSupportSubmit; });
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27);
/* harmony import */ var _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _my_account_services_UserDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);
/* harmony import */ var _utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);











var postData = /*#__PURE__*/function () {
  var _ref = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url, data) {
    var response;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  _registrationSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(data) {
    var isCaptcha, localeLanguage, localeCountry, response, responseBody, userDetails, store;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            delete data.confirmPassword;
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            localeLanguage = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].language;
            localeCountry = _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].country;

            if (!localeLanguage && !localeCountry || _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].country === _scripts_DigitalData__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].globalExperience) {
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
            return Object(_my_account_services_UserDetails__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this.callback);

          case 20:
            userDetails = _context2.sent;

            if (!userDetails.failed) {
              store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
            _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);

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
  _checkEmailResetPasswordSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(data) {
    var response, responseBody;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
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
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _troubleSigningInSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(data) {
    var isCaptcha, response, responseBody;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
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
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _resetPasswordSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(data) {
    var store, resetToken, queryString, newPassword, body, response, responseBody, userDetails, _store2, needToChooseAccount, switchAccountUrl, _store, signInRedirectStore;

    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
            resetToken = store.getLegacyToken();
            store.removeLegacyToken();

            if (resetToken === null) {
              queryString = Object(query_string__WEBPACK_IMPORTED_MODULE_3__["parse"])(window.location.search);
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
            return Object(_my_account_services_UserDetails__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this.callback);

          case 18:
            userDetails = _context5.sent;

            if (userDetails.failed) {
              _context5.next = 31;
              break;
            }

            _store2 = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();

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
            switchAccountUrl = Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* getNamedHeaderLink */ "a"])("data-switch-account-url");
            window.location.replace(switchAccountUrl);
            return _context5.abrupt("return");

          case 30:
            _store2.removeSoldToDetails();

          case 31:
            _store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
              Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* signInRedirect */ "d"])();
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _changePasswordSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(data) {
    var queryString, email, response, responseBody;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            delete data.confirmNewPassword;
            queryString = Object(query_string__WEBPACK_IMPORTED_MODULE_3__["parse"])(window.location.search);
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
              Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* signInRedirect */ "d"])();
            } else {
              this.setFormAnalytics('error', responseBody);
              this.setError(response);
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _personalSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(data) {
    var response, responseBody, store, soldToDetails, mergedResponse, model;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
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
              store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
              store.setUserDetails(responseBody);
              store.setPersonalDetailsUpdated();
              soldToDetails = store.getSoldToDetails();
              mergedResponse = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_8__[/* matchAddresses */ "r"])(responseBody, soldToDetails);
              this.setProfileData(mergedResponse);
              model = {
                "communications": data.communications
              };
              this.setFormAnalytics('submit', model);
              this.callback();
            } else if (response.status === 401) {
              Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* signInRedirect */ "d"])();
            } else {
              this.setError(response);
              this.setFormAnalytics('error', responseBody);
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _signInSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(data) {
    var isCaptcha, response, responseBody, store, userDetails, _store3, needToChooseAccount, switchAccountUrl, signInRedirectStore, _store4, _signInRedirectStore;

    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
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

            store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
            store.setLegacyToken(responseBody.resetToken);
            window.location.replace(this.passwordUpdateUrl);
            return _context8.abrupt("return");

          case 16:
            if (!this.callback) {
              _context8.next = 40;
              break;
            }

            _context8.next = 19;
            return Object(_my_account_services_UserDetails__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this.callback);

          case 19:
            userDetails = _context8.sent;

            if (userDetails.failed) {
              _context8.next = 38;
              break;
            }

            _store3 = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();

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
            switchAccountUrl = Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* getNamedHeaderLink */ "a"])("data-switch-account-url");
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
            _store4 = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
            _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);

          case 53:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _signInSubmit.apply(this, arguments);
}

var setNewSoldTo = function setNewSoldTo(newSoldto) {
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
  _chooseAccountSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(data) {
    var selectedAccount, _i, _Object$keys, key, response, responseBody, queryString, store, signInRedirectStore, homePageUrl;

    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
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

            setNewSoldTo(selectedAccount);
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
            store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
            homePageUrl = Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* getNamedHeaderLink */ "a"])("data-homepage-url");
            window.location.replace(homePageUrl);
            return _context9.abrupt("return");

          case 26:
            if (response.status === 401) {
              Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* signInRedirect */ "d"])();
            } else {
              this.setError(responseBody);
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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
  _submitAccount = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(selectedAccount, urlChooseAccount) {
    var response, queryString, store, signInRedirectStore, homePageUrl;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
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
            store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]();
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
            homePageUrl = Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* getNamedHeaderLink */ "a"])("data-homepage-url");
            window.location.replace(homePageUrl);
            return _context10.abrupt("return");

          case 19:
            Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_7__[/* signInRedirect */ "d"])();

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
  _contactSupportSubmit = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(data) {
    var isCaptcha, response, responseBody;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            isCaptcha = data.hasOwnProperty('captcha');

            if (isCaptcha) {
              this.url = "".concat(this.url, "?captcha=").concat(data.captcha);
              delete data.captcha;
            }

            _context11.next = 4;
            return postData(this.url, data);

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
              _scripts_scrollTo__WEBPACK_IMPORTED_MODULE_2___default()(0);
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

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);
/* harmony import */ var _utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);





var getData = /*#__PURE__*/function () {
  var _ref = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url) {
    var response;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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
  var _ref2 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var url,
        _response,
        _args2 = arguments;

    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
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

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(299);
/* harmony import */ var _styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_print_page_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(133);
// Print Breaking CSS File



/***/ }),

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _services_UserDetails__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);





/* harmony default export */ __webpack_exports__["a"] = (/*#__PURE__*/(function () {
  var _ref = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(userDetailsUrl, checkSessionStore) {
    var sessionStore,
        service,
        navBarControls,
        userDetails,
        response,
        _args = arguments;
    return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);







var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, ErrorBoundary);

    _this = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(ErrorBoundary).call(this, props));
    _this.state = {
      hasError: false,
      hasErrored: false
    };
    return _this;
  }

  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(ErrorBoundary, [{
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
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_5___default.a.cloneElement(this.props.children, {
        hasError: this.state.hasError,
        hasErrored: this.state.hasErrored,
        resetErrorBoundaryToFalse: this.resetErrorBoundaryToFalse.bind(this),
        setErrorBoundaryToTrue: this.setErrorBoundaryToTrue.bind(this),
        removeNotifications: this.removeNotifications.bind(this)
      }));
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ErrorBoundary);

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(9);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var stores_sessionStore = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var whatwg_fetch_fetch = __webpack_require__(37);

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
var domElements = __webpack_require__(19);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

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

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

// EXTERNAL MODULE: ./src/search/ErrorBoundary.js
var ErrorBoundary = __webpack_require__(49);

// EXTERNAL MODULE: ./src/detail-tiles/hooks/useProfile.js
var useProfile = __webpack_require__(88);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8);

// CONCATENATED MODULE: ./src/detail-tiles/views/tile.js


 // import Form from '../../forms/form';

var Form = react_default.a.lazy(function () {
  return Promise.all(/* import() | forms */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 520));
});

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
  }, formMessage.linkText)), react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(Form, {
    config: form,
    submitFn: form.submitFn,
    callback: handleToggle,
    cancelFn: handleToggle,
    defaultValues: defaultValues,
    setProfileData: setProfileData
  }))));
};

/* harmony default export */ var views_tile = (tile_Tile);
// EXTERNAL MODULE: ./src/forms/services/submit.js
var services_submit = __webpack_require__(24);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(15);

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
    var profileReturnData = Object(useProfile["a" /* default */])(userDetailsUrl, soldToDetailsUrl, type, icons.refresh);
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
        submitFn = services_submit["e" /* personalSubmit */];
        break;

      case 'password':
        submitFn = services_submit["a" /* changePasswordSubmit */];
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
      return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(views_tile, {
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
      return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(views_tile, {
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

      return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(views_tile, Object.assign({}, tile, {
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

/* harmony default export */ var detail_tiles = __webpack_exports__["a"] = (detail_tiles_DetailTiles);

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scripts_ErrorMessages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71);
/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);






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

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, props.config)),
      _useState2 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_useState, 1),
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
/* harmony default export */ __webpack_exports__["default"] = (AddToCartModalBody);

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"colorBorderDark":"#9ca7b0","colorGray50":"#4f5b64","colorBackgroundLight":"#f4f6f7","colorWhite":"#fff","colorBlue50":"#07b","borderRadius":"4px","spaceXXXS":".25em","spaceXXS":".5em","spaceXS":".75em","spaceS":"1em"};

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);








var SkuMessage = /*#__PURE__*/function (_React$Component) {
  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(SkuMessage, _React$Component);

  function SkuMessage(props) {
    var _this;

    Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, SkuMessage);

    _this = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SkuMessage).call(this, props));

    _this.renderLink = function (_ref) {
      var label = _ref.label,
          title = _ref.title,
          url = _ref.url,
          blank = _ref.blank;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
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
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, Array.isArray(_this.props.message) && _this.props.message.length > 0 && _this.props.message.map(function (block, index) {
        var itemToRender = block.type === 'link' ? _this.renderLink(block) : _this.renderText(block);
        var space = '';

        if (block.rightSpace !== 'false' || typeof block.rightSpace == 'undefined') {
          space = ' ';
        }

        return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, {
          key: index
        }, itemToRender, space);
      }));
    };

    _this.displaySkuMsg = function () {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, _this.props.message, _this.props.linkMessage && _this.props.link && react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("a", {
        href: _this.props.link
      }, _this.props.linkMessage));
    };

    return _this;
  }

  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(SkuMessage, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-notification-wrapper ".concat(Array.isArray(this.props.message) ? 'sku-error-code' : ''),
        "data-locator": "sku-msg-notification-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_svg__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
        src: this.props.icon,
        className: "cmp-notification-icon",
        "data-locator": "sku-msg-notification-icon"
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-notification-body",
        "data-locator": "sku-msg-notification-body"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "cmp-notification-description",
        "data-locator": "sku-msg-notification-description"
      }, Array.isArray(this.props.message) ? this.displayError() : this.displaySkuMsg())));
    }
  }]);

  return SkuMessage;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SkuMessage);

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_generateTiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(101);
/* harmony import */ var _my_account_services_UserDetailsLazy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39);
/* harmony import */ var _my_account_services_SoldToDetailsLazy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50);
/* harmony import */ var _scripts_loginStatus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _utils_userFunctions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);








/* harmony default export */ __webpack_exports__["a"] = (function (userDetailsUrl, soldToDetailsUrl, type, icon) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(),
      _useState2 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]),
      _useState4 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState3, 2),
      tiles = _useState4[0],
      setTiles = _useState4[1];

  function getData() {
    var checkSessionStore = false;
    Object(_my_account_services_UserDetailsLazy__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(userDetailsUrl, checkSessionStore).then(function (userDetails) {
      if (userDetails.phone) {
        userDetails.phone = userDetails.phone.replace(/\D/g, '');
      }

      if (userDetails && userDetails.userId && userDetails.salesOrg) {
        if (type !== 'password') {
          Object(_my_account_services_SoldToDetailsLazy__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(soldToDetailsUrl, userDetails.userId, userDetails.salesOrg).then(function (soldToDetails) {
            var mergeAPIs = Object(_utils_userFunctions__WEBPACK_IMPORTED_MODULE_7__[/* matchAddresses */ "r"])(userDetails, soldToDetails);
            setData(mergeAPIs);
          });
        } else {
          setData(userDetails);
        }
      }
    });
  }

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    if (!_scripts_loginStatus__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"].state()) {
      var isInEditMode = document.getElementById("header").hasAttribute("data-is-edit-mode");

      if (!isInEditMode) {
        Object(_utils_redirectFunctions__WEBPACK_IMPORTED_MODULE_6__[/* notLoggedInRedirect */ "c"])();
        return null;
      }
    }
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    getData();
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    setTiles(Object(_utils_generateTiles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(data, type, icon));
  }, [data]);
  return {
    data: data,
    tiles: tiles,
    setData: setData
  };
});

/***/ })

/******/ });