package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Component(value = "Text",
    description = "Rich Text Section",
    resourceSuperType = "core/wcm/components/text/v2/text",
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class)
public final class Text {

    public static final String RESOURCE_TYPE = "waters/components/content/text";
}
