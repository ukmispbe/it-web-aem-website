import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from "prop-types";
import OrderHistoryService from'./orderHistory.services';
import OrderListItem from './components/order-list-item';
import OrderCountHeader from './components/order-count-header';
import TimePeriodDropdown from './components/time-period-dropdown';
import OrderFilterDropdown from './components/order-filter-dropdown';
import Tabs from "../navigation/tabs";
import Spinner from "../utils/spinner";

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        this.state = {
            orderList: "",
            fromDate: new Date(today.setDate(today.getDate() - 30)),
            toDate: new Date(),
            poNumber: "",
            orderNumber: "",
            activeTabFilter: "All",
            activeIndex: 0,
            activeTimePeriod: 1,
            errorObjHistory: {},
            loading: true,
            noResults: false
        }

        this.paginationDefaults = {
            visibleRows: 10,
            nextIcon: "/content/dam/waters/en/brand-assets/icons/right.svg",
            previousIcon: "/content/dam/waters/en/brand-assets/icons/left.svg",
            pageRangeDisplayed: 8,
            marginPagesDisplayed: 1
        }
    }

    componentDidMount() {
        this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
    }

    handleCategorySelected(e) {
        // 0 = All Orders, 1 = Open Orders
        let tabId;
        let activeTabFilter = "All";
        (e.value || e.value === 0) ? tabId = e.value : tabId = e;

        if (tabId === 1) activeTabFilter = "Open";
        this.setState({
            activeTabFilter: activeTabFilter,
            activeIndex: tabId
        }, () => {
            this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
        }); 
    }

    timePeriodHandler(e) {
        const selectedTimeframe = e.value;
        const currentDate = new Date();
        let now = new Date();

        switch (selectedTimeframe) {
            case 1:
                let thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
                this.setState({
                    fromDate: thirtyDaysAgo.toISOString(),
                    toDate: currentDate.toISOString(),
                    activeTimePeriod: selectedTimeframe
                },() => {
                    this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
                });
                break;

            case 2:
                let sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
                this.setState({
                    fromDate: sixMonthsAgo.toISOString(),
                    toDate: currentDate.toISOString(),
                    activeTimePeriod: selectedTimeframe
                },() => {
                    this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
                });
                break;

            case 3:
                let twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
                this.setState({
                    fromDate: twelveMonthsAgo.toISOString(),
                    toDate: currentDate.toISOString(),
                    activeTimePeriod: selectedTimeframe
                },() => {
                    this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
                });
                break;

            case 4:
                let showAllTimeframe = new Date(now.setMonth(now.getMonth() - 15));
                this.setState({
                    fromDate: showAllTimeframe.toISOString(),
                    toDate: currentDate.toISOString(),
                    activeTimePeriod: selectedTimeframe
                },() => {
                    this.retrieveData(this.state.fromDate, this.state.toDate, this.state.poNumber, this.state.orderNumber, this.state.activeTabFilter);
                });
                break;
            default:
        }
        
    }

    setNoResultsState = () => {
        this.setState({ 
            orderList: null,
            pageCount: 0,
            listCount: 0,
            currentPage: 1,
            noResults: true,
            loading: false
        }); 
    }

    setResultsState = (filteredOrders) => {
        this.setState({ 
            orderList: filteredOrders,
            pageCount: Math.ceil(filteredOrders.length / this.paginationDefaults.visibleRows),
            listCount: filteredOrders.length,
            currentPage: 1,
            noResults: false,
            loading: false
        });
    }

    filterOrderStatus = (orders, activeTabFilter) => {
        let filteredOrders = orders;
        if (activeTabFilter !== "All" && activeTabFilter !== undefined &&
            (activeTabFilter === "Open" || activeTabFilter === "Partial")){
            filteredOrders = orders.filter(function(i) {
                return i.deliveryStatus === activeTabFilter;
            })
            if (filteredOrders.length > 0){
                this.setResultsState(filteredOrders)
            } else {
                this.setNoResultsState()
            }
        } else {
            this.setResultsState(filteredOrders)
        }
    }

    retrieveData = async (fromDate, toDate,  poNumber, orderNumber, activeTabFilter) => {
        const OrderHistoryServiceObj = new OrderHistoryService();
        const orders = await OrderHistoryServiceObj.getOrderListPost(fromDate, toDate, poNumber, orderNumber);

        if(orders.length > 0){
            this.filterOrderStatus(orders, activeTabFilter)
        } else {
            this.setNoResultsState()
        } 
    }

    renderTabs = () => {
        return (                     
            <Tabs className="cmp-search__categories-tabs"
                items={this.props.configs.tabs}
                activeIndex={this.state.activeIndex}
                onClick={e => this.handleCategorySelected(e)}
                enableFading={true}
            />
        );
    }
    renderDropDowns = () => {
        return (
            <div className="cmp-order-list__dropdowns">
                <OrderFilterDropdown
                    onChange={e => this.handleCategorySelected(e)}
                    orderFilters={this.props.configs.orderfilters}
                />
                <TimePeriodDropdown 
                    onChange={e => this.timePeriodHandler(e)}
                    timePeriod={this.props.configs.timeperiod}
                />
            </div>
        );
    }

    
    renderOrderCountHeader = () => {
        return (
            <OrderCountHeader
                rows={this.paginationDefaults.visibleRows}
                count={this.state.listCount}
                current={this.state.currentPage}
                resultsText={this.props.configs.resultsText}
                noResultsText={this.props.configs.noOrdersFoundTitle}
            />
        );
    }

    renderPaginatedResults = () => {
        const rows = this.paginationDefaults.visibleRows;
        const count = this.state.listCount;
        const current = this.state.currentPage;
        const endResults = count > current * rows ? current * rows : count;
        const startResults = current * rows - rows;
        let itemsToRender = this.state.orderList.slice(startResults, endResults +1);
        return itemsToRender;
    }

    paginationClickHandler = (page) => {
        this.setState({ 
            currentPage: page.selected + 1
        }); 
        window.scroll(0,0);
    }

    renderPagination() {
        if (this.state.listCount > this.paginationDefaults.visibleRows) {
            const previousIcon = (
                <ReactSVG src={this.paginationDefaults.previousIcon} />
            );
            const nextIcon = (
                <ReactSVG src={this.paginationDefaults.nextIcon} />
            );

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

    renderNoResults = () => {
        return (
            <>
                <div className="cmp-order-list__no-results">
                    <p>{this.props.configs.noOrdersFoundText}</p>
                    <p><a href={this.props.configs.shopAllHref}>{this.props.configs.shopAllTitle}</a></p>
                </div>
            </>
        );
    }

    render() {
        return (
            <>  
                {this.state.loading ? ( <Spinner loading={this.state.loading} /> ) : null}
                {!this.state.loading && (
                    <>   
                    {this.renderTabs()}
                        <div className="cmp-order-list__header clearfix">
                            {this.renderDropDowns()}
                            {this.renderOrderCountHeader()}
                        </div>

                        {this.state.noResults && this.renderNoResults()}

                        {this.state.listCount > 0 && this.renderPaginatedResults().map((item, index) => (               
                            <OrderListItem
                                data={item}
                                orderText={this.props.configs.orderText}
                                itemsText={this.props.configs.itemsText}
                                shipment={this.props.configs.shipment}
                                icons={this.props.configs.icons}
                            />
                        ))}
                        {this.state.listCount > 0 && this.renderPagination()}           
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