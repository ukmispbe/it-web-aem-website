(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return parameterValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return parameterDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return searchMapper; });
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);







var queryString = __webpack_require__(60);

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

    Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, SearchService);

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
      var _ref5 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(rows, term) {
        var searchString, callService, response;
        return C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
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

  Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SearchService, [{
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

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(138);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(34);

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

// EXTERNAL MODULE: ./src/search/services/index.js
var services = __webpack_require__(137);

// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/withRouter.js + 1 modules
var withRouter = __webpack_require__(506);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

// CONCATENATED MODULE: ./src/search/components/no-results.js



var no_results_NoResults = function NoResults(_ref) {
  var searchText = _ref.searchText,
      query = _ref.query;
  var forQuery = react_default.a.createElement("span", null, "for \"", react_default.a.createElement("strong", null, query), "\"");
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement("h2", {
    className: "cmp-search__resultsCount noresults"
  }, "Showing 0 results", ' ', " ", forQuery), react_default.a.createElement("div", {
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
var validator = __webpack_require__(485);
var validator_default = /*#__PURE__*/__webpack_require__.n(validator);

// EXTERNAL MODULE: ./src/scripts/domElements.js
var domElements = __webpack_require__(19);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(12);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/react-spinners/index.js
var react_spinners = __webpack_require__(154);

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
      return react_default.a.createElement("div", {
        className: "cmp-search-overlay"
      }, react_default.a.createElement(react_spinners["ClipLoader"], {
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
    return react_default.a.createElement(react_default.a.Fragment, null);
  }

  return react_default.a.createElement("div", null, react_default.a.createElement("div", {
    className: "overlay"
  }), react_default.a.createElement(spinner, {
    loading: true
  }));
};

loading_Loading.defaultProps = {
  visible: false
};
/* harmony default export */ var loading = (loading_Loading);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(4);
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
var react_paginate = __webpack_require__(486);
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

        return react_default.a.createElement("li", {
          className: "cmp-search-filters__filter__item",
          key: "".concat(item.value, "#_").concat(index)
        }, react_default.a.createElement("a", {
          href: "javascript:void(0)",
          className: 'checkbox ' + (checked ? 'checked' : ''),
          onClick: _this2.checkHandler.bind(_this2),
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
// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js + 1 modules
var react_select_esm = __webpack_require__(110);

// EXTERNAL MODULE: ./src/styles/variables.scss
var variables = __webpack_require__(30);
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
  return react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.theme.dropdownIndicator,
    className: "dropDownIcon"
  }));
};

var getOptions = function getOptions(options) {
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
  var options = getOptions(props.categoryOptions);

  var mobileView = function mobileView() {
    return react_default.a.createElement("div", {
      className: "cmp-search-category-dropdown"
    }, react_default.a.createElement(react_select_esm["c" /* default */], {
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

  return react_default.a.createElement(react_default.a.Fragment, null, screenSizes["a" /* default */].isTabletAndUnder() ? mobileView() : null);
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
var assertThisInitialized = __webpack_require__(38);

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
  return react_default.a.createElement(react_select_esm["a" /* components */].DropdownIndicator, props, react_default.a.createElement(react_svg["a" /* default */], {
    src: props.theme.dropdownIndicator
  }));
};

var dropdown_Dropdown = function Dropdown(props) {
  return react_default.a.createElement("div", {
    "aria-describedby": "cmp-custom-dropdown__single-value",
    tabindex: "0"
  }, react_default.a.createElement(react_select_esm["c" /* default */], {
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
  return react_default.a.createElement("div", {
    className: "cmp-search-sortby",
    "data-locator": "sortby-label"
  }, react_default.a.createElement("h3", null, props.text.sortByHeading), react_default.a.createElement(dropdown, {
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


var results_count_ResultsCount = function ResultsCount(props) {
  var endResults = props.count > props.current * props.rows ? props.current * props.rows : props.count;
  var startResults = props.current * props.rows - props.rows + 1;
  var maxLength = 120;
  var searchQuery = props.query && props.query.toString().length > maxLength ? props.query.substring(0, maxLength) + '...' : props.query;

  var renderSearchTerm = function renderSearchTerm() {
    return props.spell_suggestion ? getSuggestedQueryInfo() : getSearchQuery();
  };

  var getSuggestedQueryInfo = function getSuggestedQueryInfo() {
    return react_default.a.createElement("span", null, "for\xA0", react_default.a.createElement("span", {
      className: "text-strike"
    }, searchQuery), "\xA0", react_default.a.createElement("strong", null, react_default.a.createElement("q", {
      className: "query"
    }, props.spell_suggestion), "."));
  };

  var getSearchQuery = function getSearchQuery() {
    return react_default.a.createElement("span", null, "for\xA0", react_default.a.createElement("strong", null, react_default.a.createElement("q", {
      className: "query"
    }, searchQuery), "."));
  };

  var renderRelatedSuggestions = function renderRelatedSuggestions() {
    return props.spell_related_suggestions.length !== 0 ? react_default.a.createElement("div", {
      className: "cmp-search__related-suggestions"
    }, "Related Searches ", getRelatedSuggestions()) : react_default.a.createElement(react_default.a.Fragment, null);
  };

  var getRelatedSuggestions = function getRelatedSuggestions() {
    return props.spell_related_suggestions.length === 1 ? getRelatedSuggestionLink(props.spell_related_suggestions[0]) : getRelatedSuggestionLinks(props.spell_related_suggestions).reduce(function (prev, curr) {
      return react_default.a.createElement(react_default.a.Fragment, null, prev, react_default.a.createElement("span", {
        className: "vertical-bar"
      }, "|"), curr);
    });
  };

  var getRelatedSuggestionLink = function getRelatedSuggestionLink(word) {
    return react_default.a.createElement("a", {
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

  return react_default.a.createElement("div", {
    className: "cmp-search__resultsCount-container",
    "data-locator": "results-count-container"
  }, react_default.a.createElement("h2", {
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

    for (var _i2 = 0; _i2 < f.length; _i2++) {
      _loop(_i2);
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
  }), react_default.a.createElement("span", null, "".concat(props.text['contentType'], ": ").concat(props.selected.facetTranslation)));
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

// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/index.js
var lib = __webpack_require__(487);
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
// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(15);

// CONCATENATED MODULE: ./src/search/search.component.helpers.js















var SkuList = react_default.a.lazy(function () {
  return Promise.all(/* import() | skulist */[__webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(0), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, 525));
});




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
      children = _ref2.children;
  return react_default.a.createElement("div", {
    className: "container__left cmp-search__sort-filter",
    "data-locator": "left-container-filter"
  }, react_default.a.createElement(btn_hide_sort_filter, {
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
  return react_default.a.createElement(react["Suspense"], {
    fallback: react_default.a.createElement("div", null, "Loading...")
  }, react_default.a.createElement(SkuList, {
    skuConfig: skuConfig,
    data: skuData,
    onItemClick: onItemClick
  }));
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

// EXTERNAL MODULE: ./src/navigation/tabs/index.js
var tabs = __webpack_require__(510);

// CONCATENATED MODULE: ./src/search/search.component.js






var search_component_SearchComponent = function SearchComponent(props) {
  return react_default.a.createElement(react_default.a.Fragment, null, !props.isEprocurementUser && react_default.a.createElement(tabs["a" /* default */], {
    className: "cmp-search__categories-tabs",
    items: props.categoryProps.categories,
    activeIndex: props.categoryProps.activeIndex,
    onClick: props.categoryEvents.onCategoryTabClick
  }), react_default.a.createElement("div", null, react_default.a.createElement("div", {
    className: "overlay"
  }), react_default.a.createElement(search_component_helpers_Aside, {
    sortFilterIsPristine: props.asideProps.sortFilterIsPristine,
    text: props.text,
    asideProps: props.asideProps,
    asideEvents: props.asideEvents
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
        return react_default.a.createElement(loading, {
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
var BrowserRouter = __webpack_require__(502);

// EXTERNAL MODULE: ./node_modules/react-router-dom/es/Route.js
var Route = __webpack_require__(503);

// EXTERNAL MODULE: ./src/search/ErrorBoundary.js
var ErrorBoundary = __webpack_require__(49);

// CONCATENATED MODULE: ./src/search/index.js







var search_SearchApp = function SearchApp(props) {
  var isoCode = Object(userFunctions["p" /* isEprocurementUser */])() && Object(userFunctions["l" /* getIsoCode */])() || props.isocode;
  var search = new services["a" /* SearchService */](isoCode, props.searchServicePath, services["b" /* parameterDefaults */].page, props.searchDefaults.rows, services["b" /* parameterDefaults */].sort, undefined, function () {});
  return react_default.a.createElement(react_default.a.Fragment, null, react_default.a.createElement(BrowserRouter["a" /* default */], null, react_default.a.createElement(Route["a" /* default */], {
    path: "",
    render: function render() {
      return react_default.a.createElement(ErrorBoundary["a" /* default */], null, react_default.a.createElement(search_container, {
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

/* harmony default export */ var src_search = __webpack_exports__["default"] = (search_SearchApp);

/***/ })

}]);