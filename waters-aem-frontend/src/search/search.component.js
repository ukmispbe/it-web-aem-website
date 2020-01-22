import React from 'react';
import { propTypes, defaultProps } from './search.component.props';
import { Aside, Menu, ResultsBody } from './search.component.helpers';
import Tabs from '../navigation/tabs';
import ResultsCount from './components/results-count';

const SearchComponent = props => {
    return (
        <>
            <Tabs className="cmp-search__categories-tabs"
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
                    asideProps={props.asideProps}
                    asideEvents={props.asideEvents}>

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
                    skuConfig={props.skuConfig}
                    searchParams={props.searchParams}
                    categoryProps={props.categoryProps}
                    categoryEvents={props.categoryEvents}
                    showSortFilterProps={props.showSortFilterProps}
                    showSortFilterEvents={props.showSortFilterEvents}
                    asideProps={props.asideProps}
                    filterTagsProps={props.filterTagsProps}
                    filterTagsEvents={props.filterTagsEvents}
                    resultsProps={props.resultsProps}
                    resultsEvents={props.resultsEvents} />
            </div>
        </>
    );
}

SearchComponent.propTypes = propTypes;
SearchComponent.defaultProps = defaultProps;

export default SearchComponent;