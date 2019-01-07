package com.waters.aem.core.services;

import java.util.Set;

/**
 * Notification service for sending system-generated emails.
 */
public interface EmailNotificationService {

    /**
     * Send an email notification.
     *
     * @param recipients set of recipient email addresses
     * @param subject email subject
     * @param message email message
     */
    void sendEmail(Set<String> recipients, String subject, String message);
}
