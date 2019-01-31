package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.services.solr.SolrSearchService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component(value = "Search Results", description = "This is the Search Results component for Waters site")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResults {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @OSGiService
    private SolrSearchService searchService;

    @DialogField(fieldLabel = "Categories")
    @MultiField(composite = true)
    @Inject
    private List<SearchResultsCategory> categories = Collections.emptyList();

    public String getBaseUrl() {
        return searchService.getBaseUrl();
    }

    public String getCategoriesAsJson() throws JsonProcessingException {
        return MAPPER.writeValueAsString(categories.stream()
            .filter(category -> category.getCategory() != null)
            .collect(Collectors.toList()));
    }
}
