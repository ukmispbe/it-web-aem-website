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
            modalShown: false,
            mobileThumbShown: true
        };

        this.autoPlayVolumeLevel = 0.7;
        this.brightcovePlayer = null;
        this.videoRef = React.createRef();
        this.toggleMobileThumb = this.toggleMobileThumb.bind(this);
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

    toggleMobileThumb = e => { 
        if (e) { e.preventDefault() }

        this.setState({ mobileThumbShown: !this.state.mobileThumbShown }, () => { 
            if (!this.state.mobileThumbShown && this.state.isMobile) { 
                //if mobile & video is starting to playing
                if (window.cmpVideos) { 
                    //check for any existing mobile video comp and close them
                    window.cmpVideos.forEach( videoComponent => {
                        if (this.videoRef.current != videoComponent.videoRef.current) {
                            if (typeof videoComponent.closeMobileVideo == 'function') { 
                                //lets close any open mobile video components
                                const closeMobileVideo = videoComponent.closeMobileVideo.bind(videoComponent);
                                closeMobileVideo();
                            }
                        }
                    })
                }
            }

        });
    }

    closeMobileVideo = () => {
        this.setState({ mobileThumbShown: true });
    }


    onSuccess = (success) => { 
        const player = this.brightcovePlayer = success.ref;

        if (player) { 
            //  Wait for loadedmetadata then try to play video
            player.on("loadedmetadata", this.autoPlay.bind(this));
            player.on('ended', this.onVideoEnd.bind(this));
        }
    }

    autoPlay = () => { 
        // Play video which returns a promise
        const player = this.brightcovePlayer;

        if (player) { 
            var promise = player.play();
    
            //  Use promise to see if video is playing or not
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
        this.state.isMobile ? this.closeMobileVideo().bind(this) : this.toggleModal();
    }

    onFailure = (failure) => { 
        //console.log("failure:", failure);
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
                {this.state.mobileThumbShown ? (
                    <VideoThumbnail
                        totalTime={this.props.videoConfig.length}
                        thumbPath={this.props.videoConfig.thumbPath}
                        thumbAlt={this.state.thumbAlt}
                        playIcon={this.props.videoConfig.playIcon}
                        handleClick={this.toggleMobileThumb}
                    />
                ) : (
                        <VideoModalBody config={this.getUpdatedModalInfo()} onVideoSuccess={this.onSuccess} onVideoFailure={this.onFailure} closeVideo={this.toggleMobileThumb} />
                )}
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