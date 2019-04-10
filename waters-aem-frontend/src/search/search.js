import React, { Component, Fragment } from 'react';
import { SearchService } from './services/index';
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';

import ResultsCount from './components/results-count';
import Results from './components/results';
import NoResults from './components/no-results';

import Sort from './components/sort';
import Filter from './components/filter';
import FilterTags, {ContentTypeTags} from './components/filter-tags';
import BtnShowSortFilter from './components/btn-show-sort-filter';
import BtnHideSortFilter from './components/btn-hide-sort-filter';
import BtnApplySortFilter from './components/btn-apply-sort-filter';
import BtnDoneSortFilter from './components/btn-done-sort-filter';
import Spinner from './components/spinner';
import {ContentTypeMenu} from './components/content-type-menu';

class Search extends Component {
    constructor() {
        super();
        this.savedSelectFilterState = null;
    }

    componentWillMount() {
        this.search = new SearchService(
            this.props.searchDefaults,
            this.props.defaultFacet,
            this.props.searchServicePath
        );
        debugger;

        const query = this.search.getParamsFromString();
        this.query = query;

        if (
            (typeof this.query.keyword === 'undefined' ||
                this.query.keyword === '*:*') &&
            typeof this.query.sort === 'undefined'
        ) {
            this.query.sort = 'most-recent';
        } else {
            this.query.sort =
                typeof this.query.sort === 'undefined'
                    ? 'most-relevant'
                    : this.query.sort;
        }

        this.setState({
            loading: true,
            results: {},
            pagination: {
                current: this.query.page ? this.query.page : 1,
            },
            rows: this.props.searchDefaults
                ? this.props.searchDefaults && this.props.searchDefaults.rows
                : 25,
            sort: this.query.sort,
            selectedFacets: this.query.selectedFacets || {},
            unappliedFilters: {},
            isDesktop: false,
            initialRender: true,
            performedSearches: 0,
            contentType: (this.query.content_type) ? this.query.content_type : '',
            contentTypeSelected: (this.query.content_type) ? {value: 'Application Note', count: 89} : {},
            contentTypes: [],
            facets: []
        });

        const checkWindowWidth = () => {
            const newState = Object.assign({}, this.state);
            const desktop = window.matchMedia('screen and (min-width: 1200px)');
            newState.isDesktop = desktop.matches;

            this.setState(newState);
        };

        window.addEventListener('resize', checkWindowWidth);

        checkWindowWidth();
        this.performSearch();
    }

    componentWillReceiveProps() {
        if (this.state.initialRender != true) {
            this.performSearch();
        } else {
            this.setState({ initialRender: false });
        }
    }

    performSearch(q) {
        debugger;

        let query = q
            ? this.search.createQueryObject(q)
            : this.search.createQueryObject(parse(window.location.search));

        if (!query.sort && this.state) {
            query = Object.assign({}, query, { sort: this.state.sort });
        }

        const rows =
            this.props.searchDefaults && this.props.searchDefaults.rows
                ? this.props.searchDefaults.rows
                : 25;

        this.setState({ searchParams: query, loading: true, results: {} });
        debugger;

        if (this.isInitialLoad(query.content_type)) {
            this.search.initial(query).then(res => this.searchOnSuccess(query, rows, res));
        } else {
            this.search.contentType('applicationnotes', 'Application Note', query).then(res => this.searchOnSuccess(query, rows, res));
        }


    }

    isInitialLoad = (content_type) => (content_type) ? false : true;

    searchOnSuccess = (query, rows, res) => {
        const newState = Object.assign({}, this.state);

        newState.loading = false;
        newState.rows = rows;
        newState.count = res.num_found;
        newState.query = query.keyword;
        newState.results = newState.results || {};
        newState.results[query.page] = res.documents;
        newState.noQuery = query.keyword ? false : true;
        newState.sort = this.state.sort;
        newState.performedSearches = this.state.performedSearches + 1;
        newState.initialRender = false;

        newState.pagination = {
            current: query.page,
            amount: Math.ceil(res.num_found / rows),
        };
        
        newState.noResults = !newState.results[query.page].length;

        debugger;

        if (this.isInitialLoad(this.state.contentType)) {
            newState.contentTypes = res.facets.contenttype_facet;
        } else {
            newState.facets = res.facets;
        }

        this.setState(Object.assign({}, this.state, newState));

        const scrollToPosition = window.sessionStorage.getItem(
            'waters.previousPagePosition'
        );

        const previousPagePosition = window.sessionStorage.getItem(
            'waters.previousPaginationClick'
        );

        if (scrollToPosition) {
            window.scrollTo(0, scrollToPosition);
            window.sessionStorage.removeItem('waters.previousPagePosition');
        } else if (
            this.props.history &&
            this.props.history.action === 'POP' &&
            previousPagePosition &&
            previousPagePosition !== 'NaN'
        ) {
            setTimeout(() => {
                window.scrollTo(0, previousPagePosition);
                window.sessionStorage.removeItem(
                    'waters.previousPaginationClick'
                );
            }, 0);
        } else if (!scrollToPosition && previousPagePosition) {
            window.scrollTo(0, 0);
        } else {
            const reactAppTop =
                this.refs.main.getBoundingClientRect().top - 72;

            if (newState.performedSearches > 1) {
                window.scrollTo(0, reactAppTop);
            }
        }
    }

    pushToHistory(query, facets) {
        this.props.history.push(
            `?${this.search.getQueryParamString(query, facets)}`
        );
    }

    paginationClickHandler(page, e) {
        const state = this.state;
        const searchParams = this.state.searchParams || {};

        const newState = Object.assign({}, this.state, {
            pagination: {
                amount: state.pagination.amount,
                current: page.selected + 1,
            },
        });

        const scrolled =
            (window.pageYOffset || window.document.scrollTop) -
            (window.document.clientTop || 0);

        this.setState(newState);

        this.pushToHistory(
            {
                keyword: searchParams.keyword,
                page: page.selected + 1,
                sort: searchParams.sort,
            },
            searchParams.facets
        );

        if (e === 'clicked') {
            window.sessionStorage.setItem(
                'waters.previousPaginationClick',
                scrolled
            );
        }
    }

    sortHandler(e) {
        const sortOption =
            parseInt(e.target.value) === 1 ? 'most-relevant' : 'most-recent';
        const state = this.state;

        this.setState(Object.assign({}, state, { sort: sortOption }));

        this.pushToHistory(
            {
                keyword: state.query,
                page: 1,
                sort: sortOption,
            },
            state.selectedFacets
        );
    }

    filterSelectHandler(facet, categoryId, e) {
        debugger;

        const isChecked = e.target.checked;
        const newState = Object.assign({}, this.state);
        if (isChecked) {
            if (!newState.selectedFacets[`${categoryId}`]) {
                newState.selectedFacets[`${categoryId}`] = [];
            }
            newState.selectedFacets[`${categoryId}`].push(facet);
        } else {
            const filteredArr = newState.selectedFacets[`${categoryId}`].filter(
                (f, index) => {
                    if (f === facet) {
                        return false;
                    } else {
                        return true;
                    }
                }
            );

            newState.selectedFacets[`${categoryId}`] = filteredArr;
        }
        newState.searchParams.page = 1;

        this.setState(newState);

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    }

    clearTag() {
        const newState = Object.assign({}, this.state);
        newState.selectedFacets = {};
        newState.searchParams.page = 1;
        this.setState(newState);

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    }

    removeTag(tag) {
        const newState = Object.assign({}, this.state);
        const filteredArr = newState.selectedFacets[`${tag.categoryId}`].filter(
            (f, index) => {
                if (f === tag.facet) {
                    return false;
                } else {
                    return true;
                }
            }
        );

        newState.selectedFacets[`${tag.categoryId}`] = filteredArr;
        newState.searchParams.page = 1;
        this.setState(newState);

        this.pushToHistory(this.state.searchParams, this.state.selectedFacets);
    }

    applyFilters() {
        document.body.classList.remove('show-sort-filters');
        document.body.classList.remove('filter-active');

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 1000);

        this.clearUnappliedFilters();
    }

    clearUnappliedFilters() {
        this.setState({
            savedState: {},
        });
    }

    resetToSavedState() {
        var savedState = this.state.savedState;
        savedState.selectedFacets = JSON.parse(this.savedSelectFilterState);
        this.setState(Object.assign({}, savedState));
    }

    collapseFilters() {
        var fitlers = document.querySelectorAll('.cmp-search-filters__filter');
        [].forEach.call(fitlers, function(el) {
            el.classList.remove('expanded');
        });
    }

    setupFilters() {
        if (!this.state.isDesktop) {
            const state = Object.assign({}, this.state);
            this.savedSelectFilterState = JSON.stringify(state.selectedFacets);
            this.setState({
                savedState: state,
            });
        }
    }

    handleContentTypeItemClick = (item) => {
        console.warn(item);
    }

    handleContentTypeTagRemoval = () => {
        let query = this.search.createQueryObject(parse(window.location.search));
        
        delete query.content_type;

        query.page = 1;

        this.setState({searchParams: query, selectedFacets: {}, contentType: '', contentTypeSelected: {}});

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    }

    getContentMenuOrFilter = (filterTags) => {
        if (this.isInitialLoad(this.state.contentType)) {
            return <ContentTypeMenu
                        items={this.state.contentTypes}
                        click={this.handleContentTypeItemClick} />
        } else {
            return <Filter
                        facets={this.state.facets}
                        text={this.props.searchText}
                        filterMap={this.props.filterMap}
                        defaultFacet={this.props.defaultFacet}
                        selectHandler={this.filterSelectHandler.bind(this)}
                        selectedFacets={this.state.selectedFacets}
                        filterTags={filterTags}
                    />
        }
    }

    render() {
        const state = this.state;
        const searchParams = this.state.searchParams || {};
        const overlay = <div className="overlay" />;
        const filterTags = (
            <ContentTypeTags 
                text={this.props.searchText} 
                selected={this.state.contentTypeSelected} 
                remove={this.handleContentTypeTagRemoval} />
        );

        const aside = (
            <div className="container__left cmp-search__sort-filter">
                <BtnHideSortFilter
                    text={this.props.searchText}
                    resetToSavedState={this.resetToSavedState.bind(this)}
                    collapseFilters={this.collapseFilters}
                />

                <BtnApplySortFilter
                    text={this.props.searchText}
                    applyFilters={this.applyFilters.bind(this)}
                />

                <BtnDoneSortFilter
                    text={this.props.searchText}
                    collapseFilters={this.collapseFilters}
                />

                <div className="cmp-search__sort-filter__container">
                    <Sort
                        sortHandler={this.sortHandler.bind(this)}
                        sortValue={
                            state.unappliedFilters &&
                            state.unappliedFilters.sort
                                ? state.unappliedFilters.sort === 'most-recent'
                                    ? 2
                                    : 1
                                : state.sort === 'most-recent'
                                ? 2
                                : 1
                        }
                        text={this.props.searchText}
                    />

                    
                    {this.getContentMenuOrFilter(filterTags)}
                </div>
            </div>
        );
        const locale = this.props.searchLocale;
        const previousIcon = (
            <ReactSVG src={this.props.searchText.previousIcon} />
        );

        const results = (
            <div className="cmp-search__container">
                <div className="cmp-search__container__header cleafix">
                    <ResultsCount
                        rows={state.rows}
                        count={state.count}
                        query={state.query}
                        current={
                            state.pagination && state.pagination.current
                                ? state.pagination.current
                                : 1
                        }
                        noQuery={state.noQuery}
                    />

                    <BtnShowSortFilter
                        text={this.props.searchText}
                        setupFilters={this.setupFilters.bind(this)}
                        resetToSavedState={this.resetToSavedState.bind(this)}
                        collapseFilters={this.collapseFilters}
                    />
                </div>

                {filterTags}

                <div className="cmp-search__sorted-by">
                    {this.props.searchText.sortedBy}:{' '}
                    {this.state.sort === 'most-relevant'
                        ? this.props.searchText.sortByBestMatch
                        : this.props.searchText.sortByMostRecent}
                </div>

                <Results
                    results={state.results[searchParams.page] || []}
                    locale={locale}
                />

                {state.count > this.props.searchDefaults.rows ? (
                    <ReactPaginate
                        pageCount={state.pagination.amount}
                        forcePage={
                            state.pagination.current
                                ? state.pagination.current - 1
                                : 0
                        }
                        pageRangeDisplayed={8}
                        marginPagesDisplayed={0}
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
                            <ReactSVG src={this.props.searchText.nextIcon} />
                        }
                        initialPage={
                            state.pagination.current
                                ? state.pagination.current - 1
                                : 0
                        }
                        disableInitialCallback={true}
                    />
                ) : null}
            </div>
        );
        return (
            <div ref="main">
                {overlay}
                {!state.loading && state.noResults ? null : aside}
                {state.loading ? <Spinner loading={state.loading} /> : null}
                {!state.loading && state.noResults ? (
                    <NoResults
                        searchText={this.props.searchText}
                        query={state.query}
                    />
                ) : (
                    results
                )}
            </div>
        );
    }
}

export default withRouter(Search);
