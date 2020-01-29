import React from 'react';
import PropTypes from "prop-types";
import OrderListItem from './components/OrderListItem';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skuConfig: this.props.skuConfig,
            skuAvailability: {},
            addToCartQty: undefined,
        };
    }

    render() {
        return (
            <>
                {this.props.data.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.title && (
                            <div className="cmp-sku-list__title">
                                {this.props.title}
                            </div>
                        )}
                        {this.props.data.map((record, index) => (
                            <OrderListItem
                                relatedSku={record}
                                skuConfig={this.props.skuConfig}
                                onItemClick={this.props.onItemClick}
                            />
                        ))}
                    </>
                )}
            </>
        );
    }
}

OrderHistory.propTypes = {
    skuConfig: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string
};

export default OrderHistory;