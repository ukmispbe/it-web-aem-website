import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class LoadingSpinner extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        window.document.documentElement.classList.add('showing-spinner');
    }

    componentWillUnmount() {
        window.document.documentElement.classList.remove('showing-spinner');
    }

    render() {
        return (
            <div className="cmp-search-overlay">
                <ClipLoader
                    sizeUnit={'px'}
                    size={64}
                    color={'#9CA7B0'}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}

export default LoadingSpinner;
