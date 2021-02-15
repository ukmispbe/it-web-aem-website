import React, { Component } from "react";
import ReactSVG from "react-svg";
import domElements from "../scripts/domElements";
import screenSizes from "../scripts/screenSizes";
import SearchBar from "../search/components/searchbar";
import { debounce } from "throttle-debounce";

class HeaderSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: screenSizes.isMobile(),
      mobileSearchOpen: false,
    };
    this.prevWindowWidth = window.innerWidth;
    // Debouncing functions to reduce frequency of execution
    this.hideSearchModalDebounce = debounce(100, this.hideSearchModal);
    this.elementNoScrollDebounce = debounce(100, domElements.noScroll);
  }

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

  render() {
    const modalView = (
      <div className="mobile-header-search-bar">
        <div className="mobile-header-search-bar__title">
          <span>{this.props.labels.search}</span>
          <button
            aria-label={this.props.labels.clear}
            onClick={(e) => this.hideSearchModal(e)}
            onMouseDown={(e) => e.preventDefault()}
            className="mobile-clear-icon"
          >
            <ReactSVG aria-hidden="true" src={this.props.iconClear} />
          </button>
        </div>
        <SearchBar {...this.props} disableOverlay={true} />
      </div>
    );
    return this.state.mobileSearchOpen && modalView;
  }
}

export default HeaderSearchModal;
