import React from 'react';
import { propTypes, defaultProps } from './search.component.props';
import { Aside, Menu, ResultsBody } from './search.component.helpers';
import CategoryTabs from './components/categories-tabs';
import ResultsCount from './components/results-count';

const SearchComponent = props => {
    return (
        <>
            <CategoryTabs
                items={props.categoryProps.categories}
                activeIndex={props.categoryProps.activeIndex}
                onClick={props.categoryEvents.onCategoryTabClick} />

            <div>
                <div className="overlay" />
                <ResultsCount 
                    {...props.resultsProps}
                    text={props.text}
                    onRelatedSuggestionClick={props.resultsEvents.onRelatedSuggestionClick}  />
                <Aside 
                    sortFilterIsPristine={props.asideProps.sortFilterIsPristine}
                    text={props.text}
                    count={props.asideProps.count}
                    sortValue={props.asideProps.sortByValue}
                    onHideSortFilterClick={props.asideEvents.onHideSortFilterClick}
                    onApplySortFilter={props.asideEvents.onApplySortFilter}
                    onCollapseFilters={props.asideEvents.onCollapseFilters}
                    onSort={props.asideEvents.onSort}>

                    <Menu 
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
                        filterTagsEvents={props.filterTagsEvents} />

                </Aside>

                <ResultsBody
                    text={props.text}
                    filterMap={props.filterMap}
                    categoryProps={props.categoryProps}
                    categoryEvents={props.categoryEvents}
                    showSortFilterProps={props.showSortFilterProps}
                    showSortFilterEvents={props.showSortFilterEvents}
                    asideProps={props.asideProps}
                    filterTagsProps={props.filterTagsProps}
                    filterTagsEvents={props.filterTagsEvents} />
            </div>
        </>
    );
}

SearchComponent.propTypes = propTypes;
SearchComponent.defaultProps = defaultProps;

export default SearchComponent;