package com.waters.aem.core.services.impl;

import com.waters.aem.core.services.SolrSearchService;
import com.waters.aem.core.services.SolrSearchServiceConfiguration;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.metatype.annotations.Designate;

@Component(service = SolrSearchService.class)
@Designate(ocd = SolrSearchServiceConfiguration.class)
public final class DefaultSolrSearchService implements SolrSearchService {

    private volatile String baseUrl;

    @Override
    public String getBaseUrl() {
        return baseUrl;
    }

    @Activate
    @Modified
    protected void activate(final SolrSearchServiceConfiguration configuration) {
        baseUrl = configuration.baseUrl();
    }
}
