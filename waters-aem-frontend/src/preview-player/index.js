import React from 'react';
import Video from '../video';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { replaceInSrc } from '../utils/userFunctions';
import "../styles/previewplayer.scss";

export const PreviewPlayer = (props) => {
        
    const handleImageLoaded = e => {}
    const handleImageError = e => {}

        return (
            <div className="preview-player-container">
                {
                    props.imgSrc ? (
                        <LazyLoadComponent>
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
                        </LazyLoadComponent>
                      ) : (
                        <LazyLoadComponent>
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
                        </LazyLoadComponent>
                      )

                }
            </div>
        );   
}
