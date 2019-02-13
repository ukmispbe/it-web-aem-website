package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.ReplicationAction;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Base class to handle PDF generation for Application Note page replication events.
 */
public abstract class AbstractPdfReplicationEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractPdfReplicationEventHandler.class);

    protected abstract ResourceResolverFactory getResourceResolverFactory();

    protected abstract List<ReplicationActionType> getSupportedReplicationActionTypes();

    /**
     * Process an individual Application Note page by generating or deactivating/deleting a PDF depending on the
     * replication action type.
     *
     * @param resourceResolver admin resource resolver
     * @param page application note page
     * @param replicationActionType replication action type
     * @throws ReplicationException if error occurs in PDF generation
     */
    protected abstract void processApplicationNotePage(final ResourceResolver resourceResolver,
        final PageDecorator page, final ReplicationActionType replicationActionType) throws ReplicationException;

    /**
     * Process the PDF generation tasks for replicated Application Note pages.
     *
     * @param replicationAction replication action
     * @throws ReplicationException if error occurs in PDF generation
     */
    protected void processApplicationNotePages(final ReplicationAction replicationAction)
        throws ReplicationException {
        final ReplicationActionType replicationActionType = replicationAction.getType();

        if (isSupportedReplicationActionType(replicationActionType)) {
            try (final ResourceResolver resourceResolver = getResourceResolverFactory().getServiceResourceResolver(
                null)) {
                final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);

                for (final PageDecorator page : getApplicationNotePages(replicationAction, pageManager)) {
                    LOG.debug("processing application note page : {}", page.getPath());

                    processApplicationNotePage(resourceResolver, page, replicationActionType);
                }
            } catch (LoginException e) {
                LOG.error("error authenticating resource resolver", e);

                throw new ReplicationException(e);
            }
        } else {
            LOG.debug("unsupported replication action for this event handler : {}", replicationAction);
        }
    }

    private boolean isSupportedReplicationActionType(final ReplicationActionType replicationActionType) {
        return getSupportedReplicationActionTypes().contains(replicationActionType);
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
