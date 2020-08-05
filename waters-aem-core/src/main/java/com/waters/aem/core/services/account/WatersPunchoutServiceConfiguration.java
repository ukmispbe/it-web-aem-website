package com.waters.aem.core.services.account;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Punchout Service Configuration")
public @interface WatersPunchoutServiceConfiguration {

    @AttributeDefinition(name = "Punchout Setup Url", description = "Url for setting up a Punchout")
    String setupUrl() default "https://api-sbox.waters.com/dev-waters-punchout-exp-api-v1/api/users/{userId}/punchout/setup/{sid}";

    @AttributeDefinition(name = "Punchout Login Url", description = "Url for Logging a Punchout user")
    String puchOutSignInUrl() default "https://dev-www.waters.com:8443/api/waters/punchout/v1/login";
}