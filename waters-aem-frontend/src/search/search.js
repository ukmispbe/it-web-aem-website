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
import FilterTags from './components/filter-tags';
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

        // const selectedFacets = query.

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
            selectedFacets: {},
            unappliedFilters: {},
            isDesktop: false,
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
            newState.facets = res.facets;

            this.setState(Object.assign({}, this.state, newState));
        });
    }

    pushToHistory(query, facets) {
        this.props.history.push(`?
            ${this.search.getQueryParamString(query, facets)}
        `);
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

        this.pushToHistory(
            {
                keyword: searchParams.keyword,
                page: page.selected + 1,
                sort: searchParams.sort,
            },
            searchParams.facets
        );

        window.scrollTo(0, 0);
    }

    sortHandler(e) {
        const sortOption =
            parseInt(e.target.value) === 1 ? 'most-relevant' : 'most-recent';
        const state = this.state;
        const searchParams = this.state.searchParams || {};

        if (state.isDesktop) {
            this.setState(Object.assign({}, state, { sort: sortOption }));

            this.pushToHistory(
                {
                    keyword: state.query,
                    page: 1,
                    sort: sortOption,
                },
                searchParams.facets
            );
        } else {
            const newState = Object.assign({}, state);
            newState.unappliedFilters.sort = sortOption;
            this.setState(newState);
        }
    }

    filterSelectHandler(facet, categoryId, category, e) {
        const state = this.state;
        const isChecked = e.target.checked;

        if (state.isDesktop) {
            const newState = Object.assign({}, this.state);
            if (isChecked) {
                if (!newState.selectedFacets[`${categoryId}`]) {
                    newState.selectedFacets[`${categoryId}`] = [];
                }
                newState.selectedFacets[`${categoryId}`].push({
                    facet,
                    categoryId,
                    category,
                    index: newState.selectedFacets[`${categoryId}`].length,
                });
            } else {
                const filteredArr = newState.selectedFacets[
                    `${categoryId}`
                ].filter((f, index) => {
                    if (f.facet === facet) {
                        return false;
                    } else {
                        return true;
                    }
                });

                newState.selectedFacets[`${categoryId}`] = filteredArr;
            }

            this.setState(newState);
            setTimeout(
                () =>
                    this.pushToHistory(
                        this.state.searchParams,
                        this.state.selectedFacets
                    ),
                0
            );
        } else {
            const unappliedState = Object.assign({}, this.state);
            if (isChecked) {
                if (
                    !unappliedState.unappliedFilters.selectedFacets[
                        `${categoryId}`
                    ]
                ) {
                    unappliedState.unappliedFilters.selectedFacets[
                        `${categoryId}`
                    ] = [];
                }
                unappliedState.unappliedFilters.selectedFacets[
                    `${categoryId}`
                ].push({
                    facet,
                    categoryId,
                    category,
                    index:
                        unappliedState.unappliedFilters.selectedFacets[
                            `${categoryId}`
                        ].length,
                });
            } else {
                const filteredArr = unappliedState.unappliedFilters.selectedFacets[
                    `${categoryId}`
                ].filter((f, index) => {
                    if (f.facet === facet) {
                        return false;
                    } else {
                        return true;
                    }
                });

                unappliedState.unappliedFilters.selectedFacets[
                    `${categoryId}`
                ] = filteredArr;
            }

            this.setState(unappliedState);
        }
    }

    clearTag() {
        if (this.state.isDesktop) {
            const newState = Object.assign({}, this.state);
            newState.selectedFacets = {};
            this.setState(newState);

            setTimeout(
                () =>
                    this.pushToHistory(
                        this.state.searchParams,
                        this.state.selectedFacets
                    ),
                0
            );
        } else {
            const unappliedState = Object.assign({}, this.state);
            unappliedState.unappliedFilters.selectedFacets = {};
            this.setState(unappliedState);
        }
    }

    removeTag(tag) {
        if (this.state.isDesktop) {
            const newState = Object.assign({}, this.state);
            const filteredArr = newState.selectedFacets[
                `${tag.categoryId}`
            ].filter((f, index) => {
                if (f.facet === tag.facet) {
                    return false;
                } else {
                    return true;
                }
            });

            newState.selectedFacets[`${tag.categoryId}`] = filteredArr;

            this.setState(newState);

            this.pushToHistory(
                this.state.searchParams,
                this.state.selectedFacets
            );
        } else {
            const unappliedState = Object.assign({}, this.state);
            const filteredArr = unappliedState.unappliedFilters.selectedFacets[
                `${tag.categoryId}`
            ].filter((f, index) => {
                if (f.facet === tag.facet) {
                    return false;
                } else {
                    return true;
                }
            });

            unappliedState.unappliedFilters.selectedFacets[
                `${tag.categoryId}`
            ] = filteredArr;
            this.setState(unappliedState);
        }
    }

    applyFilters() {
        document.body.classList.remove('show-sort-filters');
        document.body.classList.remove('filter-active');
        this.setState(
            Object.assign({}, this.state, {
                sort: this.state.unappliedFilters.sort,
                selectedFacets: this.state.unappliedFilters.selectedFacets,
                unappliedFilters: {},
            })
        );

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    }

    clearUnappliedFilters() {
        this.setState(
            Object.assign({}, this.state, {
                unappliedFilters: {},
            })
        );
    }

    setupFilters() {
        if (!this.state.isDesktop) {
            this.setState(
                Object.assign({}, this.state, {
                    unappliedFilters: {
                        selectedFacets: Object.assign(
                            {},
                            this.state.selectedFacets
                        ),
                    },
                })
            );
        }
    }

    render() {
        const state = this.state;
        const searchParams = this.state.searchParams || {};
        const overlay = <div className="overlay" />;
        const filterTags = (
            <FilterTags
                text={this.props.searchText}
                selectedFacets={
                    state.unappliedFilters &&
                    state.unappliedFilters.selectedFacets
                        ? state.unappliedFilters.selectedFacets
                        : state.selectedFacets
                }
                clearTag={this.clearTag.bind(this)}
                removeTag={this.removeTag.bind(this)}
            />
        );

        const aside = (
            <div className="container__left cmp-search__sort-filter">
                <BtnHideSortFilter
                    text={this.props.searchText}
                    clearUnappliedFilters={this.clearUnappliedFilters.bind(
                        this
                    )}
                />

                <BtnApplySortFilter
                    applyFilters={this.applyFilters.bind(this)}
                />

                <BtnDoneSortFilter />

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

                    <Filter
                        facets={state.facets}
                        text={this.props.searchText}
                        filterMap={this.props.filterMap}
                        defaultFacet={this.props.defaultFacet}
                        selectHandler={this.filterSelectHandler.bind(this)}
                        selectedFacets={
                            state.unappliedFilters &&
                            state.unappliedFilters.selectedFacets
                                ? state.unappliedFilters.selectedFacets
                                : state.selectedFacets
                        }
                        filterTags={filterTags}
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
                    />
                </div>

                {filterTags}

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
                {overlay}
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
