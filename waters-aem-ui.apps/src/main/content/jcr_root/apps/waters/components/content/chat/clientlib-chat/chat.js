(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/whatwg-fetch/fetch.js
var fetch = __webpack_require__(40);

// CONCATENATED MODULE: ./src/chat/services/index.js



var _Promise = typeof Promise === 'undefined' ? __webpack_require__(114).Promise : Promise;



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

/* harmony default export */ var services = (services_ChatService);
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
    _this.request = new services(_this.props.countryCode, _this.props.statusApi);
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

/* harmony default export */ var chat = __webpack_exports__["default"] = (chat_Chat);

/***/ })

}]);