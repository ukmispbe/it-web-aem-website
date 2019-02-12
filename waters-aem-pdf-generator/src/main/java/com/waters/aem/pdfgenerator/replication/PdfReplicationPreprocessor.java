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
import java.io.IOException;
import java.util.List;

/**
 * Replication preprocessor to create or delete Application Note PDFs when pages are activated or deactivated.
 */
@Component(service = Preprocessor.class)
public class PdfReplicationPreprocessor implements Preprocessor {

    private static final Logger LOG = LoggerFactory.getLogger(PdfReplicationPreprocessor.class);

    private static final List<ReplicationActionType> VALID_ACTION_TYPES = ImmutableList.of(
        ReplicationActionType.ACTIVATE,
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
        if (replicationAction == null) {
            // do nothing
            LOG.debug("replication action is null, ignoring");
        } else {
            final ReplicationActionType replicationActionType = replicationAction.getType();

            try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
                final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

                for (final String path : replicationAction.getPaths()) {
                    final PageDecorator page = pageManager.getPage(path);

                    preprocessPage(resourceResolver, replicationActionType, page);
                }
            } catch (LoginException e) {
                LOG.error("error authenticating resource resolver", e);

                throw new ReplicationException(e);
            }
        }
    }

    private void preprocessPage(final ResourceResolver resourceResolver,
        final ReplicationActionType replicationActionType, final PageDecorator page)
        throws ReplicationException {
        if (isApplicationNotesPage(page) && isValidReplicationActionType(replicationActionType)) {
            LOG.info("handling replication action : {} for page : {}", replicationActionType, page.getPath());

            final String assetPath;

            if (ReplicationActionType.ACTIVATE.equals(replicationActionType)) {
                try {
                    assetPath = pdfGenerator.generatePdfDocumentFromHtml(page, true).getPath();

                    LOG.info("created/updated PDF asset : {}", assetPath);
                } catch (IOException e) {
                    LOG.error("error generating PDF for page : " + page.getPath() + ", aborting page activation",
                        e);

                    throw new ReplicationException(e);
                }

                // asset activation is deferred until the DAM Update Asset workflow completes
            } else {
                assetPath = page.getContentResource().adaptTo(ApplicationNotes.class).getPdfAssetPath();

                if (ReplicationActionType.DELETE.equals(replicationActionType)) {
                    LOG.info("deleting PDF asset : {}", assetPath);

                    try {
                        pdfGenerator.deletePdfDocument(page);
                    } catch (PersistenceException e) {
                        LOG.error("error deleting PDF for page : " + page.getPath() + ", aborting page activation",
                            e);
                    }
                } else {
                    LOG.info("deactivating PDF asset : {}", assetPath);
                }

                // deactivate/delete the previously replicated PDF asset
                replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType, assetPath);
            }
        } else {
            LOG.debug("replicated resource is not an application notes page, ignoring");
        }
    }

    private boolean isApplicationNotesPage(final PageDecorator page) {
        return page != null && WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(page.getTemplatePath());
    }

    private boolean isValidReplicationActionType(final ReplicationActionType replicationActionType) {
        return VALID_ACTION_TYPES.contains(replicationActionType);
    }
}
