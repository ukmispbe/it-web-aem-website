import './styles/global-index.scss';

import './scripts/stickyService';
import './scripts/backtotop';
import './scripts/anchor';
import './scripts/sticky-sort-filter';
import './scripts/sticky-sku-details';
import './scripts/sticky-sku-scroll';
import './scripts/mobile-search-scroll';
import './scripts/navigation-overlay';
import './scripts/navigation';
import './scripts/navigation-level2';
import './scripts/iframe';
import './scripts/backtosearch';
import './scripts/footer';
import './scripts/banner';
import './scripts/breadcrumb';
import './scripts/header';
import './scripts/collapsible';
import './scripts/skulist';
import './scripts/continueButton';
import './scripts/textModifier';
import './scripts/teaser';

import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import MyAccountDropDown from './my-account-dropdown/index';
import HeaderSearchBar from "./header-search-bar";
import HeaderSearchModal from "./header-search-modal";


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
        autoSuggestLabel: c.dataset.autoSuggestLabel || '',
        recentlySearchedLabel: c.dataset.recentlySearchedLabel || '',
        iconDown: c.dataset.iconDown,
        categoryLabel: c.dataset.categoryLabel || '',
    };
}


const MyAccountDropDownContainer = document.querySelector(
    '.top-bar__nav__user__dropdown'
);
const searchBarContainer = document.getElementById('js-search-bar');
const header = document.querySelector('.cmp-header');

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

const headerSearchBarContainer = document.getElementById('header-search-bar');
const headerMobileSearchContainer = document.getElementById('mobile-header-search-container');
const categoriesJson = document.getElementById('header-categories-json');
let categoriesConfig = {};
if (categoriesJson) {
    categoriesConfig = JSON.parse(categoriesJson.innerHTML);
}
if (headerMobileSearchContainer && headerSearchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(headerSearchBarContainer, header);
    const searchLabels = {
        clear: data.clearLabel,
        search: data.searchLabel,
        autoSuggest: data.autoSuggestLabel,
        recentlySearched: data.recentlySearchedLabel,
        categoryLabel: data.categoryLabel,
    }
    ReactDOM.render(
        <HeaderSearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholderTablet={data.placeholderTablet}
            placeholderMobile={data.placeholderMobile}
            baseUrl={data.baseUrl}
            isocode={data.isocode}
            customStyle={data.customStyle}
            labels={searchLabels}
            categories={categoriesConfig.options}
            iconDown={data.iconDown}
        />,
        headerSearchBarContainer
    );

    ReactDOM.render(
        <HeaderSearchModal
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholderTablet={data.placeholderTablet}
            placeholderMobile={data.placeholderMobile}
            baseUrl={data.baseUrl}
            isocode={data.isocode}
            customStyle={data.customStyle}
            iconDown={data.iconDown}
            labels={searchLabels}
            categories={categoriesConfig.options}
        />,
        headerMobileSearchContainer
    );
}