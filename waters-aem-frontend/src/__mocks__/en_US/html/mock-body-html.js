import {
	myAccountJSON,
	detailTilesPersonalJSON,
	detailTilesBillingJSON,
	detailTilesShippingJSON,
	detailTilesAddressJSON,
	detailTilesChangePasswordJSON,
	globalTranslationsJSON,
	countryListJSON,
	commerceConfigsJSON,
    accountModalConfigsJSON,
    mockDigitalDataJSON,
} from './mock-html-json';

const mockBodyHTML = `
    <header id="header" class="cmp-header" data-is-edit-mode="" 
    data-homepage-url="/nextgen/us/en.html" 
    data-signout-endpoint="https://devservices.waters.com:8443/api/waters/user/v1/logout" 
    data-search-path="/content/waters/us/en/search.html" 
    data-user-details-url="https://devservices.waters.com:8443/api/waters/user/v1/details" 
    data-signin-url="/nextgen/us/en/account/sign-in.html" 
    data-register-url="/nextgen/us/en/account/create-account.html" 
    data-switch-account-url="/nextgen/us/en/account/switch-account.html">

    <script id="${myAccountJSON.configId}">
        ${JSON.stringify(myAccountJSON.html)}
    </script>

    <script id="${detailTilesPersonalJSON.configId}">
        ${JSON.stringify(detailTilesPersonalJSON.html)}
    </script>

    <script id="${detailTilesBillingJSON.configId}">
        ${JSON.stringify(detailTilesBillingJSON.html)}
    </script>

    <script id="${detailTilesShippingJSON.configId}">
        ${JSON.stringify(detailTilesShippingJSON.html)}
    </script>

    <script id="${detailTilesAddressJSON.configId}">
        ${JSON.stringify(detailTilesAddressJSON.html)}
    </script>

    <script id="${detailTilesChangePasswordJSON.configId}">
        ${JSON.stringify(detailTilesChangePasswordJSON.html)}
    </script>

    <script id="${globalTranslationsJSON.configId}">
        ${JSON.stringify(globalTranslationsJSON.html)}
    </script>

    <script id="${countryListJSON.configId}">
        ${JSON.stringify(countryListJSON.html)}
    </script>

    <script id="${commerceConfigsJSON.configId}">
        ${JSON.stringify(commerceConfigsJSON.html)}
    </script>

    <script id="${accountModalConfigsJSON.configId}">
        ${JSON.stringify(accountModalConfigsJSON.html)}
    </script>

    <script id="${mockDigitalDataJSON.configId}">
        ${JSON.stringify(mockDigitalDataJSON.html)}
    </script>
`;

export default mockBodyHTML;
