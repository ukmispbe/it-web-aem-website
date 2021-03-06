package com.waters.aem.solr.job;

import com.waters.aem.core.services.job.AbstractJobConsumer;
import com.waters.aem.solr.index.SolrIndexService;
import org.apache.sling.api.SlingException;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Solr Index Job Consumer is responsible for consuming indexing events generated by the Solr replication listener.
 * Unsuccessful jobs may be retried up to the number of retries allowed by the job queue configuration.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD,
        JobConsumer.PROPERTY_TOPICS + "=" + SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE
    })
public final class SolrIndexJobConsumer extends AbstractJobConsumer {

    public static final String JOB_TOPIC_INDEX_ADD = "com/waters/events/solr/index/add";

    public static final String JOB_TOPIC_INDEX_DELETE = "com/waters/events/solr/index/delete";

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexJobConsumer.class);

    @Reference
    private SolrIndexService solrIndexService;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing solr index job for path : {} and topic : {}", path, topic);

        boolean success;

        try {
            if (JOB_TOPIC_INDEX_ADD.equals(topic)) {
                success = solrIndexService.addPageToIndex(path);
            } else {
                success = solrIndexService.deletePageFromIndex(path);
            }
        } catch (Exception e) {
            // re-throw exception to cancel the job
            throw new SlingException(null, e);
        }

        return success ? JobResult.OK : JobResult.CANCEL;
    }
}
