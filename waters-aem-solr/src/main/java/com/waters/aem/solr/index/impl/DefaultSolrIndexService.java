package com.waters.aem.solr.index.impl;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.constants.WatersConstants;
import com.waters.aem.solr.index.SolrIndexService;
import com.waters.aem.solr.index.SolrIndexServiceConfiguration;
import com.waters.aem.solr.index.builder.ApplicationNotesSolrInputDocumentBuilder;
import com.waters.aem.solr.index.builder.DefaultSolrInputDocumentBuilder;
import com.waters.aem.solr.index.builder.SolrInputDocumentBuilder;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.factory.ModelFactory;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.ConcurrentUpdateSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component(immediate = true, service = SolrIndexService.class)
@Designate(ocd = SolrIndexServiceConfiguration.class)
public class DefaultSolrIndexService implements SolrIndexService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSolrIndexService.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private ModelFactory modelFactory;

    private volatile ConcurrentUpdateSolrClient solrClient;

    private volatile boolean enabled;

    private volatile int commitWithinMs;

    private volatile String collection;

    @Override
    public boolean addToIndex(final String path) {
        boolean success = false;

        if (enabled) {
            final SolrInputDocument document = buildSolrInputDocument(path);

            if (document == null) {
                LOG.warn("solr input document is null, not adding path to index : {}", path);
            } else {
                LOG.info("adding solr document to index : {}", document);

                try {
                    final UpdateResponse updateResponse = solrClient.add(collection, document, commitWithinMs);

                    success = processResponse(updateResponse);
                } catch (IOException | SolrServerException e) {
                    LOG.error("error indexing solr document", e);
                }
            }
        } else {
            LOG.info("solr index service disabled, not adding path to index : {}", path);

            success = true;
        }

        return success;
    }

    @Override
    public boolean deleteFromIndex(final String path) {
        boolean success = false;

        if (enabled) {
            try {
                final UpdateResponse updateResponse = solrClient.deleteById(collection, path, commitWithinMs);

                success = processResponse(updateResponse);
            } catch (IOException | SolrServerException e) {
                LOG.error("error deleting from solr index for path : " + path, e);
            }
        } else {
            LOG.info("solr index service disabled, not deleting path from index : {}", path);

            success = true;
        }

        return success;
    }

    @Activate
    @Modified
    protected void activate(final SolrIndexServiceConfiguration configuration) {
        enabled = configuration.enabled();
        commitWithinMs = configuration.commitWithinMs();
        collection = configuration.collection();

        solrClient = new ConcurrentUpdateSolrClient.Builder(configuration.baseUrl())
            .withConnectionTimeout(configuration.connectionTimeout())
            .withSocketTimeout(configuration.socketTimeout())
            .build();

        LOG.info("created solr client, enabled : {}", enabled);
    }

    @Deactivate
    protected void deactivate() {
        solrClient = null;
    }

    private SolrInputDocument buildSolrInputDocument(final String path) {
        SolrInputDocument document = null;

        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageManagerDecorator pageManager = resourceResolver.adaptTo(PageManagerDecorator.class);
            final PageDecorator page = pageManager.getPage(path);

            if (page == null) {
                LOG.warn("page is null for path = {}, not adding to solr index", path);
            } else {
                // get template-specific document builder
                final SolrInputDocumentBuilder builder = getSolrInputDocumentBuilder(page);

                document = builder == null ? null : builder.build();
            }
        } catch (LoginException e) {
            LOG.error("error authenticating service resource resolver", e);
        }

        return document;
    }

    private SolrInputDocumentBuilder getSolrInputDocumentBuilder(final PageDecorator page) {
        final String templatePath = page.getTemplatePath();

        final SolrInputDocumentBuilder builder;

        if (WatersConstants.TEMPLATE_APPLICATION_NOTES_PAGE.equals(templatePath)) {
            builder = modelFactory.createModel(page, ApplicationNotesSolrInputDocumentBuilder.class);
        } else if (WatersConstants.TEMPLATE_CONTENT_PAGE.equals(templatePath)) {
            builder = modelFactory.createModel(page, DefaultSolrInputDocumentBuilder.class);
        } else {
            LOG.debug("page is not an application notes or content page template, ignoring : {}", page.getPath());

            builder = null;
        }

        return builder;
    }

    private boolean processResponse(final UpdateResponse updateResponse) {
        LOG.info("solr update response status = {}", updateResponse.getStatus());

        return updateResponse.getStatus() == 0;
    }
}
