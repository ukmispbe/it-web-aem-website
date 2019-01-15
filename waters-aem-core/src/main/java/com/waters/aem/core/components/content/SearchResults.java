package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.services.SolrSearchService;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;

@Component("Search Results")
@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchResults {

    @OSGiService
    private SolrSearchService searchService;

    public String getBaseUrl() {
        return searchService.getBaseUrl();
    }
}
