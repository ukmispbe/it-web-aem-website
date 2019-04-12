package com.waters.aem.solr.index.impl;

import com.icfolson.aem.library.api.page.PageDecorator;
import com.icfolson.aem.library.api.page.PageManagerDecorator;
import com.waters.aem.core.utils.Templates;
import com.waters.aem.solr.client.SolrIndexClient;
import com.waters.aem.solr.index.SolrIndexService;
import com.waters.aem.solr.index.SolrIndexServiceConfiguration;
import com.waters.aem.solr.index.builder.ApplicationNotesSolrInputDocumentBuilder;
import com.waters.aem.solr.index.builder.DefaultSolrInputDocumentBuilder;
import com.waters.aem.solr.index.builder.LibrarySolrInputDocumentBuilder;
import com.waters.aem.solr.index.builder.SolrInputDocumentBuilder;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.models.factory.ModelFactory;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrInputDocument;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

@Component(immediate = true, service = SolrIndexService.class)
@Designate(ocd = SolrIndexServiceConfiguration.class)
public class DefaultSolrIndexService implements SolrIndexService {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSolrIndexService.class);

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private ModelFactory modelFactory;

    @Reference
    private SolrIndexClient solrIndexClient;

    private volatile boolean enabled;

    private volatile List<String> includedPaths;

    private volatile List<String> excludedPaths;

    private volatile List<String> includedTemplates;

    @Override
    public boolean addPageToIndex(final String path) throws IOException, SolrServerException {
        boolean success = true;

        if (enabled) {
            final SolrInputDocument document = getSolrInputDocument(path);

            LOG.info("adding solr document to index : {}", document);

            success = solrIndexClient.addToIndex(document);
        } else {
            LOG.info("solr index service disabled, not adding path to index : {}", path);
        }

        return success;
    }

    @Override
    public boolean deletePageFromIndex(final String path) throws IOException, SolrServerException {
        boolean success = true;

        if (enabled) {
            LOG.info("deleting path {} from solr index...", path);

            success = solrIndexClient.deleteFromIndex(path);
        } else {
            LOG.info("solr index service disabled, not deleting path from index : {}", path);
        }

        return success;
    }

    @Override
    public boolean addAssetToIndex(final String path) throws IOException, SolrServerException {
        // not yet implemented
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean deleteAssetFromIndex(final String path)
        throws IOException, SolrServerException {
        // not yet implemented
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean isIndexed(final String path, final boolean checkTemplate) {
        return isIncludedPath(path) && (!checkTemplate || isIncludedTemplate(path));
    }

    @Override
    public List<String> getIncludedPaths() {
        return includedPaths;
    }

    @Override
    public List<String> getExcludedPaths() {
        return excludedPaths;
    }

    @Activate
    @Modified
    protected void activate(final SolrIndexServiceConfiguration configuration) {
        enabled = configuration.enabled();
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
        return applyToPage(path, page -> page != null && includedTemplates.contains(page.getTemplatePath()));
    }

    private SolrInputDocument getSolrInputDocument(final String path) {
        // get template-specific document builder
        return applyToPage(path, page -> getSolrInputDocumentBuilder(page).build());
    }

    private SolrInputDocumentBuilder getSolrInputDocumentBuilder(final PageDecorator page) {
        final SolrInputDocumentBuilder builder;

        if (Templates.isApplicationNotesPage(page)) {
            builder = modelFactory.createModel(page, ApplicationNotesSolrInputDocumentBuilder.class);
        } else if (Templates.isLibraryPage(page)) {
            builder = modelFactory.createModel(page, LibrarySolrInputDocumentBuilder.class);
        } else {
            builder = modelFactory.createModel(page, DefaultSolrInputDocumentBuilder.class);
        }

        return builder;
    }

    private <T> T applyToPage(final String path, final Function<PageDecorator, T> function) {
        try (final ResourceResolver resourceResolver = resourceResolverFactory.getServiceResourceResolver(null)) {
            final PageDecorator page = resourceResolver.adaptTo(PageManagerDecorator.class).getPage(path);

            return function.apply(page);
        } catch (LoginException e) {
            // re-throw as runtime exception to propagate up to the event framework
            throw new RuntimeException(e);
        }
    }
}
