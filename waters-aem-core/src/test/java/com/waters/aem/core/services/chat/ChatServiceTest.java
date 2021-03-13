package com.waters.aem.core.services.chat;

import com.waters.aem.core.services.chat.impl.DefaultChatService;
import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(AemContextExtension.class)
public class ChatServiceTest {

    @Mock
    private ChatService chatService;

    @BeforeEach
    public void setup(AemContext context) throws Exception {
        Map<String, Object> props = new HashMap<>();
        props.put("chatUrl","https://avaya-emc-dev.waters.com");
        props.put("chatStatusApi","https://stage1-services.waters.com");
        chatService = context.registerInjectActivateService(new DefaultChatService(),props);
    }

    @Test
    void testGetChatUrl() throws Exception {
        String expected ="https://avaya-emc-dev.waters.com";
        String chatUrl = chatService.getChatUrl();
        assertNotNull(chatUrl);
        assertEquals(expected,chatUrl);
    }

    @Test
    void testGetChatStatusApi() throws Exception {
        String expected ="https://stage1-services.waters.com";
        String getChatStatusApi = chatService.getChatStatusApi();
        assertNotNull(getChatStatusApi);
        assertEquals(expected,getChatStatusApi);
    }


}
