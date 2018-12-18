package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.HideDialogField;
import com.citytechinc.cq.component.annotations.Property;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.RichTextEditor;
import com.citytechinc.cq.component.annotations.widgets.ToolbarConfig;
import com.citytechinc.cq.component.annotations.widgets.rte.Format;
import com.citytechinc.cq.component.annotations.widgets.rte.SubSuperscript;
import com.citytechinc.cq.component.annotations.widgets.rte.UISettings;
import com.day.cq.commons.jcr.JcrConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;

@Component(value = "Title",
    description = "Section Heading",
    resourceSuperType = Title.RESOURCE_SUPER_TYPE,
    tabs = @Tab(title = "Properties", touchUINodeName = "properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Title.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Title implements com.adobe.cq.wcm.core.components.models.Title {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/title/v2/title";

    static final String RESOURCE_TYPE = "waters/components/content/title";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Title delegate; // delegate to core component class

    @DialogField(fieldLabel = "Title",
        fieldDescription = "Leave empty to use the page title.",
        fieldName = "title",
        name = "./" + JcrConstants.JCR_TITLE,
        additionalProperties = {
            @Property(name = "useFixedInlineToolbar", value = "true"),
            @Property(name = "removeSingleParagraphContainer", value = "true")
        })
    @RichTextEditor(
        format = @Format(underline = false),
        subsuperscript = @SubSuperscript,
        uiSettings = @UISettings(
            inline = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT
            }),
            fullscreen = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT
            })
        )
    )
    @Override
    public String getText() {
        return delegate.getText();
    }

    @DialogField
    @HideDialogField
    @Override
    public String getLinkURL() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String getType() {
        return delegate.getType();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }
}
