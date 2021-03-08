package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Tab;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.citytechinc.cq.component.annotations.widgets.TagInputField;
import com.day.cq.tagging.Tag;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.components.content.links.JsonFields;
import com.waters.aem.core.services.solr.SolrSearchService;
import com.waters.aem.core.tagging.WatersTagInject;
import com.waters.aem.core.utils.SearchUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component(value = "Search Results",
    description = "This is the Search Results component for Waters site", tabs = {
                @Tab(title = "Category"),
                @Tab(title = "Search Result Filters")
        })
@Model(adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResults {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private SiteContext siteContext;

    @OSGiService
    private SolrSearchService searchService;

    @DialogField(fieldLabel = "Category", ranking = 1)
    @MultiField(composite = true)
    @Inject
    private List<SearchResultsCategory> categories = Collections.emptyList();

    @DialogField(fieldLabel = "Ordered Sub Facets",
            fieldDescription = "Select facet tags in the order that they should be displayed on the Search Results page.",
            		tab = 2,ranking = 1)
    @TagInputField
    @WatersTagInject
    private List<Tag> orderedSubFacetTags = Collections.emptyList();

    @Inject
    private List<JsonFields> filterList = new ArrayList<>();

    public List<JsonFields> getLabelList() {
        return filterList;
    }


    public String getOrderedSubFacets() throws JsonProcessingException {
        return MAPPER.writeValueAsString(orderedSubFacetTags.stream()
                .map(tag -> ImmutableMap.<String, String>builder()
                        .put("facetName", SearchUtils.getSolrFacetName(tag.getName()))
                        .put("facetValue", tag.getTitle())
                        .put("facetTranslation", tag.getTitle(siteContext.getLocale()))
                        .build())
                .collect(Collectors.toList()));
    }

    /**
     * Get isocode to send to search service.
     *
     * @return isocode from page locale
     */
    public String getIsocode() {
        return siteContext.getLocaleWithCountry().toString();
    }

    /**
     * Get language code to use for translation.
     *
     * @return language code from page locale
     */
    public String getLocale() {
        return siteContext.getLocale().toLanguageTag();
    }

    public String getBaseUrl() {
        return searchService.getBaseUrl();
    }

    public String getCategoriesAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(categories.stream()
            .filter(category -> category.getCategoryFacetName() != null)
            .collect(Collectors.toList()));
    }
}
