package com.waters.aem.core.services.notification.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.i18n.I18n;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.notification.NotificationService;
import com.waters.aem.core.services.notification.SystemNotification;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

@Component(service = NotificationService.class)
public class DefaultNotificationService implements NotificationService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultNotificationService.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference(target = "(component.name=org.apache.sling.i18n.impl.JcrResourceBundleProvider)")
    private ResourceBundleProvider resourceBundleProvider;

    @Override
    public Map<String, Object> getSystemNotification(final Locale locale) {
        Map<String, Object> notificationContent = new HashMap<>();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Resource resource = resourceResolver.getResource(
                    WatersConstants.SYSTEM_NOTIFICATION_PATH + "/" + JcrConstants.JCR_CONTENT);

            final SystemNotification systemNotification = resource.adaptTo(SystemNotification.class);

            if (systemNotification != null) {
                notificationContent = systemNotification.toMap(getI18n(locale));
            }
        } catch (LoginException e) {
            LOG.error("error authenticating resource resolver", e);
        }

        return notificationContent;
    }

    private I18n getI18n(final Locale locale) {
        final ResourceBundle resourceBundle = resourceBundleProvider.getResourceBundle(locale);

        return new I18n(resourceBundle);
    }
}
