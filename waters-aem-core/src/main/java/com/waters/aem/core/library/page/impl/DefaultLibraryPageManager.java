package com.waters.aem.core.library.page.impl;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.icfolson.aem.library.core.link.builders.factory.LinkBuilderFactory;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.library.asset.LibraryAsset;
import com.waters.aem.core.library.page.LibraryPageManager;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RangeIterator;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static com.google.common.base.Preconditions.checkState;

@Component(service = LibraryPageManager.class)
public final class DefaultLibraryPageManager implements LibraryPageManager {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultLibraryPageManager.class);

    private static final String LIBRARY_PAGE_TITLE = "Library";

    @Reference
    private LiveRelationshipManager liveRelationshipManager;

    @Override
    public PageDecorator getLibraryPage(final LibraryAsset asset) {
        final String libraryPagePath = getLibraryPagePath(asset);

        return getPageManager(asset).getPage(libraryPagePath);
    }

    @Override
    public List<PageDecorator> getLibraryPageLiveCopies(final LibraryAsset asset) throws WCMException {
        final PageDecorator libraryPage = getLibraryPage(asset);

        final List<PageDecorator> libraryPageLiveCopies = new ArrayList<>();

        if (libraryPage == null) {
            LOG.debug("library page is null, no live copies");
        } else {
            final RangeIterator liveRelationships = liveRelationshipManager.getLiveRelationships(
                libraryPage.getContentResource(), null, null);

            final PageManagerDecorator pageManager = libraryPage.getPageManager();

            while (liveRelationships.hasNext()) {
                final LiveRelationship liveRelationship = (LiveRelationship) liveRelationships.next();
                final PageDecorator libraryPageLiveCopy = pageManager.getContainingPage(
                    liveRelationship.getTargetPath());

                if (libraryPageLiveCopy != null) {
                    libraryPageLiveCopies.add(libraryPageLiveCopy);
                }
            }

            LOG.debug("found {} live copies for library page : {}", libraryPageLiveCopies.size(), libraryPage);
        }

        return libraryPageLiveCopies;
    }

    @Override
    public PageDecorator createOrUpdateLibraryPage(final LibraryAsset asset)
        throws PersistenceException, WCMException {
        final ResourceResolver resourceResolver = asset.adaptTo(Resource.class).getResourceResolver();

        final PageDecorator parentPage = getParentPage(asset);

        final String title = asset.getTitle();

        checkState(title != null, "missing title for library asset %s", asset);

        final String name = getPageName(title);
        final String libraryPagePath = parentPage.getPath() + "/" + name;

        final PageManagerDecorator pageManager = parentPage.getPageManager();

        PageDecorator libraryPage = pageManager.getPage(libraryPagePath);

        if (libraryPage == null) { // create new library page
            LOG.info("creating new library page for asset : {} with path : {}", asset, libraryPagePath);

            try {
                libraryPage = pageManager.create(parentPage.getPath(), name, WatersConstants.TEMPLATE_LIBRARY_PAGE,
                    title, false);
            } catch (WCMException e) {
                LOG.error("error creating library page for path : " + libraryPagePath, e);

                throw e;
            }
        } else { // update existing library page
            LOG.info("found existing library page : {}, updating", libraryPage);
        }

        updateLibraryPageProperties(asset, libraryPage);

        // commit changes
        try {
            resourceResolver.commit();
        } catch (PersistenceException e) {
            LOG.error("error committing updates to library page : " + libraryPage, e);

            throw e;
        }

        return libraryPage;
    }

    private void updateLibraryPageProperties(final LibraryAsset asset, final PageDecorator libraryPage) {
        final ValueMap properties = libraryPage.getContentResource().adaptTo(ModifiableValueMap.class);

        // copy all of the metadata properties from the asset to the page
        properties.putAll(asset.getProperties());

        // set asset path on page for use in iframe component
        properties.put(WatersConstants.PROPERTY_LIBRARY_ASSET_PATH, asset.getPath());

        // set vanity URL
        properties.put(NameConstants.PN_SLING_VANITY_PATH, "/" + asset.getLiteratureCode());
    }

    private PageDecorator getParentPage(final LibraryAsset asset)
        throws WCMException {
        final PageManagerDecorator pageManager = getPageManager(asset);

        final String languageRootPath = getLanguageRootPath(asset);
        final PageDecorator languageRootPage = pageManager.getPage(languageRootPath);

        checkState(languageRootPage != null, "language root page does not exist for asset locale : %s",
            asset.getLocale().getLanguage());

        final PageDecorator libraryPage = getOrCreatePage(languageRootPage, LIBRARY_PAGE_TITLE);
        final PageDecorator contentTypePage = getOrCreatePage(libraryPage, getContentType(asset));
        final PageDecorator yearPage = getOrCreatePage(contentTypePage, getYearPublished(asset));

        LOG.debug("found parent page : {} for asset : {}", yearPage, asset);

        return yearPage;
    }

    private String getLibraryPagePath(final LibraryAsset asset) {
        final StringBuilder builder = new StringBuilder();

        builder.append(getLanguageRootPath(asset));

        Stream.of(LIBRARY_PAGE_TITLE, getContentType(asset), getYearPublished(asset), asset.getTitle())
            .map(this :: getPageName)
            .forEach(name -> builder.append("/").append(name));

        return builder.toString();
    }

    private String getLanguageRootPath(final LibraryAsset asset) {
        return new StringBuilder(WatersConstants.ROOT_PATH_LANGUAGE_MASTERS)
            .append("/")
            .append(asset.getLocale().getLanguage())
            .toString();
    }

    private PageDecorator getOrCreatePage(final PageDecorator parentPage, final String title)
        throws WCMException {
        final PageManagerDecorator pageManager = parentPage.getPageManager();
        final String name = getPageName(title);

        PageDecorator page = pageManager.getPage(parentPage.getPath() + "/" + name);

        if (page == null) {
            page = pageManager.create(parentPage.getPath(), name, WatersConstants.TEMPLATE_REDIRECT_PAGE, title, false);

            final ValueMap properties = page.getContentResource().adaptTo(ModifiableValueMap.class);

            // set redirect path
            properties.put(WatersConstants.PROPERTY_REDIRECT_TARGET, getRedirectTarget(parentPage));

            // set hide in nav
            properties.put(NameConstants.PN_HIDE_IN_NAV, true);

            LOG.info("created new redirect page : {}", page);
        } else {
            LOG.debug("found existing redirect page : {}", page);
        }

        return page;
    }

    private String getRedirectTarget(final PageDecorator parentPage) {
        // get search page path for current language root
        final String searchPagePath = parentPage.getAbsoluteParent(WatersConstants.LEVEL_LANGUAGE_ROOT)
            .getPath() + "/search";

        return LinkBuilderFactory.forPath(searchPagePath)
            .addParameter("facet", "category_facet:library") // TODO verify facet parameter value
            .build()
            .getHref();
    }

    private String getContentType(final LibraryAsset asset) {
        return getPageTitle(asset, asset.getContentType());
    }

    private String getYearPublished(final LibraryAsset asset) {
        return getPageTitle(asset, asset.getYearPublished());
    }

    private String getPageTitle(final LibraryAsset asset, final List<Tag> tags) {
        return tags.stream()
            .findFirst()
            .map(Tag :: getTitle)
            .orElseThrow(() -> new IllegalStateException("library asset missing required tags : " + asset.getPath()));
    }

    private String getPageName(final String title) {
        return JcrUtil.createValidName(title.replaceAll("[^\\p{L}0-9\\-/ ]+", ""), JcrUtil.HYPHEN_LABEL_CHAR_MAPPING);
    }

    private PageManagerDecorator getPageManager(final LibraryAsset asset) {
        final ResourceResolver resourceResolver = asset.adaptTo(Resource.class).getResourceResolver();

        return resourceResolver.adaptTo(PageManagerDecorator.class);
    }
}
