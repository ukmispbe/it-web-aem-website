package com.waters.aem.solr.index;

/**
 * Service for adding to and deleting pages from the Solr index.
 */
public interface SolrIndexService {

    /**
     * Add/update a page in the Solr index.
     *
     * @param path page path
     * @param recursive if true, all descendant pages of the given path will also be indexed
     * @return true if indexing is successful, false otherwise
     */
    boolean addToIndex(String path, boolean recursive);

    /**
     * Remove a page from the Solr index.
     *
     * @param path page path
     * @return true if de-indexing is successful, false otherwise
     */
    boolean deleteFromIndex(String path);
}
