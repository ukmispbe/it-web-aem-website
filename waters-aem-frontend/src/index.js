import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
const Search = React.lazy(() => import(/* webpackChunkName: "searchresults" */'./search/index'));
import TagCloud from './search/components/tagcloud';
const ImageCarousel = React.lazy(() => import(/* webpackChunkName: "imagegallery" */'./image-carousel'));
const UserGreeting = React.lazy(() => import(/* webpackChunkName: "usergreetings" */'./user-greetings/UserGreeting'));
const QuickOrder = React.lazy(() => import(/* webpackChunkName: "quickorder" */'./quick-order/QuickOrder'));
import LinkButton from './link-button/LinkButton';
import LegalLinkModal from './legal-link-modal/LegalLinkModal';

const SkuDetails = React.lazy(() => import(/* webpackChunkName: "skudetails" */ './sku-details'));
const SkuList = React.lazy(() => import(/* webpackChunkName: "skulist" */ './sku-list'));
import SkuMessage from './sku-message';

import {
    registrationSubmit,
    resetPasswordSubmit,
    troubleSigningInSubmit,
    signInSubmit,
    chooseAccountSubmit,
    contactSupportSubmit

} from './forms/services/submit';
const Video = React.lazy(() => import(/* webpackChunkName: "video" */'./video/index'));
const Chat = React.lazy(() => import(/* webpackChunkName: "chat" */'./chat'));
import DetailTiles from './detail-tiles';
import DigitalData from './scripts/DigitalData';
import WeChat from './wechat';
const MyAccountRouter = React.lazy(() => import(/* webpackChunkName: "myaccount" */'./my-account'));
import CountrySelector from './country-selector';
import SessionStore from './stores/sessionStore';
import LoginStatus from "./scripts/loginStatus";
import CreateAccountForm from './create-account-form';
import CreateRequestForm from './create-request-form';

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
        locale: c.dataset.locale,
        rows: c.dataset.rows
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

const searchAppContainer = document.getElementById('js-search-app');

if (searchAppContainer) {
    const text = JSON.parse(
        document.getElementById('search-results-translations-json').innerHTML
    );

    const filterMap = JSON.parse(
        document.getElementById('search-results-categories-json').innerHTML
    );

    const subFacetMap = JSON.parse(
        document.getElementById('search-results-filters-json').innerHTML
    );


    let accountModalConfig = {};
    let baseSignInUrlString = "";
    if (header) {
        accountModalConfig = JSON.parse(document.getElementById('account-modal-configs-json').innerHTML);
        baseSignInUrlString = accountModalConfig.signIn.url;
    }

    const data = getAuthoredDataForSearchApp(searchAppContainer);
    ReactDOM.render(
        <Suspense fallback={<div>Loading...</div>}>
            <Search
                defaultFacet="category_facet:waters%253Acategory%252Fapplicationslibrary"
                searchDefaults={{ rows: data.rows }}
                searchServicePath={data.searchPath}
                searchLocale={data.locale}
                searchText={text}
                filterMap={filterMap}
                subFacetMap={subFacetMap}
                isocode={data.isocode}
                baseSignInUrl={baseSignInUrlString}
            />
        </Suspense>,
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
            <Suspense fallback={<div>Loading...</div>}>
                <ImageCarousel
                    templates={json.templates}
                    widths={json.widths}
                    alt={json.alt}
                    zoomInIcon="/content/dam/waters/en/brand-assets/icons/zoom-in.svg"
                    zoomOutIcon="/content/dam/waters/en/brand-assets/icons/zoom-out.svg"
                /></Suspense>,
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
            <Suspense fallback={<div>Loading...</div>}>
                <SkuDetails
                    config={skuDetailsConfig}
                    price={skuDetailsListPrice}
                    countryRestricted={skuCountryRestricted}
                    skuNumber={skuNumber}
                    titleText={skuTitle}
                    discontinued={skuDiscontinued}
                    replacementSkuCode={replacementSkuCode}
                    replacementSkuHref={replacementSkuHref}
                />
            </Suspense>,
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
        <Suspense fallback={<div>Loading...</div>}>
            <SkuList
                skuConfig={skuDetailsConfig}
                data={skuListData}
                title={skuListTitle}
            />
        </Suspense>,
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Video
                        videoConfig={json.videoConfig}
                        ref={ourComponent => {
                            if (window.cmpVideos) {
                                window.cmpVideos.push(ourComponent);
                            } else {
                                window.cmpVideos = [ourComponent];
                            }
                        }}
                    /></Suspense>,
                videoContainer
            );
        }
    });
}

const requestFormContainer = document.getElementById(
    'js-support-request-form'
);

if (requestFormContainer) {
    const configCheckSerialForm = JSON.parse(
        document.getElementById('cmp-check-serial-form').innerHTML
    );

    const configSupportRequestForm = JSON.parse(
        document.getElementById('cmp-support-request-form').innerHTML
    );

    const configSupportRequestConfirmationForm = JSON.parse(
        document.getElementById('cmp-support-request-confirmation').innerHTML
    );

    const supportRequestForm = {
        config: configSupportRequestForm,
        submitFn: registrationSubmit,
        callback: headerData.userDetailsUrl,
    }

    const checkSerialForm = {
        config: configCheckSerialForm,
    }

    const supportRequestConfirmationForm = {
        config: configSupportRequestConfirmationForm,
    }

    ReactDOM.render(
        <>
            <CreateRequestForm
                confirmationFormConfig={supportRequestConfirmationForm}
                supportRequestFormConfig={supportRequestForm}
                checkSerialFormConfig={checkSerialForm}
                isocode={DigitalData.language}
            />
            <LegalLinkModal docIcon={configSupportRequestForm.icons.docIcon || ''} />
        </>,
        requestFormContainer
    );
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

    const configRegistrationAddressForm = JSON.parse(
        document.getElementById('cmp-registration-address-form').innerHTML
    );

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

    // Set Country list url
    configRegistrationForm.countryListUrl = headerRef.dataset.countryListUrl ? headerRef.dataset.countryListUrl : '';
    
    const registrationAddressForm = {
        config: configRegistrationAddressForm,
        callback: headerData.userDetailsUrl,
    }

    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <CreateAccountForm
            registrationFormConfig={registrationForm}
            checkEmailFormConfig={checkEmailForm}
            addressFormConfig={registrationAddressForm}
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
    const Form = React.lazy(() => import(/* webpackChunkName: "forms" */ './forms/form'));
    ReactDOM.render(
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Form
                    config={config}
                    submitFn={contactSupportSubmit}
                    callback={headerData.userDetailsUrl}
                    isocode={DigitalData.language}
                    defaultValues={{ formCategoryType: objData.defaultValue || '' }}
                />
            </Suspense>
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
    const Form = React.lazy(() => import(/* webpackChunkName: "forms" */ './forms/form'));
    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                config={config}
                submitFn={troubleSigningInSubmit}
                isocode={DigitalData.language}
            /></Suspense>,
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
    const Form = React.lazy(() => import(/* webpackChunkName: "forms" */ './forms/form'));
    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Suspense fallback={<div>Loading...</div>}>
            <Form
                config={config}
                submitFn={chooseAccountSubmit}
                isocode={DigitalData.language}
            /></Suspense>,
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
    const Form = React.lazy(() => import(/* webpackChunkName: "forms" */ './forms/form'));
    ReactDOM.render(
        <Suspense fallback={<div>Loading...</div>}>
            <Form config={config} submitFn={resetPasswordSubmit} callback={headerData.userDetailsUrl} /></Suspense>,
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
        <Suspense fallback={<div>Loading...</div>}>
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
            /></Suspense>,
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

    ReactDOM.render(<Suspense fallback={<div>Loading...</div>}><MyAccountRouter {...config} /></Suspense>, myAccountPage);
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
    const Form = React.lazy(() => import(/* webpackChunkName: "forms" */ './forms/form'));
    ReactDOM.render(
        // replace isocode with a value supplied by AEM
        <Suspense fallback={<div>Loading...</div>}>
            <Form config={config} submitFn={signInSubmit} isocode={DigitalData.language} callback={headerData.userDetailsUrl} /></Suspense>,
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
        <Suspense fallback={<div>Loading...</div>}><UserGreeting {...props} /></Suspense>,
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
    const props = JSON.parse(document.getElementById("cmp-quick-order").innerHTML);
    const skuConfig = JSON.parse(document.getElementById('commerce-configs-json').innerHTML);
    ReactDOM.render(
        <Suspense fallback={<div>Loading...</div>}><QuickOrder {...props} skuConfig={skuConfig} /></Suspense>,
        quickOrderContainer
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