package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.Preprocessor;
import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import com.waters.aem.core.services.replication.AbstractReplicationPreprocessor;
import com.waters.aem.core.utils.Templates;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
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

import static com.google.common.base.Preconditions.checkState;

/**
 * Replication preprocessor to delete Application Note PDFs when pages are deactivated or deleted.  This is implemented
 * in a preprecessor to ensure that the page still exists, since the page metadata is needed to determine the
 * corresponding PDF asset path.
 */
@Component(service = Preprocessor.class)
public final class PdfReplicationPreprocessor extends AbstractReplicationPreprocessor<PageDecorator> {

    private static final Logger LOG = LoggerFactory.getLogger(PdfReplicationPreprocessor.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private PdfGenerator pdfGenerator;

    @Reference
    private Replicator replicator;

    @Override
    protected boolean isEnabled() {
        return pdfGenerator.isEnabled();
    }

    @Override
    protected void preprocessItem(final ReplicationActionType replicationActionType,
        final ResourceResolver resourceResolver, final PageDecorator page) throws ReplicationException {
        LOG.debug("preprocessing replication action type : {} for page : {}", replicationActionType,
            page.getPath());

        final String pdfAssetPath = page.getContentResource().adaptTo(ApplicationNotes.class)
            .getPdfAssetPath();

        checkState(pdfAssetPath != null, "PDF asset path is null for page : " + page.getPath());

        LOG.info("deleting PDF asset : {}", pdfAssetPath);

        // delete the previously replicated PDF asset
        replicator.replicate(resourceResolver.adaptTo(Session.class), replicationActionType, pdfAssetPath);

        try {
            // delete the PDF from author after deleting from publish
            pdfGenerator.deletePdfDocument(page);
        } catch (PersistenceException e) {
            LOG.error("error deleting PDF for page : " + page.getPath() + ", aborting page activation", e);

            throw new ReplicationException(e);
        }
    }

    @Override
    protected List<PageDecorator> getItems(final ReplicationAction replicationAction,
        final ResourceResolver resourceResolver) {
        final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

        return Arrays.stream(replicationAction.getPaths())
            .map(pageManager :: getPage)
            .filter(Templates :: isApplicationNotesPage)
            .collect(Collectors.toList());
    }

    @Override
    protected ResourceResolverFactory getResourceResolverFactory() {
        return resourceResolverFactory;
    }
}
