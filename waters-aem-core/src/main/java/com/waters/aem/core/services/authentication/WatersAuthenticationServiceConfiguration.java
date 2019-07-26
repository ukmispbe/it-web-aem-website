package com.waters.aem.core.services.authentication;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Authentication Service Configuration")
public @interface WatersAuthenticationServiceConfiguration {

    @AttributeDefinition(name = "Sign In Url", description = "Url for user login")
    String signInUrl() default "https://wwwdt1.waters.com/waters/login.htm";

    @AttributeDefinition(name = "Sign Out Url", description = "Url for user log out")
    String signOutUrl() default "https://wwwdt1.waters.com/waters/logout.htm";

    @AttributeDefinition(name = "My Account Url", description = "Url for user account")
    String myAccountUrl() default "https://wwwdt1.waters.com/waters/My-Account/nav.htm?cid=2243096";
}