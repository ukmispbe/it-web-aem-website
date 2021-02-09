import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import HistoryService from'../history.services';
import OrderListItem from '../components/order-list-item';
import CountHeader from '../../common/count-header'
import TimePeriodDropdown from '../components/time-period-dropdown';
import FilterDropdown from '../components/filter-dropdown';
import Tabs from '../../navigation/tabs';
import Spinner from '../../utils/spinner';
import Analytics, { analyticTypes, setClickAnalytics, setSelectDropdownAnalytics } from '../../analytics';

import '../../styles/order-history.scss';
class OrderHistory extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            listItems: "",
            fromDate: new Date(today.setDate(today.getDate() - 30)),
            poNumber: "",
            orderNumber: "",
            activeTabFilter: "All",
            activeIndex: 0,
            activeTimePeriod: 1,
            errorObjHistory: {},
            loading: true,
            noResults: false,
            error: false,
            initialPageLoad: true
        }

        this.page = {
            name: "Order History",
            type: "Orders",
            analytics: {
                reference: "orderHistory",
                timePeriod: "Order Period Selected",
                timePeriodOptions: ['Last 30 Days', 'Last 6 Months', 'Last 12 Months', 'Show All']
            }
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
        const {fromDate, poNumber, orderNumber, activeTabFilter} = this.state;
        this.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
    }

    setAnalytics = (event, detail={}) => {
        const model = {
            detail,
            event
        };
        Analytics.setAnalytics(analyticTypes[this.page.analytics.reference].name, model);
    }

    setError = (error) => {
        this.setAnalytics('error', {error});
        this.setState({error: true})
    }

    handleCategorySelected(e) {
        // 0 = All Orders, 1 = Open Orders
        let tabId;
        let activeTabFilter = "All";
        (e.value || e.value === 0) ? tabId = e.value : tabId = e;

        if (tabId === 1) {
            activeTabFilter = "Open";
        }

        setClickAnalytics(this.page.title, `${this.page.title} ${activeTabFilter} ${this.page.type}`, '#');

        this.setState({
            activeTabFilter: activeTabFilter,
            activeIndex: tabId
        }, () => {
            const {fromDate, poNumber, orderNumber, activeTabFilter} = this.state 
            this.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
        }); 
    }

    timePeriodHandler(e) {
        const { timePeriod, timePeriodOptions } = this.page.analytics;
        const selectedTimeframe = e.value;
        let now = new Date();
        let timeValue ='';
        const days = 30;
        const sixMonths = 6;
        const twelveMonths = 12;
        const allTime = 15;

        setSelectDropdownAnalytics(timePeriod, `${this.page.title} ${timePeriodOptions[selectedTimeframe]}`);

        switch (selectedTimeframe) {
            case 1:
                timeValue = new Date(now.setDate(now.getDate() - days));
                break;

            case 2:
                timeValue = new Date(now.setMonth(now.getMonth() - sixMonths));
                break;

            case 3:
                timeValue = new Date(now.setMonth(now.getMonth() - twelveMonths));
                break;

            case 4:
                timeValue = new Date(now.setMonth(now.getMonth() - allTime));
                break;
            default:
        }

        this.setState({
            fromDate: timeValue.toISOString(),
            activeTimePeriod: selectedTimeframe
        },() => {
            const {fromDate, poNumber, orderNumber, activeTabFilter} = this.state 
            this.retrieveData(fromDate, poNumber, orderNumber, activeTabFilter);
        });
    }

    setNoResultsState = () => {
        this.setState({ 
            listItems: null,
            pageCount: 0,
            listCount: 0,
            currentPage: 1,
            noResults: true,
            loading: false
        }); 
    }

    setResultsState = (filteredListItems) => {
        this.setState({ 
            listItems: filteredListItems,
            pageCount: Math.ceil(filteredListItems.length / this.paginationDefaults.visibleRows),
            listCount: filteredListItems.length,
            currentPage: 1,
            noResults: false,
            loading: false
        });
    }

    retrieveData = async (fromDate, poNumber, orderNumber, activeTabFilter) => {
        const HistoryServiceObj = new HistoryService();
        const fetchEndPoint = this.props.configs.fetchEndPoint;
        const orders = await HistoryServiceObj.getOrderListPost(fetchEndPoint, fromDate, poNumber, orderNumber, this.setError);

        if(orders && orders.length > 0){
            let filteredListItems = orders;
            if (activeTabFilter !== undefined && activeTabFilter !== "All" && activeTabFilter === "Open"){
                filteredListItems = orders.filter(function(i) {
                    return i.deliveryStatus === "Open" || i.deliveryStatus === "Partial";
                })
                if (filteredListItems.length > 0){
                    this.setResultsState(filteredListItems)
                } else {
                    this.setNoResultsState()
                }
            } else {
                this.setResultsState(filteredListItems)
            }
        } else {
            this.setNoResultsState()
        }

        !this.state.error && this.state.initialPageLoad && this.setAnalytics('load');
        this.setState({initialPageLoad: false});
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
                <FilterDropdown
                    onChange={e => this.handleCategorySelected(e)}
                    dropdownfilters={this.props.configs.dropdownfilters}
                />
                <TimePeriodDropdown 
                    onChange={e => this.timePeriodHandler(e)}
                    timePeriod={this.props.configs.timeperiod}
                />
            </div>
        );
    }

    renderCountHeader = () => {
        return (
            <CountHeader
                rows={this.paginationDefaults.visibleRows}
                count={this.state.listCount}
                current={this.state.currentPage}
                resultsText={this.props.configs.resultsText}
                noResultsText={this.props.configs.noResultsFoundTitle}
            />
        );
    }

    renderPaginatedResults = () => {
        const rows = this.paginationDefaults.visibleRows;
        const count = this.state.listCount;
        const current = this.state.currentPage;
        const endResults = count > current * rows ? current * rows : count;
        const startResults = current * rows - rows;
        let itemsToRender = this.state.listItems.slice(startResults, endResults);
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
                    <p data-locator="no-results">{this.props.configs.noResultsFoundText}</p>
                    <p><a href={this.props.configs.shopAllHref} data-locator="shop-all">{this.props.configs.shopAllTitle}</a></p>
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
                        <div className="cmp-order-list__header clearfix" data-locator="order-list-header-clearfix">
                            {this.renderDropDowns()}
                            {this.renderCountHeader()}
                        </div>

                        {this.state.noResults && this.renderNoResults()}

                        {this.state.listCount > 0 && this.renderPaginatedResults().map((item, index) => (               
                            <OrderListItem
                                data={item}
                                numberText={this.props.configs.numberText}
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