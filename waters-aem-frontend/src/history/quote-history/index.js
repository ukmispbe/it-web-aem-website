import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import HistoryService from'../history.services';
import QuoteListItem from '../components/quote-list-item';
import CountHeader from '../../common/count-header'
import TimePeriodDropdown from '../components/time-period-dropdown';
import FilterDropdown from '../components/filter-dropdown';
import Tabs from '../../navigation/tabs';
import Spinner from '../../utils/spinner';
import {getSoldToId, getDummySoldToId, getUserId} from '../../utils/userFunctions'
import Analytics, { analyticTypes, setClickAnalytics, setSelectDropdownAnalytics } from '../../analytics';

class QuoteHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: "",
            noOfMonths: 1,
            poNumber: "",
            orderNumber: "",
            activeTabFilter: "ALL",
            activeIndex: 0,
            activeTimePeriod: 1,
            errorObjHistory: {},
            loading: true,
            noResults: false,
            error: false,
            initialPageLoad: true,
            currentPage:0,
            pageSize:10
        }

        this.page = {
            name: "Quote History",
            type: "Quotes",
            analytics: {
                reference: "quoteHistory",
                timePeriod: "Quote Period Selected",
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
        const {noOfMonths, activeTabFilter} = this.state;
        this.retrieveData(noOfMonths, activeTabFilter);
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
        // 0 = All Quotes, 1 = Open Quotes, 2 = Closed Quotes
        let tabId;
        let activeTabFilterStatus = "ALL";
        (e.value || e.value === 0) ? tabId = e.value : tabId = e;

        if (tabId === 1) {
            activeTabFilterStatus = "OPEN";
        } else if (tabId === 2) {
            activeTabFilterStatus = "CLOSED";
        }

        setClickAnalytics(this.page.title, `${this.page.title} ${activeTabFilterStatus} ${this.page.type}`, '#');

        this.setState({
            activeTabFilter: activeTabFilterStatus,
            activeIndex: tabId,
            currentPage:0
        }, () => {
            const {noOfMonths, activeTabFilter} = this.state 
            this.retrieveData(noOfMonths, activeTabFilter);
        }); 
    }

    timePeriodHandler(e) {
        const { timePeriod, timePeriodOptions } = this.page.analytics;
        const selectedTimeframe = e.value;
        let timeValue ='';
        const month = 1;
        const sixMonths = 6;
        const twelveMonths = 12;
        const allTime = 0;

        setSelectDropdownAnalytics(timePeriod, `${this.page.title} ${timePeriodOptions[selectedTimeframe -1]}`);

        switch (selectedTimeframe) {
            case 1:
                timeValue = month;
                break;

            case 2:
                timeValue = sixMonths;
                break;

            case 3:
                timeValue = twelveMonths;
                break;

            case 4:
                timeValue = allTime;
                break;
            default:
        }

        this.setState({
            noOfMonths: timeValue,
            activeTimePeriod: selectedTimeframe,
            currentPage:0
        },() => {
            const {noOfMonths, activeTabFilter} = this.state 
            this.retrieveData(noOfMonths, activeTabFilter);
        });
    }

    setNoResultsState = () => {
        this.setState({ 
            listItems: null,
            pageCount: 0,
            listCount: 0,
            currentPage: 0,
            noResults: true,
            loading: false,
        }); 
    }

    setResultsState = (quoteData) => {
        const {totalNumberOfResults = 0, quotes=[], numberOfPages, currentPage} = quoteData || {}
        this.setState({ 
            listItems: quotes,
            pageCount: numberOfPages,
            listCount: totalNumberOfResults,
            currentPage: currentPage,
            noResults: false,
            loading: false,
        });
    }

    getQueryParam = (fetchEndPoint,noOfMonths,activeTabFilter) =>{
      let url = fetchEndPoint;
      const {currentPage, pageSize} = this.state;
      const  userId = getUserId();
      const soldToId = getSoldToId() || getDummySoldToId();
      let queryParam = `userId=${userId}&soldToId=${soldToId}&currentPage=${currentPage}&pageSize=${pageSize}&fields=FULL`;
      if(activeTabFilter && activeTabFilter !== "ALL"){
        queryParam = `${queryParam}&state=${activeTabFilter}`;
      }
      if(noOfMonths){
        queryParam = `${queryParam}&duration=${noOfMonths}`;
      }
      return `${url}?${queryParam}`;
    }

    retrieveData = async (noOfMonths, activeTabFilter) => {
        const HistoryServiceObj = new HistoryService();
        let fetchEndPoint = this.props.configs.fetchEndPoint;
        fetchEndPoint = this.getQueryParam(fetchEndPoint,noOfMonths,activeTabFilter)
        const quoteData = await HistoryServiceObj.getQuoteHistory(fetchEndPoint);
        const {totalNumberOfResults = 0} = quoteData
        if(quoteData && totalNumberOfResults > 0){
            this.setResultsState(quoteData)
        } else {
            this.setNoResultsState()
        }

        !this.state.error && this.state.initialPageLoad && this.setAnalytics('load');
        this.setState({initialPageLoad: false});
    }

    renderTabs = () => {
        const {tabs = []} = this.props.configs || {};
        return (                     
            <Tabs className="cmp-search__categories-tabs"
                items={tabs}
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
                rows={this.state.pageSize}
                count={this.state.listCount}
                current={this.state.currentPage + 1}
                resultsText={this.props.configs.resultsText}
                noResultsText={this.props.configs.noResultsFoundTitle}
            />
        );
    }

    paginationClickHandler = (page) => {
        this.setState({ 
            currentPage: page.selected
        },() => {
            const {noOfMonths, activeTabFilter} = this.state 
            this.retrieveData(noOfMonths, activeTabFilter);
        }); 
        window.scroll(0,0);
    }

    renderPagination() {
        if (this.state.listCount > this.state.pageSize) {
            const previousIcon = (
                <ReactSVG src={this.paginationDefaults.previousIcon} />
            );
            const nextIcon = (
                <ReactSVG src={this.paginationDefaults.nextIcon} />
            );

            return (
                <ReactPaginate
                    pageCount={this.state.pageCount}
                    forcePage={this.state.currentPage}
                    pageRangeDisplayed={this.paginationDefaults.pageRangeDisplayed}
                    marginPagesDisplayed={this.paginationDefaults.marginPagesDisplayed}
                    containerClassName="paginate__container"
                    onPageChange={page => this.paginationClickHandler(page)}
                    breakLabel={'…'}
                    previousLabel={previousIcon}
                    nextLabel={nextIcon}
                    initialPage={this.state.currentPage}
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
        const {listCount,listItems, noResults, loading} = this.state;
        return (
            <>  
                {loading ? ( <Spinner loading={loading} /> ) : null}
                {!loading && (
                    <>   
                    {this.renderTabs()}
                        <div className="cmp-order-list__header clearfix" data-locator="order-list-header-clearfix">
                            {this.renderDropDowns()}
                            {this.renderCountHeader()}
                        </div>

                        {noResults && this.renderNoResults()}

                        {listCount > 0 && listItems.map((item, index) => (               
                            <QuoteListItem
                                data={item}
                                numberText={this.props.configs.numberText}
                                itemsText={this.props.configs.itemsText}
                                shipment={this.props.configs.shipment}
                                created={this.props.configs.created}
                                expires={this.props.configs.expires}
                                orderNumberText={this.props.configs.orderNumberText}
                                icons={this.props.configs.icons}
                                quoteAgainTitle={this.props.configs.quoteAgainTitle}
                                index={index}
                                isShowQuoteAgainButton={this.props.configs.isShowQuoteAgainButton}
								newQuote={this.props.configs.newQuote}
                            />
                        ))}
                        {listCount > 0 && this.renderPagination()}           
                    </>
                )}
            </>
        );
    }
}

QuoteHistory.propTypes = {
    configs: PropTypes.object.isRequired
};

export default QuoteHistory;