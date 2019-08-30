import React, { Component, Fragment } from 'react';
import { SearchService, parameterDefaults } from './services/index';
import { parse, stringify } from 'query-string';
import { withRouter } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import ResultsCount from './components/results-count';
import Results from './components/results';
import SkuList from '../sku-list';
import NoResults from './components/no-results';
import Sort from './components/sort';
import CategoryDropDown from './components/category-dropdown';
import Filter from './components/filter';
import {
    SubFacetTags,
    CategoryTags,
    ClearAllTag,
    KeywordTag,
} from './components/filter-tags';
import BtnShowSortFilter from './components/btn-show-sort-filter';
import BtnHideSortFilter from './components/btn-hide-sort-filter';
import BtnApplySortFilter from './components/btn-apply-sort-filter';
import BtnDoneSortFilter from './components/btn-done-sort-filter';
import Spinner from './components/spinner';
import { CategoriesMenu } from './components/categories-menu';
import CategoryTabs from './components/categories-tabs';

class Search extends Component {
    constructor() {
        super();
        this.savedSelectFilterState = null;
        this.parentCategory = 'contenttype_facet';
    }

    componentWillMount() {
        this.search = new SearchService(
            this.props.isocode,
            this.props.searchServicePath,
            parameterDefaults.page,
            this.props.searchDefaults.rows,
            parameterDefaults.sort,
            undefined,
            () => this.props.setErrorBoundaryToTrue()
        );

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

        const category = this.query.category
            ? this.query.category
            : null;

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
        let skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
        skuConfig.showBreadcrumbs = true;

        this.setState({
            loading: true,
            results: {},
            pagination: {
                current: this.query.page
                    ? this.query.page
                    : parameterDefaults.page,
            },
            rows: this.props.searchDefaults
                ? this.props.searchDefaults && this.props.searchDefaults.rows
                : 25,
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
            activeTabIndex: -1
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

    componentWillReceiveProps(props) {
        if (props.hasError) {
            this.setState({ keyword: parameterDefaults.keyword }, () =>
                this.performSearch('')
            );
        } else if (this.state.initialRender != true) {
            this.performSearch();
        } else {
            this.setState({ initialRender: false });
        }
    }

    mapCategories = categories => (!categories || !categories.facets || !categories.facets.category_facet)
            ? []
            : categories.facets.category_facet.filter(category => category.value !== 0).map(category => { return { name: category.value, count: category.count} });

    findMaxCategory = categories => {
        if (!categories) { return 0; }

        const counts = categories.map(category => category.count);
        const maxCount = Math.max(...counts);

        return categories.findIndex(category => category.count === maxCount);
    }

    async performSearch(q) {
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

        const categories = await this.search.getCategories();
        const categoriesWithData = this.mapCategories(categories);

        this.setState({categoryTabs: categoriesWithData});

        const isInitialLoad = this.isInitialLoad(query.category, query.content_type);

        if (!isInitialLoad) {
            const categoryIndex = categoriesWithData.findIndex(category => category.name === query.category);
            this.setState({activeTabIndex: categoryIndex});
        }

        if (isInitialLoad) {
            const maxCategory = this.findMaxCategory(categoriesWithData);

            this.setState({activeTabIndex: maxCategory});

            query.category = categoriesWithData[maxCategory].name;

            this.pushToHistory(query, this.state.selectedFacets);

            await this.performSearch(query);

        } else if (this.isCategoryOnlySelected(query.category, query.content_type)) {
            // deselects content type when user clicks the back button on browser
            this.setState({ contentType: null, contentTypeSelected: {} });

            if (!this.props.hasError) {
                this.search.getResultsByCategory(query).then(res => {
                    if (res && !this.props.hasError) {
                        this.searchOnSuccess(query, rows, res, true);
                    } else {
                        this.search.getResultsByCategory(query).then(results => {
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
        } else if (!this.isFacetsSelected(query.facets)) {
            // no sub-facets have been selected, only the content type has been selected
            const contentTypeElement = this.findContentType(
                this.props.filterMap,
                query.content_type
            );
            const contentTypeValue = contentTypeElement
                ? contentTypeElement.categoryFacetValue
                : 'NA';

            this.search
                .contentType(query.content_type, contentTypeValue, query)
                .then(res =>
                    this.searchOnSuccess(query, rows, res, false, 'success')
                );
        } else {
            // sub-facets have been selected
            const contentTypeElement = this.findContentType(
                this.props.filterMap,
                query.content_type
            );
            const contentTypeName = contentTypeElement
                ? contentTypeElement.categoryFacetName
                : 'NA';
            const contentTypeValue = contentTypeElement
                ? contentTypeElement.categoryFacetValue
                : 'NA';

            this.search
                .subFacet(contentTypeName, contentTypeValue, query)
                .then(res =>
                    this.searchOnSuccess(query, rows, res, false, 'success')
                )
                .catch(error => this.searchOnError(error));
        }
    }

    findContentType = (items, content_type) =>
        items.find(
            element => element.categoryFacetName === `${content_type}_facet`
        );

    isInitialLoad = (category, content_type) => (category) ? false : true;

    isCategoryOnlySelected = (category, content_type) => (category && !content_type) ? true : false;

    isFacetsSelected = selectedFacets => Object.entries(selectedFacets).length !== 0 ? true : false;

    getFilterMap = (authoredCategories, backendCategories) => {
        return authoredCategories.filter(authoredItem => {
            return backendCategories.find(
                backendItem =>
                    backendItem.value === authoredItem.categoryFacetValue
            );
        });
    };

    searchOnSuccess = (query, rows, res, initCategories = false) => {
        const newState = Object.assign({}, this.state);

        newState.filterMap =
            initCategories && res.num_found !== 0
                ? this.getFilterMap(
                      this.props.filterMap,
                      res.facets[this.parentCategory]
                  )
                : [];

        newState.loading = false;
        newState.rows = rows;
        newState.count = res.num_found;
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
            previousPagePosition !== 'NaN' &&
            this.props.resetToDefault &&
            this.props.resetToDefault === false
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
            if (newState.performedSearches > 1) {
                window.scrollTo(0, 0);
            }
        }
        this.props.resetToDefault = false;
    };

    searchOnError = error => {
        const newState = Object.assign({}, this.state);

        newState.loading = false;
        newState.rows = [];
        newState.count = 0;
        newState.noResults = true;
        newState.results = {};

        this.setState(Object.assign({}, this.state, newState));
    };

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

        const query = {
            keyword: searchParams.keyword,
            page: page.selected + 1,
            sort: searchParams.sort,
        };

        if (this.state.contentType) {
            query.content_type = this.state.contentType;
        }

        this.pushToHistory(query, searchParams.facets);

        if (e === 'clicked') {
            window.sessionStorage.setItem(
                'waters.previousPaginationClick',
                scrolled
            );
        }
    }

    sortHandler(e) {
        const sortOption =
            parseInt(e.value) === 1 ? 'most-relevant' : 'most-recent';
        const state = this.state;

        this.setState(Object.assign({}, state, { sort: sortOption }));

        const query = {
            keyword: state.query,
            page: 1,
            sort: sortOption,
        };

        if (this.state.contentType) {
            query.content_type = this.state.contentType;
        }

        this.pushToHistory(query, state.selectedFacets);
    }

    categoryChangeHandler(e) {
        console.log('categoryChangeHandler', e);
    }

    filterSelectHandler(facet, categoryId, e) {
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

    handleContentTypeItemClick = item => {
        const contentType = item.categoryFacetName.replace('_facet', '');

        let query = this.search.createQueryObject(
            parse(window.location.search)
        );

        query.content_type = contentType;

        query.page = 1;

        this.setState({
            searchParams: query,
            contentType,
            contentTypeSelected: item,
            loading: true,
        });

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    };

    handleResetSearchToDefault = () => {
        this.props.resetToDefault = true;
        let query = this.search.createQueryObject(
            parse(window.location.search)
        );

        if (query.keyword && !this.search.isDefaultKeyword(query.keyword)) {
            this.search.setUrlParameter('', window.location.pathname);
        } else {
            // no keyword has been selected so no need to reload page
            // simply clear active filters and update the route
            delete query.content_type;

            query.page = parameterDefaults.page;

            this.setState({
                searchParams: query,
                selectedFacets: {},
                contentType: '',
                contentTypeSelected: {},
            });

            setTimeout(
                () =>
                    this.pushToHistory(
                        this.state.searchParams,
                        this.state.selectedFacets
                    ),
                0
            );
        }
    };

    handleRemoveKeyword = () => {
        const parameters = parse(window.location.search);

        parameters.keyword = parameterDefaults.keyword;
        parameters.page = parameterDefaults.page;

        window.location.href = `${window.location.pathname}?${stringify(
            parameters
        )}`;
    };

    handleRemoveCategory = () => {
        const parameters = parse(window.location.search);

        delete parameters.content_type;

        parameters.page = parameterDefaults.page;

        this.setState({
            searchParams: parameters,
            selectedFacets: {},
            contentType: '',
            contentTypeSelected: {},
        });

        setTimeout(
            () =>
                this.pushToHistory(
                    this.state.searchParams,
                    this.state.selectedFacets
                ),
            0
        );
    };

    getContentMenuOrFilter = filterTags => {
        if (this.isInitialLoad(this.state.category, this.state.contentType)) {
            return (
                <CategoriesMenu
                    text={this.props.searchText}
                    categoryKey="filterBy"
                    items={this.state.filterMap}
                    click={this.handleContentTypeItemClick.bind(this)}
                    showBothChildrenAndItems={true}
                    filterTags={filterTags}
                >
                    <Filter
                        text={this.props.searchText}
                        selectHandler={this.filterSelectHandler.bind(this)}
                        showTagsOnly={true}
                    />
                </CategoriesMenu>
            );
        } else {
            return (
                <CategoriesMenu
                    text={this.props.searchText}
                    categoryKey="filterBy"
                    items={this.state.filterMap}
                    click={this.handleContentTypeItemClick.bind(this)}
                    selectedValue={
                        this.state.contentTypeSelected.categoryFacetValue
                    }
                    clear={this.handleRemoveCategory.bind(this)}
                    filterTags={filterTags}
                >
                    <Filter
                        facets={this.state.facets}
                        text={this.props.searchText}
                        filterMap={this.props.filterMap}
                        defaultFacet={this.props.defaultFacet}
                        selectHandler={this.filterSelectHandler.bind(this)}
                        selectedFacets={this.state.selectedFacets}
                        contentType={this.state.contentType}
                    />
                </CategoriesMenu>
            );
        }
    };

    getFilterTags = () => {
        if (this.isKeywordSelected() || this.isContentTypeSelected()) {
            return (
                <div className="cmp-search-filters__tags clearfix">
                    <ClearAllTag
                        text={this.props.searchText}
                        onRemove={this.handleResetSearchToDefault}
                    />
                    {this.getKeywordTag()}
                    {this.getCategoryTags()}
                    {this.getSubFacetTags()}
                </div>
            );
        } else {
            return <div className="cmp-search-filters__emptytags" />;
        }
    };

    isContentTypeSelected = () =>
        Object.entries(this.state.contentTypeSelected).length !== 0;

    isKeywordSelected = () => !this.search.isDefaultKeyword(this.state.keyword);

    getCategoryTags = () =>
        this.isContentTypeSelected() ? (
            <CategoryTags
                categoryKey="contentType"
                text={this.props.searchText}
                selected={this.state.contentTypeSelected}
                onRemove={this.handleRemoveCategory}
            />
        ) : (
            <></>
        );

    getKeywordTag = () =>
        this.isKeywordSelected() ? (
            <KeywordTag
                keyword={
                    this.state.spell_suggestion
                        ? this.state.spell_suggestion
                        : this.state.keyword
                }
                text={this.props.searchText}
                onRemove={this.handleRemoveKeyword}
            />
        ) : (
            <></>
        );

    getSubFacetTags = () => {
        if (
            this.isInitialLoad(this.state.category, this.state.contentType) ||
            !this.isFacetsSelected(this.state.searchParams.facets)
        ) {
            return <></>;
        }

        return (
            <>
                <SubFacetTags
                    text={this.props.searchText}
                    selectedFacets={
                        this.state.unappliedFilters &&
                        this.state.unappliedFilters.selectedFacets
                            ? this.state.unappliedFilters.selectedFacets
                            : this.state.selectedFacets
                    }
                    facets={this.state.facets}
                    removeTag={this.removeTag.bind(this)}
                    filterMap={this.props.filterMap}
                    defaultFacet={this.state.contentType}
                />
            </>
        );
    };

    handleRelatedSuggestionClick = suggestion => {
        const parameters = parse(window.location.search);

        parameters.keyword = suggestion;

        window.location.href = `${window.location.pathname}?${stringify(
            parameters
        )}`;
    };

    renderResultsCount = () => {
        if (this.state.noResults || this.state.loading) return <></>;

        return (
            <ResultsCount
                rows={this.state.rows}
                count={this.state.count}
                query={this.state.query}
                current={
                    this.state.pagination && this.state.pagination.current
                        ? this.state.pagination.current
                        : 1
                }
                noQuery={this.state.noQuery}
                spell_check={this.state.spell_check}
                spell_related_suggestions={this.state.spell_related_suggestions}
                spell_suggestion={this.state.spell_suggestion}
                onRelatedSuggestionClick={this.handleRelatedSuggestionClick}
                text={this.props.searchText}
            />
        );
    };

    renderResults = results =>
        !this.state.loading && this.state.noResults ? (
            <NoResults
                searchText={this.props.searchText}
                query={this.state.query}
            />
        ) : (
            results
        );

    renderSkuOrResults = () => {
        const locale = this.props.searchLocale;
        const state = this.state;
        const searchParams = this.state.searchParams || {};
        const nextIcon = this.props.searchText.nextIcon;

        const tmpData = [
            {"code":"186002326","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"MassPREP Phosphorylase b Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186002326-massprep-phosphorylase-b-standard.html","formattedPrice":"£57.10","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":""},
            {"code":"186002325","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"MassPREP Enolase Digestion Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186002325-massprep-enolase-digestion-standard.html","formattedPrice":"£57.10","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":"",},
            {"code":"186002327","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"MassPREP Bovine Hemoglobin Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186002327-massprep-bovine-hemoglobin-standard.html","formattedPrice":"£57.10","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":"","discontinued":true,"replacementSku":"WAT066200"},
            {"code":"186002328","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"MassPREP ADH Digestion Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186002328-massprep-adh-digestion-standard.html","formattedPrice":"£57.10","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":""},
            {"code":"186002329","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"MassPREP BSA Digestion Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186002329-massprep-bsa-digestion-standard.html","formattedPrice":"£57.10","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":""},
            {"code":"186006371","category_facet": "Shop","contenttype_facet":"Chromatography Columns & Media","title":"Cytochrome C Digestion Standard","skuPageHref":"/content/waters/language-masters/en/shop/standards--reagents/186006371-cytochrome-c-digestion-standard.html","formattedPrice":"£162.00","primaryImageAlt":null,"primaryImageThumbnail":"/content/dam/waters/en/Photography/Products/skus/reagents/clear-vial-2mL-black-cap.jpg/jcr:content/renditions/cq5dam.thumbnail.319.319.png","replacementSkuPageHref":""}
        ];

        if (state.isSkuList) {
            return (
                <SkuList
                    skuConfig={state.skuConfig}
                    data={tmpData || []}
                />
            );
        } else {
            return (
            <Results
                results={state.results[searchParams.page] || []}
                locale={locale}
                nextIcon={nextIcon}
            />);
        }
    };

    render() {
        const state = this.state;
        const overlay = <div className="overlay" />;
        const filterTags = this.getFilterTags();
        const sortFilterIsPristine =
            !this.state.loading &&
            (this.state.contentType ||
                this.state.keyword !== parameterDefaults.keyword)
                ? false
                : true;

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
                    isPristine={sortFilterIsPristine}
                    count={this.state.count}
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
        const renderedResults = this.renderSkuOrResults();
        const results = (
            <div className="cmp-search__container">
                <div className="cmp-search__container__header cleafix">
                    <CategoryDropDown
                        categoryDownIcon={this.props.searchText.downIcon}
                        categoryIsSearchable={false}
                        categoryOnChange={this.categoryChangeHandler.bind(this)}
                        categoryOptions={this.state.categoryTabs}
                        categoryValue={this.state.activeTabIndex}
                    />
                    <BtnShowSortFilter
                        text={this.props.searchText}
                        setupFilters={this.setupFilters.bind(this)}
                        resetToSavedState={this.resetToSavedState.bind(this)}
                        collapseFilters={this.collapseFilters}
                    />
                </div>

                <div className="cmp-search__sorted-container">
                    <div className="cmp-search__sorted-by">
                        {this.props.searchText.sortedBy}:{' '}
                        {this.state.sort === 'most-relevant'
                            ? this.props.searchText.sortByBestMatch
                            : this.props.searchText.sortByMostRecent}
                    </div>

                    {filterTags}
                </div>

                {renderedResults}

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

        if (this.state.erroredOut) {
            return <></>;
        } else {
            return <>
                <CategoryTabs
                    items={this.state.categoryTabs}
                    activeIndex={this.state.activeTabIndex}
                    onClick={() => {console.log("TABS CLICKED");}}
                />
                <div ref="main">
                    {overlay}
                    {this.renderResultsCount()}
                    {!state.loading && state.noResults ? null : aside}
                    {state.loading ? <Spinner loading={state.loading} /> : null}
                    {this.renderResults(results)}
                </div>
            </>;
        }
    }
}

export default withRouter(Search);
