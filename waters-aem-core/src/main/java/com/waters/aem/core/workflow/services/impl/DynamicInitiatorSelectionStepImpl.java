package com.waters.aem.core.workflow.services.impl;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.osgi.service.component.annotations.Component;


@Component(immediate = true, property = {
    "service.description=Implementation of dynamic initiator chooser",
    "chooser.label=Workflow Initiator Chooser"
})
public class DynamicInitiatorSelectionStepImpl implements ParticipantStepChooser {

    public String getParticipant(WorkItem item, WorkflowSession wfSession,
                                 MetaDataMap metaDataMap) throws WorkflowException {

        String initiator = item.getWorkflow().getInitiator();

        return initiator;
    }
}
