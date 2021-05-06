import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import domElements from "../../scripts/domElements";
import screenSizes from "../../scripts/screenSizes";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { debounce } from "throttle-debounce";
import { replaceInSrc } from "../../utils/userFunctions";
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
    };
    this.prevWindowWidth = window.innerWidth;
    // Debouncing functions to reduce frequency of execution
    this.hideSearchModalDebounce = debounce(100, this.hideSearchModal);
    this.elementNoScrollDebounce = debounce(100, domElements.noScroll);
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
  renderPreviewPlayer = () =>
    this.props.templates.length > 0 &&
    this.props.templates.map((template, index) =>
      this.mapTemplateToPreviewplayer(template, index)
    );

  mapTemplateToPreviewplayer = (template, index) => (
    <div
      style={{ display: this.state.activeIndex === index ? "block" : "none" }}
    >
      <div className="preview-area-wrapper">
        <div className="pinch-to-zoom">
          <ReactSVG src={this.props.zoomInIcon} />
          <span className="pinch-to-zoom-label">{this.props.pinchLabel}</span>
        </div>
        <PreviewPlayer
          imgSrc={template.src}
          widths={this.props.widths}
          alt={template.alt}
          defaultImage={replaceInSrc(template.src, WIDTHS[0])}
        />
        <div className="image-description">{template.title}</div>
      </div>
    </div>
  );
  renderThumbnails = () =>
    this.props.templates.length > 0 ? (
      this.props.templates.map((item, index) => (
        <Thumbnail
          thumbnailSrcURL={replaceInSrc(item.src, WIDTHS[0])}
          thumbnailAltText={item.alt}
          isVideo={item.src === undefined}
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
