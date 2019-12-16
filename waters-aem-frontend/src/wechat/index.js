import React from 'react';
import { Modal } from '../modal/index';

class WeChat extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalShown: false,
            config: {
                 "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
                 "title": props.config.title,
                 "qrCodeImg": props.config.qrCodeImg,
                 "text": props.config.desc,
                 "alt": props.config.alt
            }
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
            <Modal
                open={this.state.isModalShown}
                config={this.state.config}
                theme='wechat'
                toggleModal={this.toggleModal}
             />
        )
    }
}

export default WeChat;