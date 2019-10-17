import React from 'react';
import PropTypes from 'prop-types';
import VideoModalBody from './video-modal-body';


class VideoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.videoConfig.title,
            description: this.props.videoConfig.description,
            brightcoveVideoId: this.props.videoConfig.brightcoveVideoId,
            brightcoveAccount: this.props.videoConfig.brightcoveAccount,
            brightcovePlayerId: this.props.videoConfig.brightcovePlayerId
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
        const videoTitle = <h3 className="cmp-video_info_title">{this.state.title}</h3>;
        const videoDescription = <p className="cmp-video_info_description">{this.state.description}</p>;

        return (
            <div className="cmp-video_info">
                {this.state.title && videoTitle}
                {this.state.description && videoDescription}
            </div>
        )
    }

    render() {

        return (
            <div className="cmp-video_video-container" ref={this.videoRef}>
                <VideoModalBody config={this.state} onVideoSuccess={this.onSuccess} onVideoFailure={this.onFailure} />
                {this.renderVideoInfo()}
            </div>
        );
    }
}

VideoContainer.propTypes = {
    videoConfig: PropTypes.object.isRequired
};

export default VideoContainer;