package com.waters.aem.core.components.content.commerce;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.Sku;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.annotation.Nonnull;
import javax.inject.Inject;

/**
 * Stub for SKU detail - not a real component, but used to demonstrate how to inject the Sku model class into a
 * component.
 */
@Component(value = "SKU Detail")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuDetail.class, ComponentExporter.class },
    resourceType = SkuDetail.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuDetail implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/commerce/skudetail";

    @Inject
    private Sku sku;

    public String getTitle() {
        return sku.getTitle();
    }

    public String getSummary() {
        return sku.getSummary();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
