package com.waters.aem.akamai.client;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Akamai Edge Grid Client Configuration")
public @interface AkamaiEdgeGridClientConfiguration {

    @AttributeDefinition(name = "Enable Akamai Edge Grid Client")
    boolean enabled() default false;

    @AttributeDefinition(name = "Akamai Network", description = "staging or production")
    String network() default "production";

    @AttributeDefinition(name = "Akamai Hostname")
    String hostname() default "akab-zai4si42encz4itc-umutbp23o4zar5su.purge.akamaiapis.net";

    @AttributeDefinition(name = "Ecomm Akamai Access Token")
    String ecommAccessToken() default "";

    @AttributeDefinition(name = "Ecomm Akamai Client Token")
    String ecommClientToken() default "";

    @AttributeDefinition(name = "Ecomm Akamai Client Secret")
    String ecommClientSecret() default "";
    
    @AttributeDefinition(name = "Eproc Akamai Access Token")
    String eprocAccessToken() default "";

    @AttributeDefinition(name = "Eproc Akamai Client Token")
    String eprocClientToken() default "";

    @AttributeDefinition(name = "Eproc Akamai Client Secret")
    String eprocClientSecret() default "";
}