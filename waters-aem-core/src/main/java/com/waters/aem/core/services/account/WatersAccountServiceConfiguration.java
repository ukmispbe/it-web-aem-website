package com.waters.aem.core.services.account;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Account Service Configuration")
public @interface WatersAccountServiceConfiguration {

    @AttributeDefinition(name = "Sign In Url", description = "Url for user login")
    String signInUrl() default "https://wwwdt1.waters.com/waters/login.htm";

    @AttributeDefinition(name = "Sign Out Url", description = "Url for user log out")
    String signOutUrl() default "https://wwwdt1.waters.com/waters/logout.htm";

    @AttributeDefinition(name = "My Account Url", description = "Url for user account")
    String myAccountUrl() default "https://wwwdt1.waters.com/waters/My-Account/nav.htm?cid=2243096";

    @AttributeDefinition(name = "Legacy Search Url", description = "Url for the legacy search page")
    String legacySearchUrl() default "https://wwwdt1.waters.com/waters/keywordSearch.htm";

    @AttributeDefinition(name = "Registration Url", description = "Url for the registration form")
    String registrationSubmitUrl() default "https://test-www.waters.com:8443/api/waters/user/v1/registration";

    @AttributeDefinition(name = "Email Validation Url", description = "Url for email validation")
    String emailValidationUrl() default "https://test-www.waters.com:8443/api/waters/user/v1/validate/email";
}