package com.waters.aem.core.library.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.day.cq.wcm.api.WCMException;
import com.icfolson.aem.library.api.page.PageDecorator;
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
 * Replication preprocessor to delete Library pages when Library assets are deactivated or deleted.  This is implemented
 * in a preprecessor to ensure that the asset still exists, since the asset metadata is needed to determine the
 * corresponding Library page path.
 */
@Component(service = Preprocessor.class)
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
        return true;
    }

    @Override
    protected void preprocessItem(final ReplicationActionType replicationActionType,
        final ResourceResolver resourceResolver, final LibraryAsset asset) throws ReplicationException {
        LOG.info("preprocessing replication action type : {} for asset : {}", replicationActionType, asset);

        final PageDecorator libraryPage = libraryPageManager.getLibraryPage(asset);

        // deactivate/delete the previously replicated page
        replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType, libraryPage.getPath());

        if (ReplicationActionType.DELETE.equals(replicationActionType)) {
            try {
                libraryPageManager.deleteLibraryPage(asset);
            } catch (WCMException e) {
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
}
