import React, { Suspense } from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { parameterDefaults } from './services/index';
import ContentTypeMenu from './components/content-type-menu';
import FacetMenu from './components/facet-menu';
import Filter from './components/filter';
import CategoryDropdown from './components/category-dropdown';
import BtnHideSortFilter from './components/btn-hide-sort-filter';
import BtnApplySortFilter from './components/btn-apply-sort-filter';
import BtnDoneSortFilter from './components/btn-done-sort-filter';
import Sort from './components/sort';

import BtnShowSortFilter from './components/btn-show-sort-filter';
import ResultsCount from './components/results-count';
import {
    SubFacetTags,
    ContentTypeTag,
    ClearAllTag,
    KeywordTag,
} from './components/filter-tags';
import { propTypes, defaultProps } from './search.component.props';
import { isEprocurementUser } from '../utils/userFunctions';
import CategoryList from '../navigation/category-list';
const SkuList = React.lazy(() => import(/* webpackChunkName: "skulist" */'../sku-list'));
import screenSizes from '../scripts/screenSizes';

const FilterTagList = ({
    text,
    filterMap,
    filterTagsProps,
    filterTagsEvents,
    subFacetMap
}) => {
    const isKeywordSpecified = filterTagsProps.keyword && filterTagsProps.keyword !== parameterDefaults.keyword;
    const isContentTypeSelected = Object.entries(filterTagsProps.contentTypeSelected).length !== 0 && filterTagsProps.contentTypeSelected.facetTranslation

    if (!isKeywordSpecified && !isContentTypeSelected  && Object.entries(filterTagsProps.selectedFacets).length === 0) {
        return <div className="cmp-search-filters__emptytags" />;
    }

    const keyword = filterTagsProps.spell_suggestion ? filterTagsProps.spell_suggestion : filterTagsProps.keyword;

    const keyWordTag = isKeywordSpecified
        ? <KeywordTag
            keyword={keyword}
            text={text}
            onRemove={filterTagsEvents.onKeywordRemove} />
        : <></>;

    const contentTypeTag = isContentTypeSelected
        ? <ContentTypeTag
            text={text}
            selected={filterTagsProps.contentTypeSelected}
            onRemove={filterTagsEvents.onContentTypeRemove} />
        : <></>;

    const subFacetTags = Object.entries(filterTagsProps.selectedFacets).length !== 0
        ? <SubFacetTags
            text={text}
            selectedFacets={filterTagsProps.selectedFacets}
            facets={filterTagsProps.facets}
            removeTag={filterTagsEvents.onSubFacetRemove}
            subFacetMap={subFacetMap} />
        : <></>;

    return (
        <div className="cmp-search-filters__tags clearfix" data-locator="search-filters-tags">
            <ClearAllTag
                text={text}
                onRemove={filterTagsEvents.onClearAll} />
            {keyWordTag}
            {contentTypeTag}
            {subFacetTags}
        </div>
    );
}

FilterTagList.propTypes = {
    text: propTypes.text,
    filterMap: propTypes.filterMap,
    filterTagsProps: propTypes.filterTagsProps,
    filterTagsEvents: propTypes.filterTagsEvents,
    subFacetMap: propTypes.subFacetMap,
}

FilterTagList.defaultProps = {
    text: defaultProps.text,
    filterMap: defaultProps.filterMap,
    filterTagsProps: defaultProps.filterTagsProps,
    filterTagsEvents: defaultProps.filterTagsEvents,
    subFacetMap: defaultProps.subFacetMap,
}

const Aside = ({
    text,
    asideProps,
    asideEvents,
    children,
    items,
    activeIndex,
    categoryClick,
    clearSessionStore
}) => {
    return (
        <div className="container__left cmp-search__sort-filter" data-locator="left-container-filter">
            {!isEprocurementUser() && <CategoryList items={items}
                text={text}
                activeIndex={activeIndex}
                onClick={categoryClick} 
                clearSessionStore={clearSessionStore} />}
            <BtnHideSortFilter
                text={text}
                onClick={asideEvents.onHideSortFilterClick} />

            <BtnApplySortFilter
                text={text}
                applyFilters={asideEvents.onApplySortFilter}
                isPristine={asideProps.sortFilterIsPristine}
                count={asideProps.count} />

            <BtnDoneSortFilter
                text={text}
                collapseFilters={asideEvents.onCollapseFilters} />

                <div className="cmp-search__sort-filter__container">
                    { screenSizes.isMobile() && <Sort
                        sortValue={asideProps.sortByValue}
                        sortHandler={asideEvents.onSort}
                        text={text} />
                    }
                        {children}
                </div>
        </div>
    );
}

Aside.propTypes = {
    text: propTypes.text,
    asideProps: propTypes.asideProps,
    asideEvents: propTypes.asideEvents
}

Aside.defaultProps = {
    text: defaultProps.text,
    asideProps: defaultProps.asideProps,
    asideEvents: defaultProps.asideEvents
}

const Menu = ({
    text,
    filterMap,
    menuProps,
    contentTypeMenuProps,
    contentTypeMenuEvents,
    facetMenuProps,
    facetMenuEvents,
    subFacetFiltersProps,
    subFacetFiltersEvents,
    filterTagsProps,
    filterTagsEvents
}) => {
    const contentTypeMenu = menuProps.showContentTypeMenu && <ContentTypeMenu
            heading={menuProps.heading}
            items={contentTypeMenuProps.items}
            onClick={contentTypeMenuEvents.onContentTypeItemClick} />

    const filterTags = FilterTagList({
        text,
        filterMap,
        filterTagsProps,
        filterTagsEvents,
        subFacetMap : subFacetFiltersProps.subFacetMap,
    });
    const facetMenu = <FacetMenu
                heading={menuProps.backLinkText}
                selectedValue={facetMenuProps.selectedValue}
                previousIcon={facetMenuProps.previousIcon}
                filterTags={filterTags}
                onClear={facetMenuEvents.onContentTypeRemoval}
                showFacetMenuHeading={menuProps.showFacetMenu}>

                <Filter
                    facets={subFacetFiltersProps.items}
                    text={text}
                    filterMap={subFacetFiltersProps.subFacetMap}
                    defaultFacet={subFacetFiltersProps.defaultFacet}
                    selectHandler={subFacetFiltersEvents.onFilterSelect}
                    selectedFacets={subFacetFiltersProps.selectedFacets}
                    contentType={subFacetFiltersProps.contentType}
                    facetGroupsSelectedOrder={subFacetFiltersProps.facetGroupsSelectedOrder}
                    collapseAllFilters={subFacetFiltersProps.collapseAllFilters}
                    activeIndex={subFacetFiltersProps.activeIndex}
                    onGroupClick={subFacetFiltersEvents.onGroupClick}
                    defaultFilterFacet={subFacetFiltersProps.defaultFilterFacet} />

            </FacetMenu>;
    return <>
        {contentTypeMenu}
        {facetMenu}
    </>
}

Menu.propTypes = {
    text: propTypes.text,
    filterMap: propTypes.filterMap,
    menuProps: propTypes.menuProps,
    contentTypeMenuProps: propTypes.contentTypeMenuProps,
    contentTypeMenuEvents: propTypes.contentTypeMenuEvents,
    facetMenuProps: propTypes.facetMenuProps,
    facetMenuEvents: propTypes.facetMenuEvents,
    subFacetFiltersProps: propTypes.subFacetFiltersProps,
    subFacetFiltersEvents: propTypes.subFacetFiltersEvents,
    filterTagsProps: propTypes.filterTagsProps,
    filterTagsEvents: propTypes.filterTagsEvents
}

Menu.defaultProps = {
    text: defaultProps.text,
    filterMap: defaultProps.filterMap,
    menuProps: defaultProps.menuProps,
    contentTypeMenuProps: defaultProps.contentTypeMenuProps,
    contentTypeMenuEvents: defaultProps.contentTypeMenuEvents,
    facetMenuProps: defaultProps.facetMenuProps,
    facetMenuEvents: defaultProps.facetMenuEvents,
    subFacetFiltersProps: defaultProps.subFacetFiltersProps,
    subFacetFiltersEvents: defaultProps.subFacetFiltersEvents,
    filterTagsProps: defaultProps.filterTagsProps,
    filterTagsEvents: defaultProps.filterTagsEvents
}

const SearchResults = ({
    items,
    skuConfig,
    onItemClick
}) => {
    const isEprocUser = isEprocurementUser();
    const searchData = Array.isArray(items)
        ? items.map(item => {
            if (item.skucode) {
                return {
                    code: item.skucode,
                    category_facet: item.category_facet,
                    contenttype_facet: item.contenttype_facet,
                    skuPageHref: isEprocUser ? item.eprocUrl : item.url,
                    formattedPrice: item.displayprice,
                    primaryImageAlt: item.title,
                    primaryImageThumbnail: item.thumbnail,
                    discontinued: item.status !== 'Active', // covers DiscontinueNoReplacement, DiscontinueWithReplacement, ObsoleteNoReplacement, and ObsoleteWithReplacement
                    replacementskuurl: item.replacementskuurl,
                    replacementskucode: item.replacementskucode,
                    title: item.title,
                }
            } else {
                return item;
            }
        }): [];
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SkuList
                config={skuConfig}
                data={searchData}
                onItemClick={onItemClick} />
        </Suspense>
    );
}

SearchResults.propTypes = {
    skuConfig: propTypes.skuConfig,
    items: PropTypes.any,
    onItemClick: PropTypes.func.isRequired
};

SearchResults.defaultProps = {
    skuConfig: defaultProps.skuConfig,
    items: [],
    onItemClick: () => { }
};

const ResultsContent = ({
    text,
    skuConfig,
    searchParams,
    resultsProps,
    resultsEvents
}) => {
    const items = resultsProps.items[searchParams.page];

    return (
        <SearchResults
            items={items}
            skuConfig={skuConfig}
            onItemClick={resultsEvents.onResultsItemClick} />
    );
}

ResultsContent.propTypes = {
    text: propTypes.text,
    skuConfig: propTypes.skuConfig,
    searchParams: propTypes.searchParams,
    resultsProps: propTypes.resultsProps,
    resultsEvents: propTypes.resultsEvents
}

ResultsContent.defaultProps = {
    text: defaultProps.text,
    skuConfig: defaultProps.skuConfig,
    searchParams: defaultProps.searchParams,
    resultsProps: defaultProps.resultsProps,
    resultsEvents: defaultProps.resultsEvents
}

const Pagination = ({
    resultsProps,
    resultsEvents,
    nextIcon,
    previousIcon
}) => {
    if (resultsProps.count <= parameterDefaults.rows) {
        return <></>
    }

    let buildHref = href => `${window.location.href}/page/${href}`

    return (
        <ReactPaginate
            pageCount={resultsProps.pagination.amount}
            forcePage={resultsProps.pagination.current ? resultsProps.pagination.current - 1 : 0}
            pageRangeDisplayed={8}
            marginPagesDisplayed={1}
            containerClassName="paginate__container"
            onPageChange={num => resultsEvents.onPageChange(num, 'clicked')}
            breakLabel={'…'}
            hrefBuilder={buildHref}
            previousLabel={<ReactSVG src={previousIcon} />}
            nextLabel={<ReactSVG src={nextIcon} />}
            initialPage={resultsProps.pagination.current ? resultsProps.pagination.current - 1 : 0}
            disableInitialCallback={true} />
    );
};

Pagination.propTypes = {
    resultsProps: propTypes.resultsProps,
    resultsEvents: propTypes.resultsEvents,
    nextIcon: PropTypes.string,
    previousIcon: PropTypes.string
};

Pagination.defaultProps = {
    resultsProps: defaultProps.resultsProps,
    resultsEvents: defaultProps.resultsEvents,
    nextIcon: "",
    previousIcon: ""
};

const ResultsBody = ({
    text,
    filterMap,
    subFacetMap,
    skuConfig,
    searchParams,
    categoryProps,
    categoryEvents,
    showSortFilterProps,
    showSortFilterEvents,
    asideProps,
    asideEvents,
    filterTagsProps,
    filterTagsEvents,
    resultsProps,
    resultsEvents,
    isEprocurementUser,
}) => {
    const desktopView = () => {
        return (
            <div className="cmp-search__container">
                <div className="cmp-search__container__header clearfix">
                    {!isEprocurementUser && <CategoryDropdown
                        categoryDownIcon={text.downIcon}
                        categoryLabelPrefix={text.categoryLabel}
                        categoryIsSearchable={false}
                        categoryOnChange={categoryEvents.onCategoryDropdownChange}
                        categoryOptions={categoryProps.categories}
                        categoryValue={categoryProps.activeIndex} />}
                </div>
                <div className="cmp-search__sorted-container">
                        <div className="cmp-search__sort-filter__container clearfix">
                            <ResultsCount
                                {...resultsProps}
                                text={text}
                                categoryOptions={categoryProps.categories}
                                categoryValue={categoryProps.activeIndex}
                                onRelatedSuggestionClick={resultsEvents.onRelatedSuggestionClick}  />

                            <Sort
                                sortValue={asideProps.sortByValue}
                                sortHandler={asideEvents.onSort}
                                text={text} />
                        </div>

                    <FilterTagList
                        text={text}
                        filterMap={filterMap}
                        filterTagsProps={filterTagsProps}
                        filterTagsEvents={filterTagsEvents}
                        subFacetMap={subFacetMap} />

                    <ResultsContent
                        text={text}
                        filterMap={filterMap}
                        skuConfig={skuConfig}
                        searchParams={searchParams}
                        resultsProps={resultsProps}
                        resultsEvents={resultsEvents} />
                </div>

                <Pagination
                    resultsProps={resultsProps}
                    resultsEvents={resultsEvents}
                    nextIcon={text.nextIcon}
                    previousIcon={text.previousIcon} />
            </div>
        );
    }
    const mobileView = () => {
        return (
            <div className="cmp-search__container">
                <div className="cmp-search__container__header clearfix">
                    <ResultsCount
                        {...resultsProps}
                        text={text}
                        categoryOptions={categoryProps.categories}
                        categoryValue={categoryProps.activeIndex}
                        onRelatedSuggestionClick={resultsEvents.onRelatedSuggestionClick}  />
                    {!isEprocurementUser && <CategoryDropdown
                        categoryDownIcon={text.downIcon}
                        categoryLabelPrefix={text.categoryLabel}
                        categoryIsSearchable={false}
                        categoryOnChange={categoryEvents.onCategoryDropdownChange}
                        categoryOptions={categoryProps.categories}
                        categoryValue={categoryProps.activeIndex} />}

                    <BtnShowSortFilter
                        text={text}
                        setupFilters={showSortFilterEvents.onSetupFilters}
                        resetToSavedState={showSortFilterEvents.onResetToSavedState}
                        collapseFilters={showSortFilterProps.collapseFilters}
                        onClose={showSortFilterEvents.onClose} />
                    <div className="cmp-search__sorted-by">
                        {text.sortedBy}:{' '}
                        {asideProps.sortByText === 'most-relevant'
                            ? text.sort.options.bestMatch
                            : text.sort.options.mostRecent}
                    </div>
                </div>
                <div className="cmp-search__sorted-container">
                    <FilterTagList
                        text={text}
                        filterMap={filterMap}
                        filterTagsProps={filterTagsProps}
                        filterTagsEvents={filterTagsEvents}
                        subFacetMap={subFacetMap} />

                    <ResultsContent
                        text={text}
                        filterMap={filterMap}
                        skuConfig={skuConfig}
                        searchParams={searchParams}
                        resultsProps={resultsProps}
                        resultsEvents={resultsEvents} />
                </div>

                <Pagination
                    resultsProps={resultsProps}
                    resultsEvents={resultsEvents}
                    nextIcon={text.nextIcon}
                    previousIcon={text.previousIcon} />
            </div>
        );
    }

    return (
        <>
            { screenSizes.isTabletAndOver() ? desktopView() : mobileView() }
        </>
    );
}

ResultsBody.propTypes = {
    text: propTypes.text,
    filterMap: propTypes.filterMap,
    subFacetMap: propTypes.subFacetMap,
    skuConfig: propTypes.skuConfig,
    searchParams: propTypes.searchParams,
    categoryProps: propTypes.categoryProps,
    categoryEvents: propTypes.categoryEvents,
    showSortFilterProps: propTypes.showSortFilterProps,
    showSortFilterEvents: propTypes.showSortFilterEvents,
    asideProps: propTypes.asideProps,
    filterTagsProps: propTypes.filterTagsProps,
    filterTagsEvents: propTypes.filterTagsEvents,
    resultsProps: propTypes.resultsProps,
    resultsEvents: propTypes.resultsEvents
}

ResultsBody.defaultProps = {
    text: defaultProps.text,
    filterMap: defaultProps.filterMap,
    subFacetMap: defaultProps.subFacetMap,
    skuConfig: defaultProps.skuConfig,
    searchParams: defaultProps.searchParams,
    categoryProps: defaultProps.categoryProps,
    categoryEvents: defaultProps.categoryEvents,
    showSortFilterProps: defaultProps.showSortFilterProps,
    showSortFilterEvents: defaultProps.showSortFilterEvents,
    asideProps: defaultProps.asideProps,
    filterTagsProps: defaultProps.filterTagsProps,
    filterTagsEvents: defaultProps.filterTagsEvents,
    resultsProps: defaultProps.resultsProps,
    resultsEvents: defaultProps.resultsEvents
}

export { FilterTagList, Aside, Menu, SearchResults, ResultsContent, Pagination, ResultsBody }