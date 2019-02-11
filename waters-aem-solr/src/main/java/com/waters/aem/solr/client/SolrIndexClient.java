package com.waters.aem.solr.client;

import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.common.SolrInputDocument;

import java.io.IOException;

/**
 * Service for adding to and deleting records from the Solr index.
 */
public interface SolrIndexClient {

    /**
     * Add/update a document in the Solr index.
     *
     * @param document Solr document
     * @return true if indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean addToIndex(SolrInputDocument document) throws IOException, SolrServerException;

    /**
     * Remove a record from the Solr index.
     *
     * @param id ID (i.e. page path for AEM pages)
     * @return true if de-indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean deleteFromIndex(String id) throws IOException, SolrServerException;
}
