import React from 'react';
import PropTypes from 'prop-types';

function LinkButton(props) {
    const { url, label } = props;
    return (
        <a
            className="cmp-button"
            href={url}
            title={label}
            data-locator={label}
        >{label}</a>
    );
}

LinkButton.propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
};

LinkButton.defaultProps = {
    url: '#',
    label: 'Contact Waters',
}

export default LinkButton;