import React from 'react';
import PropTypes from 'prop-types';

import ReactPlayerLoader from '@brightcove/react-player-loader';
import ScreenSizes from '../scripts/screenSizes';

class VideoModalBody extends React.Component {
    constructor(props) {
        super(props);

    }

    onSuccess = (success) => { 
        const brightcovePlayer = success.ref;

        if (brightcovePlayer) { 
            brightcovePlayer.on('ended', this.onVideoEnd.bind(this));
        }
    }

    onVideoEnd = (e) => { 
        if (typeof this.props.closeVideo === 'function') { 
            this.props.closeVideo();
        }
    }

    onFailure = (failure) => { 
        //console.log("failure:", failure);
    }
    
    render() {
    
        const playerAttrs = {
            className: 'waters-brightcove-player'
        }

        const optionsVideoJS = {
            fluid: true,
            autoplay: 'play',
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
                        onFailure={this.onFailure}
                        onSuccess={this.onSuccess}
                        // embedOptions={{unminified:true}}
                        attrs={playerAttrs} />
                </div>
            </>
        )
    }
}

//on video end closeModal??? on desktop/tablet sizes???
VideoModalBody.propTypes = {
    config: PropTypes.object.isRequired,
    closeVideo: PropTypes.func
};

export default VideoModalBody;