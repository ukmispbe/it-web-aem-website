import React from 'react';
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

    const keyWordTag = isKeywordSpecified 
        ? <KeywordTag
                keyword={filterTagsProps.spell_suggestion ? filterTagsProps.spell_suggestion : filterTagsProps.keyword}
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

const Aside = props => {
    const SortFilterButtons = () => {
        return (
            <>
                <BtnHideSortFilter
                    text={props.text}
                    onClick={props.onHideSortFilterClick} />

                <BtnApplySortFilter
                    text={props.text}
                    applyFilters={props.onApplySortFilter}
                    isPristine={props.sortFilterIsPristine}
                    count={props.count} />

                <BtnDoneSortFilter
                    text={props.text}
                    collapseFilters={props.onCollapseFilters} />
            </>
        );
    };

    return (
        <div className="container__left cmp-search__sort-filter">
            <SortFilterButtons />
            <div className="cmp-search__sort-filter__container">
                <Sort
                    sortValue={props.sortValue}
                    sortHandler={props.onSort}
                    text={props.text} />
                {props.children}
            </div>
        </div>
    );
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

const ResultsBody = ({
    text, 
    filterMap,
    categoryProps, 
    categoryEvents,
    showSortFilterProps,
    showSortFilterEvents,
    asideProps,
    filterTagsProps,
    filterTagsEvents
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

            Results
        </div>
    );
}

export { FilterTagList, Aside, Menu, ResultsBody }