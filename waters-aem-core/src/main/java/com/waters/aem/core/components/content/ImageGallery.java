package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuImage;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.servlets.ResizeImageServlet;
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

@Component(value = "Image Gallery")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ImageGallery.class, ComponentExporter.class },
    resourceType = ImageGallery.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
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
        ranking = 3)
    @MultiField
    @TextField
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

    public String getSrc() {
        return getPrimaryImageAsset() == null ? null : buildUri(getPrimaryImageAsset(), false);
    }

    public String getAlt() {
        return getPrimaryImageAsset() == null ? "" : Optional.ofNullable(primaryImageAltText).orElse(
            getAltText(getPrimaryImageAsset()));
    }

    private List<String> getUriTemplates() {
        return getAssets()
            .stream()
            .map(asset -> buildUri(asset, true))
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
                assets.add(getAsset(primaryImage));

                for (final String secondaryImage : secondaryImages) {
                    assets.add(getAsset(secondaryImage));
                }
            } else {
                // if the sku exists, get the images imported from hybris
                final List<SkuImage> skuImages = sku.getImages();

                assets.addAll(skuImages
                    .stream()
                    .map(skuImage -> getAsset(skuImage.getPath()))
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
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    private String buildUri(final Asset asset, final boolean template) {
        final StringBuilder builder = new StringBuilder();

        // append the DAM asset path
        builder.append(asset.getPath());

        if (template) {
            builder.append(".");

            // width selector
            builder.append(SRC_URI_TEMPLATE_WIDTH);
            builder.append(".");

            // 'resize' extension to resolve the resize image servlet
            builder.append(ResizeImageServlet.RESIZE_EXTENSION);
            builder.append("/");
            builder.append(ResizeImageServlet.SUFFIX_NAME);
            builder.append(".");

            // add the extension derived from DAM asset name
            builder.append(FilenameUtils.getExtension(asset.getName()));
        }

        return builder.toString();
    }

    private String getAltText(final Asset asset) {
        return Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_DESCRIPTION))
            .orElse(asset.getMetadataValue(DamConstants.DC_TITLE));
    }

    private Asset getAsset(final String fileReference) {
        final Resource assetResource = resource.getResourceResolver().getResource(fileReference);

        return assetResource == null ? null : assetResource.adaptTo(Asset.class);
    }
}
