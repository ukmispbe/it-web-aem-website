package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Button",
    description = "This is the Button component for Waters site",
    tabs = @Tab(title = "Properties", touchUINodeName = "properties"))
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Button implements ComponentExporter {

    @Self
    private Resource resource;

    @DialogField(fieldLabel = "Button Text",
        fieldDescription = "Enter the text for the button",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String buttonText;

    @DialogField(fieldLabel = "Button Tool Tip",
        fieldDescription = "Enter the tool tip text",
        ranking = 2)
    @TextField
    @Inject
    private String buttonToolTip;

    @DialogField(fieldLabel = "Button Link",
        fieldDescription = "Select or enter the link URL",
        required = true,
        ranking = 3)
    @PathField(rootPath = WatersConstants.ROOT_PATH)
    @LinkInject
    private Link buttonLink;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    public String getButtonText() {
        return buttonText;
    }

    public String getButtonToolTip() {
        return buttonToolTip;
    }

    public Link getButtonLink() {
        return buttonLink;
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
