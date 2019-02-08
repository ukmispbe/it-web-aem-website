package com.waters.aem.core.workflow.processes;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(immediate = true, property = {
    "service.description= Sends Email Notification for Publish Request Rejection",
    "process.label=Reject Publish Request Notification Process"
})
public class RejectPublishRequestNotificationStep implements WorkflowProcess {

    private static final String TEMPLATE_PATH = "/etc/notification/email/waters/reject-publish-request.txt";

    private static final String AUTHOR = "scientistId";

    @Reference
    EmailService emailService;

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap metaDataMap) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        UserManager userManager = resolver.adaptTo(UserManager.class);
        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + WorkflowUtils.JCR_CONTENT);
        ValueMap valueMap = resource.getValueMap();
        String authorId = valueMap.get(AUTHOR).toString();
        String initiatorId = item.getWorkflow().getInitiator();
        String reviewerId = item.getWorkflowData().getMetaDataMap().get(WorkflowUtils.REVIEWER_ID).toString();

        if(!StringUtils.isBlank(initiatorId)){
            WorkflowUtils.sendNotification(userManager, resolver, item, reviewerId, initiatorId, TEMPLATE_PATH, emailService);
        }
        if(!StringUtils.isBlank(authorId)){
            WorkflowUtils.sendNotification(userManager, resolver, item, reviewerId, authorId, TEMPLATE_PATH, emailService);
        }
    }
}
