import React, { Component } from 'react';
import { parameterValues, parameterDefaults, searchMapper } from './services/index';
import { parse, stringify } from 'query-string';
import { withRouter } from 'react-router-dom';
import NoResults from './components/no-results';
import validator from 'validator';
import domElements from '../scripts/domElements';
import screenSizes from '../scripts/screenSizes';
import Analytics, { analyticTypes } from '../analytics';
import Loading from './components/loading';
import SearchComponent from './search.component';

const SEARCH_TYPES = {
    INITIAL: 'initial',
    CATEGORY_ONLY: 'category only',
    CONTENT_TYPE: 'content type',
    SUB_FACETS: 'sub facets'
}


class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.savedSelectFilterState = null;
        this.parentCategory = 'contenttype_facet';

        this.search = props.search;
        this.search.throwError = this.props.setErrorBoundaryToTrue;
        this.state = this.initialState();
    }

    componentDidMount() {
        this.addHistoryListener();
        this.addResizeListener();

        const facetGroupsSelectedOrder = this.parseFacetsFromUrlToArray();
        const sessionStore = this.search.getSessionStore();
        this.setState({tabHistory: sessionStore.searchTabHistory, facetGroupsSelectedOrder}, () => {
            this.performSearch();
        });
    }

    parseFacetsFromUrlToArray = () => this.search.mapFacetGroupsToArray(parse(location.search).facet);

    addHistoryListener = () => {
        this.props.history.listen((location, action) => {
            const facetGroupsSelectedOrder = this.parseFacetsFromUrlToArray();
            this.setState({facetGroupsSelectedOrder});

            const query = this.getQueryObject(parse(location.search));
            if (action === 'POP') {
                this.handleHistoryPop(query);
            } else if (action === 'PUSH') {
                this.handleHistoryPush(query);
            }
        });
    }

    addResizeListener = () => {
        const checkWindowWidth = () => {
            const newState = Object.assign({}, this.state);
            const desktop = window.matchMedia('screen and (min-width: 1200px)');
            newState.isDesktop = desktop.matches;

            this.setState(newState);
        };

        window.addEventListener('resize', checkWindowWidth);

        checkWindowWidth();
    }

    initialState = () => {
        const query = this.search.getParamsFromString();
        this.query = query;

        if (
            (typeof this.query.keyword === parameterValues.undefined ||
                this.query.keyword === parameterDefaults.keyword) &&
            typeof this.query.sort === parameterValues.undefined
        ) {
            this.query.sort = parameterValues.sort.mostRecent;
        } else {
            this.query.sort =
                typeof this.query.sort === parameterValues.undefined
                    ? parameterValues.sort.mostRelevant
                    : this.query.sort;
        }

        const category = this.query.category ? this.query.category : '';

        const contentType = this.query.content_type
            ? this.query.content_type
            : null;

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            contentType
        );

        const contentTypeSelected = contentTypeElement
            ? contentTypeElement
            : {};

        let skuConfig = JSON.parse(
            document.getElementById('commerce-configs-json').innerHTML
        );

        skuConfig.showBreadcrumbs = true;
        skuConfig.baseSignInUrl = this.props.baseSignInUrl;

        return {
            forceCollapseFilters: true,
            loading: true,
            searchParams: {},
            results: {},
            pagination: {
                current: this.query.page
                    ? this.query.page
                    : parameterDefaults.page,
            },
            rows: this.props.searchDefaults
                ? this.props.searchDefaults && this.props.searchDefaults.rows
                : parameterDefaults.rows,
            sort: this.query.sort ? this.query.sort : parameterDefaults.sort,
            selectedFacets: this.query.selectedFacets || {},
            unappliedFilters: {},
            isDesktop: false,
            isSkuList: false,
            initialRender: true,
            performedSearches: 0,
            category,
            contentType,
            contentTypeSelected,
            skuConfig,
            facets: [],
            filterMap: [],
            keyword: this.query.keyword
                ? this.query.keyword
                : parameterDefaults.keyword,
            spell_check: false,
            spell_related_suggestions: [],
            spell_suggestion: '',
            erroredOut: false,
            categoryTabs: [],
            activeTabIndex: -1,
            tabHistory: {},
            facetGroupsSelectedOrder: [],
            collapseAllFilters: false,
            activeFilterIndex: -1,
            count: 0
        };
    }

    handleHistoryPush = query => {
        const categoryIndex = this.state.categoryTabs.findIndex(
            category => category.name === query.category
        );

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type
        );

        this.setState({
            activeTabIndex: categoryIndex,
            category: query.category,
            sort: query.sort,
            contentType: query.content_type,
            contentTypeSelected: Object.assign({}, contentTypeElement),
            selectedFacets: Object.entries(query.facets).length === 0 ? {} : Object.assign({}, query.facets),
        }, async () => {
            await this.performSearch(query);
        });
    }

    isSkuList = category =>  {
        const categoryKey = this.findFacetNameProperty(this.props.filterMap, category);

        return validator.equals(categoryKey, 'shop');
    }

    handleHistoryPop = query => {
        const categoryIndex = this.state.categoryTabs.findIndex(
            category => category.name === query.category
        );

        if (this.state.activeTabIndex !== categoryIndex) {
            this.setCategorySelected(categoryIndex, query, query.category);
        } else {
            const contentTypeElement = this.findContentType(
                this.props.filterMap,
                query.content_type
            );

            this.setState({
                category: query.category,
                sort: query.sort,
                contentType: query.content_type,
                contentTypeSelected: Object.assign({}, contentTypeElement),
                selectedFacets: Object.entries(query.facets).length === 0 ? {} : Object.assign({}, query.facets)
            }, async () => {
                await this.performSearch(query);
            });
        }
    }

    findFacetNameProperty = (filterMap, searchValue) => {
        if (!filterMap || !Array.isArray(filterMap)) {
            return "";
        }

        const facet = filterMap.find(item => item.categoryFacetValue === searchValue);

        if (!facet) {
            return "";
        }

        return facet.categoryFacetName.replace('_facet', '');
    }

    findFacetTranslationProperty = (filterMap, searchValue) => {
        if (!filterMap || !Array.isArray(filterMap)) {
            return "";
        }

        const facet = filterMap.find(item => item.categoryFacetValue === searchValue);

        if (!facet) {
            return "";
        }

        return facet.categoryFacetTranslation;
    }

    mapCategories = categories =>
        !categories || !categories.facets || !categories.facets.category_facet
            ? []
            : categories.facets.category_facet
                  .filter(category => category.value !== 0)
                  .map(category => {
                      return {
                          translation: this.findFacetTranslationProperty(this.props.filterMap, category.value),
                          name: category.value,
                          count: category.count
                        };
                  });

    findMaxCategory = categories => {
        if (!categories) {
            return -1;
        }

        const counts = categories.map(category => category.count);
        const maxCount = Math.max(...counts);

        return categories.findIndex(category => category.count === maxCount);
    };

    getQueryObject = q =>
        q
            ? this.search.createQueryObject(q)
            : this.search.createQueryObject(parse(window.location.search));

    buildSearchParams = q => {
        let query = (q && Object.entries(q).length !== 0) ? {...q} : this.getQueryObject();

        if (!query.sort && this.state) {
            query = Object.assign({}, query, { sort: this.state.sort });
        }

        return query;
    }

    calcRows = () => this.props.searchDefaults && this.props.searchDefaults.rows
        ? this.props.searchDefaults.rows
        : parameterDefaults.rows;

    async performSearch(q) {
        // continue setting up the search
        const query = this.buildSearchParams(q);
        const rows = this.calcRows();

        // update the component's state with pre-search values
        this.setState({ searchParams: query, loading: true, results: {}, filterMap: {}});

        // fetch categories only once on the initial rendering
        // store category tabs in the component's state
        if (this.state.initialRender) {
            const categories = await this.search.getCategories({
                keyword: query.keyword,
            });

            // find the categories that have results
            const categoriesWithData = this.mapCategories(categories);

            // execute the search after the category tabs has been saved in the component's state
            this.setState({ categoryTabs: categoriesWithData, initialRender: false }, () => this.executeSearch(query, rows));
        } else {
            // execute the search because the category tabs have already been saved in the component's state
            this.executeSearch(query, rows);
        }
    }

    persistTabHistory = query => {
        const tabHistory = this.createTabHistoryEntryForCurrentTab(query);

        this.search.setStorageForTabHistory(tabHistory);
    }

    executeSearch = (query, rows) => {
        const searchType = this.getSearchType(query);

        if (searchType === SEARCH_TYPES.INITIAL) {
            this.executeInitialSearch(query);
            return;
        }

        this.setStateForActiveCategory(query);

        this.persistTabHistory(query);

        switch (searchType) {
            case SEARCH_TYPES.CATEGORY_ONLY:
                this.executeSearchByCategoryOnly(query, rows);
                break;

            case SEARCH_TYPES.CONTENT_TYPE:
                this.executeSearchByContentType(query, rows);
                break;

            case SEARCH_TYPES.SUB_FACETS:
                this.executeSearchBySubFacets(query, rows);
                break;
        }
    }

    getSearchType = query => {
        if (!query.category) {
            return SEARCH_TYPES.INITIAL;
        }

        if (this.isCategoryOnlySelected(query.category, query.content_type)) {
            return SEARCH_TYPES.CATEGORY_ONLY;
        }

        if (query.content_type && !this.isFacetsSelected(query.facets)) {
            return SEARCH_TYPES.CONTENT_TYPE;
        }

        if (query.content_type && this.isFacetsSelected(query.facets)) {
            return SEARCH_TYPES.SUB_FACETS;
        }

        // return a default value for defensive programming
        return SEARCH_TYPES.INITIAL;
    }

    executeInitialSearch = query => {
        const maxCategory = this.findMaxCategory(this.state.categoryTabs);

        if (maxCategory === -1) {
            this.setEmptyResults();
            return;
        }

        const categoryName = this.state.categoryTabs[maxCategory].name;

        this.setState({ activeTabIndex: maxCategory, category: categoryName });

        query.category = categoryName;

        this.pushToHistory(query, this.state.selectedFacets);
    }

    setStateForActiveCategory = query => {
        const categoryIndex = this.state.categoryTabs.findIndex(
            category => category.name === query.category
        );

        const categoryName = categoryIndex !== -1 ? this.state.categoryTabs[categoryIndex].name : '';

        this.setState({ activeTabIndex: categoryIndex, category: categoryName });
    }

    executeSearchByCategoryOnly = (query, rows) => {
        // deselects content type when user clicks the back button on browser
        this.setState({
            category: query.category,
            contentType: null,
            contentTypeSelected: {},
        });

        if (!this.props.hasError) {
            this.search.getResultsByCategory(query).then(res => {
                if (res && !this.props.hasError) {
                    this.searchOnSuccess(query, rows, res, true);
                } else {
                    this.search
                        .getResultsByCategory(query)
                        .then(results => {
                            if (!results) {
                                this.setState({
                                    loading: false,
                                    erroredOut: true,
                                });
                            } else {
                                const newQuery = Object.assign({}, query, {
                                    keyword: '',
                                });
                                this.searchOnSuccess(
                                    newQuery,
                                    rows,
                                    results,
                                    true
                                );
                            }
                        });
                }
            });
        }
    }

    executeSearchByContentType = (query, rows) => {
        // no sub-facets have been selected, only the content type has been selected
        const contentTypeValue = this.getSelectedContentTypeValue();

        this.search
            .getContentType(query.content_type, contentTypeValue, query)
            .then(res =>
                this.searchOnSuccess(query, rows, res, false, 'success')
            )
            .catch(error => this.searchOnError(error));
    }

    executeSearchBySubFacets = (query, rows) => {
        // sub-facets have been selected
        const contentTypeName = this.getSelectedContentTypeName();

        const contentTypeValue = this.getSelectedContentTypeValue();

        this.search
            .getSubFacet(contentTypeName, contentTypeValue, query)
            .then(res =>
                this.searchOnSuccess(query, rows, res, false, 'success')
            )
            .catch(error => this.searchOnError(error));
    }

    findContentType = (items, content_type) =>
        items.find(
            element => element.categoryFacetName === `${content_type}_facet`
        );

    isCategoryOnlySelected = (category, content_type) =>
        category && !content_type ? true : false;

    isFacetsSelected = selectedFacets =>
        Object.entries(selectedFacets).length !== 0 ? true : false;

    getFilterMap = (authoredTags, backendFacets) => {
        const categoryFacetName = `${this.state.category.toLowerCase()}_facet`;
        const category = authoredTags.find(authoredItem => authoredItem.categoryFacetName === categoryFacetName);

        if (!category) {
            return;
        }

        const orderedFacets = category.orderedFacets.filter(facet =>
            backendFacets.find(beFacet => beFacet.value === facet.facetValue)
        );

        const orderedFacetsWithCount = orderedFacets.map(facet => {
            const authTag = authoredTags.find(
                authoredItem =>
                    facet.facetValue === authoredItem.categoryFacetValue
            );
            const beFacet = backendFacets.find(
                beFacet => beFacet.value === facet.facetValue
            );

            return {
                ...facet,
                orderedFacets: authTag ? authTag.orderedFacets : [],
                count: beFacet ? beFacet.count : 0,
            };
        });

        return {
            categoryFacetName: category.categoryFacetName,
            categoryFacetValue: category.categoryFacetValue,
            orderedFacets: orderedFacetsWithCount,
        };
    };

    searchOnSuccess = (query, rows, res, initCategories = false) => {
        const newState = Object.assign({}, this.state);

        newState.filterMap =
            res.num_found !== 0
                ? Object.assign({}, this.getFilterMap(
                      this.props.filterMap,
                      res.facets[this.parentCategory]
                  ))
                : [];

        newState.loading = false;
        newState.rows = rows;
        newState.count = parseInt(res.num_found);
        newState.query = query.keyword;
        newState.results = newState.results || {};
        newState.results[query.page] = res.num_found !== 0 ? res.documents : [];
        newState.noQuery = query.keyword ? false : true;
        newState.sort = this.state.sort;
        newState.performedSearches = this.state.performedSearches + 1;
        newState.initialRender = false;
        newState.erroredOut = false;

        newState.pagination = {
            current: query.page,
            amount: Math.ceil(res.num_found / rows),
        };

        newState.noResults = !newState.results[query.page].length;

        newState.facets = res.facets;
        if ("activeIndex" in this.state) {
            newState.facets['activeIndex'] = this.state.activeIndex;
            newState.activeFilterIndex = this.getActiveFilterIndex(this.state.contentType, newState.filterMap, newState.facets, this.state.activeIndex);
        } else {
            newState.facets['activeIndex'] = "";
        }

        newState.spell_check = res.hasOwnProperty('spell_check')
            ? res.spell_check
            : false;
        newState.spell_related_suggestions = res.hasOwnProperty(
            'spell_related_suggestions'
        )
            ? res.spell_related_suggestions
            : [];
        newState.spell_suggestion = res.hasOwnProperty('spell_suggestion')
            ? res.spell_suggestion
            : '';

        newState.isSkuList = this.isSkuList(query.category);

        this.setState(Object.assign({}, this.state, newState), () => {
            // collapse all facet groups when flag is true and the device is tablet or mobile
            if (this.state.forceCollapseFilters) {
                if (screenSizes.isTabletAndUnder()) {
                    this.collapseFilters();
                }

                // reset flag to false
                this.setState({forceCollapseFilters: false});
            }
        });

        const sessionStore = this.search.getSessionStore();

        const scrollToPosition = sessionStore.previousPagePosition;

        const previousPagePosition = sessionStore.previousPaginationClick;

        if (scrollToPosition) {
            this.search.scrollToPosition(scrollToPosition);
        } else if (
            this.props.history &&
            this.props.history.action === 'POP' &&
            previousPagePosition &&
            previousPagePosition !== 'NaN' &&
            this.props.resetToDefault &&
            this.props.resetToDefault === false
        ) {
            setTimeout(() => {
                this.search.scrollToPosition(previousPagePosition);
            }, 0);
        } else if (!scrollToPosition && previousPagePosition) {
            this.search.scrollToTop();
        } else {
            if (newState.performedSearches > 1) {
                this.search.scrollToTop();
            }
        }

        this.submitAnalytics({ ... this.state.searchParams, total: res.num_found });
    };

    submitAnalytics = data => Analytics.setAnalytics(analyticTypes.search.name, data);

    getActiveFilterIndex = (contentType, filterMap, facets, facetName) => {
        const mappings = searchMapper.mapFacetGroups(contentType, filterMap, facets);
        const activeFilterIndex = (mappings && Array.isArray(mappings))
            ? mappings.findIndex(item => item.name === facetName)
            : this.state.activeFilterIndex;

        if (this.state.activeFilterIndex !== activeFilterIndex) {
            return activeFilterIndex;
        }

        return this.state.activeFilterIndex;
    }

    searchOnError = error => {
        this.setEmptyResults();
    };

    setEmptyResults = () => {
        const newState = Object.assign({}, this.state);

        newState.loading = false;
        newState.rows = [];
        newState.count = 0;
        newState.noResults = true;
        newState.results = {};

        this.setState(Object.assign({}, this.state, newState));
    }

    pushToHistory(query, facets) {
        this.props.history.push(
            `?${this.search.getQueryParamString(query, facets)}`
        );
    }

    paginationClickHandler = (page, e) => {
        if (e === 'clicked') {
            this.search.setStorageForPagination();
        };

        const state = this.state;

        const newState = Object.assign({}, this.state, {
            pagination: {
                amount: state.pagination.amount,
                current: page.selected + 1,
            },
        });

        this.setState(newState, () => {
            let query = this.getQueryObject();

            query.page = page.selected + 1;

            this.pushToHistory(query, query.facets);
        });
    }

    sortHandler = (e) => {
        const sortOption = parseInt(e.value) === 1 ? parameterValues.sort.mostRelevant : parameterValues.sort.mostRecent;

        let query = this.getQueryObject();

        query.page = 1;
        query.sort = sortOption;

        this.setState({forceCollapseFilters: true}, () => {
            this.pushToHistory(query, query.facets);
        });
    }

    categoryChangeHandler = e => this.handleCategorySelected(e.value);

    filterSelectHandler = (facet, categoryId, e, activeIndex) => {
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

        this.state['activeIndex'] = categoryId;
        const query = this.getQueryObject();

        query.page = 1;
        query.facets = {... newState.selectedFacets};

        this.pushToHistory(query, query.facets);
    }

    handleSubFacetRemove = (tag) => {
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

        const query = this.getQueryObject();

        query.page = 1;
        query.facets = {... newState.selectedFacets};

        this.setState({forceCollapseFilters: true}, () => {
            this.pushToHistory(query, query.facets);
        });
    }

    applyFilters = () => {
        this.hideSortFiltersModal();
        this.deactivateFilters();
        domElements.noScroll(false);

        setTimeout(() => {
            this.search.scrollToTop();
        }, 1000);

        this.clearUnappliedFilters();
    }

    clearUnappliedFilters() {
        this.setState({
            savedState: {},
        });
    }

    resetToSavedState = () => {
        this.setState({ forceCollapseFilters: true }, () => {
            this.pushToHistory(this.state.savedState.searchParams, this.state.savedState.searchParams.facets);
        });
    }

    collapseFilters = () => {
        // setting to true will trigger componentDidUpdate method on the filter component
        // which will take care of doing the actual collapsing of the facet groups
        this.setState({ collapseAllFilters: true }, () => {
            // reset back to false after state has been updated
            this.setState({ collapseAllFilters: false });
            setTimeout(this.deactivateFilters, 0);
        });
    }

    deactivateFilters = () => document.body.classList.remove('filter-active');
    hideSortFiltersModal = () => document.body.classList.remove('show-sort-filters');

    setupFilters = () => {
        if (!this.state.isDesktop) {
            const state = Object.assign({}, this.state);
            this.savedSelectFilterState = JSON.stringify(state.selectedFacets);
            this.setState({
                savedState: state,
            });
        }
    }

    handleContentTypeItemClick = item => {
        const contentType = item.facetName.replace('_facet', '');

        let query = this.search.createQueryObject(
            parse(window.location.search)
        );

        query.content_type = contentType;

        query.page = 1;

        this.setState({forceCollapseFilters: true, activeFilterIndex: -1}, () => {
            this.pushToHistory(query, query.facets);
        });
    };

    handleResetSearchToDefault = () => {
        let query = this.search.createQueryObject(
            parse(window.location.search)
        );

        if (query.keyword && !this.search.isDefaultKeyword(query.keyword)) {
            this.search.clearSessionStore();
            this.search.setUrlParameter('', window.location.pathname);
        } else {
            // no keyword has been selected so no need to reload page
            // simply clear active filters and update the route
            delete query.content_type;
            delete query.facets;

            query.page = parameterDefaults.page;

            this.pushToHistory(query, query.facets);
        }
    };

    handleRemoveKeyword = () => {
        this.search.clearSessionStore();

        const parameters = parse(window.location.search);

        parameters.keyword = parameterDefaults.keyword;
        parameters.page = parameterDefaults.page;

        window.location.href = `${window.location.pathname}?${stringify(
            parameters
        )}`;
    };

    handleRemoveContentType = () => {
        const query = parse(window.location.search);

        delete query.content_type;

        query.page = parameterDefaults.page;

        this.pushToHistory(query, query.facets);
    };

    getSelectedContentTypeName = () => {
        const query = this.getQueryObject();

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type
        );
        const contentTypeName = contentTypeElement
            ? contentTypeElement.categoryFacetName
            : 'NA';

        return contentTypeName;
    };

    getSelectedContentTypeValue = () => {
        const query = this.getQueryObject();

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type
        );
        const contentTypeValue = contentTypeElement
            ? contentTypeElement.categoryFacetValue
            : 'NA';

        return contentTypeValue;
    };

    getSelectedContentTypeTranslation = () => {
        const query = this.getQueryObject();

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type
        );
        const categoryFacetTranslation = contentTypeElement
            ? contentTypeElement.categoryFacetTranslation
            : 'NA';

        return categoryFacetTranslation;
    };

    handleFilterGroupClick = (facetName, index) => {
        const activeIndex = index === -1 ? '' : this.state.activeIndex;
        this.setState({activeFilterIndex: index, activeIndex});
    }

    getSelectedContentType = () => {
        if (this.state.contentTypeSelected) {
            if (
                this.state.contentTypeSelected.hasOwnProperty(
                    'categoryFacetName'
                )
            ) {
                return {
                    facetName: this.state.contentTypeSelected.categoryFacetName,
                    facetValue: this.state.contentTypeSelected.categoryFacetValue,
                    facetTranslation: this.state.contentTypeSelected.categoryFacetTranslation
                };
            } else if (
                this.state.contentTypeSelected.hasOwnProperty('facetName')
            ) {
                return this.state.contentTypeSelected;
            }
        }

        const query = this.getQueryObject();

        const contentType = this.props.filterMap.find(
            item => item.categoryFacetName === `${query.content_type}_facet`
        );

        return {
            facetName: contentType ? contentType.categoryFacetName : '',
            facetValue: contentType ? contentType.categoryFacetValue : '',
            facetTranslation: contentType ? contentType.categoryFacetTranslation : ''
        };
    };

    handleRelatedSuggestionClick = suggestion => {
        const parameters = parse(window.location.search);

        parameters.keyword = suggestion;

        window.location.href = `${window.location.pathname}?${stringify(
            parameters
        )}`;
    };

    handleResultsItemClick = () => {
        this.search.setStorageForPagePosition();
        this.search.setStorageForTabHistory(this.state.tabHistory);
    }

    handleCategorySelected = index => {
        if (this.state.activeTabIndex === index) { return; }

        let query = this.getQueryObject();

        this.persistTabHistory(query);

        this.setCategorySelected(index, query, this.state.categoryTabs[index].name);
    };

    setCategorySelected = (index, query, category) => {
        const tabHistoryEntrySelected = this.getTabHistoryEntry(category);

        if (Object.entries(tabHistoryEntrySelected.searchParams).length === 0) {
            query.category = category;
            query.page = parameterDefaults.page;
            query.sort = parameterDefaults.sort;

            delete query.content_type;
            delete query.facets;

            this.setCategorySelectedState(index,
                query,
                parameterDefaults.content_type,
                parameterDefaults.contentTypeSelected,
                null);
        } else {
            this.setCategorySelectedState(index,
                tabHistoryEntrySelected.searchParams,
                tabHistoryEntrySelected.contentType,
                tabHistoryEntrySelected.contentTypeSelected,
                tabHistoryEntrySelected.selectedFacets);
        }
    }

    createTabHistoryEntryForCurrentTab = query => {
        const tabHistoryEntry = this.getTabHistoryEntry(query.category);
        tabHistoryEntry.searchParams = Object.assign({}, query);
        tabHistoryEntry.contentType = this.state.contentType;
        tabHistoryEntry.contentTypeSelected = Object.assign({}, this.state.contentTypeSelected);
        tabHistoryEntry.selectedFacets = Object.assign({}, this.state.selectedFacets);

        return this.setTabHistoryEntryState(query.category, tabHistoryEntry);
    }

    getTabHistoryEntry = category => {
        if (this.state.tabHistory && this.state.tabHistory.hasOwnProperty(`${category}`)) {
            return this.state.tabHistory[`${category}`];
        }

        return {
            searchParams: {},
            contentType: '',
            contentTypeSelected: {},
            selectedFacets: null,
        }
    }

    setTabHistoryEntryState = (category, tabHistoryEntry) => {
        const tabHistory = this.state.tabHistory ? this.state.tabHistory : {};
        tabHistory[`${category}`] = tabHistoryEntry;
        this.setState({tabHistory});

        return tabHistory;
    }

    setCategorySelectedState = (activeTabIndex, searchParams, contentType, contentTypeSelected, selectedFacets) => {
        this.setState({
                activeTabIndex,
                searchParams,
                keyword: searchParams.keyword,
                category: searchParams.category,
                sort: searchParams.sort,
                contentType,
                contentTypeSelected,
                selectedFacets: selectedFacets ? selectedFacets : {},
                forceCollapseFilters: screenSizes.isTabletAndUnder(),
            });

        setTimeout(() => {
            this.pushToHistory(searchParams, selectedFacets);
        }, 0);
    }

    handleHideSortFilterClick = () => {
        const searchParamsStringify = JSON.stringify(this.state.searchParams);
        const savedParamsStringify = JSON.stringify(this.state.savedState.searchParams);

        if (searchParamsStringify !== savedParamsStringify) {
            this.resetToSavedState();
        }

        setTimeout(() => {
            domElements.noScroll(false);
            this.deactivateFilters();
            this.hideSortFiltersModal();
        }, 0);
    }

    categoryProps = () => {
        return {
            categories: this.state.categoryTabs,
            activeIndex: this.state.activeTabIndex
        };
    }

    categoryEvents = () => {
        return {
            onCategoryTabClick: this.handleCategorySelected,
            onCategoryDropdownChange: this.categoryChangeHandler
        };
    }

    showSortFilterProps = () => {
        return {
            collapseFilters: this.collapseFilters
        };
    }

    showSortFilterEvents = () => {
        return {
            onSetupFilters: this.setupFilters,
            onResetToSavedState: this.resetToSavedState,
            onClose: this.handleHideSortFilterClick
        };
    }

    resultsProps = () => {
        return {
            rows: this.state.rows,
            count: this.state.count,
            query: this.state.query,
            current: this.state.pagination && this.state.pagination.current ? parseInt(this.state.pagination.current) : 1,
            noQuery: this.state.noQuery,
            spell_check: this.state.spell_check,
            spell_related_suggestions: this.state.spell_related_suggestions,
            spell_suggestion: this.state.spell_suggestion,
            isSkuList: this.state.isSkuList,
            items: Array.isArray(this.state.results) ? this.state.results : this.state.results ? this.state.results : [],
            pagination: this.state.pagination
        };
    }

    resultsEvents = () => {
        return {
            onRelatedSuggestionClick: this.handleRelatedSuggestionClick,
            onResultsItemClick: this.handleResultsItemClick,
            onPageChange: this.paginationClickHandler
        };
    }

    asideProps = () => {
        return {
            sortFilterIsPristine: (this.state.contentType || this.state.keyword !== parameterDefaults.keyword) ? false : true,
            count: this.state.count,
            sortByText: this.state.sort,
            sortByValue: this.state.unappliedFilters && this.state.unappliedFilters.sort ? this.state.unappliedFilters.sort === parameterValues.sort.mostRecent ? 2 : 1 : this.state.sort === parameterValues.sort.mostRecent ? 2 : 1
        };
    }

    asideEvents = () => {
        return {
            onHideSortFilterClick: this.handleHideSortFilterClick,
            onApplySortFilter: this.applyFilters,
            onCollapseFilters: this.collapseFilters,
            onSort: this.sortHandler
        };
    }

    menuProps = () => {
        return {
            showContentTypeMenu: this.isCategoryOnlySelected(this.state.category, this.state.contentType),
            showFacetMenu: !this.isCategoryOnlySelected(this.state.category, this.state.contentType),
            heading: this.props.searchText.filterBy
        };
    }

    contentTypeMenuProps = () => {
        return {
            items: this.state.filterMap && this.state.filterMap.orderedFacets ? this.state.filterMap.orderedFacets : []
        };
    }

    contentTypeMenuEvents = () => {
        return {
            onContentTypeItemClick: this.handleContentTypeItemClick
        };
    }

    facetMenuProps = () => {
        return {
            selectedValue: this.getSelectedContentTypeTranslation(),
            previousIcon: this.props.searchText.previousIcon
        };
    }

    facetMenuEvents = () => {
        return {
            onContentTypeRemoval: this.handleRemoveContentType
        };
    }

    subFacetFiltersEvents = () => {
        return {
            onFilterSelect: this.filterSelectHandler,
            onGroupClick: this.handleFilterGroupClick
        };
    }

    subFacetFiltersProps = () => {
        return {
            items: this.state.facets,
            filterMap: this.state.filterMap,
            defaultFacet: this.props.defaultFacet,
            selectedFacets: this.state.selectedFacets,
            contentType: this.state.contentType,
            facetGroupsSelectedOrder: this.state.facetGroupsSelectedOrder,
            collapseAllFilters: this.state.collapseAllFilters,
            activeIndex: this.state.activeFilterIndex
        };
    }

    filterTagsProps = () => {
        return {
            keyword: this.state.keyword,
            spell_suggestion: this.state.spell_suggestion,
            contentTypeSelected: this.getSelectedContentType(),
            selectedFacets: this.state.unappliedFilters && this.state.unappliedFilters.selectedFacets ? this.state.unappliedFilters.selectedFacets : this.state.selectedFacets,
            facets: this.state.facets,
            contentType: this.state.contentType
        };
    }

    filterTagsEvents = () => {
        return {
            onClearAll: this.handleResetSearchToDefault,
            onKeywordRemove: this.handleRemoveKeyword,
            onContentTypeRemove: this.handleRemoveContentType,
            onSubFacetRemove: this.handleSubFacetRemove
        };
    }

    render() {
        if (this.state.loading && !screenSizes.isTabletAndUnder()) {
            return <Loading visible={true} />
        };

        if (this.state.noResults) {
            return <NoResults
                        searchText={this.props.searchText}
                        query={this.state.keyword} />;
        }

        return <SearchComponent
                    text={this.props.searchText}
                    filterMap={this.props.filterMap}
                    skuConfig={this.state.skuConfig}
                    searchParams={this.state.searchParams}
                    category={this.state.category ? this.state.category : ''}
                    categoryProps={this.categoryProps()}
                    categoryEvents={this.categoryEvents()}
                    showSortFilterProps={this.showSortFilterProps()}
                    showSortFilterEvents={this.showSortFilterEvents()}
                    resultsProps={this.resultsProps()}
                    resultsEvents={this.resultsEvents()}
                    asideProps={this.asideProps()}
                    asideEvents={this.asideEvents()}
                    menuProps={this.menuProps()}
                    contentTypeMenuProps={this.contentTypeMenuProps()}
                    contentTypeMenuEvents={this.contentTypeMenuEvents()}
                    facetMenuProps={this.facetMenuProps()}
                    facetMenuEvents={this.facetMenuEvents()}
                    subFacetFiltersProps={this.subFacetFiltersProps()}
                    subFacetFiltersEvents={this.subFacetFiltersEvents()}
                    filterTagsProps={this.filterTagsProps()}
                    filterTagsEvents={this.filterTagsEvents()} />;
    }
}

export default withRouter(SearchContainer);