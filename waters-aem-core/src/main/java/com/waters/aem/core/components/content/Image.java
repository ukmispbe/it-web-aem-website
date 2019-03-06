package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.ImageArea;
import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "Image",
    description = "Smart Adaptive Image",
    resourceSuperType = Image.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Image.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class Image implements com.adobe.cq.wcm.core.components.models.Image {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/image/v2/image";

    public static final String RESOURCE_TYPE = "waters/components/content/image";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Image delegate;

    @Inject
    private String imageTitle;

    public String getImageTitle() {
        return imageTitle;
    }

    @Override
    public String getSrc() {
        return delegate.getSrc();
    }

    @Override
    public String getAlt() {
        return delegate.getAlt();
    }

    @Override
    public String getTitle() {
        return delegate.getTitle();
    }

    @Override
    public String getUuid() {
        return delegate.getUuid();
    }

    @Override
    public String getLink() {
        return delegate.getLink();
    }

    @Override
    public boolean displayPopupTitle() {
        return delegate.displayPopupTitle();
    }

    @Override
    public String getFileReference() {
        return delegate.getFileReference();
    }

    @Override
    public int[] getWidths() {
        return delegate.getWidths();
    }

    @Override
    public String getSrcUriTemplate() {
        return delegate.getSrcUriTemplate();
    }

    @Override
    public boolean isLazyEnabled() {
        return delegate.isLazyEnabled();
    }

    @Override
    public java.util.List<ImageArea> getAreas() {
        return delegate.getAreas();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }
}
