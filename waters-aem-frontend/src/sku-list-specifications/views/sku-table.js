import React from 'react';
import PropTypes from 'prop-types';
import SkuTableItem from './sku-table-item';
import { callCustomerPriceApi } from '../../utils/userFunctions';
import LoginStatus from '../../scripts/loginStatus';
import CheckOutStatus from '../../scripts/checkOutStatus';
import Ecommerce from '../../scripts/ecommerce';

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
                checkEcommCondition={this.checkEcommCondition}
            />
        ));

    checkEcommCondition = () => {
        if (Ecommerce.isDisabledState()) {
            return false;
        } else if (
            (Ecommerce.isPartialState() &&
                LoginStatus.state() &&
                CheckOutStatus.state()) ||
            (!Ecommerce.isPartialState() && !Ecommerce.isDisabledState())
        ) {
            return true;
        }
        return false;
    };
    render() {
        const { config, skuList } = this.props;
        return (
            <section class="sku-table">
                <section class="sku-table__header row">
                    <span className="item col-lg col-lg-1">
                        {config.skuNumberLabel}
                    </span>
                    <span className="item col-lg">{config.productLabel}</span>
                    {this.checkEcommCondition() ? (
                        <>
                            <span className="item col-lg col-lg-2">
                                {config.availabilityLabel}
                            </span>
                            <span className="item col-lg col-lg-1">
                                {config && config.skuInfo
                                    ? config.skuInfo.listPriceLabel
                                    : ''}
                            </span>
                            {LoginStatus.state() && (
                                <span className="item col-lg col-lg-1 regular">
                                    {config && config.skuInfo
                                        ? config.skuInfo.custPriceLabel
                                        : ''}
                                </span>
                            )}
                            <span className="item col-lg col-lg-2"></span>
                        </>
                    ) : (
                        <span className="item col-lg col-lg-6"></span>
                    )}
                </section>
                <ul class="sku-table__body">
                    {skuList && this.getSkuListItems(skuList)}
                </ul>
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
