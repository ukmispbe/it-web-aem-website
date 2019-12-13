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
                 "text": props.config.desc
            }
        }
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