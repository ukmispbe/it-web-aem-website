import React from 'react';
import PropTypes from 'prop-types';

class WeChatModalBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        return () {
            <div className="cmp-modal__information">
            </div>
        }
    }
}

WeChatModalBody.propTypes = {
    imgSrc: PropTypes.string.isRequired;
}

export default WeChatModalBody;
