import React from 'react';
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg';

class ImageViewer extends React.Component {
    constructor() {
        super();
    
        this.state = {
          containerWidth: 0,
          imageWidth: 0,
          imageHeight: 0,
          imageSrc: "",
          magnified: false
        };
    
        this.containerRef = React.createRef();
        this.figureRef = React.createRef();
    }
    
    handleOnDragStart = e => e.preventDefault();

    handleMagnifyClick = () => {
        // clear background position so subsequent clicks
        // position the background to the center of the image
        // which is specified in the stylesheet ruleset
        this.figureRef.current.style.backgroundPosition = "";

        const magnified = !this.state.magnified;

        if (magnified && this.props.onZoomIn) {
            this.props.onZoomIn();
        }

        if (!magnified && this.props.onZoomOut) {
            this.props.onZoomOut();
        }

        this.setState({ magnified });
    };

    handleFigureMove = (magnified, offsetX, offsetY, figureElement) => {
        if (!magnified) return;

        const x = (offsetX / figureElement.offsetWidth) * 100;
        const y = (offsetY / figureElement.offsetHeight) * 100;

        figureElement.style.backgroundPosition = `${x}% ${y}%`;
    };
    
    handleFigureMouseMove = e => {
        const offsetX = e.nativeEvent.offsetX;
        const offsetY = e.nativeEvent.offsetY;

        this.handleFigureMove(
            this.state.magnified,
            offsetX,
            offsetY,
            e.currentTarget
        );
    };

    handleFigureTouchMove = e => {    
        const offsetX = e.nativeEvent.touches[0].pageX;
        const offsetY = e.nativeEvent.touches[0].pageY;

        this.handleFigureMove(
            this.state.magnified,
            offsetX,
            offsetY,
            e.currentTarget
        );
    };

    handleFigureTouchStart = e => {
        // touch-action property prevents scrolling during touchmove event
        // check if browser supports this property so locking scrolling is
        // handled using a stylesheet ruleset
        if (CSS && !CSS.supports("touch-action", "none")) {
            document.body.classList.add("lock-scroll");
        }
    };

    handleFigureTouchEnd = e => {
        if (CSS && !CSS.supports("touch-action", "none")) {
            document.body.classList.remove("lock-scroll");
        }
    };

    render() {
        return <div ref={this.containerRef} className="image-viewer-container">
        <div className="image-viewer-container__image-display">
          {this.renderImageDisplay()}
          <div className="image-viewer-container__image-zoom">
            <div>{this.renderZoomIcon()}</div>
          </div>
        </div>
      </div>
    }

    componentDidUpdate(prevProps, prevState) {
        // check if image rendition as changed
        if (prevState.imageSrc !== this.state.imageSrc) {
            // delay so the figure element rendering completes
            // the figure element is referenced to get image height
            // 1 second delay works on all browser and devices
            setTimeout(() => this.setStateImageHeight(), 1500);
        }

        if (prevState.imageWidth !== this.state.imageWidth && this.props.onCalculate) {
            this.props.onCalculate(this.state);
        }
    }

    componentDidMount() {
        this.calculateWidth();

        // this is for desktop
        window.addEventListener("resize", this.calculateWidth);

        // this is for iPad orientation
        window.addEventListener("orientationchange", this.calculateWidth);

        // this is for mobile devices
        window.addEventListener('deviceorientation', this.calculateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.calculateWidth);
        window.removeEventListener("orientationchange", this.calculateWidth);
        window.removeEventListener("deviceorientation", this.calculateWidth);
    }

    renderImageDisplay = () => <figure
        ref={this.figureRef}
        className={`image-viewer-container__image-figure image-viewer-container__image-figure--${this.state.magnified}`}
        style={this.getFigureStyle()}
        onDragStart={this.handleOnDragStart}
        onMouseMove={this.handleFigureMouseMove}
        onTouchStart={this.handleFigureTouchStart}
        onTouchEnd={this.handleFigureTouchEnd}
        onTouchMove={this.handleFigureTouchMove}>
        
        <img
            className="image-viewer-container__image-element"
            src={this.state.imageSrc}
            alt={this.props.alt}/>
    </figure>

    renderZoomIcon = () => this.state.magnified
        ? <ReactSVG src={this.props.zoomOutIcon} onClick={this.handleMagnifyClick} /> 
        : <ReactSVG src={this.props.zoomInIcon} onClick={this.handleMagnifyClick} />;

    // get the largest width that is less than the container width
    getClosestWidth = containerWidth => this.props.widths.reduce((prev, curr) => curr > containerWidth ? prev : curr);

    calculateWidth = () => {
        const containerWidth = this.containerRef.current.getBoundingClientRect().width;
        const imageWidth = this.getClosestWidth(containerWidth);
        const imageSrc = this.props.template.replace(/{{width}}/gi, imageWidth);

        this.setState({containerWidth, imageWidth, imageSrc});
    };

    setStateImageHeight = () => {
        // keep tracking of image height to calculate zoomin-in percentage
        // which requires increasing background size (width and height)
        const imageHeight = this.figureRef.current.getBoundingClientRect().height;
        this.setState({imageHeight});
    }
    
    getFigureStyle = () => 
        this.state.magnified
        ? {
            backgroundImage: `url(${this.state.imageSrc})`,
            backgroundSize: `${this.state.imageWidth * 2}px ${this.state.imageHeight * 2}px`
        }
        : {};
}

ImageViewer.propTypes = {
    template: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string,
    zoomInIcon: PropTypes.string.isRequired,
    zoomOutIcon: PropTypes.string.isRequired,
    onCalculate: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func
}

export default ImageViewer;