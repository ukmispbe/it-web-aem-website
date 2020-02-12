import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import OrderHistoryService from'./orderHistory.services';
import OrderListItem from './components/OrderListItem';
import OrderCount from './components/order-count';
import TimePeriod from './components/time-period';
import Tabs from "../navigation/tabs";
class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationDefaults: {
                page: 1,
                pagination: 1
            },
            orderHistoryList: "",
            errorObjHistory: {},
            // fromDate: "2019-12-20",
            // toDate: "2020-1-30",
            email: "wendy_batista@waters.com",
            fromDate: "1573689600000",
            toDate: "1574035200000",
            countryCode: "US",
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
            rows: 25,
            nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
            previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
            pageRangeDisplayed: 8,
            marginPagesDisplayed: 1
        }
    }

    componentDidMount() {
        const OrderHistoryServiceObj = new OrderHistoryService();
        OrderHistoryServiceObj.getOrderList(this.state.email, this.state.fromDate, this.state.toDate, this.state.countryCode, this.state.poNumber).then(result => {
            this.setState({ 
                orderHistoryList: result,
                pagination: {
                    amount: Math.ceil(result.length / this.paginationDefaults.rows)
                }
            }); 
        }) || null;
    }
    
    renderOrderCount = () => {
        if (this.state.noResults || this.state.loading) return <></>;

        return (
            <OrderCount
                rows={this.state.rows}
                count={this.state.count}
                current={
                    this.state.pagination && this.state.pagination.current
                        ? this.state.pagination.current
                        : 1
                }
            />
        );
    };

    renderResults = results =>
        !this.state.loading && this.state.noResults ? (
            <>
            <div className="cmp-search__no-results">
                <h2>{this.props.configs.noOrdersFoundTitle}</h2>
                <p>{this.props.configs.noOrdersFoundText}<a href={this.props.configs.shopAllHref}>{this.props.configs.shopAllTitle}</a></p>
            </div>
        </>
        ) : (
            results
        );

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

    paginationClickHandler(page, e) {
        if (e === 'clicked') {
            this.search.setStorageForPagination();
        };

        const state = this.state;

        const newState = Object.assign({}, this.state, {
            pagination: {
                amount: state.pagination.amount,
                current: page.selected + 1,
            }
        });
    }

    renderPagination() {
        const previousIcon = (
            <ReactSVG src={this.paginationDefaults.previousIcon} />
        );
        const nextIcon = (
            <ReactSVG src={this.paginationDefaults.nextIcon} />
        );

        if (this.state.orderHistoryList.length > this.paginationDefaults.rows) {
            return (
                <ReactPaginate
                    pageCount={this.state.pagination.amount}
                    forcePage={
                        this.state.pagination.current
                            ? this.state.pagination.current - 1
                            : 0
                    }
                    pageRangeDisplayed={this.paginationDefaults.pageRangeDisplayed}
                    marginPagesDisplayed={this.paginationDefaults.marginPagesDisplayed}
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
                    nextLabel={nextIcon}
                    initialPage={
                        this.state.pagination.current
                            ? this.state.pagination.current - 1
                            : 0
                    }
                    disableInitialCallback={true}
                    hrefBuilder={this.buildHref}
                />
            )
        } else {
            return <></>;
        }
    }

    render() {
        console.log(this.props.configs);
        return (
            <>
                {this.state.orderHistoryList.length > 0 && ( //only return template if data exists
                    <>
                        {this.props.configs.title && (
                            <div className="cmp-order-list__title">
                                {this.props.configs.title}
                            </div>
                        )}
                        
                        <Tabs className="cmp-search__categories-tabs"
                            items={this.props.configs.tabs}
                            activeIndex={0}
                            onClick={this.handleCategorySelected}
                            enableFading={true}
                        />
                        <TimePeriod timePeriodHandler={this.timePeriodHandler.bind(this)} timePeriod={this.props.configs.timeperiod} />
                        {this.state.orderHistoryList.map((item, index) => (
                            
                            <OrderListItem
                                data={item}
                                orderText={this.props.configs.orderText}
                                viewShipmentsText={this.props.configs.viewShipmentsText}
                                viewShipmentsURL={this.props.configs.viewShipmentsURL}
                                //config={this.props.configs}
                            />
                        ))}
                        {this.renderPagination()}
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