package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuImage;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.servlets.ResizeImageServlet;
import com.waters.aem.core.utils.AssetUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Image Gallery",
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    })
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ImageGallery.class, ComponentExporter.class },
    resourceType = ImageGallery.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@SuppressWarnings("squid:S3252")
public final class ImageGallery implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/imagegallery";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final String SRC_URI_TEMPLATE_WIDTH = "{{width}}";

    @Inject
    private Resource resource;

    @ScriptVariable
    private Style currentStyle;

    @Inject
    private Sku sku;

    @DialogField(fieldLabel = "Primary Image",
        fieldDescription = "Primary Image to be displayed",
        ranking = 1,
        required = true)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String primaryImage;

    @DialogField(fieldLabel = "Primary Image Alt Text",
        fieldDescription = "Enter the Alt Text for the primary Image",
        ranking = 2)
    @TextField
    @Inject
    private String primaryImageAltText;

    @DialogField(fieldLabel = "Secondary Images",
        fieldDescription = "Secondary Images to be displayed",
        renderReadOnly = false,
        ranking = 3)
    @MultiField
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String[] secondaryImages = new String[0];

    private List<Asset> assets;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public String getJson() throws JsonProcessingException {
        final Map<String, Object> json = new HashMap<>();

        json.put("src", getSrc());
        json.put("alt", getAlt());
        json.put("templates", getUriTemplates());
        json.put("widths", getWidths());

        return MAPPER.writeValueAsString(json);
    }

    @SuppressWarnings("squid:S2259")
    public String getSrc() {
        return getPrimaryImageAsset() == null ? null : AssetUtils.buildUri(getPrimaryImageAsset(), false);
    }

    public String getAlt() {
        return getPrimaryImageAsset() == null ? "" : Optional.ofNullable(primaryImageAltText).orElse(
            AssetUtils.getAltText(getPrimaryImageAsset()));
    }

    private List<String> getUriTemplates() {
        return getAssets()
            .stream()
            .map(asset -> AssetUtils.buildUri(asset, true))
            .collect(Collectors.toList());
    }

    private List<String> getWidths() {
        return Arrays.asList(currentStyle.get(Image.PN_DESIGN_ALLOWED_RENDITION_WIDTHS, new String[0]));
    }

    private List<Asset> getAssets() {
        if (assets == null) {
            assets = new ArrayList<>();

            if (sku == null) {
                // if the sku is null, use the authored images
                assets.add(AssetUtils.getAsset(resource.getResourceResolver(), primaryImage));

                for (final String secondaryImage : secondaryImages) {
                    assets.add(AssetUtils.getAsset(resource.getResourceResolver(), secondaryImage));
                }
            } else {
                // if the sku exists, get the images imported from hybris
                final List<SkuImage> skuImages = sku.getImages();

                assets.addAll(skuImages
                    .stream()
                    .map(skuImage -> AssetUtils.getAsset(resource.getResourceResolver(), skuImage.getPath()))
                    .collect(Collectors.toList()));
            }
        }

        return assets.stream().filter(Objects :: nonNull).collect(Collectors.toList());
    }

    /**
     * Get the asset for the primary image - either from the Sku model if it exists or the authored image.
     *
     * @return DAM asset for the primary image file reference
     */
    private Asset getPrimaryImageAsset() {
        final List<Asset> primaryImgAssets = getAssets();

        return primaryImgAssets.isEmpty() ? null : primaryImgAssets.get(0);
    }
}
