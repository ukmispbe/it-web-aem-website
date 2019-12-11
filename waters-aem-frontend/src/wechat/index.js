import React from 'react';
import { Modal } from '../modal/index';

class WeChat extends React.Component {

    constructor() {
        super();

        this.state = {
            isModalShown: false,
            config: {
                 "icon": "/content/dam/waters/en/brand-assets/icons/checkmark.svg",
                 "closeIcon": "/content/dam/waters/en/brand-assets/icons/close.svg",
                 "title": "${'Item Added to Cart' @ i18n, context='text'}",
                 "buttons": [
                     {
                         "text": "${'View Cart' @ i18n, context='text'}",
                         "action": "${footer.viewCartUrl @ context='unsafe'}"
                     },
                     {
                         "text": "${'Continue Shopping' @ i18n, context='text'}",
                         "action": "close"
                     }
                 ]
            }
        }
    }

    toggleModal = () => {
        this.setState({isModalShown: !isModalShown})
    };

    render() {
        return (
            <Modal
                open={this.state.isModalShown}
                config={this.state.config}
                theme='callToAction'
                toggleModal={this.toggleModal}
             />
        )
    }
}

export default WeChat;