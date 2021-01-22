(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_sessionStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);





function UserGreeting(props) {
  var greetings = props.greetings,
      logoDirectoryPath = props.logoDirectoryPath;
  var store = new _stores_sessionStore__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]();
  var savedUserDetails = store.getUserDetails();
  var name = "".concat(savedUserDetails.firstName || '', " ").concat(savedUserDetails.lastName || '');
  var company = savedUserDetails.company || '';

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState2 = Object(C_MySpace_waters_waters_aem_website_waters_aem_frontend_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_useState, 2),
      isImageHidden = _useState2[0],
      hideCompanyImageOnError = _useState2[1];

  var srcLogo = Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* getCompanyLogo */ "b"])(logoDirectoryPath, Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* htmlParser */ "d"])(company));
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "greetings",
    "data-locator": "user-greeting-sec"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
    "data-locator": "user-greeting"
  }, greetings), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
    "data-locator": "user-greeting-name"
  }, Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* htmlParser */ "d"])(name)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", {
    "data-locator": "user-greeting-company"
  }, Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* htmlParser */ "d"])(company))), !isImageHidden && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: srcLogo,
    alt: Object(_utils_eCommerceFunctions__WEBPACK_IMPORTED_MODULE_3__[/* htmlParser */ "d"])(company),
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
/* harmony default export */ __webpack_exports__["default"] = (UserGreeting);

/***/ })

}]);