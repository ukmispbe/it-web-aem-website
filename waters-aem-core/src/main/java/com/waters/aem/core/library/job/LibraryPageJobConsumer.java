package com.waters.aem.core.library.job;

import com.day.cq.replication.ReplicationException;
import com.day.cq.wcm.api.WCMException;
import com.waters.aem.core.library.asset.LibraryAsset;
import com.waters.aem.core.library.page.LibraryPageManager;
import com.waters.aem.core.services.job.AbstractJobConsumer;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Job consumer responsible for creating/updating Library pages when Library assets are activated.
 */
@Component(immediate = true,
    service = JobConsumer.class,
    property = {
        JobConsumer.PROPERTY_TOPICS + "=" + LibraryPageJobConsumer.JOB_TOPIC
    })
public final class LibraryPageJobConsumer extends AbstractJobConsumer {

    public static final String JOB_TOPIC = "com/waters/events/library/create";

    private static final Logger LOG = LoggerFactory.getLogger(LibraryPageJobConsumer.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private LibraryPageManager libraryPageManager;

    @Override
    protected JobResult processJob(final String topic, final String path) {
        LOG.info("processing library page job for path : {}", path);

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final LibraryAsset asset = resourceResolver.getResource(path).adaptTo(LibraryAsset.class);

            libraryPageManager.createOrUpdateLibraryPage(asset);
        } catch (LoginException | PersistenceException | WCMException | ReplicationException e) {
            LOG.error("error creating/updating library page for path : " + path, e);

            // re-throw exception to cancel the job
            throw new RuntimeException(e);
        }

        return JobResult.OK;
    }
}
