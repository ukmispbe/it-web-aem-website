package com.waters.aem.core.services.chat;

/**
 * Service exposing Chat configuration values.
 */
public interface ChatService {

    /**
     * Get the configured Chat URL.
     *
     * @return Live Chat URL
     */
    String getChatUrl();
    /**
     * Get the configured Chat Status API.
     *
     * @return Live Chat Status
     */
    String getChatStatusApi();
}
