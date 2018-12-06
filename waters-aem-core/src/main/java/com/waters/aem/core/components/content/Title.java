package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.icfolson.aem.library.core.components.AbstractComponent;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;

@Component(value = "Title",
    description = "Section Heading",
    resourceSuperType = "core/wcm/components/title/v2/title",
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class)
public final class Title extends AbstractComponent {

    public static final String RESOURCE_TYPE = "waters/components/content/title";
}
