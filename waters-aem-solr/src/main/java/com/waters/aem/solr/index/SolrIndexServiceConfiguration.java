package com.waters.aem.solr.index;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Service Configuration")
public @interface SolrIndexServiceConfiguration {

    @AttributeDefinition(name = "Enable Solr Index Service")
    boolean enabled() default false;

    @AttributeDefinition(name = "Solr Base URL")
    String baseUrl() default "http://solrdevmaster.waters.com:8983/solr";

    @AttributeDefinition(name = "Solr Collection")
    String collection() default "waters";

    @AttributeDefinition(name = "Commit Within Milliseconds",
        description = "Add/delete documents within the specified number of milliseconds.")
    int commitWithinMs() default -1;

    @AttributeDefinition(name = "Connection Timeout",
        description = "Timeout value in milliseconds when connecting to Solr server.")
    int connectionTimeout() default 10000;

    @AttributeDefinition(name = "Socket Timeout",
        description = "Timeout value in milliseconds when reading from Solr server.")
    int socketTimeout() default 10000;
}