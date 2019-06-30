import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './image-viewer';

class ImageCarousel extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            thumbnailStyles: {},
        };
    }

    handleImageViewerCalculate = data => this.setState({ thumbnailStyles: { width: `${data.imageWidth}px` } });

    render() {
        return (
            <div className="image-carousel">
                <div style={{height: '800px'}}>test</div>
                <div className="image-viewer-wrapper">
                    {this.mapTemplateToImageViewer(this.props.templates[this.state.activeIndex])}
                </div>
                <div
                    className="image-thumbnail-wrapper"
                    style={this.state.thumbnailStyles}
                >
                    {this.getThumbnails()}
                </div>
            </div>
        );
    }

    getImageViewerComponents = () =>
        this.props.templates.map(template =>
            this.mapTemplateToImageViewer(template)
        );

    mapTemplateToImageViewer = template => (
        <ImageViewer
            key={template}
            template={template}
            widths={this.props.widths}
            alt={this.props.alt}
            zoomInIcon={this.props.zoomInIcon}
            zoomOutIcon={this.props.zoomOutIcon}
            onZoomIn={this.handleZoomIn}
            onZoomOut={this.handleZoomOut}
            onCalculate={this.handleImageViewerCalculate}
        />
    );

    getThumbnails = () => <></>;
}

ImageCarousel.defaultProps = {
    widths: ['128', '140', '256', '320', '375', '620', '770', '1280'],
};

ImageCarousel.propTypes = {
    alt: PropTypes.string,
    templates: PropTypes.arrayOf(PropTypes.string).isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired,
    zoomInIcon: PropTypes.string.isRequired,
    zoomOutIcon: PropTypes.string.isRequired,
};

export default ImageCarousel;
