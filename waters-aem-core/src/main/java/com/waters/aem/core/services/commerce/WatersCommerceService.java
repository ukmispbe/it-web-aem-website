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
     * Get the configured add to cart URL.
     *
     * @return add to cart URL
     */
    String getAddToCartUrl();

    /**
     * Get the configured view cart URL.
     *
     * @return View Cart URL
     */
    String getViewCartUrl();

}
