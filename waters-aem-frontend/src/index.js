import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';
import TagCloud from './search/components/tagcloud';
import ImageCarousel from './image-carousel';
import MyAccountDropDown from './my-account-dropdown/index';
import LoginStatus from "./scripts/loginStatus";
import SkuDetails from './sku-details';
import SkuList from './sku-list';
import SkuMessage from './sku-shared/views/SkuMessage';
import Video from './video/index';

function getAuthoredDataForSearchBar(c, h) {
    return {
        baseUrl: c.dataset.baseUrl,
        searchPath: h.dataset.searchPath,
        placeholderTablet: c.dataset.placeholderTablet,
        placeholderMobile: c.dataset.placeholderMobile,
        iconSearch: c.dataset.iconSearch,
        iconClear: c.dataset.iconClear,
        isocode: c.dataset.isocode,
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
        contentType: t.dataset.contentType,
    };
}

const searchBarContainer = document.getElementById('js-search-bar');
const header = document.querySelector('.cmp-header');

if (searchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(searchBarContainer, header);
    ReactDOM.render(
        <SearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholderTablet={data.placeholderTablet}
            placeholderMobile={data.placeholderMobile}
            baseUrl={data.baseUrl}
            isocode={data.isocode}
        />,
        searchBarContainer
    );
}

const searchAppContainer = document.getElementById('js-search-app');

if (searchAppContainer) {
    const text = JSON.parse(
        document.getElementById('search-results-translations-json').innerHTML
    );

    const filterMap = JSON.parse(
        document.getElementById('search-results-categories-json').innerHTML
    );

    const data = getAuthoredDataForSearchApp(searchAppContainer);
    ReactDOM.render(
        <Search
            defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
            searchDefaults={{ rows: 25 }}
            searchServicePath={data.searchPath}
            searchLocale={data.locale}
            searchText={text}
            filterMap={filterMap}
            isocode={data.isocode}
        />,
        searchAppContainer
    );
}

const tagCloudContainers = document.querySelectorAll('.cmp-tag-cloud');

if (tagCloudContainers) {
    for (var i = 0; i < tagCloudContainers.length; i++) {
        const json = JSON.parse(
            tagCloudContainers[i].getAttribute('data-json')
        );
        const data = getAuthoredDataForTagCloud(header, tagCloudContainers[i]);
        ReactDOM.render(
            <TagCloud
                tagCloudTitle={data.tagTitle}
                searchPath={data.searchPath}
                keywords={json}
                contentType={data.contentType}
            />,
            tagCloudContainers[i]
        );
    }
}

const imageGalleryContainers = Array.from(
    document.querySelectorAll('.cmp-image-gallery')
);

if (imageGalleryContainers) {
    imageGalleryContainers.forEach(container => {
        const json = JSON.parse(container.getAttribute('data-json'));

        ReactDOM.render(
            <ImageCarousel
                templates={json.templates}
                widths={json.widths}
                alt={json.alt}
                zoomInIcon="/content/dam/waters/en/brand-assets/icons/zoom-in.svg"
                zoomOutIcon="/content/dam/waters/en/brand-assets/icons/zoom-out.svg"
            />,
            container
        );
    });
}

const skuDetailsContainer = document.querySelector(
    '.cmp-sku-details__ecom'
);
const skuDetailsConfig = JSON.parse(
    document.getElementById('commerce-configs-json').innerHTML
);

let skuData, skuDetailsListPrice;
if(document.querySelector('.cmp-sku-details__ecom')){ 
    // If a product is discontinued, the ecom class never gets added,
    // but not having a price is a valid option for some products
    // This check allows us to pass in a price of undefined without breaking the frontend
    skuData = document.querySelector('.cmp-sku-details__ecom');
    skuDetailsListPrice = skuData.dataset.price;
}

if (skuDetailsContainer) {
    const skuNumber = skuData.dataset.skuCode;
    const skuTitle = skuData.dataset.skuTitle;
    const skuDiscontinued = skuData.dataset.discontinued;
    const replacementSkuCode = skuData.dataset.replacementSkuCode;
    const replacementSkuHref = skuData.dataset.replacementSkuHref;

    ReactDOM.render(<SkuDetails config={skuDetailsConfig} price={skuDetailsListPrice} skuNumber={skuNumber} titleText={skuTitle} discontinued={skuDiscontinued} replacementSkuCode={replacementSkuCode} replacementSkuHref={replacementSkuHref}/>, skuDetailsContainer);
}


const skuListContainer = document.querySelector('.cmp-sku-list')

if (skuListContainer) {
    const skuListData = JSON.parse(
        skuListContainer.dataset.json
    );

    ReactDOM.render(<SkuList skuConfig={skuDetailsConfig} data={skuListData}/>, skuListContainer);
}


const MyAccountDropDownContainer = document.querySelector('.top-bar__nav__user__dropdown');

if (header && MyAccountDropDownContainer) {
    const config = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML)
    const newConfig = Object.assign({}, config.modalInfo, {
        title: LoginStatus.getGreeting()
    });
    const updatedModel = {
        modalInfo: newConfig
    }
    ReactDOM.render(<MyAccountDropDown config={updatedModel} />, MyAccountDropDownContainer);
}


const skuUnavailableContainer = document.querySelector('.cmp-notification-wrapper');

if(skuUnavailableContainer) {
    if(skuUnavailableContainer.dataset.replacementcode){
        let replacementSkuCode, replacementSkuHref, skuMessageText;
        if(skuUnavailableContainer.dataset.replacementcode){
            replacementSkuCode = skuUnavailableContainer.dataset.replacementcode;
        }
        if(skuUnavailableContainer.dataset.replacementSkuHref){
            replacementSkuHref = skuUnavailableContainer.dataset.replacementSkuHref;
        }

        const replacementSkuIcon = skuDetailsConfig.skuInfo.lowStockIcon;

        if(replacementSkuCode && replacementSkuHref){
            skuMessageText = skuDetailsConfig.skuInfo.discontinuedWithReplacementWithCode;
        } else {
            skuMessageText = skuDetailsConfig.skuInfo.discontinuedNoReplacementCode;
        }
        
        const skuDetailsUnavailableBindingContainer = document.querySelector('#cmp-sku-details-replacement')
        
        ReactDOM.render(
            <SkuMessage 
                icon={replacementSkuIcon} 
                message={skuMessageText} 
                link={replacementSkuHref}
                linkMessage={replacementSkuCode} 
            />, 
            skuDetailsUnavailableBindingContainer
        );
    }
}
    

const videoContainers = Array.from(
    document.querySelectorAll('.cmp-video')
);

if (videoContainers) {
    videoContainers.forEach(container => {

        const videoContainer = container.querySelector('.video-wrapper');
        const videoConfig = container.querySelector('.video-configs-json');

        if (videoContainer && videoConfig) { 
            const json = JSON.parse(videoConfig.innerHTML);

            ReactDOM.render(
                <Video videoConfig={json.videoConfig} ref={(ourComponent) => {
                    if (window.cmpVideos) {
                        window.cmpVideos.push(ourComponent);
                    } else { 
                        window.cmpVideos = [ourComponent];
                    }
                }} />,
                videoContainer
            );
        }
    });
}