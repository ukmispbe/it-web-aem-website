import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';

function getAuthoredDataForSearchBar(c) {
    return {
        searchPath: c.dataset.baseUrl,
        placeholder: c.dataset.placeholder,
        icon: c.dataset.iconUrl,
    };
}
function getAuthoredDataForSearchApp() {}

const searchBarContainer = document.getElementById('js-search-bar');

if (searchBarContainer) {
    const data = getAuthoredDataForSearchBar(searchBarContainer);
    ReactDOM.render(
        <SearchBar
            iconUrl={data.icon}
            searchPath={data.searchPath}
            placeholder={data.placeholder}
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
