import React from 'react';
import PropTypes from 'prop-types';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const priceLabelClass = (this.props.isListPrice === true) ? "cmp-sku-list__list-price-label" : "cmp-sku-list__cust-price-label";
        return (
            <>
                <div className={priceLabelClass} data-locator="sku-price-label" aria-label={this.props.label}>{this.props.label}</div>
                {this.props.price &&
                    <div className="cmp-sku__price" data-locator="sku-price" aria-label={this.props.price}>{this.props.price}</div>
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