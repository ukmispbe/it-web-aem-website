package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.Html5SmartImage;
import com.day.cq.wcm.foundation.Image;
import com.icfolson.aem.library.models.annotations.ImageInject;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;

@Component(value = "Banner",
    description = "This is the Banner component for Waters site")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Banner implements ComponentExporter {

    @Self
    private Resource resource;

    @DialogField(fieldLabel = "Background Image",
        fieldDescription = "Select background image for the banner",
        ranking = 1)
    @Html5SmartImage(tab = false, allowUpload = false, height = 150)
    @ImageInject
    private Image backgroundImage;

    public Image getBackgroundImage() {
        return backgroundImage;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
