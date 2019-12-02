package com.waters.aem.hybris.importer.impl;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.hybris.models.Category;
import org.apache.sling.api.resource.ResourceResolver;

import java.util.Map;
import java.util.Set;

public final class CatalogImporterContext {

    private final ResourceResolver resourceResolver;

    private final PageManagerDecorator pageManager;

    private final Map<String, Set<String>> categoryIdToProductCodeMap;

    private final PageDecorator parentPage;

    private final Category category;

    private final Map<String, String> skuCodeToSkuPagePathMap;

    CatalogImporterContext(final ResourceResolver resourceResolver,
        final Map<String, Set<String>> categoryIdToProductCodeMap,
        final PageDecorator parentPage,
        final Category category, final Map<String, String> skuCodeToSkuPagePathMap) {
        this.resourceResolver = resourceResolver;
        this.pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);
        this.categoryIdToProductCodeMap = categoryIdToProductCodeMap;
        this.parentPage = parentPage;
        this.category = category;
        this.skuCodeToSkuPagePathMap = skuCodeToSkuPagePathMap;
    }

    public ResourceResolver getResourceResolver() {
        return resourceResolver;
    }

    public PageManagerDecorator getPageManager() {
        return pageManager;
    }

    public PageDecorator getParentPage() {
        return parentPage;
    }

    public Category getCategory() {
        return category;
    }

    public Map<String, Set<String>> getCategoryIdToProductCodeMap() {
        return categoryIdToProductCodeMap;
    }

    public Map<String, String> getSkuCodeToSkuPagePathMap() {
        return skuCodeToSkuPagePathMap;
    }

    public CatalogImporterContext withSubcategory(final PageDecorator categoryPage, final Category subcategory) {
        return new CatalogImporterContext(resourceResolver, categoryIdToProductCodeMap, categoryPage, subcategory,
                skuCodeToSkuPagePathMap);
    }
}
