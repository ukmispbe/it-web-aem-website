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
          <figure
            onDragStart={this.handleOnDragStart}
            ref={this.figureRef}
            className={`image-viewer-container__image-figure image-viewer-container__image-figure--${this.state.magnified}`}
            style={this.getFigureStyle()}
            onMouseMove={this.handleFigureMouseMove}
            onTouchStart={this.handleFigureTouchStart}
            onTouchEnd={this.handleFigureTouchEnd}
            onTouchMove={this.handleFigureTouchMove}>
            <img
            className="image-viewer-container__image-element"
            src={this.state.imageSrc}
            alt=""/>
          </figure>
          <div className="image-viewer-container__image-zoom">
            <div>{this.renderZoomIcon()}</div>
          </div>
        </div>
      </div>
    }

    componentDidMount() {
        this.calculateWidth();

        // delay so the figure element contains the calculated image
        setTimeout(() => this.setStateImageHeight(), 500);

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

    renderZoomIcon = () => this.state.magnified
        ? <ReactSVG src={this.props.zoomOutIcon} onClick={this.handleMagnifyClick} /> 
        : <ReactSVG src={this.props.zoomInIcon} onClick={this.handleMagnifyClick} />;

    getClosestWidth = containerWidth => this.props.widths.reduce((prev, curr) => curr > containerWidth ? prev : curr);

    calculateWidth = () => {
        const containerWidth = this.containerRef.current.getBoundingClientRect().width;
        const imageWidth = this.getClosestWidth(containerWidth);
        const imageSrc = this.props.template.replace(/{{width}}/gi, imageWidth);

        this.setState({
            containerWidth,
            imageWidth,
            imageSrc
        });

        if (this.props.onCalculate) {
            setTimeout(() => {
                this.setStateImageHeight();
                this.props.onCalculate(this.state), 500
            });
        }
    };

    setStateImageHeight = () => {
        const imageHeight = this.figureRef.current.getBoundingClientRect().height;
        this.setState({imageHeight});
    }
    
    getFigureStyle = () => 
        this.state.magnified
        ? {
            backgroundImage: `url(${this.state.imageSrc})`,
            backgroundSize: `${this.state.imageWidth * 2}px ${this.state.imageHeight * 2}px`,
            maxWidth: `${this.state.imageWidth}px`
        }
        : {
            maxWidth: `${this.state.imageWidth}px`
        };
}

ImageViewer.propTypes = {
    template: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired,
    zoomInIcon: PropTypes.string.isRequired,
    zoomOutIcon: PropTypes.string.isRequired,
    onCalculate: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func
}

export default ImageViewer;