package com.waters.aem.solr.job;

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
 * Event handler for Solr index job cancellations, providing email notification to a configured list of recipients.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_CANCELLED,
        EventConstants.EVENT_FILTER + "=(|(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "="
            + SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD + ")(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC
            + "=" + SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE + "))"
    })
@Designate(ocd = SolrIndexJobCancelledEventHandlerConfiguration.class)
public final class SolrIndexJobCancelledEventHandler extends AbstractJobCancelledEventHandler {

    private static final String TEMPLATE_ADD = "/etc/notification/email/waters/solr-add.txt";

    private static final String TEMPLATE_DELETE = "/etc/notification/email/waters/solr-delete.txt";

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
        return SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD.equals(topic) ? TEMPLATE_ADD : TEMPLATE_DELETE;
    }

    @Activate
    @Modified
    protected void activate(final SolrIndexJobCancelledEventHandlerConfiguration configuration) {
        emailRecipients = ArrayUtils.nullToEmpty(configuration.emailRecipients());
        emailSubject = configuration.emailSubject();
    }
}
