// React Search Application
import React, { useState } from 'react';
import Search from './search';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const SearchApp = props => {
    return (
        <>
            <Router>
                <Route
                    path=""
                    render={() => (
                        <ErrorBoundary>
                            <Search
                                defaultFacet={props.defaultFacet}
                                searchDefaults={props.searchDefaults}
                                searchServicePath={props.searchServicePath}
                                searchText={props.searchText}
                                searchLocale={props.searchLocale}
                                filterMap={props.filterMap}
                                isocode={props.isocode}
                            />
                        </ErrorBoundary>
                    )}
                />
            </Router>
        </>
    );
};

export default SearchApp;
