package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Component(value = "Image",
    description = "Smart Adaptive Image",
    resourceSuperType = "core/wcm/components/image/v2/image",
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class)
public final class Image{

    public static final String RESOURCE_TYPE = "waters/components/content/image";
}
