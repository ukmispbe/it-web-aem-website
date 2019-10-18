import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayerLoader from '@brightcove/react-player-loader';
import ScreenSizes from '../scripts/screenSizes';

class VideoModalBody extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
    
        const playerAttrs = {
            className: 'waters-brightcove-player'
        }

        //Any video option support by Video-js : https://docs.videojs.com/tutorial-options.html
        //don't pass in autoplay here rather programmatically call after loadedmetadata event
        const optionsVideoJS = {
            fluid: true,
            controls: !ScreenSizes.isMobile() ? true : false,
            loop: false
        }

        return (
            <>
                <div className="cmp-video_modal-body">
                    <ReactPlayerLoader
                        options={optionsVideoJS}
                        videoId={this.props.config.brightcoveVideoId}
                        playedId={this.props.config.brightcovePlayerId}
                        accountId={this.props.config.brightcoveAccount}
                        onFailure={this.props.onVideoFailure}
                        onSuccess={this.props.onVideoSuccess}
                        // embedOptions={{unminified:true}}
                        attrs={playerAttrs} />
                </div>
            </>
        )
    }
}

VideoModalBody.propTypes = {
    config: PropTypes.object.isRequired,
    onVideoSuccess: PropTypes.func.isRequired,
    onVideoFailure: PropTypes.func.isRequired
};

export default VideoModalBody;