import React, { useState } from "react";
import ReactSVG from "react-svg";
import PropTypes from "prop-types";
import Video from "../video";
import { replaceInSrc } from "../utils/userFunctions";

import "../styles/preview-player.scss";

const PreviewPlayer = ({
  openModal,
  imgSrc,
  altText,
  zoomIcon,
  zoomLabel,
  widths,
  defaultView,
  videoConfig,
  handleOnDragStart,
  handleImageMouseMove,
  handleImageTouchMove,
  zoomImage,
  disableMouseOutHandler,
}) => {
  const [currentSrc, setCurrentSrc] = useState();

  const handleImageLoaded = (e) => {
    e.currentTarget &&
      setCurrentSrc(e.currentTarget.querySelector("img").currentSrc);
  };
  const handleImageError = (e) => console.error(e);
  const handleImageTouchEvent = (e) => {
    handleImageTouchMove(e);
  };
  const handleMouseOut = (e) => {
    if (!disableMouseOutHandler) {
      e.currentTarget.classList.remove("zoom-it");
    }
  };
  const handlePlayerClick = (e) => {
    if (openModal) {
      openModal(e);
    }
  };
  return (
    <div
      className="preview-player-container"
      onClick={(e) => handlePlayerClick(e)}
    >
      {imgSrc ? (
        <>
          {!defaultView ? (
            <>
              <div className="overlay">
                <div className="tap-to-zoom">
                  <ReactSVG src={zoomIcon} />
                  {zoomLabel}
                </div>
              </div>
              <div className="image-view-area">
                <figure
                  className="image-zoom-area"
                  style={{ backgroundImage: `url(${currentSrc})` }}
                  onDragStart={(e) => handleOnDragStart(e)}
                  onMouseMove={(e) => handleImageMouseMove(e)}
                  onTouchMove={(e) => handleImageTouchEvent(e)}
                  onClick={(e) => zoomImage(e)}
                  onMouseOut={(e) => handleMouseOut(e)}
                >
                  <picture
                    onLoad={(e) => handleImageLoaded(e)}
                    onError={(e) => handleImageError(e)}
                  >
                    {widths
                      .sort((a, b) => b - a)
                      .map((width, index) => (
                        <source
                          key={`media-${width}-${index}`}
                          media={`(min-width: ${width}px)`}
                          srcSet={replaceInSrc(imgSrc, width)}
                          type={"image/webp"}
                        />
                      ))}
                    <img
                      className="image-gallery-image"
                      alt={altText}
                      src={currentSrc}
                    />
                  </picture>
                </figure>
              </div>
            </>
          ) : (
            <div>
              <picture
                onLoad={(e) => handleImageLoaded(e)}
                onError={(e) => handleImageError(e)}
              >
                {widths.map((width, index) => (
                  <source
                    key={`media-${width}-${index}`}
                    media={`(min-width: ${width}px)`}
                    srcSet={replaceInSrc(imgSrc, width)}
                    type={"image/webp"}
                  />
                ))}
                <img
                  className="image-gallery-image"
                  alt={altText}
                  src={currentSrc}
                />
              </picture>
            </div>
          )}
        </>
      ) : (
        <Video
          videoConfig={videoConfig}
          ref={(ourComponent) => {
            if (window.cmpVideos) {
              window.cmpVideos.push(ourComponent);
            } else {
              window.cmpVideos = [ourComponent];
            }
          }}
        />
      )}
    </div>
  );
};

PreviewPlayer.propTypes = {
  openModal: PropTypes.func,
  imgSrc: PropTypes.string,
  zoomIcon: PropTypes.string,
  zoomLabel: PropTypes.string,
  widths: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultImage: PropTypes.string,
  videoConfig: PropTypes.object,
  disableMouseOutHandler: PropTypes.bool,
};

PreviewPlayer.defaultProps = {
  openModal: () => {},
  imgSrc: "",
  zoomIcon: "",
  zoomLabel: "",
  widths: [],
  defaultImage: "",
  videoConfig: {},
  disableMouseOutHandler: false,
};

export default PreviewPlayer;
