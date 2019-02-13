package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import com.day.cq.replication.Replicator;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Replication preprocessor to delete Application Note PDFs when pages are deactivated or deleted.  This is implemented
 * in a preprecessor to ensure that the page still exists, since the page metadata is needed to determine the
 * corresponding PDF asset path.
 */
@Component(service = Preprocessor.class)
public final class PdfReplicationPreprocessor implements Preprocessor {

    private static final Logger LOG = LoggerFactory.getLogger(PdfReplicationPreprocessor.class);

    private static final List<ReplicationActionType> SUPPORTED_ACTION_TYPES = ImmutableList.of(
        ReplicationActionType.DEACTIVATE,
        ReplicationActionType.DELETE
    );

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private PdfGenerator pdfGenerator;

    @Reference
    private Replicator replicator;

    @Override
    public void preprocess(final ReplicationAction replicationAction, final ReplicationOptions replicationOptions)
        throws ReplicationException {
        final ReplicationActionType replicationActionType = replicationAction.getType();

        if (SUPPORTED_ACTION_TYPES.contains(replicationAction.getType())) {
            try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
                final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

                for (final PageDecorator page : getApplicationNotePages(replicationAction, pageManager)) {
                    preprocessApplicationNotePage(replicationActionType, resourceResolver, page);
                }
            } catch (LoginException e) {
                LOG.error("error authenticating resource resolver", e);

                throw new ReplicationException(e);
            }
        }
    }

    private void preprocessApplicationNotePage(final ReplicationActionType replicationActionType,
        final ResourceResolver resourceResolver, final PageDecorator page) throws ReplicationException {
        LOG.debug("preprocessing replication action type : {} for page : {}", replicationActionType,
            page.getPath());

        final String assetPath = page.getContentResource().adaptTo(ApplicationNotes.class)
            .getPdfAssetPath();

        LOG.info("deleting PDF asset : {}", assetPath);

        // delete the previously replicated PDF asset
        replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType, assetPath);

        try {
            // delete the PDF from author after deleting from publish
            pdfGenerator.deletePdfDocument(page);
        } catch (PersistenceException e) {
            LOG.error("error deleting PDF for page : " + page.getPath() + ", aborting page activation", e);

            throw new ReplicationException(e);
        }
    }

    private List<PageDecorator> getApplicationNotePages(final ReplicationAction replicationAction,
        final PageManagerDecorator pageManager) {
        return Arrays.stream(replicationAction.getPaths())
            .map(pageManager :: getPage)
            .filter(this :: isApplicationNotesPage)
            .collect(Collectors.toList());
    }

    private boolean isApplicationNotesPage(final PageDecorator page) {
        return page != null && WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath());
    }
}
