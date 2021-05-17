import React from 'react';
import PropTypes from 'prop-types';
import SkuTableItem from './sku-table-item';
import { callCustomerPriceApi } from '../../utils/userFunctions';

class SkuTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            config: this.props.config,
            skuInfo: this.props.config.skuInfo,
            userInfo: callCustomerPriceApi(
                this.props.config.isCustomerPriceApiDisabled
            ),
        };
    }
    getSkuListItems = (skuList) =>
        skuList.map((item) => (
            <SkuTableItem
                skuData={item}
                userInfo={this.state.userInfo}
                config={this.props.config}
            />
        ));
    render() {
        const { config, skuList } = this.props;
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
                <ul class="sku-table__body">{this.getSkuListItems(skuList)}</ul>
            </section>
        );
    }
}

SkuTable.propTypes = {
    config: PropTypes.object.isRequired,
    skuList: PropTypes.object,
};

SkuTable.defaultProps = {
    config: {},
    skuList: [],
};

export default SkuTable;
