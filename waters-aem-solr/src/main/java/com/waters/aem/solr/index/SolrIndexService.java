package com.waters.aem.solr.index;

public interface SolrIndexService {

    boolean addToIndex(String path);

    boolean deleteFromIndex(String path);
}
