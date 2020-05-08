import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './search/components/searchbar';
import Search from './search/index';
import TagCloud from './search/components/tagcloud';
import ImageCarousel from './image-carousel';
import MyAccountDropDown from './my-account-dropdown/index';

import SkuDetails from './sku-details';
import SkuList from './sku-list';
import SkuMessage from './sku-message';
import Form from './forms/form';
import {
    registrationSubmit,
    resetPasswordSubmit,
    troubleSigningInSubmit,
    signInSubmit,
    chooseAccountSubmit

} from './forms/services/submit';
import Video from './video/index';
import Chat from './chat';
import DetailTiles from './detail-tiles';
import DigitalData from './scripts/DigitalData';
import WeChat from './wechat';
import MyAccountRouter from './my-account';
import CountrySelector from './country-selector';

if (process.env.NODE_ENV !== 'production') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React);
}

const globalTranslationsScript = document.getElementById('global-translations-json');
const globalTranslations = globalTranslationsScript ? JSON.parse(globalTranslationsScript.innerHTML) : {};

const headerRef = document.getElementById("header");
const headerData = headerRef 
    ? {
        userDetailsUrl: headerRef.dataset.userDetailsUrl
    } 
    : {
        userDetailsUrl: ""
    };

function getAuthoredDataForSearchBar(c, h) {
    return {
        baseUrl: c.dataset.baseUrl,
        searchPath: h.dataset.searchPath,
        placeholderTablet: c.dataset.placeholderTablet,
        placeholderMobile: c.dataset.placeholderMobile,
        iconSearch: c.dataset.iconSearch,
        iconClear: c.dataset.iconClear,
        isocode: c.dataset.isocode
    };
}
function getAuthoredDataForSearchApp(c, s) {
    return {
        searchPath: c.dataset.baseUrl,
        searchText: s,
        isocode: c.dataset.isocode,
        locale: c.dataset.locale
    };
}

function getAuthoredDataForTagCloud(h, t) {
    return {
        searchPath: h.dataset.searchPath,
        tagTitle: t.dataset.title,
        category: t.dataset.category,
        contentType: t.dataset.contentType
    };
}

function getAuthoredDataForChat(c) {
    return {
        url: c.dataset.chatUrl,
        statusApi: c.dataset.chatStatusApi,
        icon: c.dataset.chatIcon,
        availableText: c.dataset.chatAvailableText,
        unavailableText: c.dataset.chatUnavailableText,
        text: c.dataset.chatText,
        buttonText: c.dataset.chatButtonText
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
                category={data.category}
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

const skuDetailsContainer = document.querySelector('.cmp-sku-details__ecom');
const skuDetailsConfig = JSON.parse(
    document.getElementById('commerce-configs-json').innerHTML
);

let skuData, skuDetailsListPrice;
if (document.querySelector('.cmp-sku-details__ecom')) {
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
    const skuCountryRestricted = skuData.dataset.countryRestricted;
    const replacementSkuCode = skuData.dataset.replacementSkuCode;
    const replacementSkuHref = skuData.dataset.replacementSkuHref;

    ReactDOM.render(
        <SkuDetails
            config={skuDetailsConfig}
            price={skuDetailsListPrice}
            countryRestricted={skuCountryRestricted}
            skuNumber={skuNumber}
            titleText={skuTitle}
            discontinued={skuDiscontinued}
            replacementSkuCode={replacementSkuCode}
            replacementSkuHref={replacementSkuHref}
        />,
        skuDetailsContainer
    );
}

const skuListContainer = document.querySelector('.cmp-sku-list');

if (skuListContainer) {
    const skuListData = JSON.parse(skuListContainer.dataset.json);

    const skuListTitle = skuListContainer.dataset.componenttitle
        ? skuListContainer.dataset.componenttitle
        : '';

    ReactDOM.render(
        <SkuList
            skuConfig={skuDetailsConfig}
            data={skuListData}
            title={skuListTitle}
        />,
        skuListContainer
    );
}

const MyAccountDropDownContainer = document.querySelector(
    '.top-bar__nav__user__dropdown'
);

if (header && MyAccountDropDownContainer) {
    const config = JSON.parse(
        document.getElementById('account-modal-configs-json').innerHTML
    );

    ReactDOM.render(
        <MyAccountDropDown config={config} />,
        MyAccountDropDownContainer
    );
}

const skuUnavailableContainer = document.querySelector(
    '.cmp-notification-wrapper'
);

if (skuUnavailableContainer) {
    if (skuUnavailableContainer.dataset.replacementcode) {
        let replacementSkuCode, replacementSkuHref, skuMessageText;
        if (skuUnavailableContainer.dataset.replacementcode) {
            replacementSkuCode =
                skuUnavailableContainer.dataset.replacementcode;
        }
        if (skuUnavailableContainer.dataset.replacementSkuHref) {
            replacementSkuHref =
                skuUnavailableContainer.dataset.replacementSkuHref;
        }

        const replacementSkuIcon = skuDetailsConfig.skuInfo.lowStockIcon;

        if (replacementSkuCode && replacementSkuHref) {
            skuMessageText =
                skuDetailsConfig.skuInfo.discontinuedWithReplacementWithCode;
        } else {
            skuMessageText =
                skuDetailsConfig.skuInfo.discontinuedNoReplacementCode;
        }

        const skuDetailsUnavailableBindingContainer = document.querySelector(
            '#cmp-sku-details-replacement'
        );

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

const videoContainers = Array.from(document.querySelectorAll('.cmp-video'));

if (videoContainers) {
    videoContainers.forEach(container => {
        const videoContainer = container.querySelector('.video-wrapper');
        const videoConfig = container.querySelector('.video-configs-json');

        if (videoContainer && videoConfig) {
            const json = JSON.parse(videoConfig.innerHTML);

            ReactDOM.render(
                <Video
                    videoConfig={json.videoConfig}
                    ref={ourComponent => {
                        if (window.cmpVideos) {
                            window.cmpVideos.push(ourComponent);
                        } else {
                            window.cmpVideos = [ourComponent];
                        }
                    }}
                />,
                videoContainer
            );
        }
    });
}

const registrationFormContainer = document.getElementById(
    'js-registration-form'
);

if (registrationFormContainer) {
    const config = JSON.parse(
        document.getElementById('cmp-registration-form').innerHTML
    );

    const swapFirstAndLastNames = () => {
        const indexofFirstName = config.fields.map(e => e.name).indexOf('firstName');
        const indexofLastName = config.fields.map(e => e.name).indexOf('lastName');
        if (indexofFirstName !== -1 && indexofLastName!== -1) {
            const temp = config.fields[indexofFirstName];
            config.fields[indexofFirstName] = config.fields[indexofLastName];
            config.fields[indexofLastName] = temp;
        }
    }

    if (config.formName === "registration" && (digitalData.page.country.toLowerCase() ==="jp" || digitalData.page.country.toLowerCase() === "cn" || digitalData.page.country.toLowerCase() === "tw" || digitalData.page.country.toLowerCase() === "kr")) {
        swapFirstAndLastNames();
    }



    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Form
            config={config}
            submitFn={registrationSubmit}
            callback={headerData.userDetailsUrl}
            isocode={DigitalData.language}
        />,
        registrationFormContainer
    );
}

const troubleSigningInFormContainer = document.getElementById(
    'cmp-trouble-signing-in-form'
);

if (troubleSigningInFormContainer) {
    const config = JSON.parse(
        document.getElementById('js-trouble-signing-in-form').innerHTML
    );

    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Form
            config={config}
            submitFn={troubleSigningInSubmit}
            isocode={DigitalData.language}
        />,
        troubleSigningInFormContainer
    );
}

const chooseAccountFormContainer = document.getElementById(
    'cmp-choose-account-form'
);

if (chooseAccountFormContainer) {
    let config = JSON.parse(
        document.getElementById('js-choose-account-form').innerHTML
    );

    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Form
            config={config}
            submitFn={chooseAccountSubmit}
            isocode={DigitalData.language}
        />,
        chooseAccountFormContainer
    );
}

const resetPasswordContainer = document.querySelector(
    '.cmp-form-reset-password--attach'
);

if (resetPasswordContainer) {
    const config = JSON.parse(
        document.getElementById('cmp-reset-password-form').innerHTML
    );

    ReactDOM.render(
        <Form config={config} submitFn={resetPasswordSubmit} callback={headerData.userDetailsUrl} />,
        resetPasswordContainer
    );
}

const changePasswordContainer = document.getElementById(
    'changePassword-details-tile'
);

if (changePasswordContainer) {
    const config = JSON.parse(
        document.getElementById('cmp-detail-tiles--changePassword').innerHTML
    );

    ReactDOM.render(<DetailTiles {...config} />, changePasswordContainer);
}

const chatContainer = document.querySelector('.cmp-chat');

if (chatContainer) {
    const data = getAuthoredDataForChat(chatContainer);
    ReactDOM.render(
        <Chat
            url={data.url}
            statusApi={data.statusApi}
            countryCode={skuDetailsConfig.countryCode}
            icon={data.icon}
            availableText={data.availableText}
            unavailableText={data.unavailableText}
            text={data.text}
            buttonText={data.buttonText}
            offlineIcon={skuDetailsConfig.skuInfo.outOfStockIcon}
            onlineIcon={skuDetailsConfig.skuInfo.inStockIcon}
        />,
        chatContainer
    );
}

const shippingDetailsTile = document.getElementById('shipping-details-tile');

if (shippingDetailsTile) {
    const config = JSON.parse(
        document.getElementById('cmp-detail-tiles--shipping').innerHTML
    );

    ReactDOM.render(<DetailTiles {...config} />, shippingDetailsTile);
}

const billingDetailsTile = document.getElementById('billing-details-tile');

if (billingDetailsTile) {
    const config = JSON.parse(
        document.getElementById('cmp-detail-tiles--billing').innerHTML
    );

    ReactDOM.render(<DetailTiles {...config} />, billingDetailsTile);
}

const wechat = document.querySelector('.cmp-wechat');
const wechatContainer = document.querySelector('.cmp-wechat-container');
const wechatJSON = document.getElementById('wechat-json');

if (wechat && wechatContainer && wechatJSON) {
    const config = JSON.parse(wechatJSON.innerHTML);
    ReactDOM.render(<WeChat config={config} />, wechatContainer);
}

const myAccountPage = document.getElementById(
    'my-account'
);

if (myAccountPage) {
    const config = JSON.parse(
        document.getElementById('cmp-my-account').innerHTML
    );

    ReactDOM.render(<MyAccountRouter {...config} />, myAccountPage);
}

const countryModalRoot = document.getElementById('country-selector-root');

if (countryModalRoot) {
    const scriptElement = document.getElementById('country-list-json');
    const countries = scriptElement && scriptElement.innerHTML.trim() ? JSON.parse(scriptElement.innerHTML) : [];

    if (Array.isArray(countries) && countries.length !== 0) {
        ReactDOM.render(<CountrySelector countries={countries} translations={globalTranslations} />, countryModalRoot);
    }
}

const signInFormContainer = document.getElementById("js-signin-form");

if (signInFormContainer) {
    const config = JSON.parse(document.getElementById("cmp-signin-form").innerHTML);

    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Form config={config} submitFn={signInSubmit} isocode={DigitalData.language} callback={headerData.userDetailsUrl} />,
        signInFormContainer
    );
}

