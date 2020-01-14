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
    String registrationSubmitUrl() default "https://dev-www.waters.com:8443/api/waters/user/v1/registration";

    @AttributeDefinition(name = "Email Validation API Url", description = "Url for email validation")
    String emailValidationUrl() default "https://dev-www.waters.com:8443/api/waters/user/v1/validate/{email}";

    @AttributeDefinition(name = "Reset Password API Url", description = "Url for reset password")
    String pwResetUrl() default "https://dev-www.waters.com:8443/api/waters/user/v1/reset/password";

    @AttributeDefinition(name = "Change Password API Url", description = "Url for change password")
    String changePwUrl() default "https://dev-www.waters.com:8443/api/waters/user/v1/change/password";

    @AttributeDefinition(name = "User Details API Url", description = "Url for User Details API")
    String userDetailsUrl() default "https://test-www.waters.com:8443/api/waters/user/v1/details";

    @AttributeDefinition(name = "Sold To Details API Url", description = "Url for Sold To Details API")
    String soldToDetailsUrl() default "https://test-www.waters.com:8443/api/waters/user/v1/retrievesoldto";

    @AttributeDefinition(name = "Update Password API Url", description = "Url for update password API")
    String updatePwUrl() default "https://test-www.waters.com:8443/api/waters/user/v1/update/password";

    @AttributeDefinition(name = "Sign In  Endpoint", description = "The Endpoint for the Sign In API")
    String signInEndpoint() default "https://test-www.waters.com:8443/api/waters/user/v1/login";
}