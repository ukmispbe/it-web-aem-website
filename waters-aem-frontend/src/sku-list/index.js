// entry point for SKU. Move this up to global entry point if we want babel to polyfill everything we need at build time
import React from 'react';
// import PropTypes from 'prop-types';
// import { Modal } from '../modal/index';
// import Stock from './views/stock';

import ListItem from './views/listItem'

class SkuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuConfig: this.props.skuConfig,
            skuAvailability: {},
            addToCartQty: undefined
        };

    }

    render() {
        return (
            <>
                {this.props.data.length > 0 && //only return template if data exists
                    <>
                        {this.props.data.map((record, index) => <ListItem relatedSku={record} skuConfig={this.props.skuConfig}/>)}
                    </>
                }
            </>
        );
        
    }
}


export default SkuList;
