import React, { Component } from 'react';
import PropTypes from "prop-types";
import OrderListItem from './components/OrderListItem';
import OrderHistoryService from'./orderHistory.services';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: 1,
            nextIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
            previousIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
            orderHistoryList: "",
            errorObjHistory: {},
            fromDate: "2019-12-20",
            toDate: "2020-1-30",
            email: 'wendy_batista@waters.com' 

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
        const OrderHistoryServiceObj = new OrderHistoryService();
        OrderHistoryServiceObj.getOrderList(this.state.fromDate, this.state.toDate, this.state.email).then(result => {
            this.setState({ 
                orderHistoryList: result
            }); 
        }) || null;
    }


    paginationClickHandler(page, e) {
        if (e === 'clicked') {
            this.search.setStorageForPagination();
        };

        const state = this.state;

        const newState = Object.assign({}, this.state, {
            pagination: {
                amount: state.pagination.amount,
                current: page.selected + 1,
            },
        });

        this.setState(newState, () => {
            let query = this.getQueryObject();

            query.page = page.selected + 1;

            this.pushToHistory(query, query.facets);
        });
    }


    render() {
        const previousIcon = (
            <ReactSVG src={this.state.previousIcon} />
        );
        return (
            <>
                {this.state.orderHistoryList.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.configs.title && (
                            <div className="cmp-sku-list__title">
                                {this.props.configs.title}
                            </div>
                        )}
                        {this.state.orderHistoryList.map((item, index) => (
                            
                            <OrderListItem
                                data={item}
                            />
                        ))}
                        
                        <ReactPaginate
                            pageCount={this.state.pagination.amount}
                            forcePage={
                                this.state.pagination.current
                                    ? this.state.pagination.current - 1
                                    : 0
                            }
                            pageRangeDisplayed={8}
                            marginPagesDisplayed={1}
                            containerClassName="paginate__container"
                            onPageChange={num =>
                                this.paginationClickHandler.bind(
                                    this,
                                    num,
                                    'clicked'
                                )()
                            }
                            breakLabel={'…'}
                            previousLabel={previousIcon}
                            nextLabel={
                                <ReactSVG src={this.props.nextIcon} />
                            }
                            initialPage={
                                this.state.pagination.current
                                    ? this.state.pagination.current - 1
                                    : 0
                            }
                            disableInitialCallback={true}
                            hrefBuilder={this.buildHref}
                        />
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