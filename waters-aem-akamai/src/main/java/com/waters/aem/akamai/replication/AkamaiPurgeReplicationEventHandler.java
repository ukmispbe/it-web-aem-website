package com.waters.aem.akamai.replication;

import com.waters.aem.akamai.job.AkamaiPurgeJobConsumer;
import com.waters.aem.core.services.AbstractReplicationEventHandler;
import com.waters.aem.core.services.PageEventHandlerConfiguration;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;

import java.util.Arrays;
import java.util.List;

/**
 * Event handler for finished replication events to purge content from Akamai.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
@Designate(ocd = AkamaiPurgeReplicationEventHandlerConfiguration.class)
public final class AkamaiPurgeReplicationEventHandler extends AbstractReplicationEventHandler implements PageEventHandlerConfiguration {

    @Reference
    private JobManager jobManager;

    private volatile List<String> includedPaths;

    private volatile List<String> excludedPaths;

    @Override
    public List<String> getIncludedPaths() {
        return includedPaths;
    }

    @Override
    public List<String> getExcludedPaths() {
        return excludedPaths;
    }

    @Override
    protected boolean accepts(final String path) {
        return isIncludedPath(path);
    }

    @Override
    protected JobManager getJobManager() {
        return jobManager;
    }

    @Override
    protected void handleActivate(final String path) {
        addJob(AkamaiPurgeJobConsumer.JOB_TOPIC_INVALIDATE, path);
    }

    @Override
    protected void handleDeactivate(final String path) {
        addJob(AkamaiPurgeJobConsumer.JOB_TOPIC_DELETE, path);
    }

    @Override
    protected void handleDelete(final String path) {
        addJob(AkamaiPurgeJobConsumer.JOB_TOPIC_DELETE, path);
    }

    @Activate
    @Modified
    protected void activate(final AkamaiPurgeReplicationEventHandlerConfiguration configuration) {
        includedPaths = Arrays.asList(configuration.includedPaths());
        excludedPaths = Arrays.asList(configuration.excludedPaths());
    }
}
