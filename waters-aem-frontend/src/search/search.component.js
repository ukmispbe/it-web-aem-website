import React from 'react';
import { propTypes, defaultProps } from './search.component.props';
import { Aside, Menu, ResultsBody } from './search.component.helpers';
import Tabs from '../navigation/tabs';
import ResultsCount from './components/results-count';

const SearchComponent = props => {
    return (
        <>
            {!props.isEprocurementUser && <Tabs className="cmp-search__categories-tabs"
                items={props.categoryProps.categories}
                activeIndex={props.categoryProps.activeIndex}
                onClick={props.categoryEvents.onCategoryTabClick} />}

            <div>
                <div className="overlay" />
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