package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Image Gallery")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ImageGallery.class, ComponentExporter.class },
    resourceType = ImageGallery.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class ImageGallery implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/imagegallery";

    @Self
    private Resource resource;

    @Inject
    private Sku sku;

    @DialogField(fieldLabel = "Primary Image",
        fieldDescription = "Primary Image to be displayed",
        ranking = 1,
        required = true)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    private String primaryImage;

    @DialogField(fieldLabel = "Primary Image Alt Text",
        fieldDescription = "Enter the Alt Text for the primary Image",
        ranking = 2)
    @TextField
    @Inject
    private String primaryImageAltText;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
