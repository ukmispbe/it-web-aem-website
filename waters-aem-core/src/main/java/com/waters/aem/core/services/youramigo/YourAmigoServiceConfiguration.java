package com.waters.aem.core.services.youramigo;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Your Amigo Service Configuration")
public @interface YourAmigoServiceConfiguration {

    @AttributeDefinition(name = "Enable Your-Amigo Service?",
            description = "Enable Your Amigo Service to Crawl the website.")
    boolean enabled() default true;

}
