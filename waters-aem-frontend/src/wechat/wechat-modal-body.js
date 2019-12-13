import React from 'react';
import PropTypes from 'prop-types';

class WeChatModalBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { text, qrCodeImg, title } = this.props.config;
        return (
            <div className="cmp-modal__information">
                <div className="cmp-modal__information-image">
                    <img
                        src={qrCodeImg}
                        alt="WeChat QR code"
                    />
                </div>
                <div className="cmp-modal__information-text">
                    {text}
                </div>
            </div>
        )
    }
}

WeChatModalBody.propTypes = {
    config: PropTypes.object.isRequired
}

export default WeChatModalBody;
