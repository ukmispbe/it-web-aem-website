package com.waters.aem.core.services.notification.impl;

import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.notification.NotificationService;
import com.waters.aem.core.services.notification.SystemNotification;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(service = NotificationService.class)
public class DefaultNotificationService implements NotificationService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultNotificationService.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Override
    public SystemNotification getSystemNotification() {
        SystemNotification notification = null;

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource resource = resourceResolver.getResource(
                    WatersConstants.SYSTEM_NOTIFICATION_PATH + "/jcr:content");

            if (resource != null) {
                notification = resource.adaptTo(SystemNotification.class);
            }
        } catch (LoginException e) {
            LOG.error("error authenticating resource resolver", e);
        }

        return notification;
    }
}
