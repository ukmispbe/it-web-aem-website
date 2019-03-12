package com.waters.aem.core.components.content.applicationnotes;

public final class SearchFacet {

    private final String title;

    private final String filter;

    SearchFacet(String title, String facetName) {
        this.title = title;
        this.filter = facetName + "_facet:" + title; // ex:category_facet:applications
    }

    public String getTitle() {
        return title;
    }

    public String getFilter() {
        return filter;
    }
}
