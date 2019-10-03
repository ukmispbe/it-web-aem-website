import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: true
        }
    }

    render() {
        const { isActive } = this.state;
        return (
            <div className="cmp-chat-content">
                <div className="cmp-chat__icon">
                    <ReactSVG src={this.props.chatIcon} />
                </div>
                <div className="cmp-chat__text">
                    {this.props.chatText}
                </div>
                <a
                    className={`cmp-button ${!isActive ? "cmp-button--disabled" : ""}`}
                    href={isActive ? this.props.chatUrl : "#"}
                    target="_blank"
                    rel="noopener"
                    disabled={!isActive}
                >
                    {this.props.chatButtonText}
                </a>

                <div className="cmp-chat__status">
                    <div className={`cmp-chat__status-icon ${isActive ? "online" : "offline"}`}>
                        <ReactSVG
                            src={isActive ? this.props.chatOnlineIcon : this.props.chatOfflineIcon}
                        />
                      </div>
                    <div className="cmp-chat__status-text">
                        {isActive ? this.props.chatAvailable : this.props.chatUnavailable}
                    </div>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    chatUrl: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
    chatAvailable: PropTypes.string.isRequired,
    chatUnavailable: PropTypes.string.isRequired,
    chatText: PropTypes.string.isRequired,
    chatButtonText: PropTypes.string.isRequired,
    chatOfflineIcon: PropTypes.string.isRequired,
    chatOnlineIcon: PropTypes.string.isRequired
}

export default Chat;
