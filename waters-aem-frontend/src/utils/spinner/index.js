import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class LoadingSpinner extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        if (this.props.type === '' || this.props.type === 'overlay'){
            window.scrollTo(0, 0);
            window.document.documentElement.classList.add('showing-spinner');
        }
    }

    componentWillUnmount() {
        if (this.props.type === '' || this.props.type === 'overlay'){
            window.document.documentElement.classList.remove('showing-spinner');
        }
    }

    render() { 
        const { color, loading, type, size } = this.props;
        let sType, sSize, sColor;
        
        if (type === 'overlay'){
            sType = type;
            sSize = 64;
            sColor = '#9CA7B0';
        } else if (type === 'inline'){
            sType = type;
            sSize = 22;
            sColor = '#ffffff';
        } else {
            sType = type;
            sSize = parseInt(size);
            sColor = color;  
        }

        return (
            <div className={'cmp-search-' + sType}>
                <ClipLoader
                    sizeUnit={'px'}
                    size={sSize}
                    color={sColor}
                    loading={loading}
                />
            </div>
        );
    }
}



LoadingSpinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string
};

LoadingSpinner.defaultProps = {
    loading: true,
    type: 'overlay',
    size: 64,
    color: '#9CA7B0'
}

export default LoadingSpinner;
