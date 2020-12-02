import React from 'react';
import ReactDOM from 'react-dom';
import HeaderSearchBar from "./header-search-bar";
import HeaderSearchModal from "./header-search-modal";
import Search from './search/index';
import TagCloud from './search/components/tagcloud';
import ImageCarousel from './image-carousel';
import UserGreeting from './user-greetings/UserGreeting';
import QuickOrder from './quick-order/QuickOrder';
import LinkButton from './link-button/LinkButton';
import LegalLinkModal from './legal-link-modal/LegalLinkModal';

import SkuDetails from './sku-details';
import SkuList from './sku-list';
import SkuMessage from './sku-message';
import Form from './forms/form';
import {
    registrationSubmit,
    resetPasswordSubmit,
    troubleSigningInSubmit,
    signInSubmit,
    chooseAccountSubmit,
    contactSupportSubmit

} from './forms/services/submit';
import Video from './video/index';
import Chat from './chat';
import DetailTiles from './detail-tiles';
import DigitalData from './scripts/DigitalData';
import WeChat from './wechat';
import MyAccountRouter from './my-account';
import CountrySelector from './country-selector';
import SessionStore from './stores/sessionStore';
import LoginStatus from "./scripts/loginStatus";
import CreateAccountForm from './create-account-form';
import Spinner from './utils/spinner';

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

// Bind Loader component on Demand
const spinnerContainer = document.getElementById("cmp-header--loader");
if (spinnerContainer) {
    const bindLoaderToDom = (container, showLoader = false) => {
        const props = {
            loading: showLoader,
            color: '#ffffff',
        }
        ReactDOM.render(
            showLoader ? <Spinner {...props} /> : null,
            container
        );
    }
    window.addEventListener(
        "showLoaderEproc",
        ({ detail: data }) => {
            bindLoaderToDom(spinnerContainer, data.showLoader);
        },
        false
    ); 
}
// End Bind Loader component on Demand

const headerSearchBarContainer = document.getElementById('header-search-bar');
const headerMobileSearchContainer = document.getElementById('mobile-header-search-container');

if (headerMobileSearchContainer && headerSearchBarContainer && header) {
    const data = getAuthoredDataForSearchBar(headerSearchBarContainer, header);
    const searchLabels = {
        clear: data.clearLabel,
        search: data.searchLabel,
        autoSuggest: data.autoSuggestLabel,
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
            labels={searchLabels}
        />,
        headerMobileSearchContainer
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


    let accountModalConfig = {};
    let baseSignInUrlString = "";
    if (header) {
        accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
        baseSignInUrlString = accountModalConfig.signIn.url;
    }

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
            baseSignInUrl={baseSignInUrlString}
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

// Start SKU Details Component
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

    if (skuDetailsConfig) {
        let accountModalConfig = {};
        if (header) {
            accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
        }
        skuDetailsConfig.baseSignInUrl = accountModalConfig.signIn.url;
    }

    if (LoginStatus.state()) {
        const store = new SessionStore();
        waitUntilUserExists(store, skuDetailsContainer, skuDetailsRender);
    } else {
        skuDetailsRender(skuDetailsContainer)
    }

    function skuDetailsRender(skuDetailsContainer) {
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
}
// End SKU Details Component

// Start SKU List Component
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
    const configCheckEmailForm = JSON.parse(
        document.getElementById('cmp-check-email-form').innerHTML
    );

    let configRegistrationForm = JSON.parse(
        document.getElementById('cmp-registration-form').innerHTML
    );

    const country = DigitalData.page.country.toLowerCase();

    const swapFirstAndLastNames = () => {
        const indexofFirstName = configRegistrationForm.fields.map(e => e.name).indexOf('firstName');
        const indexofLastName = configRegistrationForm.fields.map(e => e.name).indexOf('lastName');
        if (indexofFirstName !== -1 && indexofLastName !== -1) {
            const temp = configRegistrationForm.fields[indexofFirstName];
            configRegistrationForm.fields[indexofFirstName] = configRegistrationForm.fields[indexofLastName];
            configRegistrationForm.fields[indexofLastName] = temp;
        }
    }

    const AddExtraDisclosures = (config, addDisclosuresJSON) => {
        const indexofPrivacy = config.fields.map(e => e.name).indexOf('privacy');
        let privacyConfig = config.fields[indexofPrivacy].config;
        privacyConfig.pop();
        config.fields[indexofPrivacy].config = privacyConfig.concat(addDisclosuresJSON);
    }

    const changeDisclosures = (config) => {
        const KRconfig = JSON.parse(
            document.getElementById('cmp-registration-form-kr').innerHTML
        ).koreanDisclosures;

        const indexofPrivacy = config.fields.map(e => e.name).indexOf('privacy');
        config.fields[indexofPrivacy].config = KRconfig;
    }

    if (configRegistrationForm.formName === "registration" && (country === "jp" || country === "cn" || country === "tw" || country === "kr")) {
        swapFirstAndLastNames();
    }

    if (configRegistrationForm.formName === "registration" && country === "kr") {
        changeDisclosures(configRegistrationForm);
    }

    const registrationForm = {
        config: configRegistrationForm,
        submitFn: registrationSubmit,
        callback: headerData.userDetailsUrl,
    }

    const checkEmailForm = {
        config: configCheckEmailForm,
    }

	const isTwoStepRegistrationForm = configCheckEmailForm.isTwoStepRegistrationForm;

    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <CreateAccountForm 
            registrationFormConfig={registrationForm}
            checkEmailFormConfig={checkEmailForm}
            isocode={DigitalData.language}
			isTwoStepRegistrationForm={isTwoStepRegistrationForm}
        />,
        registrationFormContainer
    );
}

// Contact Support
const contactSupportFormContainer = document.getElementById('js-contact-support-form');

if (contactSupportFormContainer) {
    const config = JSON.parse(document.getElementById('cmp-contact-support-form').innerHTML);
    const objData = config.fields.find(x => (x.type === 'dropdown' && x.name === 'formCategoryType' && Object.keys(x).includes('defaultValue')));

    ReactDOM.render(
        <>
            <Form
                config={config}
                submitFn={contactSupportSubmit}
                callback={headerData.userDetailsUrl}
                isocode={DigitalData.language}
                defaultValues={{ formCategoryType: objData.defaultValue || '' }}
            />
            <LegalLinkModal docIcon={config.icons.docIcon || ''} />
        </>,
        contactSupportFormContainer
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

    config.submitEndpoint = `${config.submitEndpoint}${config.isEproc === "true" ? '?isEproc=true' : ''}`;

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

// User Greeting Component
const userGreetingContainer = document.getElementById("user-greetings");
if (userGreetingContainer) {
    const store = new SessionStore();
    waitUntilUserExists(store, userGreetingContainer, userGreeting);
}
// Inject UserGreeting Component user-greetings container
function userGreeting(userGreetingContainer) {
    const props = JSON.parse(document.getElementById("cmp-user-greetings").innerHTML);
    ReactDOM.render(
        <UserGreeting {...props} />,
        userGreetingContainer
    );
}
// Checks user set in session storage or not
function waitUntilUserExists(store, container, callback) {
    const savedUserDetails = store.getUserDetails();
    if (Object.keys(savedUserDetails).length > 0) {
        return callback(container);
    }
    setTimeout(function () { return waitUntilUserExists(store, container, callback) }, 1000);
}
// End User Greeting Component

// Quick Order Component
const quickOrderContainer = document.getElementById("quick-order");
if (quickOrderContainer) {
    const store = new SessionStore();
    waitUntilUserExists(store, quickOrderContainer, quickOrder);
}
function quickOrder(container) {
    const props = JSON.parse(document.getElementById("cmp-quick-order").innerHTML);
    const skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
    ReactDOM.render(
        <QuickOrder {...props} skuConfig={skuConfig} />,
        container
    );
}
// End Quick Order Component

// Add Contact Waters Link
const contactusContainer = document.getElementById('contactWatersLink');
if (contactusContainer) {
    const config = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
    let label;
    let url;

    if (Object.keys(config.commerceConfig).length > 0) {
        label = config.commerceConfig.contactSupportLinkLabel;
        url = config.commerceConfig.contactSupportHref;
    }

    ReactDOM.render(
        <LinkButton label={label} url={url} />,
        contactusContainer
    );
}