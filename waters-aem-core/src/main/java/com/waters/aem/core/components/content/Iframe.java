package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.library.asset.LibraryAsset;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Optional;

@Component(value = "Iframe",
    description = "This is the Iframe component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Iframe.class, ComponentExporter.class },
    resourceType = Iframe.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Iframe implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/iframe";

    @Inject
    private LibraryAsset libraryAsset;

    @DialogField(fieldLabel = "Source")
    @TextField
    @Inject
    private String source;

    public String getSource() {
        return Optional.ofNullable(libraryAsset)
            .map(LibraryAsset :: getPath)
            .orElse(source);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
