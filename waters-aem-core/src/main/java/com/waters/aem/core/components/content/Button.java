package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.Switch;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.icfolson.aem.library.api.link.Link;
import com.icfolson.aem.library.core.constants.PathConstants;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.icfolson.aem.library.models.annotations.LinkInject;
import com.waters.aem.core.library.asset.LibraryAsset;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component(value = "Button",
    description = "This is the Button component for Waters site",
    tabs = @Tab(title = "Properties"))
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Button.class, ComponentExporter.class },
    resourceType = Button.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Button implements ComponentExporter {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static final String RESOURCE_TYPE = "waters/components/content/button";

    @Inject
    private Resource resource;

    @Inject
    private LibraryAsset libraryAsset;

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
        ranking = 3)
    @PathField(rootPath = PathConstants.PATH_CONTENT)
    @LinkInject
    private Link buttonLink;

    @DialogField(fieldLabel = "Open in New Window",
        fieldDescription = "Select this option to open in new window",
        ranking = 4)
    @Switch(offText = "No", onText = "Yes")
    @Inject
    @Default(booleanValues = false)
    private Boolean newWindow;

    private Map<String, Object> assetMetadata;

    public String getButtonText() {
        return buttonText;
    }

    public String getButtonToolTip() {
        return buttonToolTip;
    }

    public Link getButtonLink() {
        final Link libraryAssetLink = Optional.ofNullable(libraryAsset)
            .map(asset -> LinkBuilderFactory.forPath(asset.getPath()).build())
            .orElse(null);

        // check the authored link first, then default to the library asset link if available, otherwise return null
        return Optional.ofNullable(buttonLink).orElse(libraryAssetLink);
    }

    public Boolean isNewWindow() {
        return newWindow;
    }

    public String getAssetMetadataJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getAssetMetadata());
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    private Map<String, Object> getAssetMetadata() {
        if (assetMetadata == null) {
            assetMetadata = new HashMap<>();

            if (isAsset()) {
                final Resource assetResource = resource.getResourceResolver().getResource(buttonLink.getPath());

                if (assetResource != null) {
                    assetMetadata = assetResource.adaptTo(Asset.class).getMetadata();
                }
            }
        }

        return assetMetadata;
    }

    private Boolean isAsset() {
        return buttonLink != null && buttonLink.getPath().startsWith(PathConstants.PATH_CONTENT_DAM);
    }
}
