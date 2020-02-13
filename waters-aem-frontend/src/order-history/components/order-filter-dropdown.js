import React from 'react';
import Dropdown from '../../utils/dropdown'

const getOptions = text => {
    return [
        {
            value: 1,
            label: text.openOrders,
        },
        {
            value: 2,
            label: text.allOrders,
        }
    ];
};

const OrderFilterDropdown = props => {
    return (
        <div className="cmp-order-list-orderfilters">
            <Dropdown
                getOptions={getOptions}
                onChange={e => props.handleCategorySelected(e)}
                isSearchable={false}
                text={props.orderFilters}
                defaultValue = {2}
            />
        </div>
    );
};

export default OrderFilterDropdown;
