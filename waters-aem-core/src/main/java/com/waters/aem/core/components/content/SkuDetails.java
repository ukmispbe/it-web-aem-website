package com.waters.aem.core.components.content;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.commerce.models.DisplayableSku;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.structure.page.CountryCommerceConfig;
import com.waters.aem.core.services.commerce.WatersCommerceService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
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

    @OSGiService
    private WatersCommerceService watersCommerceService;

    public DisplayableSku getDisplayableSku() {
        return sku == null ? null : new DisplayableSku(sku, resource, siteContext);
    }

    /**
     * Get isocode to send to be used by front end SKU service.
     *
     * @return isocode from page locale
     */
    public String getIsoCode() {
        return siteContext.getLocale().toString();
    }

    /**
     * Get country code from page locale to be used by front end SKU service.
     *
     * @return country code from page locale
     */
    public String getCountryCode() {
        return siteContext.getLocaleWithCountry().getCountry();
    }

    public String getSkuAvailabilityUrl() {
        return watersCommerceService.getSkuAvailabilityUrl();
    }

    public String getSkuCustomerPriceUrl() {
        return watersCommerceService.getSkuCustomerPriceUrl();
    }

    public String getAddToCartUrl() {
        return watersCommerceService.getAddToCartUrl();
    }

    public String viewCartUrl() {
        return watersCommerceService.getViewCartUrl();
    }
    
    public String getLocale() {
        return siteContext.getLocale().toLanguageTag();
    }

    public CountryCommerceConfig getCountryCommerceConfig() {
        return siteContext.getCountryCommerceConfig();
    }

    @Nonnull
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
