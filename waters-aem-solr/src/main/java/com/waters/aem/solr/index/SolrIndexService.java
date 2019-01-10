package com.waters.aem.solr.index;

import org.apache.solr.client.solrj.SolrServerException;

import java.io.IOException;

/**
 * Service for adding to and deleting pages from the Solr index.
 */
public interface SolrIndexService {

    /**
     * Add/update a page in the Solr index.
     *
     * @param path page path
     * @return true if indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean addToIndex(String path) throws IOException, SolrServerException;

    /**
     * Remove a page from the Solr index.
     *
     * @param path page path
     * @return true if de-indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean deleteFromIndex(String path) throws IOException, SolrServerException;
}
