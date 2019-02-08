package com.waters.aem.solr.client.impl;

import com.waters.aem.solr.client.SolrIndexClient;
import com.waters.aem.solr.client.SolrIndexClientConfiguration;
import com.waters.aem.solr.index.impl.DefaultSolrIndexService;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrInputDocument;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@Component(immediate = true, service = SolrIndexClient.class)
@Designate(ocd = SolrIndexClientConfiguration.class)
public class DefaultSolrIndexClient implements SolrIndexClient {

    private static final Logger LOG = LoggerFactory.getLogger(DefaultSolrIndexService.class);

    private volatile SolrClient solrClient;

    private volatile int commitWithinMs;

    private volatile boolean hardCommit;

    private volatile String collection;

    @Override
    public boolean addToIndex(final SolrInputDocument document) throws IOException, SolrServerException {
        return processResponse(solrClient.add(collection, document, commitWithinMs));
    }

    @Override
    public boolean deleteFromIndex(final String id) throws IOException, SolrServerException {
        return processResponse(solrClient.deleteById(collection, id, commitWithinMs));
    }

    @Activate
    @Modified
    protected void activate(final SolrIndexClientConfiguration configuration) {
        commitWithinMs = configuration.commitWithinMs();
        hardCommit = configuration.hardCommit();
        collection = configuration.collection();

        solrClient = new HttpSolrClient.Builder(configuration.baseUrl())
            .withConnectionTimeout(configuration.connectionTimeout())
            .withSocketTimeout(configuration.socketTimeout())
            .build();

        LOG.info("created solr client, commit within : {}ms, hard commit : {}, collection : {}", commitWithinMs,
            hardCommit, collection);
    }

    @Deactivate
    protected void deactivate() {
        solrClient = null;
    }

    private boolean processResponse(final UpdateResponse updateResponse) throws IOException, SolrServerException {
        boolean success = getStatus(updateResponse, false);

        if (success && hardCommit) {
            success = getStatus(solrClient.commit(collection), true);
        }

        return success;
    }

    private boolean getStatus(final UpdateResponse updateResponse, final boolean isCommit) {
        LOG.debug("solr " + (isCommit ? "commit" : "update") + " response status = {}", updateResponse.getStatus());

        return updateResponse.getStatus() == 0;
    }
}
