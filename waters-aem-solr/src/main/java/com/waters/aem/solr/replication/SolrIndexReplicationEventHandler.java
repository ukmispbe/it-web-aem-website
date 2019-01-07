package com.waters.aem.solr.replication;

import com.day.cq.replication.ReplicationActionType;
import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.solr.job.SolrIndexJobConsumer;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Event handler for finished replication events to index content in Solr.
 */
@Component(immediate = true,
    service = EventHandler.class,
    property = {
        EventConstants.EVENT_TOPIC + "=" + NotificationConstants.TOPIC_JOB_FINISHED,
        EventConstants.EVENT_FILTER + "=(" + NotificationConstants.NOTIFICATION_PROPERTY_JOB_TOPIC + "=com/day/cq/replication/job/publish)"
    })
@Designate(ocd = SolrIndexReplicationEventHandlerConfiguration.class)
public final class SolrIndexReplicationEventHandler implements EventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexReplicationEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private JobManager jobManager;

    private volatile List<String> includedPaths;

    private volatile List<String> excludedPaths;

    private volatile List<String> includedTemplates;

    /**
     * Handle the replication event by adding an add/delete index job to the queue for the replicated page path.
     *
     * @param event replication event
     */
    @Override
    public void handleEvent(final Event event) {
        final String path = (String) event.getProperty("cq:path");
        final String type = (String) event.getProperty("cq:type");

        final ReplicationActionType replicationActionType = ReplicationActionType.fromName(type);

        LOG.debug("handling finished replication event for path = {}", path);

        if (isIndexed(path) && isIncludedTemplate(path)) {
            if (replicationActionType.equals(ReplicationActionType.ACTIVATE)) {
                LOG.info("handling activate event for path = {}", path);

                jobManager.addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_ADD, getJobProperties(path));
            } else if (replicationActionType.equals(ReplicationActionType.DEACTIVATE)) {
                LOG.info("handling deactivate event for path = {}", path);

                jobManager.addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE, getJobProperties(path));
            } else if (replicationActionType.equals(ReplicationActionType.DELETE)) {
                LOG.info("handling delete event for path = {}", path);

                jobManager.addJob(SolrIndexJobConsumer.JOB_TOPIC_INDEX_DELETE, getJobProperties(path));
            } else {
                LOG.debug("replication action type = {} not handled for path = {}", type, path);
            }
        }
    }

    @Activate
    protected void activate(final SolrIndexReplicationEventHandlerConfiguration configuration) {
        includedPaths = Arrays.asList(configuration.includedPaths());
        excludedPaths = Arrays.asList(configuration.excludedPaths());
        includedTemplates = Arrays.asList(configuration.includedTemplates());
    }

    private Map<String, Object> getJobProperties(final String path) {
        return Collections.singletonMap(SlingConstants.PROPERTY_PATH, path);
    }

    /**
     * Check if the given page path is indexed according to the rules defined in the OSGi service configuration.
     *
     * @param path replicated page path
     * @return true if path is indexed, false if not
     */
    private boolean isIndexed(final String path) {
        boolean isIndexed = includedPaths.stream().anyMatch(path :: startsWith);

        if (isIndexed) {
            LOG.debug("found indexed path : {}", path);

            isIndexed = excludedPaths.stream().noneMatch(path :: startsWith);

            LOG.debug("path : {}, is excluded : {}", path, !isIndexed);
        } else {
            LOG.debug("non-indexed path : {}", path);
        }

        return isIndexed;
    }

    /**
     * Check if the given path is a page, and if so, if the template is included in the indexing rules.
     *
     * @param path replicated page path
     * @return true if template is indexed, false otherwise
     */
    private boolean isIncludedTemplate(final String path) {
        boolean isIncludedTemplate = false;

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(path);

            if (page == null) {
                LOG.debug("page not found for path : {}", path);
            } else {
                isIncludedTemplate = includedTemplates.contains(page.getTemplatePath());
            }

            LOG.debug("path : {}, is included template : {}", path, isIncludedTemplate);
        } catch (LoginException e) {
            // re-throw as runtime exception to propagate up to the event framework
            throw new RuntimeException(e);
        }

        return isIncludedTemplate;
    }
}
