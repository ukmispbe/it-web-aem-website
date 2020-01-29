import React from 'react';
import ReactSVG from 'react-svg';
import OrderHistoryService from '../orderHistory.services';
import dateFormatter from '../../utils/date-formatter'
import LoginStatus from '../../scripts/loginStatus';

class OrderListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceStatus: this.props.orderItem.invoiceStatus,
            orderNumber: this.props.orderItem.orderNumber,
            purchaseOrderNumber: this.props.orderItem.purchaseOrderNumber,
            date: this.props.orderItem.date,
            itemsSubTotal: this.props.orderItem.itemsSubTotal,
            taxAmount: this.props.orderItem.taxAmount,
            shippingAmount: this.props.orderItem.shippingAmount,
            currencyCode: this.props.orderItem.currencyCode,
            orderTotal: this.props.orderItem.orderTotal,
            deliveryStatus: this.props.orderItem.deliveryStatus,
            errorObj: {},
        };
        this.request = new OrderHistoryService(
            this.state.orderHistory,
            {
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                email: this.state.email,
            },
            err => {
                // Add Error Object to State
                this.setState({
                    errorObj: err,
                });
            }
        );

        this.checkAvailability = this.checkAvailability.bind(this);
    }

    handleItemClick = () => {
        if (this.props.onItemClick) {
            this.props.onItemClick();
        }
    };
    setDate = () => {
        if (this.this.state.date) {
            (this.this.state.date);
        }

    }




// Order Number: 48863058261
// December 8, 2019
// $3,514.87

// View Shipments
// Partially Shipped

// {
//     invoiceStatus: "Open",
//     orderNumber: "15739728",
//     purchaseOrderNumber: "TEST",
//     date: "2020-01-27",
//     itemsSubTotal: null,
//     taxAmount: null,
//     shippingAmount: null,
//     currencyCode: "USD",
//     orderTotal: "$286.22",
//     delivaryStatus: "Open"
// }

    renderBuyInfoPartial = () => {
        return (
            <div className="cmp-sku-details__buyinfo">
               
            </div>
        );
    };

    renderBuyInfoCommerceView = () => {
        if (Ecommerce.isDisabledState()) {
            return (null);
        } else {
            if ((Ecommerce.isPartialState() && LoginStatus.state()) && CheckOutStatus.state() ||
                (!Ecommerce.isPartialState() && !Ecommerce.isDisabledState())
                ) {
                    return (
                        <>
                            {this.renderBuyInfoPartial()}
                        </>
                    );
                } else {
                    return (null);
                }
        }
    };

    renderBreadcrumb = () => {
        if (this.props.skuConfig.showBreadcrumbs) {
            return (
                <div className="cmp-search__results-item-breadcrumb skuitem">
                    <div>{this.props.relatedSku.category_facet}</div>
                    <ReactSVG src={this.props.skuConfig.skuInfo.nextIcon} />
                    <div>{this.props.relatedSku.contenttype_facet}</div>
                </div>
            );
        }

        return <></>;
    };

    isDisabled = () => {
        if (Ecommerce.isPartialState()) {
            let conditions = LoginStatus.state() && CheckOutStatus.state();
            return !conditions;
        } else {
            return Ecommerce.isDisabledState();
        }
    };

    render() {
        const buyInfo = this.renderBuyInfo();
        const breadcrumbs = this.renderBreadcrumb();
        const disabledClass = this.isDisabled() ? 'disabled' : '';

        return (
            <div className={'cmp-sku-list__container ' + disabledClass}>
                <div className="cmp-sku-list__right">
                    {this.props.relatedSku.primaryImageThumbnail && (
                        <img
                            src={this.props.relatedSku.primaryImageThumbnail}
                            alt={this.props.relatedSku.primaryImageAlt}
                        />
                    )}
                </div>
                <div className="cmp-sku-details__left">
                    <div className="cmp-sku-list__code">
                        {this.props.skuConfig.skuInfo.partNumberLabel + " " + this.props.relatedSku.code}
                    </div>
                    <a
                        onClick={this.handleItemClick}
                        href={
                            this.props.relatedSku.skuPageHref
                                ? this.props.relatedSku.skuPageHref
                                : null
                        }
                    >
                        <div className="cmp-sku-details__title">
                            {this.props.relatedSku.title}
                        </div>
                    </a>

                    {buyInfo}
                    {breadcrumbs}
                </div>
            </div>
        );
    }
}
export default OrderListItem;
