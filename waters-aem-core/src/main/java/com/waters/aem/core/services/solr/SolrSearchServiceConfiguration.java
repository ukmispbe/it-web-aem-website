package com.waters.aem.core.services.solr;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Search Service Configuration")
public @interface SolrSearchServiceConfiguration {

    @AttributeDefinition(name = "Base URL", description = "Base URL for Waters Search Service.")
    String baseUrl() default "https://test-www.waters.com:8443/api/waters/search";
}
