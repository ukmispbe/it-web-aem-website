package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
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

@Component(value = "Image",
    description = "Smart Adaptive Image",
    resourceSuperType = Image.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Image.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Image implements com.adobe.cq.wcm.core.components.models.Image{

    public static final String RESOURCE_TYPE = "waters/components/content/image";

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/image/v2/image";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Image delegate;

    @DialogField(fieldLabel = "Caption",
        fieldDescription = "Leave empty to use the page title.",
        fieldName = "caption",
        name = "./" + JcrConstants.JCR_TITLE
        )
    @RichTextEditor(
        format = @Format(underline = false),
        subsuperscript = @SubSuperscript,
        uiSettings = @UISettings(
            inline = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT,
                ToolbarConfig.JUSTIFY_JUSITFYLEFT,
                ToolbarConfig.JUSTIFY_JUSITFYCENTER,
                ToolbarConfig.JUSTIFY_JUSITFYRIGHT
            }),
            fullscreen = @ToolbarConfig(toolbars = {
                ToolbarConfig.FORMAT_BOLD,
                ToolbarConfig.FORMAT_ITALIC,
                ToolbarConfig.SUBSUPERSCRIPT_SUBSCRIPT,
                ToolbarConfig.SUBSUPERSCRIPT_SUPERSCRIPT,
                ToolbarConfig.JUSTIFY_JUSITFYLEFT,
                ToolbarConfig.JUSTIFY_JUSITFYCENTER,
                ToolbarConfig.JUSTIFY_JUSITFYRIGHT
            })
        )
    )
    @Override
    public String getTitle() {
        return delegate.getTitle();
    }

    @Override
    public  String getSrc() {
        return delegate.getSrc();
    }

    @Override
    public String getFileReference() {
        return delegate.getFileReference();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }
}
