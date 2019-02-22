package com.waters.aem.core.workflow.processes;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import com.waters.aem.core.workflow.AbstractNotificationWorkflowProcess;
import com.waters.aem.core.workflow.WorkflowConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

@Component(immediate = true, property = {
    "service.description= Sends Email Notification for workflow completion",
    "process.label= Workflow Completed Notification Process"
})
public class WorkflowCompletedNotificationStep extends AbstractNotificationWorkflowProcess implements WorkflowProcess {

    private static final String TEMPLATE_PATH = "/etc/notification/email/waters/workflow-completed-email-template.txt";

    @Reference
    private EmailService emailService;

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap args) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        String initiatorId = item.getWorkflow().getInitiator();
        String workflowTitle = item.getWorkflow().getWorkflowModel().getTitle();
        String stepTitle = WorkflowUtils.getReviewStep(item);

        if(workflowTitle.equals("Design Review Workflow") && !stepTitle.equals(WorkflowConstants.PUBLISH_REQUEST_REJECTED) ||
            !workflowTitle.equals("Design Review Workflow")) {

            MetaDataMap metadataMap = item.getWorkflowData().getMetaDataMap();
            metadataMap.put(WorkflowConstants.REVIEW_STEP,WorkflowConstants.WORKFLOW_COMPLETED);

            if(!StringUtils.isBlank(initiatorId)) {
                sendNotification(resolver, item, initiatorId, initiatorId, TEMPLATE_PATH, emailService);
            }
        }
    }
}
