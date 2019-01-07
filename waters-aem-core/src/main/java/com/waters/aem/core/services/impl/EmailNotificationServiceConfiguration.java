package com.waters.aem.core.services.impl;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Email Notification Service Configuration")
public @interface EmailNotificationServiceConfiguration {

    @AttributeDefinition(name = "Email From Address", description = "Email from address for notifications.")
    String from() default "aem@waters.com";
}
