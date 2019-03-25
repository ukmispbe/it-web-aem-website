package com.waters.aem.akamai.job;

import com.waters.aem.akamai.client.AkamaiEdgeGridClient;
import com.waters.aem.core.services.job.AbstractJobConsumer;
import org.apache.sling.api.SlingException;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URISyntaxException;

/**
 * The Akamai Purge Job Consumer is responsible for consuming indexing events generated by the Akamai replication event
 * handler.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + AkamaiPurgeJobConsumer.JOB_TOPIC_INVALIDATE,
        JobConsumer.PROPERTY_TOPICS + "=" + AkamaiPurgeJobConsumer.JOB_TOPIC_DELETE
    })
public final class AkamaiPurgeJobConsumer extends AbstractJobConsumer {

    public static final String JOB_TOPIC_INVALIDATE = "com/waters/events/akamai/invalidate";

    public static final String JOB_TOPIC_DELETE = "com/waters/events/akamai/delete";

    private static final Logger LOG = LoggerFactory.getLogger(AkamaiPurgeJobConsumer.class);

    @Reference
    private AkamaiEdgeGridClient edgeGridClient;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing akamai purge job for path : {}", path);

        try {
            if (JOB_TOPIC_INVALIDATE.equals(topic)) {
                edgeGridClient.invalidate(path);
            } else {
                edgeGridClient.delete(path);
            }
        } catch (IOException | URISyntaxException e) {
            // re-throw exception to cancel the job
            throw new SlingException(null, e);
        }

        return JobResult.OK;
    }
}
