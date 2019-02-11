package com.waters.aem.core.utils;

import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.waters.aem.core.workflow.WorkflowConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;

public class WorkflowUtils {

    public static String getReviewerId(WorkItem item) {
        return item.getWorkflowData().getMetaDataMap().get(WorkflowConstants.REVIEWER_ID, String.class);
    }

    public static String getReviewStep(WorkItem item) {
        MetaDataMap metadataMap = item.getWorkflowData().getMetaDataMap();
        return metadataMap.get(WorkflowConstants.REVIEW_STEP, String.class);
    }

    public static ValueMap getPayloadProperties(ResourceResolver resolver, WorkItem item){
        String path = item.getWorkflowData().getPayload().toString();
        Resource resource = resolver.getResource(path + WorkflowConstants.JCR_CONTENT);
        return resource.getValueMap();
    }

    private WorkflowUtils() {

    }
}
