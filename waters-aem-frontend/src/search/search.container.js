import React, { Component } from 'react';
import { parameterValues, parameterDefaults, searchMapper } from './services/index';
import { parse, stringify } from 'query-string';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import domElements from '../scripts/domElements';
import screenSizes from '../scripts/screenSizes';
import Analytics, { analyticTypes } from '../analytics';
import Loading from './components/loading';
import SearchComponent from './search.component';
import { isEprocurementUser } from '../utils/userFunctions';
import { SEARCH_TYPES } from '../constants';
import SearchBreadcrumb from '../common/search-breadcrumb';
import cookieStore from '../stores/cookieStore';
import loginStatus from '../scripts/loginStatus';
import NoResults from './components/no-results';

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
        this.setState({isEprocurementUser: isEprocurementUser()});
        this.addHistoryListener();
        this.addResizeListener();
        
        const facetGroupsSelectedOrder = this.parseFacetsFromUrlToArray();
        const sessionStore = this.search.getSessionStore();
        this.setState({tabHistory: sessionStore.searchTabHistory, facetGroupsSelectedOrder}, () => {
            this.performSearch();
        });
    }

    getFacetKey = (key) => `${key}_facet`;

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
        const isEprocUser = isEprocurementUser();
        this.query = query;

        // Setting up the sort filter value
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

        const category = this.query.category ? this.query.category : (isEprocUser ? 'Shop' :'');

        const contentType = this.query.content_type
            ? this.query.content_type
            : null;

        // Fetch selected contentType object from filterMap
        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            contentType,
            this.getCategoryFacetKey(category)
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
            activeTabIndex: 0,
            tabHistory: {},
            facetGroupsSelectedOrder: [],
            collapseAllFilters: false,
            activeFilterIndex: -1,
            count: 0,
            allResultsText: this.props.searchText.allResultsText,
            allResultsTextMobile: this.props.searchText.allResultsTextMobile
        };
    }

    handleHistoryPush = query => {
        const categoryIndex = this.state.categoryTabs.findIndex(
            category => category.name === query.category
        );

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type,
            this.getCategoryFacetKey(query.category)
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
                query.content_type,
                this.getCategoryFacetKey(query.category)
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

    createStrippedFacetName = (facetName) => {
        return facetName.replace(/[\W_]+/g, "").toLowerCase();
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
                .filter(category => category.count !== 0 && !!this.findFacetNameProperty(this.props.filterMap, category.value))
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
        // Default to "Shop" for Eproc; "All" if no category sent.
        if (!query.category) {
            query.category = this.state.isEprocurementUser ? "Shop" : "All";
        }
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
        // Execute the Search
        this.executeSearch(query, rows);
    }

    persistTabHistory = query => {
        // If category is undefined don't save to Tab History this occurs when no category is specified
        if (query.category) {
            const tabHistory = this.createTabHistoryEntryForCurrentTab(query);
            this.search.setStorageForTabHistory(tabHistory);
        }
    }

    executeSearch = (query, rows) => {
        const searchType = this.getSearchType(query);

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
        if (!query) {
            return SEARCH_TYPES.CATEGORY_ONLY;
        }

        if (query.category && !query.content_type && !this.isFacetsSelected(query.facets)) {
            return SEARCH_TYPES.CATEGORY_ONLY;
        }

        if (query.category && query.content_type && !this.isFacetsSelected(query.facets)) {
            return SEARCH_TYPES.CONTENT_TYPE;
        }

        if (query.category && this.isFacetsSelected(query.facets)) {
            return SEARCH_TYPES.SUB_FACETS;
        }

        // return a default value for defensive programming
        return SEARCH_TYPES.CATEGORY_ONLY;
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

    getCategoryFacetKey = (category) => category ? this.getFacetKey(this.createStrippedFacetName(category)) : '';

    findContentType = (items, content_type, selectedCategory) => {
        let categoryValue = selectedCategory;

        if (!categoryValue && this.state && this.state.isEprocurementUser) {
            categoryValue = this.getCategoryFacetKey('Shop');
        }

        const category = categoryValue && items.find(
            element => element.categoryFacetName === categoryValue
        );

        let contentTypeObject;

        if (category && category.orderedFacets) {
            contentTypeObject = category.orderedFacets.find(
                element => element.facetName === this.getFacetKey(content_type)
            );
        }

        return contentTypeObject;
    }

    isCategoryOnlySelected = (category, content_type) =>
        category && !content_type ? true : false;

    isFacetsSelected = selectedFacets =>
        Object.entries(selectedFacets).length !== 0 ? true : false;

    getFilterMap = (authoredTags, backendFacets) => {
        const categoryFacetName = this.getCategoryFacetKey(this.state.category);
        const category = authoredTags.find(authoredItem => authoredItem.categoryFacetName === categoryFacetName);
        let orderedFacetsMap = [];

        if (!category) {
            return;
        }

        if (Array.isArray(category.orderedFacets) && category.orderedFacets.length > 0) {
            const orderedFacets = category.orderedFacets.filter(facet =>
                backendFacets.find(beFacet => beFacet.value === facet.facetValue)
            );

            const orderedFacetsWithCount = orderedFacets.map(facet => {
                const beFacet = backendFacets.find(
                    beFacet => beFacet.value === facet.facetValue
                );

                return {
                    ...facet,
                    count: beFacet ? beFacet.count : 0
                };
            });

            orderedFacetsMap = orderedFacetsWithCount;
        }

        return {
            categoryFacetName: category.categoryFacetName,
            categoryFacetValue: category.categoryFacetValue,
            orderedFacets: orderedFacetsMap
        };
    };

    setAllCategory = (categoriesWithData) => {
        //Add All Category to categories using Count of Authored Categories

        let total = 0;
        for (let i = 0; i < categoriesWithData.length; i++) {
            total = total + categoriesWithData[i].count;
        }
        const allCategory = {
            "translation": this.state.allResultsText,
            "mobileTranslation": this.state.allResultsTextMobile,
            "name": "All",
            "count": total
        };
        this.setState({ count: total });        
        categoriesWithData = [allCategory, ...categoriesWithData]; 
        return categoriesWithData
    }

    searchOnSuccess = (query, rows, res, initCategories = false) => {
        
        // get the categoy Assigned to state
        this.state.category = this.state.category ? this.state.category : query.category;
        
        const newState = Object.assign({}, this.state);

        newState.filterMap =
            res.num_found !== 0
                ? Object.assign({}, this.getFilterMap(
                    this.props.filterMap,
                    (res.facets && res.facets[this.parentCategory]) || []
                ))
                : [];
        
        // Add the All Category to the categories retrieved from the API call iff the All category has been authored
        const categoriesWithData = this.mapCategories(res);
        const categoriesWithAllData = this.findFacetNameProperty(this.props.filterMap, "All")
        ? this.setAllCategory(categoriesWithData)
        : categoriesWithData;

        newState.categoryTabs = categoriesWithAllData;
            
        newState.loading = false;
        newState.rows = rows;
        newState.count = parseInt(res.num_found);
        newState.query = query.keyword;
        newState.results = newState.results || {};
        newState.results[query.page] = res.num_found !== 0 ? res.documents : [];
        newState.noQuery = query.keyword ? false : true;
        newState.sort = this.state.sort;
        newState.performedSearches = this.state.performedSearches + 1;
        newState.erroredOut = false;

        newState.pagination = {
            current: query.page,
            amount: Math.ceil(res.num_found / rows),
        };

        newState.noResults = !newState.results[query.page].length;

        if (!newState.noResults && query.keyword && query.keyword !== parameterDefaults.keyword) {
            cookieStore.setRecentSearches(query.keyword);
        }

        newState.facets = res.facets;
        if ("activeIndex" in this.state) {
            newState.facets['activeIndex'] = this.state.activeIndex;
            newState.activeFilterIndex = this.getActiveFilterIndex(this.props.subFacetMap, newState.facets, this.state.activeIndex);
        } else {
            if (newState.facets in this.state) {
                newState.facets['activeIndex'] = "";
            }
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

    getActiveFilterIndex = (subFacetMap, facets, facetName) => {
        const mappings = searchMapper.mapFacetGroups(subFacetMap, facets);
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
            query.content_type,
            this.getCategoryFacetKey(this.state.category)
        );
        const contentTypeName = contentTypeElement
            ? contentTypeElement.facetName
            : 'NA';

        return contentTypeName;
    };

    getSelectedContentTypeValue = () => {
        const query = this.getQueryObject();

        const contentTypeElement = this.findContentType(
            this.props.filterMap,
            query.content_type,
            this.getCategoryFacetKey(this.state.category)
        );
        const contentTypeValue = contentTypeElement
            ? contentTypeElement.facetValue
            : 'NA';

        return contentTypeValue;
    };

    getSelectedContentTypeTranslation = () => {
        const query = this.getQueryObject();

        const contentTypeElement = query.content_type ? this.findContentType(
            this.props.filterMap,
            query.content_type,
            this.getCategoryFacetKey(this.state.category)
        ) : '';
        const categoryFacetTranslation = contentTypeElement
            ? contentTypeElement.facetTranslation
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
                    facetName: this.state.contentTypeSelected.facetName || '',
                    facetValue: this.state.contentTypeSelected.facetValue || '',
                    facetTranslation: this.state.contentTypeSelected.facetTranslation || ''
                };
            } else if (
                this.state.contentTypeSelected.hasOwnProperty('facetName')
            ) {
                return this.state.contentTypeSelected;
            }
        }

        const query = this.getQueryObject();

        
        const contentType = query.content_type && (query.category || this.state.isEprocurementUser) && this.findContentType(this.props.filterMap, this.getFacetKey(query.content_type), this.getCategoryFacetKey(query.category));

        return {
            facetName: contentType ? contentType.facetName : '',
            facetValue: contentType ? contentType.facetValue : '',
            facetTranslation: contentType ? contentType.facetTranslation : ''
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
            query.sort = this.state.sort || parameterDefaults.sort;

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
            heading: this.props.searchText.resultType,
            backLinkText: this.props.searchText.anyResultTypeText
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
            subFacetMap: this.props.subFacetMap,
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

    noSearchResultsToggle = () => {
        const isInEditMode = document.getElementById("header").hasAttribute("data-is-edit-mode");

        if (!isInEditMode) {
            const zeroResultsXF = document.querySelector('#zeroresults');
            const hideZeroResultsClass = 'hidden';
            const parentLayoutContainer = zeroResultsXF && zeroResultsXF.closest('.container.hidden');

            if (parentLayoutContainer && this.state.noResults) {
                domElements.removeClass(parentLayoutContainer, hideZeroResultsClass);
            } else if (parentLayoutContainer && !this.state.noResults) {
                domElements.addClass(parentLayoutContainer, hideZeroResultsClass)
            }
        }
    }

    render() {
        if (this.state.loading) {
            // hide the XF initially to prevent loading flicker
            this.noSearchResultsToggle();
        };

        if (this.state.loading && !screenSizes.isTabletAndUnder()) {
            return <Loading visible={true} />
        };

        if (!this.state.loading) {
            this.noSearchResultsToggle();
        }

        if (this.state.noResults) {
            return (
                <>
                    <SearchBreadcrumb
                        text={this.props.searchText}
                        searchParams={this.state.searchParams}
                        clearSessionStore={this.props.search.clearSessionStore}
                        noResults={this.state.noResults}/>
                    <NoResults
                        searchText={this.props.searchText}
                        query={this.state.keyword} />
                </>
            )
        }

        return <SearchComponent
                    isEprocurementUser={this.state.isEprocurementUser}
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
                    filterTagsEvents={this.filterTagsEvents()}
                    clearSessionStore={this.props.search.clearSessionStore} />;
    }
}

export default withRouter(SearchContainer);