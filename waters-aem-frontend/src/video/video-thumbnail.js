import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

class VideoThumbnail extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="cmp-video_thumbnail">
                <img className="cmp-video_thumbnail_img" src={this.props.thumbPath} alt={this.props.thumbAlt}/>

                <a href="#"
                   onClick={this.props.handleClick}
                   className="cmp-video_thumbnail_overlay"
                >
                    <ReactSVG
                        className="cmp-video_thumbnail_overlay_svg"
                        src={this.props.playIcon} />
                    {this.props.totalTime && <div className="cmp-video_thumbnail_overlay_time">{this.props.totalTime}</div>}    
                </a>
            </div>
        );
    }
}

VideoThumbnail.propTypes = {
    totalTime: PropTypes.string,
    thumbPath: PropTypes.string.isRequired,
    thumbAlt: PropTypes.string.isRequired,
    playIcon: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default VideoThumbnail;