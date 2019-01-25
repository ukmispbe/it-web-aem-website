package com.waters.aem.solr.replication;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.services.AbstractReplicationEventHandler;
import com.waters.aem.solr.job.SolrIndexJobConsumer;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.NotificationConstants;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

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
public final class SolrIndexReplicationEventHandler extends AbstractReplicationEventHandler {

    private static final Logger LOG = LoggerFactory.getLogger(SolrIndexReplicationEventHandler.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private JobManager jobManager;

    private volatile List<String> includedPaths;

    private volatile List<String> excludedPaths;

    private volatile List<String> includedTemplates;

    @Override
    protected List<String> getIncludedPaths() {
        return includedPaths;
    }

    @Override
    protected List<String> getExcludedPaths() {
        return excludedPaths;
    }

    @Override
    protected JobManager getJobManager() {
        return jobManager;
    }

    @Override
    protected boolean accepts(final String path) {
        return isIndexed(path) && isIncludedTemplate(path);
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

    @Activate
    @Modified
    protected void activate(final SolrIndexReplicationEventHandlerConfiguration configuration) {
        includedPaths = Arrays.asList(configuration.includedPaths());
        excludedPaths = Arrays.asList(configuration.excludedPaths());
        includedTemplates = Arrays.asList(configuration.includedTemplates());
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
