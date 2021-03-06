package com.waters.aem.core.services.replication;

import com.day.cq.replication.ReplicationActionType;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.JobManager;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Map;

/**
 * Base class for replication event handlers.
 */
public abstract class AbstractReplicationEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractReplicationEventHandler.class);

    @Override
    public final void handleEvent(final Event event) {
        final String path = (String) event.getProperty("cq:path");
        final String type = (String) event.getProperty("cq:type");

        final ReplicationActionType replicationActionType = ReplicationActionType.fromName(type);

        if (accepts(path, replicationActionType)) {
            if (replicationActionType.equals(ReplicationActionType.ACTIVATE)) {
                logEvent(path, replicationActionType);

                handleActivate(path);
            } else if (replicationActionType.equals(ReplicationActionType.DEACTIVATE)) {
                logEvent(path, replicationActionType);

                handleDeactivate(path);
            } else if (replicationActionType.equals(ReplicationActionType.DELETE)) {
                logEvent(path, replicationActionType);

                handleDelete(path);
            } else {
                LOG.debug("{} : replication action type = {} not handled for path = {}", this.getClass().getName(),
                    type, path);
            }
        } else {
            LOG.debug("{} : event not accepted for path : {} and action type : {}, ignoring", this.getClass().getName(),
                path, replicationActionType);
        }
    }

    /**
     * Determine if the replicated path can be accepted by this handler.
     *
     * @param path replicated path
     * @param replicationActionType replication action type
     * @return true if handler can accept this path
     */
    protected abstract boolean accepts(final String path, final ReplicationActionType replicationActionType);

    /**
     * Get the Sling job manager for this service.
     *
     * @return job manager
     */
    protected abstract JobManager getJobManager();

    /**
     * Handle activation event.
     *
     * @param path payload path
     */
    protected abstract void handleActivate(final String path);

    /**
     * Handle deactivation event.
     *
     * @param path payload path
     */
    protected abstract void handleDeactivate(final String path);

    /**
     * Handle delete event.
     *
     * @param path payload path
     */
    protected abstract void handleDelete(final String path);

    /**
     * Add a job to the queue with the given topic and page path.
     *
     * @param topic job topic
     * @param path page path
     */
    protected void addJob(final String topic, final String path) {
        LOG.info("adding job with topic : {} for page path : {}", topic, path);

        getJobManager().addJob(topic, getJobProperties(path));
    }

    /**
     * Get a map of job properties for the given page path.
     *
     * @param path page path
     * @return job properties
     */
    private Map<String, Object> getJobProperties(final String path) {
        return Collections.singletonMap(SlingConstants.PROPERTY_PATH, path);
    }

    private void logEvent(final String path, final ReplicationActionType replicationActionType) {
        LOG.debug("{} : handling {} event for path : {}", this.getClass().getName(), replicationActionType.getName(),
            path);
    }
}
