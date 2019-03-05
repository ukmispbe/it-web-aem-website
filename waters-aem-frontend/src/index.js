import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';
import TagCloud from './search/components/tagcloud';

function getAuthoredDataForSearchBar(c, h) {
    return {
        searchPath: h.dataset.searchPath,
        placeholder: c.dataset.placeholder,
        iconSearch: c.dataset.iconSearch,
        iconClear: c.dataset.iconClear,
    };
}
function getAuthoredDataForSearchApp(c, s) {
    return {
        searchPath: c.dataset.baseUrl,
        searchText: s,
        isocode: c.dataset.isocode,
        locale: c.dataset.locale,
    };
}

function getAuthoredDataForTagCloud(h, t) {
    return {
        searchPath: h.dataset.searchPath,
        tagTitle: t.dataset.title,
    };
}

const searchBarContainer = document.getElementById('js-search-bar');
const header = document.querySelector('.cmp-external-header');

if (searchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(searchBarContainer, header);
    ReactDOM.render(
        <SearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholder={data.placeholder}
        />,
        searchBarContainer
    );
}

const searchAppContainer = document.getElementById('js-search-app');

if (searchAppContainer) {
    const text = JSON.parse(
        document.getElementById('search-results-translations-json').innerHTML
    );

    const data = getAuthoredDataForSearchApp(searchAppContainer);
    ReactDOM.render(
        <Search
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
            searchServicePath={data.searchPath}
            searchLocale={data.locale}
            searchText={text}
        />,
        searchAppContainer
    );
}

const tagCloudContainer = document.getElementById('js-tag-cloud');

if (tagCloudContainer) {
    var text = JSON.parse(
        document.getElementById('tag-cloud-facets-json').innerHTML
    );

    const data = getAuthoredDataForTagCloud(header, tagCloudContainer);

    ReactDOM.render(
        <TagCloud
            tagCloudTitle={data.tagTitle}
            searchPath={data.searchPath}
            keywords={text}
        />,
        tagCloudContainer
    );
}
