package com.waters.aem.solr.replication;

import com.day.cq.replication.ReplicationActionType;
import com.waters.aem.core.services.AbstractReplicationEventHandler;
import com.waters.aem.solr.index.SolrIndexService;
import com.waters.aem.solr.job.SolrIndexJobConsumer;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;

/**
 * Event handler for finished replication events to index content in Solr.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
public final class SolrIndexReplicationEventHandler extends AbstractReplicationEventHandler {

    @Reference
    private JobManager jobManager;

    @Reference
    private SolrIndexService solrIndexService;

    @Override
    protected JobManager getJobManager() {
        return jobManager;
    }

    @Override
    protected boolean accepts(final String path, final ReplicationActionType replicationActionType) {
        final boolean strict = replicationActionType.equals(ReplicationActionType.ACTIVATE) || replicationActionType
            .equals(ReplicationActionType.DEACTIVATE);

        return solrIndexService.isIndexed(path, strict);
    }

    @Override
    protected void handleActivate(final String path) {
        addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD, path);
    }

    @Override
    protected void handleDeactivate(final String path) {
        addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE, path);
    }

    @Override
    protected void handleDelete(final String path) {
        addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE, path);
    }
}
