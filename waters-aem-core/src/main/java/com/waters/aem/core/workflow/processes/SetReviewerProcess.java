package com.waters.aem.core.workflow.processes;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;

import static com.waters.aem.core.workflow.WorkflowConstants.LEGAL_REVIEWER_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.LEGAL_REVIEW_STEP;
import static com.waters.aem.core.workflow.WorkflowConstants.MARCOM_MANAGER_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.MARCOM_REVIEW_STEP;
import static com.waters.aem.core.workflow.WorkflowConstants.MARKET_PRODUCT_MANAGER_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.MARKET_PRODUCT_REVIEW_STEP;
import static com.waters.aem.core.workflow.WorkflowConstants.REVIEWER_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.REVIEW_STEP;
import static com.waters.aem.core.workflow.WorkflowConstants.SCIENTIST_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.SCIENTIST_REVIEW_STEP;
import static com.waters.aem.core.workflow.WorkflowConstants.SCI_OPS_MANAGER_ID;
import static com.waters.aem.core.workflow.WorkflowConstants.SCI_OPS_REVIEW_STEP;

@Component(immediate = true, property = {
    "service.description= Sets the Reviewer in the metadata",
    "process.label=Set Reviewer Process"
})
public class SetReviewerProcess implements WorkflowProcess {

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap args) {
        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        ValueMap valueMap = WorkflowUtils.getPayloadProperties(resolver, item);
        MetaDataMap metadataMap = item.getWorkflowData().getMetaDataMap();
        String reviewStep = WorkflowUtils.getReviewStep(item);

        if (reviewStep == null) {
            metadataMap.put(REVIEWER_ID, valueMap.get(SCIENTIST_ID).toString());
            metadataMap.put(REVIEW_STEP, SCIENTIST_REVIEW_STEP);
        } else if (reviewStep.equals(SCIENTIST_REVIEW_STEP)) {
            metadataMap.put(REVIEWER_ID, valueMap.get(SCI_OPS_MANAGER_ID).toString());
            metadataMap.put(REVIEW_STEP, SCI_OPS_REVIEW_STEP);
        } else if (reviewStep.equals(SCI_OPS_REVIEW_STEP)) {
            metadataMap.put(REVIEWER_ID, valueMap.get(MARKET_PRODUCT_MANAGER_ID).toString());
            metadataMap.put(REVIEW_STEP, MARKET_PRODUCT_REVIEW_STEP);
        } else if (reviewStep.equals(MARKET_PRODUCT_REVIEW_STEP)) {
            if (valueMap.containsKey(LEGAL_REVIEWER_ID)) {
                metadataMap.put(REVIEWER_ID, valueMap.get(LEGAL_REVIEWER_ID).toString());
                metadataMap.put(REVIEW_STEP, LEGAL_REVIEW_STEP);
            } else {
                metadataMap.put(REVIEWER_ID, valueMap.get(MARCOM_MANAGER_ID).toString());
                metadataMap.put(REVIEW_STEP, MARCOM_REVIEW_STEP);
            }
        } else if (reviewStep.equals(LEGAL_REVIEW_STEP)) {
            metadataMap.put(REVIEWER_ID, valueMap.get(MARCOM_MANAGER_ID).toString());
            metadataMap.put(REVIEW_STEP, MARCOM_REVIEW_STEP);
        }
    }
}
