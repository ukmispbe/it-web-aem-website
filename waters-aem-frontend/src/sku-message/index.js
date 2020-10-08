import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";

class SkuMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    renderLink = ({ label, title, url, blank }) => {
        return (
            <a
                href={url}
                target={blank ? "_blank" : ""}
                rel="noopener"
                title={title}>
                {label}
            </a>
        )
    }

    renderText = ({ text }) => {
        return (text)
    }

    displayError = () => {
        return (
            <>
                {
                    Array.isArray(this.props.message) && this.props.message.length > 0 && this.props.message.map((block, index) => {
                        const itemToRender = block.type === 'link' ? this.renderLink(block) : this.renderText(block);
                        let space = '';

                        if (block.rightSpace !== 'false' || typeof block.rightSpace == 'undefined') {
                            space = ' ';
                        }
                        return <React.Fragment key={index}>{itemToRender}{space}</React.Fragment>
                    })}
            </>
        )
    }

    render() {
        return (
            <div className={`cmp-notification-wrapper ${Array.isArray(this.props.message) ? 'sku-error-code' : ''}`} data-locator="sku-msg-notification-wrapper">
                <ReactSVG
                    src={this.props.icon}
                    className={`cmp-notification-icon`}
                    data-locator="sku-msg-notification-icon"
                />
                <div className="cmp-notification-body" data-locator="sku-msg-notification-body">
                    <div className="cmp-notification-description" data-locator="sku-msg-notification-description">
                        {Array.isArray(this.props.message) ? this.displayError() : (
                            this.props.message
                            (this.props.linkMessage && this.props.link) &&
                            <a href={this.props.link}>{this.props.linkMessage}</a>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

SkuMessage.propTypes = {
    icon: PropTypes.string,
    link: PropTypes.string,
    linkMessage: PropTypes.string,
    message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired
};

export default SkuMessage;
