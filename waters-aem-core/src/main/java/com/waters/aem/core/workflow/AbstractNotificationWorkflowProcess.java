package com.waters.aem.core.workflow;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.acs.commons.email.EmailServiceConstants;
import com.adobe.granite.security.user.util.AuthorizableUtil;
import com.adobe.granite.workflow.exec.WorkItem;
import com.day.cq.commons.Externalizer;
import com.day.cq.commons.jcr.JcrConstants;
import com.waters.aem.core.utils.WorkflowUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.jcr.RepositoryException;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractNotificationWorkflowProcess {

    private static final Logger LOGGER = LoggerFactory.getLogger(AbstractNotificationWorkflowProcess.class);

    protected void sendNotification(ResourceResolver resolver, WorkItem item, String reviewerId, String recipientId, String templatePath, EmailService emailService) {

        UserManager userManager = resolver.adaptTo(UserManager.class);
        Map<String, String> emailParams = getEmailParams(resolver, item, reviewerId, recipientId);
        String emailAddress = getEmailAddress(userManager, recipientId);
        if(!StringUtils.isBlank(emailAddress)){
            emailService.sendEmail(templatePath, emailParams , emailAddress);
        }
    }

    private Map<String,String> getEmailParams(ResourceResolver resolver, WorkItem item, String reviewerId, String recipientId) {

        Map<String, String> emailParams = new HashMap<>();
        ValueMap valueMap = WorkflowUtils.getPayloadProperties(resolver, item);

        Externalizer externalizer = resolver.adaptTo(Externalizer.class);
        String path = item.getWorkflowData().getPayload().toString();
        String editorPath = WorkflowConstants.EDITOR_HTML + path;
        String externalizedPageUrl = externalizer.authorLink(resolver, editorPath) + WorkflowConstants.HTML_EXTENSION;
        String externalizedInboxUrl = externalizer.authorLink(resolver, WorkflowConstants.INBOX_PATH);

        String stepTitle = WorkflowUtils.getReviewStep(item);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE, d MMM yyyy HH:mm:ss");
        LocalDateTime localDateTime = LocalDateTime.now();
        String formattedDateTime = localDateTime.format(formatter);

        emailParams.put(EmailServiceConstants.SENDER_EMAIL_ADDRESS, "no-reply@waters.com");
        emailParams.put(EmailServiceConstants.SUBJECT, getEmailSubject(stepTitle));
        emailParams.put("emailText", getEmailText(stepTitle));
        emailParams.put("stepTitle", stepTitle);
        emailParams.put("recipientName", AuthorizableUtil.getFormattedName(resolver, recipientId));
        emailParams.put("reviewerName", AuthorizableUtil.getFormattedName(resolver, reviewerId));
        emailParams.put("pageTitle", valueMap.get(JcrConstants.JCR_TITLE, ""));
        emailParams.put("workflowTitle", item.getWorkflow().getWorkflowModel().getTitle());
        emailParams.put("pageUrl", externalizedPageUrl);
        emailParams.put("inboxUrl", externalizedInboxUrl);
        emailParams.put("timeStamp", formattedDateTime);

        return emailParams;
    }

    private String getEmailAddress(UserManager userManager, String id) {
        String emailAddress = "";

        try {
            Authorizable authorizable = userManager.getAuthorizable(id);
            emailAddress = authorizable.getProperty(WorkflowConstants.PROFILE_EMAIL)[0].toString();
        } catch (RepositoryException e) {
            LOGGER.error("Repository Exception", e);
        }

        return emailAddress;
    }

    private String getEmailSubject(String stepTitle) {
        String subject;
        switch(stepTitle) {
            case WorkflowConstants.PUBLISH_REQUEST_REJECTED: subject = WorkflowConstants.PUBLISH_REQUEST_REJECTED;
                break;
            case WorkflowConstants.WORKFLOW_COMPLETED: subject = WorkflowConstants.WORKFLOW_COMPLETED_EMAIL_SUBJECT;
                break;
            default: subject = WorkflowConstants.APPLICATION_NOTES_DESIGN_REVIEW;
                break;
        }
        return subject;
    }

    private String getEmailText(String stepTitle) {
        return stepTitle.equals(WorkflowConstants.PUBLISH_REQUEST_REJECTED) ? WorkflowConstants.REJECTION_NOTIFICATION_TEXT : WorkflowConstants.REVIEW_NOTIFICATION_TEXT;
    }
}
