package com.waters.aem.solr.job;

import com.google.common.collect.Sets;
import com.waters.aem.core.services.EmailNotificationService;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

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
public final class SolrIndexJobCancelledEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexJobCancelledEventHandler.class);

    @Reference
    private EmailNotificationService emailNotificationService;

    private volatile Set<String> emailRecipients;

    private volatile String emailSubject;

    @Override
    public void handleEvent(final Event event) {
        final String path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
        final String topic = (String) event.getProperty(NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC);

        LOG.info("solr index job cancelled for path : {} and topic : {}, sending notification email", path, topic);

        sendEmailNotification(path, topic);
    }

    @Activate
    @Modified
    protected void activate(final SolrIndexJobCancelledEventHandlerConfiguration configuration) {
        emailRecipients = Sets.newHashSet(ArrayUtils.nullToEmpty(configuration.emailRecipients()));
        emailSubject = configuration.emailSubject();
    }

    private void sendEmailNotification(final String path, final String topic) {
        final String message = new StringBuilder()
            .append("Path: ")
            .append(path)
            .append('\n')
            .append("Operation: ")
            .append(SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD.equals(topic) ? "Add" : "Delete")
            .toString();

        emailNotificationService.sendEmail(emailRecipients, emailSubject, message);
    }
}
