import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import MyAccountDropDown from './my-account-dropdown/index';
import SearchBar from './search/components/searchbar';


function getAuthoredDataForSearchBar(c, h) {
    return {
        baseUrl: c.dataset.baseUrl,
        searchPath: h.dataset.searchPath,
        placeholderTablet: c.dataset.placeholderTablet,
        placeholderMobile: c.dataset.placeholderMobile,
        iconSearch: c.dataset.iconSearch,
        iconClear: c.dataset.iconClear,
        isocode: c.dataset.isocode,
        customStyle: c.dataset.customStyle || '',
        clearLabel: c.dataset.clearLabel || '',
        searchLabel: c.dataset.searchLabel || '',
        autoSuggestLabel: c.dataset.autoSuggestLabel || ''
    };
}


const MyAccountDropDownContainer = document.querySelector(
    '.top-bar__nav__user__dropdown'
);
const searchBarContainer = document.getElementById('js-search-bar');
const header = document.querySelector('.cmp-header');
const headerSearchBarContainer = document.getElementById('header-search-bar');

if (header && MyAccountDropDownContainer) {
    const config = JSON.parse(
        document.getElementById('account-modal-configs-json').innerHTML
    );
    const commerceConfigs = document.getElementById('commerce-configs-json');
    const isEditMode = document.getElementById("header") ? document.getElementById("header").hasAttribute("data-is-edit-mode") : false;
    let eProcSetupFailure = {};
    if (commerceConfigs) {
        eProcSetupFailure = JSON.parse(commerceConfigs.innerHTML);
    }

    ReactDOM.render(
        <MyAccountDropDown config={config} eProcSetupFailure={eProcSetupFailure.setupFailure || {}} isEditMode={isEditMode} />,
        MyAccountDropDownContainer
    );
}

if (searchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(searchBarContainer, header);
    const searchLabels = {
        clear: data.clearLabel,
        search: data.searchLabel,
        autoSuggest: data.autoSuggestLabel,
    }
    ReactDOM.render(
        <SearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholderTablet={data.placeholderTablet}
            placeholderMobile={data.placeholderMobile}
            baseUrl={data.baseUrl}
            isocode={data.isocode}
            labels={searchLabels}
        />,
        searchBarContainer
    );
}

if (headerSearchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(headerSearchBarContainer, header);
    const searchLabels = {
        clear: data.clearLabel,
        search: data.searchLabel,
        autoSuggest: data.autoSuggestLabel,
    }
    ReactDOM.render(
        <SearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholderTablet={data.placeholderTablet}
            placeholderMobile={data.placeholderMobile}
            baseUrl={data.baseUrl}
            isocode={data.isocode}
            customStyle={data.customStyle}
            labels={searchLabels}
        />,
        headerSearchBarContainer
    );
}