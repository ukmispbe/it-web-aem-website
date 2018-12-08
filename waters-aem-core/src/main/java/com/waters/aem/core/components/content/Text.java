package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.inject.Inject;

@Component(value = "Text",
    description = "Rich Text Section",
    resourceSuperType = Text.RESOURCE_SUPER_TYPE,
    editConfig = false,
    suppressTouchUIDialog = true,
    suppressClassicUIDialog = true)
@Model(adaptables = SlingHttpServletRequest.class, resourceType = Text.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Text implements com.adobe.cq.wcm.core.components.models.Text {

    public static final String RESOURCE_TYPE = "waters/components/content/text";

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/text/v2/text";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Text delegate; // delegate to core component class

    @Inject
    @Optional
    private String title;

    public String getTitle() {
        return title;
    }

    // delegate methods

    @Override
    public String getText() {
        return delegate.getText();
    }

    @Override
    public boolean isRichText() {
        return delegate.isRichText();
    }

    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }
}
