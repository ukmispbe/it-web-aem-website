package com.waters.aem.core.services.commerce.impl;

import com.waters.aem.core.services.commerce.WatersCommerceService;
import com.waters.aem.core.services.commerce.WatersCommerceServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = WatersCommerceService.class)
@Designate(ocd = WatersCommerceServiceConfiguration.class)
public final class DefaultWatersCommerceService implements WatersCommerceService {

    private volatile String skuAvailabilityUrl;

    private volatile String skuCustomerPriceUrl;

    private volatile String addToCartUrl;

    private volatile String ecomViewCartUrl;

    private volatile String eprocViewCartUrl;

    @Override
    public String getSkuAvailabilityUrl() {
        return skuAvailabilityUrl;
    }

    @Override
    public String getSkuCustomerPriceUrl() {
        return skuCustomerPriceUrl;
    }

    @Override
    public String getAddToCartUrl() {
        return addToCartUrl;
    }

    @Override
    public String getEcomViewCartUrl() {
        return ecomViewCartUrl;
    }

    @Override
    public String getEprocViewCartUrl() {
        return eprocViewCartUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersCommerceServiceConfiguration configuration) {
        skuAvailabilityUrl = configuration.skuAvailabilityUrl();
        skuCustomerPriceUrl = configuration.skuCustomerPriceUrl();
        addToCartUrl = configuration.addToCartUrl();
        ecomViewCartUrl = configuration.ecomViewCartUrl();
        eprocViewCartUrl = configuration.eprocViewCartUrl();
    }
}

