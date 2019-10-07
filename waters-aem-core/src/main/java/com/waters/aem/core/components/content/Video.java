package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.PathField;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Video Component",
    description = "This is the Video component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { Video.class, ComponentExporter.class },
    resourceType = Video.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Video implements ComponentExporter{

    public static final String RESOURCE_TYPE = "waters/components/content/video";

    @OSGiService
    private BrightcoveService brightcoveService;

    @Self
    private SiteContext siteContext;

    @Inject
    private ResourceResolver resourceResolver;

    @DialogField(fieldLabel = "Video Title",
        fieldDescription = "Select the Title for the video",
        required = true,
        ranking = 1)
    @TextField
    @Inject
    private String title;

    @DialogField(fieldLabel = "Video Description",
        fieldDescription = "Enter the Description for video",
        ranking = 2)
    @TextField
    @Inject
    private String description;

    @DialogField(fieldLabel = "Video ID",
        fieldDescription = "Enter the Brightcove Video ID",
        required = true,
        ranking = 3)
    @TextField
    @Inject
    private String videoId;

    @DialogField(fieldLabel = "Video Thumbnail",
        fieldDescription = "Enter or select the Brightcove Video thumbnail",
        ranking = 4)
    @PathField(rootPath = WatersConstants.DAM_PATH)
    @Inject
    private String thumbnail;

    @DialogField(fieldLabel = "Thumbnail Alt text",
        fieldDescription = "Enter the thumbnail alternate text",
        ranking = 5)
    @TextField
    @Inject
    private String thumbnailAltText;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getVideoId() {
        return videoId;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getThumbnailAltText() {
        return thumbnailAltText;
    }

    public String getBrightcoveAccount() {
        final String countryCode = siteContext.getLocaleWithCountry().getCountry();
        return countryCode.equalsIgnoreCase("cn") ? brightcoveService.getChinaBrightcoveAccount() :
            brightcoveService.getBrightcoveAccount();
    }

    public String getBrightcovePlayerId() {
        final String countryCode = siteContext.getLocaleWithCountry().getCountry();
        return  countryCode.equalsIgnoreCase("cn") ? brightcoveService.getChinaBrightcovePlayerId() :
            brightcoveService.getBrightcovePlayerId();
    }

    public String getThumbnailRendition() {
        String thumbnailImageRendition = null;

        if (thumbnail != null) {
            final Resource assetResource = resourceResolver.getResource(thumbnail);

            if (assetResource != null) {
                final Asset asset = assetResource.adaptTo(Asset.class);

                thumbnailImageRendition = new PrefixRenditionPicker(WatersConstants.THUMBNAIL_RENDITION_PREFIX, true)
                .getRendition(asset)
                .getPath();
            }
        }

        return thumbnailImageRendition;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}