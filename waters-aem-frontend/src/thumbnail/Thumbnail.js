import React from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import "./thumbnailStyle.css";

const Thumbnail = ({
  thumbnailSrcURL,
  thumbnailAltText,
  thumbnailTitleText,
  thumbnailLabel,
  isVideo,
  showVideoPlayButton,
  timeStamp,
  videoIconURL,
  className,
  thumbnailLabelClassName,
  handleThumbnailMouseLeave,
  handleThumbnailMouseOver,
  handleThumbnailKeyUp,
  onThumbnailClick,
  handleThumbnailError,
}) => (
  <>
    <button
      type="button"
      className={`thumbnail-container ${className}`}
      onMouseLeave={handleThumbnailMouseLeave}
      onMouseOver={handleThumbnailMouseOver}
      onFocus={handleThumbnailMouseOver}
      onKeyUp={handleThumbnailKeyUp}
      onClick={onThumbnailClick}
    >
      <div className="thumbnail-img-inner">
        {isVideo && showVideoPlayButton && (
          <div className="thumbnail-video-overlay" />
        )}
        <img
          src={thumbnailSrcURL}
          alt={thumbnailAltText}
          title={thumbnailTitleText}
          onError={handleThumbnailError}
        />
        {timeStamp && (
          <div className="thumbnail-time-stamp-bg">
            <span className="thumbnail-time-stamp-text">{timeStamp}</span>
          </div>
        )}
        {isVideo && showVideoPlayButton && (
          <div className="thumbnail-video-icon-bg">
            <ReactSVG src={videoIconURL} />
          </div>
        )}
      </div>
    </button>
    {thumbnailLabel && (
      <div className={`thumbnail-title ${thumbnailLabelClassName}`}>
        {thumbnailLabel}
      </div>
    )}
  </>
);

Thumbnail.propTypes = {
  thumbnailSrcURL: PropTypes.string,
  thumbnailAltText: PropTypes.string,
  thumbnailTitleText: PropTypes.string,
  thumbnailLabel: PropTypes.string,
  isVideo: PropTypes.bool,
  showVideoPlayButton: PropTypes.bool,
  timeStamp: PropTypes.string,
  videoIconURL: PropTypes.string,
  className: PropTypes.string,
  thumbnailLabelClassName: PropTypes.string,
  handleThumbnailMouseLeave: PropTypes.func,
  handleThumbnailMouseOver: PropTypes.func,
  handleThumbnailMouseOver: PropTypes.func,
  handleThumbnailKeyUp: PropTypes.func,
  onThumbnailClick: PropTypes.func,
  handleThumbnailError: PropTypes.func,
};

Thumbnail.defaultProps = {
  thumbnailSrcURL: "",
  thumbnailAltText: "",
  thumbnailTitleText: "",
  thumbnailLabel: "",
  isVideo: false,
  showVideoPlayButton: true,
  timeStamp: "",
  videoIconURL: "",
  className: "",
  thumbnailLabelClassName: "",
  handleThumbnailMouseLeave: () => {},
  handleThumbnailMouseOver: () => {},
  handleThumbnailMouseOver: () => {},
  handleThumbnailKeyUp: () => {},
  onThumbnailClick: () => {},
  handleThumbnailError: () => {},
};

export default Thumbnail;
