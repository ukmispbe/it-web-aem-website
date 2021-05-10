import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { msToMinAndSeconds } from "../../utils/userFunctions";
import "../../styles/overlay-gallery.scss";

const VideoGallery = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailClicked, setThumbnailClicked] = useState();
  const [currentVideoConfig, setCurrentVideoConfig] = useState('');
 
  useEffect(() => {
    if(props.brightCoveData.length > 0) {
      setCurrentVideoConfig(props.brightCoveData[0])
    }
  },[props.brightCoveData])

  const  handleThumbnailClick = (activeIndex, currentVideoConfig) => {
    setActiveIndex(activeIndex);
    setCurrentVideoConfig(currentVideoConfig);
    setThumbnailClicked(true);
  }
  

    const getVideoViewerComponents = () => currentVideoConfig && <div className="preview-area-wrapper video-view">        
      <PreviewPlayer          
        videoConfig={currentVideoConfig}
      />
    <div className="preview-description">{currentVideoConfig.description}</div>
  </div>;

 

  const getThumbnails = () =>
      props.brightCoveData.length > 0 && (
        props.brightCoveData.map((item, index) => (
          <Thumbnail
            thumbnailSrcURL={item.thumbnail}
            thumbnailAltText={item.title}
            isVideo   
            className={activeIndex === index && 'thumbnail-active'}       
            onThumbnailClick={() => handleThumbnailClick(index, item)}
            timeStamp={msToMinAndSeconds(item.duration)}
            thumbnailLabel={item.title}
          />
        ))
      );

    return (
      <div className="visual-overlay-carousel">
        <div className="overlay-thumbnails-placeholder">
          {getThumbnails()}
        </div>
        <div className="overlay-view-placeholder">
          {getVideoViewerComponents()}
        </div>
      </div>
    );
  

 
}

VideoGallery.propTypes = {
  alt: PropTypes.string,
  templates: PropTypes.arrayOf(PropTypes.string).isRequired, 
  zoomInIcon: PropTypes.string.isRequired,
};

export default VideoGallery;
