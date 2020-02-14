import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import OrderHistoryService from'./orderHistory.services';
import OrderListItem from './components/order-list-item';
import OrderCount from './components/order-count';
import TimePeriod from './components/time-period';
import OrderFilterDropdown from './components/order-filter-dropdown';
import Tabs from "../navigation/tabs";
import Spinner from "../utils/spinner";

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
            fromDate: "2018-03-29T13:34:00.000",
            toDate: "2020-03-29T13:34:00.000",
            orderNumber: "15739756",
            poNumber: "TEST",
            loading: true,
            noResults: false,
            filterCriteria: "All"
        }

        this.orderMock = [
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
            }
        ];

        this.paginationDefaults = {
            visibleRows: 10,
            nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
            previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
            pageRangeDisplayed: 8,
            marginPagesDisplayed: 1
        }
    }

    componentDidMount() {

        this.retrieveData(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber);

        // const OrderHistoryServiceObj = new OrderHistoryService();
        // //OrderHistoryServiceObj.getOrderListPost(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber).then(result => {
        // OrderHistoryServiceObj.getOrderList(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber).then(result => {
        //     if(result.length > 0){
        //         this.setState({ 
        //             orderList: result,
        //             pageCount: Math.ceil(result.length / this.paginationDefaults.visibleRows),
        //             listCount: result.length,
        //             currentPage: 1,
        //             loading: false
        //         });
        //     } else {
        //         this.setState({ 
        //             orderList: null,
        //             pageCount: 0,
        //             listCount: 0,
        //             currentPage: 1,
        //             noResults: true,
        //             loading: false
        //         }); 
        //     } 
        // }) || null;
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
    renderPaginatedResults = () => {
        const rows = this.paginationDefaults.visibleRows;
        const count = this.state.listCount;
        const current = this.state.currentPage;
        const endResults = count > current * rows ? current * rows : count;
        const startResults = current * rows - rows;
        let itemsToRender = this.state.orderList.slice(startResults, endResults +1);
        return itemsToRender;
    }


    renderNoResults = () => {
        return (
            <>
                <div className="cmp-order-list__title">
                    {this.props.configs.noOrdersFoundTitle}
                </div>
                <div className="cmp-order-list__no-results">
                    <p>{this.props.configs.noOrdersFoundText}</p>
                    <p><a href={this.props.configs.shopAllHref}>{this.props.configs.shopAllTitle}</a></p>
                </div>
            </>
        );
    }

    handleCategorySelected(e) {
        // 0 = Open Orders, 1 = All Orders
        let tabId;
        let filterCriteria = "All";
        (e.value || e.value === 0) ? tabId = e.value : tabId = e;
        console.log("tabId ", tabId);

        if (tabId === 0) filterCriteria = "Open";
        this.setState({
            filterCriteria: filterCriteria
        });
        this.retrieveData(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber);
    }

    timePeriodHandler(e) {
        const selectedTimeframe = e.value;
        let now;
        const currentDate = new Date();

        switch (selectedTimeframe) {
            case 1:
                now = new Date();
                let thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                this.setState({
                    fromDate: thirtyDaysAgo.toISOString(),
                    toDate: currentDate.toISOString()
                });
                break;

            case 2:
                now = new Date();
                let sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
                this.setState({
                    fromDate: sixMonthsAgo.toISOString(),
                    toDate: currentDate.toISOString()
                });
                break;

            case 3:
                now = new Date();
                let twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
                this.setState({
                    fromDate: twelveMonthsAgo.toISOString(),
                    toDate: currentDate.toISOString()
                });
                break;

            case 4:
                this.setState({
                    toDate: "2999-12-31T23:59:59.999Z",
                    fromDate: "1900-01-01T00:00:00.000Z",
                });
                break;
            default:
        }
        this.retrieveData(this.state.email, this.state.fromDate, this.state.toDate, this.state.poNumber);
    }

    retrieveData = (email, fromDate, toDate, poNumber) => {
        console.log("toDate", toDate);
        const OrderHistoryServiceObj = new OrderHistoryService();
        OrderHistoryServiceObj.getOrderListPost(email, fromDate, toDate, poNumber).then(result => {
        //OrderHistoryServiceObj.getOrderList(email, fromDate, toDate, poNumber).then(result => {
            if(result.length > 0){
                this.setState({ 
                    orderList: result,
                    pageCount: Math.ceil(result.length / this.paginationDefaults.visibleRows),
                    listCount: result.length,
                    currentPage: 1,
                    loading: false
                });
            } else {
                this.setState({ 
                    orderList: null,
                    pageCount: 0,
                    listCount: 0,
                    currentPage: 1,
                    noResults: true,
                    loading: false
                }); 
            } 
        }) || null;
    }

    paginationClickHandler = (page) => {
        this.setState({ 
            currentPage: page.selected + 1
        }); 
        window.scroll(0,0);
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
                {this.state.loading ? ( <Spinner loading={this.state.loading} /> ) : null}
                {!this.state.loading && this.state.listCount > 0 && ( //only return template if data exists
                    <>                        
                        <Tabs className="cmp-search__categories-tabs"
                            items={this.props.configs.tabs}
                            activeIndex={0}
                            onClick={e => this.handleCategorySelected(e)}
                            enableFading={true}
                        />

                        <div className="cmp-order-list__header">
                            <div className="cmp-order-list__dropdowns">
                                <OrderFilterDropdown
                                    onChange={e => this.handleCategorySelected(e)}
                                    orderFilters={this.props.configs.orderfilters}
                                />
                                <TimePeriod 
                                    onChange={e => this.timePeriodHandler(e)}
                                    timePeriod={this.props.configs.timeperiod}
                                />
                            </div>
                            {this.renderOrderCountHeader()}
                        </div>

                        {this.renderPaginatedResults().map((item, index) => (               
                            <OrderListItem
                                data={item}
                                orderText={this.props.configs.orderText}
                                itemsText={this.props.configs.itemsText}
                                shipment={this.props.configs.shipment}
                                icons={this.props.configs.icons}
                            />
                        ))}
                        {this.renderPagination()}
                    </>
                )}

                {!this.state.loading && this.state.noResults && (
                    <>
                        <Tabs className="cmp-search__categories-tabs"
                            items={this.props.configs.tabs}
                            activeIndex={0}
                            enableFading={true}
                        />
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