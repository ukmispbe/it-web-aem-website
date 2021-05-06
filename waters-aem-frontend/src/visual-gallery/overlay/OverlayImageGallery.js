import React from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { replaceInSrc } from "../../utils/userFunctions";
import { WIDTHS } from "../../constants";

import "../../styles/overlay-gallery.scss";

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
      <div className="visual-overlay-carousel">
        <div className="overlay-thumbnails-placeholder">
          {this.getThumbnails()}
        </div>
        <div className="overlay-view-placeholder">
          {this.getImageViewerComponents()}
        </div>
      </div>
    );
  }

  getImageViewerComponents = () =>
    this.props.templates.map((template, index) =>
      this.mapTemplateToImageViewer(template, index)
    );

  handleImageMouseMove = e => {
    var zoomer = e.currentTarget;
    let offsetX = '';
    let offsetY = '';

    e.nativeEvent.offsetX ? offsetX = e.nativeEvent.offsetX : offsetX = e.touches[0].pageX
    e.nativeEvent.offsetY ? offsetY = e.nativeEvent.offsetY : offsetY = e.touches[0].pageY
    let x = offsetX/zoomer.offsetWidth*100
    let y = offsetY/zoomer.offsetHeight*100
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }
  
  zoomImage = e => e.currentTarget.classList.toggle('zoom-it'); 

  handleOnDragStart = e => e.preventDefault();

  mapTemplateToImageViewer = (template, index) => (
    <div
      style={{ display: this.state.activeIndex === index ? "block" : "none" }}
    >
      <div className="preview-area-wrapper">
        <div className="tap-to-zoom">
          <ReactSVG src={this.props.zoomInIcon} />
          {this.props.zoomLabel}
        </div>
        <PreviewPlayer          
          imgSrc={template.src}
          widths={this.props.widths}
          alt={template.alt}
          defaultImage={replaceInSrc(template.src, WIDTHS[0])}  
          handleImageMouseMove={this.handleImageMouseMove}   
          handleOnDragStart={this.handleOnDragStart}  
          zoomImage={this.zoomImage}   
        />
        <div className="preview-description">{template.description}</div>
      </div>
    </div>
  );

  getThumbnails = () =>
    this.props.templates.length > 0 ? (
      this.props.templates.map((item, index) => (
        <Thumbnail
          thumbnailSrcURL={replaceInSrc(item.src, WIDTHS[0])}
          thumbnailAltText={item.alt}
          className={this.state.activeIndex === index && 'thumbnail-active'} 
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
