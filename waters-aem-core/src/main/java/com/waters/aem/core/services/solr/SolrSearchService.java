package com.waters.aem.core.services.solr;

/**
 * Service exposing Solr configuration values.
 */
public interface SolrSearchService {

    /**
     * Get the configured Solr base URL.
     *
     * @return Solr base URL
     */
    String getBaseUrl();

    /**
     * Get the configured search rows.
     *
     * @return Search rows
     */
    String getRows();
}
