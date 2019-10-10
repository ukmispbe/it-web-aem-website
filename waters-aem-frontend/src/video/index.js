import React from 'react';
import PropTypes from 'prop-types';
import VideoThumbnail from './video-thumbnail';
import VideoModalBody from './video-modal-body';
import { Modal } from '../modal/index';
import FeedbackSurvey from '../scripts/feedbackSurvey';
import ScreenSizes from '../scripts/screenSizes';


class VideoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.videoConfig.title,
            description: this.props.videoConfig.description,
            thumbAlt: this.props.videoConfig.thumbAlt,
            brightcoveVideoId: this.props.videoConfig.brightcoveVideoId,
            brightcoveAccount: this.props.videoConfig.brightcoveAccount,
            brightcovePlayerId: this.props.videoConfig.brightcovePlayerId,
            isMobile: ScreenSizes.isMobile(),
            modalShown: false
        };

        this.autoPlayVolumeLevel = 0.7;
        this.brightcovePlayer = null;
        this.videoRef = React.createRef();
        this.toggleModal = this.toggleModal.bind(this);

        this.onSuccess = this.onSuccess.bind(this);
        this.onFailure = this.onFailure.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateIsMobile.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateIsMobile.bind(this));
    }

    updateIsMobile = () => {
        if (this.state.isMobile != ScreenSizes.isMobile()) { 
            this.setState({
                isMobile: ScreenSizes.isMobile()
            }, () => { 
                if (this.state.isMobile && this.state.modalShown) { 
                    this.toggleModal();
                }  
            });
        }
    }

    toggleModal = () => {
        this.setState({ modalShown: !this.state.modalShown }, () => { 
            if (this.state.modalShown) {
                FeedbackSurvey.isDisplayed(false);
            } else { 
                FeedbackSurvey.isDisplayed(true);
            }
        })
    }

    onSuccess = (success) => { 
        const player = this.brightcovePlayer = success.ref;

        if (player) { 

            if (player.el_) {
                //on pause show big-play-button
                player.el_.classList.add('vjs-show-big-play-button-on-pause');
            }
            
            if (!this.state.isMobile) { 
                player.on("loadedmetadata", this.autoPlay.bind(this));
            }
            player.on("play", this.onPlay.bind(this));
            //player.on("pause", this.onPause.bind(this));
            player.on('ended', this.onVideoEnd.bind(this));
        }
    }

    onPlay = () => { 
        //on mobile let's check for any existin mobile video and pause them
        if (this.state.isMobile) {
            if (window.cmpVideos) {
                window.cmpVideos.forEach( videoComponent => {
                    if (this.videoRef.current != videoComponent.videoRef.current) {
                        if (videoComponent.brightcovePlayer) { 
                            videoComponent.brightcovePlayer.pause();
                        }
                    }
                })
            }
        }
    }

    autoPlay = () => { 
        // On desktop only :
        // Play video which returns a promise
        // see if video is playing or not and then try playing muted
        const player = this.brightcovePlayer;

        if (player) { 
            var promise = player.play();
            if (promise !== undefined) {
                promise
                .then(function () {
                    // Autoplay started!
                    // If video playing unmute and set the volume
                    player.muted(false);
                    player.volume(this.autoPlayVolumeLevel);
                })
                .catch(function (error) {
                    // Autoplay was prevented.
                    // If autoplay prevented mute the video, play video and display unmute button
                    player.muted(true);
                    player.play();
                });
            }
        }
    }

    onVideoEnd = (e) => { 
        this.state.isMobile ? null : this.toggleModal();
    }

    onFailure = (failure) => { 
        //on brightcove load failure
    }

    getUpdatedModalInfo = () => { 
        return (
            {
                title: this.state.title,
                description: this.state.description,
                brightcoveVideoId: this.state.brightcoveVideoId,
                brightcoveAccount: this.state.brightcoveAccount,
                brightcovePlayerId: this.state.brightcovePlayerId,
                closeIcon: this.props.videoConfig.closeIcon,
                screenReader: true
            }
        )
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

    renderMobile = () => {
        return (
            <>
                <VideoModalBody config={this.getUpdatedModalInfo()} onVideoSuccess={this.onSuccess} onVideoFailure={this.onFailure} />
                {this.renderVideoInfo()}
            </>
        )

    }

    renderDesktop = () => {
        return (
            <>
                <VideoThumbnail
                    totalTime={this.props.videoConfig.length}
                    thumbPath={this.props.videoConfig.thumbPath}
                    thumbAlt={this.state.thumbAlt}
                    playIcon={this.props.videoConfig.playIcon}
                    handleClick={this.toggleModal}
                />
                {this.renderVideoInfo()}
                <Modal
                    toggleModal={this.toggleModal}
                    open={this.state.modalShown}
                    theme="video"
                    config={this.getUpdatedModalInfo()}
                    onVideoSuccess={this.onSuccess}
                    onVideoFailure={this.onFailure} 
                />
            </>
        )

    }

    render() {
        return (
            <div className="cmp-video_video-container" ref={this.videoRef}>
                {this.state.isMobile ? this.renderMobile() : this.renderDesktop()}
            </div>
        );
    }
}

VideoContainer.propTypes = {
    videoConfig: PropTypes.object.isRequired
};

export default VideoContainer;