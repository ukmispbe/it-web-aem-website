package com.waters.aem.core.services.impl;

import com.day.cq.mailer.MailService;
import com.day.cq.mailer.MailingException;
import com.waters.aem.core.services.EmailNotificationService;
import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.component.annotations.ReferenceCardinality;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

@Component(service = EmailNotificationService.class)
@Designate(ocd = EmailNotificationServiceConfiguration.class)
public class DefaultEmailNotificationService implements EmailNotificationService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultEmailNotificationService.class);

    @Reference(cardinality = ReferenceCardinality.OPTIONAL)
    private MailService mailService;

    private volatile String from;

    @Override
    public void sendEmail(final Set<String> recipients, final String subject, final String message) {
        if (mailService == null) {
            LOG.warn("mail service unavailable, email notification not sent");
        } else {
            final HtmlEmail email = new HtmlEmail();

            try {
                email.setFrom(from);
                email.setCharset(CharEncoding.UTF_8);
                email.setSubject(subject);
                email.setHtmlMsg(message);

                for (final String to : recipients) {
                    email.addBcc(to);
                }

                LOG.info("sending notification email with subject = {} to recipients = {}", subject, recipients);

                mailService.send(email);
            } catch (MailingException | EmailException e) {
                LOG.error("error sending notification email", e);
            }
        }
    }

    @Activate
    @Modified
    protected void activate(final EmailNotificationServiceConfiguration configuration) {
        from = configuration.from();
    }
}
