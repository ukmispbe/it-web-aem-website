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
    "service.description=Implementation of dynamic Author chooser",
    "chooser.label=Workflow Author Chooser"
})
public class DynamicAuthorSelectionStepImpl implements ParticipantStepChooser {

    private static final String JCR_CONTENT = "/jcr:content";

    private static final String AUTHOR = "scientistId";

    public String getParticipant(WorkItem item, WorkflowSession wfSession,
                                 MetaDataMap metaDataMap) throws WorkflowException {

        ResourceResolver resolver = wfSession.adaptTo(ResourceResolver.class);
        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + JCR_CONTENT);
        ValueMap valueMap = resource.getValueMap();
        String id = valueMap.get(AUTHOR).toString();

        return id;
    }
}
