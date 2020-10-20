import React, { Component } from "react";
import ReactSVG from "react-svg";
import screenSizes from "../scripts/screenSizes";
import SearchBar from "../search/components/searchbar";

class HeaderSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: screenSizes.isMobile(),
    };
  }

  checkScreenSize = () => {
    const isMobile = screenSizes.isMobile();
    (this.state.isMobile !== isMobile) && this.setState({isMobile: isMobile});
  }

  componentDidMount() {
    // this is for desktop
    window.addEventListener("resize", this.checkScreenSize);

    // this is for iPad orientation
    window.addEventListener("orientationchange", this.checkScreenSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener("orientationchange", this.checkScreenSize);
  }

  handleSearchIconClick = (e) => {
    window.dispatchEvent(new CustomEvent("showMobileSearch"));
  };

  render() {
    const mobileView = (
      <>
        <button
          aria-label={this.props.labels.search}
          onClick={(e) => this.handleSearchIconClick(e)}
          onMouseDown={(e) => e.preventDefault()}
          className="mobile-search-icon"
          data-locator="link-header-my-account-search"
        >
          <ReactSVG
            aria-hidden="true"
            src={this.props.iconSearch}
          />
        </button>
      </>
    );
    const defaultview = (
      <>
        <SearchBar {...this.props} />
      </>
    );
    return this.state.isMobile ? mobileView : defaultview;
  }
}

export default HeaderSearchBar;
