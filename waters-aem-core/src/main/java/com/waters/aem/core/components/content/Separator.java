package com.waters.aem.core.components.content;

import javax.annotation.Nonnull;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;

@Component(value = "Separator",
	description = "Separator",
	resourceSuperType = Separator.RESOURCE_SUPER_TYPE,
	editConfig = false)
@Model(adaptables = SlingHttpServletRequest.class,
	resourceType = Separator.RESOURCE_TYPE,
	defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
	extensions = ExporterConstants.SLING_MODEL_EXTENSION)

@SuppressWarnings({"squid:S2176"})
public class Separator implements com.adobe.cq.wcm.core.components.models.Separator {
	
	static final String RESOURCE_SUPER_TYPE = "core/wcm/components/separator/v1/separator";

    public static final String RESOURCE_TYPE = "waters/components/content/separator";
    
    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Separator delegate; // delegate to core component class
    
    @Nonnull
    @Override
    public String getExportedType() {
        return delegate.getExportedType();
    }
    
    @Override
    public String getId() {
        return delegate.getId();
    }
}
