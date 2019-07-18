package com.waters.aem.core.services.solr.impl;

import com.waters.aem.core.services.WatersServiceConfiguration;
import com.waters.aem.core.services.solr.SolrSearchService;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = SolrSearchService.class)
@Designate(ocd = WatersServiceConfiguration.class)
public final class DefaultSolrSearchService implements SolrSearchService {

    private volatile String baseUrl;

    @Override
    public String getBaseUrl() {
        return baseUrl;
    }

    @Activate
    @Modified
    protected void activate(final WatersServiceConfiguration configuration) {
        baseUrl = configuration.searchBaseUrl();
    }
}

