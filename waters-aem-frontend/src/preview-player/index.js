import React, { useState } from 'react';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import Video from '../video';
import { replaceInSrc } from '../utils/userFunctions';

import '../styles/preview-player.scss';

const PreviewPlayer = ({ openModal, imgSrc, alt, zoomIcon,zoomIconText, widths, defaultView, videoConfig, handleOnDragStart, handleImageMouseMove, handleImageTouchMove, zoomImage }) => {
    const [currentSrc, setCurrentSrc] = useState()
        
    const handleImageLoaded = e => { setCurrentSrc(e.currentTarget.querySelector('img').currentSrc)};
    const handleImageError = e => {}
    const handleMouseOut = e => e.currentTarget.classList.remove("zoom-it");
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
                            { !defaultView ? 
                                <>
                                    <div className="overlay">
                                        <div className="tap-to-zoom">
                                            <ReactSVG src={zoomIcon} />{zoomIconText}
                                        </div>
                                    </div>
                                    <div className="image-view-area">
                                        <figure
                                            className="image-zoom-area"
                                            style={{ backgroundImage: `url(${currentSrc})` }} 
                                            onDragStart={e => handleOnDragStart(e)}
                                            onMouseMove={(e) => handleImageMouseMove(e)}
                                            onTouchMove={handleImageTouchMove} 
                                            onClick={e => zoomImage(e)} 
                                            onMouseOut={e => handleMouseOut(e)}
                                        >
                                            <picture                            
                                                onLoad={(e) => handleImageLoaded(e)}
                                                onError={(e) => handleImageError(e)}                                                 
                                                >
                                                {
                                                    widths.sort((a,b)=>b-a).map((width, index) => (
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
                                                    alt={alt}
                                                    src={currentSrc} 
                                                />
                                            </picture>
                                        </figure>
                                    </div>
                                </> : <div>
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
                                                alt={alt}
                                                src={currentSrc} 
                                            />
                                        </picture>
                                    </div>
                                }                            
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