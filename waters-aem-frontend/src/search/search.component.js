import React from 'react';
import { propTypes, defaultProps } from './search.component.props';
import { Aside, Menu, ResultsBody } from './search.component.helpers';
import SearchBreadcrumb from '../common/search-breadcrumb';

const SearchComponent = props => {
    // Append Facet Description & spelling of keyword
    props.searchParams.contentTypeSelected = props.filterTagsProps.contentTypeSelected;
    props.searchParams.spell_suggestion = props.filterTagsProps.spell_suggestion;

    // Check if the All Category isn't authored 
    if (props.filterMap) {
        const facet = props.filterMap.find(item => item.categoryFacetValue === "All");
        if (facet === undefined) {
            // Remove the All Category in props.categoryProps.categories if it exists
            if (props.categoryProps.categories.length !== 0 && props.categoryProps.categories[0].name === "All") {
                props.categoryProps.categories.splice(0, 1);  
            }
        }
    }

    // Determine the ActiveIndex from the Category
    if (props.categoryProps.categories) {
        const activeIndex = props.categoryProps.categories.findIndex(item => item.name === props.category);
        props.categoryProps.activeIndex = activeIndex;
    }

    return (
        <>
            <SearchBreadcrumb 
                text={props.text}
                searchParams={props.searchParams}
                clearSessionStore={props.clearSessionStore}/>
            <div>
                <div className="overlay" />
                <Aside 
                    sortFilterIsPristine={props.asideProps.sortFilterIsPristine}
                    text={props.text}
                    asideProps={props.asideProps}
                    asideEvents={props.asideEvents}
                    items={props.categoryProps.categories}
                    activeIndex={props.categoryProps.activeIndex}
                    categoryClick={props.categoryEvents.onCategoryTabClick}
                    clearSessionStore={props.clearSessionStore}
                    >

                    {props.category !== "All" && <Menu 
                        text={props.text}
                        filterMap={props.filterMap}
                        menuProps={props.menuProps}
                        contentTypeMenuProps={props.contentTypeMenuProps}
                        contentTypeMenuEvents={props.contentTypeMenuEvents}
                        facetMenuProps={props.facetMenuProps}
                        facetMenuEvents={props.facetMenuEvents}
                        subFacetFiltersProps={props.subFacetFiltersProps}
                        subFacetFiltersEvents={props.subFacetFiltersEvents}
                        filterTagsProps={props.filterTagsProps}
                        filterTagsEvents={props.filterTagsEvents} />}

                </Aside>

                <ResultsBody
                    text={props.text}
                    filterMap={props.filterMap}
                    skuConfig={props.skuConfig}
                    searchParams={props.searchParams}
                    categoryProps={props.categoryProps}
                    categoryEvents={props.categoryEvents}
                    showSortFilterProps={props.showSortFilterProps}
                    showSortFilterEvents={props.showSortFilterEvents}
                    asideProps={props.asideProps}
                    asideEvents={props.asideEvents}
                    filterTagsProps={props.filterTagsProps}
                    filterTagsEvents={props.filterTagsEvents}
                    resultsProps={props.resultsProps}
                    resultsEvents={props.resultsEvents}
                    isEprocurementUser={props.isEprocurementUser} />
            </div>
        </>
    );
}

SearchComponent.propTypes = propTypes;
SearchComponent.defaultProps = defaultProps;

export default SearchComponent;