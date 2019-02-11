package com.waters.aem.core.workflow.processes;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import com.waters.aem.core.workflow.WorkflowConstants;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, property = {
    "service.description= Sets the Reviewer in the metadata",
    "process.label=Set Reviewer Process"
})
public class SetReviewerProcess implements WorkflowProcess {

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap args) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        ValueMap valueMap = WorkflowUtils.getPayloadProperties(resolver, item);
        MetaDataMap metadataMap = item.getWorkflowData().getMetaDataMap();
        String reviewStep = WorkflowUtils.getReviewStep(item);

        if(reviewStep == null){
            metadataMap.put(WorkflowConstants.REVIEWER_ID, valueMap.get(WorkflowConstants.SCI_OPS_MANAGER_ID).toString());
            metadataMap.put(WorkflowConstants.REVIEW_STEP, WorkflowConstants.SCI_OPS_REVIEW_STEP);
        } else if (reviewStep.equals(WorkflowConstants.SCI_OPS_REVIEW_STEP)) {
            metadataMap.put(WorkflowConstants.REVIEWER_ID, valueMap.get(WorkflowConstants.MARKET_PRODUCT_MANAGER_ID).toString());
            metadataMap.put(WorkflowConstants.REVIEW_STEP,WorkflowConstants. MARKET_PRODUCT_REVIEW_STEP);
        } else if (reviewStep.equals(WorkflowConstants.MARKET_PRODUCT_REVIEW_STEP)) {
            metadataMap.put(WorkflowConstants.REVIEWER_ID, valueMap.get(WorkflowConstants.MARCOM_MANAGER_ID).toString());
            metadataMap.put(WorkflowConstants.REVIEW_STEP, WorkflowConstants.MARCOM_REVIEW_STEP);
        }
    }
}
