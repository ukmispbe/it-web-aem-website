import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';


const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

class VideoDescription extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        const toggleEllipsisContent = this.props.useEllipsis
                ? (
                    <ResponsiveEllipsis
                        style={{ whiteSpace: 'pre-wrap' }}
                        text={this.props.text}
                        maxLine="3"
                        ellipsis="…"
                        trimRight="true"
                    basedOn="words"
                    />
                ) : this.props.text;

        return (
            <p class="cmp-video_description"
                onClick={(this.props.click ? this.props.click : null)}
            >
                {toggleEllipsisContent}
            </p>

        )
    }
}

VideoDescription.propTypes = {
    text: PropTypes.string.isRequired,
    useEllipsis: PropTypes.string.isRequired,
    click: PropTypes.func,
};

export default VideoDescription;