import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';

function getAuthoredDataForSearchBar(c, h) {
    return {
        searchPath: h.dataset.searchPath,
        placeholder: c.dataset.placeholder,
        icon: c.dataset.iconUrl,
    };
}
function getAuthoredDataForSearchApp(c) {
    return {
        searchPath: c.baseUrl,
    };
}

const searchBarContainer = document.getElementById('js-search-bar');
const header = document.querySelector('.cmp-external-header');

if (searchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(searchBarContainer, header);
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
    const data = getAuthoredDataForSearchApp(searchAppContainer);
    ReactDOM.render(
        <Search
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
            searchServicePath={data.searchPath}
        />,
        searchAppContainer
    );
}
