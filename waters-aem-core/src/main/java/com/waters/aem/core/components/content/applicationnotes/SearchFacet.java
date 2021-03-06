package com.waters.aem.core.components.content.applicationnotes;

import org.apache.commons.lang3.builder.ToStringBuilder;

public final class SearchFacet {

    private final String title;

    private final String name;

    private final String filter;

    SearchFacet(final String title, final String englishTitle, final String name, final String facetName) {
        this.title = title;
        this.name = name;
        this.filter = facetName + "_facet:" + englishTitle; // ex:category_facet:applications
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

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
