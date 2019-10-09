import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import ChatService from './services';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
        }
        this.request = new ChatService(this.props.countryCode, this.props.statusApi);
    }

    componentDidMount() {
        this.request
            .getChatStatus()
            .then(response => {
                this.setState({
                    isActive: response.isChatActive,
                })
            })
            .catch(err => {
                console.log("Unable to connect to chat api.")
            })
    }

    render() {
        const { isActive } = this.state;
        return (
            <div className="cmp-chat-content">
                <div className="cmp-chat__icon">
                    <ReactSVG src={this.props.icon} />
                </div>
                <div className="cmp-chat__text">
                    {this.props.text}
                </div>
                <a
                    className={`cmp-button ${!isActive ? "cmp-button--disabled" : ""}`}
                    href={isActive ? this.props.url : "#"}
                    target="_blank"
                    rel="noopener"
                    disabled={!isActive}
                >
                    {this.props.buttonText}
                </a>

                <div className="cmp-chat__status">
                    <div className={`cmp-chat__status-icon ${isActive ? "online" : "offline"}`}>
                        <ReactSVG
                            src={isActive ? this.props.onlineIcon : this.props.offlineIcon}
                        />
                      </div>
                    <div className="cmp-chat__status-text">
                        {isActive ? this.props.availableText : this.props.unavailableText}
                    </div>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    availableText: PropTypes.string.isRequired,
    unavailableText: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    offlineIcon: PropTypes.string.isRequired,
    onlineIcon: PropTypes.string.isRequired
}

export default Chat;
