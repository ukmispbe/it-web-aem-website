import React from "react";
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import screenSizes from '../scripts/screenSizes';

const PREV = -1;
const NEXT = 1;
const WIDTH_PER_THUMBNAIL = 86;

class ImageThumbnails extends React.Component {
  constructor(props) {
    super(props);

    this.gradientLeftRef = React.createRef();
    this.gradientRightRef = React.createRef();

    this.refs = [];

    this.state = {
      firstIndex: 0,
      selectedIndex: 0,
      xStart: 0,
      yStart: 0,
      xMove: 0,
      yMove: 0
    };
  }

  handleSlide = dir => {
    const newIndex = this.state.firstIndex + dir;

    // check the boundaries to prevent sliding beyond left/right boundary
    if (dir === PREV && newIndex === -1) { return }

    if (dir === NEXT && newIndex >= this.getLastIndex(this.props.width, this.props.items.length) + 1) { return }

    if (dir === NEXT) {
      this.handleSlideNext(this.state.firstIndex, newIndex);
    } else {
      this.handleSlidePrev(this.state.firstIndex, newIndex);
    }
  };

  getSlideDelay = () => screenSizes.isTabletAndUnder() ? 125 : 250;

  handleSlideNext = (currentIndex, newIndex) => {
    // delay so the CSS transition for sliding is not prevented
    setTimeout(() => this.refs[currentIndex].current.style.display = "none", this.getSlideDelay());

    this.setState({ firstIndex: newIndex });
  };

  handleSlidePrev = (currentIndex, newIndex) => {
    // delay both statements to allow fast continous sliding
    // this will happend if the user continously clicks the previous button
    setTimeout(() => this.refs[newIndex].current.style.display = "", 25);
    setTimeout(() => this.setState({ firstIndex: newIndex }), 50);
  };

  handleTouchStart = e => {
    const touch = e.touches[0];
    this.setState({ xStart: touch.clientX, yStart: touch.clientY });
  };

  handleTouchMove = e => {
    const touch = e.touches[0];
    this.setState({ xMove: touch.clientX, yMove: touch.clientY });
  };

  handleTouchEnd = e => {
    if (this.state.xMove === 0) return;

    if (this.state.xStart < this.state.xMove) {
      this.handleSlide(PREV);
    } else {
      this.handleSlide(NEXT);
    }

    this.setState({ xStart: 0, yStart: 0, xMove: 0, yMove: 0 });
  };

  getItemClassName = index => {
    if (index < this.state.firstIndex) {
      return `image-thumbnails-container__item--hidden ${
        this.state.selectedIndex === index
          ? "image-thumbnails-container__item--selected"
          : ""
      }`;
    }

    return `image-thumbnails-container__item--visible ${
      this.state.selectedIndex === index
        ? "image-thumbnails-container__item--selected"
        : ""
    }`;
  };

  handleItemClick = (item, index) => {
    if (this.props.onItemClick) {
      this.props.onItemClick({ item, index });
    }

    this.setState({ selectedIndex: index });
  };

  renderItems = () => {
    // refs are used to toggle the display property for each item during sliding
    // and to highlight the selected that has been clicked
    this.refs = [];

    for (let i = 0; i < this.props.items.length; i++) {
      this.refs.push(React.createRef());
    }

    return this.props.items.map((item, index) => (
      <div
        ref={this.refs[index]}
        key={index}
        className={`image-thumbnails-container__item ${this.getItemClassName(index)}`}
        onClick={e => this.handleItemClick(item, index)}
      >
        {item}
      </div>
    ));
  };

  getPrevButtonClassName = () => this.state.firstIndex === 0 ? 'image-thumbails-button--disabled' : '';

  getNextButtonClassName = () => {
    const lastIndex = this.getLastIndex(this.props.width, this.props.items.length);

    if (this.state.firstIndex === lastIndex) {
        return 'image-thumbails-button--disabled';
    }

    return '';
  }

  getTotalVisibleItems = (width, widthPerThumbnail) => Math.floor((width - (screenSizes.isTabletAndUnder() ? 0 : 100)) / widthPerThumbnail);

  getLastIndex = (width, totalItems) => totalItems - this.getTotalVisibleItems(width, WIDTH_PER_THUMBNAIL);

  getImageThumbnailsWrapperStyle = () => {
      // check if scrolling thumbnails is needed
      // if scrolling is needed, set width and show the next and previous buttons
      // if scrolling is not needed, no need for width and buttons... simply center images
      const totalVisibleItems = this.getTotalVisibleItems(this.props.width, WIDTH_PER_THUMBNAIL);

      if (this.props.items.length <= totalVisibleItems) {
          return {};
      }

      return {width: `${this.props.width}px`}
  }

  getImageThumbnailsWrapperClassName = () => {
    // check if scrolling thumbnails is needed
    // if scrolling is needed, set width and show the next and previous buttons
    // if scrolling is not needed, no need for width and buttons... simply center images
    const totalVisibleItems = this.getTotalVisibleItems(this.props.width, WIDTH_PER_THUMBNAIL);

    if (this.props.items.length <= totalVisibleItems) {
        return 'image-thumbnails-wrapper--no-x-scroll';
    }

    return ''
  }

  gradientLeft = () => {
    if (this.state.firstIndex !== 0) {
      this.addGradientLeft();
    } else {
      this.removeGradientLeft();
    }
  }

  gradientRight = () => {
    const lastIndex = this.getLastIndex(this.props.width, this.props.items.length);

    if (this.state.firstIndex < lastIndex) {
      this.addGradientRight();
    } else {
      this.removeGradientRight();
    }
  }

  addGradientLeft = () => {
    if (this.gradientLeftRef.current) {
      this.gradientLeftRef.current.style.display = 'block';
    }
  }

  removeGradientLeft = () => {
    if (this.gradientLeftRef.current) {
      this.gradientLeftRef.current.style.display = 'none';
    }
  }

  addGradientRight = () => {
    if (this.gradientRightRef.current) {
      this.gradientRightRef.current.style.display = 'block';
    }
  }

  removeGradientRight = () => {
    if (this.gradientRightRef.current) {
      this.gradientRightRef.current.style.display = 'none';
    }
  }

  render() {
    return (
      <div className={`image-thumbnails-wrapper ${this.getImageThumbnailsWrapperClassName()}`} style={this.getImageThumbnailsWrapperStyle()}>
        <div className={`image-thumbnails-button ${this.getPrevButtonClassName()}`} onClick={e => this.handleSlide(PREV)}>
            <ReactSVG src="/content/dam/waters/en/brand-assets/icons/left.svg" />
        </div>
        <div
          className="image-thumbnails-container"
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <div ref={this.gradientLeftRef} class="image-thumbnails-wrapper__gradient-left"></div>
          {this.renderItems()}
          <div ref={this.gradientRightRef} class="image-thumbnails-wrapper__gradient-right"></div>
        </div>
        <div className={`image-thumbnails-button ${this.getNextButtonClassName()}`} onClick={e => this.handleSlide(NEXT)}>
            <ReactSVG src="/content/dam/waters/en/brand-assets/icons/right.svg" />
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (screenSizes.isTabletAndUnder()) {
      this.gradientLeft();
      this.gradientRight();
    }
  }
}

ImageThumbnails.propTypes = {
    items: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired
}

export default ImageThumbnails;