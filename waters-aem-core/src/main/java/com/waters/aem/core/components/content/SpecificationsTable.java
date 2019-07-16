package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.Classification;
import com.waters.aem.core.commerce.models.Sku;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;

@Component(value = "Specifications Table")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SpecificationsTable.class, ComponentExporter.class },
    resourceType = SpecificationsTable.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SpecificationsTable implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/specificationstable";

    @Inject
    private Sku sku;

    public List<Classification> getSpecifications() {
        return sku != null ? sku.getClassifications() : Collections.emptyList();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
