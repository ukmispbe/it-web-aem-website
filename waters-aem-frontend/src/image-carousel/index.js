import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './image-viewer';
import ImageThumbnails from './image-thumbnails';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

class ImageCarousel extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            figureWidth: 0,
            thumbnailStyles: {},
            thumbnailClicked: false
        };
    }

    handleImageViewerCalculate = data => {
        // skip setting with width when users are clicking through the thumbnails
        // this will prevent the thumbnail carousel from resizing during clicks
        if (this.state.thumbnailClicked) {
            this.setState({thumbnailClicked: false});
            return;
        }

        const width = `${data.figureWidth}px`;

        if (this.state.thumbnailStyles.width !== width) {
            this.setState({ figureWidth: data.figureWidth, thumbnailStyles: { width }});
        }
    }

    handleThumbnailClick = e => this.setState({activeIndex: e.index, thumbnailClicked: true});

    render() {
        return (
            <div className="image-carousel">
                <div className="image-viewer-placeholder">
                    <AliceCarousel
                        items={this.getImageViewerComponents()}
                        buttonsDisabled={true}
                        dotsDisabled={true}
                        startIndex={this.state.activeIndex} 
                        swipeDisabled={true}
                        mouseDragEnabled={false}/>
                </div>
                <div className="image-thumbnails-placeholder">
                    {this.getThumbnails()}
                </div>
            </div>
        );
    }

    getImageViewerComponents = () => this.props.templates.map(template => this.mapTemplateToImageViewer(template));

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
