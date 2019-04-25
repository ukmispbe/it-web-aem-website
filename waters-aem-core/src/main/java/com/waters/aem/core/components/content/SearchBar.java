package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.services.solr.SolrSearchService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(value = "Search Bar",
    description = "This is the Search Bar component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchBar {
    // placeholder for component plugin, not used by template

    Logger log = LoggerFactory.getLogger(SearchBar.class);

    @OSGiService
    private SolrSearchService searchService;

    public String getBaseUrl() {
        log.info("Base Url = {}", searchService.getBaseUrl());
        return searchService.getBaseUrl();
    }
}
