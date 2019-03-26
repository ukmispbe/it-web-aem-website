package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.wcm.api.policies.ContentPolicy;
import com.waters.aem.core.library.asset.LibraryAsset;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Optional;

@Component(value = "Iframe",
    description = "This is the Iframe component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Iframe.class, ComponentExporter.class },
    resourceType = Iframe.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Iframe implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/iframe";

    private static final String DEFAULT_HEIGHT = "600";

    private static final String HEIGHT = "height";

    @Inject
    private LibraryAsset libraryAsset;

    @Inject
    private ContentPolicy contentPolicy;

    @DialogField(fieldLabel = "Source",
        fieldDescription = "Enter the source for the iframe",
        required = true)
    @TextField
    @Inject
    private String source;

    public String getSource() {
        final String libraryAssetSource = Optional.ofNullable(libraryAsset)
            .map(LibraryAsset :: getPath)
            .orElse(null);

        // check the authored source first, then default to the library asset path
        return Optional.ofNullable(source).orElse(libraryAssetSource);
    }

    public String getHeight() {
        return contentPolicy != null ? contentPolicy.getProperties().get(HEIGHT, DEFAULT_HEIGHT) : DEFAULT_HEIGHT;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
