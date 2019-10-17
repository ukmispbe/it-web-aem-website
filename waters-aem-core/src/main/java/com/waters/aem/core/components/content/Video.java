package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.TextField;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.services.brightcove.BrightcoveService;
import com.waters.aem.core.utils.BrightcoveUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_COPY;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PAGE;

@Component(value = "Video",
    description = "This is the Video component for Waters site",
    listeners = {
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PAGE),
        @Listener(name = EVENT_AFTER_COPY, value = REFRESH_PAGE)
    })
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

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getVideoId() {
        return videoId;
    }

    public String getBrightcoveAccount() {
        return BrightcoveUtils.getBrightcoveAccount(siteContext, brightcoveService);
    }

    public String getBrightcovePlayerId() {
        return BrightcoveUtils.getBrightcovePlayerId(siteContext, brightcoveService);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}