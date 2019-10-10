package com.waters.aem.core.services.chat;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "Waters Chat Service Configuration")
public @interface ChatServiceConfiguration {

    @AttributeDefinition(name = "Chat URL", description = "URL for Waters Chat Service.")
    String chatUrl() default "https://avaya-emc-dev.waters.com:9443/csportalclient/refimplementation/chat.html";

    @AttributeDefinition(name = "Chat Status API", description = "chat Status Api for waters chat service.")
    String chatStatusApi() default "https://test-www.waters.com:8443/api/waters/v1/chat/enabled/{countryCode}";
}
