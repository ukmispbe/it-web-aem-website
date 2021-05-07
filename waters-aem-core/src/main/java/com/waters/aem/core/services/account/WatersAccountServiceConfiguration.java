package com.waters.aem.core.services.account;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Account Service Configuration")
public @interface WatersAccountServiceConfiguration {

    @AttributeDefinition(name = "Sign Out Url", description = "Url for user log out")
    String signOutUrl() default "https://wwwdt1.waters.com/waters/logout.htm";

    @AttributeDefinition(name = "My Account Url", description = "Url for user account")
    String myAccountUrl() default "https://wwwdt1.waters.com/waters/My-Account/nav.htm?cid=2243096";

    @AttributeDefinition(name = "Legacy Search Url", description = "Url for the legacy search page")
    String legacySearchUrl() default "https://wwwdt1.waters.com/waters/keywordSearch.htm";

    @AttributeDefinition(name = "Registration submit API Url", description = "Url for submitting the registration form")
    String registrationSubmitUrl() default "https://dev1-services.waters.com/api/waters/user/v1/registration";

    @AttributeDefinition(name = "Email Validation API Url", description = "Url for email validation")
    String emailValidationUrl() default "https://dev1-services.waters.com/api/waters/user/v1/validate/{email}";

    @AttributeDefinition(name = "Reset Password API Url", description = "Url for reset password")
    String pwResetUrl() default "https://dev1-services.waters.com/api/waters/user/v1/reset/password?email={email}";

    @AttributeDefinition(name = "Change Password API Url", description = "Url for change password")
    String changePwUrl() default "https://dev1-services.waters.com/api/waters/user/v1/change/password";

    @AttributeDefinition(name = "User Details API Url", description = "Url for User Details API")
    String userDetailsUrl() default "https://dev1-services.waters.com/api/waters/user/v1/details";

    @AttributeDefinition(name = "Sold To Details API Url", description = "Url for Sold To Details API")
    String soldToDetailsUrl() default "https://api-sbox.waters.com/dev-waters-user-exp-api-v1/api/users";

    @AttributeDefinition(name = "Update Password API Url", description = "Url for update password API")
    String updatePwUrl() default "https://dev1-services.waters.com/api/waters/user/v1/update/password";

    @AttributeDefinition(name = "Update Profile API Url", description = "Url for update profile API")
    String updateProfileUrl() default "https://dev1-services.waters.com/api/waters/user/v1/update/profile";

    @AttributeDefinition(name = "Sign In Endpoint", description = "The Endpoint for the Sign In API")
    String signInEndpoint() default "https://dev1-services.waters.com/api/waters/user/v1/login";

    @AttributeDefinition(name = "Sign Out Endpoint", description = "The Endpoint for the Sign Out API")
    String signOutEndpoint() default "https://dev1-services.waters.com/api/waters/user/v1/logout";

    @AttributeDefinition(name = "Choose Account Endpoint", description = "The Endpoint for the Choose Account API")
    String chooseAccountEndpoint() default "https://dev1-services.waters.com/api/waters/user/v1/switchaccount";

    @AttributeDefinition(name = "Order Details API Url", description = "Url for Order Details API")
    String orderDetailsUrl() default "https://dev1-services.waters.com/api/waters/order/v1/details";

    @AttributeDefinition(name = "Order List API Url", description = "Url for Order List API")
    String orderListUrl() default "https://dev1-services.waters.com/api/waters/order/v1/list";

    @AttributeDefinition(name = "Contact Support API Url", description = "Url for Contact Support API")
    String contactSupportUrl() default "https://dev1-services.waters.com/api/waters/contact/v1/support"; 

    @AttributeDefinition(name = "Quote History API Url", description = "Url for Quote History API")
    String quoteHistoryUrl() default "https://api-sbox.waters.com/dev-waters-quote-exp-api-v1/api/quote";
    
    @AttributeDefinition(name = "Country List API Url", description = "Url for Country List API")
    String countryListUrl() default "https://api-sbox.waters.com/dev-waters-country-exp-api-v1/api/countries";
    
    @AttributeDefinition(name = "Country States API Url", description = "Url for Country States API")
    String countryStatesUrl() default "https://api-sbox.waters.com/dev-waters-country-exp-api-v1/api/countries/{country}?states=true";

    @AttributeDefinition(name = "Support Request API Url", description = "Url for Support Request API")
    String supportRequestUrl() default "https://api-sbox.waters.com/dev-waters-supportcase-web-exp-api-v1/api/support-case";

    @AttributeDefinition(name = "Support Request API Equipment Url", description = "Url for Support Request Equipment API")
    String supportRequestEquipmentUrl() default "https://api-sbox.waters.com/dev-waters-asset-web-exp-api-v1/api/equipment";

    @AttributeDefinition(name = "Thales Software Download URL", description = "Url for Thales Software Download")
    String softwareDownloadUrl() default "https://videos.waters.com";

}
