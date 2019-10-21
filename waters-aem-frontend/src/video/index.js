import React from 'react';
import PropTypes from 'prop-types';
import VideoModalBody from './video-modal-body';
import VideoDescription from './video-description';

class VideoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.videoConfig.title,
            description: this.props.videoConfig.description,
            useEllipsis: true
        };

        this.brightcovePlayer = null;
        this.videoRef = React.createRef();

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    onSuccess = (success) => { 
        const player = this.brightcovePlayer = success.ref;

        if (player) { 

            if (player.el_) {
                //on pause show big-play-button
                player.el_.classList.add('vjs-show-big-play-button-on-pause');
            }
        
            player.on("play", this.onPlay.bind(this));
            player.on("ended", this.onEnd.bind(this));
        }
    }

    onPlay = () => {
        //check for any existin video and pause them
        if (window.cmpVideos) {
            window.cmpVideos.forEach(videoComponent => {
                if (this.videoRef.current != videoComponent.videoRef.current) {
                    if (videoComponent.brightcovePlayer) {
                        videoComponent.brightcovePlayer.pause();
                    }
                }
            })
        }
    }

    onEnd = (e) => { 
        const brightcove = this.brightcovePlayer;
        if (brightcove.player_.isFullscreen()) {
            brightcove.player_.exitFullscreen();
        }
    }

    onFailure = (failure) => { 
        //on brightcove load failure
    }
    
    renderVideoInfo = () => { 
        return (
            <>
                {this.state.title && <h3 className="cmp-video_title">{this.state.title}</h3>}
                {this.state.description && (
                        <VideoDescription
                            text={this.state.description}
                            useEllipsis={this.state.useEllipsis}
                        />
                    )
                }
            </>
        )
    }
    
    render() {

        return (
            <div className="cmp-video_video-container" ref={this.videoRef}>
                <VideoModalBody
                    config={this.props.videoConfig}
                    onVideoSuccess={this.onSuccess}
                    onVideoFailure={this.onFailure}
                />
                {this.renderVideoInfo()}
            </div>
        );
    }
}

VideoContainer.propTypes = {
    videoConfig: PropTypes.object.isRequired
};

export default VideoContainer;