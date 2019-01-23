package com.waters.aem.akamai.job;

import com.google.common.base.Stopwatch;
import com.waters.aem.akamai.client.AkamaiEdgeGridClient;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.concurrent.TimeUnit;

/**
 * The Akamai Purge Job Consumer is responsible for consuming indexing events generated by the Solr replication listener.
 * Unsuccessful jobs may be retried up to the number of retries allowed by the job queue configuration.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + AkamaiPurgeJobConsumer.JOB_TOPIC_INVALIDATE,
        JobConsumer.PROPERTY_TOPICS + "=" + AkamaiPurgeJobConsumer.JOB_TOPIC_DELETE,
    })
public final class AkamaiPurgeJobConsumer implements JobConsumer {

    public static final String JOB_TOPIC_INVALIDATE = "com/waters/events/akamai/invalidate";

    public static final String JOB_TOPIC_DELETE = "com/waters/events/akamai/delete";

    private static final Logger LOG = LoggerFactory.getLogger(AkamaiPurgeJobConsumer.class);

    @Reference
    private AkamaiEdgeGridClient edgeGridClient;

    /**
     * Process the indexing job via the Akamai Purge service.
     *
     * @param job purge job
     * @return OK job result if successful, CANCEL result if unsuccessful
     */
    @Override
    public JobResult process(final Job job) {
        final Stopwatch stopwatch = Stopwatch.createStarted();

        final String path = job.getProperty(SlingConstants.PROPERTY_PATH, String.class);

        LOG.info("processing akamai purge job for path : {}", path);

        try {
            if (JOB_TOPIC_INVALIDATE.equals(job.getTopic())) {
                edgeGridClient.invalidate(path);
            } else {
                edgeGridClient.delete(path);
            }
        } catch (IOException | URISyntaxException e) {
            // re-throw exception to cancel the job
            throw new RuntimeException(e);
        }

        final long duration = stopwatch.elapsed(TimeUnit.SECONDS);

        LOG.info("finished processing akamai purge job in {}s", duration);

        return JobResult.OK;
    }
}
