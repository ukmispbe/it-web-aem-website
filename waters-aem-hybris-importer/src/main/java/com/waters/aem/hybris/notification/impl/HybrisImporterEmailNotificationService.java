package com.waters.aem.hybris.notification.impl;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.acs.commons.email.EmailServiceConstants;
import com.day.cq.commons.Externalizer;
import com.waters.aem.hybris.notification.HybrisImporterEmailNotificationServiceConfiguration;
import com.waters.aem.hybris.notification.HybrisImporterNotificationService;
import com.waters.aem.hybris.result.HybrisImporterExecutionResult;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component(service = HybrisImporterNotificationService.class)
@Designate(ocd = HybrisImporterEmailNotificationServiceConfiguration.class)
public class HybrisImporterEmailNotificationService implements HybrisImporterNotificationService {

    private static final Logger LOG = LoggerFactory.getLogger(HybrisImporterEmailNotificationService.class);

    private static final String SUBJECT = "Hybris Importer Result";

    private static final String TEMPLATE_PATH_SUCCESS = "/etc/notification/email/waters/hybris-importer-success.html";

    private static final String TEMPLATE_PATH_FAILURE = "/etc/notification/email/waters/hybris-importer-failure.html";

    @Reference
    private EmailService emailService;

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private Externalizer externalizer;

    private volatile boolean enabled;

    private volatile String[] recipients;

    @Override
    public void notify(HybrisImporterExecutionResult result) {
        final Map<String, String> params = new HashMap<>();

        params.put(EmailServiceConstants.SUBJECT, SUBJECT);

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            params.put("href", externalizer.externalLink(resourceResolver, Externalizer.AUTHOR,
                "/pim-importer.audit.html"));

            result.getResults()
                .stream()
                .collect(Collectors.groupingBy(HybrisImporterResult :: getStatus, Collectors.counting()))
                .forEach((status, count) -> params.put(status.name().toLowerCase(), String.valueOf(count)));

            sendEmail(TEMPLATE_PATH_SUCCESS, params);
        } catch (LoginException e) {
            LOG.error("error authenticating resource resolver, email not sent", e);
        }
    }

    @Override
    public void notify(final Throwable throwable) {
        final Map<String, String> params = new HashMap<>();

        params.put(EmailServiceConstants.SUBJECT, SUBJECT);
        params.put("stackTrace", ExceptionUtils.getStackTrace(throwable));

        sendEmail(TEMPLATE_PATH_FAILURE, params);
    }

    private void sendEmail(final String templatePath, final Map<String, String> params) {
        if (enabled && recipients.length > 0) {
            emailService.sendEmail(templatePath, params, recipients);
        } else {
            LOG.warn("email disabled and/or no recipients configured, notification message not sent");
        }
    }

    @Activate
    @Modified
    protected void activate(final HybrisImporterEmailNotificationServiceConfiguration configuration) {
        enabled = configuration.enabled();
        recipients = configuration.recipients();
    }
}
