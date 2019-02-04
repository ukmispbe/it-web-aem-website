package com.waters.aem.core.workflow.services.impl;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;

@Component(immediate = true, property = {
    "service.description=Implementation of Dynamic Reviewer chooser",
    "chooser.label=Workflow Reviewer Chooser"
})
public class DynamicReviewerSelectionStepImpl implements ParticipantStepChooser {

    private static final String JCR_CONTENT = "/jcr:content";

    private static final String START_STEP = "Start";

    private static final String SCI_OPS_MANAGER = "sciOpsMgrId";

    private static final String SCI_OPS_STEP = "SciOps Manager Review";

    private static final String MARKET_PRODUCT_MANAGER = "marketMgrId";

    private static final String MARKET_PRODUCT_STEP = "Market/Product Manager Review";

    private static final String MARCOM_MANAGER = "marcomMgrId";

    public String getParticipant(WorkItem item, WorkflowSession wfSession,
                                 MetaDataMap metaDataMap) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + JCR_CONTENT);
        ValueMap valueMap = resource.getValueMap();
        String stepTitle = item.getNode().getTitle();
        String id = "";

        switch(stepTitle){
            case START_STEP: id = valueMap.get(SCI_OPS_MANAGER).toString();
                break;
            case SCI_OPS_STEP: id = valueMap.get(MARKET_PRODUCT_MANAGER).toString();
                break;
            case MARKET_PRODUCT_STEP: id = valueMap.get(MARCOM_MANAGER).toString();
                break;
        }

        return id;
    }

}
