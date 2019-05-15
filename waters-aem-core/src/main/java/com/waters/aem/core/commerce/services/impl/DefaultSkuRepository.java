package com.waters.aem.core.commerce.services.impl;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.utils.TextUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;

@Component(service = SkuRepository.class)
public final class DefaultSkuRepository implements SkuRepository {

    @Override
    public Sku getSku(final PageDecorator page) {
        return page.get(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, String.class)
            .transform(productResourcePath -> getSkuForProductResourcePath(
                page.getContentResource().getResourceResolver(), productResourcePath))
            .orNull();
    }

    @Override
    public Sku getSku(final ResourceResolver resourceResolver, final String productCode) {
        final String productResourcePath = getProductResourcePath(productCode);

        return getSkuForProductResourcePath(resourceResolver, productResourcePath);
    }

    private Sku getSkuForProductResourcePath(final ResourceResolver resourceResolver,
        final String productResourcePath) {
        final Resource skuResource = resourceResolver.getResource(productResourcePath);

        return skuResource == null ? null : skuResource.adaptTo(Sku.class);
    }

    private String getProductResourcePath(final String productCode) {
        final String productCodeNodeName = TextUtils.getValidJcrName(productCode);

        return new StringBuilder(WatersCommerceConstants.PATH_COMMERCE_PRODUCTS)
            .append("/")
            .append(productCodeNodeName, 0, WatersCommerceConstants.PRODUCT_CODE_PREFIX_LENGTH)
            .append("/")
            .append(productCodeNodeName)
            .toString();
    }
}
