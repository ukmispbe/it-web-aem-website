package com.waters.aem.core.library.page.impl;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.WCMException;
import com.day.text.Text;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
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

import javax.jcr.Session;

@Component(service = LibraryPageManager.class)
public final class DefaultLibraryPageManager implements LibraryPageManager {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultLibraryPageManager.class);

    @Reference
    private Replicator replicator;

    @Override
    public PageDecorator getLibraryPage(final LibraryAsset asset) {
        final String libraryPagePath = getLibraryPagePath(asset);

        return getPageManager(asset).getPage(libraryPagePath);
    }

    @Override
    public PageDecorator createOrUpdateLibraryPageForAsset(final LibraryAsset asset)
        throws PersistenceException, ReplicationException, WCMException {
        final ResourceResolver resourceResolver = asset.adaptTo(Resource.class).getResourceResolver();
        final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

        final String libraryPagePath = getLibraryPagePath(asset);

        PageDecorator libraryPage = pageManager.getPage(libraryPagePath);

        if (libraryPage == null) { // create new library page
            LOG.info("creating new library page for asset : {} with path : {}", asset, libraryPagePath);

            // TODO
            final String parentPath = Text.getRelativeParent(libraryPagePath, 1);
            final String title = "";
            final String name = JcrUtil.createValidName(title.replaceAll("[^a-zA-Z0-9 ]+", ""),
                JcrUtil.HYPHEN_LABEL_CHAR_MAPPING);

            try {
                libraryPage = pageManager.create(parentPath, name, WatersConstants.TEMPLATE_LIBRARY_PAGE, title, false);
            } catch (WCMException e) {
                LOG.error("error creating library page for path : " + libraryPagePath, e);

                throw e;
            }
        } else { // update existing library page
            LOG.info("found existing library page : {}, updating", libraryPage);
        }

        updateLibraryPageProperties(asset, libraryPage);

        try {
            replicator.replicate(resourceResolver.adaptTo(Session.class), ReplicationActionType.ACTIVATE,
                libraryPagePath);
        } catch (ReplicationException e) {
            LOG.error("error replicating library page : " + libraryPagePath, e);

            throw e;
        }

        return libraryPage;
    }

    @Override
    public void deleteLibraryPage(final LibraryAsset asset) throws WCMException {
        final PageManagerDecorator pageManager = getPageManager(asset);
        final PageDecorator libraryPage = getLibraryPage(asset);

        if (libraryPage == null) {
            LOG.error("library page does not exist for asset : {}", asset);
        } else {
            LOG.info("deleting library page : {} for asset : {}", libraryPage, asset);

            try {
                pageManager.delete(libraryPage, false);
            } catch (WCMException e) {
                LOG.error("error deleting library page for asset : " + asset, e);

                throw e;
            }
        }
    }

    private void updateLibraryPageProperties(final LibraryAsset asset, final PageDecorator libraryPage)
        throws PersistenceException {
        final Resource libraryPageContentResource = libraryPage.getContentResource();
        final ResourceResolver resourceResolver = libraryPageContentResource.getResourceResolver();

        final ValueMap properties = libraryPageContentResource.adaptTo(ModifiableValueMap.class);

        // copy all of the metadata properties from the asset to the page
        properties.putAll(asset.getMetadata());

        try {
            resourceResolver.commit();
        } catch (PersistenceException e) {
            LOG.error("error committing updates to library page : " + libraryPage, e);

            throw e;
        }
    }

    private String getLibraryPagePath(final LibraryAsset asset) {
        final String libraryPagePath = ""; // TODO

        return libraryPagePath;
    }

    private PageManagerDecorator getPageManager(final LibraryAsset asset) {
        final ResourceResolver resourceResolver = asset.adaptTo(Resource.class).getResourceResolver();

        return resourceResolver.adaptTo(PageManagerDecorator.class);
    }
}
