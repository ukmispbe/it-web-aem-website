package com.waters.aem.solr.replication;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Replication Listener Configuration")
public @interface SolrIndexReplicationListenerConfiguration {

    @AttributeDefinition(name = "Included Paths", description = "List of paths that should be indexed.")
    String[] includedPaths() default { "/content/waters" };

    @AttributeDefinition(name = "Excluded Paths", description = "List of paths to exclude from indexing.")
    String[] excludedPaths() default { "/content/waters/language-masters" };
}