import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './image-viewer';
import ImageThumbnails from './image-thumbnails';

class ImageCarousel extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            figureWidth: 0,
            thumbnailClicked: false
        };
    }

    handleImageViewerCalculate = data => {
        // this will prevent the thumbnail width from changing when user clicks on thumbnails
        if (this.state.thumbnailClicked) {
            this.setState({thumbnailClicked: false});
            return;
        }
        
        if (this.state.figureWidth !== data.figureWidth && data.figureWidth !== 0) {
            this.setState({ figureWidth: data.figureWidth });
        }
    }

    handleThumbnailClick = e => this.setState({ activeIndex: e.index, thumbnailClicked: true });

    render() {
        return (
            <div className="image-carousel">
                <div className="image-viewer-placeholder">
                    {this.getImageViewerComponents()}
                </div>
                <div className="image-thumbnails-placeholder">
                    {this.getThumbnails()}
                </div>
            </div>
        );
    }

    getImageViewerComponents = () => this.props.templates.map((template, index) => this.mapTemplateToImageViewer(template, index));

    mapTemplateToImageViewer = (template, index) => <div style={{display: this.state.activeIndex === index ? 'block' : 'none'}}>
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
    </div>;

    getThumbnails = () => <ImageThumbnails items={this.getThumbnailImages()} onItemClick={this.handleThumbnailClick} width={this.state.figureWidth} />;

    getThumbnailImages = () => this.props.templates.map(template => this.mapTemplateToElement(template));

    mapTemplateToElement = template => <div className="image-thumbnails-container__image" style={{backgroundImage: `url(${template.replace(/{{width}}/gi, this.props.widths[0])})`}}></div>
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
