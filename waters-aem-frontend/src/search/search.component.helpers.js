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
import props from './__mocks__/en_US';

const FilterTagList = props => {
    const isKeywordSpecified = props.filterTagsProps.keyword && props.filterTagsProps.keyword !== parameterDefaults.keyword;
    const isContentTypeSelected = Object.entries(props.filterTagsProps.contentTypeSelected).length !== 0 && props.filterTagsProps.contentTypeSelected.facetTranslation

    if (!isKeywordSpecified && !isContentTypeSelected) {
        return <div className="cmp-search-filters__emptytags" />;
    }

    const keyword = props.filterTagsProps.spell_suggestion ? props.filterTagsProps.spell_suggestion : props.filterTagsProps.keyword;

    const keyWordTag = isKeywordSpecified 
        ? <KeywordTag
                keyword={keyword}
                text={props.text}
                onRemove={props.filterTagsEvents.onKeywordRemove} /> 
        : <></>;

    const contentTypeTag = isContentTypeSelected
        ? <ContentTypeTag
                text={props.text}
                selected={props.filterTagsProps.contentTypeSelected}
                onRemove={props.filterTagsEvents.onContentTypeRemove} />
        : <></>;

    const subFacetTags = Object.entries(props.filterTagsProps.selectedFacets).length !== 0 
        ? <SubFacetTags
                text={props.text}
                selectedFacets={props.filterTagsProps.selectedFacets}
                facets={props.filterTagsProps.facets}
                removeTag={props.filterTagsEvents.onSubFacetRemove}
                filterMap={props.filterMap}
                defaultFacet={props.filterTagsProps.contentType}  />
        : <></>;

    return (
        <div className="cmp-search-filters__tags clearfix">
            <ClearAllTag
                text={props.text}
                onRemove={props.filterTagsEvents.onClearAll} />
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

const Aside = props => {
    return (
        <div className="container__left cmp-search__sort-filter">
            <BtnHideSortFilter
                text={props.text}
                onClick={props.asideEvents.onHideSortFilterClick} />

            <BtnApplySortFilter
                text={props.text}
                applyFilters={props.asideEvents.onApplySortFilter}
                isPristine={props.asideProps.sortFilterIsPristine}
                count={props.asideProps.count} />

            <BtnDoneSortFilter
                text={props.text}
                collapseFilters={props.asideEvents.onCollapseFilters} />
            <div className="cmp-search__sort-filter__container">
                <Sort
                    sortValue={props.asideProps.sortValue}
                    sortHandler={props.asideEvents.onSort}
                    text={props.text} />
                {props.children}
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


const Menu = props => {
    if (props.menuProps.showContentTypeMenu) {
        return (
            <ContentTypeMenu
                heading={props.menuProps.heading}
                items={props.contentTypeMenuProps.items}
                onClick={props.contentTypeMenuEvents.onContentTypeItemClick} />
        );
    }

    const filterTags = FilterTagList({
        text: props.text,
        filterMap: props.filterMap,
        filterTagsProps: props.filterTagsProps,
        filterTagsEvents: props.filterTagsEvents
    });

    if (props.menuProps.showFacetMenu) {
        return (
            <FacetMenu
                heading={props.menuProps.heading}
                selectedValue={props.facetMenuProps.selectedValue}
                previousIcon={props.facetMenuProps.previousIcon}
                filterTags={filterTags}
                onClear={props.facetMenuEvents.onContentTypeRemoval}>
                    
                <Filter
                    facets={props.subFacetFiltersProps.items}
                    text={props.text}
                    filterMap={props.subFacetFiltersProps.filterMap}
                    defaultFacet={props.subFacetFiltersProps.defaultFacet}
                    selectHandler={props.subFacetFiltersEvents.onFilterSelect}
                    selectedFacets={props.subFacetFiltersProps.selectedFacets}
                    contentType={props.subFacetFiltersProps.contentType}
                    facetGroupsSelectedOrder={props.subFacetFiltersProps.facetGroupsSelectedOrder}
                    collapseAllFilters={props.subFacetFiltersProps.collapseAllFilters}
                    activeIndex={props.subFacetFiltersProps.activeIndex}
                    onGroupClick={props.subFacetFiltersEvents.onGroupClick} />

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

/*
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

const ResultsContent = ({
    text, 
    filterMap,
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
*/

//export { FilterTagList, Aside, Menu, ResultsBody }
export { FilterTagList, Aside, Menu }