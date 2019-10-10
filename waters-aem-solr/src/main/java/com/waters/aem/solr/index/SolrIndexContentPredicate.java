package com.waters.aem.solr.index;

import com.icfolson.aem.library.api.page.PageDecorator;

public interface SolrIndexContentPredicate {

    /**
     * Determines if the page is eligible to be indexed based on the content of the page.
     *
     * @param page the page being indexed if eligible
     * @return true if the page is indexed based on its content
     */
    boolean isIndexed(final PageDecorator page);

}
