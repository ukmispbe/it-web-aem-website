import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import Modal, { Header, keys } from '../utils/modal';
import WeChatModalBody from '../wechat/wechat-modal-body';

const weChatLinkClass = 'cmp-footer-social-links__link';

class WeChat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalShown: false
        }

        this.showModal = this.showModal.bind(this);
    }
    
    showModal = (e) => {
        e.preventDefault();
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({isModalShown: !this.state.isModalShown})
    };


    render() {
        return (
            <>
                <a className={weChatLinkClass} href="#" target="_blank" onClick={this.showModal}>
                    <ReactSVG src={this.props.config.chatIcon} />
                </a>
                <Modal isOpen={this.state.isModalShown} onClose={this.toggleModal}>
                    <Header title={this.props.config.title} className={keys.HeaderTitleCentered} />
                    <WeChatModalBody config={this.props.config} />
                </Modal>
            </>
        )
    }
}

WeChat.propTypes = {
    config: PropTypes.object.isRequired
}
  
export default WeChat;
export { weChatLinkClass };