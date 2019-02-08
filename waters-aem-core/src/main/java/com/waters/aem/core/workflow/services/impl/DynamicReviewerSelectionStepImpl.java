package com.waters.aem.core.workflow.services.impl;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.utils.WorkflowUtils;
import org.osgi.service.component.annotations.Component;


@Component(immediate = true, property = {
    "service.description=Implementation of Dynamic Reviewer chooser",
    "chooser.label=Workflow Reviewer Chooser"
})
public class DynamicReviewerSelectionStepImpl implements ParticipantStepChooser {

    public String getParticipant(WorkItem item, WorkflowSession wfSession,
                                 MetaDataMap metaDataMap) throws WorkflowException {

        String reviewerId = item.getWorkflowData().getMetaDataMap().get(WorkflowUtils.REVIEWER_ID, String.class);

        return reviewerId;
    }

}
