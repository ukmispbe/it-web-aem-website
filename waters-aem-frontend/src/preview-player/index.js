import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import Video from '../video';
import { replaceInSrc } from '../utils/userFunctions';

import '../styles/preview-player.scss';

const PreviewPlayer = ({openModal, imgSrc,zoomIcon,zoomIconText, widths, defaultImage, videoConfig }) => {
        
    const handleImageLoaded = e => {}
    const handleImageError = e => {}
    const handlePlayerClick = e => {
        if(openModal){
            openModal(e);
        }
    }
        return (
            <div className="preview-player-container" onClick={(e) => handlePlayerClick(e)}>
                {
                    imgSrc ? (
                          <>
                            <div className="overlay">
                                <div className="tap-to-zoom">
                                    <ReactSVG src={zoomIcon} />{zoomIconText}
                                </div>
                            </div>
                            <picture
                            onLoad={(e) => handleImageLoaded(e)}
                            onError={(e) => handleImageError(e)}                         
                            >
                            {
                                widths.map((width, index) => (
                                <source
                                    key={`media-${width}-${index}`}
                                    media={`(min-width: ${width}px)`}
                                    srcSet={replaceInSrc(imgSrc, width)}
                                    type={'image/webp'}
                                />
                                ))
                            }
                            <img
                                className="image-gallery-image"
                                alt={"gallery-image"}
                                src={defaultImage} 
                            />
                            </picture>
                       </>
                      ) : (
                       
                            <Video 
                                videoConfig={videoConfig}                        
                                ref={ourComponent => {
                                    if (window.cmpVideos) {
                                        window.cmpVideos.push(ourComponent);
                                    } else {
                                        window.cmpVideos = [ourComponent];
                                    }
                                }} 
                            />
                      
                      )

                }
            </div>
        );   
}

PreviewPlayer.propTypes = {
    openModal: PropTypes.func, 
    imgSrc: PropTypes.string,
    zoomIcon: PropTypes.string,
    zoomIconText: PropTypes.string, 
    widths: PropTypes.arrayOf(PropTypes.string).isRequired, 
    defaultImage: PropTypes.string, 
    videoConfig: PropTypes.object
}

PreviewPlayer.defaultProps = {
    openModal: () => {}, 
    imgSrc: '',
    zoomIcon: '',
    zoomIconText: '', 
    widths: [], 
    defaultImage: '', 
    videoConfig: {}
}

export default PreviewPlayer;