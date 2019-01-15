package com.waters.aem.core.components.content.applicationnotes;

public final class SearchFacet {

    private final String title;

    private final String filter;

    public SearchFacet(String title, String facetName){
        this.title = title;
        this.filter = facetName+"_facet:"+title; //ex:category_facet:applications
        System.out.println(this.filter);
    }

    public String getTitle() {
        return title;
    }
    public String getFilter() {
        return filter;
    }
}
