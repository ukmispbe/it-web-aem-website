package com.waters.aem.hybris.notification;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Hybris Importer Email Notification Service Configuration")
public @interface HybrisImporterEmailNotificationServiceConfiguration {

    @AttributeDefinition(name = "Email Notifications Enabled?",
        description = "Check to enable Hybris Importer email notifications.")
    boolean enabled() default false;

    @AttributeDefinition(name = "Email Recipients", description = "Email addresses to receive notifications.")
    String[] recipients();
}