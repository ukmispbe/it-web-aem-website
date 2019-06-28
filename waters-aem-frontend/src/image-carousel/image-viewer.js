import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

class ImageViewer extends React.Component {
    constructor() {
        super();

        if (this.props && this.props.widths.length === 0) {
            this.widths = [128, 140, 256, 320, 375, 620, 770, 1280];
        } else if (this.props && this.props.widths.length > 0) {
            this.widths = this.props.widths;
        } else {
            this.widths = [];
        }

        this.state = {
            containerWidth: 0,
            imageWidth: 0,
            imageSrc: '',
            magnified: false,
        };

        this.containerRef = React.createRef();
        this.figureRef = React.createRef();
    }

    handleOnDragStart = e => e.preventDefault();

    handleMagnifyClick = e => {
        // delay clearing background position so the image gets rendered on the page
        setTimeout(
            () => (this.figureRef.current.style.backgroundPosition = ''),
            0
        );

        const magnified = !this.state.magnified;

        if (magnified && this.props.onZoomIn) {
            this.props.onZoomIn();
        }

        if (!magnified && this.props.onZoomOut) {
            this.props.onZoomOut();
        }

        if (magnified) {
            this.setState({ magnified }, () => {
                if (this.state.magnified) {
                    // CSS hack for browsers that do not support background-size transitions
                    // delay 500ms to allow the transform transition to conplete
                    setTimeout(() => {
                        this.figureRef.current.classList.add(
                            'image-viewer-container__image-figure--zoomin-background'
                        );
                        this.figureRef.current.classList.remove(
                            'image-viewer-container__image-figure--zoomout-background'
                        );
                    }, 500);
                }
            });
        } else {
            // CSS hack for browsers that do not support background-size transitions
            this.figureRef.current.classList.add(
                'image-viewer-container__image-figure--zoomout-background'
            );
            this.figureRef.current.classList.remove(
                'image-viewer-container__image-figure--zoomin-background'
            );

            // delay to allow the CSS ruleset above to render
            setTimeout(() => this.setState({ magnified }), 0);
        }
    };

    handleFigureMove = (magnified, offsetX, offsetY, figureElement) => {
        if (!magnified) return;

        let x = (offsetX / figureElement.offsetWidth) * 100;
        let y = (offsetY / figureElement.offsetHeight) * 100;

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
        if (CSS && !CSS.supports('touch-action', 'none')) {
            //document.body.classList.add('lock-scroll');
        }
    };

    handleFigureTouchEnd = e => {
        if (CSS && !CSS.supports('touch-action', 'none')) {
            //document.body.classList.remove('lock-scroll');
        }
    };

    render() {
        return (
            <div ref={this.containerRef} className="image-viewer-container">
                <div className="image-viewer-container__image-display">
                    {this.renderImageDisplay()}
                    <div className="image-viewer-container__image-zoom">
                        <div>{this.renderZoomIcon()}</div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.imageWidth !== this.state.imageWidth &&
            this.props.onCalculate
        ) {
            this.props.onCalculate(this.state);
        }
    }

    componentDidMount() {
        this.figureRef.current.style.backgroundPosition = '50% 50%';

        this.calculateWidth();

        // this is for desktop
        window.addEventListener('resize', this.calculateWidth);

        // this is for iPad orientation
        window.addEventListener('orientationchange', this.calculateWidth);

        // this is for mobile devices
        window.addEventListener('deviceorientation', this.calculateWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateWidth);
        window.removeEventListener('orientationchange', this.calculateWidth);
        window.removeEventListener('deviceorientation', this.calculateWidth);
    }

    renderImageDisplay = () => (
        <figure
            ref={this.figureRef}
            className={`image-viewer-container__image-figure image-viewer-container__image-figure--${
                this.state.magnified
            } image-viewer-container__image-figure--zoomin-${
                this.state.magnified
            }`}
            style={{ backgroundImage: `url(${this.state.imageSrc})` }} 
            onDragStart={this.handleOnDragStart}
            onMouseMove={this.handleFigureMouseMove}
            onTouchStart={this.handleFigureTouchStart}
            onTouchEnd={this.handleFigureTouchEnd}
            onTouchMove={this.handleFigureTouchMove}
        >
            <img
                className="image-viewer-container__image-element"
                src={this.state.imageSrc}
                alt={this.props.alt}
            />
        </figure>
    );

    renderZoomIcon = () =>
        this.state.magnified ? (
            <div onClick={this.handleMagnifyClick}>
                <ReactSVG src={this.props.zoomOutIcon} />
            </div>
        ) : (
            <div onClick={this.handleMagnifyClick}>
                <ReactSVG src={this.props.zoomInIcon} />
            </div>
        );

    // get the largest width that is less than the container width
    getClosestWidth = containerWidth => {
        if (this.widths.length) {
            return this.widths.reduce((prev, curr) =>
                curr > containerWidth ? prev : curr
            );
        } else {
            return '660';
        }
    };

    calculateWidth = () => {
        const containerWidth = this.containerRef.current.getBoundingClientRect()
            .width;
        const imageWidth = this.getClosestWidth(containerWidth);
        const imageSrc = this.props.template.replace(/{{width}}/gi, imageWidth);

        this.setState({ containerWidth, imageWidth, imageSrc });
    };
}

ImageViewer.propTypes = {
    template: PropTypes.string.isRequired,
    widths: PropTypes.arrayOf(PropTypes.string).isRequired,
    alt: PropTypes.string,
    zoomInIcon: PropTypes.string.isRequired,
    zoomOutIcon: PropTypes.string.isRequired,
    onCalculate: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
};

export default ImageViewer;
