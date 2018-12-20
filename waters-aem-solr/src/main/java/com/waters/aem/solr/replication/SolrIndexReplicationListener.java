package com.waters.aem.solr.replication;

import com.day.cq.replication.ReplicationActionType;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Listener for finished replication events to index content in Solr.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
public class SolrIndexReplicationListener implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexReplicationListener.class);

    /**
     * @param event replication event
     */
    @Override
    public void handleEvent(final Event event) {
        final String path = (String) event.getProperty("cq:path");
        final String type = (String) event.getProperty("cq:type");

        final ReplicationActionType replicationActionType = ReplicationActionType.fromName(type);

        LOG.info("handling finished replication event for path = {}", path);

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

    /**
     * Handle activation event.
     *
     * @param path payload path
     */
    private void handleActivate(final String path) {

    }

    /**
     * Handle deactivation event.
     *
     * @param path payload path
     */
    private void handleDeactivate(final String path) {

    }

    /**
     * Handle delete event.
     *
     * @param path payload path
     */
    private void handleDelete(final String path) {

    }
}
