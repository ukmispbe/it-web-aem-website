package com.waters.aem.core.services.chat.impl;

import com.waters.aem.core.services.chat.ChatService;
import com.waters.aem.core.services.chat.ChatServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = ChatService.class)
@Designate(ocd = ChatServiceConfiguration.class)
public final class DefaultChatService implements ChatService {

    private volatile String chatUrl;

    @Override
    public String getChatUrl() {
        return chatUrl;
    }

    @Activate
    @Modified
    protected void activate(final ChatServiceConfiguration configuration) {
        chatUrl = configuration.chatUrl();
    }
}

