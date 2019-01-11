package com.waters.aem.akamai.replication;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Akamai Purge Replication Event Handler Configuration")
public @interface AkamaiPurgeReplicationEventHandlerConfiguration {

    @AttributeDefinition(name = "Included Paths", description = "List of paths that should be purged.")
    String[] includedPaths() default { "/content/waters" };

    @AttributeDefinition(name = "Excluded Paths", description = "List of paths to exclude from purges.")
    String[] excludedPaths() default { "/content/waters/language-masters" };
}