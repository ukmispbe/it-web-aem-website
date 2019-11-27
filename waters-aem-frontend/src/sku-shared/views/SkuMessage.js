import React from 'react';
import ReactSVG from 'react-svg';

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

export default SkuMessage;
