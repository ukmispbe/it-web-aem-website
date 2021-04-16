import React from 'react';
import Video from '../video';
import ReactSVG from 'react-svg';
import { replaceInSrc } from '../utils/userFunctions';

import '../styles/preview-player.scss';

export const PreviewPlayer = (props) => {
        
    const handleImageLoaded = e => {}
    const handleImageError = e => {}
    const handlePlayerClick = e => {
        if(props.openModal){
            props.openModal(e);
        }
    }
        return (
            <div className="preview-player-container" onClick={(e) => handlePlayerClick(e)}>
                {
                    props.imgSrc ? (
                          <>
                            <div className="overlay">
                                <div className="tap-to-zoom">
                                    <ReactSVG src={props.zoomIcon} />{props.zoomIconText}
                                </div>
                            </div>
                            <picture
                            onLoad={(e) => handleImageLoaded(e)}
                            onError={(e) => handleImageError(e)}                         
                            >
                            {
                                props.widths.map((width, index) => (
                                <source
                                    key={`media-${width}-${index}`}
                                    media={`(min-width: ${width}px)`}
                                    srcSet={replaceInSrc(props.imgSrc, width)}
                                    type={'image/webp'}
                                />
                                ))
                            }
                            <img
                                className="image-gallery-image"
                                alt={"gallery-image"}
                                src={props.defaultImage} 
                            />
                            </picture>
                       </>
                      ) : (
                       
                            <Video 
                                videoConfig={props.videoConfig}                        
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
