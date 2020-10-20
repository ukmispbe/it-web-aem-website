import React, { Component } from "react";
import ReactSVG from "react-svg";
import domElements from "../scripts/domElements";
import screenSizes from "../scripts/screenSizes";
import SearchBar from "../search/components/searchbar";

class HeaderSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: screenSizes.isMobile(),
      mobileSearchOpen: false,
    };
  }

  showSearchModal = () => {
    this.setState({ mobileSearchOpen: !this.state.mobileSearchOpen }, () =>
      domElements.noScroll(this.state.mobileSearchOpen)
    );
  };

  hideSearchModal = (e) => {
    if (this.state.mobileSearchOpen) {
      this.setState({ mobileSearchOpen: false });
      domElements.noScroll(false);
    }
  };

  componentDidMount() {
    window.addEventListener("showMobileSearch", this.showSearchModal, false);

    // this is for desktop
    window.addEventListener("resize", this.hideSearchModal);

    // this is for iPad orientation
    window.addEventListener("orientationchange", this.hideSearchModal);
  }

  componentWillUnmount() {
    window.removeEventListener("showMobileSearch", this.showSearchModal);
    window.removeEventListener("resize", this.hideSearchModal);
    window.removeEventListener("orientationchange", this.hideSearchModal);
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
