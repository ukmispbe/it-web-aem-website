import React from 'react';
import PropTypes from 'prop-types';
import Spinner from './spinner';

const Loading = ({visible}) => {
    if (!visible) {
        return <></>;
    }

    return (
        <div>
            <div className="overlay" />
            <Spinner loading={true} />
        </div>
    );
};

Loading.propTypes = {
    visible: PropTypes.bool.isRequired
};

Loading.defaultProps = {
    visible: false
};

export default Loading;