package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.WCMException;
import com.google.common.base.Stopwatch;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.utils.TextUtils;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisCatalogImporter;
import com.waters.aem.hybris.importer.HybrisCatalogImporterConfiguration;
import com.waters.aem.hybris.importer.HybrisProductImporter;
import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.models.Product;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ModifiableValueMap;
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
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Component(service = HybrisCatalogImporter.class)
@Designate(ocd = HybrisCatalogImporterConfiguration.class)
public final class DefaultHybrisCatalogImporter implements HybrisCatalogImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisCatalogImporter.class);

    private static final List<HybrisImportStatus> CREATED_OR_UPDATED = new ImmutableList.Builder<HybrisImportStatus>()
        .add(HybrisImportStatus.CREATED)
        .add(HybrisImportStatus.UPDATED)
        .build();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private HybrisClient hybrisClient;

    @Reference
    private HybrisProductImporter hybrisProductImporter;

    private volatile String catalogRootPath;

    @Override
    public List<HybrisImporterResult> importCatalogPages() {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Stopwatch stopwatch = Stopwatch.createStarted();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

            final PageDecorator parentPage = checkNotNull(pageManager.getPage(catalogRootPath),
                "catalog root page is null : %s", catalogRootPath);

            final Category rootCategory = hybrisClient.getRootCategory();

            for (final Category category : rootCategory.getSubcategories()) {
                results.addAll(processCategoryPage(pageManager, parentPage, category));
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

    private List<HybrisImporterResult> processCategoryPage(final PageManagerDecorator pageManager,
        final PageDecorator parentPage, final Category category) throws WCMException, IOException, URISyntaxException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final HybrisImporterResult result = importCategoryPage(pageManager, parentPage, category);

        results.add(result);

        // get category page for use as new parent page
        final PageDecorator categoryPage = pageManager.getPage(result.getPath());

        for (final Category subcategory : category.getSubcategories()) {
            results.addAll(processCategoryPage(pageManager, categoryPage, subcategory));
        }

        results.addAll(processProductPagesForCategory(categoryPage, category));

        return results;
    }

    private List<HybrisImporterResult> processProductPagesForCategory(final PageDecorator categoryPage,
        final Category category) throws WCMException, IOException, URISyntaxException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final List<Product> productsForCategory = hybrisClient.getProductsForCategory(category.getId());

        if (productsForCategory.isEmpty()) {
            LOG.info("no products found for category : {}, ignoring", category.getId());
        } else {
            results.addAll(hybrisProductImporter.importProducts(productsForCategory));

            final List<String> productResourcePaths = results
                .stream()
                .filter(result -> CREATED_OR_UPDATED.contains(result.getStatus()))
                .map(HybrisImporterResult :: getPath)
                .collect(Collectors.toList());

            LOG.info("importing {} product pages for category : {}", productResourcePaths.size(), category.getId());

            results.addAll(importProductPages(categoryPage, productResourcePaths));
        }

        return results;
    }

    private List<HybrisImporterResult> importProductPages(final PageDecorator categoryPage,
        final List<String> productResourcePaths) throws WCMException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final ResourceResolver resourceResolver = categoryPage.getContentResource().getResourceResolver();

        for (final String productResourcePath : productResourcePaths) {
            // create/update product pages for each imported commerce product
            final Sku sku = resourceResolver.getResource(productResourcePath).adaptTo(Sku.class);

            results.add(importSkuPage(categoryPage, sku));
        }

        return results;
    }

    private HybrisImporterResult importSkuPage(final PageDecorator categoryPage, final Sku sku) throws WCMException {
        final PageManagerDecorator pageManager = categoryPage.getPageManager();

        final String skuPageName = TextUtils.getValidJcrName(sku.getTitle());

        final HybrisImportStatus status;

        PageDecorator skuPage = pageManager.getPage(categoryPage.getPath() + "/" + skuPageName);

        if (skuPage == null) {
            skuPage = pageManager.create(categoryPage.getPath(), skuPageName, WatersConstants.TEMPLATE_SKU_PAGE,
                sku.getTitle(), false);

            LOG.info("created sku page : {}", skuPage.getPath());

            status = HybrisImportStatus.CREATED;
        } else {
            LOG.info("found existing sku page : {}", skuPage.getPath());

            status = HybrisImportStatus.UPDATED;
        }

        if (status != HybrisImportStatus.IGNORED) {
            updateSkuPageProperties(skuPage, sku);
        }

        return HybrisImporterResult.fromSkuPage(skuPage, status);
    }

    private HybrisImporterResult importCategoryPage(final PageManagerDecorator pageManager,
        final PageDecorator parentPage, final Category category) throws WCMException {
        LOG.info("importing page for category : {}", category);

        final String name = TextUtils.getValidJcrName(category.getName());

        final HybrisImportStatus status;

        PageDecorator page = pageManager.getPage(parentPage.getPath() + "/" + name);

        if (page == null) {
            page = pageManager.create(parentPage.getPath(), name, WatersConstants.TEMPLATE_CATEGORY_PAGE,
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

            LOG.info("found existing category page : {}, status : {}", page.getPath(), status.name());
        }

        if (status != HybrisImportStatus.IGNORED) {
            updateCategoryPageProperties(page, category);
        }

        return HybrisImporterResult.fromCategoryPage(page, status);
    }

    private void updateCategoryPageProperties(final PageDecorator page, final Category category) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        properties.put(HybrisImporterConstants.PROPERTY_ID, category.getId());
        properties.put(HybrisImporterConstants.PROPERTY_URL, category.getUrl());

        if (category.getLastModified() != null) {
            properties.put(HybrisImporterConstants.PROPERTY_LAST_MODIFIED, category.getLastModified());
        }
    }

    private void updateSkuPageProperties(final PageDecorator page, final Sku sku) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        properties.put(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, sku.getPath());
        properties.put(JcrConstants.JCR_DESCRIPTION, sku.getDescription());
        properties.put(WatersCommerceConstants.PROPERTY_CODE, sku.getCode());
    }
}
