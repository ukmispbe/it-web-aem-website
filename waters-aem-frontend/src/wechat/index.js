import React from 'react';
import PropTypes from 'prop-types';
import Modal, { Header, keys } from '../utils/modal';
import WeChatModalBody from '../wechat/wechat-modal-body';

class WeChat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalShown: false
        }
    }
    
    componentDidMount() {
        const wechatSelector = document.querySelector('.cmp-footer__social-links__item--wechat');

        if (wechatSelector && wechatSelector.firstElementChild.tagName === "A") {
            wechatSelector.firstElementChild.addEventListener('click', this.showModal);
        }
    }

    componentWillUnMount() {
        const wechatSelector = document.querySelector('.cmp-footer__social-links__item--wechat');

        if (wechatSelector && wechatSelector.firstElementChild.tagName === "A") {
            wechatSelector.firstElementChild.removeEventListener('click', this.showModal);
        }
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
            <Modal isOpen={this.state.isModalShown}>
                <Header onClose={this.toggleModal} title={this.props.config.title} className={keys.HeaderTitleCenteredOnDesktop} />
                <WeChatModalBody config={this.props.config} />
            </Modal>
        )
    }
}

WeChat.propTypes = {
    config: PropTypes.object.isRequired
}
  
export default WeChat;