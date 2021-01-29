(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 32:
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

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);








var Input = /*#__PURE__*/function (_PureComponent) {
  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Input, _PureComponent);

  function Input(props) {
    var _this;

    Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, Input);

    _this = Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(this, Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(Input).call(this, props));
    _this.state = {
      value: '',
      isApplyDisabled: false
    };
    _this.onChange = _this.onChange.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)));
    _this.onBlur = _this.onBlur.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)));
    _this.onKeyPress = _this.onKeyPress.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)));
    _this.onKeyUp = _this.onKeyUp.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)));
    _this.onFocus = _this.onFocus.bind(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)));
    return _this;
  }

  Object(C_Users_iphk_Project_AEM_Waters_code_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(Input, [{
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, null, showLabel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("label", {
        htmlFor: id,
        className: "visually-hidden"
      }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("input", {
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
}(react__WEBPACK_IMPORTED_MODULE_6__["PureComponent"]);

Input.defaultProps = {
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
/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "useFormApi", function() { return /* binding */ useFormApi; });
__webpack_require__.d(__webpack_exports__, "useFieldApi", function() { return /* binding */ useFieldApi; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(145);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(15);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/react-hook-form.ie11.js
var react_hook_form_ie11 = __webpack_require__(509);
var react_hook_form_ie11_default = /*#__PURE__*/__webpack_require__.n(react_hook_form_ie11);

// EXTERNAL MODULE: ./src/forms/fields/utils/stateWatcher.js + 1 modules
var stateWatcher = __webpack_require__(490);

// EXTERNAL MODULE: ./src/scripts/DigitalData.js
var DigitalData = __webpack_require__(8);

// EXTERNAL MODULE: ./src/search/ErrorBoundary.js
var ErrorBoundary = __webpack_require__(52);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js
var objectDestructuringEmpty = __webpack_require__(489);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(33);

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
// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(9);

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

  var _useContext2 = Object(react["useContext"])(useFormApi),
      isAlreadyRegistered = _useContext2.isAlreadyRegistered;

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
var patterns = __webpack_require__(66);

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
var validations = __webpack_require__(497);

// EXTERNAL MODULE: ./src/utils/eCommerceFunctions.js
var eCommerceFunctions = __webpack_require__(23);

// EXTERNAL MODULE: ./src/utils/labelFunctions.js
var labelFunctions = __webpack_require__(491);

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
      validation: validation,
      isAlreadyRegistered: isAlreadyRegistered
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
      var address = [];
      option.address.map(function (addressPiece) {
        address.push( /*#__PURE__*/react_default.a.createElement("div", {
          className: "cmp-form-field-".concat(type, "--address1")
        }, addressPiece));
      });
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
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
// EXTERNAL MODULE: ./node_modules/react-select/dist/react-select.esm.js + 1 modules
var react_select_esm = __webpack_require__(140);

// EXTERNAL MODULE: ./src/styles/variables.scss
var variables = __webpack_require__(32);
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

/* harmony default export */ var dropdown = (react_default.a.memo(dropdown_Dropdown));
// CONCATENATED MODULE: ./src/forms/fields/hr.js


var hr_Hr = function Hr(_ref) {
  var addClass = _ref.addClass;
  return /*#__PURE__*/react_default.a.createElement("hr", {
    className: addClass
  });
};

/* harmony default export */ var hr = (react_default.a.memo(hr_Hr));
// EXTERNAL MODULE: ./node_modules/react-google-recaptcha/lib/esm/index.js + 3 modules
var esm = __webpack_require__(510);

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
// EXTERNAL MODULE: ./node_modules/query-string/index.js
var query_string = __webpack_require__(59);

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

/* harmony default export */ var body = (body_Body);
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
// EXTERNAL MODULE: ./src/forms/fields/utils/fileAttachment.js
var fileAttachment = __webpack_require__(74);

// EXTERNAL MODULE: ./src/components/Input/Input.js
var Input_Input = __webpack_require__(521);

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
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-error-notification ".concat(variation, " ").concat(type, " ").concat(className),
    "data-locator": elementLocator
  }, icon && /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    className: "icon",
    src: icon,
    "data-locator": "".concat(elementLocator, "-icon"),
    "aria-hidden": true
  }), /*#__PURE__*/react_default.a.createElement("div", null, title && /*#__PURE__*/react_default.a.createElement("span", {
    className: "title",
    "data-locator": elementLocator && "".concat(elementLocator, "-title"),
    "aria-label": title
  }, title), description && /*#__PURE__*/react_default.a.createElement("span", {
    className: "description",
    "data-locator": elementLocator && "".concat(elementLocator, "-description"),
    "aria-label": description
  }, description), linkText && /*#__PURE__*/react_default.a.createElement("a", Object.assign({}, link, {
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
  return /*#__PURE__*/react_default.a.createElement("div", {
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

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-empty file-upload-input ".concat(className, " ").concat(file ? 'has-file' : '')
  }, /*#__PURE__*/react_default.a.createElement(Input_Input["a" /* default */], {
    showLabel: false,
    id: name,
    name: name,
    className: "file-input",
    type: "file",
    accept: accept,
    onChange: pickedHandler,
    setRef: setRef
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: "select-file",
    style: file ? {
      display: 'none'
    } : null
  }, /*#__PURE__*/react_default.a.createElement("a", {
    className: "file-upload-link",
    onClick: handleLinkClick,
    "data-locator": "upload-link-".concat(name),
    "aria-label": chooseAFileToUpload,
    role: "button",
    href: ""
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    src: upload,
    wrapper: "span",
    "data-locator": "icon-".concat(name),
    "aria-hidden": true
  }), "".concat(chooseAFileToUpload, " (").concat(accept, ")"))), file && /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-upload__preview"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-info-sec"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-view"
  }, /*#__PURE__*/react_default.a.createElement(react_svg["a" /* default */], {
    className: "file-svg",
    src: preview,
    "data-locator": "file-svg",
    "aria-hidden": true
  }), /*#__PURE__*/react_default.a.createElement("span", {
    "data-locator": "file-name-added",
    "aria-label": file.name
  }, file.name), /*#__PURE__*/react_default.a.createElement(divider, {
    type: "v-small"
  }), /*#__PURE__*/react_default.a.createElement("a", {
    className: "file-remove-link",
    onClick: resetFile,
    elementLocator: "file-remove-link",
    "aria-label": removeTextLabel,
    role: "button",
    href: ""
  }, removeTextLabel)), /*#__PURE__*/react_default.a.createElement("div", {
    className: "file-notify-sec"
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: "notify-container"
  }, !hasError && /*#__PURE__*/react_default.a.createElement(file_error_notification, {
    variation: "inline",
    className: "file-notify",
    type: "success",
    description: attachmentFileValidMsg,
    icon: valid,
    elementLocator: "file-format-verified"
  }), hasError && /*#__PURE__*/react_default.a.createElement(file_error_notification, {
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

  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("label", {
    htmlFor: name,
    "data-locator": Object(eCommerceFunctions["a" /* elementLocator */])(label) || 'form-field--label'
  }, Object(labelFunctions["a" /* renderFormattedLabel */])(label, validation.required, optionalLabel)), description && /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form_description"
  }, description), /*#__PURE__*/react_default.a.createElement("div", {
    className: "cmp-form-field file-upload-container"
  }, /*#__PURE__*/react_default.a.createElement(file_upload, {
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
  dropdown: dropdown,
  select: dropdown,
  "break": hr,
  captcha: captcha,
  body: body,
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

  return Component && field.active !== false && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(field_validation_display, {
    name: name,
    matchName: hasMatch ? getMatchName() : ''
  }, /*#__PURE__*/react_default.a.createElement(Component, field)));
};

/* harmony default export */ var forms_fields = (react_default.a.memo(fields_Field));
// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(39);

// EXTERNAL MODULE: ./src/stores/sessionStore.js
var sessionStore = __webpack_require__(2);

// EXTERNAL MODULE: ./src/scripts/loginStatus.js
var loginStatus = __webpack_require__(12);

// EXTERNAL MODULE: ./src/utils/redirectFunctions.js
var redirectFunctions = __webpack_require__(17);

// EXTERNAL MODULE: ./src/utils/spinner/index.js
var spinner = __webpack_require__(90);

// EXTERNAL MODULE: ./src/utils/userFunctions.js
var userFunctions = __webpack_require__(13);

// EXTERNAL MODULE: ./src/my-account/services/SoldToDetailsLazy.js + 1 modules
var SoldToDetailsLazy = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(4);

// CONCATENATED MODULE: ./src/forms/services/country-list.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(112).Promise : Promise;

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
              headers: {
                Accept: 'application/json',
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

function countryList(url) {
  return new _Promise( /*#__PURE__*/function () {
    var _ref2 = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(resolve) {
      var response, responseBody, countries;
      return regenerator_default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return getData(url);

            case 3:
              response = _context2.sent;
              _context2.next = 6;
              return response.json();

            case 6:
              responseBody = _context2.sent;

              if (!(response.status === 200)) {
                _context2.next = 10;
                break;
              }

              countries = responseBody.map(function (x) {
                return {
                  countryCode: x.code.toLowerCase(),
                  displayName: x.name
                };
              }).sort(function (a, b) {
                if (a.displayName > b.displayName) {
                  return 1;
                } else if (b.displayName > a.displayName) {
                  return -1;
                } else {
                  return 0;
                }
              });
              return _context2.abrupt("return", resolve({
                response: countries
              }));

            case 10:
              return _context2.abrupt("return", resolve({
                response: []
              }));

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);
              return _context2.abrupt("return", resolve({
                response: []
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 13]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}
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

  var _useState9 = Object(react["useState"])(),
      _useState10 = Object(slicedToArray["a" /* default */])(_useState9, 2),
      _ = _useState10[0],
      reloadCountryList = _useState10[1];

  var _useState11 = Object(react["useState"])(document.getElementById("header").hasAttribute("data-is-edit-mode")),
      _useState12 = Object(slicedToArray["a" /* default */])(_useState11, 2),
      isInEditMode = _useState12[0],
      setIsInEditMode = _useState12[1];

  var _useState13 = Object(react["useState"])(false),
      _useState14 = Object(slicedToArray["a" /* default */])(_useState13, 2),
      isAlreadyRegistered = _useState14[0],
      setIsAlreadyRegistered = _useState14[1];

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
      countryList(config.countryListUrl).then(function (_ref2) {
        var response = _ref2.response;
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

        var countryIdx = config.fields.findIndex(function (x) {
          return x.name.toLowerCase() === 'country';
        });

        if (countryIdx !== -1) {
          config.fields[countryIdx].options = response;
          reloadCountryList(config);
        }
      });
    }
  }, [config.formName]);

  var _useState15 = Object(react["useState"])(),
      _useState16 = Object(slicedToArray["a" /* default */])(_useState15, 2),
      newConfig = _useState16[0],
      setNewConfig = _useState16[1];

  Object(react["useEffect"])(function () {
    if (!config.getRadioOptions) {
      return;
    } // Only put this logic in for formName ==="chooseAccount"


    if (config.formName === "chooseAccount") {
      var store = new sessionStore["a" /* default */]();
      var userDetails = store.getUserDetails();
      Object(SoldToDetailsLazy["a" /* default */])(config.optionsEndpoint, userDetails.userId, userDetails.salesOrg).then(function (resp) {
        var store = new sessionStore["a" /* default */]();
        store.setSoldToDetails(resp);
        var tempArray = resp.map(function (item) {
          var tempOption = {};
          var tempAddress;
          tempOption.name = item.customerNumber;
          tempOption.label = item.name;
          tempAddress = Object(userFunctions["d" /* getAddressesByType */])(item, "soldToInfo")[0];
          delete tempAddress.name;
          tempOption.address = Object(userFunctions["m" /* getFullCompanyAddress */])(tempAddress, false);
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
        soldToDetailsUrl: config.soldToDetailsUrl,
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
    return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(spinner["a" /* default */], {
      loading: !displayForm
    }), renderForm());
  }
};

var form_ErrorBoundaryForm = function ErrorBoundaryForm(props) {
  return /*#__PURE__*/react_default.a.createElement(ErrorBoundary["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(form_Form, props));
};

/* harmony default export */ var forms_form = __webpack_exports__["default"] = (form_ErrorBoundaryForm); // Context Variables

var useFormApi = FormApi;
var useFieldApi = FieldApi;

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ functions; });

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(40);

// CONCATENATED MODULE: ./src/forms/services/EmailService.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(112).Promise : Promise;



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
var fileAttachment = __webpack_require__(74);

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

/***/ })

}]);