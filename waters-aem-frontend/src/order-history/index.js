import React, { Component } from 'react';
import PropTypes from "prop-types";
import OrderListItem from './components/OrderListItem';
import OrderHistoryService from './orderHistory.services';

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistoryList: "",
            errorObjHistory: {},
        }
        this.orderMock = [
            {
                invoiceStatus: "Open",
                orderNumber: "15739756",
                purchaseOrderNumber: "TEST",
                date: "2020-01-30",
                itemsSubTotal: null,
                taxAmount: null,
                shippingAmount: null,
                currencyCode: "USD",
                orderTotal: "$2443.91",
                delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739754",
            purchaseOrderNumber: "TEST",
            date: "2020-01-29",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$792.53",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739748",
            purchaseOrderNumber: "TEST",
            date: "2020-01-29",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$2443.91",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739728",
            purchaseOrderNumber: "TEST",
            date: "2020-01-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$286.22",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739719",
            purchaseOrderNumber: "TEST",
            date: "2020-01-24",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$865.25",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739617",
            purchaseOrderNumber: "TEST",
            date: "2020-01-09",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$17.00",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739520",
            purchaseOrderNumber: "TEST",
            date: "2019-12-11",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$16.89",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739506",
            purchaseOrderNumber: "TEST",
            date: "2019-12-09",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$805.16",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739390",
            purchaseOrderNumber: "TEST",
            date: "2019-11-18",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$116.89",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739367",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739366",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739364",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739363",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739362",
            purchaseOrderNumber: "TEST",
            date: "2019-11-14",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5545.52",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739129",
            purchaseOrderNumber: "TEST",
            date: "2019-10-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$5349.08",
            delivaryStatus: "Open"
            },
            {
            invoiceStatus: "Open",
            orderNumber: "15739128",
            purchaseOrderNumber: "TEST",
            date: "2019-10-27",
            itemsSubTotal: null,
            taxAmount: null,
            shippingAmount: null,
            currencyCode: "USD",
            orderTotal: "$24.49",
            delivaryStatus: "Open"
            }
            ];
    
    }

    componentDidMount() {
        OrderHistoryService.getOrderList(this.state.fromDate, this.state.toDate, this.state.email)
            .then(response => {
                this.setState({
                    orderHistoryList: response
                });
            })
            .catch(err => {
                // Add Error Object to State
                this.setState({ errorObjHistory: err });
            });
    }
    render() {
        return (
            <>
                {this.state.orderHistoryList.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.title && (
                            <div className="cmp-sku-list__title">
                                {this.props.title}
                            </div>
                        )}
                        {this.state.orderHistoryList.map((item, index) => (
                            <OrderListItem
                                data={item}
                            />
                        ))
                        
                        (
                        // <ReactPaginate
                        //     pageCount={state.pagination.amount}
                        //     forcePage={
                        //         state.pagination.current
                        //             ? state.pagination.current - 1
                        //             : 0
                        //     }
                        //     pageRangeDisplayed={8}
                        //     marginPagesDisplayed={1}
                        //     containerClassName="paginate__container"
                        //     onPageChange={num =>
                        //         this.paginationClickHandler.bind(
                        //             this,
                        //             num,
                        //             'clicked'
                        //         )()
                        //     }
                        //     breakLabel={'…'}
                        //     previousLabel={previousIcon}
                        //     nextLabel={
                        //         <ReactSVG src={this.props.searchText.nextIcon} />
                        //     }
                        //     initialPage={
                        //         state.pagination.current
                        //             ? state.pagination.current - 1
                        //             : 0
                        //     }
                        //     disableInitialCallback={true}
                        //     hrefBuilder={this.buildHref}
                        // />
                        )}
                    </>
                )}
            </>
        );
    }
}

OrderHistory.propTypes = {
    title: PropTypes.string,
    noOrdersFoundTitle: PropTypes.string,
    noOrdersFoundText: PropTypes.string,
    shopAllTitle: PropTypes.string,
    shopAllHref: PropTypes.string
};

export default OrderHistory;