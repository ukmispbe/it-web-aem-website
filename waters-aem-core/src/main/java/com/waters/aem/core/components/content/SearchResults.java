package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.citytechinc.cq.component.annotations.DialogField;
import com.citytechinc.cq.component.annotations.Listener;
import com.citytechinc.cq.component.annotations.widgets.MultiField;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.services.solr.SolrSearchService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_DELETE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_EDIT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_INSERT;
import static com.icfolson.aem.library.core.constants.ComponentConstants.EVENT_AFTER_MOVE;
import static com.icfolson.aem.library.core.constants.ComponentConstants.REFRESH_PARENT;

@Component(value = "Search Results",
    description = "This is the Search Results component for Waters site",
    listeners = {
        @Listener(name = EVENT_AFTER_INSERT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_EDIT, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_MOVE, value = REFRESH_PARENT),
        @Listener(name = EVENT_AFTER_DELETE, value = REFRESH_PARENT)
    })
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResults {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Self
    private SiteContext siteContext;

    @OSGiService
    private SolrSearchService searchService;

    @DialogField(fieldLabel = "Categories")
    @MultiField(composite = true)
    @Inject
    private List<SearchResultsCategory> categories = Collections.emptyList();

    /**
     * Get isocode to send to search service.
     *
     * @return isocode from page locale
     */
    public String getIsocode() {
        return siteContext.getLocale().toString();
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
            .filter(category -> category.getFacetName() != null)
            .collect(Collectors.toList()));
    }
}
