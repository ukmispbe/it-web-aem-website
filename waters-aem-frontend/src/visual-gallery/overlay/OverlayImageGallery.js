import React from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { replaceInSrc } from "../../utils/userFunctions";
import { WIDTHS } from "../../constants";

import "../../styles/overlay-image-gallery.scss";

class ImageGallery extends React.Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,    
      thumbnailClicked: false,
    };
  }

  handleThumbnailClick = (activeIndex) =>
    this.setState({ activeIndex, thumbnailClicked: true });

  render() {
    return (
      <div className="visual-overlay-image-carousel">
        <div className="overlay-image-thumbnails-placeholder">
          {this.getThumbnails()}
        </div>
        <div className="overlay-image-view-placeholder">
          {this.getImageViewerComponents()}
        </div>
      </div>
    );
  }

  getImageViewerComponents = () =>
    this.props.templates.map((template, index) =>
      this.mapTemplateToImageViewer(template, index)
    );

  mapTemplateToImageViewer = (template, index) => (
    <div
      style={{ display: this.state.activeIndex === index ? "block" : "none" }}
    >
      <div className="image-area-wrapper">
        <div className="tap-to-zoom">
          <ReactSVG src={this.props.zoomInIcon} />
          {this.props.zoomLabel}
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

  getThumbnails = () =>
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
}

ImageGallery.defaultProps = {
  widths: WIDTHS,
};

ImageGallery.propTypes = {
  alt: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired,
  widths: PropTypes.arrayOf(PropTypes.string).isRequired,
  zoomInIcon: PropTypes.string.isRequired,
};

export default ImageGallery;
