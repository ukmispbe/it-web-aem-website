package com.waters.aem.hybris.job;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hybris Importer Scheduled Job Configuration")
public @interface HybrisImporterScheduledJobConfiguration {

    @AttributeDefinition(name = "Enabled?", description = "Enable the Hybris Importer Scheduled Job.")
    boolean enabled() default false;

    @AttributeDefinition(name = "Scheduler Expression",
        description = "Cron expression for scheduling the importer job.")
    String scheduler_expression() default "0 0 0 * * ?";
}
