package com.waters.aem.solr.job;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Solr Index Job Cancelled Event Handler Configuration")
public @interface SolrIndexJobCancelledEventHandlerConfiguration {

    @AttributeDefinition(name = "Email Recipients",
        description = "Notification email recipients for Solr Index job failures.")
    String[] emailRecipients() default {};

    @AttributeDefinition(name = "Email Subject",
        description = "Notification email subject for Solr Index job failures.")
    String emailSubject() default "Solr Index Job Failure";
}