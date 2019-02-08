package com.waters.aem.core.workflow.processes;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, property = {
    "service.description= Sets the Reveiwer in the metadata",
    "process.label=Set Reviewer Process"
})
public class SetReviewerProcess implements WorkflowProcess {

    private static final String SCI_OPS_MANAGER = "sciOpsMgrId";

    private static final String SCI_OPS_STEP = "SciOps Manager Review";

    private static final String MARKET_PRODUCT_MANAGER = "marketMgrId";

    private static final String MARKET_PRODUCT_STEP = "Market/Product Manager Review";

    private static final String MARCOM_MANAGER = "marcomMgrId";

    private static final String MARCOM_STEP = "Marcom Manager Review";

    private static final String REVIEW_STEP = "reviewStep";

    @Override
    public void execute(WorkItem item, WorkflowSession wfSession, MetaDataMap args) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + WorkflowUtils.JCR_CONTENT);
        ValueMap valueMap = resource.getValueMap();
        String reviewStep = item.getWorkflowData().getMetaDataMap().get(REVIEW_STEP, String.class);

        if(reviewStep == null){
            item.getWorkflowData().getMetaDataMap().put(WorkflowUtils.REVIEWER_ID, valueMap.get(SCI_OPS_MANAGER).toString());
            item.getWorkflowData().getMetaDataMap().put(REVIEW_STEP, SCI_OPS_STEP);
        } else if (reviewStep.equals(SCI_OPS_STEP)) {
            item.getWorkflowData().getMetaDataMap().put(WorkflowUtils.REVIEWER_ID, valueMap.get(MARKET_PRODUCT_MANAGER).toString());
            item.getWorkflowData().getMetaDataMap().put(REVIEW_STEP, MARKET_PRODUCT_STEP);
        } else if (reviewStep.equals(MARKET_PRODUCT_STEP)) {
            item.getWorkflowData().getMetaDataMap().put(WorkflowUtils.REVIEWER_ID, valueMap.get(MARCOM_MANAGER).toString());
            item.getWorkflowData().getMetaDataMap().put(REVIEW_STEP, MARCOM_STEP);
        }
    }
}
