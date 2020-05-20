import React from 'react';
import Dropdown from '../../utils/dropdown'

const getOptions = text => {
    return [
        {
            value: 0,
            label: text.allOrders,
        },
        {
            value: 1,
            label: text.openOrders,
        }
    ];
};

const OrderFilterDropdown = props => {
    return (
        <div className="cmp-order-list-orderfilters">
            <Dropdown
                getOptions={getOptions}
                onChange={e => props.onChange(e)}
                isSearchable={false}
                text={props.orderFilters}
                defaultValue = {1}
            />
        </div>
    );
};

export default OrderFilterDropdown;
