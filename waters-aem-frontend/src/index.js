import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';
import TagCloud from './search/components/tagcloud';

function getAuthoredDataForSearchBar(c, h) {
    return {
        searchPath: h.dataset.searchPath,
        placeholder: c.dataset.placeholder,
        icon: c.dataset.iconUrl,
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

function getAuthoredDataForTagCloud(h, t){
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
            iconUrl={data.icon}
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
    console.log(text);
    const data = getAuthoredDataForSearchApp(searchAppContainer);
    ReactDOM.render(
        <Search
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
            searchServicePath={data.searchPath}
            searchText={text}
        />,
        searchAppContainer
    );
}

const tagCloudContainer = document.getElementById('js-tag-cloud');
const header = document.querySelector('.cmp-external-header');

if (tagCloudContainer) {
    const tagFacets = JSON.parse(
        document.getElementById('tag-cloud-facets-json').innerHTML
    );
    console.log(tagFacets);
    const data = getAuthoredDataForTagCloud(header, tagCloudContainer);
    ReactDOM.render(
        <TagCloud
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
            searchServicePath={data.searchPath}
            tagCloudTitle={data.tagTitle}
            tagFacets={text}
        />,
        tagCloudContainer
    );
}
