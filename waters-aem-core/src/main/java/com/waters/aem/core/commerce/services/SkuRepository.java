package com.waters.aem.core.commerce.services;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.Map;

/**
 * Repository for Sku models.
 */
public interface SkuRepository {

    /**
     * Get the Sku for the given sku page.
     *
     * @param page sku page
     * @return Sku or null if not found or page is not a SKU page
     */
    Sku getSku(PageDecorator page);

    /**
     * Get the Sku corresponding to the given product code.
     *
     * @param resourceResolver resource resolver for current request
     * @param productCode product code
     * @return Sku or null if not found
     */
    Sku getSku(ResourceResolver resourceResolver, String productCode);

    /**
     * Get a related Sku for the given product reference resource.
     *
     * @param productReferenceResource product reference resource
     * @return related Sku or null if SKU is not valid for resource
     */
    Sku getRelatedSku(Resource productReferenceResource);

    /**
     * Get the Sku page for the current site and given Hybris product code.
     *
     * @param currentPage current page, which will be used to determine the country/language site for which to get the
     * Sku page
     * @param productCode Hybris product code
     * @return Sku page or null if not found
     */
    PageDecorator getSkuPage(PageDecorator currentPage, String productCode);

    /**
     * Get the Sku page for the current site and given Sku model based on the Hybris product code.
     *
     * @param currentPage current page, which will be used to determine the country/language site for which to get the
     * Sku page
     * @param sku sku model
     * @return Sku page or null if not found
     */
    PageDecorator getSkuPage(PageDecorator currentPage, Sku sku);

    /**
     * Get a map of sku codes to page paths for all sku pages created under language masters.
     *
     * @param currentPage current page, which will be used in building the query predicate
     * @return Map of sku codes to sku page paths
     */
    Map<String, String> getSkuCodeToPagePathMap(PageDecorator currentPage);
}
