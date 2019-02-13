package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.ReplicationOptions;
import com.day.cq.replication.Replicator;
import com.google.common.collect.ImmutableList;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.List;

/**
 * Replication preprocessor to create or delete Application Note PDFs when pages are activated or deactivated.
 */
@Component(service = Preprocessor.class)
public class PdfReplicationPreprocessor extends AbstractPdfReplicationEventHandler implements Preprocessor {

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
        processApplicationNotePages(replicationAction);
    }

    @Override
    protected ResourceResolverFactory getResourceResolverFactory() {
        return resourceResolverFactory;
    }

    @Override
    protected List<ReplicationActionType> getSupportedReplicationActionTypes() {
        return SUPPORTED_ACTION_TYPES;
    }

    @Override
    protected void processApplicationNotePage(final ResourceResolver resourceResolver, final PageDecorator page,
        final ReplicationActionType replicationActionType) throws ReplicationException {
        LOG.info("handling replication action : {} for page : {}", replicationActionType, page.getPath());

        final String assetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

        if (ReplicationActionType.DELETE.equals(replicationActionType)) {
            LOG.info("deleting PDF asset : {}", assetPath);

            try {
                // delete the PDF from author before deleting from publish
                pdfGenerator.deletePdfDocument(page);
            } catch (PersistenceException e) {
                LOG.error("error deleting PDF for page : " + page.getPath() + ", aborting page activation", e);

                throw new ReplicationException(e);
            }
        } else {
            LOG.info("deactivating PDF asset : {}", assetPath);
        }

        // deactivate/delete the previously replicated PDF asset
        replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType, assetPath);
    }
}
