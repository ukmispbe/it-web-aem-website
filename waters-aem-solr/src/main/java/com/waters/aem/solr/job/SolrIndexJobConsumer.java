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
    private SolrIndexService indexService;

    @Override
    public JobResult process(final Job job) {
        final Stopwatch stopwatch = Stopwatch.createStarted();

        final String path = job.getProperty(SlingConstants.PROPERTY_PATH, String.class);

        LOG.info("processing solr index job for path : {} and topic : {}", path, job.getTopic());

        boolean success;

        try {
            if (JOB_TOPIC_INDEX_ADD.equals(job.getTopic())) {
                success = indexService.addToIndex(path);
            } else {
                success = indexService.deleteFromIndex(path);
            }
        } catch (Exception e) {
            LOG.error("error processing solr index for path : " + path, e);

            // re-throw exception to cancel the job
            throw e;
        }

        final long duration = stopwatch.elapsed(TimeUnit.SECONDS);
        final JobResult result = success ? JobResult.OK : JobResult.FAILED;

        LOG.info("finished processing solr index job in {}s with result : {}", duration, result.name());

        return result;
    }
}
