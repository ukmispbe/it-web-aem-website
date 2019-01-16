package com.waters.aem.core.services;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.acs.commons.email.EmailServiceConstants;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Base class that sends email notifications for cancelled replication event jobs.
 */
public abstract class AbstractJobCancelledEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractJobCancelledEventHandler.class);

    private static final String PARAM_PATH = "path";

    @Override
    public void handleEvent(final Event event) {
        final String path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
        final String topic = (String) event.getProperty(NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC);

        LOG.info("job cancelled for page path : {} and topic : {}, sending notification email", path, topic);

        final String templatePath = getTemplatePath(path, topic);

        LOG.debug("using email template path : {}", templatePath);

        sendEmailNotification(path, templatePath);
    }

    /**
     * Get the email service.
     *
     * @return email service reference
     */
    protected abstract EmailService getEmailService();

    /**
     * Get the list of email recipients as defined in the OSGi service configuration.
     *
     * @return email addresses to receive notification email
     */
    protected abstract String[] getEmailRecipients();

    /**
     * Get the email subject as defined in the OSGi service configuration.
     *
     * @return notification email subject
     */
    protected abstract String getEmailSubject();

    /**
     * Get the email template path for the given page path and job topic.
     *
     * @param path replicated page path
     * @param topic job topic
     * @return email template path
     */
    protected abstract String getTemplatePath(final String path, final String topic);

    private void sendEmailNotification(final String path, final String templatePath) {
        if (getEmailRecipients().length > 0) {
            final Map<String, String> params = new HashMap<>();

            params.put(EmailServiceConstants.SUBJECT, getEmailSubject());
            params.put(PARAM_PATH, path);

            getEmailService().sendEmail(templatePath, params, getEmailRecipients());
        } else {
            LOG.warn("no email recipients configured, notification message not sent");
        }
    }
}
