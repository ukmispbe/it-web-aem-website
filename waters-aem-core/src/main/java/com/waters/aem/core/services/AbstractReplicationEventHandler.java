package com.waters.aem.core.services;

import com.day.cq.replication.ReplicationActionType;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.JobManager;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;
import java.util.Map;

public abstract class AbstractReplicationEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractReplicationEventHandler.class);

    @Override
    public final void handleEvent(final Event event) {
        final String path = (String) event.getProperty("cq:path");
        final String type = (String) event.getProperty("cq:type");

        final ReplicationActionType replicationActionType = ReplicationActionType.fromName(type);

        if (accepts(path)) {
            if (replicationActionType.equals(ReplicationActionType.ACTIVATE)) {
                LOG.info("handling activate event for path = {}", path);

                handleActivate(path);
            } else if (replicationActionType.equals(ReplicationActionType.DEACTIVATE)) {
                LOG.info("handling deactivate event for path = {}", path);

                handleDeactivate(path);
            } else if (replicationActionType.equals(ReplicationActionType.DELETE)) {
                LOG.info("handling delete event for path = {}", path);

                handleDelete(path);
            } else {
                LOG.debug("replication action type = {} not handled for path = {}", type, path);
            }
        }
    }

    /**
     * Check if the given page path is indexed according to the rules defined in the OSGi service configuration.
     *
     * @param path replicated page path
     * @return true if path is indexed, false if not
     */
    protected boolean isIndexed(final String path) {
        boolean isIndexed = getIncludedPaths().stream().anyMatch(path :: startsWith);

        if (isIndexed) {
            LOG.debug("found indexed path : {}", path);

            isIndexed = getExcludedPaths().stream().noneMatch(path :: startsWith);

            LOG.debug("path : {}, is excluded : {}", path, !isIndexed);
        } else {
            LOG.debug("non-indexed path : {}", path);
        }

        return isIndexed;
    }

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

    protected abstract JobManager getJobManager();

    /**
     * Get the list of included paths as defined in the OSGi service configuration.
     *
     * @return included page paths
     */
    protected abstract List<String> getIncludedPaths();

    /**
     * Get the list of excluded paths as defined in the OSGi service configuration.
     *
     * @return excluded page paths
     */
    protected abstract List<String> getExcludedPaths();

    /**
     * Determine if the replicated path can be accepted by this handler.
     *
     * @param path replicated path
     * @return true if handler can accept this path
     */
    protected abstract boolean accepts(final String path);

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
     * Get a map of job properties for the given page path.
     *
     * @param path page path
     * @return job properties
     */
    private Map<String, Object> getJobProperties(final String path) {
        return Collections.singletonMap(SlingConstants.PROPERTY_PATH, path);
    }
}
