import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';
import TagCloud from './search/components/tagcloud';
import ImageCarousel from './image-carousel';
// import Modal from './modal';
import SkuDetails from './sku-details';

function getAuthoredDataForSearchBar(c, h) {
    return {
        baseUrl: c.dataset.baseUrl,
        searchPath: h.dataset.searchPath,
        placeholder: c.dataset.placeholder,
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
const header = document.querySelector('.cmp-external-header');

if (searchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(searchBarContainer, header);
    ReactDOM.render(
        <SearchBar
            iconSearch={data.iconSearch}
            iconClear={data.iconClear}
            searchPath={data.searchPath}
            placeholder={data.placeholder}
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
                zoomInIcon="/content/dam/waters/brand-assets/icons/zoom-in.svg"
                zoomOutIcon="/content/dam/waters/brand-assets/icons/zoom-out.svg"
            />,
            container
        );
    });
}

// const modalContainer = document.querySelector('.cmp-modal-container');

// if (modalContainer) {
//     window.cmp = {};
//     ReactDOM.render(<Modal />, modalContainer);
// }

// const modalOpenButton = document.querySelectorAll('.cmp-modal-btn');

// if (modalOpenButton.length) {
//     modalOpenButton.forEach(btn => {
//         const theme = btn.dataset.theme;
//         const configElement = document.getElementById(btn.dataset.config);
//         const config = JSON.parse(configElement.innerHTML);

//         btn.addEventListener('click', () => {
//             window.cmp.modal.showModal(theme, config);
//         });
//     });
// }

const skuDetailsContainer = document.querySelector('.cmp-sku-details__stockcontainer');

if (skuDetailsContainer) {
    ReactDOM.render(
        <SkuDetails 
            sku="WAT036980"
            name="Nova-Pak Silica Cartridge, 60Å, 4 µm, 3.9 mm X 150 mm, 1/pk"
            quantity={20}
        />, skuDetailsContainer);
}