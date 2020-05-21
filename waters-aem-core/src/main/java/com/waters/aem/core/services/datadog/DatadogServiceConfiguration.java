package com.waters.aem.core.services.datadog;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Datadog Service Configuration")
public @interface DatadogServiceConfiguration {

    @AttributeDefinition(name = "Client Token", description = "Datadog Client Token")
    String clientToken();

    @AttributeDefinition(name = "Application Id", description = "Datadog Application Id")
    String applicationId();
}
