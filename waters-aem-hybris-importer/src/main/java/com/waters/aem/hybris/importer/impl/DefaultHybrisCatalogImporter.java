package com.waters.aem.hybris.importer.impl;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.wcm.api.WCMException;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
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

import static com.google.common.base.Preconditions.checkNotNull;

@Component(service = HybrisCatalogImporter.class)
@Designate(ocd = HybrisCatalogImporterConfiguration.class)
public final class DefaultHybrisCatalogImporter implements HybrisCatalogImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultHybrisCatalogImporter.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private HybrisClient hybrisClient;

    private volatile String catalogRootPath;

    @Override
    public List<HybrisImporterResult> importCatalogPages() {
        final List<HybrisImporterResult> results = new ArrayList<>();

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

            final PageDecorator parentPage = checkNotNull(pageManager.getPage(catalogRootPath),
                "catalog root page is null : %s", catalogRootPath);

            final Category rootCategory = hybrisClient.getRootCategory();

            for (final Category category : rootCategory.getSubcategories()) {
                results.addAll(importCategoryPage(pageManager, parentPage, category));
            }

            resourceResolver.commit();
        } catch (LoginException | IOException | URISyntaxException | WCMException e) {
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

    private List<HybrisImporterResult> importCategoryPage(final PageManagerDecorator pageManager,
        final PageDecorator parentPage, final Category category) throws WCMException {
        final List<HybrisImporterResult> results = new ArrayList<>();

        final HybrisImporterResult result = importPage(pageManager, parentPage, category);

        results.add(result);

        // get category page for use as new parent page
        final PageDecorator categoryPage = pageManager.getPage(result.getPath());

        for (final Category subcategory : category.getSubcategories()) {
            results.addAll(importCategoryPage(pageManager, categoryPage, subcategory));
        }

        // TODO import products for category

        return results;
    }

    private HybrisImporterResult importPage(final PageManagerDecorator pageManager, final PageDecorator parentPage,
        final Category category) throws WCMException {
        LOG.info("importing page for category : {}", category);

        final String name = getPageName(category.getName());

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

            if (category.getLastModified() == null || pageLastModified == null || category.getLastModified().after(
                pageLastModified)) {
                status = HybrisImportStatus.UPDATED;
            } else {
                status = HybrisImportStatus.IGNORED;
            }

            LOG.info("found existing category page : {}, status : {}", page.getPath(), status.name());
        }

        if (status != HybrisImportStatus.IGNORED) {
            updatePageProperties(page, category);
        }

        return HybrisImporterResult.fromPage(page, status);
    }

    private void updatePageProperties(final PageDecorator page, final Category category) {
        final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

        properties.put(HybrisImporterConstants.PROPERTY_ID, category.getId());
        properties.put(HybrisImporterConstants.PROPERTY_URL, category.getUrl());

        if (category.getLastModified() != null) {
            properties.put(HybrisImporterConstants.PROPERTY_LAST_MODIFIED, category.getLastModified());
        }
    }

    private String getPageName(final String title) {
        return JcrUtil.createValidName(title.replaceAll("[^\\p{L}0-9\\-/ ]+", ""), JcrUtil.HYPHEN_LABEL_CHAR_MAPPING);
    }
}
