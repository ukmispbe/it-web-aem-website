package com.waters.aem.solr.replication;

import com.waters.aem.core.constants.WatersConstants;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Replication Event Handler Configuration")
public @interface SolrIndexReplicationEventHandlerConfiguration {

    @AttributeDefinition(name = "Included Paths", description = "List of paths that should be indexed.")
    String[] includedPaths() default { "/content/waters" };

    @AttributeDefinition(name = "Excluded Paths", description = "List of paths to exclude from indexing.")
    String[] excludedPaths() default { "/content/waters/language-masters" };

    @AttributeDefinition(name = "Included Templates", description = "List of templates that should be indexed.")
    String[] includedTemplates() default { WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE };
}