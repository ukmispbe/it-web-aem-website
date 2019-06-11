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
import com.google.common.net.MediaType;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuImage;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.servlets.ResizeImageServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.mime.MimeTypeService;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    private static final Logger LOG = LoggerFactory.getLogger(ImageGallery.class);

    private static final String SRC_URI_TEMPLATE_WIDTH = "{{width}}";

    @Self
    private SlingHttpServletRequest request;

    @Inject
    private Resource resource;

    @ScriptVariable
    private Style currentStyle;

    @Inject
    private Sku sku;

    @OSGiService
    private MimeTypeService mimeTypeService;

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
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String[] secondaryImages = new String[0];

    private List<Asset> assets;

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public String getSrc() {
        return getPrimaryImageAsset() == null ? null : buildUri(getPrimaryImageAsset().getPath(), false);
    }

    public String getAlt() {
        return getPrimaryImageAsset() == null ? null : Optional.ofNullable(primaryImageAltText).orElse(
            getAltText(getPrimaryImageAsset()));
    }

    public String getUriTemplatesJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getUriTemplates());
    }

    public String getWidthsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(getWidths());
    }

    public List<String> getUriTemplates() {
        final List<String> uriTemplates = new ArrayList<>();

        if (sku == null) {
            uriTemplates.add(buildUri(primaryImage, true));

            for (final String secondaryImage : secondaryImages) {
                uriTemplates.add(buildUri(secondaryImage, true));
            }
        } else {
            for (final SkuImage skuImage : sku.getImages()) {
                uriTemplates.add(buildUri(skuImage.getPath(), true));
            }
        }

        return uriTemplates
            .stream()
            .filter(Objects :: nonNull)
            .collect(Collectors.toList());
    }

    public Boolean isHasMultipleWidths() {
        return getWidths().size() > 1;
    }

    public List<String> getWidths() {
        return Arrays.asList(currentStyle.get(Image.PN_DESIGN_ALLOWED_RENDITION_WIDTHS, new String[0]));
    }

    public List<Asset> getAssets() {
        if (assets == null) {
            assets = new ArrayList<>();

            if (sku == null) {
                assets.add(getAsset(primaryImage));

                for (final String secondaryImage : secondaryImages) {
                    assets.add(getAsset(secondaryImage));
                }
            } else {
                final List<SkuImage> skuImages = sku.getImages();

                assets.addAll(skuImages
                    .stream()
                    .map(skuImage -> getAsset(skuImage.getPath()))
                    .collect(Collectors.toList()));
            }
        }

        return assets.stream().filter(Objects :: nonNull).collect(Collectors.toList());
    }

    private Asset getPrimaryImageAsset() {
        final List<Asset> assets = getAssets();

        return assets.isEmpty() ? null : assets.get(0);
    }

    private String buildUri(final String fileReference, final Boolean template) {
        final Asset asset = getAsset(fileReference);

        String uri = null;

        if (asset == null) {
            LOG.error("asset is null for file reference : {}, ignoring", fileReference);
        } else {
            final StringBuilder builder = new StringBuilder();

            builder.append(resource.getResourceResolver().map(request, fileReference));

            if (template) {
                builder.append(".");
                builder.append(SRC_URI_TEMPLATE_WIDTH);
                builder.append(".");
                builder.append(ResizeImageServlet.RESIZE_EXTENSION);
                builder.append("/");
                builder.append(ResizeImageServlet.SUFFIX_NAME);
                builder.append(".");
                builder.append(getExtension(asset));
            }

            uri = builder.toString();
        }

        return uri;
    }

    private String getAltText(final Asset asset) {
        return Optional.ofNullable(asset.getMetadataValue(DamConstants.DC_DESCRIPTION))
            .orElse(asset.getMetadataValue(DamConstants.DC_TITLE));
    }

    private String getExtension(final Asset asset) {
        final String mimeType = Optional.ofNullable(asset.getMimeType())
            .orElse(MediaType.PNG.toString());

        return mimeTypeService.getExtension(mimeType.split(";")[0]);
    }

    private Asset getAsset(final String fileReference) {
        final Resource assetResource = resource.getResourceResolver().getResource(fileReference);

        return assetResource == null ? null : assetResource.adaptTo(Asset.class);
    }
}
