import React from 'react';

const SkuTableItem = () => {
  return (
      /* Following are the placeholder values for the line item */
      <li class="sku-table-item row">
          {/* SKU Code */}
          <span className="item col-lg col-lg-1">1000000001</span>
          {/* SKU Title */}
          <span className="item col-lg">
              <a>lorem ipsum</a>
          </span>
          {/* SKU Availability */}
          <span className="item col-lg col-lg-2">See Availability</span>
          {/* SKU List Price */}
          <span className="item col-lg col-lg-1 small">928 USD</span>
          {/* SKU Customer Price */}
          <span className="item col-lg col-lg-1">928 USD</span>
          {/* Placeholder for add to cart */}
          <span className="item col-lg col-lg-2"></span>
      </li>
  );
};

export default SkuTableItem;
