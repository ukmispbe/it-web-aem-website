package com.waters.aem.hybris.replication.impl;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hybris Importer Replication Configuration")
public @interface HybrisImporterReplicationConfiguration {

    @AttributeDefinition(name = "Enable replication limit", description = "Disable to always activate all updated " +
            "pages and product data")
    boolean limit() default true;

    @AttributeDefinition(name = "Replication limit threshold", description = "If updated pages and product data " +
            "exceed this amount, do not replicate but instead send a notification for manual activation")
    int limitThreshold() default 200;

}
