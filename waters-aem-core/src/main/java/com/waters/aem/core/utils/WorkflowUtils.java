package com.waters.aem.core.utils;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.exec.WorkItem;
import com.day.cq.commons.Externalizer;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import java.util.HashMap;
import java.util.Map;

public class WorkflowUtils {

    private static Logger logger = LoggerFactory.getLogger(WorkflowUtils.class);

    public static final String JCR_CONTENT = "/jcr:content";

    private static final String JCR_TITLE = "jcr:title";

    private static final String HTML_EXTENSION = ".html";

    private static final String INBOX_PATH = "/aem/inbox";

    private static final String STEP_TITLE = "reviewStep";

    private static final String PROFILE_FIRST_NAME = "profile/givenName";

    private static final String PROFILE_LAST_NAME = "profile/familyName";

    private static final String PROFILE_EMAIL = "profile/email";

    public static final String REVIEWER_ID = "reviewerId";

    public static void sendNotification(UserManager userManager, ResourceResolver resolver, WorkItem item, String reviewerId, String recipientId, String templatePath, EmailService emailService) {
        Map<String, String> emailParams = new HashMap<>();
        emailParams = getEmailParams(emailParams, userManager, resolver, item, reviewerId, recipientId);
        String[] reviewerAddress = {getEmailAddress(userManager, reviewerId)};
        emailService.sendEmail(templatePath, emailParams , reviewerAddress);
    }

    public static Map<String,String> getEmailParams(Map<String,String> emailParams, UserManager userManager, ResourceResolver resolver, WorkItem item, String reviewerId, String recipientId) {

        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + JCR_CONTENT);
        ValueMap valueMap = resource.getValueMap();
        Externalizer externalizer = resolver.adaptTo(Externalizer.class);
        String host = externalizer.authorLink(resolver, path);
        String externalizedUrl =  host + HTML_EXTENSION;
        String inboxUrl = host + INBOX_PATH;

        emailParams.put("senderEmailAddress", "no-reply@waters.com");
        emailParams.put("recipientName", getFullName(userManager, recipientId));
        emailParams.put("reviewerName", getFullName(userManager, reviewerId));
        emailParams.put("pageTitle", valueMap.get(JCR_TITLE).toString());
        emailParams.put("path", externalizedUrl);
        emailParams.put("inboxUrl", inboxUrl);
        emailParams.put("stepTitle", item.getWorkflowData().getMetaDataMap().get(STEP_TITLE).toString());

        return emailParams;
    }

    public static String getFullName(UserManager userManager, String id) {
        String fullName = "";

        try {
            Authorizable authorizable = userManager.getAuthorizable(id);
            String firstName = authorizable.getProperty(PROFILE_FIRST_NAME)[0].toString();
            String lastName = authorizable.getProperty(PROFILE_LAST_NAME)[0].toString();
            fullName = firstName + " " + lastName;
        } catch (RepositoryException e) {
            logger.error("Repository Exception", e);
        }

        return fullName;
    }

    public static String getEmailAddress(UserManager userManager, String id) {
        String emailAddress = "";

        try {
            Authorizable authorizable = userManager.getAuthorizable(id);
            emailAddress = authorizable.getProperty(PROFILE_EMAIL)[0].toString();
        } catch (RepositoryException e) {
            logger.error("Repository Exception", e);
        }

        return emailAddress;
    }
}
