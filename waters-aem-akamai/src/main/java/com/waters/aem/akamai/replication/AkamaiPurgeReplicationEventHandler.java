package com.waters.aem.akamai.replication;

import com.waters.aem.akamai.job.AkamaiPurgeJobConsumer;
import com.waters.aem.core.services.AbstractReplicationEventHandler;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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
public final class AkamaiPurgeReplicationEventHandler extends AbstractReplicationEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AkamaiPurgeReplicationEventHandler.class);

    @Reference
    private JobManager jobManager;

    private volatile List<String> includedPaths;

    private volatile List<String> excludedPaths;

    /**
     * Check if the given page path is indexed according to the rules defined in the OSGi service configuration.
     *
     * @param path replicated page path
     * @return true if path is indexed, false if not
     */
    @Override
    protected boolean accepts(final String path) {
        boolean isIndexed = includedPaths.stream().anyMatch(path :: startsWith);

        if (isIndexed) {
            LOG.debug("found indexed path : {}", path);

            isIndexed = excludedPaths.stream().noneMatch(path :: startsWith);

            LOG.debug("path : {}, is excluded : {}", path, !isIndexed);
        } else {
            LOG.debug("non-indexed path : {}", path);
        }

        return isIndexed;
    }

    @Override
    protected void handleActivate(final String path) {
        jobManager.addJob(AkamaiPurgeJobConsumer.JOB_TOPIC, getJobProperties(path));
    }

    @Override
    protected void handleDeactivate(final String path) {
        jobManager.addJob(AkamaiPurgeJobConsumer.JOB_TOPIC, getJobProperties(path));
    }

    @Override
    protected void handleDelete(final String path) {
        jobManager.addJob(AkamaiPurgeJobConsumer.JOB_TOPIC, getJobProperties(path));
    }

    @Activate
    protected void activate(final AkamaiPurgeReplicationEventHandlerConfiguration configuration) {
        includedPaths = Arrays.asList(configuration.includedPaths());
        excludedPaths = Arrays.asList(configuration.excludedPaths());
    }

    private Map<String, Object> getJobProperties(final String path) {
        return Collections.singletonMap(SlingConstants.PROPERTY_PATH, path);
    }
}
