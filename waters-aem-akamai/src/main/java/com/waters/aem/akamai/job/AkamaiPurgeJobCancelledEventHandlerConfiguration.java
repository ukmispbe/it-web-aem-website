package com.waters.aem.akamai.job;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Akamai Purge Job Cancelled Event Handler Configuration")
public @interface AkamaiPurgeJobCancelledEventHandlerConfiguration {

    @AttributeDefinition(name = "Email Recipients",
        description = "Notification email recipients for Akamai Purge job failures.")
    String[] emailRecipients() default {};

    @AttributeDefinition(name = "Email Subject",
        description = "Notification email subject for Akamai Purge job failures.")
    String emailSubject() default "Akamai Purge Job Failure";
}