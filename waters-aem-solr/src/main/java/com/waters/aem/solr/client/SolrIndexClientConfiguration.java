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
    
    @AttributeDefinition(name = "Enable Authentication",
            description = "If true, authentication will be enabled on solr.")
     boolean enableAuthentication() default true;
    
    @AttributeDefinition(name = "User Name")
    String userName() default "solradmin";
    
    @AttributeDefinition(name = "Protected Password", type = AttributeType.PASSWORD)
    String password() default "{e2ba26faf1e47f31262d1d71dd9ce75c6014320d991b842f10296c5f1add0e5f}";
    
    
    @AttributeDefinition(name = "Enable Batch Indexing",
            description = "If true, documents will be indexed in batch mode.")
    boolean enableBatchIndexing() default false;
    
    @AttributeDefinition(name = "Number of documents in single batch",
            description = "Number of documents which will be indexed in single batch.")
    int documentsCount() default 100;

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