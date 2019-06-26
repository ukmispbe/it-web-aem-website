package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;

@Component(value = "SKU Details")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuDetails.class, ComponentExporter.class },
    resourceType = SkuDetails.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuDetails implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skudetails";

    @Inject
    private Sku sku;

    @Inject
    private Resource resource;

    @Self
    private SiteContext siteContext;

    private DisplayableSku displayableSku;

    public DisplayableSku getDisplayableSku() {
        if (displayableSku == null) {
            displayableSku = new DisplayableSku(sku, resource, siteContext);
        }

        return displayableSku;
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
