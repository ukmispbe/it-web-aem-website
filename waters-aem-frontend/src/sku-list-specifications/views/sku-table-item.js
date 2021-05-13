import React from 'react';

const SkuTableItem = () => {
    return (
        <li class="sku-table-item row">
            <span className="item col-lg col-lg-1">1000000001</span>
            <span className="item col-lg">
                <a>lorem ipsum</a>
            </span>
            <span className="item col-lg col-lg-2">See Availability</span>
            <span className="item col-lg col-lg-1 small">928 USD</span>
            <span className="item col-lg col-lg-1">928 USD</span>
            <span className="item col-lg col-lg-2"></span>
        </li>
    );
};

export default SkuTableItem;
