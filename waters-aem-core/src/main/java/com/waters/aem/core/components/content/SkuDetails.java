package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.Nonnull;
import javax.inject.Inject;
import java.math.BigDecimal;

/**
 * Stub for SKU detail - not a real component, but used to demonstrate how to inject the Sku model class into a
 * component.
 */
@Component(value = "SKU Details")
@Model(adaptables = SlingHttpServletRequest.class,
    adapters = { SkuDetails.class, ComponentExporter.class },
    resourceType = SkuDetails.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public final class SkuDetails implements ComponentExporter {

    public static final String RESOURCE_TYPE = "waters/components/content/skudetails";

    @Inject
    private Sku sku;

    @Self
    private SiteContext siteContext;

    public String getCode() {
        return sku.getCode();
    }

    public String getTitle() {
        return sku.getTitle();
    }

    public BigDecimal getPrice() {
        final String country = siteContext.getLocale().getCountry();
        final String currencyIsoCode = siteContext.getCurrencyIsoCode();

        return sku.getPrice(country, currencyIsoCode);
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
