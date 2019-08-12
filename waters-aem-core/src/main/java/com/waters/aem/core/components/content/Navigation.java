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
import java.util.List;

@Component(value = "Navigation",
    description = "Waters Navigation Component",
    resourceSuperType = Navigation.RESOURCE_SUPER_TYPE,
    editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
    resourceType = Navigation.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Navigation implements com.adobe.cq.wcm.core.components.models.Navigation {

    static final String RESOURCE_SUPER_TYPE = "core/wcm/components/navigation/v1/navigation";

    public static final String RESOURCE_TYPE = "waters/components/content/navigation";

    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Navigation delegate; // delegate to core component class

    @Override
    public List<NavigationItem> getItems() {
        return delegate.getItems();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}