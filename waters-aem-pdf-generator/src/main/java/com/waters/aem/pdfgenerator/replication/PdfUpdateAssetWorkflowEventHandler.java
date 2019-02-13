package com.waters.aem.pdfgenerator.replication;

import com.day.cq.dam.api.DamEvent;
import com.day.cq.replication.ReplicationActionType;
import com.day.cq.replication.ReplicationException;
import com.day.cq.replication.Replicator;
import com.waters.aem.core.components.structure.page.ApplicationNotes;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;

/**
 * DAM Update Asset Workflow event handler to activate Application Note PDFs after the update workflow completes.  The
 * PDF generation process triggers the DAM Update Asset Workflow, and assets should not be replicated until this
 * workflow completes.
 * <p>
 * Since Application Note PDFs are only generated for page activations, this handler assumes that the PDF should be
 * activated every time a workflow completes for a PDF in the Application Notes DAM folder.
 */
@Component(service = EventHandler.class, property = {
    EventConstants.EVENT_TOPIC + "=" + DamEvent.EVENT_TOPIC
})
public final class PdfUpdateAssetWorkflowEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(PdfUpdateAssetWorkflowEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private Replicator replicator;

    @Override
    public void handleEvent(final Event event) {
        final DamEvent damEvent = DamEvent.fromEvent(event);

        if (damEvent != null && DamEvent.Type.DAM_UPDATE_ASSET_WORKFLOW_COMPLETED.equals(damEvent.getType())) {
            final String pdfAssetPath = damEvent.getAssetPath();

            // check that the updated asset is an application note PDF
            if (pdfAssetPath.startsWith(ApplicationNotes.DAM_ROOT_PATH)) {
                try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(
                    null)) {
                    LOG.info("activating PDF asset : {}", pdfAssetPath);

                    replicator.replicate(resourceResolver.adaptTo(Session.class), ReplicationActionType.ACTIVATE,
                        pdfAssetPath);
                } catch (LoginException e) {
                    LOG.error("error authenticating resource resolver", e);
                } catch (ReplicationException e) {
                    LOG.error("error replicating PDF asset : " + pdfAssetPath, e);
                }
            } else {
                LOG.debug("ignoring non-application note PDF asset : {}", pdfAssetPath);
            }
        }
    }
}
