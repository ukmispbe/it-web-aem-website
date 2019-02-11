import React, { Component } from 'react';
import { SearchService } from './services/index';
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import ResultsCount from './components/results-count';
import Results from './components/results';

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

        this.setState({
            loading: true,
            results: {},
            pagination: {},
            rows: this.props.searchDefaults
                ? this.props.searchDefaults && this.props.searchDefaults.rows
                : 25,
        });
        this.performSearch();
    }

    componentWillReceiveProps() {
        this.performSearch();
    }

    performSearch() {
        const query = this.search.createQueryObject(
            parse(window.location.search)
        );

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
            newState.noResults = false;

            this.setState(Object.assign({}, this.state, newState));
        });
    }

    paginationClickHandler(page) {
        const state = this.state;
        const searchParams = this.state.searchParams || {};

        const newState = Object.assign({}, this.state, {
            pagination: {
                current: page.selected + 1,
            },
        });

        this.setState(newState);

        this.props.history.push(
            `?${this.search.getQueryParamString(
                {
                    keyword: state.query,
                    page: page.selected + 1,
                },
                searchParams.facets
            )}`
        );
    }

    render() {
        const state = this.state;
        const searchParams = this.state.searchParams || {};
        const results = (
            <div>
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

                <Results results={state.results[searchParams.page] || []} />

                <ReactPaginate
                    pageCount={state.pagination.amount}
                    pageRangeDisplayed={8}
                    marginPagesDisplayed={0}
                    containerClassName="paginate__container"
                    onPageChange={this.paginationClickHandler.bind(this)}
                />
            </div>
        );
        return (
            <div className="cmp-search__container">
                {state.loading ? 'Loading' : null}
                {!state.loading && state.noResults ? 'No Results' : results}
            </div>
        );
    }
}

export default withRouter(Search);
