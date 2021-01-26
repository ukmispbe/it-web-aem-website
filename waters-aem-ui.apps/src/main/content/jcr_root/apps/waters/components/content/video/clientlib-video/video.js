(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ 505:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@brightcove/react-player-loader/dist/brightcove-react-player-loader.es.js
var brightcove_react_player_loader_es = __webpack_require__(504);

// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(10);

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
// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/index.js
var lib = __webpack_require__(498);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./node_modules/react-lines-ellipsis/lib/responsiveHOC.js
var responsiveHOC = __webpack_require__(506);
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

/* harmony default export */ var video = __webpack_exports__["default"] = (video_VideoContainer);

/***/ })

}]);