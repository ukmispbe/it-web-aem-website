package com.waters.aem.pdfgenerator.replication;

import com.day.cq.replication.ReplicationActionType;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.services.replication.AbstractReplicationEventHandler;
import com.waters.aem.core.utils.Templates;
import com.waters.aem.pdfgenerator.job.PdfGeneratorJobConsumer;
import com.waters.aem.pdfgenerator.services.PdfGenerator;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Replication event handler to create or delete Application Note PDFs after pages are activated.  A PDF generation job
 * is added each time an Application Notes page is activated - using the job ensures that the event handler will not be
 * blacklisted if PDF generator process duration exceeds the blacklist time threshold.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
public final class PdfReplicationEventHandler extends AbstractReplicationEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(PdfReplicationEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private JobManager jobManager;

    @Reference
    private PdfGenerator pdfGenerator;

    @Override
    protected boolean accepts(final String path, final ReplicationActionType replicationActionType) {
        boolean accepted = false;

        if (pdfGenerator.isEnabled() && ReplicationActionType.ACTIVATE.equals(replicationActionType)) {
            try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
                final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(path);

                accepted = Templates.isApplicationNotesPage(page);
            } catch (LoginException e) {
                LOG.error("error authenticating resource resolver", e);
            }
        }

        return accepted;
    }

    @Override
    protected JobManager getJobManager() {
        return jobManager;
    }

    @Override
    protected void handleActivate(final String path) {
        addJob(PdfGeneratorJobConsumer.JOB_TOPIC, path);
    }

    @Override
    protected void handleDeactivate(final String path) {
        // do nothing
    }

    @Override
    protected void handleDelete(final String path) {
        // do nothing
    }
}
