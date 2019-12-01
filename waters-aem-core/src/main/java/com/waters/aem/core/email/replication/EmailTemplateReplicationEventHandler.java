package com.waters.aem.core.email.replication;

import com.day.cq.replication.ReplicationActionType;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.core.email.job.EmailTemplateJobConsumer;
import com.waters.aem.core.services.replication.AbstractReplicationEventHandler;
import com.waters.aem.core.utils.Templates;
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
 * Replication event handler to create/update Library pages when Library assets are replicated.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
public final class EmailTemplateReplicationEventHandler extends AbstractReplicationEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(EmailTemplateReplicationEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private JobManager jobManager;

    @Override
    protected boolean accepts(final String path, final ReplicationActionType replicationActionType) {
        return ReplicationActionType.ACTIVATE.equals(replicationActionType) && (isEmailTemplateAsset(path) || isEmailTemplatePage(path));
    }

    @Override
    protected JobManager getJobManager() {
        return jobManager;
    }

    @Override
    protected void handleActivate(final String path) {
        addJob(EmailTemplateJobConsumer.JOB_TOPIC, path);
    }

    @Override
    protected void handleDeactivate(final String path) {
        // do nothing
    }

    @Override
    protected void handleDelete(final String path) {
        // do nothing
    }

    private boolean isEmailTemplateAsset(final String path) {
        return path.matches(WatersConstants.DAM_PATH + "/.+/emails.*");
    }

    private boolean isEmailTemplatePage(final String path) {
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(path);

            return Templates.isEmailTemplate(page);
        } catch (LoginException e) {
            // re-throw as runtime exception to propagate up to the event framework
            throw new RuntimeException(e);
        }
    }
}
