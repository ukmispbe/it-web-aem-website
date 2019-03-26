package com.waters.aem.core.services.job;

import com.google.common.base.Stopwatch;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.TimeUnit;

/**
 * Base class for replication job consumers.
 */
public abstract class AbstractJobConsumer implements JobConsumer {

    private static final Logger LOG = LoggerFactory.getLogger(AbstractJobConsumer.class);

    @Override
    public final JobResult process(final Job job) {
        final Stopwatch stopwatch = Stopwatch.createStarted();

        final String path = job.getProperty(SlingConstants.PROPERTY_PATH, String.class);

        final JobResult result = processJob(job.getTopic(), path);

        final long duration = stopwatch.elapsed(TimeUnit.SECONDS);

        LOG.info("finished processing job in {}s with result : {}", duration, result.name());

        return result;
    }

    /**
     * Process the current job for the given path and topic.
     *
     * @param topic job topic
     * @param path resource path
     * @return result
     */
    protected abstract JobResult processJob(final String topic, final String path);
}
