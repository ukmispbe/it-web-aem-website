package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ForcedResourceType;

import javax.inject.Inject;

@Component(value = "Text",
    description = "Rich Text Section",
    resourceSuperType = "core/wcm/components/text/v2/text",
    editConfig = false,
    suppressTouchUIDialog = true,
    suppressClassicUIDialog = true)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Text.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class Text implements com.adobe.cq.wcm.core.components.models.Text {

    public static final String RESOURCE_TYPE = "waters/components/content/text";

    @Self
    @Via(value = "core/wcm/components/text/v2/text", type = ForcedResourceType.class)
    private com.adobe.cq.wcm.core.components.models.Text text; // delegate to core component class

    @Inject
    private String title;

    public String getTitle() {
        return title;
    }

    // delegate methods

    @Override
    public String getText() {
        return text.getText();
    }

    @Override
    public boolean isRichText() {
        return text.isRichText();
    }

    @Override
    public String getExportedType() {
        return text.getExportedType();
    }
}
