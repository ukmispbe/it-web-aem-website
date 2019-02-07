// React Search Application
import React from 'react';
import Search from './search';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const SearchApp = props => {
    return (
        <Router>
            <Route
                path=""
                render={() => (
                    <Search
                        defaultFacet={props.defaultFacet}
                        searchDefaults={props.searchDefaults}
                    />
                )}
            />
        </Router>
    );
};

export default SearchApp;
