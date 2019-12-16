package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.DownloadResource;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.day.cq.wcm.msm.api.MSMNameConstants;
import com.day.cq.wcm.msm.api.RolloutConfig;
import com.day.cq.wcm.msm.api.RolloutConfigManager;
import com.day.cq.wcm.msm.api.RolloutManager;
import com.google.common.base.Stopwatch;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Iterables;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.commerce.constants.WatersCommerceConstants;
import com.waters.aem.core.commerce.models.Sku;
import com.waters.aem.core.commerce.services.SkuRepository;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.services.SiteRepository;
import com.waters.aem.core.utils.LocaleUtils;
import com.waters.aem.core.utils.Templates;
import com.waters.aem.core.utils.TextUtils;
import com.waters.aem.hybris.client.HybrisClient;
import com.waters.aem.hybris.constants.HybrisImporterConstants;
import com.waters.aem.hybris.enums.HybrisImportStatus;
import com.waters.aem.hybris.exceptions.HybrisImporterException;
import com.waters.aem.hybris.importer.HybrisCatalogImporter;
import com.waters.aem.hybris.importer.HybrisCatalogImporterConfiguration;
import com.waters.aem.hybris.models.Category;
import com.waters.aem.hybris.result.HybrisImporterResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.utils.URIBuilder;
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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.google.common.base.Preconditions.checkNotNull;

@Component(service = HybrisCatalogImporter.class)
@Designate(ocd = HybrisCatalogImporterConfiguration.class)
public final class DefaultHybrisCatalogImporter implements HybrisCatalogImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisCatalogImporter.class);

    private static final Map<String, String> NAMESPACES = new ImmutableMap.Builder<String, String>()
        .put(HybrisImporterConstants.NAMESPACE_PREFIX_HYBRIS, HybrisImporterConstants.NAMESPACE_URI_HYBRIS)
        .put(HybrisImporterConstants.NAMESPACE_PREFIX_IMPORTER, HybrisImporterConstants.NAMESPACE_URI_IMPORTER)
        .build();

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private HybrisClient hybrisClient;

    @Reference
    private SkuRepository skuRepository;

    @Reference
    private SiteRepository siteRepository;

    @Reference
    private RolloutManager rolloutManager;

    private volatile String catalogRootPath;

    private volatile boolean generateLiveCopies;

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
            final Map<String, Set<String>> categoryIdToProductCodeMap = getCategoryIdToProductCodeMap(
                resourceResolver);

            final Map<String, String> skuCodeToPagePathMap = skuRepository.getSkuCodeToPagePathMap(catalogRootPage);

            final Category rootCategory = hybrisClient.getRootCategory();

            for (final Category category : rootCategory.getSubcategories()) {
                final CatalogImporterContext context = new CatalogImporterContext(resourceResolver,
                    categoryIdToProductCodeMap, catalogRootPage, category, skuCodeToPagePathMap);

                results.addAll(processCategoryPages(context));
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
        generateLiveCopies = configuration.generateLiveCopies();
    }

    private void checkImporterNamespace() throws RepositoryException, LoginException {
        // check to ensure that namespaces are registered
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final Session session = resourceResolver.adaptTo(Session.class);
            final NamespaceRegistry namespaceRegistry = session.getWorkspace().getNamespaceRegistry();

            final List<String> registeredNamespacePrefixes = Arrays.asList(namespaceRegistry.getPrefixes());

            for (final Map.Entry<String, String> namespaceEntry : NAMESPACES.entrySet()) {
                final String prefix = namespaceEntry.getKey();
                final String uri = namespaceEntry.getValue();

                if (!registeredNamespacePrefixes.contains(prefix)) {
                    namespaceRegistry.registerNamespace(prefix, uri);
                }
            }

            session.save();
        }
    }

    private List<HybrisImporterResult> processCategoryPages(final CatalogImporterContext context)
        throws WCMException, PersistenceException, URISyntaxException {
        final List<HybrisImporterResult> results = importPagesForCategory(context);

        final Category category = context.getCategory();

        // get category page for use as new parent page - last result in list is the 'en' language master category page
        final HybrisImporterResult categoryPageResult = Iterables.getLast(results);
        final PageDecorator categoryPage = context.getPageManager().getPage(categoryPageResult.getPath());

        for (final Category subcategory : category.getSubcategories()) {
            final CatalogImporterContext subcategoryContext = context.withSubcategory(categoryPage, subcategory);

            results.addAll(processCategoryPages(subcategoryContext));
        }

        // only process product pages for leaf categories
        if (category.getSubcategories().isEmpty()) {
            // after processing category page, proceed with the product pages for the current category (if any)
            results.addAll(processSkuPagesForCategory(context, categoryPage));
        }

        // commit changes after each category
        LOG.debug("committing changes...");

        context.getResourceResolver().commit();

        // filter results with null status
        return results.stream().filter(r -> r.getStatus() != null).collect(Collectors.toList());
    }

    private List<HybrisImporterResult> processSkuPagesForCategory(final CatalogImporterContext context,
        final PageDecorator categoryPage)
        throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Category category = context.getCategory();

        final Set<String> productCodesForCategory = context.getCategoryIdToProductCodeMap()
            .getOrDefault(category.getId(), Collections.emptySet());

        if (productCodesForCategory.isEmpty()) {
            LOG.info("no products found for category : {}, ignoring", category.getId());
        } else {
            final ResourceResolver resourceResolver = context.getResourceResolver();

            final List<Sku> skus = productCodesForCategory
                .stream()
                .map(productCode -> skuRepository.getSku(resourceResolver, productCode))
                .filter(Objects :: nonNull)
                .collect(Collectors.toList());

            LOG.info("importing {} skus for category : {}", skus.size(), category.getId());

            results.addAll(importSkuPages(context, categoryPage, skus));
        }

        return results;
    }

    private List<HybrisImporterResult> importSkuPages(final CatalogImporterContext context,
        final PageDecorator categoryPage, final List<Sku> skus)
        throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        int count = 0;

        final ResourceResolver resourceResolver = context.getResourceResolver();

        for (final Sku sku : skus) {
            // create/update sku pages for each imported commerce product
            results.addAll(importPagesForSku(context, categoryPage, sku));

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

    private List<HybrisImporterResult> importPagesForSku(final CatalogImporterContext context,
        final PageDecorator categoryPage, final Sku sku) throws WCMException, PersistenceException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final String skuPageName = new StringBuilder(TextUtils.getValidJcrName(sku.getCode()))
            .append("-")
            .append(TextUtils.getValidJcrName(sku.getTitle()))
            .toString();
        final String skuPagePath = categoryPage.getPath() + "/" + skuPageName;

        final PageManagerDecorator pageManager = context.getPageManager();

        HybrisImportStatus status = null;

        PageDecorator skuPage = pageManager.getPage(skuPagePath);

        if (skuPage == null) {
            // check if a page already exists for this sku code, despite a difference in sku title
            final String skuMappedPath = context.getSkuCodeToSkuPagePathMap().get(sku.getCode());

            if (skuMappedPath != null) {
                skuPage = pageManager.getPage(context.getSkuCodeToSkuPagePathMap().get(sku.getCode()));
            }
        }

        if (skuPage == null) {
            // create new page
            skuPage = pageManager.create(categoryPage.getPath(), skuPageName, WatersConstants.TEMPLATE_SKU_PAGE,
                sku.getTitle(), false);

            LOG.info("created sku page : {}", skuPage.getPath());

            status = HybrisImportStatus.CREATED;
        } else {
            // found existing page in same category
            final Calendar skuPageLastModified = skuPage.get(JcrConstants.JCR_LASTMODIFIED, Calendar.class)
                .orNull();

            // if product has been updated more recently than this page, update the page properties
            if (sku.getLastModified().after(skuPageLastModified)) {
                status = HybrisImportStatus.UPDATED;

                // updated sku page, also update all language/live copies of the current page
                results.addAll(updateSkuPageLiveCopies(skuPage, sku));
            }

            LOG.debug("found existing sku page : {}, status : {}", skuPage.getPath(), status);
        }

        if (status != null) {
            updateSkuPageProperties(skuPage, sku);
            createOrUpdateThumbnail(context.getResourceResolver(), sku, skuPage);

            // create live copies if flag is set
            if (generateLiveCopies) {
                results.addAll(generateLiveCopies(skuPage, pageManager.getPage(categoryPage.getPath()), pageManager,
                    context));
            }
        }

        results.add(HybrisImporterResult.fromSkuPage(skuPage, status));

        return results;
    }

    private List<HybrisImporterResult> importPagesForCategory(final CatalogImporterContext context)
        throws WCMException, URISyntaxException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final Category category = context.getCategory();

        LOG.info("importing page(s) for category : {}", category);

        final String name = TextUtils.getValidJcrName(category.getName());

        final PageManagerDecorator pageManager = context.getPageManager();

        HybrisImportStatus status = null;

        PageDecorator page = pageManager.getPage(context.getParentPage().getPath() + "/" + name);

        if (page == null) {
            page = pageManager.create(context.getParentPage().getPath(), name, WatersConstants.TEMPLATE_REDIRECT_PAGE,
                category.getName(), false);

            LOG.info("created category page : {}", page.getPath());

            status = HybrisImportStatus.CREATED;
        } else {
            // TODO check for disabled/deleted status
            if (isModified(category, page) || (category.getSubcategories().isEmpty() && categoryHasUpdatedSkus(context,
                page))) {
                status = HybrisImportStatus.UPDATED;

                // updated category page, also update all language/live copies of the current page
                results.addAll(updateCategoryPageLiveCopies(page, category));
            }

            LOG.debug("found existing category page : {}, status : {}", page.getPath(), status);
        }

        if (status != null) {
            updateCategoryPageProperties(page, category, false);

            // create live copies if flag is set
            if (generateLiveCopies) {
                results.addAll(generateLiveCopies(page, context.getParentPage(), pageManager, context));
            }
        }

        results.add(HybrisImporterResult.fromCategoryPage(page, status));

        return results;
    }

    private Boolean isModified(final Category category, final PageDecorator categoryPage) {
        final Calendar pageLastModified = categoryPage.get(WatersCommerceConstants.PROPERTY_LAST_MODIFIED,
            Calendar.class).orNull();

        return category.getLastModified() == null || pageLastModified == null || category.getLastModified().after(
            pageLastModified);
    }

    private Boolean categoryHasUpdatedSkus(final CatalogImporterContext context, final PageDecorator categoryPage) {
        final Set<String> existingProductCodesForCategory = getProductCodesForCategory(categoryPage);
        final Set<String> updatedProductCodesForCategory = context.getCategoryIdToProductCodeMap()
            .getOrDefault(context.getCategory().getId(), Collections.emptySet());

        final Boolean hasUpdatedSkus = !existingProductCodesForCategory.equals(updatedProductCodesForCategory);

        if (hasUpdatedSkus) {
            LOG.info("category has updated skus : {}", categoryPage.getPath());

            LOG.info("existing : {}", existingProductCodesForCategory);
            LOG.info("updated : {}", updatedProductCodesForCategory);
        }

        return hasUpdatedSkus;
    }

    private List<PageDecorator> getLiveCopyPages(final PageDecorator page) {
        final List<PageDecorator> languageMasterPages = new ArrayList<>();

        languageMasterPages.add(page);
        languageMasterPages.addAll(siteRepository.getLanguageCopyPages(page));

        final List<PageDecorator> liveCopyPages = new ArrayList<>();

        // find all language master (i.e. blueprint) pages for the current category
        for (final PageDecorator languageMasterPage : languageMasterPages) {
            // exclude 'en' category language master since it was already updated in the calling method
            if (!languageMasterPage.getPath().equals(page.getPath())) {
                liveCopyPages.add(languageMasterPage);
            }

            // also update all live copies for each language master page
            liveCopyPages.addAll(siteRepository.getLiveCopyPages(languageMasterPage));
        }

        return liveCopyPages;
    }

    private List<HybrisImporterResult> updateCategoryPageLiveCopies(final PageDecorator categoryPage,
        final Category category) throws URISyntaxException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        for (final PageDecorator liveCopyPage : getLiveCopyPages(categoryPage)) {
            updateCategoryPageProperties(liveCopyPage, category, true);

            results.add(HybrisImporterResult.fromCategoryPage(liveCopyPage, HybrisImportStatus.UPDATED));
        }

        LOG.info("updated {} live copy pages for category : {}", results.size(), category);

        return results;
    }

    private List<HybrisImporterResult> updateSkuPageLiveCopies(final PageDecorator skuPage, final Sku sku) {
        final List<HybrisImporterResult> results = new ArrayList<>();

        for (final PageDecorator liveCopyPage : getLiveCopyPages(skuPage)) {
            updateSkuPageProperties(liveCopyPage, sku);

            results.add(HybrisImporterResult.fromSkuPage(liveCopyPage, HybrisImportStatus.UPDATED));
        }

        LOG.info("updated {} live copy pages for sku : {}", results.size(), sku);

        return results;
    }

    private List<HybrisImporterResult> generateLiveCopies(final PageDecorator page, final PageDecorator parentPage,
        final PageManagerDecorator pageManager, final CatalogImporterContext context) throws WCMException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final String template = Templates.isSkuPage(page) ? WatersConstants.TEMPLATE_SKU_PAGE :
            WatersConstants.TEMPLATE_REDIRECT_PAGE;

        final ResourceResolver resourceResolver = context.getResourceResolver();

        final LiveRelationshipManager liveRelationshipManager = resourceResolver.adaptTo(LiveRelationshipManager.class);

        final RolloutConfigManager configManager = resourceResolver.adaptTo(RolloutConfigManager.class);

        final RolloutConfig config = configManager.getRolloutConfig(WatersConstants.DEFAULT_ROLLOUT_CONFIG_PATH);

        for (final PageDecorator liveCopyParent : siteRepository.getLiveCopyPages(parentPage)) {

            LOG.info("checking for existing live copy page under parent page path: {}", liveCopyParent.getPath());

            final String pageName = page.getName();

            if (!liveCopyParent.hasChild(pageName)) {
                PageDecorator liveCopyPage = pageManager.create(liveCopyParent.getPath(), pageName,
                    template, page.getTitle(), false);

                LOG.info("created live copy page: {} under {}", pageName, liveCopyParent.getPath());

                final ValueMap properties = liveCopyPage.getContentResource().adaptTo(ModifiableValueMap.class);
                    properties.put(JcrConstants.JCR_MIXINTYPES, MSMNameConstants.NT_LIVE_RELATIONSHIP);

                if (Templates.isSkuPage(liveCopyPage)) {
                    results.add(HybrisImporterResult.fromSkuPage(liveCopyPage, HybrisImportStatus.CREATED));
                } else {
                    results.add(HybrisImporterResult.fromCategoryPage(liveCopyPage, HybrisImportStatus.CREATED));
                }

                final LiveRelationship relation = liveRelationshipManager.establishRelationship(page, liveCopyPage,
                    false, false, config);

                rolloutManager.rollout(resourceResolver, relation, false);

                LOG.info("rolled out live copy page: {}", liveCopyPage.getPath());
            }
        }
        return results;
    }

    private void updateCategoryPageProperties(final PageDecorator page, final Category category, final boolean isLiveCopy)
        throws URISyntaxException {
        final Map<String, Object> updatedProperties = new HashMap<>();

        updatedProperties.put(WatersCommerceConstants.PROPERTY_ID, category.getId());

        // set page redirect properties on category page. to be removed when product pages are imported into AEM.
        updatedProperties.put(HybrisImporterConstants.PROPERTY_REDIRECT_STATUS, HybrisImporterConstants.REDIRECT_STATUS_VALUE);
        updatedProperties.put(HybrisImporterConstants.PROPERTY_SLING_REDIRECT, true);

        // properties that should only be set on language master pages
        if (!isLiveCopy) {
            updatedProperties.put(HybrisImporterConstants.PROPERTY_REDIRECT_TARGET, buildSearchUri(category.getId(), page));
        }

        if (category.getLastModified() != null) {
            updatedProperties.put(WatersCommerceConstants.PROPERTY_LAST_MODIFIED, category.getLastModified());
        }

        updatePageProperties(page, updatedProperties);
    }

    private String buildSearchUri(final String categoryId, final PageDecorator page) throws URISyntaxException {

        final String contentType = categoryId.replaceAll("&", "").toLowerCase();

        final String isoCode =  LocaleUtils.getLocaleWithCountryForPage(page).toString();

        return new URIBuilder()
            .setPath(WatersConstants.SEARCH_PAGE_PATH)
            .setParameter("category", "Shop")
            .setParameter("content_type", contentType)
            .setParameter("multiselect", "true")
            .setParameter("page", "1")
            .setParameter("rows", "25")
            .setParameter("sort", "most-recent")
            .build().toString();
    }


    private void updateSkuPageProperties(final PageDecorator page, final Sku sku) {
        final Map<String, Object> updatedProperties = new HashMap<>();

        updatedProperties.put(WatersCommerceConstants.PROPERTY_PRODUCT_RESOURCE_PATH, sku.getPath());
        updatedProperties.put(WatersCommerceConstants.PROPERTY_CODE, sku.getCode());
        updatedProperties.put(JcrConstants.JCR_DESCRIPTION, sku.getLongDescription());
        updatedProperties.put(JcrConstants.JCR_TITLE, sku.getTitle());

        if (sku.getPrimaryImageSrc() != null) {
            updatedProperties.put(WatersConstants.OG_IMAGE, sku.getPrimaryImageSrc());
        }

        updatePageProperties(page, updatedProperties);
    }

    private void updatePageProperties(final PageDecorator page, final Map<String, Object> updatedProperties) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        final Calendar lastModifiedDate = Calendar.getInstance();

        properties.put(JcrConstants.JCR_LASTMODIFIED, lastModifiedDate);
        properties.put(NameConstants.PN_PAGE_LAST_MOD, lastModifiedDate);
        properties.putAll(updatedProperties);
    }

    private Set<String> getProductCodesForCategory(final PageDecorator categoryPage) {
        return categoryPage.getChildren(WatersConstants.PREDICATE_SKU_PAGE)
            .stream()
            .map(page -> page.getProperties().get(WatersCommerceConstants.PROPERTY_CODE, String.class))
            .filter(Objects :: nonNull)
            .collect(Collectors.toSet());
    }

    private void createOrUpdateThumbnail(final ResourceResolver resourceResolver, final Sku sku,
        final PageDecorator skuPage) throws PersistenceException {
        final String thumbnailImage = sku.getPrimaryImageSrc();

        final Resource contentResource = skuPage.getContentResource();

        if (StringUtils.isNotEmpty(thumbnailImage)) {
            final Resource thumbnailResource = contentResource.getChild(WatersConstants.THUMBNAIL_IMAGE);

            if (thumbnailResource == null){
                final Map<String, Object> properties = new HashMap<>();

                properties.put(JcrConstants.JCR_PRIMARYTYPE, JcrConstants.NT_UNSTRUCTURED);
                properties.put(DownloadResource.PN_REFERENCE, thumbnailImage);

                resourceResolver.create(contentResource, WatersConstants.THUMBNAIL_IMAGE, properties);
            } else {
                final ValueMap properties = thumbnailResource.adaptTo(ModifiableValueMap.class);

                properties.put(DownloadResource.PN_REFERENCE, thumbnailImage);
            }
        }
    }

    private Map<String, Set<String>> getCategoryIdToProductCodeMap(final ResourceResolver resourceResolver) {
        final Map<String, Set<String>> categoryIdToProductCodeMap = new HashMap<>();

        final Resource productsResource = resourceResolver.getResource(WatersCommerceConstants.PATH_COMMERCE_PRODUCTS);

        for (final Resource productCodePrefixResource : productsResource.getChildren()) {
            if (productCodePrefixResource.getName().length() == WatersCommerceConstants.PRODUCT_CODE_PREFIX_LENGTH) {
                for (final Resource productResource : productCodePrefixResource.getChildren()) {
                    final ValueMap properties = productResource.getValueMap();

                    final String[] categories = properties.get(WatersCommerceConstants.PROPERTY_CATEGORIES,
                        new String[0]);

                    for (final String categoryId : categories) {
                        final Set<String> productCodes = categoryIdToProductCodeMap.containsKey(
                            categoryId) ? categoryIdToProductCodeMap.get(categoryId) : new HashSet<>();

                        productCodes.add(properties.get(WatersCommerceConstants.PROPERTY_CODE, ""));

                        categoryIdToProductCodeMap.put(categoryId, productCodes);
                    }
                }
            }
        }

        LOG.debug("mapped {} category IDs to product codes", categoryIdToProductCodeMap.size());

        return categoryIdToProductCodeMap;
    }
}
