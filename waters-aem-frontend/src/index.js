import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';

function getAuthoredDataForSearchBar() {}
function getAuthoredDataForSearchApp() {}

const searchBarContainer = document.getElementById('js-search-bar');

if (searchBarContainer) {
    ReactDOM.render(
        <SearchBar
            iconUrl="/info/scg.svg"
            searchPath="http://google.com"
            placeholder="Search by keyword"
        />,
        searchBarContainer
    );
}

const searchAppContainer = document.getElementById('js-search-app');

if (searchAppContainer) {
    ReactDOM.render(
        <Search
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
        />,
        searchAppContainer
    );
}
