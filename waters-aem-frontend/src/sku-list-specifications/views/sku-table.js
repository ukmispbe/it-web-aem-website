import React from 'react';
import SkuTableItem from './sku-table-item';

const SkuTable = (props) => {
    const { config } = props;
    return (
        <section class="sku-table">
            <section class="sku-table__header row">
                <span className="item col-lg col-lg-1">
                    {config.skuNumberLabel}
                </span>
                <span className="item col-lg">{config.productLabel}</span>
                <span className="item col-lg col-lg-2">
                    {config.availabilityLabel}
                </span>
                <span className="item col-lg col-lg-1">
                    {config.skuInfo.listPriceLabel}
                </span>
                <span className="item col-lg col-lg-1 regular">
                    {config.skuInfo.custPriceLabel}
                </span>
                <span className="item col-lg col-lg-2"></span>
            </section>
            <ul class="sku-table__body">
                <SkuTableItem />
            </ul>
        </section>
    );
};

SkuTable.propTypes = {
    config: PropTypes.object.isRequired,
};

SkuTable.defaultProps = {
    config: {},
};

export default SkuTable;
