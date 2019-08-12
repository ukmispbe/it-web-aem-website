package com.waters.aem.core.services.commerce;

public interface WatersCommerceService {

    /**
     * Get the configured Sku Availability URL.
     *
     * @return Sku availability URL
     */
    String getSkuAvailabilityUrl();

    /**
     * Get the configured Sku Customer Pricing URL.
     *
     * @return Sku customer price URL
     */
    String getSkuCustomerPriceUrl();

    /**
     * Get the configured cart URL.
     *
     * @return cart URL
     */
    String getCartUrl();

}
