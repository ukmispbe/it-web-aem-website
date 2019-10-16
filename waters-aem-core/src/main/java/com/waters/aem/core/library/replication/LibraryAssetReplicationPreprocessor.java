package com.waters.aem.core.library.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.WCMException;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.library.asset.LibraryAsset;
import com.waters.aem.core.library.page.LibraryPageManager;
import com.waters.aem.core.services.replication.AbstractReplicationPreprocessor;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Replication preprocessor to deactivate/delete Library pages when Library assets are deactivated or deleted.  This is
 * implemented in a preprecessor to ensure that the asset still exists, since the asset metadata is needed to determine
 * the corresponding Library page path.
 */
@Component(service = Preprocessor.class)
@SuppressWarnings({ "squid:RedundantThrowsDeclarationCheck" })
public final class LibraryAssetReplicationPreprocessor extends AbstractReplicationPreprocessor<LibraryAsset> {

    private static final Logger LOG = LoggerFactory.getLogger(LibraryAssetReplicationPreprocessor.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private LibraryPageManager libraryPageManager;

    @Reference
    private Replicator replicator;

    @Override
    protected boolean isEnabled() {
        // always enabled
        return true;
    }

    @Override
    protected List<ReplicationActionType> getSupportedActionTypes() {
        return ImmutableList.of(
                ReplicationActionType.DEACTIVATE,
                ReplicationActionType.DELETE);
    }

    @Override
    protected void preprocessItem(final ReplicationActionType replicationActionType,
        final ResourceResolver resourceResolver, final LibraryAsset asset) throws ReplicationException {
        LOG.info("preprocessing replication action type : {} for asset : {}", replicationActionType, asset);

        // get the library page corresponding to the asset being deactivated/deleted
        final PageDecorator libraryPage = libraryPageManager.getLibraryPage(asset);

        if (libraryPage == null) {
            LOG.info("library page not found for asset : {}, ignoring", asset);
        } else {
            try {
                // deactivate/delete live copies first
                for (final PageDecorator page : libraryPageManager.getLibraryPageLiveCopies(asset)) {
                    processLibraryPage(resourceResolver, replicationActionType, page);
                }

                // deactivate/delete the blueprint page
                processLibraryPage(resourceResolver, replicationActionType, libraryPage);
            } catch (WCMException e) {
                // re-throw as replication exception to abort the replication process
                throw new ReplicationException(e);
            }
        }
    }

    @Override
    protected List<LibraryAsset> getItems(final ReplicationAction replicationAction,
        final ResourceResolver resourceResolver) {
        return Arrays.stream(replicationAction.getPaths())
            .filter(path -> path.startsWith(WatersConstants.DAM_PATH))
            .map(path -> resourceResolver.getResource(path).adaptTo(LibraryAsset.class))
            .filter(Objects :: nonNull)
            .filter(LibraryAsset :: isLibraryAsset)
            .collect(Collectors.toList());
    }

    @Override
    protected ResourceResolverFactory getResourceResolverFactory() {
        return resourceResolverFactory;
    }

    private void processLibraryPage(final ResourceResolver resourceResolver,
        final ReplicationActionType replicationActionType, final PageDecorator page)
        throws ReplicationException, WCMException {
        replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType,
            page.getPath());

        // check for delete action - if the asset is being deactivated, the page will be deactivated but not deleted
        if (ReplicationActionType.DELETE.equals(replicationActionType)) {
            resourceResolver.adaptTo(PageManagerDecorator.class).delete(page, false);
        }
    }
}
