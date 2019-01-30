package com.waters.aem.solr.index;

import com.waters.aem.core.services.PageEventHandlerConfiguration;
import org.apache.solr.client.solrj.SolrServerException;

import java.io.IOException;

/**
 * Service for adding/deleting pages and assets from the Solr index.
 */
public interface SolrIndexService extends PageEventHandlerConfiguration {

    /**
     * Add/update a page in the Solr index.
     *
     * @param path page path
     * @param force if true, ignore path/template index rules and add to index anyway
     * @return true if indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean addPageToIndex(String path, boolean force) throws IOException, SolrServerException;

    /**
     * Remove a page from the Solr index.
     *
     * @param path page path
     * @param force if true, ignore path/template index rules and delete from index anyway
     * @return true if de-indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean deletePageFromIndex(String path, boolean force) throws IOException, SolrServerException;

    /**
     * Add/update an asset in the Solr index.
     *
     * @param path asset path
     * @param force if true, ignore path/template index rules and add to index anyway
     * @return true if indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean addAssetToIndex(String path, boolean force) throws IOException, SolrServerException;

    /**
     * Remove an asset from the Solr index.
     *
     * @param path asset path
     * @param force if true, ignore path/template index rules and delete from index anyway
     * @return true if de-indexing is successful, false otherwise
     * @throws IOException if error occurs communicating with Solr server
     * @throws SolrServerException if error occurs in Solr index request
     */
    boolean deleteAssetFromIndex(String path, boolean force) throws IOException, SolrServerException;

    /**
     * Determine if the given page/asset path is indexed according to the configured rules.
     *
     * @param path page or asset path
     * @return true if path is indexed
     */
    boolean isIndexed(String path);
}
