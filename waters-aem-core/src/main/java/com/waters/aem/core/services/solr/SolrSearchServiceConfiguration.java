package com.waters.aem.core.services.solr;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Search Service Configuration")
public @interface SolrSearchServiceConfiguration {

    @AttributeDefinition(name = "Base URL", description = "Base URL for Waters Search Service.")
    String baseUrl() default "https://dev1-services.waters.com/api/waters/search";

    @AttributeDefinition(name = "Rows", description = "Rows for Waters Search Results.")
    String rows() default "12";
}
