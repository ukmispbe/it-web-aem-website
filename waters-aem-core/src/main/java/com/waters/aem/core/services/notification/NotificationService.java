package com.waters.aem.core.services.notification;

import java.util.Locale;
import java.util.Map;

public interface NotificationService {

    /**
     * Gets the authored system notification content.
     *
     * @return system notification content
     */
    Map<String, Object> getSystemNotification(Locale locale);

}
