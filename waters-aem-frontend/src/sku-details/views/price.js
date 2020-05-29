import React from 'react';
import PropTypes from 'prop-types';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <span>{this.props.skuInfo.custPriceLabel}</span>
                {this.props.price &&
                    <div className="cmp-sku__price">{this.props.price}</div>
                }
            </>
        )
    }
}

Price.propTypes = {
    skuInfo: PropTypes.object.isRequired,
    price: PropTypes.string.isRequired
}

Price.defaultProps = {
    skuInfo: {},
    price: ''
}

export default Price;