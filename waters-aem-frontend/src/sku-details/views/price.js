import React from 'react';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <span>{this.props.skuConfig.listPriceLabel}</span>
                {this.props.price &&
                    <div className="cmp-sku__price">{this.props.price}</div>
                }
            </>
        )
    }

}

export default Price;