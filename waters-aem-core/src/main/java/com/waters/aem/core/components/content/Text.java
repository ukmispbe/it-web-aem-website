package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Text",
    description = "Rich Text Section",
    resourceSuperType = Text.RESOURCE_SUPER_TYPE,
    editConfig = false,
    tabs = @Tab(title = "Properties", touchUINodeName = "properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Text.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Text implements com.adobe.cq.wcm.core.components.models.Text {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/text/v2/text";

    public static final String RESOURCE_TYPE = "waters/components/content/text";

    public static final String PROPERTY_TEXT = "text";

    public static final String PROPERTY_INDEXED = "indexed";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Text delegate; // delegate to core component class

    @DialogField(fieldLabel = "Title", orderBefore = PROPERTY_TEXT)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Indexed?",
        fieldDescription = "Select whether this text should be added to the search index.")
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean indexed;

    public String getTitle() {
        return title;
    }

    public boolean isIndexed() {
        return indexed;
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

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
