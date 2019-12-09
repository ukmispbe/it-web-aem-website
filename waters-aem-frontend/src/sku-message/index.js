import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";

class SkuMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="cmp-notification-wrapper">
                <ReactSVG
                    src={this.props.icon}
                    className={`cmp-notification-icon`}
                />
                <div className="cmp-notification-body">
                    <div className="cmp-notification-description">
                            {this.props.message} 
                            {(this.props.linkMessage && this.props.link) &&
                                <a href={this.props.link}>{this.props.linkMessage}</a>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

SkuMessage.propTypes = {
    icon: PropTypes.string,
    message: PropTypes.string,
    link: PropTypes.string,
    linkMessage: PropTypes.string
};

export default SkuMessage;
