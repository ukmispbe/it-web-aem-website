import React from 'react';
import ReactPaginate from 'react-paginate';
import ReactSVG from 'react-svg';
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
import {
    SubFacetTags,
    ContentTypeTag,
    ClearAllTag,
    KeywordTag,
} from './components/filter-tags';
import SkuList from '../sku-list';
import Results from './components/results';
import { propTypes, defaultProps } from './search.component.props';
import PropTypes from 'prop-types';

const FilterTagList = ({
    text,
    filterMap,
    filterTagsProps,
    filterTagsEvents
}) => {
    const isKeywordSpecified = filterTagsProps.keyword && filterTagsProps.keyword !== parameterDefaults.keyword;
    const isContentTypeSelected = Object.entries(filterTagsProps.contentTypeSelected).length !== 0 && filterTagsProps.contentTypeSelected.facetTranslation

    if (!isKeywordSpecified && !isContentTypeSelected) {
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
                filterMap={filterMap}
                defaultFacet={filterTagsProps.contentType}  />
        : <></>;

    return (
        <div className="cmp-search-filters__tags clearfix">
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
    filterTagsEvents: propTypes.filterTagsEvents
}

FilterTagList.defaultProps = {
    text: defaultProps.text,
    filterMap: defaultProps.filterMap,
    filterTagsProps: defaultProps.filterTagsProps,
    filterTagsEvents: defaultProps.filterTagsEvents
}


const Aside = ({
    text,
    asideProps,
    asideEvents,
    children
}) => {
    return (
        <div className="container__left cmp-search__sort-filter">
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
                <Sort
                    sortValue={asideProps.sortValue}
                    sortHandler={asideEvents.onSort}
                    text={text} />
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
    if (menuProps.showContentTypeMenu) {
        return (
            <ContentTypeMenu
                heading={menuProps.heading}
                items={contentTypeMenuProps.items}
                onClick={contentTypeMenuEvents.onContentTypeItemClick} />
        );
    }

    const filterTags = FilterTagList({
        text,
        filterMap,
        filterTagsProps,
        filterTagsEvents
    });

    if (menuProps.showFacetMenu) {
        return (
            <FacetMenu
                heading={menuProps.heading}
                selectedValue={facetMenuProps.selectedValue}
                previousIcon={facetMenuProps.previousIcon}
                filterTags={filterTags}
                onClear={facetMenuEvents.onContentTypeRemoval}>
                    
                <Filter
                    facets={subFacetFiltersProps.items}
                    text={text}
                    filterMap={subFacetFiltersProps.filterMap}
                    defaultFacet={subFacetFiltersProps.defaultFacet}
                    selectHandler={subFacetFiltersEvents.onFilterSelect}
                    selectedFacets={subFacetFiltersProps.selectedFacets}
                    contentType={subFacetFiltersProps.contentType}
                    facetGroupsSelectedOrder={subFacetFiltersProps.facetGroupsSelectedOrder}
                    collapseAllFilters={subFacetFiltersProps.collapseAllFilters}
                    activeIndex={subFacetFiltersProps.activeIndex}
                    onGroupClick={subFacetFiltersEvents.onGroupClick} />

            </FacetMenu>
        );
    }
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


const SkuResults = ({
    items,
    skuConfig,
    onItemClick
}) => {
    const skuData = Array.isArray(items)
        ? items.map(item => {
            return {
                code: item.skucode,
                category_facet: item.category_facet,
                contenttype_facet: item.contenttype_facet,
                skuPageHref: item.url,
                formattedPrice: item.displayprice,
                primaryImageAlt: item.title,
                primaryImageThumbnail: item.thumbnail,
                discontinued: item.status !== 'Active', // covers DiscontinueNoReplacement, DiscontinueWithReplacement, ObsoleteNoReplacement, and ObsoleteWithReplacement
                replacementskuurl: item.replacementskuurl,
                replacementskucode: item.replacementskucode,
                title: item.title,
            };
        }): [];

    return (
        <SkuList
            skuConfig={skuConfig}
            data={skuData}
            onItemClick={onItemClick} />
    );
}

SkuResults.propTypes = {
    skuConfig: propTypes.skuConfig,
    items: PropTypes.any,
    onItemClick: PropTypes.func.isRequired
};

SkuResults.defaultProps = {
    skuConfig: defaultProps.skuConfig,
    items: [],
    onItemClick: () => {}
};


const ResultsContent = ({
    text, 
    skuConfig,
    searchParams,
    resultsProps,
    resultsEvents
}) => {
    const items = resultsProps.items[searchParams.page];

    if (resultsProps.isSkuList) {
        return (
            <SkuResults
                items={items}
                skuConfig={skuConfig}
                onItemClick={resultsEvents.onResultsItemClick} />
        );
    }

    return (
        <Results
            results={items}
            nextIcon={text.nextIcon}
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

    return (
        <ReactPaginate
            pageCount={resultsProps.pagination.amount}
            forcePage={resultsProps.pagination.current ? resultsProps.pagination.current - 1 : 0}
            pageRangeDisplayed={8}
            marginPagesDisplayed={1}
            containerClassName="paginate__container"
            onPageChange={num => resultsEvents.onPageChange(num, 'clicked' )}
            breakLabel={'…'}
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
    skuConfig,
    searchParams,
    categoryProps, 
    categoryEvents,
    showSortFilterProps,
    showSortFilterEvents,
    asideProps,
    filterTagsProps,
    filterTagsEvents,
    resultsProps,
    resultsEvents
}) => {
    return (
        <div className="cmp-search__container">
            <div className="cmp-search__container__header cleafix">
                <CategoryDropdown
                    categoryDownIcon={text.downIcon}
                    categoryIsSearchable={false}
                    categoryOnChange={categoryEvents.onCategoryDropdownChange}
                    categoryOptions={categoryProps.categories}
                    categoryValue={categoryProps.activeIndex} />

                <BtnShowSortFilter
                    text={text}
                    setupFilters={showSortFilterEvents.onSetupFilters}
                    resetToSavedState={showSortFilterEvents.onResetToSavedState}
                    collapseFilters={showSortFilterProps.collapseFilters}
                    onClose={showSortFilterEvents.onClose} />  
            </div>
            <div className="cmp-search__sorted-container">
                <div className="cmp-search__sorted-by">
                    {text.sortedBy}:{' '}
                    {asideProps.sortByText === 'most-relevant'
                        ? text.sortByBestMatch 
                        : text.sortByMostRecent}
                </div>

                <FilterTagList 
                    text={text}
                    filterMap={filterMap}
                    filterTagsProps={filterTagsProps}
                    filterTagsEvents={filterTagsEvents} />
            </div>

            <ResultsContent
                text={text}
                filterMap={filterMap}
                skuConfig={skuConfig}
                searchParams={searchParams}
                resultsProps={resultsProps}
                resultsEvents={resultsEvents} />

            <Pagination
                resultsProps={resultsProps}
                resultsEvents={resultsEvents}
                nextIcon={text.nextIcon}
                previousIcon={text.previousIcon} />
        </div>
    );
}

ResultsBody.propTypes = {
    text: propTypes.text, 
    filterMap: propTypes.filterMap,
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


export { FilterTagList, Aside, Menu, SkuResults, ResultsContent, Pagination, ResultsBody }