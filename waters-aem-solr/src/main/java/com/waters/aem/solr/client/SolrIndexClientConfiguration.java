package com.waters.aem.solr.client;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Client Configuration")
public @interface SolrIndexClientConfiguration {
	@AttributeDefinition(name = "Zookeeper host url",  type = AttributeType.STRING)
    String[] zookeeperUrl() default {"localhost:2181","localhost:2182","localhost:2183"};

    @AttributeDefinition(name = "Solr Collection")
    String collection() default "waters";

    @AttributeDefinition(name = "Commit Within Milliseconds",
        description = "Add/delete documents within the specified number of milliseconds.")
    int commitWithinMs() default -1;

    @AttributeDefinition(name = "Hard Commit",
        description = "If true, a hard commit command will be issued after each indexing request.")
    boolean hardCommit() default false;

    @AttributeDefinition(name = "Connection Timeout",
        description = "Timeout value in milliseconds when connecting to Solr server.")
    int connectionTimeout() default 10000;

    @AttributeDefinition(name = "Socket Timeout",
        description = "Timeout value in milliseconds when reading from Solr server.")
    int socketTimeout() default 10000;
}