package com.waters.aem.akamai.job;

import com.adobe.acs.commons.email.EmailService;
import com.waters.aem.core.services.AbstractJobCancelledEventHandler;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;

/**
 * Event handler for Akamai purge job cancellations, providing email notification to a configured list of recipients.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_CANCELLED,
        EventConstants.EVENT_FILTER + "=(|(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "="
            + AkamaiPurgeJobConsumer.JOB_TOPIC_INVALIDATE + ")(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC
            + "=" + AkamaiPurgeJobConsumer.JOB_TOPIC_DELETE + "))"
    })
@Designate(ocd = AkamaiPurgeJobCancelledEventHandlerConfiguration.class)
public final class AkamaiPurgeJobCancelledEventHandler extends AbstractJobCancelledEventHandler {

    private static final String TEMPLATE_INVALIDATE = "/etc/notification/email/waters/akamai-invalidate.txt";

    private static final String TEMPLATE_DELETE = "/etc/notification/email/waters/akamai-delete.txt";

    @Reference
    private EmailService emailService;

    private volatile String[] emailRecipients;

    private volatile String emailSubject;

    @Override
    protected EmailService getEmailService() {
        return emailService;
    }

    @Override
    protected String[] getEmailRecipients() {
        return emailRecipients;
    }

    @Override
    protected String getEmailSubject() {
        return emailSubject;
    }

    @Override
    protected String getTemplatePath(final String path, final String topic) {
        return AkamaiPurgeJobConsumer.JOB_TOPIC_INVALIDATE.equals(topic) ? TEMPLATE_INVALIDATE : TEMPLATE_DELETE;
    }

    @Activate
    @Modified
    protected void activate(final AkamaiPurgeJobCancelledEventHandlerConfiguration configuration) {
        emailRecipients = ArrayUtils.nullToEmpty(configuration.emailRecipients());
        emailSubject = configuration.emailSubject();
    }
}
