(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(1);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(3);

// EXTERNAL MODULE: ./src/sku-details/views/addToCart.js
var addToCart = __webpack_require__(102);

// EXTERNAL MODULE: ./src/sku-details/views/addToCartModal.js
var addToCartModal = __webpack_require__(54);

// EXTERNAL MODULE: ./src/utils/modal/index.js + 1 modules
var modal = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(26);

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
var screenSizes = __webpack_require__(21);

// EXTERNAL MODULE: ./src/analytics/index.js + 1 modules
var analytics = __webpack_require__(25);

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