package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.WCMException;
import com.google.common.base.Stopwatch;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.TextUtils;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisCatalogImporter;
import com.waters.aem.hybris.importer.HybrisCatalogImporterConfiguration;
import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.NamespaceRegistry;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Component(service = HybrisCatalogImporter.class)
@Designate(ocd = HybrisCatalogImporterConfiguration.class)
public final class DefaultHybrisCatalogImporter implements HybrisCatalogImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisCatalogImporter.class);

    private static class CatalogImporterContext {

        private final ResourceResolver resourceResolver;

        private final PageManagerDecorator pageManager;

        private final Map<String, List<String>> categoryIdToProductCodeMap;

        private final PageDecorator parentPage;

        private final Category category;

        private CatalogImporterContext(final ResourceResolver resourceResolver,
            final Map<String, List<String>> categoryIdToProductCodeMap, final PageDecorator parentPage,
            final Category category) {
            this.resourceResolver = resourceResolver;
            this.pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);
            this.categoryIdToProductCodeMap = categoryIdToProductCodeMap;
            this.parentPage = parentPage;
            this.category = category;
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

        public Map<String, List<String>> getCategoryIdToProductCodeMap() {
            return categoryIdToProductCodeMap;
        }

        public CatalogImporterContext withSubcategory(final PageDecorator categoryPage, final Category subcategory) {
            return new CatalogImporterContext(resourceResolver, categoryIdToProductCodeMap, categoryPage, subcategory);
        }
    }

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private HybrisClient hybrisClient;

    @Reference
    private SkuRepository skuRepository;

    private volatile String catalogRootPath;

    @Override
    public List<HybrisImporterResult> importCatalogPages() {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

            final PageDecorator catalogRootPage = checkNotNull(pageManager.getPage(catalogRootPath),
                "catalog root page is null : %s", catalogRootPath);

            // build a map of categories to their products, which will be used to import the product pages as each
            // category is being processed
            final Map<String, List<String>> categoryIdToProductCodeMap = getCategoryIdToProductCodeMap(
                resourceResolver);

            final Category rootCategory = hybrisClient.getRootCategory();

            for (final Category category : rootCategory.getSubcategories()) {
                final CatalogImporterContext context = new CatalogImporterContext(resourceResolver,
                    categoryIdToProductCodeMap, catalogRootPage, category);

                results.addAll(processCategoryPage(context));
            }

            resourceResolver.commit();

            LOG.info("imported {} catalog pages in {}ms", results.size(), stopwatch.elapsed(TimeUnit.MILLISECONDS));
        } catch (LoginException | IOException | WCMException | URISyntaxException e) {
            LOG.error("error importing hybris catalog pages", e);

            throw new HybrisImporterException(e);
        }

        return results;
    }

    @Activate
    protected void activate(final HybrisCatalogImporterConfiguration configuration)
        throws LoginException, RepositoryException {
        checkImporterNamespace();
        modified(configuration);
    }

    @Modified
    protected void modified(final HybrisCatalogImporterConfiguration configuration) {
        catalogRootPath = configuration.catalogRootPath();
    }

    private void checkImporterNamespace() throws RepositoryException, LoginException {
        // check to ensure that importer namespace is registered
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Session session = resourceResolver.adaptTo(Session.class);
            final NamespaceRegistry namespaceRegistry = session.getWorkspace().getNamespaceRegistry();

            if (!Arrays.asList(namespaceRegistry.getPrefixes()).contains(HybrisImporterConstants.NAMESPACE_PREFIX)) {
                namespaceRegistry.registerNamespace(HybrisImporterConstants.NAMESPACE_PREFIX,
                    HybrisImporterConstants.NAMESPACE_URI);

                session.save();
            }
        }
    }

    private List<HybrisImporterResult> processCategoryPage(final CatalogImporterContext context)
        throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final HybrisImporterResult result = importCategoryPage(context);

        results.add(result);

        final Category category = context.getCategory();

        // get category page for use as new parent page
        final PageDecorator categoryPage = context.getPageManager().getPage(result.getPath());

        for (final Category subcategory : category.getSubcategories()) {
            final CatalogImporterContext subcategoryContext = context.withSubcategory(categoryPage, subcategory);

            results.addAll(processCategoryPage(subcategoryContext));
        }

        // only process product pages for leaf categories
        if (category.getSubcategories().isEmpty()) {
            // after processing category page, proceed with the product pages for the current category (if any)
            results.addAll(processProductPagesForCategory(context, categoryPage));
        }

        // commit changes after each category
        LOG.debug("committing changes...");

        context.getResourceResolver().commit();

        return results;
    }

    private List<HybrisImporterResult> processProductPagesForCategory(final CatalogImporterContext context,
        final PageDecorator categoryPage)
        throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Category category = context.getCategory();

        final List<String> productCodesForCategory = context.getCategoryIdToProductCodeMap()
            .getOrDefault(category.getId(), Collections.emptyList());

        if (productCodesForCategory.isEmpty()) {
            LOG.info("no products found for category : {}, ignoring", category.getId());
        } else {
            final ResourceResolver resourceResolver = context.getResourceResolver();

            final List<Sku> skus = productCodesForCategory
                .stream()
                .map(productCode -> skuRepository.getSku(resourceResolver, productCode))
                .filter(Objects :: nonNull)
                .collect(Collectors.toList());

            LOG.info("importing {} product pages for category : {}", skus.size(), category.getId());

            results.addAll(importProductPages(resourceResolver, categoryPage, skus));
        }

        return results;
    }

    private List<HybrisImporterResult> importProductPages(final ResourceResolver resourceResolver,
        final PageDecorator categoryPage, final List<Sku> skus)
        throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        int count = 0;

        for (final Sku sku : skus) {
            // create/update product pages for each imported commerce product
            results.add(importSkuPage(categoryPage, sku));

            if (count % 10 == 0) {
                LOG.debug("committing changes...");

                resourceResolver.commit();
            }

            count++;
        }

        // commit changes
        resourceResolver.commit();

        return results;
    }

    private HybrisImporterResult importSkuPage(final PageDecorator categoryPage, final Sku sku) throws WCMException {
        final PageManagerDecorator pageManager = categoryPage.getPageManager();

        final String skuPageName = new StringBuilder(TextUtils.getValidJcrName(sku.getId()))
            .append("-")
            .append(TextUtils.getValidJcrName(sku.getTitle()))
            .toString();

        final HybrisImportStatus status;

        PageDecorator skuPage = pageManager.getPage(categoryPage.getPath() + "/" + skuPageName);

        if (skuPage == null) {
            skuPage = pageManager.create(categoryPage.getPath(), skuPageName, WatersConstants.TEMPLATE_SKU_PAGE,
                sku.getTitle(), false);

            LOG.info("created sku page : {}", skuPage.getPath());

            status = HybrisImportStatus.CREATED;
        } else {
            final Calendar skuPageLastModified = skuPage.get(JcrConstants.JCR_LASTMODIFIED, Calendar.class).orNull();

            // if product has been updated more recently than this page, update the page properties
            if (sku.getLastModified().after(skuPageLastModified)) {
                status = HybrisImportStatus.UPDATED;
            } else {
                status = HybrisImportStatus.IGNORED;
            }

            LOG.debug("found existing sku page : {}, status : {}", skuPage.getPath(), status);
        }

        if (status != HybrisImportStatus.IGNORED) {
            updateSkuPageProperties(skuPage, sku);
        }

        return HybrisImporterResult.fromSkuPage(skuPage, status);
    }

    private HybrisImporterResult importCategoryPage(final CatalogImporterContext context) throws WCMException {
        final Category category = context.getCategory();

        LOG.info("importing page for category : {}", category);

        final String name = TextUtils.getValidJcrName(category.getName());

        final HybrisImportStatus status;

        final PageManagerDecorator pageManager = context.getPageManager();

        PageDecorator page = pageManager.getPage(context.getParentPage().getPath() + "/" + name);

        if (page == null) {
            page = pageManager.create(context.getParentPage().getPath(), name, WatersConstants.TEMPLATE_CATEGORY_PAGE,
                category.getName(), false);

            LOG.info("created category page : {}", page.getPath());

            status = HybrisImportStatus.CREATED;
        } else {
            final Calendar pageLastModified = page.get(HybrisImporterConstants.PROPERTY_LAST_MODIFIED, Calendar.class)
                .orNull();

            // TODO check for disabled/deleted status
            if (category.getLastModified() == null || pageLastModified == null || category.getLastModified().after(
                pageLastModified)) {
                status = HybrisImportStatus.UPDATED;
            } else {
                status = HybrisImportStatus.IGNORED;
            }

            LOG.debug("found existing category page : {}, status : {}", page.getPath(), status.name());
        }

        if (status != HybrisImportStatus.IGNORED) {
            updateCategoryPageProperties(page, category);
        }

        return HybrisImporterResult.fromCategoryPage(page, status);
    }

    private void updateCategoryPageProperties(final PageDecorator page, final Category category) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        properties.put(JcrConstants.JCR_LASTMODIFIED, Calendar.getInstance());
        properties.put(HybrisImporterConstants.PROPERTY_ID, category.getId());
        properties.put(HybrisImporterConstants.PROPERTY_URL, category.getUrl());

        if (category.getLastModified() != null) {
            properties.put(HybrisImporterConstants.PROPERTY_LAST_MODIFIED, category.getLastModified());
        }
    }

    private void updateSkuPageProperties(final PageDecorator page, final Sku sku) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        properties.put(JcrConstants.JCR_LASTMODIFIED, Calendar.getInstance());
        properties.put(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, sku.getPath());
        properties.put(WatersCommerceConstants.PROPERTY_SKU_ID, sku.getId());
    }

    private Map<String, List<String>> getCategoryIdToProductCodeMap(final ResourceResolver resourceResolver) {
        final Map<String, List<String>> categoryIdToProductCodeMap = new HashMap<>();

        final Resource productsResource = resourceResolver.getResource(WatersCommerceConstants.PATH_COMMERCE_PRODUCTS);

        for (final Resource productCodePrefixResource : productsResource.getChildren()) {
            if (productCodePrefixResource.getName().length() == WatersCommerceConstants.PRODUCT_CODE_PREFIX_LENGTH) {
                for (final Resource productResource : productCodePrefixResource.getChildren()) {
                    final ValueMap properties = productResource.getValueMap();

                    final String[] categories = properties.get(WatersCommerceConstants.PROPERTY_CATEGORIES,
                        new String[0]);

                    for (final String categoryId : categories) {
                        final List<String> productCodes = categoryIdToProductCodeMap.containsKey(
                            categoryId) ? categoryIdToProductCodeMap.get(categoryId) : new ArrayList<>();

                        productCodes.add(properties.get(WatersCommerceConstants.PROPERTY_SKU_ID, ""));

                        categoryIdToProductCodeMap.put(categoryId, productCodes);
                    }
                }
            }
        }

        LOG.debug("mapped {} category IDs to product codes", categoryIdToProductCodeMap.size());

        return categoryIdToProductCodeMap;
    }
}
