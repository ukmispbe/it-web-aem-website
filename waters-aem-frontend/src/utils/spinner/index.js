import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        
        sType = type;
        if (type === 'overlay'){
            sSize = 64;
            sColor = color;
        } else if (type === 'inline'){
            sSize = 22;
            sColor = '#ffffff';
        } else {
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
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string
};

LoadingSpinner.defaultProps = {
    loading: true,
    type: 'overlay',
    size: 64,
    color: '#9CA7B0'
}

export default LoadingSpinner;
