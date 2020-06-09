import React from 'react';
import PropTypes from 'prop-types';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <span>{this.props.label}</span>
                {this.props.price &&
                    <div className="cmp-sku__price">{this.props.price}</div>
                }
            </>
        )
    }
}

Price.propTypes = {
    label: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
}

Price.defaultProps = {
    label: '',
    price: ''
}

export default Price;