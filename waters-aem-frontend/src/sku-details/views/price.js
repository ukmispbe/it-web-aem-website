import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';

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