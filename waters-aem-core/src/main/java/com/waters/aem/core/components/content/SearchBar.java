package com.waters.aem.core.components.content;

import com.citytechinc.cq.component.annotations.Component;
import com.waters.aem.core.components.SiteContext;
import com.waters.aem.core.services.solr.SolrSearchService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.OSGiService;
import org.apache.sling.models.annotations.injectorspecific.Self;

@Component(value = "Search Bar",
    description = "This is the Search Bar component for Waters site")
@Model(adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public final class SearchBar {
    // placeholder for component plugin, not used by template

    @OSGiService
    private SolrSearchService searchService;

    @Self
    private SiteContext siteContext;

    public String getBaseUrl() {
        return searchService.getBaseUrl();
    }

    /**
     * Get isocode to send to search service.
     *
     * @return isocode from page locale
     */
    public String getIsocode() {
        return siteContext.getLocale().toString();
    }
}
