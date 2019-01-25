package com.waters.aem.solr.index.builder;

import org.apache.solr.common.SolrInputDocument;

/**
 * Solr document builder for Waters pages.  Builder implementations will vary by template.
 */
public interface SolrInputDocumentBuilder {

    /**
     * Build the Solr input document.
     *
     * @return Solr input document
     */
    SolrInputDocument build();
}
