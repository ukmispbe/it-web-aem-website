package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.commons.util.PrefixRenditionPicker;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.inject.Inject;

@Component(value = "Container",
        description = "Container component, used to group other components and apply a common style or layout.",
        resourceSuperType = Container.RESOURCE_SUPER_TYPE,
        editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
        resourceType = Container.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)

@SuppressWarnings({"squid:S2176"})
public final class Container implements com.adobe.cq.wcm.core.components.models.Container {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/container/v1/container";

    public static final String RESOURCE_TYPE = "waters/components/content/container";
    public static final String DESKTOP = "cq5dam.web.1280.1280";
    public static final String MOBILE = "cq5dam.web.640.640";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Container delegate;

    @Inject
    private Resource resource;

    @Inject
    private String backgroundImageReference;

    public String getDesktopUrl() {
        return getRendition(DESKTOP);
    }

    public String getMobileUrl() {
        return getRendition(MOBILE);
    }

    private String getRendition(String viewport) {
        Resource assetResource = resource.getResourceResolver().getResource(backgroundImageReference);
        String thumbnailImageRendition = backgroundImageReference;
        if (assetResource != null) {
            final Asset asset = assetResource.adaptTo(Asset.class);
            thumbnailImageRendition = new PrefixRenditionPicker(viewport, true)
                    .getRendition(asset)
                    .getPath();
        }
        return thumbnailImageRendition;
    }
}