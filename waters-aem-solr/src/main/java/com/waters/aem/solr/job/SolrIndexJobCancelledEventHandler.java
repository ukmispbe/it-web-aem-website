package com.waters.aem.solr.job;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.acs.commons.email.EmailServiceConstants;
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

import java.util.HashMap;
import java.util.Map;

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

    private static final String TEMPLATE_ADD = "/etc/notification/email/waters/solr-add.txt";

    private static final String TEMPLATE_DELETE = "/etc/notification/email/waters/solr-delete.txt";

    private static final String PARAM_PATH = "path";

    @Reference
    private EmailService emailService;

    private volatile String[] emailRecipients;

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
        emailRecipients = ArrayUtils.nullToEmpty(configuration.emailRecipients());
        emailSubject = configuration.emailSubject();
    }

    private void sendEmailNotification(final String path, final String topic) {
        if (emailRecipients.length > 0) {
            final Map<String, String> params = new HashMap<>();

            params.put(EmailServiceConstants.SUBJECT, emailSubject);
            params.put(PARAM_PATH, path);

            final String templatePath = SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD.equals(
                topic) ? TEMPLATE_ADD : TEMPLATE_DELETE;

            emailService.sendEmail(templatePath, params, emailRecipients);
        } else {
            LOG.warn("no email recipients configured, notification message not sent");
        }
    }
}
