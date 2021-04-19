package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.day.cq.wcm.api.designer.Style;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.SkuImage;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.servlets.ResizeImageServlet;
import com.waters.aem.core.utils.AssetUtils;
import com.waters.aem.core.utils.BrightcoveUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.*;

@Component(value = "Visual Gallery",
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    },
        tabs = {
                @Tab(title = "Images"),
                @Tab(title = "Videos")
        }
    )
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Visualgallery.class, ComponentExporter.class },
    resourceType = Visualgallery.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
@SuppressWarnings("squid:S3252")
public final class Visualgallery implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/visualgallery";

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final String SRC_URI_TEMPLATE_WIDTH = "{{width}}";

    @OSGiService
    private BrightcoveService brightcoveService;

    @Self
    private SiteContext siteContext;
    
    @Inject
    private Resource resource;
    
    @Inject
    private Sku sku;
    
    @ScriptVariable
    private Style currentStyle;
    
    @Inject
    private String ImageAltText;

    @MultiField
   @DialogField(fieldLabel = "Images",
        fieldDescription = "Images to be displayed",
        renderReadOnly = false,
        ranking = 1)
            
    private String Images;
       
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String[] images = new String[0];

    private List<Asset> assets;

    @MultiField
    @DialogField(fieldLabel = "Video ID",
            fieldDescription = "Enter the Brightcover Video ID",
            tab = 2,
            ranking = 1)
    
    @TextField
    @Inject
    private String [] videoIdList = new String[0];

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

    public String[] getVideoIds() {
        return videoIdList;
    }
    
    public String getJson() throws JsonProcessingException {
        final Map<String, Object> json = new HashMap<>();

        json.put("src", getSrc());
        json.put("alt", getAlt());
        json.put("templates", getUriTemplates());
        json.put("widths", getWidths());
        json.put("videoIds", getVideoIds());
        json.put("brightcoveAccount", getBrightcoveAccount());
        json.put("brightcovePlayerId", getBrightcovePlayerId());

        return MAPPER.writeValueAsString(json);
    }

    public String getBrightcoveAccount() {
        return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
    }

    public String getBrightcovePlayerId() {
        return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
    }

    @SuppressWarnings("squid:S2259")
    public String getSrc() {
        return getImageAsset() == null ? null : buildUri(getImageAsset(), false);
    }

    public String getAlt() {
    	return getImageAsset() == null ? "" : Optional.ofNullable(ImageAltText).orElse(
            AssetUtils.getAltText(getImageAsset()));
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
    		assets.add(AssetUtils.getAsset(resource.getResourceResolver(), Images));

                for (final String images : images) {
                    assets.add(AssetUtils.getAsset(resource.getResourceResolver(), images));
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
     * Get the asset for the image - either from the Sku model if it exists or the authored image.
     *
     * @return DAM asset for the image file reference
     */
    private Asset getImageAsset() {
        final List<Asset> ImgAssets = getAssets();

        return ImgAssets.isEmpty() ? null : ImgAssets.get(0);
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
}