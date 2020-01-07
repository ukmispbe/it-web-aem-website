import React from 'react';
import PropTypes from 'prop-types';

class WeChatModalBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, qrCodeImg, alt } = this.props.config;
        return (
            <div className="cmp-wechat-modal">
                <div className="cmp-wechat-modal__image">
                    <img
                        src={ qrCodeImg }
                        alt={ alt }
                    />
                </div>
                <div className="cmp-wechat-modal__text">
                    { text }
                </div>
            </div>
        )
    }
}

WeChatModalBody.propTypes = {
    config: PropTypes.object.isRequired
}

export default WeChatModalBody;
