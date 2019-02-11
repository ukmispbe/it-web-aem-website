package com.waters.aem.core.workflow.processes;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import com.waters.aem.core.workflow.AbstractNotificationWorkflowProcess;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(immediate = true, property = {
    "service.description=Sends Email Notification to Request A Review",
    "process.label=Review Requested Notification Process"
})
public class ReviewRequestedNotificationStep extends AbstractNotificationWorkflowProcess implements WorkflowProcess {

    private static final String TEMPLATE_PATH = "/etc/notification/email/waters/review-request.txt";

    @Reference
    private EmailService emailService;

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap args) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        UserManager userManager = resolver.adaptTo(UserManager.class);
        String reviewerId = WorkflowUtils.getReviewerId(item);

        if(!StringUtils.isBlank(reviewerId)){
            sendNotification(userManager, resolver, item, reviewerId, reviewerId, TEMPLATE_PATH, emailService);
        }

    }
}
