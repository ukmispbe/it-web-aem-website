package com.waters.aem.core.components.content.applicationnotes;

public final class SearchFacet {

    private final String title;

    private final String name;

    private final String filter;

    SearchFacet(final String title, final String name, final String facetName) {
        this.title = title;
        this.name = name;
        this.filter = facetName + "_facet:" + title; // ex:category_facet:applications
    }

    public String getName() {
        return name;
    }

    public String getTitle() {
        return title;
    }

    public String getFilter() {
        return filter;
    }
}
