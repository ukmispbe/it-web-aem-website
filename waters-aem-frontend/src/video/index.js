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

        this.toggleMobileThumb = this.toggleMobileThumb.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.closeVideo = this.closeVideo.bind(this);

    }

    componentDidMount() {
        window.addEventListener("resize", this.updateIsMobile.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateIsMobile.bind(this));
    }

    updateIsMobile = () => {
        this.setState({
            isMobile: ScreenSizes.isMobile()
        }, () => { 
            if (this.state.isMobile && this.state.modalShown) { 
                this.toggleModal();
            }  
        });

        
    }

    toggleModal = e => {
        this.setState({ modalShown: !this.state.modalShown }, () => { 
            if (this.state.modalShown) {
                FeedbackSurvey.isDisplayed(false);
            } else { 
                FeedbackSurvey.isDisplayed(true);
            }
        })
    }

    toggleMobileThumb = e => { 
        e.preventDefault();
        this.setState({ mobileThumbShown: !this.state.mobileThumbShown });
    }

    closeVideo = () => { 
        this.setState({ mobileThumbShown: true });
    }

    renderMobile = () => {
        return (
            <>
                {this.state.mobileThumbShown ? (
                    <VideoThumbnail
                    totalTime="1:45"
                    thumbPath={this.props.videoConfig.thumbPath}
                    thumbAlt={this.state.thumbAlt}
                    playIcon={this.props.videoConfig.playIcon}
                    handleClick={this.toggleMobileThumb}
                    />
                ) : (
                    <VideoModalBody config={this.getUpdatedModalInfo()}  closeVideo={this.closeVideo}  />
                )}
                {this.renderVideoInfo()}
            </>
        )

    }

    renderDesktop = () => {
        return (
            <>
                <VideoThumbnail
                    totalTime="1:45"
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
                />
            </>
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

    getUpdatedModalInfo = () => { 
        return (
            {
                title: this.state.title,
                description: this.state.description,
                brightcoveVideoId: this.state.brightcoveVideoId,
                brightcoveAccount: this.state.brightcoveAccount,
                brightcovePlayerId: this.state.brightcovePlayerId,
                closeIcon: this.props.videoConfig.closeIcon
            }
        )
    }

    render() {
        return (
            <>
                {this.state.isMobile ? this.renderMobile() : this.renderDesktop()}
            </>
        );
    }
}

VideoContainer.propTypes = {
    videoConfig: PropTypes.object.isRequired
};

export default VideoContainer;