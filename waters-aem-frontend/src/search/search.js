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
import BtnShowSortFilter from './components/btn-show-sort-filter';
import BtnHideSortFilter from './components/btn-hide-sort-filter';
import BtnApplySortFilter from './components/btn-apply-sort-filter';
import BtnDoneSortFilter from './components/btn-done-sort-filter';

class Search extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.search = new SearchService(
            this.props.searchDefaults,
            this.props.defaultFacet,
            this.props.searchServicePath
        );

        const query = this.search.getParamsFromString();
        this.query = query;

        this.setState({
            loading: true,
            results: {},
            pagination: {
                current: this.query.page ? this.query.page : 1,
            },
            rows: this.props.searchDefaults
                ? this.props.searchDefaults && this.props.searchDefaults.rows
                : 25,
            sort: this.query.sort ? this.query.sort : 'most-relevant',
        });

        this.performSearch();
    }

    componentWillReceiveProps() {
        this.performSearch();
    }

    performSearch(q) {
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

        this.search.call(query).then(res => {
            const newState = Object.assign({}, this.state);

            newState.loading = false;
            newState.rows = rows;
            newState.count = res.num_found;
            newState.query = query.keyword;
            newState.results = newState.results || {};
            newState.results[query.page] = res.documents;
            newState.noQuery = query.keyword ? false : true;
            newState.pagination = {
                current: query.page,
                amount: Math.ceil(res.num_found / rows),
            };
            newState.noResults = !newState.results[query.page].length;

            this.setState(Object.assign({}, this.state, newState));
        });
    }

    paginationClickHandler(page) {
        const state = this.state;
        const searchParams = this.state.searchParams || {};

        const newState = Object.assign({}, this.state, {
            pagination: {
                amount: state.pagination.amount,
                current: page.selected + 1,
            },
        });

        this.setState(newState);

        this.props.history.push(
            `?${this.search.getQueryParamString(
                {
                    keyword: searchParams.keyword,
                    page: page.selected + 1,
                },
                searchParams.facets
            )}`
        );

        window.scrollTo(0, 0);
    }

    sortHandler(e) {
        console.log('handler');
        const sortOption =
            parseInt(e.target.value) === 1 ? 'most-relevant' : 'most-recent';
        const state = this.state;
        const searchParams = this.state.searchParams || {};

        this.setState(Object.assign({}, state, { sort: sortOption }));

        document.body.classList.remove('show-sort-filters');

        const qString = `?${this.search.getQueryParamString(
            {
                keyword: state.query,
                page: 1,
                sort: sortOption,
            },
            searchParams.facets
        )}`;

        this.props.history.push(qString);
    }

    render() {
        const state = this.state;
        const searchParams = this.state.searchParams || {};
        const overlay = <div class="overlay" />;
        const aside = (
            <div className="container__left cmp-search__sort-filter">
                <BtnHideSortFilter
                    text={this.props.searchText}
                />

                <BtnApplySortFilter />

                <BtnDoneSortFilter />

                <div className="cmp-search__sort-filter__container">
                    <Sort
                        sortHandler={this.sortHandler.bind(this)}
                        sortValue={state.sort === 'most-recent' ? 2 : 1}
                        text={this.props.searchText}
                    />

                    <Filter
                        text={this.props.searchText}
                    />
                </div>
            </div>
        );
        const locale = this.props.searchLocale;
        const previousIcon = (
            <ReactSVG src={this.props.searchText.previousIcon} />
        );
        const results = (
            <div className="cmp-search__container">
                <BtnShowSortFilter />

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

                <Results
                    results={state.results[searchParams.page] || []}
                    locale={locale}
                />

                <ReactPaginate
                    pageCount={state.pagination.amount}
                    pageRangeDisplayed={8}
                    marginPagesDisplayed={0}
                    containerClassName="paginate__container"
                    onPageChange={this.paginationClickHandler.bind(this)}
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
                />
            </div>
        );
        return (
            <div>
                {!state.loading && state.noResults ? null : aside}
                {state.loading ? 'Loading' : null}
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
