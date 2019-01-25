package com.waters.aem.core.utils;

/**
 * Search utility functions.
 */
public final class SearchUtils {

    private static final String FACET_AUTHOR = "author";

    private static final String FACET_SUFFIX = "_facet";

    /**
     * Get the Solr facet name corresponding to the given tag name.
     *
     * @param tagName first-level tag name
     * @return facet name, e.g. "category_facet"
     */
    public static String getSolrFacetName(final String tagName) {
        final String facetName = tagName.toLowerCase();

        return FACET_AUTHOR.equals(facetName) ? facetName : facetName + FACET_SUFFIX;
    }

    private SearchUtils() {

    }
}
