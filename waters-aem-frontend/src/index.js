import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';

ReactDOM.render(
    <SearchBar
        iconUrl="/info/scg.svg"
        searchPath="http://google.com"
        placeholder="Search by keyword"
    />,
    document.getElementById('js-search-bar')
);
