package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.wcm.core.components.models.NavigationItem;
import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import javax.annotation.Nonnull;
import java.util.Collection;

@Component(value = "Breadcrumb",
    description = "Waters Breadcrumb Component",
    resourceSuperType = Breadcrumb.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Breadcrumb.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Breadcrumb implements com.adobe.cq.wcm.core.components.models.Breadcrumb {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/breadcrumb/v2/breadcrumb";

    public static final String RESOURCE_TYPE = "waters/components/content/breadcrumb";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Breadcrumb delegate; // delegate to core component class

    @Override
    public Collection<NavigationItem> getItems() {
        return delegate.getItems();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}