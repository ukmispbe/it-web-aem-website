package com.waters.aem.solr.job;

import com.google.common.base.Stopwatch;
import com.waters.aem.solr.index.SolrIndexService;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

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
public final class SolrIndexJobConsumer implements JobConsumer {

    public static final String JOB_TOPIC_INDEX_ADD = "com/waters/events/solr/index/add";

    public static final String JOB_TOPIC_INDEX_DELETE = "com/waters/events/solr/index/delete";

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexJobConsumer.class);

    @Reference
    private SolrIndexService solrIndexService;

    /**
     * Process the indexing job via the Solr index service.
     *
     * @param job indexing job
     * @return OK job result if successful, FAILED result if unsuccessful
     */
    @Override
    public JobResult process(final Job job) {
        final Stopwatch stopwatch = Stopwatch.createStarted();

        final String path = job.getProperty(SlingConstants.PROPERTY_PATH, String.class);

        LOG.info("processing solr index job for path : {} and topic : {}", path, job.getTopic());

        boolean success;

        try {
            if (JOB_TOPIC_INDEX_ADD.equals(job.getTopic())) {
                success = solrIndexService.addPageToIndex(path, true);
            } else {
                success = solrIndexService.deletePageFromIndex(path, true);
            }
        } catch (Exception e) {
            // re-throw exception to cancel the job
            throw new RuntimeException(e);
        }

        final long duration = stopwatch.elapsed(TimeUnit.SECONDS);
        final JobResult result = success ? JobResult.OK : JobResult.CANCEL;

        LOG.info("finished processing solr index job in {}s with result : {}", duration, result.name());

        return result;
    }
}
