package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Component(value = "List",
    description = "Configurable collection of items or content",
    resourceSuperType = "core/wcm/components/list/v2/list",
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class)
public final class List {

    public static final String RESOURCE_TYPE = "waters/components/content/list";
}
