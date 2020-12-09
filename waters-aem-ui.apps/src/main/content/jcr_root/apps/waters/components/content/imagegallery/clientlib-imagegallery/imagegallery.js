(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

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

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-svg/es/react-svg.js
var react_svg = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/hammerjs/hammer.js
var hammer = __webpack_require__(495);
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
// EXTERNAL MODULE: ./src/scripts/screenSizes.js
var screenSizes = __webpack_require__(12);

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
/* harmony default export */ var image_carousel = __webpack_exports__["default"] = (image_carousel_ImageCarousel);

/***/ })

}]);