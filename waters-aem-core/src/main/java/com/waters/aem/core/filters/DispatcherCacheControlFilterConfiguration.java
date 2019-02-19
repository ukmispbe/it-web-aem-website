package com.waters.aem.core.filters;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Dispatcher Cache Control Filter Configuration")
public @interface DispatcherCacheControlFilterConfiguration {

    @AttributeDefinition(name = "Filter Pattern", description = "Patterns on which to apply the Cache-Control header.")
    String pattern();

    @AttributeDefinition(name = "Cache-Control Max Age",
        description = "Max age value (in seconds) to set in Cache-Control header.")
    long maxAge();
}