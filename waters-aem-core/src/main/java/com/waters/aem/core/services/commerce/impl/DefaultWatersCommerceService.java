package com.waters.aem.core.services.commerce.impl;

import com.waters.aem.core.services.WatersServiceConfiguration;
import com.waters.aem.core.services.commerce.WatersCommerceService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersCommerceService.class)
@Designate(ocd = WatersServiceConfiguration.class)
public final class DefaultWatersCommerceService implements WatersCommerceService {

    private volatile String skuAvailabilityUrl;

    private volatile String skuCustomerPriceUrl;

    private volatile String cartUrl;

    @Override
    public String getSkuAvailabilityUrl() {
        return skuAvailabilityUrl;
    }

    @Override
    public String getSkuCustomerPriceUrl() {
        return skuCustomerPriceUrl;
    }

    @Override
    public String getCartUrl() {
        return cartUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersServiceConfiguration configuration) {
        skuAvailabilityUrl = configuration.skuAvailabilityUrl();
        skuCustomerPriceUrl = configuration.skuCustomerPriceUrl();
        cartUrl = configuration.cartUrl();
    }
}

