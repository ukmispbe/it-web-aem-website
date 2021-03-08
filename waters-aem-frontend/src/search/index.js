import React from 'react';
import SearchContainer from './search.container';
import { SearchService, parameterDefaults } from './services/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isEprocurementUser, getIsoCode } from '../utils/userFunctions';
import ErrorBoundary from './ErrorBoundary';

import '../styles/search.scss';

const SearchApp = props => {
    const isoCode = (isEprocurementUser() && getIsoCode()) || props.isocode;
    const search = new SearchService(
        isoCode,
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
                                subFacetMap={props.subFacetMap}
                                isocode={isoCode}
                                search={search}
                                baseSignInUrl={props.baseSignInUrl}
                            />
                        </ErrorBoundary>
                    )}
                />
            </Router>
        </>
    );
};

export default SearchApp;
