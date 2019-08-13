import React from 'react';
import ReactSVG from 'react-svg';
import Utilities from '../utils/utils';
// import PropTypes from 'prop-types';
// import { Modal } from '../modal/index';

class Price extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="cmp-sku-details__priceinfo">
                <span>List Price</span>
                <div className="cmp-sku-details__price">$665.00</div>
            </div>
            // <div className="cmp-sku-details__buyinfo">
            //     <div className="cmp-sku-details__priceinfo">
            //         <span>List Price</span>
            //         <div className="cmp-sku-details__price">
            //             $665.00
            //         </div>
            //     </div>
            //     <div className="cmp-sku-details__stockcontainer"></div>
            // </div>
        )
    }

}

export default Price;