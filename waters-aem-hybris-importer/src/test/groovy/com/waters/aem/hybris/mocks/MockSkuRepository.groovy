package com.waters.aem.hybris.mocks

import com.icfolson.aem.library.api.page.PageDecorator
import com.waters.aem.core.commerce.models.Sku
import com.waters.aem.core.commerce.services.SkuRepository
import org.apache.sling.api.resource.Resource
import org.apache.sling.api.resource.ResourceResolver


class MockSkuRepository implements SkuRepository {

    @Override
    Sku getSku(PageDecorator page) {

    }

    @Override
    Sku getSku(ResourceResolver resourceResolver, String productCode) {

    }

    @Override
    Sku getRelatedSku(Resource productReferenceResource) {

    }

    @Override
    PageDecorator getSkuPage(PageDecorator currentPage, String productCode) {

    }

    @Override
    PageDecorator getSkuPage(PageDecorator currentPage, Sku sku) {

    }

    @Override
    Map<String, String> getSkuCodeToPagePathMap(PageDecorator currentPage) {
        return new HashMap<String, String>()
    }
}
