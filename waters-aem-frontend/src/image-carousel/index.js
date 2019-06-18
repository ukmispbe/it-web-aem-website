import React from 'react';
import PropTypes from 'prop-types'
import ImageViewer from './image-viewer';

class ImageCarousel extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            thumbnailStyles: {}
        };
    }

    render() {
        return <div className="image-carousel">
            <div className="image-viewer-wrapper">
                <ImageViewer
                    template={this.props.templates[0]}
                    widths={this.props.widths}
                    onCalculate={this.handleImageViewerCalculate} />
            </div>
            <div className="image-thumbnail-wrapper" style={this.state.thumbnailStyles}>
                thumbnails
            </div>
        </div>
    }

    handleImageViewerCalculate = data => this.setState({thumbnailStyles: { width: `${data.imageWidth}px` }});
}

ImageCarousel.propTypes = {
    templates: PropTypes.arrayOf(PropTypes.string).isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default ImageCarousel;