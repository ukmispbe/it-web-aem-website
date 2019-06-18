import React from 'react';
import PropTypes from 'prop-types'
import ImageViewer from './image-viewer';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

class ImageCarousel extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            mouseDragEnabled: true,
            swipeDisabled: false,
            thumbnailStyles: {}
        };
    }

    handleImageViewerCalculate = data => this.setState({thumbnailStyles: { width: `${data.imageWidth}px` }});
    handleZoomIn = () => this.setState({ mouseDragEnabled: false, swipeDisabled: true });
    handleZoomOut = () => this.setState({ mouseDragEnabled: true, swipeDisabled: false });
    handleSlideChanged = e => this.setState({ activeIndex: e.slide });

    render() {
        return <div className="image-carousel">
            <div className="image-viewer-wrapper">
                <AliceCarousel
                    items={this.getImageViewerComponents()}
                    buttonsDisabled={true}
                    dotsDisabled={true}
                    mouseDragEnabled={this.state.mouseDragEnabled}
                    swipeDisabled={this.state.swipeDisabled}
                    slideToIndex={this.state.activeIndex}
                    onSlideChanged={this.handleSlideChanged} />
            </div>
            <div className="image-thumbnail-wrapper" style={this.state.thumbnailStyles}>
                {this.getThumbnails()}
            </div>
        </div>
    }

    getImageViewerComponents = () => this.props.templates.map(template => this.mapTemplateToImageViewer(template));

    mapTemplateToImageViewer = template => <ImageViewer
        key={template}
        template={template}
        widths={this.props.widths}
        zoomInIcon={this.props.zoomInIcon}
        zoomOutIcon={this.props.zoomOutIcon}
        onZoomIn={this.handleZoomIn}
        onZoomOut={this.handleZoomOut}
        onCalculate={this.handleImageViewerCalculate} />;

    getThumbnails = () => <></>;
}

ImageCarousel.propTypes = {
    templates: PropTypes.arrayOf(PropTypes.string).isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired,
    zoomInIcon: PropTypes.string.isRequired,
    zoomOutIcon: PropTypes.string.isRequired
}

export default ImageCarousel;