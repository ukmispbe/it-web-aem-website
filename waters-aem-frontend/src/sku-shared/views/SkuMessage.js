import React from 'react';
import ReactSVG from 'react-svg';

class SkuMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="cmp-notification-wrapper">
                <ReactSVG
                    src={this.props.icon}
                    className={`cmp-notification-icon`}
                />
                <div className="cmp-notification-body">
                    <div className="cmp-notification-description">
                            {this.props.message} 
                            {(this.props.replacementSkuCode && this.props.replacementSkuLink) &&
                                <a href={this.props.replacementSkuLink}>{this.props.replacementSkuCode}</a>
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default SkuMessage;
