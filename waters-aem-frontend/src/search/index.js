import React from 'react';
import SearchContainer from './search.container';
import { SearchService, parameterDefaults } from './services/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const SearchApp = props => {
    const search = new SearchService(
        props.isocode,
        props.searchServicePath,
        parameterDefaults.page,
        props.searchDefaults.rows,
        parameterDefaults.sort,
        undefined,
        () => {}
    );
    
    return (
        <>
            <Router>
                <Route
                    path=""
                    render={() => (
                        <ErrorBoundary>
                            <SearchContainer
                                defaultFacet={props.defaultFacet}
                                searchDefaults={props.searchDefaults}
                                searchServicePath={props.searchServicePath}
                                searchText={props.searchText}
                                searchLocale={props.searchLocale}
                                filterMap={props.filterMap}
                                isocode={props.isocode}
                                search={search}
                            />
                        </ErrorBoundary>
                    )}
                />
            </Router>
        </>
    );
};

export default SearchApp;
