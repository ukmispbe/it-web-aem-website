import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import OrderHistoryService from'./orderHistory.services';
import OrderListItem from './components/order-list-item';
import OrderCount from './components/order-count';
import TimePeriod from './components/time-period';
import Tabs from "../navigation/tabs";

//To-Dos
//toggle rendered items with page changes from pagination
//finish styling for desktop, mobile, tablet; icons in delivery status
//api tweaks; dropdown connections
//open orders tab filtering based on "deliveryStatus": "Open"
//test no results rendering; loading state; service error rendering
class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: "",
            errorObjHistory: {},
            // fromDate: "2019-12-20",
            // toDate: "2020-1-30",
            email: "wendy_batista@waters.com",
            fromDate: "1573689600000",
            toDate: "1574035200000",
            orderNumber: "15739756",
            poNumber: "TEST"
        }

        this.orderMock =    [
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739617",
                "purchaseOrderNumber": "TEST",
                "date": "2020-01-09",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$17.00",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739520",
                "purchaseOrderNumber": "TEST",
                "date": "2019-12-11",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$16.89",
                "deliveryStatus": "Open"

            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739506",
                "purchaseOrderNumber": "TEST",
                "date": "2019-12-09",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$805.16",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739390",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-18",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$116.89",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739367",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-14",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5545.52",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739366",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-14",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5545.52",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739364",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-14",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5545.52",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739363",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-14",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5545.52",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739362",
                "purchaseOrderNumber": "TEST",
                "date": "2019-11-14",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5545.52",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739129",
                "purchaseOrderNumber": "TEST",
                "date": "2019-10-27",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$5349.08",
                "deliveryStatus": "Open"
            },
            {
                "invoiceStatus": "Open",
                "orderNumber": "15739128",
                "purchaseOrderNumber": "TEST",
                "date": "2019-10-27",
                "itemsSubTotal": null,
                "taxAmount": null,
                "shippingAmount": null,
                "currencyCode": "USD",
                "orderTotal": "$24.49",
                "deliveryStatus": "Open"
            }
        ];

        this.paginationDefaults = {
            visibleRows: 4,
            nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
            previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
            pageRangeDisplayed: 8,
            marginPagesDisplayed: 1
        }
    }

    componentDidMount() {
        const OrderHistoryServiceObj = new OrderHistoryService();
        OrderHistoryServiceObj.getOrderList(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber).then(result => {
            this.setState({ 
                orderList: result,
                pageCount: Math.ceil(result.length / this.paginationDefaults.visibleRows),
                listCount: result.length,
                currentPage: 1
            }); 
        }) || null;
    }
    
    renderOrderCountHeader = () => {
        return (
            <OrderCount
                rows={this.paginationDefaults.visibleRows}
                count={this.state.listCount}
                current={this.state.currentPage}
                text={this.props.configs.resultsText}
            />
        );
    };

    renderNoResults = () => {
        return (
            <div className="cmp-search__no-results">
                <h2>{this.props.configs.noOrdersFoundTitle}</h2>
                <p>{this.props.configs.noOrdersFoundText}<a href={this.props.configs.shopAllHref}>{this.props.configs.shopAllTitle}</a></p>
            </div>
        );
    }

    timePeriodHandler(e) {
        const selectedTimeframe = e.value;
        let now, timeFilter = "";
        const currentDate = new Date();

         // &fromDate=1573689600000&toDate=1574035200000
        switch (selectedTimeframe) {
            case 1:
                now = new Date();
                let thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                timeFilter=`&fromDate=${thirtyDaysAgo.getTime()}&toDate=${currentDate.getTime()}`;
                this.setState({
                    fromDate: thirtyDaysAgo.getTime(),
                    toDate: currentDate.getTime()
                });
                break;

            case 2:
                now = new Date();
                let sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
                timeFilter=`&fromDate=${sixMonthsAgo.getTime()}&toDate=${currentDate.getTime()}`;
                this.setState({
                    fromDate: sixMonthsAgo.getTime(),
                    toDate: currentDate.getTime()
                });
                break;

            case 3:
                now = new Date();
                let twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
                timeFilter=`&fromDate=${twelveMonthsAgo.getTime()}&toDate=${currentDate.getTime()}`;
                this.setState({
                    fromDate: twelveMonthsAgo.getTime(),
                    toDate: currentDate.getTime()
                });
                break;

            case 4:
                this.setState({
                    fromDate: "0000000000000",
                    toDate: "9999999999999"
                });
                break;

            default:
        }
        // const sortOption = parseInt(e.value) === 1 ? parameterValues.sort.mostRelevant : parameterValues.sort.mostRecent;

        // let query = this.getQueryObject();

        // query.page = 1;
        // query.sort = sortOption;

        // this.setState({forceCollapseFilters: true}, () => {
        //     this.pushToHistory(query, query.facets);
        // });
    }

    paginationClickHandler = (page) => {
        this.setState({ 
            currentPage: page.selected + 1
        }); 
    }

    renderPagination() {
        const previousIcon = (
            <ReactSVG src={this.paginationDefaults.previousIcon} />
        );
        const nextIcon = (
            <ReactSVG src={this.paginationDefaults.nextIcon} />
        );

        if (this.state.listCount > this.paginationDefaults.visibleRows) {
            return (
                <ReactPaginate
                    pageCount={this.state.pageCount}
                    forcePage={this.state.currentPage -1}
                    pageRangeDisplayed={this.paginationDefaults.pageRangeDisplayed}
                    marginPagesDisplayed={this.paginationDefaults.marginPagesDisplayed}
                    containerClassName="paginate__container"
                    onPageChange={page => this.paginationClickHandler(page)}
                    breakLabel={'…'}
                    previousLabel={previousIcon}
                    nextLabel={nextIcon}
                    initialPage={this.state.currentPage -1}
                    disableInitialCallback={true}
                    hrefBuilder={this.buildHref}
                />
            )
        } else {
            return <></>;
        }
    }

    render() {
        return (
            <>
                {this.state.listCount > 0 && ( //only return template if data exists
                    <>                        
                        <Tabs className="cmp-search__categories-tabs"
                            items={this.props.configs.tabs}
                            activeIndex={0}
                            onClick={this.handleCategorySelected}
                            enableFading={true}
                        />
                        
                        {this.renderOrderCountHeader()}
                        <TimePeriod timePeriodHandler={this.timePeriodHandler.bind(this)} timePeriod={this.props.configs.timeperiod} />
                        {this.state.orderList.map((item, index) => (
                            
                            <OrderListItem
                                data={item}
                                orderText={this.props.configs.orderText}
                                shipment={this.props.configs.shipment}
                                icons={this.props.configs.icons}
                            />
                        ))}
                        {this.renderPagination()}
                    </>
                )}

                {!this.state.loading && this.state.noResults && (
                    <>
                        {this.renderNoResults()}
                    </>
                )}
            </>
        );
    }
}

OrderHistory.propTypes = {
    configs: PropTypes.object.isRequired
};

export default OrderHistory;