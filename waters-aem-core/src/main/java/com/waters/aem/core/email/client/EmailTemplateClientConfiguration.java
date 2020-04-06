package com.waters.aem.core.email.client;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters AWS Email Template Client Configuration")
public @interface EmailTemplateClientConfiguration {

    @AttributeDefinition(name = "Hostname")
    String hostname() default "6g7waw75u9.execute-api.us-east-1.amazonaws.com";

    @AttributeDefinition(name = "Set Template API path")
    String setTemplateEndpoint() default "/sandbox/settemplate";

    @AttributeDefinition(name = "Set API key")
    String setApiKey() default "W064sbiQAF3RRkCex9lOt231pmc6w3PGSl3A7pde";
}
