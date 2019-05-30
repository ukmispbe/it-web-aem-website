package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;

@Component(value = "Button Container",
    description = "This is the Button Container component for Waters site",
    isContainer = true)
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { ButtonContainer.class, ComponentExporter.class },
    resourceType = ButtonContainer.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class ButtonContainer implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/buttoncontainer";

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
