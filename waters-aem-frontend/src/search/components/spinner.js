import React, { Component } from 'react';
import { RingLoader } from 'react-spinners';

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
                <RingLoader
                    sizeUnit={'px'}
                    size={150}
                    color={'#0f7f85'}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}

export default LoadingSpinner;
