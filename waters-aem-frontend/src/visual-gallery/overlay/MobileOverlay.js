import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import domElements from "../../scripts/domElements";
import screenSizes from "../../scripts/screenSizes";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { debounce } from "throttle-debounce";
import { WIDTHS } from "../../constants";
import "../../styles/mobile-overlay-visual-gallery.scss";

class MobileOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: screenSizes.isMobile(),
      mobileSearchOpen: true,
      activeIndex: 0,
      thumbnailClicked: false,
      magnified: false,
    };
    this.figureRef = React.createRef();
    this.prevWindowWidth = window.innerWidth;
    // Debouncing functions to reduce frequency of execution
    this.hideSearchModalDebounce = debounce(100, this.hideSearchModal);
    this.elementNoScrollDebounce = debounce(100, domElements.noScroll);
    this.galleryContext = [...props.templates, ...props.videoConfig];
  }

  handleThumbnailClick = (activeIndex) =>
    this.setState({ activeIndex, thumbnailClicked: true });

  showSearchModal = () => {
    this.setState({ mobileSearchOpen: !this.state.mobileSearchOpen }, () =>
      this.elementNoScrollDebounce(this.state.mobileSearchOpen)
    );
  };

  hideSearchModal = (e) => {
    if (this.state.mobileSearchOpen) {
      this.setState({ mobileSearchOpen: false });
      this.elementNoScrollDebounce(false);
    }
  };

  backButtonHandler = (e) => {
    const rootNode = document.querySelector(
      ".moboverlay-preview-player-container"
    );
    if (rootNode.classList.contains("fit-on-zoom")) {
      rootNode.classList.remove("fit-on-zoom");
      document
        .querySelector(".image-zoom-area")
        .currentTarget.classList.remove("zoom-it");
    } else {
      this.props.closeMobileOverlay();
    }
    console.log("back button is clicked");
  };

  windowResizeHandler = () => {
    if (!this.state.mobileSearchOpen) {
      return;
    }
    // Trigger the action only when screen width changes
    if (this.prevWindowWidth === window.innerWidth) {
      this.elementNoScrollDebounce(true);
      return;
    }
    this.prevWindowWidth = window.innerWidth;
    this.hideSearchModalDebounce();
  };

  handleFigureMove = (magnified, offsetX, offsetY, figureElement) => {
    // if (!magnified) return;

    let x = (offsetX / figureElement.offsetWidth) * 100;
    let y = (offsetY / figureElement.offsetHeight) * 100;

    // prevent user from scrolling off the boundary of the figure element
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

    figureElement.style.backgroundPosition = `${x}% ${y}%`;
  };

  handleImageMouseMove = (e) => {
    const offsetX = e.nativeEvent.offsetX;
    const offsetY = e.nativeEvent.offsetY;

    this.handleFigureMove(
      this.state.magnified,
      offsetX,
      offsetY,
      e.currentTarget
    );
  };

  handleImageTouchMove = (e) => {
    const rectObj = e.nativeEvent.touches[0].target.getBoundingClientRect();
    const offsetX =
      e.nativeEvent.touches[0].pageX - rectObj.left - window.pageXOffset;
    const offsetY =
      e.nativeEvent.touches[0].pageY - rectObj.top - window.pageYOffset;

    this.handleFigureMove(
      this.state.magnified,
      offsetX,
      offsetY,
      e.currentTarget
    );
  };

  zoomImage = (e) => {
    this.setState({ magnified: !this.state.magnified });
    const rootNode = document.querySelector(
      ".moboverlay-preview-player-container"
    ).classList;
    const imageZoomArea = document.querySelector(".image-zoom-area").classList;
    if (rootNode.contains("fit-on-zoom")) {
      rootNode.remove("fit-on-zoom");
    } else {
      rootNode.add("fit-on-zoom");
    }
    if (imageZoomArea.contains("zoom-it")) {
      imageZoomArea.remove("zoom-it");
    } else {
      imageZoomArea.add("zoom-it");
    }
    e.currentTarget.style.backgroundPosition = "50% 50%";
  };

  handleOnDragStart = (e) => e.preventDefault();

  componentDidMount() {
    window.addEventListener("showMobileSearch", this.showSearchModal, false);

    // this is for desktop
    window.addEventListener("resize", this.windowResizeHandler);

    // this is for iPad orientation
    window.addEventListener("orientationchange", this.hideSearchModalDebounce);
  }

  componentWillUnmount() {
    window.removeEventListener("showMobileSearch", this.showSearchModal);
    window.removeEventListener("resize", this.windowResizeHandler);
    window.removeEventListener(
      "orientationchange",
      this.hideSearchModalDebounce
    );
  }
  renderPreviewPlayer = () => {
    // first render as active index..
    const index = this.state.activeIndex;
    const inputProps = this.galleryContext[index];
    return this.mapTemplateToPreviewplayer(inputProps, index);
  };

  mapTemplateToPreviewplayer = (inputProps, index) => (
    <div
      style={{ display: this.state.activeIndex === index ? "block" : "none" }}
    >
      <div className="preview-area-wrapper">
        {!inputProps.src ? (
          <div className="video-title">{inputProps.title}</div>
        ) : (
          <>
            <div className="pinch-to-zoom">
              <ReactSVG src={this.props.zoomInIcon} />
              <span className="pinch-to-zoom-label">
                {this.props.zoomLabel}
              </span>
            </div>
          </>
        )}
        <div className="preview-player">
          <PreviewPlayer
            imgSrc={inputProps.src}
            widths={this.props.widths.sort((a, b) => b - a)}
            alt={inputProps.alt}
            videoConfig={inputProps}
            handleImageMouseMove={this.handleImageMouseMove}
            handleOnDragStart={this.handleOnDragStart}
            zoomImage={this.zoomImage}
            handleImageTouchMove={this.handleImageTouchMove}
          />
        </div>
        <div className="image-description">{inputProps.description}</div>
      </div>
    </div>
  );
  renderThumbnails = () =>
    this.galleryContext.length > 0 ? (
      this.galleryContext.map((item, index) => (
        <Thumbnail
          key={`item-${index}`}
          thumbnailSrcURL={item.thumbnail || item.src}
          thumbnailAltText={item.alt}
          className={this.state.activeIndex === index && "thumbnail-active"}
          isVideo={item.src === undefined}
          videoIconURL={item.videoIconURL}
          onThumbnailClick={() => this.handleThumbnailClick(index)}
        />
      ))
    ) : (
      <></>
    );

  renderVisualGallery = () => (
    <div className="moboverlay-container">
      <section>
        <div className="moboverlay-preview-player-container">
          {this.renderPreviewPlayer()}
        </div>
      </section>
      <section>
        <div>{this.renderThumbnails()}</div>
      </section>
    </div>
  );

  render() {
    const modalView = (
      <div className="mobile-header-search-bar">
        <div className="mobile-header-search-bar__title">
          <div
            role="button"
            aria-label={this.props.backBtnLabel}
            onClick={(e) => this.backButtonHandler(e)}
            onMouseDown={(e) => e.preventDefault()}
            className="mobile-back-btn"
          >
            <ReactSVG aria-hidden="true" src={this.props.iconLeft} />
            <span>{this.props.backBtnLabel}</span>
          </div>

          <button
            aria-label={this.props.closeBtnLabel}
            onClick={(e) => this.hideSearchModal(e)}
            onMouseDown={(e) => e.preventDefault()}
            className="mobile-clear-icon"
          >
            <ReactSVG aria-hidden="true" src={this.props.iconClear} />
          </button>
        </div>
        {this.renderVisualGallery()}
      </div>
    );
    return this.state.mobileSearchOpen && modalView;
  }
}
MobileOverlay.defaultProps = {
  widths: WIDTHS,
};

MobileOverlay.propTypes = {
  alt: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  widths: PropTypes.arrayOf(PropTypes.string).isRequired,
  zoomInIcon: PropTypes.string.isRequired,
};
export default MobileOverlay;
