import React from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import Thumbnail from "../../thumbnail/Thumbnail";
import PreviewPlayer from "../../preview-player";
import { replaceInSrc, getElemXandYPosition } from "../../utils/userFunctions";
import { WIDTHS } from "../../constants";

import "../../styles/overlay-gallery.scss";

const ImageGallery = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnailClicked, setThumbnailClicked] = useState();
  const [currentImageConfig, setCurrentImageConfig] = useState('');

  useEffect(() => {
    if(props.template.length > 0) {
      setCurrentVideoConfig(props.template[0])
    }
  },[props.template])

  const handleThumbnailClick = (activeIndex, template) => {
    setActiveIndex(activeIndex);
    setThumbnailClicked(true);
    setCurrentImageConfig(template);
  }

  const handleImageMouseMove = e => {
    const { x , y } = getElemXandYPosition(e);
    zoomer.style.backgroundPosition = x + '% ' + y + '%';
  }
  
  const zoomImage = e => e.currentTarget.classList.toggle('zoom-it'); 

  const handleOnDragStart = e => e.preventDefault();

  const getImageViewerComponents = () => (
    <div>
      <div className="preview-area-wrapper">
        <div className="tap-to-zoom">
          <ReactSVG src={props.zoomInIcon} />
          {props.zoomLabel}
        </div>
        <PreviewPlayer          
          imgSrc={currentImageConfig.src}
          widths={props.widths}
          altText={currentImageConfig.alt}          
          handleImageMouseMove={handleImageMouseMove}   
          handleOnDragStart={handleOnDragStart}  
          zoomImage={zoomImage}   
        />
        <div className="preview-description">{currentImageConfig.description}</div>
      </div>
    </div>
  );

  const getThumbnails = () =>
    props.templates.length > 0 && (
      props.templates.map((item, index) => (
        <Thumbnail
          thumbnailSrcURL={replaceInSrc(item.src, WIDTHS[0])}
          thumbnailAltText={item.alt}
          className={activeIndex === index && 'thumbnail-active'} 
          isVideo={item.src === undefined}
          onThumbnailClick={() => handleThumbnailClick(index, item)}
        />
      ))
    );
  
    return (
      <div className="visual-overlay-carousel">
        <div className="overlay-thumbnails-placeholder">
          {getThumbnails()}
        </div>
        <div className="overlay-view-placeholder">
          {getImageViewerComponents()}
        </div>
      </div>
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
