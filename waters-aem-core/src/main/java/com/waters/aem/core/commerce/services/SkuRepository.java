package com.waters.aem.core.commerce.services;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.models.Sku;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;

/**
 * Repository for SKU models.
 */
public interface SkuRepository {

    /**
     * Get the SKU for the given sku page.
     *
     * @param page sku page
     * @return SKU or null if not found or page is not a SKU page
     */
    Sku getSku(PageDecorator page);

    /**
     * Get the SKU corresponding to the given product code.
     *
     * @param resourceResolver resource resolver for current request
     * @param productCode product code
     * @return SKU or null if not found
     */
    Sku getSku(ResourceResolver resourceResolver, String productCode);

    /**
     * Get a related SKU for the given product reference resource.
     *
     * @param productReferenceResource product reference resource
     * @return related SKU or null if SKU is not valid for resource
     */
    Sku getRelatedSku(Resource productReferenceResource);
}
